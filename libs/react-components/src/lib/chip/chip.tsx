import { GoabChipTheme, GoabChipVariant, Margins } from "@abgov/ui-components-common";
import { useEffect, useRef } from "react";
import { DataGridProps, useDataGridProps } from "../common/data-props";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement | null>;
  leadingicon?: string;
  icontheme?: GoabChipTheme;
  error?: string;
  deletable?: string;
  content: string;
  variant?: GoabChipVariant;
  testid?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-chip": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabChipProps extends Margins, DataGridProps {
  onClick?: () => void;
  deletable?: boolean;
  leadingIcon?: string;
  iconTheme?: GoabChipTheme;
  error?: boolean;
  content: string;
  variant?: GoabChipVariant;
  testId?: string;
}

export const GoabChip = (props: GoabChipProps) => {
  const [dataGridProps, {
    leadingIcon,
    iconTheme,
    deletable,
    error,
    variant,
    content,
    onClick,
    mt,
    mr,
    mb,
    ml,
    testId,
  }] = useDataGridProps(props);
  const el = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!el.current) return;
    if (!onClick) return;

    const current = el.current;
    const listener = () => {
      onClick();
    };

    current.addEventListener("_click", listener);
    return () => {
      current.removeEventListener("_click", listener);
    };
  }, [el, onClick]);

  return (
    <goa-chip
      ref={el}
      leadingicon={leadingIcon}
      icontheme={iconTheme}
      error={error ? "true" : undefined}
      deletable={deletable ? "true" : undefined}
      content={content}
      variant={variant}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      testid={testId}
      {...dataGridProps}
    />
  );
};

export default GoabChip;
