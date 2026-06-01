import type { Finding } from "../types";

/**
 * Render the findings to stderr. Errors first, then warnings, then a summary.
 * No-op when there are zero findings.
 */
export function renderFindings(findings: Finding[]): void {
  const errors = findings.filter((f) => f.severity === "error");
  const warnings = findings.filter((f) => f.severity === "warning");

  if (errors.length === 0 && warnings.length === 0) return;

  if (errors.length > 0) {
    process.stderr.write(`\n✗ ERRORS (${errors.length})\n`);
    renderGroup(errors);
  }

  if (warnings.length > 0) {
    process.stderr.write(`\n⚠ WARNINGS (${warnings.length})\n`);
    renderGroup(warnings);
  }

  process.stderr.write(
    `\nSummary: ${errors.length} ${plural("error", errors.length)}, ` +
      `${warnings.length} ${plural("warning", warnings.length)}.\n\n`,
  );
}

function renderGroup(findings: Finding[]): void {
  const bySource = new Map<string, Finding[]>();
  for (const f of findings) {
    const key = `${f.source.collection}/${f.source.id}`;
    if (!bySource.has(key)) bySource.set(key, []);
    bySource.get(key)!.push(f);
  }

  for (const [key, group] of bySource) {
    process.stderr.write(`\n  ${key}\n`);
    for (const f of group) {
      process.stderr.write(`    ${renderLine(f)}\n`);
    }
  }
}

function renderLine(f: Finding): string {
  const ref = f.context ? `"${f.brokenRef}" ${f.context}` : `"${f.brokenRef}"`;
  const notFound = f.notFoundMessage ?? "not found";
  const tail = f.hint ? `${notFound}, ${f.hint}` : notFound;
  return `${f.field} references ${ref} (${tail})`;
}

function plural(word: string, n: number): string {
  return n === 1 ? word : `${word}s`;
}
