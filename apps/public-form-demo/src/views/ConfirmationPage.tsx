import { GoabxButton, GoabxCallout } from "@abgov/react-components/experimental";
import { BackLink } from "../components";

type ConfirmationPageProps = {
  onConfirm: () => void;
  onBack: () => void;
};

export function ConfirmationPage({ onConfirm, onBack }: ConfirmationPageProps) {
  return (
    <div className="form-set">
        <div style={{ marginBottom: "var(--goa-space-l)" }}>
          <BackLink onClick={onBack}>
            Back to task list
          </BackLink>
        </div>

        <h1>Confirm and submit</h1>

        <GoabxCallout type="information" heading="Coming in Phase 4">
          This page will include:
          <ul>
            <li>High-level summary of application</li>
            <li>Declaration checkbox</li>
            <li>Final submit button</li>
          </ul>
        </GoabxCallout>

        <div style={{ marginTop: "var(--goa-space-xl)" }}>
          <GoabxButton onClick={onConfirm}>Submit application</GoabxButton>
        </div>
      </div>
  );
}
