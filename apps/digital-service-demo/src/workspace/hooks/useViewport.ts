import { useState, useEffect } from 'react';

/**
 * Breakpoint for compact toolbar (icon-only buttons)
 * This is different from the mobile layout breakpoint (624px)
 */
export const COMPACT_TOOLBAR_BREAKPOINT = 768;

/**
 * Hook to detect if the viewport is below the compact toolbar breakpoint
 * @returns boolean indicating if the toolbar should show icon-only buttons
 */
export function useCompactToolbar(): boolean {
    const [isCompact, setIsCompact] = useState(
        () => window.innerWidth < COMPACT_TOOLBAR_BREAKPOINT
    );

    useEffect(() => {
        const handleResize = () => {
            setIsCompact(window.innerWidth < COMPACT_TOOLBAR_BREAKPOINT);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isCompact;
}
