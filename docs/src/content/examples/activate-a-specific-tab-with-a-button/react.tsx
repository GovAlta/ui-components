import { GoabButton, GoabTab, GoabTabs } from "@abgov/react-components";

export function ActivateASpecificTabWithAButton() {
  const activateDetailsTab = () => {
    window.location.hash = "button-example-details";
  };

  return (
    <>
      <GoabButton onClick={activateDetailsTab}>Open details</GoabButton>
      <GoabTabs>
        <GoabTab heading="Summary" slug="button-example-summary">
          Summary content goes here.
        </GoabTab>
        <GoabTab heading="Details" slug="button-example-details">
          Detailed information goes here.
        </GoabTab>
      </GoabTabs>
    </>
  );
}
