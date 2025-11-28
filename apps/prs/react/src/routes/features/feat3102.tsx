import {
  GoabBlock,
  GoabDivider,
  GoabMenuAction,
  GoabMenuButton,
  GoabText,
} from "@abgov/react-components";
import type { GoabMenuButtonOnActionDetail } from "@abgov/ui-components-common";

export default function TestComponent() {
  const onAction = (detail: GoabMenuButtonOnActionDetail) => {
    console.log(detail);
  };

  return (
    <GoabBlock direction="column" gap="l">
      <GoabBlock direction="column" gap="s">
        <GoabText tag="h1" mb="0" mt="0">
          <a
            href="https://github.com/GovAlta/ui-components/issues/3102"
            rel="noreferrer"
            target="_blank"
          >
            3102
          </a>{" "}
          - Allow icon to be set on MenuButton
        </GoabText>
        <GoabText tag="p">
          All the MenuButton to have a leading icon set
        </GoabText>
      </GoabBlock>

      <GoabDivider mt="xl" mb="xl" />

      <GoabMenuButton leadingIcon="download" text="Download" onAction={onAction}>
        <GoabMenuAction key="1" text="CSV" action="csc" />
        <GoabMenuAction
          key="2"
          text="JSON"
          action="json"
        />
        <GoabMenuAction key="3" text="XML" action="xml" />
      </GoabMenuButton>

    </GoabBlock>
  );
}
