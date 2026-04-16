import { ReactNode, useEffect, useRef } from "react";
import {
  GoabPublicFormPageButtonVisibility,
  GoabPublicFormPageStep,
  Margins,
  DataAttributes,
} from "@abgov/ui-components-common";
import { transformProps, kebab } from "../common/extract-props";

interface WCProps extends Margins {
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
      "goa-public-form-page": WCProps &
        React.HTMLAttributes<HTMLElement> & {
          ref: React.RefObject<HTMLElement | null>;
        };
    }
  }
}

interface GoabPublicFormPageProps extends Margins, DataAttributes {
  /** Content rendered inside the form page. */
  children: ReactNode;
  /** Sets the unique identifier for the form page. */
  id?: string;
  /** Sets the heading text displayed at the top of the form page. */
  heading?: string;
  /** Sets the subheading text displayed below the main heading. */
  subHeading?: string;
  /** Sets the heading text used when this page appears in the form summary. */
  summaryHeading?: string;
  /** Sets the section title displayed above the heading. */
  sectionTitle?: string;
  /** Sets the URL for the back navigation link. */
  backUrl?: string;
  /** Sets the type of the form page. @default "step" */
  type?: GoabPublicFormPageStep;
  /** Sets the text label for the continue or confirm button. */
  buttonText?: string;
  /** Sets the visibility of the continue button. @default "visible" */
  buttonVisibility?: GoabPublicFormPageButtonVisibility;
  /** Callback fired when the form page continues to the next step. */
  onContinue?: (event: Event) => void;
}

/** Container for form inputs and validation. */
export function GoabPublicFormPage({
  onContinue,
  children,
  ...rest
}: GoabPublicFormPageProps) {
  const ref = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>(rest, kebab);

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
    <goa-public-form-page ref={ref} {..._props}>
      {children}
    </goa-public-form-page>
  );
}

export default GoabPublicFormPage;
