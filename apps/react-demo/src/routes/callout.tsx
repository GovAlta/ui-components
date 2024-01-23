import { GoACallout } from "@abgov/react-components";
import * as React from "react";

export default function Callout() {
  return (
    <>
      <h1>Callout</h1>
      <h2>Emergency</h2>
      <GoACallout type="emergency" heading="Emergency callout" testId="EmergencyCallout">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <br />
      <h2>Important</h2>
      <GoACallout type="important" heading="Important callout" testId="ImportantCallout">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <br />
      <h2>Information</h2>
      <GoACallout type="information" heading="Information callout" testId="InformationCallout">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <br />
      <h2>Success</h2>
      <GoACallout type="success" heading="Success callout" testId="SuccessCallout">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <br />
      <h2>Events</h2>
      <GoACallout type="event" heading="Event callout" testId="EventsCallout">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <br />
      <h2>Emergency</h2>
      <GoACallout type="emergency">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <br />
      <h2>Important</h2>
      <GoACallout type="important">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <br />
      <h2>Information</h2>
      <GoACallout type="information">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <br />
      <h2>Success</h2>
      <GoACallout type="success">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <br />
      <h2>Events</h2>
      <GoACallout type="event">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <br />
      <h2>Margin Spacing</h2>
      <GoACallout
        mt="m"
        mb="xs"
        ml="xl"
        mr="2xl"
        type="emergency"
        heading="Emergency callout"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <h2>Medium Callouts</h2>
      <GoACallout type="information" size="medium" heading="Small Callout" testId="InformationMediumCallout">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <GoACallout type="emergency" size="medium" heading="Small Callout" testId="EmergencyMediumCallout">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <GoACallout type="important" size="medium" heading="Small Callout" testId="ImportantMediumCallout">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <GoACallout type="success" size="medium" heading="Small Callout" testId="SuccessMediumCallout">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>

      <GoACallout type="event" size="medium" heading="Small Callout" testId="EventsMediumCallout">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </GoACallout>
    </>
  );
}
