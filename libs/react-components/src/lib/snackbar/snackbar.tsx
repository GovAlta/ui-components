import { ReactNode } from "react";
import {
  GoabSnackbarType,
  GoabSnackbarVerticalPosition,
  GoabSnackbarHorizontalPosition,
  Margins,
} from "@abgov/ui-components-common";

interface WCProps extends Margins {
  type?: GoabSnackbarType;
  duration?: number;
  showprogress?: boolean;
  testid?: string;
  visible?: boolean;
  progress?: number;
  verticalposition?: GoabSnackbarVerticalPosition;
  horizontalposition?: GoabSnackbarHorizontalPosition;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-snackbar": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabSnackbarProps extends Margins {
  type?: GoabSnackbarType;
  duration?: number;
  progress?: number;
  testId?: string;
  visible?: boolean;
  children?: ReactNode;
  actions?: ReactNode;
  verticalPosition?: GoabSnackbarVerticalPosition;
  horizontalPosition?: GoabSnackbarHorizontalPosition;
}

export function GoabSnackbar(props: GoabSnackbarProps) {
  return (
    <goa-snackbar
      type={props.type}
      duration={props.duration}
      progress={props.progress}
      testid={props.testId}
      visible={props.visible}
      verticalposition={props.verticalPosition}
      horizontalposition={props.horizontalPosition}
      mt={props.mt}
      mr={props.mr}
      mb={props.mb}
      ml={props.ml}
    >
      {props.children}
      {props.actions && <div slot="actions">{props.actions}</div>}
    </goa-snackbar>
  );
}

export default GoabSnackbar;
