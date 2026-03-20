/**
 * Feature #3347: Sticky header in Container component
 *
 * Added stickyHeader prop to Container. When true, the header stays visible
 * using position:sticky and shows a scroll shadow when content has scrolled.
 */

import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabContainer,
  GoabButton,
  GoabLink,
} from "@abgov/react-components";

const loremLines = Array.from(
  { length: 20 },
  (_, i) =>
    `Line ${i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.`,
);

export function Feat3347Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        Feature #3347: Sticky header in Container
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a
            href="https://github.com/GovAlta/ui-components/issues/3347"
            target="_blank"
            rel="noopener"
          >
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            Added <code>stickyHeader</code> prop to <code>GoabContainer</code>. When{" "}
            <code>stickyHeader=true</code>, the container header uses{" "}
            <code>position: sticky; top: 0</code> so it stays visible when scrolling the
            page or its scrollable content. A scroll shadow appears under the header when
            content has scrolled past the top.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      <GoabText tag="h3" mt="l">
        Test 1: Sticky header with internal scroll (maxHeight)
      </GoabText>
      <GoabText tag="p">
        Container has a fixed maxHeight so content scrolls inside it. The header should
        remain visible and show a shadow when the content has been scrolled.
      </GoabText>
      <GoabContainer
        type="interactive"
        accent="thick"
        maxHeight="300px"
        stickyHeader
        title="Sticky Header (maxHeight)"
        actions={<GoabButton size="compact">Action</GoabButton>}
      >
        {loremLines.map((line, i) => (
          <GoabText key={i} tag="p">
            {line}
          </GoabText>
        ))}
      </GoabContainer>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3">Test 2: Sticky header on page scroll</GoabText>
      <GoabText tag="p">
        Container without a maxHeight. As you scroll the page the header should stick to
        the top of the viewport.
      </GoabText>
      <GoabContainer
        type="non-interactive"
        accent="thick"
        stickyHeader
        title="Sticky Header (page scroll)"
        actions={<GoabButton size="compact" type="secondary">Action</GoabButton>}
      >
        {loremLines.map((line, i) => (
          <GoabText key={i} tag="p">
            {line}
          </GoabText>
        ))}
      </GoabContainer>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3">Test 3: Without stickyHeader (default behaviour)</GoabText>
      <GoabText tag="p">
        For comparison — a container with maxHeight but without stickyHeader. Header is
        already visible since the content scrolls below it.
      </GoabText>
      <GoabContainer
        type="info"
        accent="thick"
        maxHeight="200px"
        title="No Sticky Header"
        actions={<GoabButton size="compact" type="tertiary">Action</GoabButton>}
      >
        {loremLines.map((line, i) => (
          <GoabText key={i} tag="p">
            {line}
          </GoabText>
        ))}
      </GoabContainer>
    </div>
  );
}

export default Feat3347Route;
