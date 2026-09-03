import { GoabButton, GoabDivider, GoabLink, GoabText } from "@abgov/react-components";

export function Feat3153Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        Feature #3153: Button aria label
      </GoabText>

      <GoabLink trailingIcon="open">
        <a
          href="https://github.com/GovAlta/ui-components/issues/3153"
          target="_blank"
          rel="noopener"
        >
          View on GitHub
        </a>
      </GoabLink>

      <GoabText tag="p">
        Button supports an optional ariaLabel that replaces the accessible name while
        preserving the visible button text.
      </GoabText>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test cases</GoabText>

      <GoabText tag="h3">With ariaLabel</GoabText>
      <GoabText tag="p">
        A screen reader should announce “Remove Jane Smith, button.”
      </GoabText>
      <GoabButton ariaLabel="Remove Jane Smith">Remove</GoabButton>

      <GoabText tag="h3" mt="l">
        Without ariaLabel
      </GoabText>
      <GoabText tag="p">
        A screen reader should announce the visible text: “Remove, button.”
      </GoabText>
      <GoabButton>Remove</GoabButton>
    </div>
  );
}

export default Feat3153Route;
