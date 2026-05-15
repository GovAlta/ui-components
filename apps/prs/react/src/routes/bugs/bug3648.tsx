import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabLink,
  GoabBadge,
} from "@abgov/react-components";

export function Bug3648Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        Bug #3648: Badge refinements
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a
            href="https://github.com/GovAlta/ui-components/issues/3648"
            target="_blank"
            rel="noopener"
          >
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            High emphasis badges have a visible edge treatment that contrasts with the
            badge background. This is likely an inner shadow or similar, not an actual CSS
            border. Figma has no such treatment. Remove it from high emphasis badges.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      <GoabText tag="h3">
        High emphasis (strong) badges - inspect for edge treatment
      </GoabText>
      <GoabText tag="p">
        Each of these should have NO visible edge/border/shadow. Inspect to see what CSS
        creates the visible edge (box-shadow on line 224 of Badge.svelte uses
        --goa-badge-border token).
      </GoabText>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
        <GoabBadge type="information" content="Information" />
        <GoabBadge type="success" content="Success" />
        <GoabBadge type="important" content="Important" />
        <GoabBadge type="emergency" content="Emergency" />
        <GoabBadge type="archived" content="Archived" />
        <GoabBadge type="default" content="Default" />
        <GoabBadge type="sky" content="Sky" />
        <GoabBadge type="prairie" content="Prairie" />
        <GoabBadge type="lilac" content="Lilac" />
        <GoabBadge type="pasture" content="Pasture" />
        <GoabBadge type="sunset" content="Sunset" />
        <GoabBadge type="dawn" content="Dawn" />
      </div>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3">Strong emphasis, large size</GoabText>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
        <GoabBadge type="information" content="Information" size="large" />
        <GoabBadge type="success" content="Success" size="large" />
        <GoabBadge type="important" content="Important" size="large" />
        <GoabBadge type="emergency" content="Emergency" size="large" />
        <GoabBadge type="archived" content="Archived" size="large" />
        <GoabBadge type="default" content="Default" size="large" />
        <GoabBadge type="sky" content="Sky" size="large" />
        <GoabBadge type="prairie" content="Prairie" size="large" />
        <GoabBadge type="lilac" content="Lilac" size="large" />
        <GoabBadge type="pasture" content="Pasture" size="large" />
        <GoabBadge type="sunset" content="Sunset" size="large" />
        <GoabBadge type="dawn" content="Dawn" size="large" />
      </div>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h3">Subtle emphasis badges (reference, no changes needed)</GoabText>
      <GoabText tag="p">
        These use their own box-shadow tokens for the edge and should remain unchanged.
      </GoabText>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "1rem" }}>
        <GoabBadge type="information" content="Information" emphasis="subtle" />
        <GoabBadge type="success" content="Success" emphasis="subtle" />
        <GoabBadge type="important" content="Important" emphasis="subtle" />
        <GoabBadge type="emergency" content="Emergency" emphasis="subtle" />
        <GoabBadge type="archived" content="Archived" emphasis="subtle" />
        <GoabBadge type="default" content="Default" emphasis="subtle" />
        <GoabBadge type="sky" content="Sky" emphasis="subtle" />
        <GoabBadge type="prairie" content="Prairie" emphasis="subtle" />
        <GoabBadge type="lilac" content="Lilac" emphasis="subtle" />
        <GoabBadge type="pasture" content="Pasture" emphasis="subtle" />
        <GoabBadge type="sunset" content="Sunset" emphasis="subtle" />
        <GoabBadge type="dawn" content="Dawn" emphasis="subtle" />
      </div>
    </div>
  );
}

export default Bug3648Route;
