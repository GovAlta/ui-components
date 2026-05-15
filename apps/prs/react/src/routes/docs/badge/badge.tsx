import {
  GoabAccordion,
  GoabBadge,
  GoabBlock,
  GoabButton,
  GoabContainer,
  GoabText,
} from "@abgov/react-components";

export function DocsBadgeRoute() {
  return (
    <div>
      <h2>Badge</h2>

      <h3>Basic badge</h3>
      <GoabBadge type="default" content="New" icon={false} />

      <h3>Semantic types</h3>
      <GoabBadge type="information" content="Information" />
      <GoabBadge type="important" content="Important" />
      <GoabBadge type="emergency" content="Emergency" />
      <GoabBadge type="success" content="Success" />
      <GoabBadge type="archived" content="Archived" />

      <h3>Extended colours</h3>
      <GoabBadge type="sky" content="Sky" icon={false} />
      <GoabBadge type="sky" content="Sky" icon={false} emphasis="subtle" />
      <GoabBadge type="prairie" content="Prairie" icon={false} />
      <GoabBadge type="prairie" content="Prairie" icon={false} emphasis="subtle" />
      <GoabBadge type="lilac" content="Lilac" icon={false} />
      <GoabBadge type="lilac" content="Lilac" icon={false} emphasis="subtle" />
      <GoabBadge type="pasture" content="Pasture" icon={false} />
      <GoabBadge type="pasture" content="Pasture" icon={false} emphasis="subtle" />
      <GoabBadge type="sunset" content="Sunset" icon={false} />
      <GoabBadge type="sunset" content="Sunset" icon={false} emphasis="subtle" />
      <GoabBadge type="dawn" content="Dawn" icon={false} />
      <GoabBadge type="dawn" content="Dawn" icon={false} emphasis="subtle" />

      <h3>High emphasis</h3>
      <GoabBadge type="default" content="Default" icon={false} />
      <GoabBadge type="information" content="Information" icon={false} />
      <GoabBadge type="important" content="Important" icon={false} />
      <GoabBadge type="emergency" content="Emergency" icon={false} />
      <GoabBadge type="success" content="Success" icon={false} />
      <GoabBadge type="archived" content="Archived" icon={false} />
      <GoabBadge type="sky" content="Sky" icon={false} />
      <GoabBadge type="prairie" content="Prairie" icon={false} />
      <GoabBadge type="lilac" content="Lilac" icon={false} />
      <GoabBadge type="pasture" content="Pasture" icon={false} />
      <GoabBadge type="sunset" content="Sunset" icon={false} />
      <GoabBadge type="dawn" content="Dawn" icon={false} />

      <h3>Low emphasis</h3>
      <GoabBadge type="default" content="Default" emphasis="subtle" icon={false} />
      <GoabBadge type="information" content="Information" emphasis="subtle" icon={false} />
      <GoabBadge type="important" content="Important" emphasis="subtle" icon={false} />
      <GoabBadge type="emergency" content="Emergency" emphasis="subtle" icon={false} />
      <GoabBadge type="success" content="Success" emphasis="subtle" icon={false} />
      <GoabBadge type="archived" content="Archived" emphasis="subtle" icon={false} />
      <GoabBadge type="sky" content="Sky" emphasis="subtle" icon={false} />
      <GoabBadge type="prairie" content="Prairie" emphasis="subtle" icon={false} />
      <GoabBadge type="lilac" content="Lilac" emphasis="subtle" icon={false} />
      <GoabBadge type="pasture" content="Pasture" emphasis="subtle" icon={false} />
      <GoabBadge type="sunset" content="Sunset" emphasis="subtle" icon={false} />
      <GoabBadge type="dawn" content="Dawn" emphasis="subtle" icon={false} />

      <h3>With custom icon</h3>
      <GoabBadge type="success" content="Approved" iconType="checkmark" />
      <GoabBadge type="emergency" content="Rejected" iconType="close" />
      <GoabBadge type="information" content="Pending" iconType="time" />

      <h3>Sizes</h3>
      <GoabBadge type="default" content="Medium" size="medium" emphasis="subtle" />
      <GoabBadge type="default" content="Large" size="large" emphasis="subtle" />

      <h2>Examples</h2>

      <h3>Card view of case files</h3>
      <style>{`
        .case-file-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: var(--goa-space-m);
        }
      `}</style>
      <GoabContainer mt="l">
        <div className="case-file-row">
          <GoabBlock direction="column" gap="2xs">
            <GoabText size="heading-xs" mt="none" mb="2xs">Fiscal year: 2021/2022</GoabText>
            <GoabText size="body-s" mt="none" mb="none">Submitted: April 23, 2023</GoabText>
          </GoabBlock>
          <GoabBlock direction="row" gap="l" alignment="center">
            <GoabBadge type="default" content="Not started" />
            <GoabButton type="tertiary" size="compact">Start</GoabButton>
          </GoabBlock>
        </div>
      </GoabContainer>
      <GoabContainer>
        <div className="case-file-row">
          <GoabBlock direction="column" gap="2xs">
            <GoabText size="heading-xs" mt="none" mb="2xs">Fiscal year: 2020/2021</GoabText>
            <GoabText size="body-s" mt="none" mb="none">Submitted: April 9, 2022</GoabText>
          </GoabBlock>
          <GoabBlock direction="row" gap="l" alignment="center">
            <GoabBadge type="important" content="Information needed" />
            <GoabButton type="tertiary" size="compact">Edit</GoabButton>
          </GoabBlock>
        </div>
      </GoabContainer>
      <GoabContainer>
        <div className="case-file-row">
          <GoabBlock direction="column" gap="2xs">
            <GoabText size="heading-xs" mt="none" mb="2xs">Fiscal year: 2019/2020</GoabText>
            <GoabText size="body-s" mt="none" mb="none">Submitted: April 14, 2021</GoabText>
          </GoabBlock>
          <GoabBlock direction="row" gap="l" alignment="center">
            <GoabBadge type="success" content="Approved" />
            <GoabButton type="tertiary" size="compact">View</GoabButton>
          </GoabBlock>
        </div>
      </GoabContainer>

      <h3>Expand or collapse part of a form</h3>
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
      <GoabText tag="h3" mt="none" mb="m">Review your application</GoabText>
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

      <h3>Show multiple tags together</h3>
      <GoabBlock gap="xs">
        <GoabBadge type="information" content="In progress" />
        <GoabBadge type="important" content="Priority" />
        <GoabBadge type="emergency" content="Past deadline" />
      </GoabBlock>

      <h3>Show status on a card</h3>
      <GoabContainer
        type="non-interactive"
        accent="thick"
        heading="Heading"
        actions={<GoabBadge type="important" content="Priority" />}
      >
        Content
      </GoabContainer>
    </div>
  );
}
