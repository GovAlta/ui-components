import {
  GoabBlock,
  GoabContainer,
  GoabDivider,
  GoabLink,
  GoabText,
} from "@abgov/react-components";

export function Bug3447Route() {
  return (
    <GoabBlock direction="column" gap="l">
      <GoabText tag="h1">Bug 3447: Browser styling for p tags</GoabText>

      <GoabLink trailingIcon="open">
        <a
          href="https://github.com/GovAlta/ui-components/issues/3447"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </a>
      </GoabLink>

      <GoabText tag="p">
        When GoabText renders a paragraph, setting mt or mb to none should explicitly
        apply a zero margin and override the browser&apos;s default paragraph styling.
      </GoabText>

      <GoabDivider />

      <GoabText tag="h3">1. Margins set to s</GoabText>
      <GoabText tag="p" mt="none" mb="m">
        The paragraph should have small top and bottom margins between the dividers.
      </GoabText>
      <GoabContainer mb="none">
        <GoabDivider mt="none" mb="none" />
        <GoabText tag="p" mt="s" mb="s">
          Paragraph with mt=&quot;s&quot; and mb=&quot;s&quot;
        </GoabText>
        <GoabDivider mt="none" mb="none" />
      </GoabContainer>

      <GoabText tag="h3">2. Margins not set</GoabText>
      <GoabText tag="p" mt="none" mb="m">
        The paragraph should use the Text component defaults: s on top and l on the
        bottom.
      </GoabText>
      <GoabContainer mb="none">
        <GoabDivider mt="none" mb="none" />
        <GoabText tag="p">Paragraph without mt or mb</GoabText>
        <GoabDivider mt="none" mb="none" />
      </GoabContainer>

      <GoabText tag="h3">3. Margins set to none</GoabText>
      <GoabText tag="p" mt="none" mb="m">
        The paragraph should touch both dividers because none resolves to zero and
        overrides the browser&apos;s native 1em paragraph margins.
      </GoabText>
      <GoabContainer mb="none">
        <GoabDivider mt="none" mb="none" />
        <GoabText tag="p" mt="none" mb="none">
          Paragraph with mt=&quot;none&quot; and mb=&quot;none&quot;
        </GoabText>
        <GoabDivider mt="none" mb="none" />
      </GoabContainer>
    </GoabBlock>
  );
}

export default Bug3447Route;
