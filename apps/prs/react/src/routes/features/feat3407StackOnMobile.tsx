import {
  GoabBlock,
  GoabDivider,
  GoabTab,
  GoabTabs,
  GoabText,
} from "@abgov/react-components";

import { type JSX } from "react";

export function Feat3407StackOnMobileRoute(): JSX.Element {
  return (
    <div>
      <GoabText tag="h1" mt="m">
        #3407: orientation Prop
      </GoabText>
      <GoabText tag="p">
        Testing orientation prop (controls mobile stacking behavior). orientation is
        only available on GoabTabs (experimental).
      </GoabText>

      <GoabDivider mt="l" mb="l" />

      <GoabBlock direction="column" gap="xl">
        <GoabBlock direction="column" gap="s">
          <GoabText tag="h2">
            Test 1: Experimental Tabs + orientation="auto" (default)
          </GoabText>
          <GoabText tag="p">
            Experimental (v2) tabs that stack vertically on mobile (default behavior).
            Resize browser to mobile width to verify tabs stack.
          </GoabText>
          <GoabTabs>
            <GoabTab heading="Overview">
              <GoabText tag="p">These tabs should stack vertically on mobile.</GoabText>
            </GoabTab>
            <GoabTab heading="Details">
              <GoabText tag="p">Vertical stacking on narrow screens.</GoabText>
            </GoabTab>
            <GoabTab heading="Settings">
              <GoabText tag="p">Compare with Test 2 below.</GoabText>
            </GoabTab>
          </GoabTabs>
        </GoabBlock>

        <GoabBlock direction="column" gap="s">
          <GoabText tag="h2">Test 2: Experimental Tabs + orientation="horizontal"</GoabText>
          <GoabText tag="p">
            Experimental (v2) tabs that stay horizontal on mobile. Resize browser to
            mobile width to verify tabs remain in a row.
          </GoabText>
          <GoabTabs orientation="horizontal">
            <GoabTab heading="Overview">
              <GoabText tag="p">These tabs should stay horizontal on mobile.</GoabText>
            </GoabTab>
            <GoabTab heading="Details">
              <GoabText tag="p">No vertical stacking on narrow screens.</GoabText>
            </GoabTab>
            <GoabTab heading="Settings">
              <GoabText tag="p">Useful when horizontal space is preferred.</GoabText>
            </GoabTab>
          </GoabTabs>
        </GoabBlock>

        <GoabBlock direction="column" gap="s">
          <GoabText tag="h2">
            Test 3: Segmented variant (always not stacked on mobile)
          </GoabText>
          <GoabText tag="p">
            Segmented tabs stay horizontal on mobile by default (no prop needed). Resize
            to mobile width to verify.
          </GoabText>
          <GoabTabs variant="segmented">
            <GoabTab heading="Active">{""}</GoabTab>
            <GoabTab heading="Completed">{""}</GoabTab>
            <GoabTab heading="Archived">{""}</GoabTab>
          </GoabTabs>
        </GoabBlock>

        <GoabBlock direction="column" gap="s">
          <GoabText tag="h2">Test 4: Segmented + orientation="horizontal"</GoabText>
          <GoabText tag="p">
            Segmented tabs with orientation explicitly set to "horizontal". Should remain
            horizontal on mobile (same as default segmented behavior).
          </GoabText>
          <GoabTabs variant="segmented" orientation="horizontal">
            <GoabTab heading="All">{""}</GoabTab>
            <GoabTab heading="Open">{""}</GoabTab>
            <GoabTab heading="Closed">{""}</GoabTab>
          </GoabTabs>
        </GoabBlock>
      </GoabBlock>
    </div>
  );
}

export default Feat3407StackOnMobileRoute;
