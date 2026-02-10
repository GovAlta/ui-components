import { ReactNode, useRef, useEffect } from "react";

import {
  DataAttributes,
  Margins,
  PFState,
  PFOutline,
} from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-public-form": WCProps & React.HTMLAttributes<HTMLElement> & {
        ref: React.RefObject<HTMLElement | null>;
      };
    }
  }
}

type InitFunction = (data: PFState, props: { outline: PFOutline }) => PFState;

interface GoabPublicFormChangeDetail {
  state: PFState;
  name: string;
  value: string;
}

interface GoabPublicFormProps extends Margins, DataAttributes {
  onInit?: (initFn: InitFunction) => void;
  onChange?: (detail: GoabPublicFormChangeDetail) => void;
  onNext?: (state: PFState) => void;
  onSubformChange?: (state: PFState) => void;
  children: ReactNode;
}

export function GoabPublicForm({
  onInit,
  onChange,
  onNext,
  onSubformChange,
  children,
  ...rest
}: GoabPublicFormProps) {
  const ref = useRef<HTMLElement>(null);

  const _props = transformProps<WCProps>(rest, lowercase);

  useEffect(() => {
    if (!ref.current) return;
    const current = ref.current;

    const initListener = (e: Event) => {
      const initFn = (e as CustomEvent<InitFunction>).detail;
      onInit?.(initFn);
    };

    const changeListener = (e: Event) => {
      const detail = (e as CustomEvent<GoabPublicFormChangeDetail>).detail;
      onChange?.(detail);
    };

    const nextListener = (e: Event) => {
      const state = (e as CustomEvent<PFState>).detail;
      onNext?.(state);
    };

    const subformChangeListener = (e: Event) => {
      const state = (e as CustomEvent<PFState>).detail;
      onSubformChange?.(state);
    };

    current.addEventListener("_init", initListener);
    current.addEventListener("_change", changeListener);
    current.addEventListener("_next", nextListener);
    current.addEventListener("_subformChange", subformChangeListener);

    return () => {
      current.removeEventListener("_init", initListener);
      current.removeEventListener("_change", changeListener);
      current.removeEventListener("_next", nextListener);
      current.removeEventListener("_subformChange", subformChangeListener);
    };
  }, [onInit, onChange, onNext, onSubformChange]);

  return (
    <goa-public-form ref={ref} {..._props}>
      {children}
    </goa-public-form>
  );
}

export default GoabPublicForm;
