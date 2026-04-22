import { GoabBlock, GoabContainer } from "@abgov/react-components";

export function DocsBlockRoute() {
  return (
    <div>
      <h2>Block</h2>

      <h3>Basic block</h3>
      <GoabBlock>
        <GoabContainer type="non-interactive"><p>First item</p></GoabContainer>
        <GoabContainer type="non-interactive"><p>Second item</p></GoabContainer>
        <GoabContainer type="non-interactive"><p>Third item</p></GoabContainer>
      </GoabBlock>

      <h3>Gap sizes</h3>
      <GoabBlock gap="xs" mb="l">
        <GoabContainer type="non-interactive"><p>Extra small gap</p></GoabContainer>
        <GoabContainer type="non-interactive"><p>Item 2</p></GoabContainer>
      </GoabBlock>
      <GoabBlock gap="m" mb="l">
        <GoabContainer type="non-interactive"><p>Medium gap</p></GoabContainer>
        <GoabContainer type="non-interactive"><p>Item 2</p></GoabContainer>
      </GoabBlock>
      <GoabBlock gap="xl">
        <GoabContainer type="non-interactive"><p>Extra large gap</p></GoabContainer>
        <GoabContainer type="non-interactive"><p>Item 2</p></GoabContainer>
      </GoabBlock>

      <h3>Alignment</h3>
      <GoabBlock alignment="start" mb="m" direction="column" width="100%">
        <GoabContainer type="non-interactive" width="content"><p>Start aligned</p></GoabContainer>
      </GoabBlock>
      <GoabBlock alignment="center" mb="m" direction="column" width="100%">
        <GoabContainer type="non-interactive" width="content"><p>Center aligned</p></GoabContainer>
      </GoabBlock>
      <GoabBlock alignment="end" direction="column" width="100%">
        <GoabContainer type="non-interactive" width="content"><p>End aligned</p></GoabContainer>
      </GoabBlock>

      <h3>Direction</h3>
      <GoabBlock direction="row" gap="l" mb="l">
        <GoabContainer type="non-interactive"><p>Row item 1</p></GoabContainer>
        <GoabContainer type="non-interactive"><p>Row item 2</p></GoabContainer>
      </GoabBlock>
      <GoabBlock direction="column" gap="m">
        <GoabContainer type="non-interactive"><p>Column item 1</p></GoabContainer>
        <GoabContainer type="non-interactive"><p>Column item 2</p></GoabContainer>
      </GoabBlock>
    </div>
  );
}
