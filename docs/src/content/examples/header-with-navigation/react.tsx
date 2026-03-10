import {
  GoabxAppHeader,
  GoabxAppHeaderMenu,
  GoabxMenuButton,
  GoabxMenuAction,
} from "@abgov/react-components/experimental";

export function HeaderWithNavigation() {
  return (
    <>
      <GoabxAppHeader url="https://www.alberta.ca" heading="Service name">
        <a slot="navigation" href="#">
          Dashboard
        </a>
        <GoabxAppHeaderMenu slot="navigation" heading="Search">
          <a href="#">Cases</a>
          <a href="#">Payments</a>
          <a href="#">Outstanding</a>
        </GoabxAppHeaderMenu>
        <a slot="navigation" href="#">
          Support
        </a>
        <GoabxMenuButton
          slot="utilities"
          text="John Smith"
          type="tertiary"
          size="compact"
        >
          <GoabxMenuAction text="User settings" action="user-settings" />
          <GoabxMenuAction text="Sign out" action="sign-out" />
        </GoabxMenuButton>
      </GoabxAppHeader>
    </>
  );
}
