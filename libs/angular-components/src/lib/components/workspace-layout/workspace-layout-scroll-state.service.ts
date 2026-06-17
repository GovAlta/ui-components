import { Injectable, signal } from "@angular/core";
import { GoabWorkspaceLayoutScrollState } from "@abgov/ui-components-common";

/**
 * Tracks the current scroll state of the active GoabWorkspaceLayout.
 * The Consumers (typically page-header or page-footer components) inject this
 * service to react to scroll position without wiring an Output event handler.
 *
 * Note: If multiple GoabWorkspaceLayouts are
 * mounted simultaneously (uncommon), the most recent update wins.
 */
@Injectable({ providedIn: "root" })
export class GoabWorkspaceLayoutScrollStateService {
  private _scrollPosition = signal<GoabWorkspaceLayoutScrollState>(
    GoabWorkspaceLayoutScrollState.NO_SCROLL,
  );
  private _isScrollable = signal(false);

  /** Current scroll position. Reacts to user scroll progress. */
  readonly scrollPosition = this._scrollPosition.asReadonly();

  /** Whether the content actually overflows (false when content fits the viewport). */
  readonly isScrollable = this._isScrollable.asReadonly();

  /**
   * @internal — called by GoabWorkspaceLayout.
   */
  _setState(state: GoabWorkspaceLayoutScrollState, isScrollable: boolean): void {
    this._scrollPosition.set(state);
    this._isScrollable.set(isScrollable);
  }
}
