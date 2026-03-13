import {
  GoabxButton,
  GoabxCallout,
  GoabxBadge,
} from "@abgov/react-components/experimental";
import { GoabText } from "@abgov/react-components";
import illustrationSrc from "../assets/form-illustration.svg";
import illustrationDarkSrc from "../assets/person-using-computer-dark.svg";
import eligibilityCheckSrc from "../assets/eligibility-check.svg";
import prepareDocsSrc from "../assets/prepare-docs.svg";
import submitDocsSrc from "../assets/submit-docs.svg";
import { useIsDarkMode } from "../../../workspace/hooks/useIsDarkMode";

type StartPageProps = {
  onStartNew: () => void;
  onContinue: () => void;
};

type StepCardProps = {
  number: number;
  title: string;
  duration: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

function StepCard({
  number,
  title,
  duration,
  description,
  imageSrc,
  imageAlt,
}: StepCardProps) {
  return (
    <div style={{ flex: "1 1 0", minWidth: "180px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "var(--goa-space-m)",
        }}
      >
        <img src={imageSrc} alt={imageAlt} style={{ width: "120px", height: "120px" }} />
      </div>
      <GoabText size="heading-xs" mt="none" mb="xs">
        {number}. {title}
      </GoabText>
      <div style={{ marginBottom: "var(--goa-space-s)" }}>
        <GoabxBadge type="default" emphasis="subtle" content={duration} iconType="time" />
      </div>
      <GoabText size="body-s" mt="none" mb="none">
        {description}
      </GoabText>
    </div>
  );
}

export function StartPage({ onStartNew, onContinue }: StartPageProps) {
  const isDark = useIsDarkMode();

  return (
    <div className="form-set">
      {/* Hero section - two column layout */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--goa-space-2xl)",
          marginTop: "var(--goa-space-2xl)",
          marginBottom: "var(--goa-space-xl)",
        }}
      >
        {/* Left column - text and buttons */}
        <div style={{ flex: "1 1 50%" }}>
          <GoabText as="h1" size="heading-xl" mt="none" mb="l">
            Apply for a [service]
          </GoabText>
          <GoabText as="p" size="body-m" mt="none" mb="xl">
            Apply for supports to pay for basic expenses like food, clothing and shelter.
          </GoabText>
          <div style={{ display: "flex", gap: "var(--goa-space-m)" }}>
            <GoabxButton type="primary" onClick={onStartNew}>
              Start application
            </GoabxButton>
            <GoabxButton type="secondary" onClick={onContinue}>
              Continue
            </GoabxButton>
          </div>
        </div>

        {/* Right column - illustration */}
        <div style={{ flex: "1 1 40%", display: "flex", justifyContent: "center" }}>
          <img
            src={isDark ? illustrationDarkSrc : illustrationSrc}
            alt="Person using a computer to apply for services"
            style={{
              width: "100%",
              maxWidth: "360px",
              height: "auto",
            }}
          />
        </div>
      </div>

      {/* How to apply section */}
      <GoabText as="h2" size="heading-s" mt="2xl" mb="xs">
        How to apply for this service
      </GoabText>
      <GoabText as="p" size="body-m" mt="none" mb="l">
        In order to complete the application you will need to complete these steps
      </GoabText>

      <GoabxCallout
        heading="You can use this service to:"
        type="information"
        emphasis="medium"
      >
        <ul style={{ margin: 0, paddingLeft: "var(--goa-space-l)" }}>
          <li>See if you or a family member is eligible for service.</li>
          <li>Communicate and submit an application for service.</li>
          <li>Continue an application that you already started.</li>
        </ul>
      </GoabxCallout>

      {/* Step cards */}
      <div
        style={{
          display: "flex",
          gap: "var(--goa-space-xl)",
          marginTop: "var(--goa-space-2xl)",
          flexWrap: "wrap",
        }}
      >
        <StepCard
          number={1}
          title="Eligibility Check"
          duration="4 min"
          description="Check to see if you or a family member is eligible for this service"
          imageSrc={eligibilityCheckSrc}
          imageAlt="Eligibility check illustration"
        />
        <StepCard
          number={2}
          title="Prepare documents"
          duration="6 min"
          description="Ensure government issued ID for the person applying"
          imageSrc={prepareDocsSrc}
          imageAlt="Prepare documents illustration"
        />
        <StepCard
          number={3}
          title="Submit documents"
          duration="10 min"
          description="Create Alberta account and submit application"
          imageSrc={submitDocsSrc}
          imageAlt="Submit documents illustration"
        />
      </div>

      {/* Other information */}
      <GoabText as="h2" size="heading-s" mt="2xl" mb="s">
        Other information about the service
      </GoabText>
      <GoabText as="p" size="body-m" mt="none">
        This section contains supplementary details about the service, including
        descriptions of less common scenarios, exceptions, and additional resources
        available. It provides context and additional insights that may be relevant to
        your specific circumstances or interests, helping you understand the full scope
        and utility of the service offered.
      </GoabText>

      {/* Support */}
      <GoabText as="h2" size="heading-s" mt="xl" mb="s">
        Support
      </GoabText>
      <GoabText as="p" size="body-m" mt="none" mb="none">
        For assistance, email us at <a href="mailto:help@gov.ab.ca">help@gov.ab.ca</a>
      </GoabText>
    </div>
  );
}
