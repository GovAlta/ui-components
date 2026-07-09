import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabLink,
  GoabIconButton,
} from "@abgov/react-components";

export function Feat3858Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        Feature #3858: Icon Button tertiary type
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a href="https://github.com/GovAlta/ui-components/issues/3858" target="_blank" rel="noopener">
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            Icon buttons need a version with a border so they read as interactive. New
            `type` prop with "default" | "tertiary", crossed with the existing `variant`
            colour axis, matching the Figma component set (Type=Tertiary). The border only
            shows at rest: hover, focus, and disabled fall back to the existing styling.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      <GoabText tag="h3">Test 1: Type × variant matrix</GoabText>
      <GoabText tag="p">
        Top row is the default type, bottom row is tertiary. Tertiary shows a 1px
        greyscale-200 border (emergency-light for destructive). Icon colours match the
        default type exactly.
      </GoabText>
      <GoabBlock gap="m" direction="column">
        <GoabBlock gap="m">
          <GoabIconButton icon="close" ariaLabel="Close" />
          <GoabIconButton icon="close" variant="dark" ariaLabel="Close" />
          <GoabIconButton icon="trash" variant="destructive" ariaLabel="Delete" />
        </GoabBlock>
        <GoabBlock gap="m">
          <GoabIconButton icon="close" type="tertiary" ariaLabel="Close" />
          <GoabIconButton icon="close" type="tertiary" variant="dark" ariaLabel="Close" />
          <GoabIconButton icon="trash" type="tertiary" variant="destructive" ariaLabel="Delete" />
        </GoabBlock>
      </GoabBlock>

      <GoabText tag="h3" mt="l">Test 2: Light variant on a dark background</GoabText>
      <GoabText tag="p">
        Tertiary light keeps the same greyscale-200 border with the white icon.
      </GoabText>
      <div
        style={{
          backgroundColor: "var(--goa-color-greyscale-700)",
          padding: "var(--goa-space-l)",
          display: "inline-block",
        }}
      >
        <GoabBlock gap="m">
          <GoabIconButton icon="close" variant="light" ariaLabel="Close" />
          <GoabIconButton icon="close" type="tertiary" variant="light" ariaLabel="Close" />
        </GoabBlock>
      </div>

      <GoabText tag="h3" mt="l">Test 3: Sizes</GoabText>
      <GoabText tag="p">
        Tertiary at small, medium, and large. The border hugs the same footprint as the
        default type in each size.
      </GoabText>
      <GoabBlock gap="m" alignment="center">
        <GoabIconButton icon="settings" type="tertiary" size="small" ariaLabel="Settings" />
        <GoabIconButton icon="settings" type="tertiary" size="medium" ariaLabel="Settings" />
        <GoabIconButton icon="settings" type="tertiary" size="large" ariaLabel="Settings" />
      </GoabBlock>

      <GoabText tag="h3" mt="l">Test 4: States (interact to verify)</GoabText>
      <GoabText tag="p">
        Hover: border disappears, the usual hover background appears, and nothing shifts
        by a pixel. Keyboard focus: the standard focus ring replaces the border — check
        the destructive one especially. Disabled: no border, no hover reaction, and the
        cursor shows not-allowed (applies to every icon button, not just tertiary — see
        Test 5).
      </GoabText>
      <GoabBlock gap="m">
        <GoabIconButton icon="pencil" type="tertiary" ariaLabel="Edit" />
        <GoabIconButton icon="trash" type="tertiary" variant="destructive" ariaLabel="Delete" />
        <GoabIconButton icon="pencil" type="tertiary" disabled ariaLabel="Edit" />
        <GoabIconButton icon="trash" type="tertiary" variant="destructive" disabled ariaLabel="Delete" />
      </GoabBlock>

      <GoabText tag="h3" mt="l">Test 5: Default type (regression + disabled cursor)</GoabText>
      <GoabText tag="p">
        Buttons without a `type` prop render as before, with one deliberate change: every
        disabled icon button now shows a not-allowed cursor on hover (previously the
        default arrow).
      </GoabText>
      <GoabBlock gap="m">
        <GoabIconButton icon="close" ariaLabel="Close" />
        <GoabIconButton icon="close" variant="dark" ariaLabel="Close" />
        <GoabIconButton icon="trash" variant="destructive" ariaLabel="Delete" />
        <GoabIconButton icon="pencil" disabled ariaLabel="Edit" />
      </GoabBlock>
    </div>
  );
}

export default Feat3858Route;
