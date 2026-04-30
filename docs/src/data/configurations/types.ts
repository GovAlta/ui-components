/**
 * Configuration Types
 *
 * Defines the structure for component configurations.
 * Each component has multiple preset configurations that users
 * can browse via dropdown selector.
 */

export type Framework = "react" | "angular" | "webComponents";

/**
 * React code example.
 * - `ts`: optional setup code (hooks, handlers, types)
 * - `css`: optional styles
 * - `jsx`: required JSX markup
 */
export interface ReactExample {
  ts?: string;
  css?: string;
  jsx: string;
}

/**
 * Angular code example.
 * - `title`: optional heading shown above this example
 *   (used when rendering an array of form binding patterns)
 * - `ts`: optional component class body
 * - `css`: optional styles
 * - `template`: required HTML template
 */
export interface AngularExample {
  title?: string;
  ts?: string;
  css?: string;
  template: string;
}

/**
 * Web Components code example.
 * - `js`: optional vanilla JS script
 * - `css`: optional styles
 * - `html`: required HTML markup
 */
export interface WebComponentsExample {
  js?: string;
  css?: string;
  html: string;
}

/**
 * A single configuration for a component.
 * Represents one option in the configuration dropdown.
 */
export interface ComponentConfiguration {
  /** Unique identifier for this configuration */
  id: string;

  /** Display name shown in dropdown */
  name: string;

  /** Optional description for tooltip/context */
  description?: string;

  /**
   * Code snippets for each framework.
   * The displayed snippet changes based on site-wide framework preference.
   *
   * Each framework field accepts either:
   * - A string shortcut (markup-only)
   * - An example object when setup code or styles are needed
   *
   * Angular additionally accepts an array of examples for components
   * that support multiple form binding patterns (e.g., Reactive forms
   * with FormControl and Template-driven with ngModel). Each item in
   * the array is rendered with its `title` as a heading.
   */
  code: {
    react: string | ReactExample;
    angular?: string | AngularExample | AngularExample[];
    webComponents: string | WebComponentsExample;
  };
}

/**
 * Collection of configurations for a single component.
 */
export interface ComponentConfigurations {
  /** Component slug (matches content collection) */
  componentSlug: string;

  /** Component name for display */
  componentName: string;

  /** Default configuration ID to show on page load */
  defaultConfigurationId: string;

  /** Optional inline CSS for the preview container (e.g. background color for workspace context) */
  previewStyle?: string;

  /** Optional HTML that wraps each config's webComponents code in the preview only (not shown in code snippet).
   *  Use {{slot}} as placeholder for the component code. */
  previewWrapper?: string;

  /** All available configurations */
  configurations: ComponentConfiguration[];
}

/**
 * Registry of all component configurations.
 * Key is the component slug.
 */
export type ConfigurationRegistry = Record<string, ComponentConfigurations>;
