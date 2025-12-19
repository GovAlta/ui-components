/**
 * Global Framework Preference
 *
 * Manages user's preferred framework (React, Angular, Web Components) site-wide.
 * Uses localStorage for persistence and CustomEvents for cross-component sync.
 */

export type Framework = 'react' | 'angular' | 'webComponents';

const STORAGE_KEY = 'ds-framework-preference';
const EVENT_NAME = 'framework-preference-change';
const DEFAULT_FRAMEWORK: Framework = 'react';

/**
 * Get the user's framework preference from localStorage
 */
export function getFrameworkPreference(): Framework {
  if (typeof window === 'undefined') return DEFAULT_FRAMEWORK;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'react' || stored === 'angular' || stored === 'webComponents') {
    return stored;
  }
  return DEFAULT_FRAMEWORK;
}

/**
 * Set the user's framework preference and broadcast to all components
 */
export function setFrameworkPreference(framework: Framework): void {
  if (typeof window === 'undefined') return;

  localStorage.setItem(STORAGE_KEY, framework);
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: framework }));
}

/**
 * Subscribe to framework preference changes from other components
 * Returns an unsubscribe function
 */
export function subscribeToFrameworkPreference(
  callback: (framework: Framework) => void
): () => void {
  if (typeof window === 'undefined') return () => {};

  const handler = (e: Event) => {
    callback((e as CustomEvent<Framework>).detail);
  };
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}
