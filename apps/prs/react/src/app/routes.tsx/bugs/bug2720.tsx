import { useState } from "react";
import {
  GoabTabs,
  GoabTab,
  GoabBlock,
  GoabText,
  GoabButton,
  GoabLink,
  GoabBadge,
} from "@abgov/react-components";
import { GoabTabsOnChangeDetail } from "@abgov/ui-components-common";

export const Bug2720Route = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [tabChangeLog, setTabChangeLog] = useState<string[]>([]);

  const handleTabChange = (detail: GoabTabsOnChangeDetail) => {
    setCurrentTab(detail.tab);
    const logEntry = `Tab changed to: ${detail.tab} (${getTabName(detail.tab)})`;
    setTabChangeLog((prev) => [...prev, logEntry]);
    console.log("Tab change event:", detail);
  };

  const getTabName = (tabIndex: number): string => {
    const tabNames = ["Profile", "Settings", "Help"];
    return tabNames[tabIndex] || `Tab ${tabIndex}`;
  };

  const resetTest = () => {
    setTabChangeLog([]);
  };

  // Function to programmatically change URL hash
  const changeToTab = (tabIndex: number) => {
    const newHash = `tab-${tabIndex}`;
    window.location.hash = newHash;
    console.log(`Programmatically changed URL to: #${newHash}`);
  };

  // Function to simulate search functionality that switches to first non-empty tab
  const simulateSearch = () => {
    // Simulate finding results in tab 2 (Settings)
    console.log("Search completed - switching to Settings tab (tab 2)");
    changeToTab(2);
  };

  return (
    <main>
      <GoabText tag="h1">Bug 2720: Tabs Not Switching via URL Changes</GoabText>
      <GoabText tag="p">
        Testing the tabs component bug where changing the URL hash doesn't switch the
        active tab. This should be fixed by PR #2830.
      </GoabText>

      <GoabBlock gap="l" direction="column">
        <section>
          <GoabText tag="h2">Test Instructions</GoabText>
          <GoabText tag="p">
            Test the following scenarios to verify the tabs component responds to URL
            changes:
          </GoabText>
          <ol>
            <li>
              <strong>Direct URL Hash:</strong> Click the buttons below to change URL hash
            </li>
            <li>
              <strong>Link Navigation:</strong> Click the links inside the tabs to
              navigate to other tabs
            </li>
            <li>
              <strong>Programmatic Change:</strong> Use the "Simulate Search" button to
              test programmatic tab switching
            </li>
            <li>
              <strong>Manual URL:</strong> Manually change the URL hash in the browser
              address bar
            </li>
          </ol>
        </section>

        <section>
          <GoabText tag="h2">Test Controls</GoabText>
          <GoabBlock gap="s" direction="row">
            <GoabButton type="secondary" size="compact" onClick={() => changeToTab(0)}>
              Switch to Profile Tab
            </GoabButton>
            <GoabButton type="secondary" size="compact" onClick={() => changeToTab(1)}>
              Switch to Settings Tab
            </GoabButton>
            <GoabButton type="secondary" size="compact" onClick={() => changeToTab(2)}>
              Switch to Help Tab
            </GoabButton>
            <GoabButton type="primary" size="compact" onClick={simulateSearch}>
              Simulate Search (Switch to Settings)
            </GoabButton>
            <GoabButton type="secondary" size="compact" onClick={resetTest}>
              Reset Log
            </GoabButton>
          </GoabBlock>

          <GoabText tag="p">
            <strong>Current Tab:</strong> {currentTab} ({getTabName(currentTab)})
          </GoabText>
        </section>

        <section>
          <GoabText tag="h2">Tabs Component Test</GoabText>
          <GoabTabs initialTab={0} onChange={handleTabChange}>
            <GoabTab
              heading={
                <>
                  <div className="hello">Unread</div>
                  <div>
                    <GoabBadge type="important" content="17" />
                  </div>
                </>
              }
            >
              <GoabBlock gap="m" direction="column">
                <GoabText tag="h3">Profile Tab Content</GoabText>
                <GoabText tag="p">
                  This is the Profile tab. You can navigate to other tabs using the links
                  below:
                </GoabText>
                <GoabBlock gap="s" direction="row">
                  <GoabLink>
                    <a href="#tab-1">Go to Settings Tab</a>
                  </GoabLink>
                  <GoabLink>
                    <a href="#tab-2">Go to Help Tab</a>
                  </GoabLink>
                </GoabBlock>
                <GoabText tag="p">
                  <strong>Expected Behavior:</strong> Clicking these links should change
                  the URL and switch the active tab.
                </GoabText>
              </GoabBlock>
            </GoabTab>

            <GoabTab heading="Settings">
              <GoabBlock gap="m" direction="column">
                <GoabText tag="h3">Settings Tab Content</GoabText>
                <GoabText tag="p">
                  This is the Settings tab. You can navigate to other tabs using the links
                  below:
                </GoabText>
                <GoabBlock gap="s" direction="row">
                  <GoabLink>
                    <a href="#tab-0">Go to Profile Tab</a>
                  </GoabLink>
                  <GoabLink>
                    <a href="#tab-2">Go to Help Tab</a>
                  </GoabLink>
                </GoabBlock>
                <GoabText tag="p">
                  <strong>Expected Behavior:</strong> Clicking these links should change
                  the URL and switch the active tab.
                </GoabText>
              </GoabBlock>
            </GoabTab>

            <GoabTab heading="Help">
              <GoabBlock gap="m" direction="column">
                <GoabText tag="h3">Help Tab Content</GoabText>
                <GoabText tag="p">
                  This is the Help tab. You can navigate to other tabs using the links
                  below:
                </GoabText>
                <GoabBlock gap="s" direction="row">
                  <GoabLink>
                    <a href="#tab-0">Go to Profile Tab</a>
                  </GoabLink>
                  <GoabLink>
                    <a href="#tab-1">Go to Settings Tab</a>
                  </GoabLink>
                </GoabBlock>
                <GoabText tag="p">
                  <strong>Expected Behavior:</strong> Clicking these links should change
                  the URL and switch the active tab.
                </GoabText>
              </GoabBlock>
            </GoabTab>
          </GoabTabs>
        </section>

        <section>
          <GoabText tag="h2">Tab Change Event Log</GoabText>
          {tabChangeLog.length > 0 ? (
            <div
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                backgroundColor: "#f9f9f9",
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              {tabChangeLog.map((log, index) => (
                <div
                  key={index}
                  style={{ marginBottom: "0.5rem", fontFamily: "monospace" }}
                >
                  {log}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontStyle: "italic", color: "#666" }}>
              <GoabText tag="p">
                No tab change events yet. Try changing tabs or using the test controls
                above.
              </GoabText>
            </div>
          )}
        </section>

        <section>
          <GoabText tag="h3">Expected Behavior (After Fix):</GoabText>
          <ul>
            <li>URL hash changes should automatically switch the active tab</li>
            <li>Links within tabs should navigate to other tabs</li>
            <li>Programmatic URL changes should trigger tab switches</li>
            <li>Manual URL hash changes should work</li>
            <li>All tab change events should be logged</li>
          </ul>
        </section>

        <section>
          <GoabText tag="h3">Bug Description:</GoabText>
          <GoabText tag="p">
            Before the fix, changing the URL hash (via links, programmatic changes, or
            manual entry) would update the URL but not switch the active tab. The tabs
            component wasn't listening for hash change events.
          </GoabText>
        </section>
      </GoabBlock>
    </main>
  );
};
