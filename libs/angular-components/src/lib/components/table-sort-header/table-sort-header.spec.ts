import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabTableSortHeader } from "../table-sort-header/table-sort-header";

@Component({
  standalone: true,
  imports: [GoabTableSortHeader],
  template: `
    <th>
      <goab-table-sort-header name="firstName" direction="asc">
        First name and really long header
      </goab-table-sort-header>
    </th>
  `,
})
class TestTableSortHeaderComponent {
  /** do nothing **/
}

describe("GoABTableSortHeader", () => {
  let fixture: ComponentFixture<TestTableSortHeaderComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabTableSortHeader, TestTableSortHeaderComponent],
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
