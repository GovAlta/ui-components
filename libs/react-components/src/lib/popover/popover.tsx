import { DataGridProps, GoabPopoverPosition, Margins } from "@abgov/ui-components-common";
import { ReactNode, type JSX } from "react";
import { extractProps } from "../common/extract-props";

interface WCProps extends Margins {
  maxwidth?: string;
  minwidth?: string;
  padded?: string;
  position?: GoabPopoverPosition;
  relative?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-popover": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabPopoverProps extends Margins, DataGridProps {
  target?: ReactNode;
  testId?: string;
  maxWidth?: string;
  minWidth?: string;
  padded?: boolean;
  position?: GoabPopoverPosition;
  children: ReactNode;
  /***
   * @deprecated This property has no effect and will be removed in a future version
   */
  relative?: boolean;
}

export function GoabPopover(props: GoabPopoverProps): JSX.Element {
  const _props = extractProps<WCProps>(props, {
    exclude: ["target", "padded", "relative"],
    attributeMapping: "lowercase",
  });

  return (
    <goa-popover
      padded={typeof props.padded === "undefined" ? undefined : props.padded ? "true" : "false"}
      relative={props.relative ? "true" : undefined}
      {..._props}
    >
      {props.children}
      {props.target && <div slot="target">{props.target}</div>}
    </goa-popover>
  );
}

export default GoabPopover;
