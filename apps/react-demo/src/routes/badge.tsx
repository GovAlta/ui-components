import { GoABadge, GoAInfoBadge } from "@abgov/react-components";
import * as React from "react";

export default function Badge() {
  return (
    <>
      <h1>Badges</h1>
      <h2>Important</h2>
      <GoABadge testId="importantIconTextBadge" type="important" content="Important" icon={true}></GoABadge>
      <GoABadge testId="importantTextBadge" type="important" content="Important"></GoABadge>
      <GoABadge testId="importantIconBadge" type="important" icon={true}></GoABadge>

      <h2>Success</h2>
      <GoABadge testId="successIconTextBadge" type="success" content="Success" icon={true}></GoABadge>
      <GoABadge testId="successTextBadge" type="success" content="Success"></GoABadge>
      <GoABadge testId="successIconBadge" type="success" icon={true}></GoABadge>

      <h2>Information</h2>
      <GoABadge testId="InformationIconTextBadge" type="information" content="Information" icon={true}></GoABadge>
      <GoABadge testId="InformationTextBadge" type="information" content="Information"></GoABadge>
      <GoABadge testId="InformationIconBadge" type="information" icon={true}></GoABadge>

      <h2>Emergency</h2>
      <GoABadge testId="emergencyIconTextBadge" type="emergency" content="Emergency" icon={true}></GoABadge>
      <GoABadge testId="emergencyTextBadge" type="emergency" content="Emergency"></GoABadge>
      <GoABadge testId="emergencyIconBadge" type="emergency" icon={true}></GoABadge>

      <h2>Dark</h2>
      <GoABadge testId="darkIconTextBadge" type="dark" content="Dark" icon={true}></GoABadge>
      <GoABadge testId="darkTextBadge" type="dark" content="Dark"></GoABadge>
      <GoABadge testId="darkIconBadge" type="dark" icon={true}></GoABadge>

      <h2>Midtone</h2>
      <GoABadge testId="midtoneIconTextBadge" type="midtone" content="Midtone" icon={true}></GoABadge>
      <GoABadge testId="midtoneTextBadge" type="midtone" content="Midtone"></GoABadge>
      <GoABadge testId="midtoneIconBadge" type="midtone" icon={true}></GoABadge>

      <h2>Light</h2>
      <GoABadge testId="lightIconTextBadge" type="light" content="Light" icon={true}></GoABadge>
      <GoABadge testId="lightTextBadge" type="light" content="Light"></GoABadge>
      <GoABadge testId="lightIconBadge" type="light" icon={true}></GoABadge>

      <h2>Margin Spacing</h2>
      <GoABadge
        mt="m"
        mb="xs"
        ml="xl"
        mr="2xl"
        type="important"
        content="Important"
        icon={true}
      ></GoABadge>
    </>
  );
}
