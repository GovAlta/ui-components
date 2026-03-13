/**
 * useGroupShadowDomFixes.ts
 *
 * Shadow DOM workaround for GoabxWorkSideMenuGroup:
 * Hides the leading icon since there's no optional icon prop yet.
 *
 * TODO: Remove this workaround when #3544 lands (optional icon prop for
 * WorkSideMenuGroup). The `open` prop workaround was already removed
 * after #3460 added native support.
 *
 * Injects a <style> into each group's shadow root.
 * Uses requestAnimationFrame because Svelte custom elements render
 * shadow DOM content asynchronously via microtasks.
 */

import { useEffect, type RefObject } from "react";

export function useGroupShadowDomFixes(ref: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (!ref.current) return;

    const applyFixes = () => {
      if (!ref.current) return;
      const groups = ref.current.querySelectorAll("goa-work-side-menu-group");
      groups.forEach((group) => {
        const shadow = group.shadowRoot;
        if (!shadow) return;

        // Inject icon-hiding styles (once)
        if (!shadow.querySelector("[data-hide-group-icon]")) {
          const style = document.createElement("style");
          style.setAttribute("data-hide-group-icon", "");
          style.textContent = `
            summary > goa-icon:first-of-type { display: none; }
            summary { padding-left: calc(var(--goa-space-xs) + var(--goa-space-3xs) + 1.25rem + var(--goa-space-m)) !important; }
            details > :not(summary) { margin-left: calc(var(--goa-space-3xs) + 1.25rem) !important; }
          `;
          shadow.appendChild(style);
        }
      });
    };

    requestAnimationFrame(applyFixes);
  });
}
