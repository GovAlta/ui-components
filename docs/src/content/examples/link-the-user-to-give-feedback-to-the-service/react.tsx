import { GoabMicrositeHeader } from "@abgov/react-components";

export function LinkTheUserToGiveFeedbackToTheService() {
  const onClick = () => {
    console.log("Feedback clicked");
    alert("Thank you for your feedback!");
  };

  return <GoabMicrositeHeader type="alpha" onFeedbackClick={onClick} />;
}
