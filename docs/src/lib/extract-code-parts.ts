/**
 * Extract Code Parts
 *
 * Extracts CSS, setup/class code, and template/JSX from example files.
 * Used to display curated code snippets like the current website.
 */

// ============================================================================
// Types
// ============================================================================

export interface ExtractedReactCode {
  /** CSS from <style>{`...`}</style> blocks */
  css?: string;
  /** Setup code: const declarations with JSX, useState hooks */
  setup?: string;
  /** Main JSX body (cleaned of imports, function wrapper, fragments) */
  jsx: string;
}

export interface ExtractedAngularCode {
  /** CSS from styles: [...] in @Component decorator */
  css?: string;
  /** TypeScript class body (properties + methods, no decorator) */
  typescript?: string;
  /** HTML template */
  template: string;
}

export interface ExtractedWebComponentsCode {
  /** CSS from <style> block */
  css?: string;
  /** JavaScript from <script> block */
  javascript?: string;
  /** HTML markup (no style/script) */
  html: string;
}

// ============================================================================
// React Extraction
// ============================================================================

/**
 * Extract parts from a React component file
 */
export function extractReactCode(code: string): ExtractedReactCode {
  let css: string | undefined;
  let setup: string | undefined;

  // 1. Extract CSS from <style>{`...`}</style> blocks
  const styleMatch = code.match(/<style>\{`([\s\S]*?)`\}<\/style>/);
  if (styleMatch) {
    css = cleanIndentation(styleMatch[1]);
  }

  // 2. Extract setup code (everything before return statement)
  setup = extractReactSetup(code);

  // 3. Extract JSX body (inside return statement)
  const jsx = extractJsxBody(code);

  return { css, setup, jsx };
}

/**
 * Extract setup code from React component
 *
 * Setup = everything useful before the return statement:
 * - Import statements (excluding react imports)
 * - Interface/type definitions
 * - Everything inside the component function before `return`
 *   (useState, useEffect, handler functions, etc.)
 */
