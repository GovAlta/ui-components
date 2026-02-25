import { GoabxBadge } from "@abgov/react-components/experimental";
import { GoabBlock } from "@abgov/react-components";

export function ShowMultipleTagsTogether() {
  return (
    <GoabBlock gap="xs">
      <GoabxBadge type="information" content="In progress" />
      <GoabxBadge type="important" content="Priority" />
      <GoabxBadge type="emergency" content="Past deadline" />
    </GoabBlock>
  );
}
