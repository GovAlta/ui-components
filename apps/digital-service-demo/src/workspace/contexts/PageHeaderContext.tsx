import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface PageHeaderValuesType {
  title: string;
  actions?: ReactNode;
  tabs?: ReactNode;
  toolbar?: ReactNode;
  hideTitleOnScroll?: boolean;
}

interface PageHeaderContextType {
  values: PageHeaderValuesType;
  setValues: (values: PageHeaderValuesType) => void;
}

const PageHeaderContext = createContext<PageHeaderContextType | undefined>(undefined);

export function PageHeaderProvider({ children }: { children: ReactNode }) {
  const [values, setValuesState] = useState<PageHeaderValuesType>({
    title: '',
    actions: undefined,
    tabs: undefined,
    toolbar: undefined,
    hideTitleOnScroll: false,
  });

  const setValues = useCallback((newValues: PageHeaderValuesType) => {
    setValuesState(newValues);
  }, []);

  return (
    <PageHeaderContext.Provider value={{ values, setValues }}>
      {children}
    </PageHeaderContext.Provider>
  );
}

interface UsePageHeaderOptions {
  actions?: ReactNode;
  tabs?: ReactNode;
  toolbar?: ReactNode;
  hideTitleOnScroll?: boolean;
}

/**
 * Hook for pages to set header content.
 *
 * Usage:
 * ```tsx
 * // Simple - just title
 * usePageHeader('Page Title');
 *
 * // With actions
 * usePageHeader('Page Title', { actions: <Button>Add</Button> });
 *
 * // With tabs and toolbar
 * usePageHeader('Cases', {
 *   tabs: <Tabs>...</Tabs>,
 *   toolbar: <SearchInput />,
 * });
 * ```
 */
export function usePageHeader(title: string, options?: UsePageHeaderOptions | ReactNode) {
  const context = useContext(PageHeaderContext);
  if (!context) {
    throw new Error('usePageHeader must be used within PageHeaderProvider');
  }

  const isOptionsObject = options && typeof options === 'object' && ('actions' in options || 'tabs' in options || 'toolbar' in options || 'hideTitleOnScroll' in options);
  const actions = isOptionsObject ? (options as UsePageHeaderOptions).actions : options as ReactNode;
  const tabs = isOptionsObject ? (options as UsePageHeaderOptions).tabs : undefined;
  const toolbar = isOptionsObject ? (options as UsePageHeaderOptions).toolbar : undefined;
  const hideTitleOnScroll = isOptionsObject ? (options as UsePageHeaderOptions).hideTitleOnScroll ?? false : false;

  // Update header when title changes (e.g., after data loads)
  // Actions/tabs/toolbar should be memoized by calling component to avoid loops
  useEffect(() => {
    context.setValues({
      title,
      actions,
      tabs,
      toolbar,
      hideTitleOnScroll,
    });

    // Cleanup on unmount
    return () => {
      context.setValues({
        title: '',
        actions: undefined,
        tabs: undefined,
        toolbar: undefined,
        hideTitleOnScroll: false,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]); // Re-run when title changes
}

/**
 * Hook for components that display the header (internal use).
 */
export function usePageHeaderContext() {
  const context = useContext(PageHeaderContext);
  if (!context) {
    throw new Error('usePageHeaderContext must be used within PageHeaderProvider');
  }
  return context.values;
}