function extractReactSetup(code: string): string | undefined {
  const setupParts: string[] = [];

  // 1. Extract non-React imports (like faker, types, etc.)
  const importRegex = /^import\s+.*?from\s+["'](?!react|@abgov)[^"']+["'];?\s*$/gm;
  let match;
  while ((match = importRegex.exec(code)) !== null) {
    setupParts.push(match[0].trim());
  }

  // 2. Extract interface/type definitions
  const interfaceRegex = /^(?:export\s+)?interface\s+\w+\s*\{[\s\S]*?\n\}/gm;
  while ((match = interfaceRegex.exec(code)) !== null) {
    setupParts.push(match[0].trim());
  }

  // Extract type definitions - need special handling for object types with braces
  const typeStartRegex = /^(?:export\s+)?type\s+\w+\s*=/gm;
  while ((match = typeStartRegex.exec(code)) !== null) {
    const startIdx = match.index;
    const afterEquals = startIdx + match[0].length;

    // Skip whitespace after =
    let idx = afterEquals;
    while (idx < code.length && /\s/.test(code[idx])) idx++;

    let endIdx: number;
    if (code[idx] === '{') {
      // Object type - use brace counting
      let braceCount = 1;
      endIdx = idx + 1;
      while (endIdx < code.length && braceCount > 0) {
        if (code[endIdx] === '{') braceCount++;
        else if (code[endIdx] === '}') braceCount--;
        endIdx++;
      }
      // Include the semicolon after closing brace
      while (endIdx < code.length && /\s/.test(code[endIdx])) endIdx++;
      if (code[endIdx] === ';') endIdx++;
    } else {
      // Simple type alias - find the semicolon
      endIdx = idx;
      while (endIdx < code.length && code[endIdx] !== ';') endIdx++;
      if (code[endIdx] === ';') endIdx++;
    }

    setupParts.push(code.slice(startIdx, endIdx).trim());
  }

  // 3. Extract function body before return statement
  // Find the main export function
  const funcMatch = code.match(/export\s+(?:default\s+)?function\s+\w+\s*\([^)]*\)\s*\{/);
  if (funcMatch) {
    const funcStart = funcMatch.index! + funcMatch[0].length;

    // Find the return statement (with opening paren)
    const returnMatch = code.slice(funcStart).match(/\n\s*return\s*\(/);
    if (returnMatch) {
      const bodyBeforeReturn = code.slice(funcStart, funcStart + returnMatch.index!);
      const trimmedBody = bodyBeforeReturn.trim();

      if (trimmedBody) {
        setupParts.push(trimmedBody);
      }
    }
  }

  if (setupParts.length === 0) return undefined;

  // Join with double newlines and clean up
  let result = setupParts.join('\n\n');
  result = cleanIndentation(result);

  return result;
}

/**
 * Extract the JSX body from a React component
 * Uses direct extraction from return statement instead of sequential removal
 */
function extractJsxBody(code: string): string {
  // Find the return statement that returns JSX (starts with < after the paren)
  // This distinguishes the component's return from nested function returns like:
  //   return (a > b ? 1 : -1)  <- not JSX
  //   return (<Component />)   <- JSX
  const jsxReturnMatch = code.match(/\n\s*return\s*\(\s*</);
  if (jsxReturnMatch && jsxReturnMatch.index !== undefined) {
    // Adjust match to not include the < in what we pass to extractFromReturn
    const adjustedMatch = code.match(/\n\s*return\s*\(/);
    if (adjustedMatch) {
      // Find the specific occurrence that precedes JSX
      const jsxReturnIndex = jsxReturnMatch.index;
      // Search for return ( starting from this position
      const searchCode = code.slice(jsxReturnIndex);
      const localMatch = searchCode.match(/\n\s*return\s*\(/);
      if (localMatch && localMatch.index !== undefined) {
        // Create a match object with the correct global index
        const globalMatch = {
          ...localMatch,
          index: jsxReturnIndex + localMatch.index
        } as RegExpMatchArray;
        return extractFromReturn(code, globalMatch);
      }
    }
  }

  // Fallback: try simple match (for components without nested returns)
  const simpleMatch = code.match(/return\s*\(/);
  if (simpleMatch && simpleMatch.index !== undefined) {
    return extractFromReturn(code, simpleMatch);
  }

  return code; // Can't find return, return as-is
}

/**
 * Extract JSX content from inside return(...) using paren-counting
 */
function extractFromReturn(code: string, returnMatch: RegExpMatchArray): string {
  // Start after "return ("
  const startIdx = returnMatch.index! + returnMatch[0].length;

  // Use paren-counting to find the matching close paren
  let parenCount = 1;
  let endIdx = startIdx;
  while (endIdx < code.length && parenCount > 0) {
    const char = code[endIdx];
    // Skip string contents to avoid counting parens in strings
    if (char === '"' || char === "'" || char === '`') {
      endIdx = skipString(code, endIdx, char);
    } else {
      if (char === '(') parenCount++;
      else if (char === ')') parenCount--;
      endIdx++;
    }
  }

  // Extract content between parens (excluding the final matched paren)
  let jsx = code.slice(startIdx, endIdx - 1);

  // Clean up: remove fragment wrappers, style blocks
  jsx = jsx.replace(/^[ \t]*<>[ \t]*\n?/m, '');
  jsx = jsx.replace(/\n?[ \t]*<\/>[ \t]*$/m, '');
  jsx = jsx.replace(/<style>\{`[\s\S]*?`\}<\/style>\s*/g, '');

  return cleanIndentation(jsx.trim());
}

/**
 * Skip over a string literal (handles escaped characters)
 */
function skipString(code: string, startIdx: number, quote: string): number {
  let idx = startIdx + 1;
  while (idx < code.length) {
    if (code[idx] === '\\') {
      idx += 2; // Skip escaped char
    } else if (code[idx] === quote) {
      return idx + 1;
    } else {
      idx++;
    }
  }
  return idx;
}

// ============================================================================
// Angular Extraction
// ============================================================================

/**
 * Extract parts from Angular component files
 * @param tsCode - The angular.ts file content
 * @param htmlTemplate - The angular.html file content
 */
export function extractAngularCode(tsCode: string | undefined, htmlTemplate: string): ExtractedAngularCode {
  let css: string | undefined;
  let typescript: string | undefined;

  if (tsCode) {
    // Extract CSS from styles array in @Component decorator
    // styles: [`...`] or styles: ["..."]
    const stylesMatch = tsCode.match(/styles:\s*\[\s*[`"]([\s\S]*?)[`"]\s*\]/);
    if (stylesMatch) {
      css = cleanIndentation(stylesMatch[1]);
    }

    // Extract class body (properties and methods, without decorator)
    typescript = extractAngularClassBody(tsCode);
  }

  const template = cleanIndentation(htmlTemplate);

  return { css, typescript, template };
}

/**
 * Extract Angular class body without the @Component decorator
 */
function extractAngularClassBody(tsCode: string): string | undefined {
  // Find the class definition
  const classMatch = tsCode.match(/export\s+class\s+\w+\s*\{([\s\S]*)\}\s*$/);
  if (!classMatch) return undefined;

  let classBody = classMatch[1];

  // Clean up the class body
  classBody = cleanIndentation(classBody.trim());

  // If it's empty or just whitespace, return undefined
  if (!classBody.trim()) return undefined;

  return classBody;
}

// ============================================================================
// Web Components Extraction
// ============================================================================

/**
 * Extract parts from Web Components HTML file
 */
export function extractWebComponentsCode(html: string): ExtractedWebComponentsCode {
  let css: string | undefined;
  let javascript: string | undefined;
  let markup = html;

  // Extract <style> block
  const styleMatch = html.match(/<style\b[^>]*>([\s\S]*?)<\/style>/i);
  if (styleMatch) {
    css = cleanIndentation(styleMatch[1]);
    let previousMarkup: string;
    do {
      previousMarkup = markup;
      markup = markup.replace(/<style\b[^>]*>[\s\S]*?<\/style>\s*/gi, '');
    } while (markup !== previousMarkup);
  }

  // Extract <script> block
  const scriptMatch = html.match(/<script\b[^>]*>([\s\S]*?)<\/script\s*>/i);
  if (scriptMatch) {
    javascript = cleanIndentation(scriptMatch[1]);
    let previousMarkup: string;
    do {
      previousMarkup = markup;
      markup = markup.replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>\s*/gi, '');
    } while (markup !== previousMarkup);
  }

  markup = cleanIndentation(markup.trim());

  return { css, javascript, html: markup };
}

// ============================================================================
// Utilities
// ============================================================================

/**
 * Remove type definitions from code (handles object types with braces)
 */
function removeTypeDefinitions(code: string): string {
  let result = code;
  const typeStart = /^(?:export\s+)?type\s+\w+\s*=/gm;
  let match;

  const matches: Array<{ start: number; end: number }> = [];

  while ((match = typeStart.exec(code)) !== null) {
    const startIdx = match.index;
    const afterEquals = startIdx + match[0].length;

    // Skip whitespace after =
    let idx = afterEquals;
    while (idx < code.length && /\s/.test(code[idx])) idx++;

    let endIdx: number;
    if (code[idx] === '{') {
      // Object type - use brace counting
      let braceCount = 1;
      endIdx = idx + 1;
      while (endIdx < code.length && braceCount > 0) {
        if (code[endIdx] === '{') braceCount++;
        else if (code[endIdx] === '}') braceCount--;
        endIdx++;
      }
      // Include the semicolon after closing brace
      while (endIdx < code.length && /\s/.test(code[endIdx])) endIdx++;
      if (code[endIdx] === ';') endIdx++;
    } else {
      // Simple type alias - find the semicolon
      endIdx = idx;
      while (endIdx < code.length && code[endIdx] !== ';') endIdx++;
      if (code[endIdx] === ';') endIdx++;
    }

    // Include trailing whitespace
    while (endIdx < code.length && /\s/.test(code[endIdx])) endIdx++;

    matches.push({ start: startIdx, end: endIdx });
  }

  // Remove in reverse order
  for (let i = matches.length - 1; i >= 0; i--) {
    result = result.slice(0, matches[i].start) + result.slice(matches[i].end);
  }

  return result;
}

/**
 * Remove React hook calls (useEffect, useMemo, useCallback, etc.)
 * These have the pattern: hookName(() => { ... }, [deps]);
 */
function removeHookCalls(code: string): string {
  let result = code;
  // Match useEffect, useMemo, useCallback, useLayoutEffect, etc.
  const hookStart = /\b(useEffect|useMemo|useCallback|useLayoutEffect)\s*\(\s*\([^)]*\)\s*=>\s*\{/g;
  let match;

  const matches: Array<{ start: number; end: number }> = [];

  while ((match = hookStart.exec(code)) !== null) {
    const startIdx = match.index;
    const braceStart = startIdx + match[0].length - 1;
    let braceCount = 1;
    let endIdx = braceStart + 1;

    // Find matching closing brace for the arrow function body
    while (endIdx < code.length && braceCount > 0) {
      if (code[endIdx] === '{') braceCount++;
      else if (code[endIdx] === '}') braceCount--;
      endIdx++;
    }

    // Now we need to find the closing of the hook call itself
    // After the arrow function body, there may be `, [deps])` or just `)`
    // Find the closing paren and semicolon
    let parenCount = 1; // We're inside the hook call parens
    while (endIdx < code.length && parenCount > 0) {
      if (code[endIdx] === '(') parenCount++;
      else if (code[endIdx] === ')') parenCount--;
      endIdx++;
    }

    // Include semicolon and trailing whitespace/newline
    while (endIdx < code.length && /[\s;]/.test(code[endIdx])) {
      endIdx++;
    }

    matches.push({ start: startIdx, end: endIdx });
  }

  // Remove in reverse order
  for (let i = matches.length - 1; i >= 0; i--) {
    result = result.slice(0, matches[i].start) + result.slice(matches[i].end);
  }

  return result;
}

/**
 * Remove regular function declarations from code (handles nested braces)
 */
function removeRegularFunctions(code: string): string {
  let result = code;
  const funcStart = /function\s+\w+\s*\([^)]*\)\s*\{/g;
  let match;

  const matches: Array<{ start: number; end: number }> = [];

  while ((match = funcStart.exec(code)) !== null) {
    const startIdx = match.index;
    const braceStart = startIdx + match[0].length - 1;
    let braceCount = 1;
    let endIdx = braceStart + 1;

    while (endIdx < code.length && braceCount > 0) {
      if (code[endIdx] === '{') braceCount++;
      else if (code[endIdx] === '}') braceCount--;
      endIdx++;
    }

    // Include trailing whitespace/newline
    while (endIdx < code.length && /\s/.test(code[endIdx])) {
      endIdx++;
    }

    matches.push({ start: startIdx, end: endIdx });
  }

  // Remove in reverse order
  for (let i = matches.length - 1; i >= 0; i--) {
    result = result.slice(0, matches[i].start) + result.slice(matches[i].end);
  }

  return result;
}

/**
 * Remove arrow function declarations from code (handles multi-line)
 */
function removeArrowFunctions(code: string): string {
  let result = code;
  // Match arrow functions: const name = (params) => { or const name = (params): ReturnType => {
  // Using [^=]* for return type to handle complex types like string[], Promise<void>, etc.
  const arrowFuncStart = /const\s+\w+\s*=\s*\([^)]*\)\s*(?::[^=]+)?\s*=>\s*\{/g;
  let match;

  // Process matches in reverse order to preserve indices
  const matches: Array<{ start: number; end: number }> = [];

  while ((match = arrowFuncStart.exec(code)) !== null) {
    const startIdx = match.index;
    const braceStart = startIdx + match[0].length - 1;
    let braceCount = 1;
    let endIdx = braceStart + 1;

    while (endIdx < code.length && braceCount > 0) {
      if (code[endIdx] === '{') braceCount++;
      else if (code[endIdx] === '}') braceCount--;
      endIdx++;
    }

    // Include semicolon and trailing whitespace/newline
    while (endIdx < code.length && /[\s;]/.test(code[endIdx])) {
      endIdx++;
    }

    matches.push({ start: startIdx, end: endIdx });
  }

  // Remove in reverse order
  for (let i = matches.length - 1; i >= 0; i--) {
    result = result.slice(0, matches[i].start) + result.slice(matches[i].end);
  }

  return result;
}

/**
 * Remove common leading indentation from code
 */
function cleanIndentation(code: string): string {
  const lines = code.split('\n');

  // Remove leading/trailing empty lines
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();

  // Find minimum indentation (ignoring empty lines)
  const minIndent = lines
    .filter(line => line.trim())
    .reduce((min, line) => {
      const match = line.match(/^(\s*)/);
      return match ? Math.min(min, match[1].length) : min;
    }, Infinity);

  // Remove common indentation
  return lines
    .map(line => line.slice(minIndent === Infinity ? 0 : minIndent))
    .join('\n');
}
