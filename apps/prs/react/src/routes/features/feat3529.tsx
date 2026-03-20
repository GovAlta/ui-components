/**
 * PR #3529: Heading Letter Spacing Tokens
 *
 * Adds letter-spacing design tokens to all heading sizes in Text.svelte,
 * reset.css, FooterNavSection.svelte, and FormSummary.svelte.
 *
 * This page verifies that letter-spacing is correctly applied to each
 * heading size via:
 *   --goa-typography-heading-[size]-letter-spacing (desktop)
 *   --goa-typography-mobile-heading-[size]-letter-spacing (mobile)
 */

import { GoabBlock, GoabDivider, GoabText } from "@abgov/react-components";

export function Feat3529Route() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Feature #3529: Heading Letter Spacing</h1>
      <p>
        Letter-spacing design tokens have been applied to all heading sizes. Inspect each
        heading below and verify that <code>letter-spacing</code> is set via the
        corresponding CSS custom property.
      </p>

      <GoabDivider mt="l" mb="l" />

      {/* Explicit size prop */}
      <h2>
        Explicit <code>size</code> prop
      </h2>
      <p>
        Each GoabText below uses an explicit size prop. Resize to mobile to verify the
        mobile tokens also apply.
      </p>

      <GoabBlock direction="column" gap="l" mt="l">
        <div>
          <p>
            <small>
              size="heading-xl" — token:{" "}
              <code>--goa-typography-heading-xl-letter-spacing</code>
            </small>
          </p>
          <GoabText size="heading-xl" mt="none">
            Heading XL — The quick brown fox jumps over the lazy dog
          </GoabText>
        </div>

        <div>
          <p>
            <small>
              size="heading-l" — token:{" "}
              <code>--goa-typography-heading-l-letter-spacing</code>
            </small>
          </p>
          <GoabText size="heading-l" mt="none">
            Heading L — The quick brown fox jumps over the lazy dog
          </GoabText>
        </div>

        <div>
          <p>
            <small>
              size="heading-m" — token:{" "}
              <code>--goa-typography-heading-m-letter-spacing</code>
            </small>
          </p>
          <GoabText size="heading-m" mt="none">
            Heading M — The quick brown fox jumps over the lazy dog
          </GoabText>
        </div>

        <div>
          <p>
            <small>
              size="heading-s" — token:{" "}
              <code>--goa-typography-heading-s-letter-spacing</code>
            </small>
          </p>
          <GoabText size="heading-s" mt="none">
            Heading S — The quick brown fox jumps over the lazy dog
          </GoabText>
        </div>

        <div>
          <p>
            <small>
              size="heading-xs" — token:{" "}
              <code>--goa-typography-heading-xs-letter-spacing</code>
            </small>
          </p>
          <GoabText size="heading-xs" mt="none">
            Heading XS — The quick brown fox jumps over the lazy dog
          </GoabText>
        </div>

        <div>
          <p>
            <small>
              size="heading-2xs" — token:{" "}
              <code>--goa-typography-heading-2xs-letter-spacing</code>
            </small>
          </p>
          <GoabText size="heading-2xs" mt="none">
            Heading 2XS — The quick brown fox jumps over the lazy dog
          </GoabText>
        </div>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      {/* Semantic heading tags with default sizes */}
      <h2>Semantic heading tags (default sizing)</h2>
      <p>
        Each heading tag below relies on the default size mapping in{" "}
        <code>Text.svelte</code>. The same letter-spacing tokens should apply.
      </p>

      <GoabBlock direction="column" gap="l" mt="l">
        <div>
          <p>
            <small>
              as="h1" → heading-xl — token:{" "}
              <code>--goa-typography-heading-xl-letter-spacing</code>
            </small>
          </p>
          <GoabText as="h1" mt="none">
            H1 — The quick brown fox jumps over the lazy dog
          </GoabText>
        </div>

        <div>
          <p>
            <small>
              as="h2" → heading-l — token:{" "}
              <code>--goa-typography-heading-l-letter-spacing</code>
            </small>
          </p>
          <GoabText as="h2" mt="none">
            H2 — The quick brown fox jumps over the lazy dog
          </GoabText>
        </div>

        <div>
          <p>
            <small>
              as="h3" → heading-m — token:{" "}
              <code>--goa-typography-heading-m-letter-spacing</code>
            </small>
          </p>
          <GoabText as="h3" mt="none">
            H3 — The quick brown fox jumps over the lazy dog
          </GoabText>
        </div>

        <div>
          <p>
            <small>
              as="h4" → heading-s — token:{" "}
              <code>--goa-typography-heading-s-letter-spacing</code>
            </small>
          </p>
          <GoabText as="h4" mt="none">
            H4 — The quick brown fox jumps over the lazy dog
          </GoabText>
        </div>

        <div>
          <p>
            <small>
              as="h5" → heading-xs — token:{" "}
              <code>--goa-typography-heading-xs-letter-spacing</code>
            </small>
          </p>
          <GoabText as="h5" mt="none">
            H5 — The quick brown fox jumps over the lazy dog
          </GoabText>
        </div>
      </GoabBlock>
    </div>
  );
}

export default Feat3529Route;
