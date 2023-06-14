import { GoAAppHeader, GoAAppHeaderMenu } from "@abgov/react-components";
import * as React from "react";

export default function AppHeader() {
  return (
    <>
      <h1>App Header</h1>

      <h2>Basic</h2>
      <GoAAppHeader url="https://example.com" />

      <h2>Title</h2>
      <GoAAppHeader
        url="https://example.com"
        heading="Ticket and Fine Payments"
      ></GoAAppHeader>

      <h2>Custom Content</h2>
      <GoAAppHeader
        url="https://example.com"
        heading="Ticket and Fine Payments"
      >
        <a href="app-header#aboutus">About Us</a>
        <GoAAppHeaderMenu heading="Learn More">
          <a href="app-header#seniors">Seniors</a>
          <a href="app-header#family">Family</a>
          <a href="app-header#children">
            Children with a really realllllllllllllllllly long text
          </a>
        </GoAAppHeaderMenu>
        <GoAAppHeaderMenu heading="Mary Smith" leadingIcon="person-circle">
          <a href="app-header#settings">Settings</a>
          <a href="app-header#prefs">Preferences</a>
        </GoAAppHeaderMenu>
        <a title="loginUrl" href="app-header#login" className="interactive">
          Login
        </a>
      </GoAAppHeader>
    </>
  );
}
