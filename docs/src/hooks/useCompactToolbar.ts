/**
 * useCompactToolbar.ts
 *
 * Hook to detect if the viewport is below the compact toolbar breakpoint.
 * Used for switching between text+icon and icon-only buttons.
 */

import { useState, useEffect } from "react";

export const COMPACT_TOOLBAR_BREAKPOINT = 768;
export const MOBILE_BREAKPOINT = 624;

/**
 * Hook to detect if the toolbar should show icon-only buttons
 */
export function useCompactToolbar(): boolean {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    // Set initial value
    setIsCompact(window.innerWidth < COMPACT_TOOLBAR_BREAKPOINT);

    const handleResize = () => {
      setIsCompact(window.innerWidth < COMPACT_TOOLBAR_BREAKPOINT);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isCompact;
}

/**
 * Hook to detect if viewport is mobile size
 */
export function useMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
