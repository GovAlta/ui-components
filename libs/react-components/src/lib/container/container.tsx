import {
  GoabContainerAccent,
  GoabContainerPadding,
  GoabContainerType,
  GoabContainerWidth,
  Margins, DataGridProps,
} from "@abgov/ui-components-common";
import { ReactNode, type JSX } from "react";
import { extractProps } from "../common/extract-props";

interface WCProps extends Margins {
  type?: GoabContainerType;
  accent?: GoabContainerAccent;
  padding?: GoabContainerPadding;
  width?: GoabContainerWidth;
  maxwidth?: string;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-container": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabContainerProps extends Margins, DataGridProps {
  accent?: GoabContainerAccent;
  type?: GoabContainerType;
  heading?: ReactNode;
  title?: ReactNode;
  padding?: GoabContainerPadding;
  actions?: ReactNode;
  children?: ReactNode;
  width?: GoabContainerWidth;
  maxWidth?: string;
  testId?: string;
}

export function GoabContainer(props: GoabContainerProps): JSX.Element {
  const _props = extractProps<WCProps>(props, {
    exclude: ["heading", "title", "actions"],
    attributeMapping: "lowercase",
  });

  const headingContent = props.heading || props.title;

  return (
    <goa-container {..._props}>
      {headingContent && <div slot="title">{headingContent}</div>}
      {props.children}
      {props.actions && <div slot="actions">{props.actions}</div>}
    </goa-container>
  );
}

export default GoabContainer;
