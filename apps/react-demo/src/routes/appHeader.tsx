import { GoAAppHeader } from '@abgov/react-components';
import * as React from 'react';

export default function AppHeader() {
  return (
    <>
      <h3>Basic</h3>
      <GoAAppHeader url="https://www.example.com" />

      <br />
      <h3>Title</h3>
      <GoAAppHeader
        url="https://www.example.com"
        heading="Ticket and Find Payments"
      ></GoAAppHeader>

      <br />
      <h3>Custom Content</h3>
      <GoAAppHeader url="https://www.example.com" heading="Ticket and Find Payments">
        <a title="loginUrl" href="#">Login</a>
      </GoAAppHeader>
    </>
  );
}

