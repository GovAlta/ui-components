import { JSX, useState, useEffect } from "react";
import {
  GoabButton,
  GoabFormItem,
  GoabInput,
  GoabPageBlock,
  GoabPushDrawer,
  GoabTable,
} from "@abgov/react-components";

import { GoabInputOnChangeDetail } from "@abgov/ui-components-common";
import v2TokensUrl from "@abgov/design-tokens-v2/dist/tokens.css?url";

type DataTableFields = {
  firstName: string;
  lastName: string;
  numberCol: number;
};

const fakeFirstNames = ["Christian", "Brian", "Neha", "Tristan"];
const fakeLastNames = ["Batz", "Wisozk", "Jones", "Buckridge"];

function generateFakeData(numRows: number): DataTableFields[] {
  const data: DataTableFields[] = [];
  for (let i = 0; i < numRows; i++) {
    const firstName = fakeFirstNames[Math.floor(Math.random() * fakeFirstNames.length)];
    const lastName = fakeLastNames[Math.floor(Math.random() * fakeLastNames.length)];
    const numberCol = Math.floor(Math.random() * 100000000);
    data.push({ firstName, lastName, numberCol });
  }
  return data;
}

export function Feat2469Route(): JSX.Element {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = v2TokensUrl;
    document.head.appendChild(link);

    const deletedRules: Array<{ sheet: CSSStyleSheet; index: number; cssText: string }> =
      [];

    link.onload = () => {
      [...document.styleSheets].forEach((ss) => {
        if (ss.ownerNode === link) return;
        try {
          for (let i = ss.cssRules.length - 1; i >= 0; i--) {
            const rule = ss.cssRules[i];
            if (rule instanceof CSSStyleRule && rule.selectorText === ":root") {
              deletedRules.push({ sheet: ss, index: i, cssText: rule.cssText });
              ss.deleteRule(i);
            }
          }
        } catch (e) {
          // skip cross-origin sheets
        }
      });
    };

    return () => {
      link.remove();
      deletedRules.forEach(({ sheet, index, cssText }) => {
        try {
          sheet.insertRule(cssText, Math.min(index, sheet.cssRules.length));
        } catch (e) {
          // skip if sheet is no longer available
        }
      });
    };
  }, []);

  const smallDrawerControlSet = (
    <div key={`key=${Date.now()}`}>
      <h1 style={{ marginTop: 0 }}>Drawer</h1>
      <p>This is a drawer</p>
    </div>
  );

  // Simulates a full-screen app layout (like the workspace app).
  // Fixed height container where content scrolls internally.
  const appShellBase: React.CSSProperties = {
    height: "80vh",
    display: "flex",
    flexDirection: "row",
    border: "2px solid #666",
    borderRadius: "8px",
    overflow: "hidden",
    margin: "16px 0",
    padding: 0,
  };

  const v2ShellStyle: React.CSSProperties = {
    ...appShellBase,
    background: "var(--goa-color-greyscale-50)",
  };

  const v2PageContainerStyles: React.CSSProperties = {
    flex: "1 1 0%",
    overflowY: "auto",
    padding: "var(--goa-space-l)",
    margin:
      "var(--goa-drawer-offset, 16px) 0 var(--goa-drawer-offset, 16px) var(--goa-drawer-offset, 16px)",
    borderRadius: "var(--goa-push-drawer-border-radius)",
    border: "var(--goa-border-width-s) solid var(--goa-color-greyscale-150)",
    background: "var(--goa-color-greyscale-white)",
  };

  const v1PageContainerStyles: React.CSSProperties = {
    flex: "1 1 0%",
    overflowY: "auto",
    padding: "16px",
  };

  const [pushDrawerOpen, setPushDrawerOpen] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState("500px");
  const [tableData, setTableData] = useState<DataTableFields[]>(generateFakeData(5));
  const [pushDrawerControls, setPushDrawerControls] = useState<JSX.Element[]>([
    smallDrawerControlSet,
  ]);
  const togglePushDrawerOpen = () => {
    setPushDrawerOpen(!pushDrawerOpen);
  };
  const closePushDrawer = () => {
    setPushDrawerOpen(false);
  };
  const clearTableData = () => {
    setTableData([]);
  };
  const addTableData = () => {
    setTableData([...tableData, ...generateFakeData(1)]);
  };
  const addDrawerContent = () => {
    setPushDrawerControls([
      ...pushDrawerControls,
      <div key={Date.now()}>
        <h2>Additional Content</h2>
        <p>More drawer content added at ${new Date().toLocaleTimeString()}</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>,
    ]);
  };
  const clearDrawerContent = () => {
    setPushDrawerControls([smallDrawerControlSet]);
  };
  const onWidthChange = (detail: GoabInputOnChangeDetail<string>) => {
    setDrawerWidth(detail.value);
  };

  const [showActions, setShowActions] = useState(true);
  const actions = showActions ? (
    <GoabButton type="secondary" size="compact" onClick={() => togglePushDrawerOpen()}>
      Close
    </GoabButton>
  ) : undefined;

  // --- V1 state ---
  const [v1Open, setV1Open] = useState(false);
  const [v1Controls, setV1Controls] = useState<JSX.Element[]>([smallDrawerControlSet]);
  const [v1ShowActions, setV1ShowActions] = useState(true);
  const v1Actions = v1ShowActions ? (
    <GoabButton type="secondary" onClick={() => setV1Open(false)}>
      Close
    </GoabButton>
  ) : undefined;

  return (
    <GoabPageBlock width="100%">
      <h2>V2 (Experimental)</h2>
      <div
        style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}
      >
        <GoabButton onClick={togglePushDrawerOpen}>
          {pushDrawerOpen ? "Close" : "Open"} Push Drawer
        </GoabButton>
        <GoabFormItem label="Width" mb="none">
          <GoabInput
            name="width"
            type="text"
            value={drawerWidth}
            width="12ch"
            onChange={onWidthChange}
          ></GoabInput>
        </GoabFormItem>
        <GoabButton onClick={clearTableData}>Clear Table</GoabButton>
        <GoabButton onClick={addTableData}>Add Row</GoabButton>
        <GoabButton onClick={clearDrawerContent}>Clear Drawer</GoabButton>
        <GoabButton onClick={addDrawerContent}>Add Drawer Content</GoabButton>
        <GoabButton onClick={() => setShowActions(!showActions)}>
          {showActions ? "Remove Actions" : "Add Actions"}
        </GoabButton>
      </div>
      <div style={v2ShellStyle}>
        <div style={v2PageContainerStyles}>
          <h2 style={{ marginTop: 0 }}>Page Content</h2>
          <GoabTable width="100%">
            <thead>
              <tr>
                <th>First</th>
                <th>Last</th>
                <th className="goa-table-number-header">Number Column</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.firstName}</td>
                  <td>{row.lastName}</td>
                  <td className="goa-table-number-column">{row.numberCol}</td>
                </tr>
              ))}
            </tbody>
          </GoabTable>
        </div>
        <GoabPushDrawer
          testId="drawer"
          open={pushDrawerOpen}
          heading="Push Drawer"
          width={drawerWidth}
          onClose={closePushDrawer}
          actions={actions}
        >
          {pushDrawerControls}
        </GoabPushDrawer>
      </div>

      <h2 style={{ marginTop: "48px" }}>V1 (Standard)</h2>
      <div
        style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}
      >
        <GoabButton onClick={() => setV1Open(!v1Open)}>
          {v1Open ? "Close" : "Open"} Push Drawer
        </GoabButton>
        <GoabButton
          onClick={() =>
            setV1Controls([
              ...v1Controls,
              <div key={Date.now()}>
                <h2>Additional Content</h2>
                <p>More drawer content</p>
                <ul>
                  <li>Item 1</li>
                  <li>Item 2</li>
                  <li>Item 3</li>
                </ul>
              </div>,
            ])
          }
        >
          Add Drawer Content
        </GoabButton>
        <GoabButton onClick={() => setV1Controls([smallDrawerControlSet])}>
          Clear Drawer Content
        </GoabButton>
        <GoabButton onClick={() => setV1ShowActions(!v1ShowActions)}>
          {v1ShowActions ? "Remove Actions" : "Add Actions"}
        </GoabButton>
      </div>
      <div style={appShellBase}>
        <div style={v1PageContainerStyles}>
          <h2 style={{ marginTop: 0 }}>Page Content</h2>
          <p>V1 push drawer for comparison.</p>
        </div>
        <GoabPushDrawer
          testId="v1-drawer"
          open={v1Open}
          heading="Push Drawer (V1)"
          width="500px"
          onClose={() => setV1Open(false)}
          actions={v1Actions}
        >
          {v1Controls}
        </GoabPushDrawer>
      </div>
    </GoabPageBlock>
  );
}
