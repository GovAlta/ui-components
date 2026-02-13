import {
  GoabxButton,
  GoabxCallout,
  GoabxBadge,
} from "@abgov/react-components/experimental";
import { GoabButtonGroup, GoabText } from "@abgov/react-components";
import illustrationSrc from "../assets/person-using-computer.svg";

type StartPageProps = {
  onStartNew: () => void;
  onContinue: () => void;
};

export function StartPage({ onStartNew, onContinue }: StartPageProps) {
  return (
    <div className="form-set">
      <GoabText tag="h1" size="heading-xl" mt="2xl" mb="l">
        Apply for a service
      </GoabText>
      <GoabText tag="p" size="body-m" mt="none" mb="none">
        Apply for supports to pay for basic expenses like food, clothing and
        shelter.
      </GoabText>

      <img
        src={illustrationSrc}
        alt="Person using a computer to apply for services"
        style={{
          width: "100%",
          maxWidth: "672px",
          height: "auto",
          marginTop: "var(--goa-space-xl)",
          marginBottom: "var(--goa-space-xl)",
        }}
      />

      <GoabxCallout heading="You can use this service to:" type="information" emphasis="high">
        <ul style={{ margin: 0 }}>
          <li>See if you or a family member is eligible for service.</li>
          <li>Communicate and submit an application for service.</li>
          <li>Continue an application that you already started.</li>
        </ul>
      </GoabxCallout>

      <div style={{ marginTop: "var(--goa-space-xl)", display: "flex", alignItems: "center", gap: "var(--goa-space-s)" }}>
        <GoabText tag="h2" size="heading-s" mt="none" mb="none">
          Before you begin
        </GoabText>
        <GoabxBadge type="important" emphasis="subtle" content="20 mins" />
      </div>

      <GoabText tag="h3" size="heading-xs" mt="xl" mb="s">
        In order to complete the application, you will need:
      </GoabText>
      <ul style={{ marginTop: 0, marginBottom: "var(--goa-space-l)" }}>
        <li>A government issue ID for the person applying</li>
        <li>At Alberta account</li>
      </ul>

      <GoabButtonGroup alignment="start">
        <GoabxButton type="primary" onClick={onStartNew}>
          Start an application
        </GoabxButton>
        <GoabxButton type="secondary" onClick={onContinue}>
          Continue an application
        </GoabxButton>
      </GoabButtonGroup>

      <GoabText tag="h2" size="heading-s" mt="2xl" mb="s">
        Other information about the service
      </GoabText>
      <GoabText tag="p" size="body-m" mt="none">
        This section contains supplementary details about the service,
        including descriptions of less common scenarios, exceptions, and
        additional resources available. It provides context and additional
        insights that may be relevant to your specific circumstances or
        interests, helping you understand the full scope and utility of the
        service offered.
      </GoabText>

      <GoabText tag="h2" size="heading-s" mt="xl" mb="s">
        Support
      </GoabText>
      <GoabText tag="p" size="body-m" mt="none" mb="none">
        For assistance, email us at{" "}
        <a href="mailto:help@gov.ab.ca">help@gov.ab.ca</a>
      </GoabText>
    </div>
  );
}
