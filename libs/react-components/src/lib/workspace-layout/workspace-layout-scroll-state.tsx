import { createContext, useContext } from "react";
import { GoabWorkspaceLayoutScrollState } from "@abgov/ui-components-common";

export interface GoabWorkspaceLayoutScrollStateValue {
  scrollPosition: GoabWorkspaceLayoutScrollState;
  isScrollable: boolean;
}

export const GoabWorkspaceLayoutScrollStateDefault: GoabWorkspaceLayoutScrollStateValue =
  {
    scrollPosition: GoabWorkspaceLayoutScrollState.NO_SCROLL,
    isScrollable: false,
  };

/** @internal — provided by GoabWorkspaceLayout, consumed via the hook below. */
export const GoabWorkspaceLayoutScrollStateContext =
  createContext<GoabWorkspaceLayoutScrollStateValue>(
    GoabWorkspaceLayoutScrollStateDefault,
  );

/**
 * Hook that returns the current scroll state of the nearest enclosing
 * GoabWorkspaceLayout. Returns `{ scrollPosition: 'no-scroll', isScrollable: false }`
 * if no layout is mounted.
 *
 * @example
 * ```tsx
 * const { scrollPosition, isScrollable } = useGoabWorkspaceLayoutScrollState();
 * const isCollapsed =
 *   scrollPosition === GoabWorkspaceLayoutScrollState.MIDDLE ||
 *   scrollPosition === GoabWorkspaceLayoutScrollState.AT_BOTTOM;
 * ```
 */
export function useGoabWorkspaceLayoutScrollState(): GoabWorkspaceLayoutScrollStateValue {
  return useContext(GoabWorkspaceLayoutScrollStateContext);
}
