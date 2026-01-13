/**
 * useTwoLevelSort.ts
 *
 * Hook for managing two-level column sorting.
 * Adapted from goa-workspace-playground.
 *
 * Click cycle: none -> asc -> desc -> none
 * - First click on a column sets it as primary sort (ascending)
 * - If primary exists, clicking a new column sets it as secondary sort
 * - Clicking an active sort column cycles: asc -> desc -> remove
 * - When primary is removed, secondary is promoted to primary
 */

import { useState, useCallback } from 'react';

export interface SortLevel {
  key: string;
  direction: 'asc' | 'desc';
}

export interface SortConfig {
  primary: SortLevel | null;
  secondary: SortLevel | null;
}

export function useTwoLevelSort(initialConfig?: SortConfig) {
  const [sortConfig, setSortConfig] = useState<SortConfig>(
    initialConfig ?? { primary: null, secondary: null }
  );

  /**
   * Sort by a specific key. Core cycling logic.
   */
  const sortByKey = useCallback((key: string) => {
    setSortConfig((prev) => {
      const currentPrimary = prev.primary;
      const currentSecondary = prev.secondary;

      // If clicking on current primary: cycle asc -> desc -> remove
      if (currentPrimary?.key === key) {
        if (currentPrimary.direction === 'asc') {
          return {
            primary: { key, direction: 'desc' },
            secondary: currentSecondary,
          };
        } else {
          // desc -> remove (promote secondary to primary)
          return {
            primary: currentSecondary,
            secondary: null,
          };
        }
      }

      // If clicking on current secondary: cycle asc -> desc -> remove
      if (currentSecondary?.key === key) {
        if (currentSecondary.direction === 'asc') {
          return {
            primary: currentPrimary,
            secondary: { key, direction: 'desc' },
          };
        } else {
          return {
            primary: currentPrimary,
            secondary: null,
          };
        }
      }

      // New field: if no primary, set as primary; if primary exists, set as secondary
      if (!currentPrimary) {
        return {
          primary: { key, direction: 'asc' },
          secondary: null,
        };
      } else {
        return {
          primary: currentPrimary,
          secondary: { key, direction: 'asc' },
        };
      }
    });
  }, []);

  /**
   * Clear all sorting.
   */
  const clearSort = useCallback(() => {
    setSortConfig({ primary: null, secondary: null });
  }, []);

  /**
   * Handle GoabTable onSort event.
   * Used as: <GoabTable onSort={handleTableSort}>
   *
   * This is a convenience wrapper around sortByKey.
   * It extracts sortBy from the event and delegates to sortByKey,
   * which handles the cycling logic (none → asc → desc → none).
   */
  const handleTableSort = useCallback((event: { sortBy: string; sortDir: number }) => {
    const { sortBy } = event;
    sortByKey(sortBy);
  }, [sortByKey]);

  return {
    sortConfig,
    setSortConfig,
    sortByKey,
    clearSort,
    handleTableSort,
  };
}
