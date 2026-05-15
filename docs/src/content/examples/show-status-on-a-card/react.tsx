import { GoabBadge, GoabContainer } from "@abgov/react-components";

export function ShowStatusOnACard() {
  return (
    <GoabContainer
      type="non-interactive"
      accent="thick"
      heading="Heading"
      actions={<GoabBadge type="important" content="Priority" />}
    >
      Content
    </GoabContainer>
  );
}
