import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
  GoabButton,
  GoabInput,
  GoabPageBlock,
  GoabPushDrawer,
  GoabTable,
} from "@abgov/angular-components";

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

@Component({
  standalone: true,
  selector: "abgov-feat2469",
  templateUrl: "./feat2469.component.html",
  styleUrls: ["./feat2469.component.css"],
  imports: [
    CommonModule,
    FormsModule,
    GoabButton,
    GoabInput,
    GoabPageBlock,
    GoabPushDrawer,
    GoabTable,
  ],
})
export class Feat2469Component {
  pushDrawerOpen = false;
  drawerWidth = "500px";
  tableData: DataTableFields[] = generateFakeData(5);
  pushDrawerControls = `
    <div>
      <h1>Drawer</h1>
      <p>This is a drawer</p>
    </div>
  `;

  togglePushDrawerOpen(): void {
    this.pushDrawerOpen = !this.pushDrawerOpen;
  }

  clearTableData(): void {
    this.tableData = [];
  }

  addTableData(): void {
    this.tableData = [...this.tableData, ...generateFakeData(5)];
  }

  closePushDrawer(): void {
    this.pushDrawerOpen = false;
  }

  addDrawerContent(): void {
    this.pushDrawerControls += `
      <h2>Additional Content</h2>
      <p>More drawer content added at ${new Date().toLocaleTimeString()}</p>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    `;
  }
}
