import { GoACallout } from '@abgov/react-components';
import * as React from 'react';

export default function Callout() {
  return (
    <>
      <h1>Callout</h1>
      <h2>Emergency</h2>
      <GoACallout type="emergency" heading="Emergency callout">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <br />
      <h2>Important</h2>
      <GoACallout type="important" heading="Important callout">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <br />
      <h2>Information</h2>
      <GoACallout type="information" heading="Information callout">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <br />
      <h2>Success</h2>
      <GoACallout type="success" heading="Success callout">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <br />
      <h2>Events</h2>
      <GoACallout type="event" heading="Event callout">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <br />
      <h2>Emergency</h2>
      <GoACallout type="emergency" >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <br />
      <h2>Important</h2>
      <GoACallout type="important" >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <br />
      <h2>Information</h2>
      <GoACallout type="information" >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <br />
      <h2>Success</h2>
      <GoACallout type="success" >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <br />
      <h2>Events</h2>
      <GoACallout type="event" >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>
    </>
  );
}

