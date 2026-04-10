interface WCProps {
  value: string;
  label?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-multi-select-option": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabMultiSelectOptionProps {
  value: string;
  label?: string;
}

export function GoabMultiSelectOption({
  value,
  label,
}: GoabMultiSelectOptionProps) {
  return <goa-multi-select-option value={value} label={label} />;
}