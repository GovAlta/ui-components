import { ReactNode } from "react";
import { GoabIconType, Margins, DataAttributes } from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {
  leadingicon?: GoabIconType;
  trailingicon?: GoabIconType;
  action?: string;
  actionArgs?: string;
  actionArg?: string;
  testid?: string;
}

interface GoabLinkProps extends Margins, DataAttributes {
  /** Icon displayed before the link text. */
  leadingIcon?: GoabIconType;
  /** Icon displayed after the link text. */
  trailingIcon?: GoabIconType;
  /**
   * Custom action event name to dispatch when the link is clicked.
   * @default ""
   */
  action?: string;
  /**
   * Object of arguments to pass with the action event.
   * @default {}
   */
  actionArgs?: Record<string, unknown>;
  /**
   * Single argument to pass with the action event (deprecated, use actionArgs).
   * @default ""
   */
  actionArg?: string;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  children: ReactNode;
}

export function GoabLink({
  actionArgs,
  actionArg,
  children,
  ...rest
}: GoabLinkProps) {
  const _props = transformProps<WCProps>(rest, lowercase);

  return (
    <goa-link
      action-arg={actionArg}
      action-args={JSON.stringify(actionArgs)}
      {..._props}
    >
      {children}
    </goa-link>
  );
}

export default GoabLink;
