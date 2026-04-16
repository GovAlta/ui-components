import {
  GoabAccordion,
  GoabBadge,
  GoabText,
} from "@abgov/react-components";

export function ExpandOrCollapsePartOfAForm() {
  return (
    <>
      <style>{`
        dl.accordion-example {
          margin: 0 0;
        }
        .accordion-example dt {
          color: var(--goa-color-text-default);
          font: var(--goa-typography-heading-s);
          margin-bottom: var(--goa-space-xs);
        }
        .accordion-example dd {
          margin: 0 0 var(--goa-space-l);
          font: var(--goa-typography-body-m);
        }
        .accordion-example dd:last-of-type {
          margin-bottom: 0;
        }
      `}</style>

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
    </>
  );
}
