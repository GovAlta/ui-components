import { GoabMenuAction, GoabMenuButton } from "@abgov/react-components";
import type { GoabMenuButtonOnActionDetail } from "@abgov/ui-components-common";

export function DocsMenuButtonRoute() {
  function handleAction(detail: GoabMenuButtonOnActionDetail) {
    console.log("action", detail.action);
  }

  return (
    <div>
      <h2>Menu button</h2>

      <h3>Basic menu button</h3>
      <GoabMenuButton text="Actions" onAction={handleAction}>
        <GoabMenuAction text="Edit" action="edit" />
        <GoabMenuAction text="Copy" action="copy" />
        <GoabMenuAction text="Delete" action="delete" />
      </GoabMenuButton>

      <h3>Types</h3>
      <GoabMenuButton text="Primary" type="primary" onAction={handleAction}>
        <GoabMenuAction text="Action 1" action="a1" />
        <GoabMenuAction text="Action 2" action="a2" />
      </GoabMenuButton>
      <GoabMenuButton text="Secondary" type="secondary" onAction={handleAction}>
        <GoabMenuAction text="Action 1" action="a1" />
        <GoabMenuAction text="Action 2" action="a2" />
      </GoabMenuButton>
      <GoabMenuButton text="Tertiary" type="tertiary" onAction={handleAction}>
        <GoabMenuAction text="Action 1" action="a1" />
        <GoabMenuAction text="Action 2" action="a2" />
      </GoabMenuButton>

      <h3>Icon-only menu button</h3>
      <GoabMenuButton
        leadingIcon="ellipsis-horizontal"
        ariaLabel="More options"
        onAction={handleAction}
      >
        <GoabMenuAction text="View details" action="view" />
        <GoabMenuAction text="Edit" action="edit" icon="pencil" />
        <GoabMenuAction text="Delete" action="delete" icon="trash" />
      </GoabMenuButton>

      <h3>Items with icons</h3>
      <GoabMenuButton text="Options" onAction={handleAction}>
        <GoabMenuAction text="Download" action="download" icon="download" />
        <GoabMenuAction text="Share" action="share" icon="share" />
        <GoabMenuAction text="Print" action="print" icon="print" />
      </GoabMenuButton>

      <h3>Sizes</h3>
      <GoabMenuButton text="Normal" size="normal" onAction={handleAction}>
        <GoabMenuAction text="Action 1" action="a1" />
        <GoabMenuAction text="Action 2" action="a2" />
      </GoabMenuButton>
      <GoabMenuButton text="Compact" size="compact" onAction={handleAction}>
        <GoabMenuAction text="Action 1" action="a1" />
        <GoabMenuAction text="Action 2" action="a2" />
      </GoabMenuButton>

      <h3>Destructive variant</h3>
      <GoabMenuButton text="Primary" variant="destructive" onAction={handleAction}>
        <GoabMenuAction text="Delete item" action="delete" icon="trash" />
        <GoabMenuAction text="Delete all" action="delete-all" icon="trash" />
      </GoabMenuButton>
      <GoabMenuButton
        text="Secondary"
        variant="destructive"
        type="secondary"
        onAction={handleAction}
      >
        <GoabMenuAction text="Delete item" action="delete" icon="trash" />
        <GoabMenuAction text="Delete all" action="delete-all" icon="trash" />
      </GoabMenuButton>
      <GoabMenuButton
        text="Tertiary"
        variant="destructive"
        type="tertiary"
        onAction={handleAction}
      >
        <GoabMenuAction text="Delete item" action="delete" icon="trash" />
        <GoabMenuAction text="Delete all" action="delete-all" icon="trash" />
      </GoabMenuButton>
    </div>
  );
}
