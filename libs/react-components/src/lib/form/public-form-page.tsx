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
