import {
  GoabAppHeader,
  GoabAppHeaderMenu,
  GoabMenuButton,
  GoabMenuAction,
} from "@abgov/react-components";

export function HeaderWithNavigation() {
  return (
    <GoabAppHeader
      url="https://www.alberta.ca"
      heading="Service name"
      navigation={
        <>
          <a href="#">Dashboard</a>
          <GoabAppHeaderMenu heading="Search">
            <a href="#">Cases</a>
            <a href="#">Payments</a>
            <a href="#">Outstanding</a>
          </GoabAppHeaderMenu>
          <a href="#">Support</a>
        </>
      }
      utilities={
        <GoabMenuButton text="John Smith" type="tertiary" size="compact">
          <GoabMenuAction text="User settings" action="user-settings" />
          <GoabMenuAction text="Sign out" action="sign-out" />
        </GoabMenuButton>
      }
    ></GoabAppHeader>
  );
}
