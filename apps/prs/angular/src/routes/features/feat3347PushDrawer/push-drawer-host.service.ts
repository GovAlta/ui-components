import { Injectable, signal } from "@angular/core";

/**
 * Shared state for the push drawer that lives in the app shell. Mirrors the
 * React playground pattern where the drawer is rendered at the workspace
 * layout level and the route just triggers open via outlet context.
 */
@Injectable({ providedIn: "root" })
export class PushDrawerHostService {
  readonly open = signal(false);

  openDrawer() {
    this.open.set(true);
  }

  closeDrawer() {
    this.open.set(false);
  }
}
