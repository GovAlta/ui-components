import {
  GoabContainer,
  GoabGrid,
  GoabLink,
  GoabText,
} from "@abgov/react-components";

export function CardGrid() {
  return (
    <GoabGrid gap="xl" minChildWidth="320px">
      <GoabContainer accent="thin" mb="none">
        <GoabLink size="large" mb="m">
          <a href="#">Waitlist submission</a>
        </GoabLink>
        <GoabText mt="none" mb="none">
          Enter and maintain information about the households waiting for affordable housing
          with your organization.
        </GoabText>
      </GoabContainer>

      <GoabContainer accent="thin" mb="none">
        <GoabLink size="large" mb="m">
          <a href="#">Lodge assistance program</a>
        </GoabLink>
        <GoabText mt="none" mb="none">
          Keep track of the individuals who are placed in lodges and may qualify for the Lodge
          Assistance Program subsidy.
        </GoabText>
      </GoabContainer>

      <GoabContainer accent="thin" mb="none">
        <GoabLink size="large" mb="m">
          <a href="#">Education Support</a>
        </GoabLink>
        <GoabText mt="none" mb="none">
          Explore educational resources, enroll in courses, and track your academic progress
          effortlessly.
        </GoabText>
      </GoabContainer>

      <GoabContainer accent="thin" mb="none">
        <GoabLink size="large" mb="m">
          <a href="#">Social Assistance</a>
        </GoabLink>
        <GoabText mt="none" mb="none">
          Learn about available support programs, apply for financial aid, and access community
          resources.
        </GoabText>
      </GoabContainer>

      <GoabContainer accent="thin" mb="none">
        <GoabLink size="large" mb="m">
          <a href="#">Employment Opportunity</a>
        </GoabLink>
        <GoabText mt="none" mb="none">
          Search for job openings, access career development tools, and receive
          employment-related updates.
        </GoabText>
      </GoabContainer>

      <GoabContainer accent="thin" mb="none">
        <GoabLink size="large" mb="m">
          <a href="#">Housing Assistance</a>
        </GoabLink>
        <GoabText mt="none" mb="none">
          Find affordable housing options, apply for housing subsidies, and report maintenance
          issues seamlessly.
        </GoabText>
      </GoabContainer>
    </GoabGrid>
  );
}
