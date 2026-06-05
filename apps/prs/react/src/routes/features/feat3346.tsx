import {
  GoabScrollPanel,
  GoabText,
  GoabContainer,
  GoabBlock,
} from "@abgov/react-components";

export function Feat3346Route() {
  return (
    <>
      <GoabText tag="h1">Feature 3346: Horizontal scroll panel</GoabText>
      <GoabText>
        A wide comparison matrix inside goa-scroll-panel with horizontal scrolling
        enabled. Scroll horizontally to verify edge shadows: at-start shows right only,
        middle shows both, and at-end shows left only.
      </GoabText>

      <GoabScrollPanel
        direction="horizontal"
        height="auto"
        testId="horizontal-scroll-panel"
      >
        <GoabBlock maxWidth="300px">
          {Array.from({ length: 8 }).map((_, index) => (
            <GoabContainer key={index} type="non-interactive">
              <GoabText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua
              </GoabText>
            </GoabContainer>
          ))}
        </GoabBlock>
      </GoabScrollPanel>
    </>
  );
}
