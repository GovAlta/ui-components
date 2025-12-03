import { useEffect, useRef } from "react";
import { Margins, GoabFilterChipTheme, GoabIconType } from "@abgov/ui-components-common";
import { DataGridProps, useDataGridProps } from "../common/data-props";

interface WCProps extends Margins {
  ref: React.RefObject<HTMLElement | null>;
  icontheme: GoabFilterChipTheme;
  error?: string;
  content: string;
  secondarytext?: string;
  leadingicon?: string;
  arialabel?: string;
  testid?: string;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-filter-chip": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabFilterChipProps extends Margins, DataGridProps {
  onClick?: () => void;
  iconTheme?: GoabFilterChipTheme;
  error?: boolean;
  content: string;
  secondaryText?: string;
  leadingIcon?: GoabIconType;
  ariaLabel?: string;
  testId?: string;
}

export const GoabFilterChip = (props: GoabFilterChipProps) => {
  const [dataGridProps, {
    iconTheme = "outline",
    error,
    content,
    secondaryText,
    leadingIcon,
    ariaLabel,
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

    current.addEventListener("_click", onClick);
    return () => {
      current.removeEventListener("_click", onClick);
    };
  }, [el, onClick]);

  return (
    <goa-filter-chip
      ref={el}
      icontheme={iconTheme}
      error={error ? "true" : undefined}
      content={content}
      secondarytext={secondaryText}
      leadingicon={leadingIcon}
      arialabel={ariaLabel}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      testid={testId}
      {...dataGridProps}
      version={"2"}
    />
  );
};

export default GoabFilterChip;
