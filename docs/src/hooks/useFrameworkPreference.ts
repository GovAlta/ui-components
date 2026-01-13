/**
 * useFrameworkPreference Hook
 *
 * Manages site-wide framework preference with localStorage persistence.
 * Used by ConfigurationPreview to remember user's preferred framework.
 */

import { useState, useEffect, useCallback } from 'react';
import type { Framework } from '../data/configurations/types';

const STORAGE_KEY = 'goa-ds-framework-preference';
const DEFAULT_FRAMEWORK: Framework = 'react';

/**
 * Hook to manage framework preference with localStorage persistence.
 *
 * @returns [framework, setFramework] - Current framework and setter function
 */
export function useFrameworkPreference(): [
  Framework,
  (framework: Framework) => void,
] {
  // Initialize with default, will be updated from localStorage on mount
  const [framework, setFrameworkState] = useState<Framework>(DEFAULT_FRAMEWORK);

  // Load preference from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && isValidFramework(stored)) {
        setFrameworkState(stored as Framework);
      }
    } catch (e) {
      // localStorage not available (SSR or privacy mode)
      console.warn('Could not read framework preference from localStorage');
    }
  }, []);

  // Setter that also persists to localStorage
  const setFramework = useCallback((newFramework: Framework) => {
    setFrameworkState(newFramework);
    try {
      localStorage.setItem(STORAGE_KEY, newFramework);
    } catch (e) {
      // localStorage not available
      console.warn('Could not save framework preference to localStorage');
    }
  }, []);

  return [framework, setFramework];
}

/**
 * Type guard to validate framework value from storage.
 */
function isValidFramework(value: string): value is Framework {
  return ['react', 'angular', 'webComponents'].includes(value);
}

export default useFrameworkPreference;
