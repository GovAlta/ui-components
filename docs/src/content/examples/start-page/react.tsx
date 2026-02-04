import { GoabxButton } from "@abgov/react-components/experimental";
import { GoabText } from "@abgov/react-components";

export function StartPage() {
  const handleClick = () => {
    console.log("Get started clicked");
  };

  return (
    <>
      <GoabText size="heading-xl" mt="none" mb="l">Name of service</GoabText>
      <GoabText size="body-l" mt="none" mb="none">
        A short overview of the service. This is a couple sentences that helps the user understand
        what the service is.
      </GoabText>
      <GoabText size="body-m" mt="l" mb="s">Use this service to apply for [service]. You can use this service to:</GoabText>
      <ul>
        <li>see if you or a family member is eligible for [service]</li>
        <li>create and submit an application for [service]</li>
        <li>continue an application for [service] that you already started</li>
      </ul>

      <GoabText size="heading-l" mt="xl" mb="none">Before you begin</GoabText>
      <GoabText size="body-m" mt="l" mb="none">The application form should take about 20 minutes to complete.</GoabText>
      <GoabText size="body-m" mt="l" mb="none">
        <strong>In order to complete the application you will need:</strong>
      </GoabText>
      <ul>
        <li>government issued ID for the person applying</li>
      </ul>
      <GoabxButton mt="2xl" mb="xl" type="start" onClick={handleClick}>
        Get started
      </GoabxButton>

      <GoabText size="heading-l" mt="xl" mb="none">Other information about the service</GoabText>
      <GoabText size="body-m" mt="l" mb="none">
        This section contains supplementary details about the service, including descriptions of
        less common scenarios, exceptions, and additional resources available. It provides context
        and additional insights that may be relevant to your specific circumstances or interests,
        helping you understand the full scope and utility of the service offered.
      </GoabText>

      <GoabText size="heading-l" mt="xl" mb="none">Support</GoabText>
      <GoabText size="body-m" mt="l" mb="none">
        For assistance, email us at <a href="mailto:help@gov.ab.ca">help@gov.ab.ca</a>
      </GoabText>
    </>
  );
}
