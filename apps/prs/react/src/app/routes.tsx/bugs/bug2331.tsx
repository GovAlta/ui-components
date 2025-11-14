import React, { useState } from "react";
import {
  GoabBlock,
  GoabButton,
  GoabTabs,
  GoabTab,
  GoabText,
} from "@abgov/react-components";
import { GoabTabsOnChangeDetail } from "@abgov/ui-components-common";

export function Bug2331Route() {
  const [blockContent, setBlockContent] = useState<string | null>(null);
  const [dynamicTabContent, setDynamicTabContent] = useState<string | null>(null);

  const addBlockContent = () => {
    setBlockContent(`Content updated at ${new Date().toLocaleString()}`);
  };

  const updateDynamicTabContent = () => {
    setDynamicTabContent(`Content updated at ${new Date().toLocaleString()}`);
  };

  const onTabsChange = (detail: GoabTabsOnChangeDetail) => {
    console.log("Tab changed to", detail.tab);
  };

  return (
    <div style={{ width: "1024px", margin: "0 auto" }}>
      <GoabText size="heading-l" mb="xl">
        Bug #2331: Dynamic Data Test
      </GoabText>

      <GoabText size="body-m" mb="2xl">
        This test demonstrates the dynamic data issue with Block and Tab components. Click
        the buttons below to add content dynamically to empty components.
      </GoabText>

      {/* Block Component Test */}
      <GoabText size="heading-m" mb="l">
        GoabBlock Test
      </GoabText>
      <GoabText size="body-s" mb="m">
        Empty Block component
      </GoabText>

      <GoabBlock>{blockContent}</GoabBlock>

      <GoabButton type="secondary" onClick={addBlockContent} mb="2xl">
        Add Content to Block
      </GoabButton>

      {/* Tabs Component Test */}
      <GoabText size="heading-m" mb="l">
        GoabTabs Test
      </GoabText>
      <GoabText size="body-s" mb="m">
        Tabs component with one static and one dynamic tab
      </GoabText>

      <GoabTabs onChange={onTabsChange}>
        <GoabTab heading="Dynamic Content">{dynamicTabContent}</GoabTab>
        <GoabTab heading="Static Content">
          <GoabText size="body-m">Static tab content</GoabText>
        </GoabTab>
      </GoabTabs>

      <GoabButton type="secondary" onClick={updateDynamicTabContent}>
        Update Dynamic Tab Content
      </GoabButton>
    </div>
  );
}
