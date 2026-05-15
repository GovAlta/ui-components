import { useState } from "react";
import {
  GoabTabs,
  GoabTab,
  GoabBlock,
  GoabText,
  GoabBadge,
  GoabButton,
  GoabButtonGroup,
} from "@abgov/react-components";
import { GoabTabsOnChangeDetail } from "@abgov/ui-components-common";

export function Feat2611Route() {
  const [activeTab, setActiveTab] = useState(1);
  const [dynamicLabel, setDynamicLabel] = useState("Overview");
  const [dynamicBadge, setDynamicBadge] = useState("3");

  const handleTabChange = (detail: GoabTabsOnChangeDetail) => {
    console.log("Tab changed:", detail);
    setActiveTab(detail.tab);
  };

  const toggleDynamicLabel = () => {
    setDynamicLabel((prev) =>
      prev === "Overview" ? "Overview with a much longer label" : "Overview",
    );
  };

  const toggleDynamicBadge = () => {
    setDynamicBadge((prev) => (prev === "3" ? "Text Based Content" : "3"));
  };

  return (
    <main>
      <h1>Segmented Tabs Variant (#2611)</h1>
      <p>
        This feature adds a new "segmented" variant to the Tabs component, featuring a
        pill/button style with animated sliding background.
      </p>

      <GoabBlock gap="xl" direction="column">
        <section>
          <h2>Segmented Variant</h2>
          <p>Tabs with pill-style appearance and animated selection indicator.</p>

          <GoabTabs
            variant="segmented"
            testId={"segment-tabs"}
            initialTab={1}
            onChange={handleTabChange}
          >
            <GoabTab
              heading={
                <>
                  Overview <GoabBadge type="information" content="3" />
                </>
              }
            >
              <GoabBlock gap="m" direction="column">
                <GoabText>
                  This is the Overview tab content. The segmented variant displays tabs as
                  pill-shaped buttons with a sliding background indicator.
                </GoabText>
              </GoabBlock>
            </GoabTab>
            <GoabTab
              heading={
                <>
                  Details <GoabBadge type="success" content="New" />
                </>
              }
            >
              <GoabBlock gap="m" direction="column">
                <GoabText>
                  This is the Details tab content. Notice how the pill smoothly animates
                  between tabs.
                </GoabText>
              </GoabBlock>
            </GoabTab>
            <GoabTab
              heading={
                <>
                  Settings <GoabBadge type="important" content="5" />
                </>
              }
            >
              <GoabBlock gap="m" direction="column">
                <GoabText>
                  This is the Settings tab content. The segmented style is ideal for
                  compact navigation within a section.
                </GoabText>
              </GoabBlock>
            </GoabTab>
          </GoabTabs>
        </section>

        <section>
          <h2>Segmented Variant - Dynamic Heading Updates</h2>
          <p>
            Use the controls to change heading content; the pill should resize and stay
            aligned after each update.
          </p>

          <GoabButtonGroup mb="l" alignment={"start"}>
            <GoabButton onClick={toggleDynamicLabel}>Toggle label length</GoabButton>
            <GoabButton onClick={toggleDynamicBadge}>Toggle badge content</GoabButton>
          </GoabButtonGroup>

          <GoabTabs variant="segmented" onChange={handleTabChange}>
            <GoabTab
              heading={
                <>
                  {dynamicLabel} <GoabBadge type="information" content={dynamicBadge} />
                </>
              }
            >
              <GoabText>
                This tab heading changes length and badge content for resize testing.
              </GoabText>
            </GoabTab>
            <GoabTab heading="Static">
              <GoabText>Static label for comparison.</GoabText>
            </GoabTab>
            <GoabTab heading="Another">
              <GoabText>Another static label.</GoabText>
            </GoabTab>
          </GoabTabs>
        </section>

        <section>
          <h2>Default Variant (for comparison)</h2>
          <p>Standard tabs with underline indicator.</p>

          <GoabTabs onChange={handleTabChange}>
            <GoabTab
              heading={
                <>
                  {dynamicLabel} <GoabBadge type="information" content={dynamicBadge} />
                </>
              }
            >
              <GoabBlock gap="m" direction="column">
                <GoabText>
                  This is the Overview tab with the default variant styling.
                </GoabText>
              </GoabBlock>
            </GoabTab>
            <GoabTab
              heading={
                <>
                  Details <GoabBadge type="success" content="New" />
                </>
              }
            >
              <GoabBlock gap="m" direction="column">
                <GoabText>
                  This is the Details tab with the default variant styling.
                </GoabText>
              </GoabBlock>
            </GoabTab>
            <GoabTab
              heading={
                <>
                  Settings <GoabBadge type="important" content="5" />
                </>
              }
            >
              <GoabBlock gap="m" direction="column">
                <GoabText>
                  This is the Settings tab with the default variant styling.
                </GoabText>
              </GoabBlock>
            </GoabTab>
          </GoabTabs>
        </section>

        <section>
          <h2>Long Labels - Segmented Variant</h2>
          <p>Demonstrates how long tab labels are handled in the segmented variant.</p>

          <GoabTabs variant="segmented" onChange={handleTabChange}>
            <GoabTab heading="Short">
              <GoabText>Short label tab content.</GoabText>
            </GoabTab>
            <GoabTab heading="Medium Length Label">
              <GoabText>Medium length label tab content.</GoabText>
            </GoabTab>
            <GoabTab heading="This is a very long tab label that might need special handling">
              <GoabText>Very long label tab content.</GoabText>
            </GoabTab>
            <GoabTab
              heading={
                <>
                  Long with Badge <GoabBadge type="important" content="99+" />
                </>
              }
            >
              <GoabText>Long label with badge tab content.</GoabText>
            </GoabTab>
          </GoabTabs>
        </section>

        <section>
          <h2>Long Labels - Default Variant</h2>
          <p>Demonstrates how long tab labels are handled in the default variant.</p>

          <GoabTabs onChange={handleTabChange}>
            <GoabTab heading="Short">
              <GoabText>Short label tab content.</GoabText>
            </GoabTab>
            <GoabTab heading="Medium Length Label">
              <GoabText>Medium length label tab content.</GoabText>
            </GoabTab>
            <GoabTab heading="This is a very long tab label that might need special handling">
              <GoabText>Very long label tab content.</GoabText>
            </GoabTab>
            <GoabTab
              heading={
                <>
                  Long with Badge <GoabBadge type="important" content="99+" />
                </>
              }
            >
              <GoabText>Long label with badge tab content.</GoabText>
            </GoabTab>
          </GoabTabs>
        </section>

        <section>
          <h2>Multi-Line Labels - Segmented Variant</h2>
          <p>Demonstrates using React nodes to create multi-line tab headings.</p>

          <GoabTabs variant="segmented" onChange={handleTabChange}>
            <GoabTab
              heading={
                <>
                  Line One
                  <br />
                  Line Two
                </>
              }
            >
              <GoabText>Multi-line heading tab content.</GoabText>
            </GoabTab>
            <GoabTab
              heading={
                <>
                  <span>Primary Text</span>
                  <br />
                  <small style={{ fontWeight: "normal" }}>Secondary Text</small>
                </>
              }
            >
              <GoabText>Primary/secondary text pattern tab content.</GoabText>
            </GoabTab>
            <GoabTab
              heading={
                <>
                  <span>Orders</span>
                  <br />
                  <GoabBadge type="information" content="12" />
                </>
              }
            >
              <GoabText>Label with badge on second line.</GoabText>
            </GoabTab>
          </GoabTabs>
        </section>

        <section>
          <h2>Multi-Line Labels - Default Variant</h2>
          <p>Demonstrates using React nodes to create multi-line tab headings.</p>

          <GoabTabs onChange={handleTabChange}>
            <GoabTab
              heading={
                <>
                  Line One
                  <br />
                  Line Two
                </>
              }
            >
              <GoabText>Multi-line heading tab content.</GoabText>
            </GoabTab>
            <GoabTab
              heading={
                <>
                  <span>Primary Text</span>
                  <br />
                  <small style={{ fontWeight: "normal" }}>Secondary Text</small>
                </>
              }
            >
              <GoabText>Primary/secondary text pattern tab content.</GoabText>
            </GoabTab>
            <GoabTab
              heading={
                <>
                  <span>Orders</span>
                  <br />
                  <GoabBadge type="information" content="12" />
                </>
              }
            >
              <GoabText>Label with badge on second line.</GoabText>
            </GoabTab>
          </GoabTabs>
        </section>

        <section>
          <h2>Disabled Tabs - Segmented Variant</h2>
          <p>Demonstrates disabled tabs that cannot be clicked or navigated to.</p>

          <GoabTabs variant="segmented" onChange={handleTabChange}>
            <GoabTab heading="Enabled">
              <GoabText>This tab is enabled and can be selected.</GoabText>
            </GoabTab>
            <GoabTab heading="Disabled Tab" disabled>
              <GoabText>This content should not be visible (tab is disabled).</GoabText>
            </GoabTab>
            <GoabTab heading="Also Enabled">
              <GoabText>
                This tab is also enabled. Keyboard navigation skips the disabled tab.
              </GoabText>
            </GoabTab>
            <GoabTab
              heading={
                <>
                  Disabled with Badge <GoabBadge type="important" content="!" />
                </>
              }
              disabled
            >
              <GoabText>Disabled tab with badge - not accessible.</GoabText>
            </GoabTab>
          </GoabTabs>
        </section>

        <section>
          <h2>Disabled Tabs - Default Variant</h2>
          <p>Demonstrates disabled tabs in the default variant.</p>

          <GoabTabs onChange={handleTabChange}>
            <GoabTab heading="Enabled">
              <GoabText>This tab is enabled and can be selected.</GoabText>
            </GoabTab>
            <GoabTab heading="Disabled Tab" disabled>
              <GoabText>This content should not be visible (tab is disabled).</GoabText>
            </GoabTab>
            <GoabTab heading="Also Enabled">
              <GoabText>
                This tab is also enabled. Keyboard navigation skips the disabled tab.
              </GoabText>
            </GoabTab>
            <GoabTab
              heading={
                <>
                  Disabled with Badge <GoabBadge type="important" content="!" />
                </>
              }
              disabled
            >
              <GoabText>Disabled tab with badge - not accessible.</GoabText>
            </GoabTab>
          </GoabTabs>
        </section>

        <section>
          <h2>Active Tab State</h2>
          <GoabText>
            <strong>Current active tab:</strong> {activeTab}
          </GoabText>
        </section>

        <section>
          <h2>Feature Summary</h2>
          <GoabBlock gap="s" direction="column">
            <GoabText>
              <strong>variant="segmented"</strong> - Pill-style tabs with animated sliding
              background
            </GoabText>
            <GoabText>
              <strong>variant="default"</strong> - Standard underline-style tabs (default
              behavior)
            </GoabText>
            <GoabText>
              <strong>heading</strong> - Supports React nodes (e.g., text with badges)
            </GoabText>
            <GoabText>
              <strong>disabled</strong> - Prevents tab selection, grayed out appearance,
              skipped in keyboard navigation
            </GoabText>
          </GoabBlock>
        </section>
      </GoabBlock>
    </main>
  );
}
