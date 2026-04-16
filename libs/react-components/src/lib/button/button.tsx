import { ReactNode, useEffect, useRef, type JSX } from "react";
import {
  GoabButtonSize,
  GoabButtonType,
  GoabButtonVariant,
  GoabIconType,
  Margins,
  DataAttributes,
} from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {
  type?: GoabButtonType;
  size?: GoabButtonSize;
  variant?: GoabButtonVariant;
  disabled?: string;
  leadingicon?: string;
  trailingicon?: string;
  width?: string;
  testid?: string;
  action?: string;
  actionArgs?: string;
  actionArg?: string;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-button": WCProps &
        React.HTMLAttributes<HTMLElement> & {
          ref: React.RefObject<HTMLElement | null>;
        };
    }
  }
}

export interface GoabButtonProps extends Margins, DataAttributes {
  /** Sets the visual style of the button. Use "primary" for main actions, "secondary" for alternative actions, "tertiary" for low-emphasis actions, and "start" for prominent call-to-action buttons. @default "primary" */
  type?: GoabButtonType;
  /** Controls the size of the button. Use "compact" for inline actions or space-constrained layouts. @default "normal" */
  size?: GoabButtonSize;
  /** Sets the color variant for semantic meaning. Use "destructive" for delete or irreversible actions, "inverse" for dark backgrounds. @default "normal" */
  variant?: GoabButtonVariant;
  /** When true, prevents user interaction and applies disabled styling. */
  disabled?: boolean;
  /** Icon displayed before the button text. */
  leadingIcon?: GoabIconType;
  /** Icon displayed after the button text. */
  trailingIcon?: GoabIconType;
  /** Sets a custom width for the button (e.g., "200px" or "100%"). */
  width?: string;
  /** Callback fired when the button is clicked. */
  onClick?: () => void;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Action identifier passed in click events for event delegation patterns. */
  action?: string;
  /** Multiple argument values passed with the action in click events. */
  actionArgs?: Record<string, unknown>;
  /** Single argument value passed with the action in click events. */
  actionArg?: string;
  /** Content rendered inside the button. */
  children?: ReactNode;
}

/** Carry out an important action or navigate to another page. */
export function GoabButton({
  disabled,
  onClick,
  actionArgs,
  actionArg,
  children,
  ...rest
}: GoabButtonProps): JSX.Element {
  const el = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>(rest, lowercase);

  useEffect(() => {
    if (!el.current) {
      return;
    }
    if (!onClick) {
      return;
    }
    const current = el.current;
    const listener = () => {
      onClick?.();
    };

    current.addEventListener("_click", listener);
    return () => {
      current.removeEventListener("_click", listener);
    };
  }, [el, onClick]);

  return (
    <goa-button
      ref={el}
      disabled={disabled ? "true" : undefined}
      action-arg={actionArg}
      action-args={JSON.stringify(actionArgs)}
      {..._props}
      version="2"
    >
      {children}
    </goa-button>
  );
}

export default GoabButton;
