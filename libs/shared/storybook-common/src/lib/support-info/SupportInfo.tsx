import React from "react";
import { GoACallout } from "@abgov/react-components";

export const SupportInfo = () => {
  return (
    <>
      <h2>Support</h2>
      <GoACallout
        type="information"
        heading="Need help? Connect with us on Slack"
      >
        <a href="https://goa-dio.slack.com/archives/C02PLLT9HQ9">
          #design-system-support
        </a>{" "}
        General information and discussion related to design system including
        questions, new component proposals, contribution, and other requests.
      </GoACallout>
      <h3>Help improve this page</h3>
      To help make sure that this page is useful, relevant, and up to date, you
      can:
      <a href="https://github.com/GovAlta/ui-components/issues/new/choose">
        Create an issue for a proposed update or contribution
      </a>
    </>
  );
};
