import { GoAContainer, GoAGrid, GoABadge } from "@abgov/react-components";
import * as React from "react";

export default function Container() {
  return (
    <div>
      <h1>Container here</h1>
      <GoAGrid minChildWidth="200px">
        <GoAContainer>
          <h2>Interactive container</h2>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo
          consequuntur itaque ab et sed. Ipsum ab recusandae eaque, minima
          voluptatibus expedita consequatur voluptas corporis placeat quas.
          Beatae perferendis dolorum consequuntur? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Velit aperiam voluptatum iste eum,
          repellat, amet sint, in animi similique excepturi enim fugit eligendi
          reiciendis facilis ratione optio totam ipsam aspernatur! Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Facilis architecto vitae
          ducimus a et optio nostrum, debitis error laboriosam est nulla
          dignissimos dolorum. Tempora, reiciendis possimus dolorum iste aliquam
          minus!
        </GoAContainer>
        <GoAContainer type="non-interactive">
          <h2>Non-Interactive container</h2>
          <GoABadge type="emergency" content="GoABadge"></GoABadge>
          <GoABadge type="emergency" content="GoABadge"></GoABadge>
        </GoAContainer>
      </GoAGrid>
      <GoAGrid minChildWidth="200px">
        <GoAContainer type="info">
          <h2>Info Container</h2>
          Content
        </GoAContainer>
        <GoAContainer type="error">
          <h2>Error Container</h2>
          Content
        </GoAContainer>
      </GoAGrid>
      <GoAGrid minChildWidth="200px">
        <GoAContainer type="success">
          <h2>Success Container</h2>
          Content
        </GoAContainer>
        <GoAContainer type="important">
          <h2>Important Container</h2>
          Content
        </GoAContainer>
      </GoAGrid>
      <GoAContainer accent="thin" type="interactive">
        <h2>Interactive Container w/ Header</h2>
        If you use an accent, the background colour won't be filled in
      </GoAContainer>
    </div>
  );
}
