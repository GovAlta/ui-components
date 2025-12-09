import { JSX, useState } from "react";
import {
  GoabButton,
  GoabFormItem,
  GoabInput,
  GoabPageBlock,
  GoabPushDrawer,
  GoabTable,
} from "@abgov/react-components";
import { GoabInputOnChangeDetail } from "@abgov/ui-components-common";

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
  const smallDrawerControlSet = (
    <div key={`key=${Date.now()}`}>
      <h1>Drawer</h1>
      <p>This is a drawer</p>
    </div>
  );

  const pageStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    minHeight: "80vh",
  };

  const pageContainerStyles: React.CSSProperties = {
    flex: "1 1 0%",
    overflow: "hidden",
    border: "1px solid green",
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

  const actions = (
    <GoabButton type="secondary" onClick={() => togglePushDrawerOpen()}>
      Close
    </GoabButton>
  );

  return (
    <GoabPageBlock width="100%">
      <div style={pageStyle}>
        <div style={pageContainerStyles} test-id="container">
          <h1>Pushed In Content</h1>
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <GoabButton onClick={togglePushDrawerOpen}>
              {pushDrawerOpen ? "Close" : "Open"} Push Drawer
            </GoabButton>
          </div>
          <GoabFormItem label="Width">
            <GoabInput
              name="width"
              type="text"
              value={drawerWidth}
              width="20ch"
              onChange={onWidthChange}
            ></GoabInput>
          </GoabFormItem>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <GoabButton onClick={clearTableData}>Clear Table Data</GoabButton>
            <GoabButton onClick={addTableData}>Add Table Data</GoabButton>
            <GoabButton onClick={clearDrawerContent}>Clear Drawer Content</GoabButton>
            <GoabButton onClick={addDrawerContent}>Add Drawer Content</GoabButton>
          </div>
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
          testid="drawer"
          open={pushDrawerOpen}
          heading="Push Drawer"
          width={drawerWidth}
          onClose={closePushDrawer}
          actions={actions}
        >
          {pushDrawerControls}
          <GoabButton onClick={closePushDrawer}>Close</GoabButton>
        </GoabPushDrawer>
      </div>
    </GoabPageBlock>
  );
}
