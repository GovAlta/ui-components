/**
 * useViewSettings.ts
 *
 * Hook for managing view settings with localStorage persistence.
 * Handles layout, visible columns, and grouping preferences.
 */

import { useState, useEffect, useCallback } from "react";

export type LayoutType = "table" | "card" | "list";
export type GroupByField = string | null;

export interface ViewSettings {
  layout: LayoutType;
  visibleColumns: string[];
  groupBy: GroupByField;
}

interface UseViewSettingsOptions {
  pageKey: string;
  defaultLayout?: LayoutType;
  defaultColumns: string[];
  groupByOptions?: string[];
}

interface StoredSettings {
  viewSettings: ViewSettings;
  layoutCustomized: boolean;
}

function getStorageKey(pageKey: string): string {
  return `ds-${pageKey}-view-settings`;
}

function loadSettings(pageKey: string): StoredSettings | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem(getStorageKey(pageKey));
    if (stored) {
      const parsed = JSON.parse(stored) as StoredSettings;
      if (
        parsed.viewSettings &&
        typeof parsed.viewSettings.layout === "string" &&
        Array.isArray(parsed.viewSettings.visibleColumns)
      ) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Failed to load view settings:", e);
  }
  return null;
}

function saveSettings(pageKey: string, settings: StoredSettings): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(getStorageKey(pageKey), JSON.stringify(settings));
  } catch (e) {
    console.warn("Failed to save view settings:", e);
  }
}

export function useViewSettings({
  pageKey,
  defaultLayout = "table",
  defaultColumns,
}: UseViewSettingsOptions) {
  const [state, setState] = useState<StoredSettings>(() => {
    const stored = loadSettings(pageKey);
    if (stored) {
      return stored;
    }
    return {
      viewSettings: {
        layout: defaultLayout,
        visibleColumns: [...defaultColumns],
        groupBy: null,
      },
      layoutCustomized: false,
    };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveSettings(pageKey, state);
  }, [pageKey, state]);

  const setViewSettings = useCallback((settings: ViewSettings) => {
    setState((prev) => ({
      ...prev,
      viewSettings: settings,
    }));
  }, []);

  const setLayout = useCallback(
    (layout: LayoutType) => {
      setState((prev) => ({
        ...prev,
        viewSettings: { ...prev.viewSettings, layout },
        layoutCustomized: layout !== defaultLayout,
      }));
    },
    [defaultLayout],
  );

  const setGroupBy = useCallback((groupBy: GroupByField) => {
    setState((prev) => ({
      ...prev,
      viewSettings: { ...prev.viewSettings, groupBy },
    }));
  }, []);

  const toggleColumn = useCallback((columnKey: string) => {
    setState((prev) => {
      const currentColumns = prev.viewSettings.visibleColumns;
      const newColumns = currentColumns.includes(columnKey)
        ? currentColumns.filter((c) => c !== columnKey)
        : [...currentColumns, columnKey];

      // Ensure at least one column remains visible
      if (newColumns.length === 0) return prev;

      return {
        ...prev,
        viewSettings: { ...prev.viewSettings, visibleColumns: newColumns },
      };
    });
  }, []);

  const resetSettings = useCallback(() => {
    setState({
      viewSettings: {
        layout: defaultLayout,
        visibleColumns: [...defaultColumns],
        groupBy: null,
      },
      layoutCustomized: false,
    });
  }, [defaultLayout, defaultColumns]);

  return {
    viewSettings: state.viewSettings,
    layoutCustomized: state.layoutCustomized,
    setViewSettings,
    setLayout,
    setGroupBy,
    toggleColumn,
    resetSettings,
  };
}
