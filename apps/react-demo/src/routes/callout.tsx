import { GoACallout } from '@abgov/react-components';
import * as React from 'react';

export default function Callout() {
  return (
    <>
      <h3>Emergency</h3>
      <GoACallout type="emergency" heading="Emergency callout">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <br />
      <h3>Important</h3>
      <GoACallout type="important" heading="Important callout">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <br />
      <h3>Information</h3>
      <GoACallout type="information" heading="Information callout">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <br />
      <h3>Success</h3>
      <GoACallout type="success" heading="Success callout">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <br />
      <h3>Events</h3>
      <GoACallout type="event" heading="Event callout">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>
    </>
  );
}

