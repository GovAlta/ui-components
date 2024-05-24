import { ABGovSpacerHorizontalSpacing, ABGovSpacerVerticalSpacing } from "@abgov/ui-components-common";

/* eslint-disable-next-line */
interface WCProps {
  hspacing?: ABGovSpacerHorizontalSpacing;
  vspacing?: ABGovSpacerVerticalSpacing;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-spacer": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

/* eslint-disable-next-line */
export interface ABGovSpacerProps {
  hSpacing?: ABGovSpacerHorizontalSpacing;
  vSpacing?: ABGovSpacerVerticalSpacing;
  testId?: string;
}

export function ABGovSpacer(props: ABGovSpacerProps) {
  return (
    <goa-spacer
      hspacing={props.hSpacing}
      vspacing={props.vSpacing}
      data-testid={props.testId}
    />
  );
}

export default ABGovSpacer;
