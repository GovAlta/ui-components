import React from "react";
import { Margins } from "../../common/styling";

interface WCProps extends Margins {
  name: string;
  value?: string;
  label?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-option": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface OptionProps extends Margins {
  name: string;
  value?: string;
  label?: string;
}

export function GoAOption(props: OptionProps) {
  return (
    <goa-option
      name={props.name}
      value={props.value}
      label={props.label}
      mt={props.mt}
      mr={props.mr}
      mb={props.mb}
      ml={props.ml}
    />
  );
}

export default GoAOption;
