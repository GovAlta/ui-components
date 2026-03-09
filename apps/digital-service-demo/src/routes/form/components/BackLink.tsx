import { GoabxLink } from "@abgov/react-components/experimental";

type BackLinkProps = {
  onClick: () => void;
  children: React.ReactNode;
};

/**
 * Back navigation link using GoabxLink with dark color
 */
export function BackLink({ onClick, children }: BackLinkProps) {
  return (
    <span onClick={onClick} style={{ cursor: "pointer" }}>
      <GoabxLink leadingIcon="arrow-back" color="dark">
        {children}
      </GoabxLink>
    </span>
  );
}
