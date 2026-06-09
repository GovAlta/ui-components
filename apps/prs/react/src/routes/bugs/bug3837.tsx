import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabLink,
  GoabTabs,
  GoabTab,
} from "@abgov/react-components";

export function Bug3837Route() {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        Bug #3837: Tabs label should not shift horizontally when selection changes
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a href="https://github.com/GovAlta/ui-components/issues/3837" target="_blank" rel="noopener">
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            When switching between tabs, the tab labels shift horizontally. This is caused by a bold
            font weight being applied to the active tab, causing the text to take up more space and
            nudging adjacent tabs out of position.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      <GoabText tag="h3">Test 1: V2 tabs (default variant)</GoabText>
      <GoabText tag="p">
        Click between tabs and observe that the labels do not shift position. The active tab bold
        treatment should be preserved.
      </GoabText>
      <GoabTabs version="2">
        <GoabTab heading="Short">
          <GoabText tag="p">Short tab content</GoabText>
        </GoabTab>
        <GoabTab heading="Much longer label">
          <GoabText tag="p">Longer tab content</GoabText>
        </GoabTab>
        <GoabTab heading="Medium label">
          <GoabText tag="p">Medium tab content</GoabText>
        </GoabTab>
        <GoabTab heading="Another tab">
          <GoabText tag="p">Another tab content</GoabText>
        </GoabTab>
      </GoabTabs>

      <GoabText tag="h3">Test 2: V2 tabs with similar-length labels</GoabText>
      <GoabText tag="p">
        All tabs have similar-length labels to make any shift more visible. Verify no horizontal
        movement when switching tabs.
      </GoabText>
      <GoabTabs version="2">
        <GoabTab heading="Information">
          <GoabText tag="p">Information content</GoabText>
        </GoabTab>
        <GoabTab heading="Documents">
          <GoabText tag="p">Documents content</GoabText>
        </GoabTab>
        <GoabTab heading="History">
          <GoabText tag="p">History content</GoabText>
        </GoabTab>
      </GoabTabs>

      <GoabText tag="h3">Test 3: V1 tabs (should be unaffected)</GoabText>
      <GoabText tag="p">
        V1 tabs are out of scope for this fix. Verify they still render correctly.
      </GoabText>
      <GoabTabs>
        <GoabTab heading="Tab One">
          <GoabText tag="p">Tab One content</GoabText>
        </GoabTab>
        <GoabTab heading="Tab Two">
          <GoabText tag="p">Tab Two content</GoabText>
        </GoabTab>
        <GoabTab heading="Tab Three">
          <GoabText tag="p">Tab Three content</GoabText>
        </GoabTab>
      </GoabTabs>
    </div>
  );
}

export default Bug3837Route;
