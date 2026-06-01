import { loadComponents } from "./loaders/components";
import { loadExamples } from "./loaders/examples";
import { loadGuidance } from "./loaders/guidance";
import { loadFoundations } from "./loaders/foundations";
import { loadGetStarted } from "./loaders/get-started";
import { loadProductTypes } from "./loaders/productTypes";
import { loadComponentApis } from "./loaders/component-apis";
import { loadFrameworkIdentifiers } from "./loaders/framework-identifiers";
import { addComponentAliases, addExampleAliases } from "./transforms/aliases";
import { linkGuidanceToComponents } from "./transforms/link-guidance";
import { writeMcpJson } from "./outputs/mcp-json";
import { runChecks } from "./checks";
import { renderFindings } from "./checks/render";
import type { AnyRecord, ComponentRecord } from "./types";

function main(): void {
  const start = performance.now();

  // 1. Load raw data from all sources.
  const componentsRaw = loadComponents();
  const examplesRaw = loadExamples();
  const guidance = loadGuidance();
  const foundations = loadFoundations();
  const getStarted = loadGetStarted();
  const productTypes = loadProductTypes();
  const apis = loadComponentApis();
  const fwIds = loadFrameworkIdentifiers();

  // 2. Merge code-derived facts (framework ids, API blob) into components.
  let components: ComponentRecord[] = componentsRaw.map((c) => {
    const fw = fwIds.get(c.id);
    const api = apis.get(c.id);
    let apiBlob: Record<string, unknown> | undefined;
    if (api) {
      const { componentSlug: _slug, ...rest } = api;
      void _slug;
      apiBlob = rest;
    }
    return {
      ...c,
      webComponentTag: fw?.webComponentTag,
      reactClassName: fw?.reactClassName,
      angularSelector: fw?.angularSelector,
      // Carry extra react class names as a starting point for aliases.
      aliases: fw && fw.reactClassNames.length > 1 ? fw.reactClassNames.slice(1) : [],
      api: apiBlob,
    };
  });

  // 3. Transforms.
  components = addComponentAliases(components);
  components = linkGuidanceToComponents(components, guidance);
  const examples = addExampleAliases(examplesRaw);

  // 4. Cross-validation checks.
  const records: AnyRecord[] = [
    ...components,
    ...examples,
    ...guidance,
    ...foundations,
    ...getStarted,
    ...productTypes,
  ];
  const findings = runChecks(records);
  renderFindings(findings);
  const errorCount = findings.filter((f) => f.severity === "error").length;
  if (errorCount > 0) {
    process.stderr.write(
      `[content-generators] skipped output because of ${errorCount} ${errorCount === 1 ? "error" : "errors"}. ` +
        `Existing files in docs/generated/mcp/ are unchanged.\n`,
    );
    process.exit(1);
  }

  // 5. Output.
  const result = writeMcpJson(records);
  const elapsed = Math.round(performance.now() - start);

  // 6. Report.
  const withFw = components.filter((c) => c.webComponentTag).length;
  const withApi = components.filter((c) => c.api).length;
  const withAliases = components.filter((c) => c.aliases && c.aliases.length > 0).length;
  const withGuidance = components.filter(
    (c) => c.relatedGuidance && c.relatedGuidance.length > 0,
  ).length;
  const examplesWithAliases = examples.filter((e) => e.aliases.length > 0).length;
  const examplesWithProductType = examples.filter((e) => e.productType).length;

  process.stdout.write(
    `[content-generators] wrote ${result.written} records in ${elapsed}ms\n` +
      `  components:    ${components.length} (${withFw} with fw ids, ${withApi} with api, ${withAliases} with aliases, ${withGuidance} with linked guidance)\n` +
      `  examples:      ${examples.length} (${examplesWithAliases} with aliases, ${examplesWithProductType} with productType)\n` +
      `  guidance:      ${guidance.length}\n` +
      `  foundations:   ${foundations.length}\n` +
      `  get-started:   ${getStarted.length}\n` +
      `  productTypes:  ${productTypes.length}\n`,
  );
}

main();
