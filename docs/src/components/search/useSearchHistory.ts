/**
 * useSearchHistory Hook
 *
 * Manages recent search history in localStorage.
 * Tracks: query, clicked result (id, type, title), timestamp.
 * Keeps the last 5 searches.
 *
 * Usage:
 *   const { history, addToHistory, clearHistory } = useSearchHistory();
 */

import { useState, useCallback, useEffect } from 'react';

// ============================================================================
// Types
// ============================================================================

export interface HistoryItem {
  /** The result that was clicked */
  id: string;
  type: 'component' | 'example' | 'token' | 'page';
  title: string;
  slug: string;
  /** Category slug for components (e.g., 'inputs-and-actions') */
  category?: string;
  /** Search query that led to this result (optional for direct clicks) */
  query?: string;
  /** When the search occurred */
  timestamp: number;
}

interface UseSearchHistoryReturn {
  /** Recent search history, most recent first */
  history: HistoryItem[];
  /** Add a result to history */
  addToHistory: (item: Omit<HistoryItem, 'timestamp'>) => void;
  /** Clear all history */
  clearHistory: () => void;
}

// ============================================================================
// Constants
// ============================================================================

const STORAGE_KEY = 'goa-ds-recent-searches';
const MAX_HISTORY_ITEMS = 5;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Safely read history from localStorage.
 */
function readHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    // Validate each item has required fields
    return parsed.filter(
      (item): item is HistoryItem =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.id === 'string' &&
        typeof item.type === 'string' &&
        typeof item.title === 'string' &&
        typeof item.slug === 'string' &&
        typeof item.timestamp === 'number'
    );
  } catch {
    return [];
  }
}

/**
 * Safely write history to localStorage.
 */
function writeHistory(history: HistoryItem[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    // localStorage might be full or disabled
    console.warn('Failed to save search history:', error);
  }
}

// ============================================================================
// Hook
// ============================================================================

export function useSearchHistory(): UseSearchHistoryReturn {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    setHistory(readHistory());
  }, []);

  /**
   * Add a clicked result to history.
   * Deduplicates by id+type, moves existing items to top.
   * Limits to MAX_HISTORY_ITEMS.
   */
  const addToHistory = useCallback((item: Omit<HistoryItem, 'timestamp'>) => {
    setHistory(prev => {
      // Create the new item with timestamp
      const newItem: HistoryItem = {
        ...item,
        timestamp: Date.now(),
      };

      // Remove any existing item with same id+type (dedup)
      const filtered = prev.filter(
        h => !(h.id === item.id && h.type === item.type)
      );

      // Add new item at the start, limit to max items
      const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS);

      // Persist to localStorage
      writeHistory(updated);

      return updated;
    });
  }, []);

  /**
   * Clear all search history.
   */
  const clearHistory = useCallback(() => {
    setHistory([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return {
    history,
    addToHistory,
    clearHistory,
  };
}

export default useSearchHistory;
