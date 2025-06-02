import { ReactNode, useEffect, useRef } from "react";
import {
  GoabPublicFormPageButtonVisibility,
  GoabPublicFormPageOnFieldsetChangeDetail,
  GoabPublicFormPageOnCompleteDetail,
  GoabPublicFormPageStep,
  Margins,
} from "@abgov/ui-components-common";

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
  first?: boolean;
  last?: boolean;
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

interface GoabPublicFormPageProps extends Margins {
  id?: string;
  heading?: string;
  subHeading?: string;
  summaryHeading?: string;
  sectionTitle?: string;
  backUrl?: string;
  type?: GoabPublicFormPageStep;
  buttonText?: string;
  buttonVisibility?: GoabPublicFormPageButtonVisibility;
  first?: boolean;
  last?: boolean;
  /**
   * Triggered when the form page continues to the next step
   * @param event - The continue event details
   */
  onContinue?: (event: Event) => void;
  /**
   * Triggered when the user clicks the back link
   */
  onBack?: () => void;
  /**
   * Triggered when the form fieldset content changes
   * @param event - The fieldset change event details
   */
  onFieldsetChange?: (event: GoabPublicFormPageOnFieldsetChangeDetail) => void;
  /**
   * Triggered when the form is completed
   * @param event - The complete event details
   */
  onComplete?: (event: GoabPublicFormPageOnCompleteDetail) => void;
  children: ReactNode;
}

export function GoabPublicFormPage({
  id = "",
  heading = "",
  subHeading = "",
  summaryHeading = "",
  sectionTitle = "",
  backUrl = "",
  type = "step",
  buttonText = "",
  buttonVisibility = "visible",
  first = false,
  last = false,
  onContinue,
  onBack,
  onFieldsetChange,
  onComplete,
  children,
  mt,
  mr,
  mb,
  ml,
}: GoabPublicFormPageProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const current = ref.current;

    const continueListener = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      onContinue?.(detail);
    };

    const backListener = () => {
      onBack?.();
    };

    const fieldsetChangeListener = (e: Event) => {
      const detail = (e as CustomEvent<GoabPublicFormPageOnFieldsetChangeDetail>).detail;
      onFieldsetChange?.(detail);
    };

    const completeListener = (e: Event) => {
      const detail = (e as CustomEvent<GoabPublicFormPageOnCompleteDetail>).detail;
      onComplete?.(detail);
    };

    if (onContinue) {
      current.addEventListener("_continue", continueListener);
    }
    if (onBack) {
      current.addEventListener("_back", backListener);
    }
    if (onFieldsetChange) {
      current.addEventListener("_fieldsetChange", fieldsetChangeListener);
    }
    if (onComplete) {
      current.addEventListener("_complete", completeListener);
    }

    return () => {
      if (onContinue) {
        current.removeEventListener("_continue", continueListener);
      }
      if (onBack) {
        current.removeEventListener("_back", backListener);
      }
      if (onFieldsetChange) {
        current.removeEventListener("_fieldsetChange", fieldsetChangeListener);
      }
      if (onComplete) {
        current.removeEventListener("_complete", completeListener);
      }
    };
  }, [ref, onContinue, onBack, onFieldsetChange, onComplete]);

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
      first={first}
      last={last}
      summary-heading={summaryHeading}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {children}
    </goa-public-form-page>
  );
}

export default GoabPublicFormPage;
