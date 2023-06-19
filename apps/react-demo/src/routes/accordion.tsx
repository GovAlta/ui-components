import {
  GoAAccordion,
  GoABadge,
  GoABlock,
  GoAContainer,
  GoAGrid,
} from "@abgov/react-components";
import * as React from "react";

export default function Accordion() {
  return (
    <>
      <GoAAccordion
        heading="This is a heading"
        secondaryText="Secondary Text"
        headingContent={<GoABadge type="success" content="Success" />}
      >
        <a href="#">Some link</a>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus dolore
        placeat aperiam officiis, sit corporis nulla dolorem non vero ex nobis
        aliquam cumque amet asperiores. Vitae amet ullam quas nemo?
      </GoAAccordion>
      <GoAAccordion heading="This is a heading" secondaryText="Secondary Text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
        repudiandae ab error exercitationem vero tempora animi odio! Quibusdam
        voluptas laudantium ullam ipsum, fugiat nobis possimus. Cum eum ipsum
        odio ex.
      </GoAAccordion>

      <GoAAccordion
        heading="This is a heading"
        secondaryText="Secondary Text"
        headingContent={
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <GoABadge type="success" content="Success" />
          </div>
        }
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        harum aliquid officia provident recusandae facilis dolor minus magnam
        commodi, nesciunt maxime quas aut exercitationem optio modi. Ratione
        commodi maiores aspernatur?
      </GoAAccordion>
      <GoAAccordion heading="Just a large heading" headingSize="medium">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis,
        similique aut nisi accusamus odio est facere odit dolor sed reiciendis
        quas nostrum dicta quo voluptates, sint illo consectetur laudantium
        blanditiis!
      </GoAAccordion>
      <GoAAccordion
        heading="This is a heading"
        secondaryText="Secondary Text"
        headingContent={
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <GoABlock>
              <GoABadge type="success" content="Success" />
              <GoABadge type="emergency" content="Error" />
            </GoABlock>
          </div>
        }
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
        harum aliquid officia provident recusandae facilis dolor minus magnam
        commodi, nesciunt maxime quas aut exercitationem optio modi. Ratione
        commodi maiores aspernatur?
      </GoAAccordion>
      <GoAAccordion
        heading="Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde saepe mollitia quo temporibus tempora quos in, perferendis incidunt ex reiciendis praesentium beatae soluta, impedit enim culpa eum quis animi quas!"
        secondaryText="Secondary Text"
        headingContent={
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <GoABlock>
              <GoABadge type="success" content="Success" />
              <GoABadge type="emergency" content="Error" />
            </GoABlock>
          </div>
        }
        open
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
        repudiandae ab error exercitationem vero tempora animi odio! Quibusdam
        voluptas laudantium ullam ipsum, fugiat nobis possimus. Cum eum ipsum
        odio ex.
      </GoAAccordion>
    </>
  );
}
