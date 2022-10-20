import React, { FC, useEffect, useRef } from "react";

export type ModalTransition = "fast" | "slow" | "none";

interface WCProps {
  ref: React.RefObject<HTMLElement>;
  heading?: string;
  open?: boolean;
  width?: string;
  closable?: boolean;
  scrollable?: boolean;
  transition?: ModalTransition;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-modal": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

interface Props {
  heading?: string;
  width?: string;
  actions?: React.ReactElement;
  onClose?: () => void;
  transition?: ModalTransition;
  children?: React.ReactNode;
  open?: boolean;
}

export const GoAModal: FC<Props> = ({
  heading,
  children,
  open,
  width,
  actions,
  transition,
  onClose,
}) => {
  const el = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!el.current) {
      return;
    }
    const current = el.current;
    const listener = (e: any) => {
      onClose?.();
    };

    current.addEventListener("_close", listener);
    return () => {
      current.removeEventListener("_close", listener);
    };
  }, [el, onClose]);

  return (
    <goa-modal
      ref={el}
      heading={heading}
      open={open}
      closable={!!onClose}
      scrollable={true}
      width={width}
      transition={transition}
    >
      {actions && <div slot="actions">{actions}</div>}
      {children}
    </goa-modal>
  );
};

export default GoAModal;
