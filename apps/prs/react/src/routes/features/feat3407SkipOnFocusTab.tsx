import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabTabs,
  GoabTab,
} from "@abgov/react-components";
import type { JSX } from "react";

export function Feat3407SkipOnFocusTabRoute(): JSX.Element {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        #3407: Skip Focus on Initial Tab Load
      </GoabText>
      <GoabText tag="p">
        Testing skipFocus on initial page load (no visible focus ring) and segmented
        tabpanel fixes (no focus ring or tab stop on empty content).
      </GoabText>

      <GoabDivider mt="l" mb="l" />

      <GoabBlock direction="column" gap="xl">
        <GoabBlock direction="column" gap="s">
          <GoabText tag="h2">Test 1: Skip focus on initial load</GoabText>
          <GoabText tag="p">
            When the page loads, the active tab should NOT have a visible focus ring.
            Reload the page and confirm no tab shows a focus outline until you interact
            via keyboard.
          </GoabText>
          <GoabTabs initialTab={2}>
            <GoabTab heading="First">
              <GoabText tag="p">Not initially selected.</GoabText>
            </GoabTab>
            <GoabTab heading="Second (initial)">
              <GoabText tag="p">
                This tab is initially active via initialTab=2. It should NOT have a focus
                ring on page load.
              </GoabText>
            </GoabTab>
            <GoabTab heading="Third">
              <GoabText tag="p">Not initially selected.</GoabText>
            </GoabTab>
          </GoabTabs>
        </GoabBlock>

        <GoabBlock direction="column" gap="s">
          <GoabText tag="h2">Test 2: When no initialize Tabs</GoabText>
          <GoabTabs>
            <GoabTab heading="Overview">
              <GoabText tag="p">
                Default tabs — check URL changes when clicking tabs.
              </GoabText>
            </GoabTab>
            <GoabTab heading="Details">
              <GoabText tag="p">
                The URL hash should update to reflect the active tab.
              </GoabText>
            </GoabTab>
            <GoabTab heading="Settings">
              <GoabText tag="p">
                Resize browser to mobile width — tabs should stack vertically.
              </GoabText>
            </GoabTab>
          </GoabTabs>
        </GoabBlock>
      </GoabBlock>
    </div>
  );
}

export default Feat3407SkipOnFocusTabRoute;
