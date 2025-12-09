import {
  GoabBlock,
  GoabDivider,
  GoabGrid,
  GoabMenuAction,
  GoabMenuButton,
  GoabText,
} from "@abgov/react-components";
import type { GoabMenuButtonOnActionDetail } from "@abgov/ui-components-common";

export function Bug3118Route() {
  const onAction = (detail: GoabMenuButtonOnActionDetail) => {
    console.log(detail);
  };

  return (
    <GoabBlock direction="column" gap="l">
      <GoabBlock direction="column" gap="s">
        <GoabText tag="h1" mb="0" mt="0">
          <a
            href="https://github.com/GovAlta/ui-components/issues/3118"
            rel="noreferrer"
            target="_blank"
          >
            3118
          </a>{" "}
          - MenuButton's width is not setting the correct width on wider elements
        </GoabText>
        <GoabText tag="p">
          Use these scenarios to confirm the React wrapper exposes the leading icon
          property and that the menu width matches the longest action label.
        </GoabText>
      </GoabBlock>

      <GoabDivider mt="xl" mb="xl" />

      {/* Critical Test Cases for the Fix */}
      <GoabText tag="h2">Long Elements aren't forced to wrap</GoabText>

      <GoabMenuButton text="Baseline actions" onAction={onAction}>
        <GoabMenuAction key="1" text="Action 1" action="action-1" icon="search" />
        <GoabMenuAction
          key="2"
          text="Very very very very very very very very very very very very long action"
          action="action-2"
          icon="search"
        />
        <GoabMenuAction key="3" text="Action 3" action="action-2" icon="search" />
      </GoabMenuButton>

      {/* Critical Test Cases for the Fix */}
      <GoabText tag="h2">Max width can be set forcing long elements to wrap</GoabText>

      <GoabMenuButton maxWidth="500px" text="Baseline actions" onAction={onAction}>
        <GoabMenuAction key="1" text="Action 1" action="action-1" icon="search" />
        <GoabMenuAction
          key="2"
          text="Very very very very very very very very very very very very long action"
          action="action-2"
          icon="search"
        />
        <GoabMenuAction key="3" text="Action 3" action="action-2" icon="search" />
      </GoabMenuButton>

      <GoabDivider mt="xl" mb="xl" />

      {/* Critical Test Cases for the      <GoabDivider mt="xl" mb="xl" />


      {/* Critical Test Cases for the Fix */}
      <GoabText tag="h2">
        Components on the right side of the screen will right align the menu options
      </GoabText>
      <GoabText tag="p">You may may have to resize the browser to test this</GoabText>

      <GoabBlock direction="row" gap="l" width="100%">
        <div style={{ width: "100%" }}></div>
        <GoabMenuButton text="Baseline actions" onAction={onAction}>
          <GoabMenuAction key="1" text="Action 1" action="action-1" icon="search" />
          <GoabMenuAction
            key="2"
            text="Very very very very very very very very very very very very long action"
            action="action-2"
            icon="search"
          />
          <GoabMenuAction key="3" text="Action 3" action="action-2" icon="search" />
        </GoabMenuButton>
      </GoabBlock>

      <GoabDivider mt="xl" mb="xl" />

      {/*  */}
      <GoabText tag="h2">Regression tests</GoabText>

      <GoabGrid minChildWidth="320px" gap="l">
        <GoabBlock direction="column" gap="l" maxWidth="320px">
          <GoabText tag="p">Some text</GoabText>
          <GoabMenuButton text="Baseline actions" onAction={onAction}>
            <GoabMenuAction key="1" text="Action 1" action="action-1" icon="search" />
            <GoabMenuAction
              key="2"
              text="Very very very very very very very very very very very very long action"
              action="action-2"
              icon="search"
            />
            <GoabMenuAction key="3" text="Action 3" action="action-2" icon="search" />
          </GoabMenuButton>
        </GoabBlock>

        <GoabBlock direction="column" gap="l" maxWidth="320px">
          <GoabText tag="p">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta earum ipsa
            ullam beatae at atque non voluptas fugiat sapiente praesentium quisquam
            possimus repellat, illo voluptates nisi obcaecati quos. Mollitia, recusandae.
          </GoabText>
          <GoabMenuButton text="Baseline actions" onAction={onAction}>
            <GoabMenuAction key="1" text="Action 1" action="action-1" icon="search" />
            <GoabMenuAction
              key="2"
              text="Very very very very very very very very very very very very long action"
              action="action-2"
              icon="search"
            />
            <GoabMenuAction key="3" text="Action 3" action="action-2" icon="search" />
          </GoabMenuButton>
        </GoabBlock>

        <GoabBlock direction="column" gap="l" maxWidth="320px">
          <GoabText tag="p">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta earum ipsa
            ullam beatae at atque non voluptas fugiat sapiente praesentium quisquam
            possimus repellat, illo voluptates nisi obcaecati quos. Mollitia, recusandae.
          </GoabText>
          <GoabMenuButton text="Baseline actions" onAction={onAction}>
            <GoabMenuAction key="1" text="Action 1" action="action-1" icon="search" />
            <GoabMenuAction
              key="2"
              text="Very very very very very very very very very very very very long action"
              action="action-2"
              icon="search"
            />
            <GoabMenuAction key="3" text="Action 3" action="action-2" icon="search" />
          </GoabMenuButton>
        </GoabBlock>
      </GoabGrid>
    </GoabBlock>
  );
}
