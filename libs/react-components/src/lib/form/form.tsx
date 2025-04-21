import {
  GoabPublicFormStatus,
  Margins,
} from "@abgov/ui-components-common";
import { on } from "events";
import { useEffect, useRef } from "react";

interface WCProps extends Margins {
  status: GoabPublicFormStatus;
  name?: string;
  onFormComplete?: () => void;
  ref: React.RefObject<HTMLElement>;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-public-form": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabPublicFormProps {
  status: GoabPublicFormStatus;
  name?: string;
  onFormComplete?: () => void;
  children?: React.ReactNode;
}

export function GoabPublicForm(props: GoabPublicFormProps): JSX.Element {
  const el = useRef<HTMLElement>(null);
  const { onFormComplete } = props;

  useEffect(() => {
    if (!el.current) {
      return;
    }
    if (!onFormComplete) {
      return;
    }
    const current = el.current;
    const listener = () => {
      onFormComplete();
    };

    current.addEventListener("_complete", listener);
    return () => {
      current.removeEventListener("_complete", listener);
    };
  }, [el, onFormComplete]);

  return (
    <goa-public-form ref={el} status={props.status} name={props.name}>
      {props.children}
    </goa-public-form>
  );
}

export default GoabPublicForm;
