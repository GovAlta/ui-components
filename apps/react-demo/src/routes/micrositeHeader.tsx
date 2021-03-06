import { GoAMicrositeHeader } from '@abgov/react-components';
import * as React from 'react';


export default function MicrositeHeader() {
  return (
    <>
      <h3>Alpha</h3>
      <GoAMicrositeHeader level="alpha" version="v1.2.3"></GoAMicrositeHeader>

      <br />
      <h3>Beta</h3>
      <GoAMicrositeHeader level="beta"></GoAMicrositeHeader>

      <br />
      <h3>Live</h3>
      <GoAMicrositeHeader level="live"></GoAMicrositeHeader>

      <br />
      <h3>Version</h3>
      <GoAMicrositeHeader level="alpha" version="v1.2.3"></GoAMicrositeHeader>

      <br />
      <h3>Feedback Url</h3>
      <GoAMicrositeHeader
        level="alpha"
        version="v1.2.3"
        feedbackUrl="https://example.com/feedback"
      ></GoAMicrositeHeader>
    </>
  );
}
