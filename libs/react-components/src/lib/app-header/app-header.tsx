import { useEffect, useRef, type JSX } from "react";
import { DataGridProps } from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";

interface WCProps {
  heading?: string;
  url?: string;
  maxcontentwidth?: string;
  fullmenubreakpoint?: number;
  hasmenuclickhandler?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-app-header": WCProps & React.HTMLAttributes<HTMLElement> & {
        ref: React.RefObject<HTMLElement | null>;
      };
    }
  }
}

export interface GoabAppHeaderProps extends DataGridProps {
  heading?: string;
  url?: string;
  maxContentWidth?: string;
  fullMenuBreakpoint?: number;
  children?: React.ReactNode;
  onMenuClick?: () => void;
  testId?: string;
}

export function GoabAppHeader(props: GoabAppHeaderProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  const _props = extractProps<WCProps>(props, {
    exclude: ["onMenuClick"],
    attributeMapping: "lowercase",
  });

  useEffect(() => {
    if (!el.current) {
      return;
    }
    if (!props.onMenuClick) {
      return;
    }
    const current = el.current;
    const listener = () => {
      props.onMenuClick?.();
    };
    current.addEventListener("_menuClick", listener);
    return () => {
      current.removeEventListener("_menuClick", listener);
    };
  }, [el, props.onMenuClick]);

  return (
    <goa-app-header
      ref={el}
      hasmenuclickhandler={props.onMenuClick ? "true" : "false"}
      {..._props}
    >
      {props.children}
    </goa-app-header>
  );
}

export default GoabAppHeader;
