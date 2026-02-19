import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { useMenu } from './MenuContext';

export type ScrollPosition = 'no-scroll' | 'at-top' | 'middle' | 'at-bottom';

interface ScrollStateContextType {
  scrollPosition: ScrollPosition;
  isScrollable: boolean;
}

const ScrollStateContext = createContext<ScrollStateContextType | undefined>(undefined);

interface ScrollStateProviderProps {
  children: ReactNode;
}

// No delay - hysteresis thresholds handle flickering prevention
const TRANSITION_LOCK_MS = 0;

export function ScrollStateProvider({ children }: ScrollStateProviderProps) {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>('no-scroll');
  const [isScrollable, setIsScrollable] = useState(false);
  const { isMobile } = useMenu();

  // Track when we're in a transition lock period
  const transitionLockRef = useRef<number | null>(null);
  const lastPositionRef = useRef<ScrollPosition>('no-scroll');

  const calculateScrollState = useCallback(() => {
    const containerSelector = isMobile ? '.mobile-content-container' : '.desktop-card-container';
    const container = document.querySelector(containerSelector);

    if (!container) {
      setScrollPosition('no-scroll');
      setIsScrollable(false);
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = container;
    const scrollOverflow = scrollHeight - clientHeight;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    // Hysteresis for isScrollable to prevent flickering when content is at threshold
    const scrollableEnterThreshold = 1;
    const scrollableExitThreshold = 100;

    // Hysteresis thresholds for scroll position
    const enterThreshold = 5;   // Distance to ENTER a boundary state
    const exitThreshold = 15;   // Distance to EXIT a boundary state

    // Update isScrollable with hysteresis
    setIsScrollable(prev => {
      if (prev) {
        return scrollOverflow > -scrollableExitThreshold;
      } else {
        return scrollOverflow > scrollableEnterThreshold;
      }
    });

    // Calculate what position we WOULD be in
    const calculateTargetPosition = (prevPosition: ScrollPosition): ScrollPosition => {
      // Handle no-scroll -> scrolled
      if (prevPosition === 'no-scroll') {
        if (scrollOverflow <= scrollableEnterThreshold) {
          return 'no-scroll';
        }
        if (scrollTop <= enterThreshold) {
          return 'at-top';
        }
        if (distanceFromBottom <= enterThreshold) {
          return 'at-bottom';
        }
        return 'middle';
      }

      // Exit to no-scroll only if content fits with margin
      if (scrollOverflow <= -scrollableExitThreshold) {
        return 'no-scroll';
      }

      // From at-top - need to scroll far to leave
      if (prevPosition === 'at-top') {
        if (scrollTop > exitThreshold) {
          return 'middle';
        }
        return 'at-top';
      }

      // From at-bottom - need to scroll far to leave
      if (prevPosition === 'at-bottom') {
        if (distanceFromBottom > exitThreshold) {
          return 'middle';
        }
        return 'at-bottom';
      }

      // From middle - check boundaries
      if (scrollTop <= enterThreshold) {
        return 'at-top';
      }
      if (distanceFromBottom <= enterThreshold) {
        return 'at-bottom';
      }
      return 'middle';
    };

    setScrollPosition(prevPosition => {
      const targetPosition = calculateTargetPosition(prevPosition);

      // If position would change, check if we're in a transition lock
      if (targetPosition !== prevPosition) {
        const now = Date.now();

        // If we're in a lock period, don't change
        if (transitionLockRef.current && now < transitionLockRef.current) {
          return prevPosition;
        }

        // Allow the change and set a new lock
        transitionLockRef.current = now + TRANSITION_LOCK_MS;
        lastPositionRef.current = targetPosition;
        return targetPosition;
      }

      return prevPosition;
    });
  }, [isMobile]);

  useEffect(() => {
    const containerSelector = isMobile ? '.mobile-content-container' : '.desktop-card-container';
    const container = document.querySelector(containerSelector);

    if (!container) return;

    // Throttle scroll with RAF
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        calculateScrollState();
        rafId = null;
      });
    };

    // Debounce resize observer to ignore size changes during CSS transitions (200ms)
    // This prevents flicker when padding/border-radius transitions change container size
    let resizeDebounceId: ReturnType<typeof setTimeout> | null = null;
    const TRANSITION_DURATION = 250; // Slightly longer than CSS 0.2s to ensure transition completes

    const handleResize = () => {
      if (resizeDebounceId) {
        clearTimeout(resizeDebounceId);
      }
      resizeDebounceId = setTimeout(() => {
        calculateScrollState();
        resizeDebounceId = null;
      }, TRANSITION_DURATION);
    };

    // Initial calculation
    calculateScrollState();

    // Listen for scroll
    container.addEventListener('scroll', handleScroll, { passive: true });

    // Listen for content size changes (debounced)
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Also observe children for content changes
    const children = container.children;
    for (let i = 0; i < children.length; i++) {
      resizeObserver.observe(children[i]);
    }

    // Window resize
    const handleWindowResize = () => {
      setTimeout(calculateScrollState, 10);
    };
    window.addEventListener('resize', handleWindowResize, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleWindowResize);
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeDebounceId) clearTimeout(resizeDebounceId);
    };
  }, [isMobile, calculateScrollState]);

  return (
    <ScrollStateContext.Provider value={{ scrollPosition, isScrollable }}>
      {children}
    </ScrollStateContext.Provider>
  );
}

export function useScrollState() {
  const context = useContext(ScrollStateContext);
  if (context === undefined) {
    throw new Error('useScrollState must be used within a ScrollStateProvider');
  }
  return context;
}
