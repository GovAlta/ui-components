import { ReactNode } from "react";
import { DataAttributes } from "@abgov/ui-components-common";
import { transformProps, kebab } from "../common/extract-props";

interface WCProps {
  id?: string;
  heading?: string;
  "sub-heading"?: string;
  "section-title"?: string;
  "button-text"?: string;
  "button-type"?: string;
  "button-leading-icon"?: string;
  "back-visibility"?: string;
  "error-summary-position"?: string;
  error?: string;
  "data-pf-editting"?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-public-form-page": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface GoabPublicFormPageProps extends DataAttributes {
  id?: string;
  heading?: string;
  subHeading?: string;
  sectionTitle?: string;
  buttonText?: string;
  buttonType?: "primary" | "secondary" | "tertiary";
  buttonLeadingIcon?: string;
  backVisibility?: "visible" | "hidden";
  /** Controls where the error summary callout appears. Default is "top". */
  errorSummaryPosition?: "top" | "bottom" | "none";
  error?: string;
  editting?: boolean;
  children: ReactNode;
}

export function GoabPublicFormPage({
  subHeading,
  sectionTitle,
  buttonText,
  buttonType,
  buttonLeadingIcon,
  backVisibility,
  errorSummaryPosition,
  editting,
  children,
  ...rest
}: GoabPublicFormPageProps) {
  const _props = transformProps<WCProps>(
    {
      ...rest,
      "sub-heading": subHeading,
      "section-title": sectionTitle,
      "button-text": buttonText,
      "button-type": buttonType,
      "button-leading-icon": buttonLeadingIcon,
      "back-visibility": backVisibility,
      "error-summary-position": errorSummaryPosition,
      "data-pf-editting": editting ? "true" : undefined,
    },
    kebab,
  );

  return <goa-public-form-page {..._props}>{children}</goa-public-form-page>;
}

export default GoabPublicFormPage;
