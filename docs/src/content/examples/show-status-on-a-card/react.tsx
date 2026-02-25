import { GoabxBadge } from "@abgov/react-components/experimental";
import { GoabContainer } from "@abgov/react-components";

export function ShowStatusOnACard() {
  return (
    <GoabContainer
      type="non-interactive"
      accent="thick"
      heading="Heading"
      actions={<GoabxBadge type="important" content="Priority" />}
    >
      Content
    </GoabContainer>
  );
}
