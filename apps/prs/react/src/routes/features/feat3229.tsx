import { useState } from "react";
import {
  GoabBadge,
  GoabBlock,
  GoabDivider,
  GoabMenuAction,
  GoabMenuButton,
  GoabText,
} from "@abgov/react-components";

import { GoabMenuButtonOnActionDetail } from "@abgov/ui-components-common";

// Menu actions with icon + text
const menuActionsWithIcons = (
  <>
    <GoabMenuAction text="View case" action="view" />
    <GoabMenuAction text="Assign to me" action="assign" />
    <GoabMenuAction text="Edit" action="edit" icon="pencil" />
    <GoabMenuAction text="Delete" action="delete" icon="trash" />
  </>
);

// Menu actions with text only (no icons)
const menuActionsTextOnly = (
  <>
    <GoabMenuAction text="View case" action="view" />
    <GoabMenuAction text="Assign to me" action="assign" />
    <GoabMenuAction text="Edit" action="edit" />
    <GoabMenuAction text="Delete" action="delete" />
  </>
);

export function Feat3229Route() {
  const [lastAction, setLastAction] = useState<string>("");

  const handleAction = (detail: GoabMenuButtonOnActionDetail, label?: string) => {
    const source = label ? ` (${label})` : "";
    setLastAction(`Action "${detail.action}"${source}`);
  };

  return (
    <div>
      <GoabText tag="h1" mt="m">
        Feature #3229: MenuButton
      </GoabText>

      <GoabDivider mt="l" mb="l" />

      {lastAction && (
        <GoabBlock mb="m">
          <GoabBadge type="information" content={lastAction} />
        </GoabBlock>
      )}

      {/* ── Test 1: Icon-only edge cases ── */}
      <GoabText tag="h2">1. Icon-only (no text) — edge cases</GoabText>
      <GoabText tag="p">
        When no <code>text</code> is provided, renders as a borderless icon button.
      </GoabText>

      <GoabBlock direction="column" gap="m" mt="m">
        <GoabBlock gap="l" alignment="center">
          <GoabText>
            No text, no icon, no size — defaults to ellipsis-horizontal, normal size,
            ariaLabel="Open menu"
          </GoabText>
          <GoabMenuButton onAction={(d) => handleAction(d, "icon-only defaults")}>
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>No text, no icon, no ariaLabel, size="compact"</GoabText>
          <GoabMenuButton
            size="compact"
            onAction={(d) => handleAction(d, "icon-only compact no ariaLabel")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>No text, custom ariaLabel="Actions for John Smith"</GoabText>
          <GoabMenuButton
            ariaLabel="Actions for John Smith"
            onAction={(d) => handleAction(d, "icon-only custom ariaLabel")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>No text, custom ariaLabel, size="compact"</GoabText>
          <GoabMenuButton
            ariaLabel="Actions for John Smith"
            size="compact"
            onAction={(d) => handleAction(d, "icon-only custom ariaLabel compact")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      {/* ── Test 2: Size on icon-only ── */}
      <GoabText tag="h2">2. Size on icon-only</GoabText>

      <GoabBlock direction="column" gap="m" mt="m">
        <GoabBlock gap="l" alignment="center">
          <GoabText>icon + normal (default)</GoabText>
          <GoabMenuButton
            leadingIcon="ellipsis-horizontal"
            onAction={(d) => handleAction(d, "icon normal")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>icon + compact</GoabText>
          <GoabMenuButton
            leadingIcon="ellipsis-horizontal"
            size="compact"
            onAction={(d) => handleAction(d, "icon compact")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      {/* ── Test 3: Size on text-only ── */}
      <GoabText tag="h2">3. Size on text-only</GoabText>

      <GoabBlock direction="column" gap="m" mt="m">
        <GoabBlock gap="l" alignment="center">
          <GoabText>text + normal (default)</GoabText>
          <GoabMenuButton
            text="Actions"
            onAction={(d) => handleAction(d, "text normal")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>text + compact</GoabText>
          <GoabMenuButton
            text="Actions"
            size="compact"
            onAction={(d) => handleAction(d, "text compact")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      {/* ── Test 4: Size on text + icon ── */}
      <GoabText tag="h2">4. Size on text + leadingIcon</GoabText>

      <GoabBlock direction="column" gap="m" mt="m">
        <GoabBlock gap="l" alignment="center">
          <GoabText>text + icon + normal</GoabText>
          <GoabMenuButton
            text="More"
            leadingIcon="ellipsis-horizontal"
            onAction={(d) => handleAction(d, "text+icon normal")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>text + icon + compact</GoabText>
          <GoabMenuButton
            text="More"
            leadingIcon="ellipsis-horizontal"
            size="compact"
            onAction={(d) => handleAction(d, "text+icon compact")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      {/* ── Test 5: Menu action variants ── */}
      <GoabText tag="h2">5. Menu action items — with icon vs text-only</GoabText>
      <GoabText tag="p">
        Verify that menu action items render correctly for both normal and compact sizes,
        with and without icons.
      </GoabText>

      <GoabBlock direction="column" gap="m" mt="m">
        <GoabBlock gap="l" alignment="center">
          <GoabText>normal — actions with icon + text</GoabText>
          <GoabMenuButton
            text="With Icons"
            onAction={(d) => handleAction(d, "actions with icons normal")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>compact — actions with icon + text</GoabText>
          <GoabMenuButton
            text="With Icons"
            size="compact"
            onAction={(d) => handleAction(d, "actions with icons compact")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>normal — actions text-only</GoabText>
          <GoabMenuButton
            text="Text Only"
            onAction={(d) => handleAction(d, "actions text-only normal")}
          >
            {menuActionsTextOnly}
          </GoabMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>compact — actions text-only</GoabText>
          <GoabMenuButton
            text="Text Only"
            size="compact"
            onAction={(d) => handleAction(d, "actions text-only compact")}
          >
            {menuActionsTextOnly}
          </GoabMenuButton>
        </GoabBlock>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      {/* ── Test 6: Button types ── */}
      <GoabText tag="h2">6. Button types (normal vs compact)</GoabText>

      <GoabBlock direction="column" gap="m" mt="m">
        <GoabBlock gap="l" alignment="center">
          <GoabText>primary</GoabText>
          <GoabMenuButton
            text="Primary"
            type="primary"
            onAction={(d) => handleAction(d, "primary normal")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
          <GoabMenuButton
            text="Primary"
            type="primary"
            size="compact"
            onAction={(d) => handleAction(d, "primary compact")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>secondary</GoabText>
          <GoabMenuButton
            text="Secondary"
            type="secondary"
            onAction={(d) => handleAction(d, "secondary normal")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
          <GoabMenuButton
            text="Secondary"
            type="secondary"
            size="compact"
            onAction={(d) => handleAction(d, "secondary compact")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>tertiary</GoabText>
          <GoabMenuButton
            text="Tertiary"
            type="tertiary"
            onAction={(d) => handleAction(d, "tertiary normal")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
          <GoabMenuButton
            text="Tertiary"
            type="tertiary"
            size="compact"
            onAction={(d) => handleAction(d, "tertiary compact")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      {/* ── Test 7: Button variants (normal, destructive) ── */}
      <GoabText tag="h2">7. Button variants</GoabText>
      <GoabText tag="p">
        The <code>variant</code> prop controls the color scheme: normal or destructive.
      </GoabText>

      <GoabBlock direction="column" gap="m" mt="m">
        <GoabBlock gap="l" alignment="center">
          <GoabText>normal (default)</GoabText>
          <GoabMenuButton
            text="Normal"
            variant="normal"
            onAction={(d) => handleAction(d, "variant normal")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
          <GoabMenuButton
            text="Normal"
            variant="normal"
            size="compact"
            onAction={(d) => handleAction(d, "variant normal compact")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>destructive</GoabText>
          <GoabMenuButton
            text="Destructive"
            variant="destructive"
            onAction={(d) => handleAction(d, "variant destructive")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
          <GoabMenuButton
            text="Destructive"
            variant="destructive"
            size="compact"
            onAction={(d) => handleAction(d, "variant destructive compact")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>icon-only destructive</GoabText>
          <GoabMenuButton
            variant="destructive"
            onAction={(d) => handleAction(d, "icon-only destructive")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
          <GoabMenuButton
            variant="destructive"
            size="compact"
            onAction={(d) => handleAction(d, "icon-only destructive compact")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>destructive + secondary</GoabText>
          <GoabMenuButton
            text="Delete"
            type="secondary"
            variant="destructive"
            onAction={(d) => handleAction(d, "destructive secondary")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
          <GoabMenuButton
            text="Delete"
            type="secondary"
            variant="destructive"
            size="compact"
            onAction={(d) => handleAction(d, "destructive secondary compact")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>destructive + tertiary</GoabText>
          <GoabMenuButton
            text="Delete"
            type="tertiary"
            variant="destructive"
            onAction={(d) => handleAction(d, "destructive tertiary")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
          <GoabMenuButton
            text="Delete"
            type="tertiary"
            variant="destructive"
            size="compact"
            onAction={(d) => handleAction(d, "destructive tertiary compact")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      {/* ── Test 8: Icon theme — filled vs outline ── */}
      <GoabText tag="h2">8. Icon theme (filled vs outline)</GoabText>
      <GoabText tag="p">
        Use <code>icon-name:filled</code> or <code>icon-name:outline</code> suffix to
        control icon theme.
      </GoabText>

      <GoabBlock direction="column" gap="m" mt="m">
        <GoabBlock gap="l" alignment="center">
          <GoabText>ellipsis-horizontal</GoabText>
          <GoabMenuButton
            leadingIcon="ellipsis-horizontal:outline"
            onAction={(d) => handleAction(d, "ellipsis outline")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
          <GoabMenuButton
            leadingIcon="ellipsis-horizontal:filled"
            onAction={(d) => handleAction(d, "ellipsis filled")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>ellipsis-vertical</GoabText>
          <GoabMenuButton
            leadingIcon="ellipsis-vertical:outline"
            onAction={(d) => handleAction(d, "ellipsis-v outline")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
          <GoabMenuButton
            leadingIcon="ellipsis-vertical:filled"
            onAction={(d) => handleAction(d, "ellipsis-v filled")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>menu</GoabText>
          <GoabMenuButton
            leadingIcon="menu:outline"
            onAction={(d) => handleAction(d, "menu outline")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
          <GoabMenuButton
            leadingIcon="menu:filled"
            onAction={(d) => handleAction(d, "menu filled")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>settings</GoabText>
          <GoabMenuButton
            leadingIcon="settings:outline"
            onAction={(d) => handleAction(d, "settings outline")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
          <GoabMenuButton
            leadingIcon="settings:filled"
            onAction={(d) => handleAction(d, "settings filled")}
          >
            {menuActionsWithIcons}
          </GoabMenuButton>
        </GoabBlock>
      </GoabBlock>
    </div>
  );
}

export default Feat3229Route;
