import {
  GoabButton,
  GoabButtonGroup,
  GoabDivider,
  GoabMenuAction,
  GoabMenuButton,
  GoabText,
} from "@abgov/react-components";
import type { GoabMenuButtonOnActionDetail } from "@abgov/ui-components-common";

export function DocsButtonGroupRoute() {
  const handleAction = (detail: GoabMenuButtonOnActionDetail) => {
    console.log("Action selected:", detail.action);
  };

  return (
    <div>
      <h2>Button group</h2>

      <h3>Basic button group</h3>
      <GoabButtonGroup alignment="start">
        <GoabButton>Submit</GoabButton>
        <GoabButton type="secondary">Cancel</GoabButton>
      </GoabButtonGroup>

      <h3>Alignment</h3>
      <GoabText mt="none" mb="s">Start</GoabText>
      <GoabButtonGroup alignment="start">
        <GoabButton type="primary">Submit</GoabButton>
        <GoabButton type="secondary">Save draft</GoabButton>
        <GoabButton type="tertiary">Cancel</GoabButton>
      </GoabButtonGroup>
      <GoabDivider mt="l" mb="l" />
      <GoabText mt="none" mb="s">Center</GoabText>
      <GoabButtonGroup alignment="center">
        <GoabButton type="primary">Submit</GoabButton>
        <GoabButton type="secondary">Save draft</GoabButton>
        <GoabButton type="tertiary">Cancel</GoabButton>
      </GoabButtonGroup>
      <GoabDivider mt="l" mb="l" />
      <GoabText mt="none" mb="s">End</GoabText>
      <GoabButtonGroup alignment="end">
        <GoabButton type="tertiary">Cancel</GoabButton>
        <GoabButton type="secondary">Save draft</GoabButton>
        <GoabButton type="primary">Submit</GoabButton>
      </GoabButtonGroup>

      <h3>Compact</h3>
      <GoabButtonGroup alignment="start" gap="compact">
        <GoabButton size="compact">Continue</GoabButton>
        <GoabButton type="secondary" size="compact">Back</GoabButton>
      </GoabButtonGroup>

      <h3>Many actions</h3>
      <GoabButtonGroup alignment="start">
        <GoabButton>Submit</GoabButton>
        <GoabButton type="secondary">Save draft</GoabButton>
        <GoabMenuButton text="More" type="tertiary" onAction={handleAction}>
          <GoabMenuAction text="Preview" action="preview" />
          <GoabMenuAction text="Duplicate" action="duplicate" />
          <GoabMenuAction text="Print" action="print" />
          <GoabMenuAction text="Delete" action="delete" />
        </GoabMenuButton>
      </GoabButtonGroup>
    </div>
  );
}
