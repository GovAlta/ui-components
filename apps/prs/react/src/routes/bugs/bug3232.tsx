import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabLink,
} from "@abgov/react-components";

export function Bug3232Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        Bug #3232: GoabText tag prop should auto-apply heading size
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a href="https://github.com/GovAlta/ui-components/issues/3232" target="_blank" rel="noopener">
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            When using GoabText with a heading tag (h1-h5) but without explicitly setting
            the size prop, the component renders the semantic HTML element but doesn't
            apply the design system typography styles. Instead, it falls back to browser
            defaults, which don't match our design tokens.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      <GoabText tag="p">
        Left column uses just tag. Center column uses tag + explicit size.
        Right column uses just explicit size. They should all match.
      </GoabText>

      <GoabText tag="h3">Test 1: H1 → heading-xl</GoabText>
      <div style={{ display: "flex", gap: "var(--goa-space-xl)", flexWrap: "wrap" }}>
        <div>
          <GoabText tag="h1">Heading XL</GoabText>
          <code>tag="h1"</code>
        </div>
        <div>
          <GoabText tag="h1" size="heading-xl">Heading XL</GoabText>
          <code>tag="h1" size="heading-xl"</code>
        </div>
        <div>
          <GoabText size="heading-xl">Heading XL</GoabText>
          <code>size="heading-xl"</code>
        </div>
      </div>

      <GoabText tag="h3">Test 2: H2 → heading-l</GoabText>
      <div style={{ display: "flex", gap: "var(--goa-space-xl)", flexWrap: "wrap" }}>
        <div>
          <GoabText tag="h2">Heading L</GoabText>
          <code>tag="h2"</code>
        </div>
        <div>
          <GoabText tag="h2" size="heading-l">Heading L</GoabText>
          <code>tag="h2" size="heading-l"</code>
        </div>
        <div>
          <GoabText size="heading-l">Heading L</GoabText>
          <code>size="heading-l"</code>
        </div>
      </div>

      <GoabText tag="h3">Test 3: H3 → heading-m</GoabText>
      <div style={{ display: "flex", gap: "var(--goa-space-xl)", flexWrap: "wrap" }}>
        <div>
          <GoabText tag="h3">Heading M</GoabText>
          <code>tag="h3"</code>
        </div>
        <div>
          <GoabText tag="h3" size="heading-m">Heading M</GoabText>
          <code>tag="h3" size="heading-m"</code>
        </div>
        <div>
          <GoabText size="heading-m">Heading M</GoabText>
          <code>size="heading-m"</code>
        </div>
      </div>

      <GoabText tag="h3">Test 4: H4 → heading-s</GoabText>
      <div style={{ display: "flex", gap: "var(--goa-space-xl)", flexWrap: "wrap" }}>
        <div>
          <GoabText tag="h4">Heading S</GoabText>
          <code>tag="h4"</code>
        </div>
        <div>
          <GoabText tag="h4" size="heading-s">Heading S</GoabText>
          <code>tag="h4" size="heading-s"</code>
        </div>
        <div>
          <GoabText size="heading-s">Heading S</GoabText>
          <code>size="heading-s"</code>
        </div>
      </div>

      <GoabText tag="h3">Test 5: H5 → heading-xs</GoabText>
      <div style={{ display: "flex", gap: "var(--goa-space-xl)", flexWrap: "wrap" }}>
        <div>
          <GoabText tag="h5">Heading XS</GoabText>
          <code>tag="h5"</code>
        </div>
        <div>
          <GoabText tag="h5" size="heading-xs">Heading XS</GoabText>
          <code>tag="h5" size="heading-xs"</code>
        </div>
        <div>
          <GoabText size="heading-xs">Heading XS</GoabText>
          <code>size="heading-xs"</code>
        </div>
      </div>

      <GoabDivider mt="xl" mb="l" />

      <GoabText tag="h3">Test 6: Non-heading tags (no auto-size)</GoabText>
      <GoabText tag="p">
        These should remain unstyled unless size is explicitly set.
      </GoabText>

      <div>
        <div>
          <GoabText tag="p">Paragraph with no size - should be unstyled</GoabText>
          <code>tag="p" (no size)</code>
        </div>
        <div>
          <GoabText tag="p" size="body-m">Paragraph with body-m size</GoabText>
          <code>tag="p" size="body-m"</code>
        </div>
        <div>
          <GoabText tag="span">Span with no size - should be unstyled</GoabText>
          <code>tag="span" (no size)</code>
        </div>
      </div>

      <GoabDivider mt="xl" mb="l" />

      <GoabText tag="h3">Test 6b: ID prop with inline side nav (restored from PR #3216)</GoabText>
      <GoabText tag="p">
        The headings below use GoabText with id props. The side nav should link to them.
        Clicking a nav link should scroll to the matching heading.
      </GoabText>

      <div style={{ display: "flex", gap: "var(--goa-space-xl)" }}>
        <nav style={{ minWidth: "200px", position: "sticky", top: "1rem", alignSelf: "flex-start" }}>
          <GoabText tag="h4">On this page</GoabText>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li><a onClick={() => document.getElementById("section-overview")?.scrollIntoView({ behavior: "smooth" })} style={{ cursor: "pointer" }}>Overview</a></li>
            <li><a onClick={() => document.getElementById("section-getting-started")?.scrollIntoView({ behavior: "smooth" })} style={{ cursor: "pointer" }}>Getting started</a></li>
            <li><a onClick={() => document.getElementById("section-configuration")?.scrollIntoView({ behavior: "smooth" })} style={{ cursor: "pointer" }}>Configuration</a></li>
            <li><a onClick={() => document.getElementById("section-examples")?.scrollIntoView({ behavior: "smooth" })} style={{ cursor: "pointer" }}>Examples</a></li>
          </ul>
        </nav>

        <div style={{ flex: 1 }}>
          <GoabText tag="h2" id="section-overview">Overview</GoabText>
          <GoabText tag="p" size="body-m">
            This section tests that GoabText headings with id props work as scroll targets
            for a table of contents navigation.
          </GoabText>

          <div style={{ height: "300px" }} />

          <GoabText tag="h2" id="section-getting-started">Getting started</GoabText>
          <GoabText tag="p" size="body-m">
            If clicking "Getting started" in the side nav scrolled here, the id prop is working.
          </GoabText>

          <div style={{ height: "300px" }} />

          <GoabText tag="h2" id="section-configuration">Configuration</GoabText>
          <GoabText tag="p" size="body-m">
            Another section to test anchor scrolling with GoabText id prop.
          </GoabText>

          <div style={{ height: "300px" }} />

          <GoabText tag="h2" id="section-examples">Examples</GoabText>
          <GoabText tag="p" size="body-m">
            Last section. All four headings should be reachable via the side nav links.
          </GoabText>

          <div style={{ height: "200px" }} />
        </div>
      </div>

      <GoabDivider mt="xl" mb="l" />

      <GoabText tag="h3">Test 7: Explicit size overrides tag default</GoabText>
      <GoabText tag="p">
        Setting size explicitly should override the tag-based default.
      </GoabText>

      <div>
        <div>
          <GoabText tag="h1" size="body-s">H1 with body-s size (explicit override)</GoabText>
          <code>tag="h1" size="body-s"</code>
        </div>
        <div>
          <GoabText tag="h2" size="heading-xs">H2 with heading-xs size (explicit override)</GoabText>
          <code>tag="h2" size="heading-xs"</code>
        </div>
      </div>
    </div>
  );
}
