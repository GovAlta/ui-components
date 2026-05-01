import {
  GoabAppHeader,
  GoabAppHeaderMenu,
  GoabBadge,
  GoabBlock,
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
      <GoabAppHeader
        heading="My Application"
        url="/"
        utilities={
          <>
            <GoabButton type="tertiary" size="compact">
              Help
            </GoabButton>
            <GoabButton type="tertiary" size="compact" leadingIcon="person">
              Sign in
            </GoabButton>
          </>
        }
      />

      <h3>With phase badge</h3>
      <GoabAppHeader
        heading="My Application"
        url="/"
        phase={<GoabBadge type="important" content="Service preview" />}
      />

      <h3>Internal testing banner</h3>
      <GoabAppHeader
        heading="My Application"
        url="/"
        banner={
          <span
            style={{
              textAlign: "right",
              width: "100%",
              fontSize: "12px",
              fontWeight: "normal",
            }}
          >
            v2.3.1 | UAT Environment
          </span>
        }
      />

      <h3>With navigation</h3>
      <GoabAppHeader
        heading="Service Portal"
        url="/"
        navigation={
          <>
            <a href="#">Dashboard</a>
            <GoabAppHeaderMenu heading="Applications">
              <a href="#">New application</a>
              <a href="#">Active</a>
              <a href="#">Archived</a>
            </GoabAppHeaderMenu>
            <a href="#">Reports</a>
            <a href="#">Settings</a>
          </>
        }
        utilities={
          <GoabMenuButton text="John Smith" type="tertiary" size="compact">
            <GoabMenuAction text="User settings" action="user-settings" />
            <GoabMenuAction text="Sign out" action="sign-out" />
          </GoabMenuButton>
        }
      />
    </div>
  );
}
