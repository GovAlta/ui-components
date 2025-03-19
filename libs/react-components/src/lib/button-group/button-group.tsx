import {
  GoabButtonGroupAlignment,
  GoabButtonGroupGap
} from "@abgov/ui-components-common";
import { Margins } from "../../common/types";
interface WCProps extends Margins {
  alignment: GoabButtonGroupAlignment;
  gap?: GoabButtonGroupGap;
  testid?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-button-group": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabButtonGroupProps extends Margins {
  alignment: GoabButtonGroupAlignment;
  gap?: GoabButtonGroupGap;
  testId?: string;
  children?: React.ReactNode;
}

export function GoabButtonGroup({
  alignment,
  gap,
  testId,
  children,
  mt,
  mr,
  mb,
  ml,
}: GoabButtonGroupProps): JSX.Element {
  return (
    <goa-button-group
      alignment={alignment}
      gap={gap}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      testid={testId}
    >
      {children}
    </goa-button-group>
  );
}

export default GoabButtonGroup;
