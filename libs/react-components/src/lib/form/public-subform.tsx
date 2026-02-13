import { ReactNode } from "react";
import { DataAttributes, GoabButtonType, GoabButtonSize } from "@abgov/ui-components-common";

interface WCProps {
  addbuttontext?: string;
  addbuttontype?: string;
  addbuttonsize?: string;
  addbuttonicon?: string;
  addheading?: string;
  editheading?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-pf-subform": WCProps &
        React.HTMLAttributes<HTMLElement> & {
          children?: React.ReactNode;
        };
    }
  }
}

interface GoabPfSubformProps extends DataAttributes {
  formContent?: ReactNode;
  children?: ReactNode;
  /** Text for the Add button. Default: "Add" */
  addButtonText?: string;
  /** Button type for the Add button. Default: "primary" */
  addButtonType?: GoabButtonType;
  /** Button size for the Add button. Default: "default" */
  addButtonSize?: GoabButtonSize;
  /** Leading icon for the Add button */
  addButtonIcon?: string;
  /** Modal heading when adding a new item */
  addHeading?: string;
  /** Modal heading when editing an existing item */
  editHeading?: string;
}

export function GoabPfSubform({
  formContent,
  children,
  addButtonText,
  addButtonType,
  addButtonSize,
  addButtonIcon,
  addHeading,
  editHeading,
  ...rest
}: GoabPfSubformProps) {
  return (
    <goa-pf-subform
      addbuttontext={addButtonText}
      addbuttontype={addButtonType}
      addbuttonsize={addButtonSize}
      addbuttonicon={addButtonIcon}
      addheading={addHeading}
      editheading={editHeading}
      {...rest}
    >
      {formContent && <div slot="form">{formContent}</div>}
      {children}
    </goa-pf-subform>
  );
}

export default GoabPfSubform;
