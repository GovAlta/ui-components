import { ReactNode } from "react";
import { DataAttributes, GoabIconType } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../../lib/common/extract-props";

interface WCProps {
  heading: string;
  leadingicon?: GoabIconType;
  testid?: string;
}

// Note: JSX.IntrinsicElements for "goa-app-header-menu" is declared in the V1 wrapper
// (src/lib/app-header-menu/app-header-menu.tsx). Both wrappers share the same custom element,
// so a duplicate declaration here would cause TS2717 conflicts.
// Version is auto-detected from the parent goa-app-header[version="2"].

export interface GoabxAppHeaderMenuProps extends DataAttributes {
  heading: string;
  leadingIcon?: GoabIconType;
  testId?: string;
  slotName?: string;
  children?: ReactNode;
}

export function GoabxAppHeaderMenu({
  children,
  slotName,
  ...rest
}: GoabxAppHeaderMenuProps) {
  const _props = transformProps<WCProps>(rest, lowercase);

  return (
    <goa-app-header-menu slot={slotName} {..._props}>
      {children}
    </goa-app-header-menu>
  );
}

export default GoabxAppHeaderMenu;
