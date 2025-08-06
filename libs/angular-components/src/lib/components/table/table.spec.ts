import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabTable } from "./table";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  GoabTableOnSortDetail,
  GoabTableVariant,
  Spacing,
} from "@abgov/ui-components-common";
import { fireEvent } from "@testing-library/dom";

@Component({
  standalone: true,
  imports: [GoabTable],
  template: `
    <goab-table
      [width]="width"
      [variant]="variant"
      [testId]="testId"
      [mt]="mt"
      [mb]="mb"
      [mr]="mr"
      [ml]="ml"
      (onSort)="onSort($event)"
    >
      <thead>
        <tr>
          <th>Column 1</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Row 1</td>
        </tr>
      </tbody>
    </goab-table>
  `,
})
class TestTableComponent {
  width?: string;
  variant?: GoabTableVariant;
  testId?: string;
  mt?: Spacing;
  mb?: Spacing;
  mr?: Spacing;
  ml?: Spacing;

  onSort(event: GoabTableOnSortDetail) {
    /** do nothing **/
  }
}

describe("GoabTable", () => {
  let fixture: ComponentFixture<TestTableComponent>;
  let component: TestTableComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabTable, TestTableComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestTableComponent);
    component = fixture.componentInstance;

    component.width = "200px";
    component.variant = "relaxed";
    component.testId = "foo";
    component.mt = "s" as Spacing;
    component.mb = "xl" as Spacing;
    component.ml = "m" as Spacing;
    component.mr = "2xl" as Spacing;

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render", () => {
    const el = fixture.nativeElement.querySelector("goa-table");
    expect(el?.getAttribute("width")).toBe(component.width);
    expect(el?.getAttribute("variant")).toBe(component.variant);
    expect(el?.getAttribute("testid")).toBe(component.testId);
    expect(el?.getAttribute("mt")).toBe(component.mt);
    expect(el?.getAttribute("mb")).toBe(component.mb);
    expect(el?.getAttribute("mr")).toBe(component.mr);
    expect(el?.getAttribute("ml")).toBe(component.ml);
    // Check table
    const table = el?.querySelector("table");
    expect(table).toBeTruthy();
    expect(table.getAttribute("style")).toContain("width: 100%");
    expect(table.querySelector("thead")?.textContent).toContain("Column 1");
    expect(table.querySelector("tbody")?.textContent).toContain("Row 1");
  });

  it("should dispatch _sort", () => {
    const onSort = jest.spyOn(component, "onSort");
    const el = fixture.nativeElement.querySelector("goa-table");
    fireEvent(
      el,
      new CustomEvent("_sort", {
        detail: { sortBy: "column1", sortDir: 1 },
      }),
    );

    expect(onSort).toHaveBeenCalledWith({ sortBy: "column1", sortDir: 1 });
  });
});
