import { type JSX } from "react";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-checkbox-list-item": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface WCProps {
  value: string;
  text?: string;
  disabled?: string;
  testid?: string;
  arialabel?: string;
}

export interface GoabCheckboxListItemProps {
  value: string;
  text?: string;
  disabled?: boolean;
  testId?: string;
  ariaLabel?: string;
  children?: React.ReactNode;
}

export function GoabCheckboxListItem({
  value,
  text,
  disabled,
  testId,
  ariaLabel,
  children,
}: GoabCheckboxListItemProps): JSX.Element {
  return (
    <goa-checkbox-list-item
      value={value}
      text={text}
      disabled={disabled ? "true" : undefined}
      testid={testId}
      arialabel={ariaLabel}
    >
      {children}
    </goa-checkbox-list-item>
  );
}

export default GoabCheckboxListItem;
