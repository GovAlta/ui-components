import {
  GoabButton,
  GoabButtonGroup,
  GoabText,
  GoabBlock,
  GoabDivider,
  GoabDetails,
  GoabLink,
} from "@abgov/react-components";

export function Bug3986Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        Bug #3986: GoabButton doesn't take 100% width inside GoabButtonGroup on mobile
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a href="https://github.com/GovAlta/ui-components/issues/3986" target="_blank" rel="noopener">
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            GoabButton normally takes 100% width of the parent container on mobile.
            However, if you place the button inside a GoabButtonGroup, it no longer
            takes up 100% width, instead fitting to content. Resize the viewport below
            624px wide to test.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      <GoabText tag="h3">Test 1: ButtonGroup in normal flow</GoabText>
      <GoabText tag="p">
        Buttons should stack and take 100% width below the mobile breakpoint.
      </GoabText>
      <GoabButtonGroup alignment="end" gap="relaxed">
        <GoabButton type="secondary">Cancel</GoabButton>
        <GoabButton type="primary">Confirm</GoabButton>
      </GoabButtonGroup>

      <GoabText tag="h3">Test 2: ButtonGroup inside a flex row container</GoabText>
      <GoabText tag="p">
        This was the main repro: a flex-row parent (a common page/footer layout)
        shrinks GoabButtonGroup to its content width, so the buttons&apos; 100% width
        was 100% of the shrunk group, not the viewport. Buttons should still stack and
        take 100% width below the mobile breakpoint.
      </GoabText>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <GoabButtonGroup alignment="end" gap="relaxed">
          <GoabButton type="secondary">Cancel</GoabButton>
          <GoabButton type="primary">Confirm</GoabButton>
        </GoabButtonGroup>
      </div>

      <GoabText tag="h3">Test 3: Three buttons, compact gap</GoabText>
      <GoabButtonGroup alignment="start" gap="compact">
        <GoabButton type="primary">Primary</GoabButton>
        <GoabButton type="secondary">Secondary</GoabButton>
        <GoabButton type="tertiary">Tertiary</GoabButton>
      </GoabButtonGroup>
    </div>
  );
}

export default Bug3986Route;
