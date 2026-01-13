import {
  GoabBlock,
  GoabButton,
  GoabContainer,
  GoabTable,
  GoabText
} from "@abgov/react-components";

export function DisplayUserInformation() {
  const handleAddToCalendar = () => {
    console.log("Add to calendar clicked");
  };

  return (
    <>
      <GoabContainer>
        <GoabText as="span" size="body-m" color="secondary" mt="none" mb="none">Housing Advisor</GoabText>
        <GoabText size="heading-m" mt="none" mb="s">Tracy Hero</GoabText>
        <GoabBlock direction="row" gap="s">
          <GoabBlock direction="column" gap="m">
            <GoabText as="span" size="heading-xs" mt="none" mb="none">Email</GoabText>
            <GoabText as="span" size="heading-xs" mt="none" mb="none">Phone</GoabText>
          </GoabBlock>
          <GoabBlock direction="column" gap="m">
            <GoabText as="span" size="body-m" mt="none" mb="none">tracyhero@email.com</GoabText>
            <GoabText as="span" size="body-m" mt="none" mb="none">283-203-4921</GoabText>
          </GoabBlock>
        </GoabBlock>
      </GoabContainer>

      <GoabContainer
        type="non-interactive"
        accent="thick"
        heading="Upcoming important due dates"
        actions={
          <GoabButton
            type="tertiary"
            size="compact"
            leadingIcon="calendar"
            onClick={handleAddToCalendar}>
            Add to calendar
          </GoabButton>
        }>
        <GoabTable width="100%" striped>
          <tbody>
            <tr>
              <td>Business plan submission</td>
              <td style={{ textAlign: "right" }}>June 30, 2024</td>
            </tr>
            <tr>
              <td>Annual review</td>
              <td style={{ textAlign: "right" }}>October 3, 2024</td>
            </tr>
            <tr>
              <td>Application submission</td>
              <td style={{ textAlign: "right" }}>December 20, 2024</td>
            </tr>
            <tr>
              <td>Application review</td>
              <td style={{ textAlign: "right" }}>January 3, 2025</td>
            </tr>
          </tbody>
        </GoabTable>
      </GoabContainer>
    </>
  );
}
