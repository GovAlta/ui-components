interface WCProps {
  value: string;
  label?: string;
  filter?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-multi-select-option": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabMultiSelectItemProps {
  value: string;
  label?: string;
  filter?: string;
}

export function GoabMultiSelectItem({
  value,
  label,
  filter,
}: GoabMultiSelectItemProps) {
  return (
    <goa-multi-select-option value={value} label={label} filter={filter} />
  );
}
