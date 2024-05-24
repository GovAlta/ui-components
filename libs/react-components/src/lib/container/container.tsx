import { ABGovContainerAccent, ABGovContainerPadding, ABGovContainerType, Margins } from "@abgov/ui-components-common";
import { ReactNode } from "react";

export type GoABContainerType =
  | "interactive"
  | "non-interactive"
  | "info"
  | "error"
  | "success"
  | "important";
export type GoABContainerAccent = "thick" | "thin" | "filled";
export type GoABContainerPadding = "relaxed" | "compact";
export type GoABContainerWidth = "full" | "content";

interface WCProps extends Margins {
  type?: ABGovContainerType;
  accent?: ABGovContainerAccent;
  padding?: ABGovContainerPadding;
  width?: GoABContainerWidth;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-container": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface ABGovContainerProps extends Margins {
  accent?: ABGovContainerAccent;
  type?: ABGovContainerType;
  heading?: ReactNode;
  title?: ReactNode;
  padding?: ABGovContainerPadding;
  actions?: ReactNode;
  children?: ReactNode;
  width?: GoABContainerWidth;
  testId?: string;
}

export function ABGovContainer({
  accent,
  heading,
  title,
  padding,
  children,
  actions,
  type,
  width,
  mt,
  mr,
  mb,
  ml,
  testId,
}: ABGovContainerProps): JSX.Element {
  const headingContent = heading || title;
  return (
    <goa-container
      type={type}
      padding={padding}
      accent={accent}
      width={width}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      data-testid={testId}
    >
      {headingContent && <div slot="title">{headingContent}</div>}
      {children}
      {actions && <div slot="actions">{actions}</div>}
    </goa-container>
  );
}

export default ABGovContainer;
