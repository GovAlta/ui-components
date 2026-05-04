import { GoabIconButton } from "@abgov/react-components";

export function DocsIconButtonRoute() {
  return (
    <div>
      <h2>Icon button</h2>

      <h3>Basic icon button</h3>
      <GoabIconButton icon="close" ariaLabel="Close" />

      <h3>Sizes</h3>
      <GoabIconButton icon="settings" size="2xsmall" ariaLabel="Settings" />
      <GoabIconButton icon="settings" size="xsmall" ariaLabel="Settings" />
      <GoabIconButton icon="settings" size="small" ariaLabel="Settings" />
      <GoabIconButton icon="settings" size="medium" ariaLabel="Settings" />
      <GoabIconButton icon="settings" size="large" ariaLabel="Settings" />
      <GoabIconButton icon="settings" size="xlarge" ariaLabel="Settings" />

      <h3>Colours</h3>
      <GoabIconButton icon="close" variant="color" ariaLabel="Close" />
      <GoabIconButton icon="close" variant="dark" ariaLabel="Close" />
      <GoabIconButton icon="close" variant="destructive" ariaLabel="Close" />
      <div
        style={{
          backgroundColor: "var(--goa-color-greyscale-700)",
          padding: "var(--goa-space-l)",
          display: "inline-block",
          marginTop: "var(--goa-space-m)",
        }}
      >
        <GoabIconButton icon="close" variant="light" ariaLabel="Close" />
      </div>

      <h3>Icon theme</h3>
      <GoabIconButton icon="bookmark" theme="outline" ariaLabel="Bookmark (outline)" />
      <GoabIconButton icon="bookmark" theme="filled" ariaLabel="Bookmark (filled)" />
      <GoabIconButton icon="notifications" theme="outline" ariaLabel="Notifications (outline)" />
      <GoabIconButton icon="notifications" theme="filled" ariaLabel="Notifications (filled)" />

      <h3>Disabled</h3>
      <GoabIconButton icon="trash" ariaLabel="Delete" disabled />
    </div>
  );
}
