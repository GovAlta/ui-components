import { ReactNode } from "react";
import { DataAttributes } from "@abgov/ui-components-common";
import { transformProps, kebab } from "../common/extract-props";

interface WCProps {
  id?: string;
  heading?: string;
  "sub-heading"?: string;
  "section-title"?: string;
  "button-text"?: string;
  "back-visibility"?: string;
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
  backVisibility?: "visible" | "hidden";
  error?: string;
  editting?: boolean;
  children: ReactNode;
}

export function GoabPublicFormPage({
  subHeading,
  sectionTitle,
  buttonText,
  backVisibility,
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
      "back-visibility": backVisibility,
      "data-pf-editting": editting ? "true" : undefined,
    },
    kebab
  );

  return <goa-public-form-page {..._props}>{children}</goa-public-form-page>;
}

export default GoabPublicFormPage;
