interface JSDocInfo {
  description: string;
  required: boolean;
  internal: boolean;
  deprecated: boolean;
}

function parseJSDocContent(rawComment: string): JSDocInfo {
  const cleaned = rawComment
    .split("\n")
    .map((line) => line.replace(/^\s*\*\s?/, "").trim())
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  const required = /@required\b/i.test(cleaned);
  const internal = /@internal\b/i.test(cleaned);
  const deprecated = /@deprecated\b/i.test(cleaned);

  const description = cleaned
    .replace(/@required\s*/gi, "")
    .replace(/@internal\s*/gi, "")
    .replace(/@deprecated\s*/gi, "")
    .trim();

  return { description, required, internal, deprecated };
}

function buildJSDocMap(content: string): Map<string, JSDocInfo> {
  const jsDocMap = new Map<string, JSDocInfo>();
  const pattern = /\/\*\*\s*((?:[^*]|\*(?!\/))*?)\s*\*\/\s*\n\s*export\s+let\s+(\w+)/g;

  let match;
  while ((match = pattern.exec(content)) !== null) {
    const rawComment = match[1];
    const propName = match[2];
    jsDocMap.set(propName, parseJSDocContent(rawComment));
  }

  return jsDocMap;
}

function extractTagName(content: string): string | null {
  const simpleMatch = content.match(/customElement\s*=\s*["']([^"']+)["']/);
  if (simpleMatch) return simpleMatch[1];

  const objectMatch = content.match(/customElement\s*=\s*\{\{\s*tag:\s*["']([^"'\n]+)["']/);
  if (objectMatch) return objectMatch[1];

  return null;
}

function extractTypeAliases(content: string): Map<string, string[]> {
  const aliases = new Map<string, string[]>();
  const typeMatches = content.matchAll(/\btype\s+(\w+)\s*=\s*([^;]+);/g);

  for (const match of typeMatches) {
    const name = match[1];
    const definition = match[2].trim();
    const members = definition
      .split("|")
      .map((v) => v.trim())
      .filter((v) => v.length > 0);
    aliases.set(name, members);
  }

  let changed = true;
  while (changed) {
    changed = false;
    for (const [name, members] of aliases) {
      const expanded: string[] = [];
      for (const member of members) {
        const clean = member.replace(/["']/g, "");
        if (aliases.has(clean) && clean !== name) {
          expanded.push(...aliases.get(clean)!);
          changed = true;
        } else {
          expanded.push(member);
        }
      }
      aliases.set(name, expanded);
    }
  }

  return aliases;
}

interface ValidatorInfo {
  values: string[];
  deprecated?: string[];
  typeName?: string;
}

function extractValidators(content: string): Map<string, ValidatorInfo> {
  const validators = new Map<string, ValidatorInfo>();
  const validatorMatches = content.matchAll(
    /const\s+\[(\w+),\s*validate\w+\]\s*=\s*typeValidator\s*\([\s\S]*?\[([\s\S]*?)\][\s\S]*?\);/g,
  );

  for (const match of validatorMatches) {
    const name = match[1];
    const valuesStr = match[2];
    const values = valuesStr
      .split(",")
      .map((v) => v.trim().replace(/["']/g, ""))
      .filter((v) => v.length > 0);

    const fullMatch = match[0];
    let deprecated: string[] | undefined;
    const deprecatedMatch = fullMatch.match(/deprecated:\s*\[([\s\S]*?)\]/);
    if (deprecatedMatch) {
      deprecated = deprecatedMatch[1]
        .split(",")
        .map((v) => v.trim().replace(/["']/g, ""))
        .filter((v) => v.length > 0);
    }

    validators.set(name, { values, deprecated });
  }

  const typeAliasMatches = content.matchAll(
    /type\s+(\w+)\s*=\s*\(\s*typeof\s+(\w+)\s*\)\s*\[\s*number\s*\]/g,
  );
  for (const match of typeAliasMatches) {
    const typeName = match[1];
    const validatorName = match[2];
    const validatorData = validators.get(validatorName);
    if (validatorData) {
      validators.set(typeName, { ...validatorData, typeName });
    }
  }

  return validators;
}

function isReadonlyDescription(description: string): boolean {
  return /read[ -]?only\b|set by the component\b/i.test(description);
}

export {
  buildJSDocMap,
  extractTagName,
  extractTypeAliases,
  extractValidators,
  isReadonlyDescription,
};

export type { JSDocInfo, ValidatorInfo };
