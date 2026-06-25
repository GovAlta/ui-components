import { useNavigate } from "react-router-dom";
import { GoabText, GoabButton, GoabButtonGroup } from "@abgov/react-components";
import { PublicFormLayout } from "../public-form-layout";
import { SummarySection, SummaryItem } from "../form-summary";
import { ChildrenSummary } from "../children-summary";

/**
 * Review page — a repeating group (children summary). The contacts were added on a
 * repeat page (modal / drawer); here the loop collapses to each contact's key field
 * (the name), with one Change back to that manage page. Contrast with the
 * "Personal details" section above, which shows individual answers in full.
 */
export function ReviewChildrenSummary() {
  const navigate = useNavigate();
  const home = () => navigate("/public-form");
  const contacts = [
    { id: "1", label: "Thomas Jeffery", detail: "Sibling · 1 (780) 935-8312" },
    { id: "2", label: "Sam Smith", detail: "Friend · +1 780 555 0142" },
  ];

  return (
    <PublicFormLayout back="/public-form">
      <GoabText tag="h1" mt="none" mb="m">
        Review your answers
      </GoabText>
      <GoabText mt="none" mb="xl" color="secondary">
        A repeating group collapses to each item's key field, with one Change back to the page where
        the items were added.
      </GoabText>

      <SummarySection heading="Personal details" onChange={home}>
        <SummaryItem question="Full name">Jane Smith</SummaryItem>
        <SummaryItem question="Date of birth">1 January 1990</SummaryItem>
      </SummarySection>

      <ChildrenSummary
        title="Emergency contacts"
        items={contacts}
        onChange={() => navigate("/public-form/modal-drawer")}
      />

      <GoabButtonGroup alignment="start" mt="2xl">
        <GoabButton type="primary" onClick={home}>
          Save and continue
        </GoabButton>
      </GoabButtonGroup>
    </PublicFormLayout>
  );
}
