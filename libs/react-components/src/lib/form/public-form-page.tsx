import { ReactNode, useEffect, useRef } from "react";
import {
  GoabPublicFormPageButtonVisibility,
  GoabPublicFormPageStep,
  Margins,
} from "@abgov/ui-components-common";
import { DataGridProps, useDataGridProps } from "../common/data-props";

interface WCProps extends Margins {
  ref?: React.RefObject<HTMLElement | null>;
  id?: string;
  heading?: string;
  "sub-heading"?: string;
  "section-title"?: string;
  "back-url"?: string;
  type?: string;
  "button-text"?: string;
  "button-visibility"?: string;
  "summary-heading"?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-public-form-page": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface GoabPublicFormPageProps extends Margins, DataGridProps {
  id?: string;
  heading?: string;
  subHeading?: string;
  summaryHeading?: string;
  sectionTitle?: string;
  backUrl?: string;
  type?: GoabPublicFormPageStep;
  buttonText?: string;
  buttonVisibility?: GoabPublicFormPageButtonVisibility;
  /**
   * Triggered when the form page continues to the next step
   * @param event - The continue event details
   */
  onContinue?: (event: Event) => void;
  children: ReactNode;
}

export function GoabPublicFormPage(props: GoabPublicFormPageProps) {
  const [dataGridProps, {
    id = "",
    heading = "",
    subHeading = "",
    summaryHeading = "",
    sectionTitle = "",
    backUrl = "",
    type = "step",
    buttonText = "",
    buttonVisibility = "visible",
    onContinue,
    children,
    mt,
    mr,
    mb,
    ml,
  }] = useDataGridProps(props);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const current = ref.current;

    const continueListener = (e: Event) => {
      onContinue?.(e);
    };

    if (onContinue) {
      current.addEventListener("_continue", continueListener);
    }

    return () => {
      if (onContinue) {
        current.removeEventListener("_continue", continueListener);
      }
    };
  }, [ref, onContinue]);

  return (
    <goa-public-form-page
      ref={ref}
      id={id}
      heading={heading}
      sub-heading={subHeading}
      section-title={sectionTitle}
      back-url={backUrl}
      type={type}
      button-text={buttonText}
      button-visibility={buttonVisibility}
      summary-heading={summaryHeading}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      {...dataGridProps}
    >
      {children}
    </goa-public-form-page>
  );
}

export default GoabPublicFormPage;
