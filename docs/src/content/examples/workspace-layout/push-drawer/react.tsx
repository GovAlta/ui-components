import { useState } from "react";
import {
  GoabAccordion,
  GoabBadge,
  GoabButton,
  GoabButtonGroup,
  GoabFormItem,
  GoabPushDrawer,
  GoabRadioGroup,
  GoabRadioItem,
  GoabTextArea,
  GoabWorkSideMenu,
  GoabWorkSideMenuGroup,
  GoabWorkSideMenuItem,
  GoabWorkspaceLayout,
} from "@abgov/react-components";

type Decision = "approve" | "deny" | "more-info";

export function WorkspaceLayoutPushDrawerExample() {
  const [open, setOpen] = useState(true);
  const [decision, setDecision] = useState<Decision>("deny");
  const [reason, setReason] = useState("");

  const drawer = (
    <GoabPushDrawer
      heading="Review application"
      open={open}
      width="420px"
      onClose={() => setOpen(false)}
      actions={
        <GoabButtonGroup alignment="end">
          <GoabButton type="tertiary" size="compact" onClick={() => setOpen(false)}>
            Cancel
          </GoabButton>
          <GoabButton
            type="primary"
            size="compact"
            disabled={decision === "deny" && reason.trim().length === 0}
            onClick={() => setOpen(false)}
          >
            {decision === "approve"
              ? "Approve"
              : decision === "deny"
                ? "Deny"
                : "Send request"}
          </GoabButton>
        </GoabButtonGroup>
      }
    >
      <GoabFormItem label="Decision">
        <GoabRadioGroup
          name="decision"
          value={decision}
          onChange={(e) => setDecision(e.value as Decision)}
        >
          <GoabRadioItem value="approve" label="Approve" />
          <GoabRadioItem value="deny" label="Deny" />
          <GoabRadioItem value="more-info" label="Request more information" />
        </GoabRadioGroup>
      </GoabFormItem>

      {decision === "deny" && (
        <GoabFormItem
          mt="l"
          label="Reason for denial"
          requirement="required"
        >
          <GoabTextArea
            name="reason"
            placeholder="Explain why this application is being denied..."
            value={reason}
            onChange={(e) => setReason(e.value)}
          />
        </GoabFormItem>
      )}
    </GoabPushDrawer>
  );

  return (
    <GoabWorkspaceLayout
      sideMenu={
        <GoabWorkSideMenu
          heading="Workspace"
          url="/"
          open={true}
          primaryContent={
            <GoabWorkSideMenuGroup icon="grid" heading="Work">
              <GoabWorkSideMenuItem icon="document" label="Cases" url="/cases" />
              <GoabWorkSideMenuItem
                icon="folder"
                label="Documents"
                url="/documents"
              />
              <GoabWorkSideMenuItem
                icon="bar-chart"
                label="Reports"
                url="/reports"
              />
            </GoabWorkSideMenuGroup>
          }
        />
      }
      pageHeader={
        <div className="page-header">
          <div className="page-header__title-row">
            <h1 className="page-header__title">Emily Thompson</h1>
            <GoabBadge type="important" content="Under Review" />
            <span className="page-header__case-id">SE-332983</span>
          </div>
          {!open && (
            <GoabButton
              type="secondary"
              size="compact"
              onClick={() => setOpen(true)}
            >
              Review application
            </GoabButton>
          )}
        </div>
      }
      pageFooter={
        <div className="page-footer">
          Last updated 2 minutes ago · Assigned to Edna Mode
        </div>
      }
      pushDrawer={drawer}
    >
      <div className="content">
        <section className="case-section">
          <h2 className="case-section__heading">1. Verify your eligibility</h2>
          <GoabAccordion
            heading="Verify your age"
            headingContent={<GoabBadge type="success" content="Complete" />}
          >
            <p>
              Applicant's date of birth confirmed against the supporting document
              uploaded on file.
            </p>
          </GoabAccordion>
          <GoabAccordion
            heading="Your situation"
            headingContent={<GoabBadge type="success" content="Complete" />}
          >
            <p>
              Applicant has confirmed their current living situation and household
              composition.
            </p>
          </GoabAccordion>
        </section>

        <section className="case-section">
          <h2 className="case-section__heading">2. Your application</h2>
          <GoabAccordion
            heading="Personal information"
            headingContent={<GoabBadge type="success" content="Complete" />}
          >
            <p>Full name, contact details, and mailing address are on file.</p>
          </GoabAccordion>
        </section>

        <section className="case-section">
          <h2 className="case-section__heading">3. Important documents</h2>
          <GoabAccordion
            heading="Upload identification"
            headingContent={<GoabBadge type="success" content="Complete" />}
          >
            <p>Government-issued ID uploaded and verified by the applicant.</p>
          </GoabAccordion>
        </section>
      </div>

      <style>{`
        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--goa-space-m);
          padding: var(--goa-space-m) var(--goa-space-l);
          background: var(--goa-color-greyscale-white);
        }
        .page-header__title-row {
          display: flex;
          align-items: center;
          gap: var(--goa-space-m);
        }
        .page-header__title {
          margin: 0;
          font-size: var(--goa-font-size-5);
        }
        .page-header__case-id {
          color: var(--goa-color-text-secondary);
          font-size: var(--goa-font-size-3);
        }
        .page-footer {
          padding: var(--goa-space-m) var(--goa-space-l);
          color: var(--goa-color-text-secondary);
          font-size: var(--goa-font-size-2);
        }
        .content {
          padding: var(--goa-space-l) var(--goa-space-xl);
        }
        .case-section {
          margin-bottom: var(--goa-space-xl);
        }
        .case-section__heading {
          font-size: var(--goa-font-size-4);
          margin: 0 0 var(--goa-space-m);
        }
      `}</style>
    </GoabWorkspaceLayout>
  );
}
