import React, { createContext, useContext, useState, useLayoutEffect, useMemo, ReactNode } from 'react';

interface PageHeaderValuesType {
  title: string;
  actions?: ReactNode;
  tabs?: ReactNode;
  toolbar?: ReactNode;
  hideTitleOnScroll?: boolean;
}

interface PageHeaderSettersType {
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setActions: React.Dispatch<React.SetStateAction<ReactNode>>;
  setTabs: React.Dispatch<React.SetStateAction<ReactNode>>;
  setToolbar: React.Dispatch<React.SetStateAction<ReactNode>>;
  setHideTitleOnScroll: React.Dispatch<React.SetStateAction<boolean>>;
}

const PageHeaderSettersContext = createContext<PageHeaderSettersType | undefined>(undefined);
const PageHeaderValuesContext = createContext<PageHeaderValuesType | undefined>(undefined);

export function PageHeaderProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState('');
  const [actions, setActions] = useState<ReactNode>(undefined);
  const [tabs, setTabs] = useState<ReactNode>(undefined);
  const [toolbar, setToolbar] = useState<ReactNode>(undefined);
  const [hideTitleOnScroll, setHideTitleOnScroll] = useState(false);

  const setters = useMemo(() => ({
    setTitle,
    setActions,
    setTabs,
    setToolbar,
    setHideTitleOnScroll,
  }), []);

  const values = useMemo(() => ({
    title,
    actions,
    tabs,
    toolbar,
    hideTitleOnScroll,
  }), [title, actions, tabs, toolbar, hideTitleOnScroll]);

  return (
    <PageHeaderSettersContext.Provider value={setters}>
      <PageHeaderValuesContext.Provider value={values}>
        {children}
      </PageHeaderValuesContext.Provider>
    </PageHeaderSettersContext.Provider>
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
  const setters = useContext(PageHeaderSettersContext);
  if (!setters) {
    throw new Error('usePageHeader must be used within PageHeaderProvider');
  }

  const isOptionsObject = options && typeof options === 'object' && ('actions' in options || 'tabs' in options || 'toolbar' in options || 'hideTitleOnScroll' in options);
  const actions = isOptionsObject ? (options as UsePageHeaderOptions).actions : options as ReactNode;
  const tabs = isOptionsObject ? (options as UsePageHeaderOptions).tabs : undefined;
  const toolbar = isOptionsObject ? (options as UsePageHeaderOptions).toolbar : undefined;
  const hideTitleOnScroll = isOptionsObject ? (options as UsePageHeaderOptions).hideTitleOnScroll ?? false : false;

  useLayoutEffect(() => {
    setters.setTitle(title);
  }, [title, setters]);

  useLayoutEffect(() => {
    setters.setActions(actions);
  }, [actions, setters]);

  useLayoutEffect(() => {
    setters.setTabs(tabs);
  }, [tabs, setters]);

  useLayoutEffect(() => {
    setters.setToolbar(toolbar);
  }, [toolbar, setters]);

  useLayoutEffect(() => {
    setters.setHideTitleOnScroll(hideTitleOnScroll);
  }, [hideTitleOnScroll, setters]);

  // Cleanup on unmount
  useLayoutEffect(() => {
    return () => {
      setters.setTitle('');
      setters.setActions(undefined);
      setters.setTabs(undefined);
      setters.setToolbar(undefined);
      setters.setHideTitleOnScroll(false);
    };
  }, [setters]);
}

/**
 * Hook for components that display the header (internal use).
 */
export function usePageHeaderContext() {
  const values = useContext(PageHeaderValuesContext);
  if (!values) {
    throw new Error('usePageHeaderContext must be used within PageHeaderProvider');
  }
  return values;
}
