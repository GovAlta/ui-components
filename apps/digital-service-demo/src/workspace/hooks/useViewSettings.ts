import { useState, useEffect, useCallback } from 'react';
import { ViewSettings, LayoutType, GroupByField } from '../components/SettingsPopover';

interface UseViewSettingsOptions {
    pageKey: string;
    getDefaultLayout: (tab: string) => LayoutType;
    initialTab: string;
}

interface UseViewSettingsReturn {
    viewSettings: ViewSettings;
    setViewSettings: (settings: ViewSettings) => void;
    layoutCustomized: boolean;
    setLayoutCustomized: (customized: boolean) => void;
    handleSettingsChange: (newSettings: ViewSettings, currentDefaultLayout: LayoutType) => void;
    resetSettings: (defaultLayout: LayoutType) => void;
}

const DEFAULT_VISIBLE_COLUMNS = ['name', 'status', 'staff', 'dueDate', 'jurisdiction', 'fileNumber', 'priority'];

function getStorageKey(pageKey: string): string {
    return `${pageKey}-view-settings`;
}

interface StoredSettings {
    viewSettings: ViewSettings;
    layoutCustomized: boolean;
}

function loadSettings(pageKey: string, defaultLayout: LayoutType): StoredSettings | null {
    try {
        const stored = localStorage.getItem(getStorageKey(pageKey));
        if (stored) {
            const parsed = JSON.parse(stored) as StoredSettings;
            // Validate the stored data has expected shape
            if (
                parsed.viewSettings &&
                typeof parsed.viewSettings.layout === 'string' &&
                Array.isArray(parsed.viewSettings.visibleColumns) &&
                typeof parsed.layoutCustomized === 'boolean'
            ) {
                return parsed;
            }
        }
    } catch (e) {
        console.warn('Failed to load view settings from localStorage:', e);
    }
    return null;
}

function saveSettings(pageKey: string, settings: StoredSettings): void {
    try {
        localStorage.setItem(getStorageKey(pageKey), JSON.stringify(settings));
    } catch (e) {
        console.warn('Failed to save view settings to localStorage:', e);
    }
}

/**
 * Hook for managing view settings with localStorage persistence
 */
export function useViewSettings({
    pageKey,
    getDefaultLayout,
    initialTab,
}: UseViewSettingsOptions): UseViewSettingsReturn {
    const defaultLayout = getDefaultLayout(initialTab);

    // Initialize state from localStorage or defaults
    const [state, setState] = useState<StoredSettings>(() => {
        const stored = loadSettings(pageKey, defaultLayout);
        if (stored) {
            return stored;
        }
        return {
            viewSettings: {
                layout: defaultLayout,
                visibleColumns: [...DEFAULT_VISIBLE_COLUMNS],
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
        setState(prev => ({
            ...prev,
            viewSettings: settings,
        }));
    }, []);

    const setLayoutCustomized = useCallback((customized: boolean) => {
        setState(prev => ({
            ...prev,
            layoutCustomized: customized,
        }));
    }, []);

    const handleSettingsChange = useCallback((newSettings: ViewSettings, currentDefaultLayout: LayoutType) => {
        setState(prev => {
            // Check if layout changed and is different from current tab's default
            const newLayoutCustomized = newSettings.layout !== prev.viewSettings.layout
                ? newSettings.layout !== currentDefaultLayout
                : prev.layoutCustomized;

            return {
                viewSettings: newSettings,
                layoutCustomized: newLayoutCustomized,
            };
        });
    }, []);

    const resetSettings = useCallback((currentDefaultLayout: LayoutType) => {
        setState({
            viewSettings: {
                layout: currentDefaultLayout,
                visibleColumns: [...DEFAULT_VISIBLE_COLUMNS],
                groupBy: null,
            },
            layoutCustomized: false,
        });
    }, []);

    return {
        viewSettings: state.viewSettings,
        setViewSettings,
        layoutCustomized: state.layoutCustomized,
        setLayoutCustomized,
        handleSettingsChange,
        resetSettings,
    };
}
