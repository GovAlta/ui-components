import { GoabButton, GoabButtonGroup } from "@abgov/react-components";

export function ButtonWithIcon() {
  return (
    <GoabButtonGroup>
      <GoabButton leadingIcon="arrow-back">Go back</GoabButton>
      <GoabButton trailingIcon="arrow-forward">Continue</GoabButton>
      <GoabButton type="secondary" leadingIcon="add">Add item</GoabButton>
    </GoabButtonGroup>
  );
}
