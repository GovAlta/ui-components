import React from "react";
import { GoabTooltip, GoabCallout, GoabText } from "@abgov/react-components";

export function Bug3323Route() {
  return (
    <main>
      <GoabText tag="h1">Bug 3323 - Tooltip cut off</GoabText>
      <GoabText tag="p">
        This is to test a fairly simple CSS fix for the Callout component. Right now,
        nothing can go past the borders of the Callout from inside the component. This
        includes things like Tooltip. So for the below test, the expected result is that
        the Tooltip shows up beyond the borders of the Callout.
      </GoabText>
      <GoabCallout type="important">
        <p>
          Section 14 of the
          <GoabTooltip content="This is a tooltip content">
            <a target="_blank" href="#">
              <em>Public Trustee Act</em>
            </a>
          </GoabTooltip>
          states that where a person
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi viverra rutrum
          accumsan. Cras efficitur et velit ac pellentesque. Duis sodales quis eros at
          sollicitudin. Praesent accumsan, mi nec eleifend tempor, turpis leo porttitor
          odio, at consectetur ligula eros a turpis. Sed volutpat nunc a sem porta, sit
          amet commodo mi ullamcorper. Praesent et bibendum ex, a dignissim ligula.
          Aliquam id molestie sem. Duis lacus ipsum, maximus efficitur felis et,
          condimentum feugiat diam. Vivamus a nibh lobortis justo faucibus placerat et at
          ipsum. Sed nec accumsan erat, vitae gravida massa. Vestibulum id elit eget magna
          lacinia maximus. Morbi sed efficitur magna. Pellentesque at interdum nisi.
        </p>
      </GoabCallout>
    </main>
  );
}
