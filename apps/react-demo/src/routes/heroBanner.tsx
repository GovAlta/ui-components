import { GoAButton, GoAButtonGroup, GoAHeroBanner } from '@abgov/react-components';
import * as React from 'react';

export default function HeroBanner() {
  return (
    <>
      <h3>Default</h3>
      <GoAHeroBanner
        heading="Hero Banner"
        backgroundUrl="https://i.picsum.photos/id/1076/600/400.jpg?hmac=iLAZWoEDYRRPGnsbx7aWOGf-olRn3R5eOLDgH_IfXRw"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur optio,
        eius expedita, quasi vero maxime, laudantium voluptates eaque illum officiis
        hic!
      </GoAHeroBanner>

      <br />
      <h3>With Actions</h3>
      <GoAHeroBanner
        heading="Hero Banner"
        backgroundUrl="https://i.picsum.photos/id/1076/600/400.jpg?hmac=iLAZWoEDYRRPGnsbx7aWOGf-olRn3R5eOLDgH_IfXRw"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur optio,
        eius expedita, quasi vero maxime, laudantium voluptates eaque illum officiis
        hic!
        <div slot="actions">
          <GoAButtonGroup alignment='start'>
            <GoAButton onClick={() => void 0}>Action</GoAButton>
            <GoAButton onClick={() => void 0} type="secondary">Other Action</GoAButton>
          </GoAButtonGroup>
        </div>
      </GoAHeroBanner>
    </>
  );
}
