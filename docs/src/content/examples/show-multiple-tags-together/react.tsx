import { GoabBadge, GoabBlock } from "@abgov/react-components";

export function ShowMultipleTagsTogether() {
  return (
    <GoabBlock gap="xs">
      <GoabBadge type="information" content="In progress" />
      <GoabBadge type="important" content="Priority" />
      <GoabBadge type="emergency" content="Past deadline" />
    </GoabBlock>
  );
}
