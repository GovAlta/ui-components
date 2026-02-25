/**
 * Test page for Text component heading-2xs size
 */
import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabLink,
} from "@abgov/react-components";

export function Feat3396Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        Feature: Text heading-2xs size
      </GoabText>
      <GoabLink trailingIcon="open">
        <a
          href="https://github.com/GovAlta/ui-components/issues/3396"
          target="_blank"
          rel="noopener"
        >
          View on GitHub
        </a>
      </GoabLink>
      <GoabText>
        The Text component now supports <code>heading-2xs</code> from v2 design tokens.
      </GoabText>
      <GoabDivider />

      <GoabText tag="h3">V2 Design Tokens</GoabText>

      <div
        style={
          {
            "--goa-font-size-5": "1.25rem",
            "--goa-font-size-3": "1rem",
            "--goa-line-height-3": "1.5rem",
            "--goa-line-height-2": "1.375rem",
            "--goa-font-family-sans":
              "acumin-pro-semi-condensed, helvetica-neue, arial, sans-serif",
            "--goa-font-weight-semi-bold": "600",
            "--goa-typography-heading-xs":
              "var(--goa-font-weight-semi-bold) var(--goa-font-size-5)/var(--goa-line-height-3) var(--goa-font-family-sans)",
            "--goa-typography-heading-2xs":
              "var(--goa-font-weight-semi-bold) var(--goa-font-size-3)/var(--goa-line-height-2) var(--goa-font-family-sans)",
            "--goa-typography-mobile-heading-xs":
              "var(--goa-font-weight-semi-bold) var(--goa-font-size-5)/var(--goa-line-height-3) var(--goa-font-family-sans)",
            "--goa-typography-mobile-heading-2xs":
              "var(--goa-font-weight-semi-bold) var(--goa-font-size-3)/var(--goa-line-height-2) var(--goa-font-family-sans)",
          } as React.CSSProperties
        }
      >
        <GoabText size="heading-xs">heading-xs</GoabText>
        <GoabText size="heading-2xs">heading-2xs (distinct from heading-xs)</GoabText>
      </div>

      <GoabText tag="h3">V1 Design Tokens</GoabText>

      <GoabText size="heading-xs">heading-xs</GoabText>
      <GoabText size="heading-2xs">heading-2xs (falls back to heading-xs)</GoabText>
    </div>
  );
}

export default Feat3396Route;
