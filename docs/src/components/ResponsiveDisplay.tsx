/**
 * ResponsiveDisplay.tsx
 *
 * React components for responsive content display using useCompactToolbar hook
 */

import { useCompactToolbar } from "../hooks/useCompactToolbar";
import { type ReactNode } from "react";
import { GoabBlock } from "@abgov/react-components";

interface ResponsiveProps {
  children: ReactNode;
}

/**
 * DesktopOnly - Only renders content on desktop (when toolbar is not compact)
 */
export function DesktopOnly({ children }: ResponsiveProps) {
  const isCompact = useCompactToolbar();
  return !isCompact ? <>{children}</> : null;
}

/**
 * MobileOnly - Only renders content on mobile (when toolbar is compact)
 */
export function MobileOnly({ children }: ResponsiveProps) {
  const isCompact = useCompactToolbar();
  return isCompact ? <>{children}</> : null;
}

interface ResponsiveBlockProps {
  children: ReactNode;
  desktopDirection?: string;
  mobileDirection?: string;
  maxWidth?: string;
  width?: string;
  gap?: string;
}

/**
 * ResponsiveBlock - A goa-block that changes its direction prop based on viewport
 */
export function ResponsiveBlock({
  children,
  desktopDirection = "row",
  mobileDirection = "column",
  maxWidth = "100%",
  width = "100%",
  gap = "l",
}: ResponsiveBlockProps) {
  const isCompact = useCompactToolbar();
  const direction = isCompact ? mobileDirection : desktopDirection;

  return (
    <GoabBlock maxWidth={maxWidth} width={width} direction={direction} gap={gap}>
      {children}
    </GoabBlock>
  );
}
