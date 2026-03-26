import {
  GoabAppHeader,
  GoabAppHeaderMenu,
  GoabMenuButton,
  GoabMenuAction,
} from "@abgov/react-components";

export function HeaderWithNavigation() {
  return (
    <>
      <GoabAppHeader url="https://www.alberta.ca" heading="Service name">
        <a slot="navigation" href="#">
          Dashboard
        </a>
        <GoabAppHeaderMenu slotName="navigation" heading="Search">
          <a href="#">Cases</a>
          <a href="#">Payments</a>
          <a href="#">Outstanding</a>
        </GoabAppHeaderMenu>
        <a slot="navigation" href="#">
          Support
        </a>
        <GoabMenuButton
          slot="utilities"
          text="John Smith"
          type="tertiary"
          size="compact"
        >
          <GoabMenuAction text="User settings" action="user-settings" />
          <GoabMenuAction text="Sign out" action="sign-out" />
        </GoabMenuButton>
      </GoabAppHeader>
    </>
  );
}
