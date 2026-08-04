import {
  GoabBlock,
  GoabCheckbox,
  GoabDetails,
  GoabDivider,
  GoabLink,
  GoabRadioGroup,
  GoabRadioItem,
  GoabText,
} from "@abgov/react-components";

export function Bug4009Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        Bug #4009: Checkbox and radio item labels have inconsistent weight and color
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a
            href="https://github.com/GovAlta/ui-components/issues/4009"
            target="_blank"
            rel="noopener"
          >
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            The checkbox label and the radio item label rendered differently even
            though they are the same kind of form control label. The checkbox label
            had the correct color but regular weight (400), while the radio item label
            had the correct medium weight (500) but no color set, so it inherited the
            near black page default instead of the secondary input text color.
          </GoabText>
          <GoabText tag="p">
            After the fix both labels render in medium weight (500) and resolve their
            color through component tokens that point at the shared secondary input
            text color, so they match.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      <GoabText tag="h3">Test 1: Default size, side by side</GoabText>
      <GoabText tag="p">
        Place the checkbox and radio item labels next to each other. They should be
        identical in weight (medium, 500) and color (secondary input text color).
      </GoabText>
      <GoabBlock gap="m" direction="column" mb="l">
        <GoabCheckbox name="default-checkbox" text="Checkbox label" />
        <GoabRadioGroup name="default-radio" value="">
          <GoabRadioItem value="option1" label="Radio item label" />
        </GoabRadioGroup>
      </GoabBlock>

      <GoabText tag="h3">Test 2: Compact size</GoabText>
      <GoabText tag="p">
        The compact checkbox label keeps its smaller font size but stays medium weight,
        matching the compact radio item label.
      </GoabText>
      <GoabBlock gap="m" direction="column" mb="l">
        <GoabCheckbox name="compact-checkbox" size="compact" text="Compact checkbox label" />
      </GoabBlock>

      <GoabText tag="h3">Test 3: Disabled state</GoabText>
      <GoabText tag="p">
        Disabled labels use their own disabled color token and are unaffected by this
        change.
      </GoabText>
      <GoabBlock gap="m" direction="column">
        <GoabCheckbox name="disabled-checkbox" text="Disabled checkbox label" disabled={true} />
        <GoabRadioGroup name="disabled-radio" value="" disabled={true}>
          <GoabRadioItem value="option1" label="Disabled radio item label" />
        </GoabRadioGroup>
      </GoabBlock>
    </div>
  );
}

export default Bug4009Route;
