import {
  GoabDivider,
  GoabIcon,
  GoabSpacer,
  GoabText,
} from "@abgov/react-components";

export function DocsSpacerRoute() {
  return (
    <div>
      <h2>Spacer</h2>

      <h3>Basic spacer</h3>
      <GoabText mt="none" mb="none">Content above</GoabText>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <GoabIcon type="arrow-down" size="1" />
        <GoabSpacer vSpacing="l" />
        <GoabIcon type="arrow-up" size="1" />
      </div>
      <GoabText mt="none" mb="none">Content below</GoabText>

      <h3>Vertical sizes</h3>
      <GoabText mt="none" mb="none">S space</GoabText>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <GoabIcon type="arrow-down" size="1" />
        <GoabSpacer vSpacing="s" />
        <GoabIcon type="arrow-up" size="1" />
      </div>
      <GoabDivider mt="l" mb="l" />
      <GoabText mt="none" mb="none">L space</GoabText>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <GoabIcon type="arrow-down" size="1" />
        <GoabSpacer vSpacing="l" />
        <GoabIcon type="arrow-up" size="1" />
      </div>
      <GoabDivider mt="l" mb="l" />
      <GoabText mt="none" mb="none">2XL space</GoabText>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <GoabIcon type="arrow-down" size="1" />
        <GoabSpacer vSpacing="2xl" />
        <GoabIcon type="arrow-up" size="1" />
      </div>

      <h3>Horizontal spacing</h3>
      <div style={{ display: "flex", alignItems: "center" }}>
        <GoabText mt="none" mb="none">Left</GoabText>
        <GoabIcon type="arrow-forward" size="1" />
        <GoabSpacer hSpacing="l" />
        <GoabIcon type="arrow-back" size="1" />
        <GoabText mt="none" mb="none">Right</GoabText>
      </div>

      <h3>Fill available space</h3>
      <div style={{ display: "flex", alignItems: "center" }}>
        <GoabText mt="none" mb="none">Label</GoabText>
        <GoabIcon type="arrow-forward" size="1" />
        <GoabSpacer hSpacing="fill" />
        <GoabIcon type="arrow-back" size="1" />
        <GoabText mt="none" mb="none">Value</GoabText>
      </div>
    </div>
  );
}
