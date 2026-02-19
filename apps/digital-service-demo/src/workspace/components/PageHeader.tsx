import React from "react";
import {GoabText, GoabIconButton } from '@abgov/react-components';
import { useMenu } from '../contexts/MenuContext';
import { usePageHeaderContext } from '../contexts/PageHeaderContext';
import { useScrollState } from '../contexts/ScrollStateContext';

interface PageHeaderProps {
  title?: string;
  actions?: React.ReactNode;
  tabs?: React.ReactNode;
  toolbar?: React.ReactNode;
  hideTitleOnScroll?: boolean;
}

export function PageHeader({ title: propTitle, actions: propActions, tabs: propTabs, toolbar: propToolbar, hideTitleOnScroll: propHideTitleOnScroll }: PageHeaderProps) {
  const { isMobile, setMenuOpen } = useMenu();
  const { title: contextTitle, actions: contextActions, tabs: contextTabs, toolbar: contextToolbar, hideTitleOnScroll: contextHideTitleOnScroll } = usePageHeaderContext();
  const { scrollPosition, isScrollable } = useScrollState();

  // Use props if provided, otherwise use context
  const title = propTitle ?? contextTitle;
  const actions = propActions ?? contextActions;
  const tabs = propTabs ?? contextTabs;
  const toolbar = propToolbar ?? contextToolbar;
  const hideTitleOnScroll = propHideTitleOnScroll ?? contextHideTitleOnScroll;

  // Derive header state from scroll position
  // Collapsed when scrolled into middle or bottom
  const isCollapsed = scrollPosition === 'middle' || scrollPosition === 'at-bottom';

  // On desktop, don't render if no title
  // On mobile, always render to show the menu button
  if (!title && !isMobile) return null;

  // Build class names based on state
  const headerClasses = [
    'page-header',
    isCollapsed ? 'page-header--collapsed' : 'page-header--expanded',
    isScrollable && scrollPosition ? `page-header--${scrollPosition.replace('-', '')}` : '',
    tabs ? 'page-header--with-tabs' : '',
    toolbar ? 'page-header--with-toolbar' : '',
    hideTitleOnScroll ? 'page-header--hide-title-on-scroll' : ''
  ].filter(Boolean).join(' ');

  // Single DOM structure - CSS handles show/hide with transitions
  return (
    <div className={headerClasses}>
        <div className="page-header__content">
          <div className="page-header__title-container">
            {isMobile && (
              <GoabIconButton
                icon="menu"
                size="medium"
                variant="dark"
                onClick={() => setMenuOpen(true)}
                ariaLabel="Open menu"
              />
            )}
            {title && (
              <GoabText
                tag="h1"
                size={isCollapsed ? "heading-s" : (isMobile ? "heading-m" : "heading-l")}
                mt="none"
                mb="none"
              >
                {title}
              </GoabText>
            )}
          </div>
          {/* Spacer pushes actions to the right in desktop mode */}
          {!isMobile && <div className="page-header__spacer" />}
          {actions && (
            <div className="page-header__actions">{actions}</div>
          )}
        </div>
        {tabs && (
          <div className="page-header__tabs" style={{"--goa-tabs-margin-bottom": "0"} as React.CSSProperties}>
            {tabs}
          </div>
        )}
        {toolbar && (
          <div className="page-header__toolbar page-header__toolbar--expanded">
            {toolbar}
          </div>
        )}
    </div>
  );
}
