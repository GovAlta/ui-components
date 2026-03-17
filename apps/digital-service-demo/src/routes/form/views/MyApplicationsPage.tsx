import { useState } from "react";
import {
  GoabxButton,
  GoabxBadge,
  GoabxModal,
} from "@abgov/react-components/experimental";
import { GoabButtonGroup, GoabText } from "@abgov/react-components";
import { Application, ApplicationStatus } from "../types";
import emptyStateSrc from "../assets/empty-state.svg";

type MyApplicationsPageProps = {
  applications: Application[];
  onNewApplication: () => void;
  onResumeApplication: (id: string) => void;
  onDeleteApplication: (id: string) => void;
};

function StatusBadge({ status }: { status: ApplicationStatus }) {
  switch (status) {
    case "not-started":
      return <GoabxBadge type="information" emphasis="subtle" content="Not started" />;
    case "in-progress":
      return <GoabxBadge type="important" emphasis="subtle" content="In progress" />;
    case "submitted":
      return <GoabxBadge type="success" emphasis="subtle" content="Submitted" />;
  }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getActionButtonText(status: ApplicationStatus): string {
  switch (status) {
    case "not-started":
      return "Start";
    case "in-progress":
      return "Continue";
    case "submitted":
      return "View";
  }
}

function getActionButtonType(status: ApplicationStatus): "secondary" | "tertiary" {
  return status === "submitted" ? "tertiary" : "secondary";
}

export function MyApplicationsPage({
  applications,
  onNewApplication,
  onResumeApplication,
  onDeleteApplication,
}: MyApplicationsPageProps) {
  const [deleteModalApp, setDeleteModalApp] = useState<Application | null>(null);

  const handleDeleteClick = (app: Application) => {
    setDeleteModalApp(app);
  };

  const handleDeleteConfirm = () => {
    if (deleteModalApp) {
      onDeleteApplication(deleteModalApp.id);
      setDeleteModalApp(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalApp(null);
  };

  return (
    <div className="form-set">
      {/* Heading row with "+ New application" on right */}
      <div
        className="btn-auto-width"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginTop: "var(--goa-space-2xl)",
        }}
      >
        <GoabText tag="h1" size="heading-l" mt="none" mb="none">
          My applications
        </GoabText>
        {/* TODO: Future enhancement - add "text" button type that looks like a link */}
        <GoabxButton type="tertiary" size="compact" onClick={onNewApplication}>
          + New application
        </GoabxButton>
      </div>

      {/* Subtext */}
      <GoabText tag="p" size="body-m" mt="m" mb="xl">
        You may have up to 5 active applications. Be aware files must be activated within
        6 months or else they will expire.
      </GoabText>

      {/* Application cards */}
      {applications.length === 0 ? (
        <div
          className="btn-auto-width"
          style={{
            border: "1px solid var(--goa-color-greyscale-200)",
            borderRadius: "12px",
            padding: "var(--goa-space-3xl) var(--goa-space-xl)",
            backgroundColor: "var(--app-card-bg, var(--goa-color-greyscale-white))",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--goa-space-l)",
          }}
        >
          <img
            src={emptyStateSrc}
            alt="Empty folder"
            style={{ width: "100px", height: "78px" }}
          />

          <GoabText as="p" size="heading-2xs" mt="none" mb="none">
            You don't have any applications yet
          </GoabText>

          <GoabxButton
            type="tertiary"
            size="compact"
            leadingIcon="add"
            onClick={onNewApplication}
          >
            Start a new Application
          </GoabxButton>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--goa-space-l)",
          }}
        >
          {applications.map((app) => (
            <div
              key={app.id}
              className="btn-auto-width"
              style={{
                border: "1px solid var(--goa-color-greyscale-200)",
                borderRadius: "12px",
                padding:
                  "var(--goa-space-xs) var(--goa-space-l) var(--goa-space-l) var(--goa-space-l)",
                backgroundColor: "var(--app-card-bg, var(--goa-color-greyscale-white))",
                boxShadow: "var(--goa-shadow-100)",
              }}
            >
              {/* Top row: Reference ID + Actions */}
              <div
                className="app-card__header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "var(--goa-space-l)",
                }}
              >
                <GoabText tag="span" size="heading-xs" mt="none" mb="none">
                  {app.referenceId}
                </GoabText>

                <GoabButtonGroup alignment="end">
                  <GoabxButton
                    type={getActionButtonType(app.status)}
                    size="compact"
                    onClick={() => onResumeApplication(app.id)}
                  >
                    {getActionButtonText(app.status)}
                  </GoabxButton>
                  <GoabxButton
                    type="tertiary"
                    size="compact"
                    leadingIcon="trash"
                    onClick={() => handleDeleteClick(app)}
                  >
                    Delete
                  </GoabxButton>
                </GoabButtonGroup>
              </div>

              {/* Bottom row: 3-column metadata */}
              <div
                className="app-card__metadata"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "var(--goa-space-l)",
                }}
              >
                {/* Status */}
                <div>
                  <GoabText tag="div" size="body-m" mt="none" mb="xs">
                    <strong>Status</strong>
                  </GoabText>
                  <StatusBadge status={app.status} />
                </div>

                {/* Last updated */}
                <div>
                  <GoabText tag="div" size="body-m" mt="none" mb="xs">
                    <strong>Last updated</strong>
                  </GoabText>
                  <GoabText tag="div" size="body-s" mt="none" mb="none">
                    {formatDate(app.updatedAt)}
                  </GoabText>
                </div>

                {/* Created */}
                <div>
                  <GoabText tag="div" size="body-m" mt="none" mb="xs">
                    <strong>Created</strong>
                  </GoabText>
                  <GoabText tag="div" size="body-s" mt="none" mb="none">
                    {formatDate(app.createdAt)}
                  </GoabText>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete confirmation modal */}
      <GoabxModal
        open={deleteModalApp !== null}
        heading="Are you sure you want to delete this application?"
        calloutVariant="emergency"
        actions={
          <GoabButtonGroup alignment="end">
            <GoabxButton type="tertiary" size="compact" onClick={handleDeleteCancel}>
              Cancel
            </GoabxButton>
            <GoabxButton
              type="primary"
              size="compact"
              variant="destructive"
              onClick={handleDeleteConfirm}
            >
              Delete application
            </GoabxButton>
          </GoabButtonGroup>
        }
        onClose={handleDeleteCancel}
      >
        You are about to delete the application{" "}
        <strong>{deleteModalApp?.referenceId}</strong>. This cannot be undone.
      </GoabxModal>
    </div>
  );
}
