import {
  GoabxButton,
  GoabxDropdown,
  GoabxDropdownItem,
  GoabxFormItem,
  GoabxRadioGroup,
  GoabxRadioItem,
  GoabxTextArea,
} from "@abgov/react-components/experimental";
import { GoabBlock, GoabContainer, GoabGrid, GoabText } from "@abgov/react-components";

export function ReviewAndAction() {
  return (
    <GoabGrid minChildWidth="315px">
      <GoabContainer accent="thin" type="non-interactive">
        <GoabText size="heading-m" mt="none" mb="m">Appearance details</GoabText>
        <GoabGrid minChildWidth="200px" gap="m">
          <GoabBlock direction="column" gap="xs">
            <GoabText size="body-s" color="secondary" mt="none" mb="none">Accused name</GoabText>
            <GoabText size="body-m" mt="none" mb="none">Doe, John Scott</GoabText>
          </GoabBlock>

          <GoabBlock direction="column" gap="xs">
            <GoabText size="body-s" color="secondary" mt="none" mb="none">Date of birth</GoabText>
            <GoabText size="body-m" mt="none" mb="none">Mar 14, 2021</GoabText>
          </GoabBlock>

          <GoabBlock direction="column" gap="xs">
            <GoabText size="body-s" color="secondary" mt="none" mb="none">Court location</GoabText>
            <GoabText size="body-m" mt="none" mb="none">Calgary</GoabText>
          </GoabBlock>

          <GoabBlock direction="column" gap="xs">
            <GoabText size="body-s" color="secondary" mt="none" mb="none">Upcoming appearance date(s)</GoabText>
            <GoabText size="body-m" mt="none" mb="none">Sep 20, 2021</GoabText>
          </GoabBlock>
        </GoabGrid>

        <GoabText size="heading-xs" mt="l" mb="s">Docket number(s) &amp; charges</GoabText>
        <GoabContainer type="non-interactive" padding="compact">
          <GoabText size="heading-xs" mt="none" mb="xs">1) 12345678</GoabText>
          <GoabText size="body-m" mt="none" mb="none">CC 334(1) - Theft under $5000</GoabText>
          <GoabText size="body-m" mt="none" mb="none">CC 268(1) - Aggravated assault</GoabText>
        </GoabContainer>

        <GoabContainer type="non-interactive" padding="compact">
          <GoabText size="heading-xs" mt="none" mb="xs">2) 12345678</GoabText>
          <GoabText size="body-m" mt="none" mb="none">CC 334(1) - Theft under $5000</GoabText>
          <GoabText size="body-m" mt="none" mb="none">CC 268(1) - Aggravated assault</GoabText>
        </GoabContainer>
      </GoabContainer>

      <GoabContainer accent="thin" width="content">
        <form>
          <GoabText size="heading-m" mt="none" mb="m">Adjournment request</GoabText>
          <GoabText size="body-m" mt="none" mb="none">
            Keep track of the individuals who are placed in lodges and may
            qualify for the Lodge Assistance Program subsidy.
          </GoabText>

          <GoabxFormItem label="Case history and new request" mt="l">
            <GoabxRadioGroup name="case" orientation="horizontal" onChange={() => {}}>
              <GoabxRadioItem value="grant" label="Grant" />
              <GoabxRadioItem value="deny" label="Deny" />
            </GoabxRadioGroup>
          </GoabxFormItem>

          <GoabxFormItem label="Reason to deny" mt="l">
            <GoabxDropdown name="reason" width="100%" onChange={() => {}}>
              <GoabxDropdownItem value="1" label="Incomplete Application" />
              <GoabxDropdownItem value="2" label="Eligibility Criteria Not Met" />
              <GoabxDropdownItem value="3" label="Documentation Verification Failure" />
            </GoabxDropdown>
          </GoabxFormItem>

          <GoabxFormItem label="Message" mt="l">
            <GoabxTextArea name="message" rows={5} width="100%" value="" onChange={() => {}} />
          </GoabxFormItem>

          <GoabxButton mt="xl" onClick={() => {}}>
            Confirm adjournment
          </GoabxButton>
        </form>
      </GoabContainer>
    </GoabGrid>
  );
}
