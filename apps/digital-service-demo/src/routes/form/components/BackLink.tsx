import { GoabIcon } from "@abgov/react-components";

type BackLinkProps = {
  onClick: () => void;
  children: React.ReactNode;
};

/**
 * Back navigation link using a button for accessibility
 * (buttons are for actions, links are for navigation)
 */
export function BackLink({ onClick, children }: BackLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--goa-space-2xs)",
        padding: 0,
        border: "none",
        background: "none",
        color: "var(--goa-color-interactive-default)",
        font: "var(--goa-typography-body-m)",
        textDecoration: "underline",
        cursor: "pointer",
      }}
    >
      <GoabIcon type="arrow-back" size="small" />
      {children}
    </button>
  );
}
