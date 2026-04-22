import {
  GoabContainer,
  GoabDivider,
  GoabGrid,
  GoabText,
} from "@abgov/react-components";

export function DocsGridRoute() {
  return (
    <div>
      <h2>Grid</h2>

      <h3>Basic grid</h3>
      <GoabGrid minChildWidth="200px" gap="m">
        <GoabContainer>Item 1</GoabContainer>
        <GoabContainer>Item 2</GoabContainer>
        <GoabContainer>Item 3</GoabContainer>
      </GoabGrid>

      <h3>Gap sizes</h3>
      <GoabText mt="none" mb="s">Extra small gap</GoabText>
      <GoabGrid minChildWidth="100px" gap="xs">
        <GoabContainer>A</GoabContainer>
        <GoabContainer>B</GoabContainer>
        <GoabContainer>C</GoabContainer>
        <GoabContainer>D</GoabContainer>
      </GoabGrid>
      <GoabDivider mt="l" mb="l" />
      <GoabText mt="none" mb="s">Medium gap</GoabText>
      <GoabGrid minChildWidth="100px" gap="m">
        <GoabContainer>A</GoabContainer>
        <GoabContainer>B</GoabContainer>
        <GoabContainer>C</GoabContainer>
        <GoabContainer>D</GoabContainer>
      </GoabGrid>
      <GoabDivider mt="l" mb="l" />
      <GoabText mt="none" mb="s">Extra large gap</GoabText>
      <GoabGrid minChildWidth="100px" gap="xl">
        <GoabContainer>A</GoabContainer>
        <GoabContainer>B</GoabContainer>
        <GoabContainer>C</GoabContainer>
        <GoabContainer>D</GoabContainer>
      </GoabGrid>
    </div>
  );
}
