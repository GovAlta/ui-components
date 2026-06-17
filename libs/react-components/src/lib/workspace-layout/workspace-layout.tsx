import {
  DataAttributes,
  GoabWorkspaceLayoutOnScrollStateChangeDetail,
} from "@abgov/ui-components-common";
import React, { ReactNode, useEffect, useRef, useState, type JSX } from "react";
import {
  GoabWorkspaceLayoutScrollStateContext,
  GoabWorkspaceLayoutScrollStateDefault,
} from "./workspace-layout-scroll-state";

interface WCProps {
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-workspace-layout": WCProps &
        React.HTMLAttributes<HTMLElement> & {
          ref: React.RefObject<HTMLElement | null>;
        };
    }
  }
}

export interface GoabWorkspaceLayoutProps extends DataAttributes {
  /** Content rendered in the side navigation region (e.g. work-side-menu). */
  sideMenu?: ReactNode;
  /** Content rendered in the sticky page header region. */
  pageHeader?: ReactNode;
  /** Content rendered in the sticky page footer region. */
  pageFooter?: ReactNode;
  /**
   * A GoabPushDrawer rendered as a sibling of the main card, inside the same
   * workspace shell. Use this slot when the page needs a push drawer alongside
   * the workspace layout — it gives the drawer the shell-level height and flex
   * context it expects, so the consumer does not have to wrap the layout in
   * their own flex container. The side menu is not pushed; only the card is.
   */
  pushDrawer?: ReactNode;
  /** Main scrollable content. */
  children?: ReactNode;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /**
   * Called whenever the internal scroll state changes (no-scroll → at-top →
   * middle → at-bottom)
   */
  onScrollStateChange?: (detail: GoabWorkspaceLayoutOnScrollStateChangeDetail) => void;
}

export function GoabWorkspaceLayout({
  sideMenu,
  pageHeader,
  pageFooter,
  pushDrawer,
  children,
  testId,
  onScrollStateChange,
  ...rest
}: GoabWorkspaceLayoutProps): JSX.Element {
  const ref = useRef<HTMLElement | null>(null);
  const [scrollState, setScrollState] = useState(GoabWorkspaceLayoutScrollStateDefault);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const listener = (e: Event) => {
      const detail = (e as CustomEvent<GoabWorkspaceLayoutOnScrollStateChangeDetail>)
        .detail;
      setScrollState({
        scrollPosition: detail.state,
        isScrollable: detail.isScrollable,
      });
      onScrollStateChange?.({ ...detail, event: e });
    };
    el.addEventListener("_scrollStateChange", listener);
    return () => el.removeEventListener("_scrollStateChange", listener);
  }, [onScrollStateChange]);

  return (
    <GoabWorkspaceLayoutScrollStateContext.Provider value={scrollState}>
      <goa-workspace-layout ref={ref} testid={testId} {...rest}>
        {sideMenu && <div slot="side-menu">{sideMenu}</div>}
        {pageHeader && <div slot="page-header">{pageHeader}</div>}
        {children}
        {pageFooter && <div slot="page-footer">{pageFooter}</div>}
        {pushDrawer && <div slot="push-drawer">{pushDrawer}</div>}
      </goa-workspace-layout>
    </GoabWorkspaceLayoutScrollStateContext.Provider>
  );
}

export default GoabWorkspaceLayout;

export {
  useGoabWorkspaceLayoutScrollState,
  type GoabWorkspaceLayoutScrollStateValue,
} from "./workspace-layout-scroll-state";
