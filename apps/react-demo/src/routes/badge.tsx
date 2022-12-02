import { GoABadge, GoAInfoBadge } from "@abgov/react-components";
import * as React from "react";

export default function Badge() {
  return (
    <>
      <h1>Badges</h1>
      <h2>Important</h2>
      <GoABadge type="important" content="Important" icon={true}></GoABadge>
      <GoABadge type="important" content="Important"></GoABadge>
      <GoABadge type="important" icon={true}></GoABadge>

      <h2>Success</h2>
      <GoABadge type="success" content="Success" icon={true}></GoABadge>
      <GoABadge type="success" content="Success"></GoABadge>
      <GoABadge type="success" icon={true}></GoABadge>

      <h2>Information</h2>
      <GoABadge type="information" icon={true}></GoABadge>
      <GoABadge type="information" content="Information"></GoABadge>
      <GoABadge type="information" icon={true}></GoABadge>

      <h2>Emergency</h2>
      <GoABadge type="emergency" content="Emergency" icon={true}></GoABadge>
      <GoABadge type="emergency" content="Emergency"></GoABadge>
      <GoABadge type="emergency" icon={true}></GoABadge>

      <h2>Dark</h2>
      <GoABadge type="dark" content="Dark" icon={true}></GoABadge>
      <GoABadge type="dark" content="Dark"></GoABadge>
      <GoABadge type="dark" icon={true}></GoABadge>

      <h2>Midtone</h2>
      <GoABadge type="midtone" content="Midtone" icon={true}></GoABadge>
      <GoABadge type="midtone" content="Midtone"></GoABadge>
      <GoABadge type="midtone" icon={true}></GoABadge>

      <h2>Light</h2>
      <GoABadge type="light" content="Light" icon={true}></GoABadge>
      <GoABadge type="light" content="Light"></GoABadge>
      <GoABadge type="light" icon={true}></GoABadge>

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
