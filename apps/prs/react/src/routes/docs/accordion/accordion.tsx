import { useState, useEffect } from "react";
import { GoabAccordion, GoabText, GoabBadge, GoabButton } from "@abgov/react-components";
import "./accordion.css";

export function DocsAccordionRoute() {
  const [expandedAll, setExpandedAll] = useState<boolean>(false);
  const [expandedList, setExpandedList] = useState<number[]>([]);

  useEffect(() => {
    setExpandedAll(expandedList.length === 4);
  }, [expandedList.length]);

  const expandOrCollapseAll = () => {
    setExpandedAll((prev) => {
      const newState = !prev;
      setExpandedList(newState ? [1, 2, 3, 4] : []);
      return newState;
    });
  };

  const updateAccordion = (order: number, isOpen: boolean) => {
    setExpandedList((prev) => {
      if (isOpen) {
        return prev.includes(order) ? prev : [...prev, order];
      }
      return prev.filter((item) => item !== order);
    });
  };

  return (
    <div>
      <h2>Accordion</h2>

      <h3>Basic</h3>
      <GoabAccordion heading="What documents do I need?">
        You will need to provide proof of identity, proof of address,
        and any relevant supporting documentation.
      </GoabAccordion>

      <h3>Open by default</h3>
      <GoabAccordion heading="Important information" open>
        This content is visible by default when the page loads.
      </GoabAccordion>

      <h3>With secondary text</h3>
      <GoabAccordion heading="Application requirements" secondaryText="Updated Jan 2024">
        Review the latest requirements before submitting your application.
      </GoabAccordion>

      <h3>Heading sizes</h3>
      <GoabAccordion heading="Small heading" headingSize="small">
        Content with small heading.
      </GoabAccordion>
      <GoabAccordion heading="Medium heading" headingSize="medium">
        Content with medium heading.
      </GoabAccordion>

      <h3>Icon position</h3>
      <GoabAccordion heading="Icon on left (default)" iconPosition="left">
        The expand/collapse icon is on the left.
      </GoabAccordion>
      <GoabAccordion heading="Icon on right" iconPosition="right">
        The expand/collapse icon is on the right.
      </GoabAccordion>

      <h3>Multiple accordions</h3>
      <GoabAccordion heading="How do I apply?">
        Submit your application online through our portal.
      </GoabAccordion>
      <GoabAccordion heading="What are the eligibility requirements?">
        You must be an Alberta resident and meet the program criteria.
      </GoabAccordion>
      <GoabAccordion heading="How long does processing take?">
        Applications are typically processed within 10 business days.
      </GoabAccordion>

      <h2>Examples</h2>

      <h3>Expand or collapse part of a form</h3>
      <GoabText as="h3" mt="none" mb="m">Review your application</GoabText>

      <GoabAccordion
        heading="Referral details"
        headingContent={<GoabBadge type="important" content="Updated" />}>
        <dl className="accordion-example">
          <dt>Date of referral</dt>
          <dd>January 27, 2021</dd>
          <dt>Work safety concerns</dt>
          <dd>None</dd>
          <dt>Type of referral</dt>
          <dd>Word of mouth, internet search</dd>
          <dt>Intake received from another site</dt>
          <dd>Yes</dd>
        </dl>
      </GoabAccordion>

      <GoabAccordion heading="Contact information">
        <dl className="accordion-example">
          <dt>Name</dt>
          <dd>Joan Smith</dd>
          <dt>Contact preference</dt>
          <dd>Text message</dd>
        </dl>
      </GoabAccordion>

      <h3>Hide and show many sections of information</h3>
      <GoabButton type="tertiary" size="compact" mb="m" onClick={() => expandOrCollapseAll()}>
        {expandedAll ? "Hide all sections" : "Show all sections"}
      </GoabButton>

      <GoabAccordion
        open={expandedList.includes(1)}
        heading="How do I create an account?"
        headingSize="medium"
        onChange={(open) => updateAccordion(1, open)}
      >
        To create an account you will need to contact your office admin.
      </GoabAccordion>

      <GoabAccordion
        open={expandedList.includes(2)}
        heading="What verification is needed to sign documents digitally?"
        headingSize="medium"
        onChange={(open) => updateAccordion(2, open)}
      >
        You will need to verify your identity through our two factor
        authentication in addition to the digital signature.
      </GoabAccordion>

      <GoabAccordion
        open={expandedList.includes(3)}
        heading="Can I track the status of my service requests online?"
        headingSize="medium"
        onChange={(open) => updateAccordion(3, open)}
      >
        Yes, you can see the status of your application on the main service
        dashboard when you login. You will receive updates and notifications in
        your email as your request progresses.
      </GoabAccordion>

      <GoabAccordion
        open={expandedList.includes(4)}
        heading="Are there accessibility features for people with disabilities?"
        headingSize="medium"
        onChange={(open) => updateAccordion(4, open)}
      >
        Yes, our digital service is designed with accessibility in mind.{" "}
        <a href="#">More information on accessibility.</a>
      </GoabAccordion>
    </div>
  );
}

export default DocsAccordionRoute;
