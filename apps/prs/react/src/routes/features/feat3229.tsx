import { useState, useEffect } from "react";
import { GoabBlock, GoabText, GoabDivider } from "@abgov/react-components";
import {
  GoabxMenuButton,
  GoabxMenuAction,
  GoabxBadge,
} from "@abgov/react-components/experimental";
import { GoabMenuButtonOnActionDetail } from "@abgov/ui-components-common";
import v2TokensUrl from "@abgov/design-tokens-v2/dist/tokens.css?url";

// Menu actions with icon + text
const menuActionsWithIcons = (
  <>
    <GoabxMenuAction text="View case" action="view" />
    <GoabxMenuAction text="Assign to me" action="assign" />
    <GoabxMenuAction text="Edit" action="edit" icon="pencil" />
    <GoabxMenuAction text="Delete" action="delete" icon="trash" />
  </>
);

// Menu actions with text only (no icons)
const menuActionsTextOnly = (
  <>
    <GoabxMenuAction text="View case" action="view" />
    <GoabxMenuAction text="Assign to me" action="assign" />
    <GoabxMenuAction text="Edit" action="edit" />
    <GoabxMenuAction text="Delete" action="delete" />
  </>
);

export function Feat3229Route() {
  const [lastAction, setLastAction] = useState<string>("");

  useEffect(() => {
    // Load V2 tokens
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = v2TokensUrl;
    document.head.appendChild(link);

    // Save deleted rules so we can restore them on cleanup
    const deletedRules: Array<{ sheet: CSSStyleSheet; index: number; cssText: string }> =
      [];

    // Remove V1 token definitions (:root rules) from all other stylesheets,
    // keeping component styles intact
    link.onload = () => {
      [...document.styleSheets].forEach((ss) => {
        if (ss.ownerNode === link) return; // skip V2 stylesheet
        try {
          for (let i = ss.cssRules.length - 1; i >= 0; i--) {
            const rule = ss.cssRules[i];
            if (rule instanceof CSSStyleRule && rule.selectorText === ":root") {
              deletedRules.push({ sheet: ss, index: i, cssText: rule.cssText });
              ss.deleteRule(i);
            }
          }
        } catch (e) {
          // skip cross-origin sheets
        }
      });
    };

    return () => {
      document.head.removeChild(link);
      // Restore V1 :root rules in reverse order to maintain correct indices
      deletedRules.reverse().forEach(({ sheet, index, cssText }) => {
        try {
          sheet.insertRule(cssText, index);
        } catch (e) {
          console.log(e);
        }
      });
    };
  }, []);

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
          <GoabxBadge type="information" content={lastAction} />
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
          <GoabxMenuButton onAction={(d) => handleAction(d, "icon-only defaults")}>
            {menuActionsWithIcons}
          </GoabxMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>No text, no icon, no ariaLabel, size="compact"</GoabText>
          <GoabxMenuButton
            size="compact"
            onAction={(d) => handleAction(d, "icon-only compact no ariaLabel")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>No text, custom ariaLabel="Actions for John Smith"</GoabText>
          <GoabxMenuButton
            ariaLabel="Actions for John Smith"
            onAction={(d) => handleAction(d, "icon-only custom ariaLabel")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>No text, custom ariaLabel, size="compact"</GoabText>
          <GoabxMenuButton
            ariaLabel="Actions for John Smith"
            size="compact"
            onAction={(d) => handleAction(d, "icon-only custom ariaLabel compact")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
        </GoabBlock>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      {/* ── Test 2: Size on icon-only ── */}
      <GoabText tag="h2">2. Size on icon-only</GoabText>

      <GoabBlock direction="column" gap="m" mt="m">
        <GoabBlock gap="l" alignment="center">
          <GoabText>icon + normal (default)</GoabText>
          <GoabxMenuButton
            leadingIcon="ellipsis-horizontal"
            onAction={(d) => handleAction(d, "icon normal")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>icon + compact</GoabText>
          <GoabxMenuButton
            leadingIcon="ellipsis-horizontal"
            size="compact"
            onAction={(d) => handleAction(d, "icon compact")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
        </GoabBlock>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      {/* ── Test 3: Size on text-only ── */}
      <GoabText tag="h2">3. Size on text-only</GoabText>

      <GoabBlock direction="column" gap="m" mt="m">
        <GoabBlock gap="l" alignment="center">
          <GoabText>text + normal (default)</GoabText>
          <GoabxMenuButton
            text="Actions"
            onAction={(d) => handleAction(d, "text normal")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>text + compact</GoabText>
          <GoabxMenuButton
            text="Actions"
            size="compact"
            onAction={(d) => handleAction(d, "text compact")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
        </GoabBlock>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      {/* ── Test 4: Size on text + icon ── */}
      <GoabText tag="h2">4. Size on text + leadingIcon</GoabText>

      <GoabBlock direction="column" gap="m" mt="m">
        <GoabBlock gap="l" alignment="center">
          <GoabText>text + icon + normal</GoabText>
          <GoabxMenuButton
            text="More"
            leadingIcon="ellipsis-horizontal"
            onAction={(d) => handleAction(d, "text+icon normal")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>text + icon + compact</GoabText>
          <GoabxMenuButton
            text="More"
            leadingIcon="ellipsis-horizontal"
            size="compact"
            onAction={(d) => handleAction(d, "text+icon compact")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
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
          <GoabxMenuButton
            text="With Icons"
            onAction={(d) => handleAction(d, "actions with icons normal")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>compact — actions with icon + text</GoabText>
          <GoabxMenuButton
            text="With Icons"
            size="compact"
            onAction={(d) => handleAction(d, "actions with icons compact")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>normal — actions text-only</GoabText>
          <GoabxMenuButton
            text="Text Only"
            onAction={(d) => handleAction(d, "actions text-only normal")}
          >
            {menuActionsTextOnly}
          </GoabxMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>compact — actions text-only</GoabText>
          <GoabxMenuButton
            text="Text Only"
            size="compact"
            onAction={(d) => handleAction(d, "actions text-only compact")}
          >
            {menuActionsTextOnly}
          </GoabxMenuButton>
        </GoabBlock>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      {/* ── Test 6: Button types ── */}
      <GoabText tag="h2">6. Button types (normal vs compact)</GoabText>

      <GoabBlock direction="column" gap="m" mt="m">
        <GoabBlock gap="l" alignment="center">
          <GoabText>primary</GoabText>
          <GoabxMenuButton
            text="Primary"
            type="primary"
            onAction={(d) => handleAction(d, "primary normal")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
          <GoabxMenuButton
            text="Primary"
            type="primary"
            size="compact"
            onAction={(d) => handleAction(d, "primary compact")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>secondary</GoabText>
          <GoabxMenuButton
            text="Secondary"
            type="secondary"
            onAction={(d) => handleAction(d, "secondary normal")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
          <GoabxMenuButton
            text="Secondary"
            type="secondary"
            size="compact"
            onAction={(d) => handleAction(d, "secondary compact")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>tertiary</GoabText>
          <GoabxMenuButton
            text="Tertiary"
            type="tertiary"
            onAction={(d) => handleAction(d, "tertiary normal")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
          <GoabxMenuButton
            text="Tertiary"
            type="tertiary"
            size="compact"
            onAction={(d) => handleAction(d, "tertiary compact")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
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
          <GoabxMenuButton
            text="Normal"
            variant="normal"
            onAction={(d) => handleAction(d, "variant normal")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
          <GoabxMenuButton
            text="Normal"
            variant="normal"
            size="compact"
            onAction={(d) => handleAction(d, "variant normal compact")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>destructive</GoabText>
          <GoabxMenuButton
            text="Destructive"
            variant="destructive"
            onAction={(d) => handleAction(d, "variant destructive")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
          <GoabxMenuButton
            text="Destructive"
            variant="destructive"
            size="compact"
            onAction={(d) => handleAction(d, "variant destructive compact")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>icon-only destructive</GoabText>
          <GoabxMenuButton
            variant="destructive"
            onAction={(d) => handleAction(d, "icon-only destructive")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
          <GoabxMenuButton
            variant="destructive"
            size="compact"
            onAction={(d) => handleAction(d, "icon-only destructive compact")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>destructive + secondary</GoabText>
          <GoabxMenuButton
            text="Delete"
            type="secondary"
            variant="destructive"
            onAction={(d) => handleAction(d, "destructive secondary")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
          <GoabxMenuButton
            text="Delete"
            type="secondary"
            variant="destructive"
            size="compact"
            onAction={(d) => handleAction(d, "destructive secondary compact")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>destructive + tertiary</GoabText>
          <GoabxMenuButton
            text="Delete"
            type="tertiary"
            variant="destructive"
            onAction={(d) => handleAction(d, "destructive tertiary")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
          <GoabxMenuButton
            text="Delete"
            type="tertiary"
            variant="destructive"
            size="compact"
            onAction={(d) => handleAction(d, "destructive tertiary compact")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
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
          <GoabxMenuButton
            leadingIcon="ellipsis-horizontal:outline"
            onAction={(d) => handleAction(d, "ellipsis outline")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
          <GoabxMenuButton
            leadingIcon="ellipsis-horizontal:filled"
            onAction={(d) => handleAction(d, "ellipsis filled")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>ellipsis-vertical</GoabText>
          <GoabxMenuButton
            leadingIcon="ellipsis-vertical:outline"
            onAction={(d) => handleAction(d, "ellipsis-v outline")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
          <GoabxMenuButton
            leadingIcon="ellipsis-vertical:filled"
            onAction={(d) => handleAction(d, "ellipsis-v filled")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>menu</GoabText>
          <GoabxMenuButton
            leadingIcon="menu:outline"
            onAction={(d) => handleAction(d, "menu outline")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
          <GoabxMenuButton
            leadingIcon="menu:filled"
            onAction={(d) => handleAction(d, "menu filled")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
        </GoabBlock>

        <GoabBlock gap="l" alignment="center">
          <GoabText>settings</GoabText>
          <GoabxMenuButton
            leadingIcon="settings:outline"
            onAction={(d) => handleAction(d, "settings outline")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
          <GoabxMenuButton
            leadingIcon="settings:filled"
            onAction={(d) => handleAction(d, "settings filled")}
          >
            {menuActionsWithIcons}
          </GoabxMenuButton>
        </GoabBlock>
      </GoabBlock>
    </div>
  );
}

export default Feat3229Route;
