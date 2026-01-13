import { GoabAppHeader, GoabAppHeaderMenu } from "@abgov/react-components";

export function HeaderWithNavigation() {
  return (
    <GoabAppHeader url="https://www.alberta.ca" heading="Service name">
      <GoabAppHeaderMenu heading="Search" leadingIcon="search">
        <a href="#">Cases</a>
        <a href="#">Payments</a>
        <a href="#">Outstanding</a>
      </GoabAppHeaderMenu>
      <a href="#">Support</a>
      <a href="#" className="interactive">
        Sign in
      </a>
    </GoabAppHeader>
  );
}
