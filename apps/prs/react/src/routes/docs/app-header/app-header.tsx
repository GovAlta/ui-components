import {
  GoabAppHeader,
  GoabAppHeaderMenu,
  GoabBadge,
  GoabButton,
  GoabMenuAction,
  GoabMenuButton,
} from "@abgov/react-components";

export function DocsAppHeaderRoute() {
  return (
    <div>
      <h2>App header</h2>

      <h3>Basic app header</h3>
      <GoabAppHeader heading="My Application" />

      <h3>With home link</h3>
      <GoabAppHeader heading="My Application" url="/" />

      <h3>With secondary text</h3>
      <GoabAppHeader
        heading="My Application"
        secondaryText="Supporting information"
        url="/"
      />

      <h3>With utilities</h3>
      <GoabAppHeader heading="My Application" url="/">
        <div slot="utilities">
          <GoabButton type="tertiary" size="compact">Help</GoabButton>
        </div>
        <div slot="utilities">
          <GoabButton type="tertiary" size="compact" leadingIcon="person">
            Sign in
          </GoabButton>
        </div>
      </GoabAppHeader>

      <h3>With phase badge</h3>
      <GoabAppHeader heading="My Application" url="/">
        <div slot="phase">
          <GoabBadge type="important" content="Service preview" icon={false} />
        </div>
      </GoabAppHeader>

      <h3>Internal testing banner</h3>
      <GoabAppHeader heading="My Application" url="/">
        <span
          slot="banner"
          style={{
            textAlign: "right",
            width: "100%",
            fontSize: "12px",
            fontWeight: "normal",
          }}
        >
          v2.3.1 | UAT Environment
        </span>
      </GoabAppHeader>

      <h3>With navigation</h3>
      <GoabAppHeader heading="Service Portal" url="/">
        <a slot="navigation" href="#">
          Dashboard
        </a>
        <GoabAppHeaderMenu slotName="navigation" heading="Applications">
          <a href="#">New application</a>
          <a href="#">Active</a>
          <a href="#">Archived</a>
        </GoabAppHeaderMenu>
        <a slot="navigation" href="#">
          Reports
        </a>
        <a slot="navigation" href="#">
          Settings
        </a>
        <div slot="utilities">
          <GoabMenuButton text="John Smith" type="tertiary" size="compact">
            <GoabMenuAction text="User settings" action="user-settings" />
            <GoabMenuAction text="Sign out" action="sign-out" />
          </GoabMenuButton>
        </div>
      </GoabAppHeader>
    </div>
  );
}
