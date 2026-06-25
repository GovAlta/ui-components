import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabLink,
  GoabFormItem,
  GoabTextArea,
} from "@abgov/react-components";

export function Bug3893Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        Bug #3893: `alignment` property in GoabBlock breaks width
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a href="https://github.com/GovAlta/ui-components/issues/3893" target="_blank" rel="noopener">
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            If you setup a GoabBlock component using the alignment property (doesn't seem to matter
            the value you use), any width properties you set don't seem to matter, it just defaults
            to an extremely small width.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      <GoabText tag="h3">Test 1: alignment=start, width=100%</GoabText>
      <GoabBlock direction="column" alignment="start" minWidth="100%" width="100%">
        <GoabText size="body-l" tag="div">Hello World</GoabText>
        <GoabFormItem label="Test" maxWidth="100%">
          <GoabTextArea name="test" value="" />
        </GoabFormItem>
      </GoabBlock>

      <GoabText tag="h3">Test 2: alignment=normal (default), width=100%</GoabText>
      <GoabBlock direction="column" minWidth="100%" width="100%">
        <GoabText size="body-l" tag="div">Hello World</GoabText>
        <GoabFormItem label="Test" maxWidth="100%">
          <GoabTextArea name="test" value="" />
        </GoabFormItem>
      </GoabBlock>

      <GoabText tag="h3">Test 3 (fix): alignment=start, stretch=true, width=100%</GoabText>
      <GoabBlock direction="column" alignment="start" stretch={true} minWidth="100%" width="100%">
        <GoabText size="body-l" tag="div">Hello World</GoabText>
        <GoabFormItem label="Test" maxWidth="100%">
          <GoabTextArea name="test" value="" />
        </GoabFormItem>
      </GoabBlock>
    </div>
  );
}

export default Bug3893Route;
