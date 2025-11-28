import { ReactNode, useEffect, useRef } from "react";
import {
  GoabPublicFormPageButtonVisibility,
  GoabPublicFormPageStep,
  Margins, DataGridProps,
} from "@abgov/ui-components-common";
import { extractProps } from "../common/extract-props";

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
      "goa-public-form-page": WCProps & React.HTMLAttributes<HTMLElement> & {
        ref: React.RefObject<HTMLElement | null>;
      };
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
  const ref = useRef<HTMLElement>(null);

  const _props = extractProps<WCProps>(props, {
    exclude: ["onContinue"],
    attributeMapping: "kebab",
  });

  useEffect(() => {
    if (!ref.current) return;
    const current = ref.current;

    const continueListener = (e: Event) => {
      props.onContinue?.(e);
    };

    if (props.onContinue) {
      current.addEventListener("_continue", continueListener);
    }

    return () => {
      if (props.onContinue) {
        current.removeEventListener("_continue", continueListener);
      }
    };
  }, [ref, props.onContinue]);

  return (
    <goa-public-form-page ref={ref} {..._props}>
      {props.children}
    </goa-public-form-page>
  );
}

export default GoabPublicFormPage;
