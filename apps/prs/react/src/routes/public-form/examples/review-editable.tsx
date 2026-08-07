import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoabText,
  GoabLink,
  GoabCheckbox,
  GoabButton,
  GoabButtonGroup,
} from "@abgov/react-components";
import { PublicFormLayout } from "../public-form-layout";
import { FormSummary, SummarySection, SummaryItem } from "../form-summary";

/**
 * Review page — editable state. Change links per section, a confirm checkbox, and
 * "Save and continue". Composed from the form-summary trio (FormSummary >
 * SummarySection > SummaryItem). Shows the range from the Figma: grouped cards,
 * single-row cards, a long answer, and a file answer, across two titled sections.
 * (Change links point at gallery question pages so they navigate somewhere real.)
 */
export function ReviewEditable() {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

  return (
    <PublicFormLayout back="/public-form">
      <GoabText tag="h1" mt="none" mb="xl">
        Review your answers
      </GoabText>

      <FormSummary title="My information">
        <SummarySection heading="Personal details" changeTo="/public-form/multiple-questions">
          <SummaryItem question="Full name">Jane Smith</SummaryItem>
          <SummaryItem question="Date of birth">1 January 1990</SummaryItem>
        </SummarySection>

        <SummarySection changeTo="/public-form/single-question">
          <SummaryItem question="Phone number">780 123 4567</SummaryItem>
        </SummarySection>

        <SummarySection heading="Your situation" changeTo="/public-form/reveal">
          <SummaryItem question="Are you a current resident?">Yes</SummaryItem>
          <SummaryItem question="Tell us more">
            Lorem ipsum dolor sit amet consectetur. Ultricies at aliquet tellus diam. Odio velit
            aenean nec at venenatis pretium. Eget dui aliquam sit pharetra duis arcu.
          </SummaryItem>
        </SummarySection>

        <SummarySection changeTo="/public-form/file-upload">
          <SummaryItem question="Proof of address">
            <GoabLink>
              <a href="#">utility-bill.pdf</a>
            </GoabLink>
          </SummaryItem>
        </SummarySection>
      </FormSummary>

      <FormSummary title="My family">
        <SummarySection heading="Dependants" changeTo="/public-form/inline-list">
          <SummaryItem question="Number of children">2</SummaryItem>
          <SummaryItem question="Names">Alex Smith, Sam Smith</SummaryItem>
        </SummarySection>
      </FormSummary>

      <GoabCheckbox
        name="confirm"
        text="I confirm that the information above is correct"
        checked={confirmed}
        onChange={(e) => setConfirmed(e.checked)}
        mt="l"
        mb="xl"
      />

      <GoabButtonGroup alignment="start">
        <GoabButton type="primary" onClick={() => navigate("/public-form")}>
          Save and continue
        </GoabButton>
      </GoabButtonGroup>
    </PublicFormLayout>
  );
}
