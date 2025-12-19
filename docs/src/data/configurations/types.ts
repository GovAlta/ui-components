/**
 * Configuration Types
 *
 * Defines the structure for component configurations.
 * Each component has multiple preset configurations that users
 * can browse via dropdown selector.
 */

export type Framework = 'react' | 'angular' | 'webComponents';

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
   */
  code: {
    react: string;
    angular: string;
    webComponents: string;
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

  /** All available configurations */
  configurations: ComponentConfiguration[];
}

/**
 * Registry of all component configurations.
 * Key is the component slug.
 */
export type ConfigurationRegistry = Record<string, ComponentConfigurations>;
