import React from "react";
import { GoabButton, GoabText, GoabDivider } from "@abgov/react-components";

export function Bug2314Route() {
  return (
    <main>
      <GoabText tag="h1" size="heading-l" mb="m">
        Button: Mobile width
      </GoabText>

      <GoabText tag="p">
        The width of the Button component was controllable on desktop (ie. the width
        property was respected). But on mobile, it defaulted to and only used
        width="100%", despite any width being set.
      </GoabText>

      <GoabText tag="p">
        This fix should see the width property respected on mobile as well as desktop.
        Default width for mobile will stay as 100%.
      </GoabText>

      <GoabDivider></GoabDivider>

      <GoabText tag="h2">Default (no width set)</GoabText>
      <GoabButton>Default button</GoabButton>

      <GoabText tag="h2">Width set to 50%</GoabText>
      <GoabButton width="50%">50% Button</GoabButton>

      <GoabText tag="h2">Width set to 100px</GoabText>
      <GoabButton width="100px">100px Button</GoabButton>
    </main>
  );
}
