import { GoabxButton } from "@abgov/react-components/experimental";
import { GoabButtonGroup } from "@abgov/react-components";

export function ButtonWithIcon() {
  return (
    <GoabButtonGroup>
      <GoabxButton leadingIcon="arrow-back">Go back</GoabxButton>
      <GoabxButton trailingIcon="arrow-forward">Continue</GoabxButton>
      <GoabxButton type="secondary" leadingIcon="add">Add item</GoabxButton>
    </GoabButtonGroup>
  );
}
