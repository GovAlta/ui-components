import {
  GoabAppHeader,
  GoabAppHeaderMenu,
  GoabPageBlock,
} from "@abgov/react-components";

export function Bug3322Route() {
  return (
    <>
      <h1>Bug 3322 - App Header Menu Display</h1>
      <p>Testing that app header menu displays correctly on hover.</p>

      <GoabPageBlock width="100%">
        <GoabAppHeader url="https://example.com" heading="Service name">
          <GoabAppHeaderMenu heading="Search" leadingIcon="search">
            <a href="#">Cases</a>
            <a href="#">Payments</a>
            <a href="#">Outstanding</a>
          </GoabAppHeaderMenu>
          <a href="#">Support</a>
          <a href="#" className="interactive">Sign in</a>
        </GoabAppHeader>
      </GoabPageBlock>
    </>
  );
}
