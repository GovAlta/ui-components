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
        <a title="loginUrl" href="app-header#login" className="interactive">
          Login
        </a>
      </GoAAppHeader>
    </>
  );
}
