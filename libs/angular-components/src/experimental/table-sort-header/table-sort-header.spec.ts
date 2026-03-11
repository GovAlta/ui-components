import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabxTableSortHeader } from "./table-sort-header";

@Component({
  standalone: true,
  imports: [GoabxTableSortHeader],
  template: `
    <th>
      <goabx-table-sort-header name="firstName" direction="asc">
        First name and really long header
      </goabx-table-sort-header>
    </th>
  `,
})
class TestTableSortHeaderComponent {
  /** do nothing **/
}

@Component({
  standalone: true,
  imports: [GoabxTableSortHeader],
  template: `
    <th>
      <goabx-table-sort-header name="salary" direction="desc" [sortOrder]="2">
        Salary
      </goabx-table-sort-header>
    </th>
  `,
})
class TestTableSortHeaderWithSortOrderComponent {
  /** do nothing **/
}

describe("GoABTableSortHeader", () => {
  let fixture: ComponentFixture<TestTableSortHeaderComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabxTableSortHeader, TestTableSortHeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestTableSortHeaderComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render", () => {
    const el = fixture.nativeElement.querySelector("goa-table-sort-header");
    expect(el?.getAttribute("direction")).toBe("asc");
    expect(el?.getAttribute("name")).toBe("firstName");
    expect(el?.textContent).toContain("First name and really long header");
  });
});

describe("GoABTableSortHeader with sortOrder", () => {
  let fixture: ComponentFixture<TestTableSortHeaderWithSortOrderComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabxTableSortHeader, TestTableSortHeaderWithSortOrderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestTableSortHeaderWithSortOrderComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render sort-order attribute", () => {
    const el = fixture.nativeElement.querySelector("goa-table-sort-header");
    expect(el?.getAttribute("sort-order")).toBe("2");
    expect(el?.getAttribute("direction")).toBe("desc");
    expect(el?.getAttribute("name")).toBe("salary");
  });
});
