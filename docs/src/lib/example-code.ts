/**
 * Helper functions to read example code files at build time
 */

import fs from 'node:fs/promises';
import path from 'node:path';

export interface ExampleCode {
  react?: string;
  angular?: {
    template: string;
    component?: string;
  };
  webComponents?: string;
}

/**
 * Read all code files for an example
 * @param exampleSlug - The example folder name (e.g., "button-with-icon")
 * @returns Object with code for each framework
 */
export async function getExampleCode(exampleSlug: string): Promise<ExampleCode> {
  const exampleDir = new URL(`../content/examples/${exampleSlug}`, import.meta.url).pathname;
  const code: ExampleCode = {};

  // Read React code
  try {
    code.react = await fs.readFile(path.join(exampleDir, 'react.tsx'), 'utf-8');
  } catch {
    // File doesn't exist
  }

  // Read Angular code (template + component)
  try {
    const template = await fs.readFile(path.join(exampleDir, 'angular.html'), 'utf-8');
    let component: string | undefined;
    try {
      component = await fs.readFile(path.join(exampleDir, 'angular.ts'), 'utf-8');
    } catch {
      // Component file is optional
    }
    code.angular = { template, component };
  } catch {
    // Files don't exist
  }

  // Read Web Components code
  try {
    code.webComponents = await fs.readFile(path.join(exampleDir, 'web-components.html'), 'utf-8');
  } catch {
    // File doesn't exist
  }

  return code;
}

/**
 * Add version="2" attribute to all goa- elements for v2 styling
 */
export function addVersionAttribute(html: string): string {
  return html.replace(/<goa-([a-z-]+)/g, '<goa-$1 version="2"');
}
