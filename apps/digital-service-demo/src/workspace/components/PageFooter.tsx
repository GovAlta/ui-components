import React from "react";
import { usePageFooterContext } from '../contexts/PageFooterContext';
import { useScrollState } from '../contexts/ScrollStateContext';

/**
 * Sticky page footer component that renders at the bottom of the viewport.
 *
 * Visibility is controlled by the `visibleWhen` option from usePageFooter:
 * - 'always' - always visible when content is set
 * - 'selection' - visible when hasSelection is true (for bulk actions)
 * - 'scrolled' - visible when page has scrolled (for "back to top" etc.)
 * - true/false - explicit visibility control
 */
export function PageFooter() {
  const { content, visibleWhen, hasSelection } = usePageFooterContext();
  const { scrollPosition, isScrollable } = useScrollState();

  // No content = no footer
  if (!content) return null;

  // Determine if footer should be visible based on visibleWhen mode
  const isVisible = (() => {
    // Boolean modes
    if (visibleWhen === true) return true;
    if (visibleWhen === false) return false;

    // String modes
    switch (visibleWhen) {
      case 'always':
        return true;
      case 'selection':
        return hasSelection;
      case 'scrolled':
        // Visible when NOT at top and content is scrollable
        return isScrollable && scrollPosition !== 'at-top' && scrollPosition !== 'no-scroll';
      default:
        return true;
    }
  })();

  // Don't render at all when not visible - prevents layout space being reserved
  if (!isVisible) return null;

  // Build class names based on state
  const footerClasses = [
    'page-footer',
    isScrollable && scrollPosition ? `page-footer--${scrollPosition.replace('-', '')}` : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={footerClasses}>
      <div className="page-footer__content">
        {content}
      </div>
    </div>
  );
}
