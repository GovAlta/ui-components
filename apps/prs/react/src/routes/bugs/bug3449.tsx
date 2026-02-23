import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabLink,
  GoabButton,
} from "@abgov/react-components";

export function Bug3449Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        Bug #3449: White outline on focus
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a href="https://github.com/GovAlta/ui-components/issues/3449" target="_blank" rel="noopener">
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            When focusing the v2 primary button, there is no white outline around the button to help give
            contrast between the button and the focus indicator. A white outline should appear between the
            button background and the colored focus ring.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      <GoabText tag="h3">Test 1: Primary button focus (v2)</GoabText>
      <GoabText tag="p">
        Tab to or click the button below and verify a white outline appears between the button and the
        yellow/orange focus ring.
      </GoabText>
      <GoabBlock mt="m">
        <GoabButton version="2" type="primary">Primary Focus Test</GoabButton>
      </GoabBlock>

      <GoabText tag="h3" mt="l">Test 2: All button types focus (v2)</GoabText>
      <GoabText tag="p">
        Tab through all buttons and verify white outline appears on focus for each type.
      </GoabText>
      <GoabBlock mt="m" gap="m">
        <GoabButton version="2" type="primary">Primary</GoabButton>
        <GoabButton version="2" type="secondary">Secondary</GoabButton>
        <GoabButton version="2" type="tertiary">Tertiary</GoabButton>
      </GoabBlock>
    </div>
  );
}

export default Bug3449Route;
