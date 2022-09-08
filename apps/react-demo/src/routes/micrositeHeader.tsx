import { GoAMicrositeHeader } from '@abgov/react-components';
import * as React from 'react';


export default function MicrositeHeader() {
  return (
    <>
      <h1>Microsite Header</h1>
      <h2>Alpha</h2>
      <GoAMicrositeHeader type="alpha"></GoAMicrositeHeader>

      <br />
      <h2>Beta</h2>
      <GoAMicrositeHeader type="beta"></GoAMicrositeHeader>

      <br />
      <h2>Live</h2>
      <GoAMicrositeHeader type="live"></GoAMicrositeHeader>

      <br />
      <h2>Version</h2>
      <GoAMicrositeHeader type="alpha" version="v1.2.3"></GoAMicrositeHeader>

      <br />
      <h2>Feedback Url</h2>
      <GoAMicrositeHeader
        type="alpha"
        version="v1.2.3"
        feedbackUrl="https://example.com/feedback"
      ></GoAMicrositeHeader>
    </>
  );
}
