import { GoabText, GoabBlock } from "@abgov/react-components";

export function Bug2721Route() {
  return (
    <GoabBlock gap="l" direction="column">
      <h1>GoabText Margin Bug Test (Issue #2721)</h1>
      <p>
        Testing that changing the "tag" property on GoabText should not change the margin
      </p>

      {/* Margin Reference Test */}
      <GoabBlock gap="m" direction="column">
        <h3>Margin Reference Test</h3>
        <p>Compare margins across different sizes with the same tag:</p>
        <div className="test-container">
          <GoabText tag="p" size="heading-xl">
            Heading XL (should have L bottom margin, 2XL top margin)
          </GoabText>
          <GoabText tag="p" size="heading-l">
            Heading L (should have L bottom margin, 2XL top margin)
          </GoabText>
          <GoabText tag="p" size="heading-m">
            Heading M (should have M bottom margin, 2XL top margin)
          </GoabText>
          <GoabText tag="p" size="heading-s">
            Heading S (should have S bottom margin, XL top margin)
          </GoabText>
          <GoabText tag="p" size="heading-xs">
            Heading XS (should have XS bottom margin, XL top margin)
          </GoabText>
          <GoabText tag="p" size="body-l">
            Body L (should have L bottom margin, 2XL top margin)
          </GoabText>
          <GoabText tag="p" size="body-m">
            Body M (should have L bottom margin, L top margin)
          </GoabText>
          <GoabText tag="p" size="body-s">
            Body S (should have L bottom margin, L top margin)
          </GoabText>
          <GoabText tag="p" size="body-xs">
            Body XS (should have L bottom margin, S top margin)
          </GoabText>
        </div>
      </GoabBlock>

      {/* Tag Consistency Test */}
      <GoabBlock gap="m" direction="column">
        <h3>Tag Consistency Test</h3>
        <p>All of these should have identical margins (body-m size):</p>
        <div className="test-container">
          <GoabText tag="h1" size="body-m">
            H1 tag with body-m size
          </GoabText>
          <GoabText tag="h2" size="body-m">
            H2 tag with body-m size
          </GoabText>
          <GoabText tag="h3" size="body-m">
            H3 tag with body-m size
          </GoabText>
          <GoabText tag="p" size="body-m">
            P tag with body-m size
          </GoabText>
          <GoabText tag="span" size="body-m">
            Span tag with body-m size
          </GoabText>
          <GoabText tag="div" size="body-m">
            Div tag with body-m size
          </GoabText>
        </div>
      </GoabBlock>

      {/* Expected vs Actual Test */}
      <GoabBlock gap="m" direction="column">
        <h3>Expected vs Actual Behavior</h3>
        <p>If the bug is fixed, changing the tag should not affect margins:</p>
        <div className="test-container">
          <h4>Expected: Same margins regardless of tag</h4>
          <GoabText tag="h1" size="heading-m">
            H1 with heading-m (should match below)
          </GoabText>
          <GoabText tag="p" size="heading-m">
            P with heading-m (should match above)
          </GoabText>
          <GoabText tag="span" size="heading-m">
            Span with heading-m (should match above)
          </GoabText>
        </div>
      </GoabBlock>
    </GoabBlock>
  );
}

export default Bug2721Route;
