import React, { createContext, useContext, useState, useLayoutEffect, useMemo, ReactNode } from 'react';

type VisibilityMode = 'always' | 'selection' | 'scrolled' | boolean;

interface PageFooterValuesType {
  content: ReactNode;
  visibleWhen: VisibilityMode;
  hasSelection: boolean;
}

interface PageFooterSettersType {
  setContent: React.Dispatch<React.SetStateAction<ReactNode>>;
  setVisibleWhen: React.Dispatch<React.SetStateAction<VisibilityMode>>;
  setHasSelection: React.Dispatch<React.SetStateAction<boolean>>;
}

// Separate contexts - setters are stable, values change
const PageFooterSettersContext = createContext<PageFooterSettersType | undefined>(undefined);
const PageFooterValuesContext = createContext<PageFooterValuesType | undefined>(undefined);

export function PageFooterProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ReactNode>(undefined);
  const [visibleWhen, setVisibleWhen] = useState<VisibilityMode>('always');
  const [hasSelection, setHasSelection] = useState(false);

  // Setters are stable - this object never changes
  const setters = useMemo(() => ({
    setContent,
    setVisibleWhen,
    setHasSelection,
  }), []);

  // Values change when state changes
  const values = useMemo(() => ({
    content,
    visibleWhen,
    hasSelection,
  }), [content, visibleWhen, hasSelection]);

  return (
    <PageFooterSettersContext.Provider value={setters}>
      <PageFooterValuesContext.Provider value={values}>
        {children}
      </PageFooterValuesContext.Provider>
    </PageFooterSettersContext.Provider>
  );
}

interface UsePageFooterOptions {
  content: ReactNode;
  visibleWhen?: VisibilityMode;  // default: 'always'
  hasSelection?: boolean;        // required when visibleWhen is 'selection'
}

/**
 * Hook for pages to declare footer content.
 *
 * Usage:
 * ```tsx
 * // Simple - always visible footer
 * usePageFooter(<GoabButtonGroup>...</GoabButtonGroup>);
 *
 * // With options - visible when items are selected
 * usePageFooter({
 *   content: <BulkActionsBar />,
 *   visibleWhen: 'selection',
 *   hasSelection: selectedItems.length > 0,
 * });
 *
 * // Visible when page is scrolled
 * usePageFooter({
 *   content: <BackToTopButton />,
 *   visibleWhen: 'scrolled',
 * });
 * ```
 */
export function usePageFooter(options: ReactNode | UsePageFooterOptions) {
  // Only use setters context - this won't cause re-renders when values change
  const setters = useContext(PageFooterSettersContext);
  if (!setters) {
    throw new Error('usePageFooter must be used within PageFooterProvider');
  }

  // Support both simple (just content) and options object signatures
  const isOptionsObject = options && typeof options === 'object' && 'content' in options;
  const content = isOptionsObject ? (options as UsePageFooterOptions).content : options as ReactNode;
  const visibleWhen = isOptionsObject ? (options as UsePageFooterOptions).visibleWhen ?? 'always' : 'always';
  const hasSelection = isOptionsObject ? (options as UsePageFooterOptions).hasSelection ?? false : false;

  // Update context when values change - setters are stable so no loop
  useLayoutEffect(() => {
    setters.setContent(content);
  }, [content, setters]);

  useLayoutEffect(() => {
    setters.setVisibleWhen(visibleWhen);
  }, [visibleWhen, setters]);

  useLayoutEffect(() => {
    setters.setHasSelection(hasSelection);
  }, [hasSelection, setters]);

  // Cleanup on unmount - reset footer when page navigates away
  useLayoutEffect(() => {
    return () => {
      setters.setContent(undefined);
      setters.setVisibleWhen('always');
      setters.setHasSelection(false);
    };
  }, [setters]);
}

/**
 * Hook for components that display the footer (internal use).
 * Returns the current footer configuration.
 */
export function usePageFooterContext() {
  // Only use values context - for components that display the footer
  const values = useContext(PageFooterValuesContext);
  if (!values) {
    throw new Error('usePageFooterContext must be used within PageFooterProvider');
  }
  return values;
}
