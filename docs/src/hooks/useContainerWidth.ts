/**
 * useContainerWidth.ts
 *
 * Hook that observes a container element's width via ResizeObserver.
 * Unlike window-based hooks, this responds to actual container size
 * changes (e.g. when a push drawer opens and shrinks the content area).
 */

import { useState, useEffect, type RefObject } from "react";

export function useContainerNarrow(
  ref: RefObject<HTMLElement | null>,
  breakpoint: number,
): boolean {
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial value synchronously to avoid layout flash
    setIsNarrow(el.getBoundingClientRect().width < breakpoint);

    const observer = new ResizeObserver(([entry]) => {
      setIsNarrow(entry.contentRect.width < breakpoint);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, breakpoint]);

  return isNarrow;
}
