/**
 * Helper functions to read example code files at build time
 */

export interface ExampleCode {
  react?: string;
  angular?: {
    template: string;
    component?: string;
  };
  webComponents?: string;
}

// Load all example code files at build time using Vite glob imports
const reactFiles = import.meta.glob<string>(
  '../content/examples/*/react.tsx',
  { eager: true, query: '?raw', import: 'default' }
);
const angularTemplates = import.meta.glob<string>(
  '../content/examples/*/angular.html',
  { eager: true, query: '?raw', import: 'default' }
);
const angularComponents = import.meta.glob<string>(
  '../content/examples/*/angular.ts',
  { eager: true, query: '?raw', import: 'default' }
);
const webComponentFiles = import.meta.glob<string>(
  '../content/examples/*/web-components.html',
  { eager: true, query: '?raw', import: 'default' }
);

// Helper to extract slug from path like "../content/examples/button-basic/react.tsx"
function getSlugFromPath(path: string): string {
  const parts = path.split('/');
  return parts[parts.length - 2]; // folder name before the filename
}

// Build lookup maps
const reactBySlug = new Map<string, string>();
for (const [path, content] of Object.entries(reactFiles)) {
  reactBySlug.set(getSlugFromPath(path), content);
}

const angularTemplateBySlug = new Map<string, string>();
for (const [path, content] of Object.entries(angularTemplates)) {
  angularTemplateBySlug.set(getSlugFromPath(path), content);
}

const angularComponentBySlug = new Map<string, string>();
for (const [path, content] of Object.entries(angularComponents)) {
  angularComponentBySlug.set(getSlugFromPath(path), content);
}

const webComponentBySlug = new Map<string, string>();
for (const [path, content] of Object.entries(webComponentFiles)) {
  webComponentBySlug.set(getSlugFromPath(path), content);
}

/**
 * Get all code files for an example
 * @param exampleSlug - The example folder name (e.g., "button-with-icon")
 * @returns Object with code for each framework
 */
export async function getExampleCode(exampleSlug: string): Promise<ExampleCode> {
  const code: ExampleCode = {};

  const react = reactBySlug.get(exampleSlug);
  if (react) {
    code.react = react;
  }

  const angularTemplate = angularTemplateBySlug.get(exampleSlug);
  if (angularTemplate) {
    code.angular = {
      template: angularTemplate,
      component: angularComponentBySlug.get(exampleSlug),
    };
  }

  const webComponent = webComponentBySlug.get(exampleSlug);
  if (webComponent) {
    code.webComponents = webComponent;
  }

  return code;
}

/**
 * Add version="2" attribute to all goa- elements for v2 styling
 */
export function addVersionAttribute(html: string): string {
  return html.replace(/<goa-([a-z-]+)/g, '<goa-$1 version="2"');
}
