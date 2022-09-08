import { GoAAppHeader } from '@abgov/react-components';
import * as React from 'react';

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
      <GoAAppHeader url="https://example.com" heading="Ticket and Fine Payments">
        <a title="loginUrl" href="#">Login</a>
      </GoAAppHeader>
    </>
  );
}

