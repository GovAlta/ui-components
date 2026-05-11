interface ExtractedEvent {
  name: string;
  type: string;
  description: string;
  frameworks: ("react" | "angular" | "webComponents")[];
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function inferDetailPropertyType(key: string, expression: string): string {
  const expr = expression.trim();
  const lowerKey = key.toLowerCase();

  if (lowerKey === "name") return "string";
  if (lowerKey === "label") return "string";
  if (lowerKey === "labels") return "string[]";
  if (lowerKey === "sortby") return "string";
  if (lowerKey === "sortdir") return "number";
  if (lowerKey === "sorts") return '{ column: string; direction: "asc" | "desc" }[]';
  if (lowerKey === "tab") return "number";
  if (lowerKey === "page") return "number";
  if (lowerKey === "url") return "string";
  if (lowerKey === "values") return "string[]";

  if (lowerKey === "value") {
    if (/newselectedvalues|array\.from\s*\(/i.test(expr)) return "string[]";
    if (/_date\.date/.test(expr)) return "Date | string | null";
    if (/\binput\.value\b/.test(expr)) return "string";
    if (/\.value\b/.test(expr) && !/\bdetail\.value\b/.test(expr)) return "string";
    if (/\boutput\b/.test(expr)) return "string";
    if (/^newvalue$/i.test(expr)) return "string";
    if (/^_?value$/.test(expr)) return "string";
    if (/detail\.value/.test(expr)) return "string | unknown[]";
  }

  if (lowerKey === "valuestr") return "string";
  if (lowerKey === "key") {
    if (/\.key\b/.test(expr)) return "string";
  }
  if (lowerKey === "action") {
    if (/\.action\b/.test(expr)) return "string";
  }
  if (lowerKey === "size") {
    if (/\.size\b/.test(expr)) return '"normal" | "compact"';
  }

  if (expr === "true" || expr === "false") return "boolean";
  if (/^[-+]?\d+(\.\d+)?$/.test(expr)) return "number";
  if (/^["'`].*["'`]$/.test(expr)) return "string";
  if (/^\{[\s\S]*\}$/.test(expr)) return "Record<string, unknown>";
  if (/^\[[\s\S]*\]$/.test(expr)) return "unknown[]";
  if (/\b(open|checked|disabled|selected|expanded|collapsed|visible|active)\b/i.test(expr)) {
    return "boolean";
  }
  if (/(open|checked|disabled|selected|expanded|collapsed|visible|active)/.test(lowerKey)) {
    return "boolean";
  }
  if (/\b(event|e)\b/.test(expr)) return "Event";

  return "unknown";
}

function inferDetailPropertyOptional(key: string, expression: string): boolean {
  const expr = expression.trim();
  const lowerKey = key.toLowerCase();

  if (
    (lowerKey === "action" || lowerKey === "size") &&
    /\baction\.(action|size)\b/.test(expr)
  ) {
    return true;
  }

  return false;
}

function buildCustomEventTypeFromDetail(detailObjectLiteral: string): string {
  const objectBody = detailObjectLiteral.replace(/^\{\s*|\s*\}$/g, "");
  if (!objectBody) return "CustomEvent<void>";

  const parsedMembers = objectBody
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const keyValueMatch = part.match(/^([A-Za-z_$][\w$]*)\s*:\s*([\s\S]+)$/);
      if (keyValueMatch) {
        const key = keyValueMatch[1];
        const value = keyValueMatch[2].trim();
        return {
          key,
          type: inferDetailPropertyType(key, value),
          optional: inferDetailPropertyOptional(key, value),
        };
      }

      const shorthandMatch = part.match(/^([A-Za-z_$][\w$]*)$/);
      if (shorthandMatch) {
        const key = shorthandMatch[1];
        return { key, type: inferDetailPropertyType(key, key), optional: false };
      }

      return null;
    })
    .filter((member): member is { key: string; type: string; optional: boolean } =>
      Boolean(member),
    );

  if (!parsedMembers.length) return "CustomEvent<Record<string, unknown>>";

  const hasLabels = parsedMembers.some((m) => m.key.toLowerCase() === "labels");
  const hasValueStr = parsedMembers.some((m) => m.key.toLowerCase() === "valuestr");

  const members = parsedMembers.map((member) => {
    if (member.key.toLowerCase() === "value") {
      if (hasLabels) {
        return `${member.key}${member.optional ? "?" : ""}: string[]`;
      }
      if (hasValueStr) {
        return `${member.key}${member.optional ? "?" : ""}: Date | string | null`;
      }
    }
    return `${member.key}${member.optional ? "?" : ""}: ${member.type}`;
  });

  return `CustomEvent<{ ${members.join("; ")} }>`;
}

function scoreCustomEventType(eventType: string): number {
  if (
    eventType === "CustomEvent" ||
    eventType === "CustomEvent<Record<string, unknown>>" ||
    eventType === "CustomEvent<void>"
  ) {
    return 0;
  }

  const detailMatch = eventType.match(/CustomEvent<\{([\s\S]*)\}>/);
  if (!detailMatch?.[1]) return 0;

  const body = detailMatch[1];
  const keyCount = body.split(";").filter((part) => part.trim().length > 0).length;
  const unknownCount = (body.match(/\bunknown\b/g) || []).length;

  return keyCount * 10 - unknownCount * 6;
}

function splitTopLevelArgs(argsSource: string): string[] {
  const parts: string[] = [];
  let current = "";
  let parenDepth = 0;
  let braceDepth = 0;
  let bracketDepth = 0;
  let inString = false;
  let stringQuote = "";

  for (let i = 0; i < argsSource.length; i++) {
    const ch = argsSource[i];
    const prev = i > 0 ? argsSource[i - 1] : "";

    if (inString) {
      current += ch;
      if (ch === stringQuote && prev !== "\\") {
        inString = false;
        stringQuote = "";
      }
      continue;
    }

    if (ch === '"' || ch === "'" || ch === "`") {
      inString = true;
      stringQuote = ch;
      current += ch;
      continue;
    }

    if (ch === "(") parenDepth++;
    else if (ch === ")") parenDepth--;
    else if (ch === "{") braceDepth++;
    else if (ch === "}") braceDepth--;
    else if (ch === "[") bracketDepth++;
    else if (ch === "]") bracketDepth--;

    if (ch === "," && parenDepth === 0 && braceDepth === 0 && bracketDepth === 0) {
      parts.push(current.trim());
      current = "";
      continue;
    }

    current += ch;
  }

  if (current.trim().length > 0) {
    parts.push(current.trim());
  }

  return parts;
}

function getCustomEventType(eventName: string, content: string): string {
  const escapedNameForAnnotation = escapeRegExp(eventName);
  const annotationPattern = new RegExp(
    `\\/\\/ @eventType ([^\\n]+)\\n[^\\n]*["']${escapedNameForAnnotation}["']`,
    "g",
  );
  for (const annotationMatch of content.matchAll(annotationPattern)) {
    const annotatedType = annotationMatch[1].trim();
    if (annotatedType) return annotatedType;
  }

  const escapedName = escapeRegExp(eventName);
  const eventPattern = new RegExp(
    `new\\s+CustomEvent\\s*\\(\\s*["']${escapedName}["']\\s*,\\s*\\{([\\s\\S]*?)\\}\\s*\\)`,
    "g",
  );

  const dispatchCallStartPattern = /dispatch(?:<[^>]+>)?\s*\(/g;
  const detailLiterals: string[] = [];

  for (const match of content.matchAll(eventPattern)) {
    const eventOptions = match[1];
    const detailMatch = eventOptions.match(/detail\s*:\s*(\{[\s\S]*?\})/);
    if (detailMatch?.[1]) {
      detailLiterals.push(detailMatch[1]);
    }
  }

  for (const match of content.matchAll(dispatchCallStartPattern)) {
    const startIndex = match.index ?? -1;
    if (startIndex < 0) continue;

    const openParenIndex = startIndex + match[0].length - 1;
    let depth = 0;
    let endIndex = -1;

    for (let i = openParenIndex; i < content.length; i++) {
      const ch = content[i];
      if (ch === "(") depth++;
      if (ch === ")") {
        depth--;
        if (depth === 0) {
          endIndex = i;
          break;
        }
      }
    }

    if (endIndex === -1) continue;

    const callArgsSource = content.slice(openParenIndex + 1, endIndex);
    const args = splitTopLevelArgs(callArgsSource);
    if (args.length < 3) continue;

    const eventArg = args[1].trim();
    const eventMatch = eventArg.match(/^["']([^"']+)["']$/);
    if (!eventMatch || eventMatch[1] !== eventName) continue;

    const detailLiteral = args[2].trim();
    if (detailLiteral.startsWith("{") && detailLiteral.endsWith("}")) {
      detailLiterals.push(detailLiteral);
    }
  }

  let bestEventType = "CustomEvent<Record<string, unknown>>";
  let bestScore = -1;

  for (const literal of detailLiterals) {
    const typed = buildCustomEventTypeFromDetail(literal);
    const score = scoreCustomEventType(typed);
    if (score > bestScore) {
      bestScore = score;
      bestEventType = typed;
    }
  }

  if (detailLiterals.length > 0) {
    return bestEventType;
  }

  return "CustomEvent";
}

function transformWebComponentEvents(
  rawEventNames: string[],
  content: string,
): ExtractedEvent[] {
  return rawEventNames
    .filter((rawName) => !rawName.includes("::") && !rawName.includes(":"))
    .map((rawName) => ({
      name: rawName,
      type: getCustomEventType(rawName, content),
      description: "",
      frameworks: ["webComponents"],
    }));
}

export { transformWebComponentEvents };