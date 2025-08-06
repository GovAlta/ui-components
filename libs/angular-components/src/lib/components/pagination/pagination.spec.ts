import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabPagination } from "./pagination";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabPaginationOnChangeDetail, GoabPaginationVariant, Spacing } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  imports: [GoabPagination],
  template: `
  <goab-pagination [itemCount]="itemCount"
                    [pageNumber]="pageNumber"
                    [perPageCount]="perPageCount"
                    [variant]="variant"
                    [mt]="mt"
                    [mb]="mb"
                    [ml]="ml"
                    [mr]="mr"
                    (onChange)="onChange($event)">
  </goab-pagination>
  `
})
class TestPaginationComponent {
  itemCount = 100;
  pageNumber = 1;
  perPageCount = 20;
  variant = "all" as GoabPaginationVariant;
  mt = "s" as Spacing;
  mb = "m"  as Spacing;
  ml = "l"  as Spacing;
  mr = "xl"  as Spacing;

  onChange = (event: GoabPaginationOnChangeDetail) => {/** do nothing **/};
}

describe("GoABPagination", () => {
  let fixture: ComponentFixture<TestPaginationComponent>;
  let component: TestPaginationComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabPagination, TestPaginationComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TestPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render successfully", () => {
    const el = fixture.nativeElement.querySelector("goa-pagination");

    expect(el.getAttribute("itemcount")).toBe(`${component.itemCount}`);
    expect(el.getAttribute("pagenumber")).toBe(`${component.pageNumber}`);
    expect(el.getAttribute("perpagecount")).toBe(`${component.perPageCount}`);
    expect(el.getAttribute("variant")).toBe(component.variant);
    expect(el.getAttribute("mt")).toBe(component.mt);
    expect(el.getAttribute("mb")).toBe(component.mb);
    expect(el.getAttribute("ml")).toBe(component.ml);
    expect(el.getAttribute("mr")).toBe( component.mr);
  });

  it("should handle the onChange event", () => {
    const onChangeSpy = jest.spyOn(component, "onChange");

    const el = fixture.nativeElement.querySelector("goa-pagination");
    el.dispatchEvent(new CustomEvent("_change", { detail: { page: 2 } }));

    expect(onChangeSpy).toHaveBeenCalledWith({ page: 2 });
  });
});
