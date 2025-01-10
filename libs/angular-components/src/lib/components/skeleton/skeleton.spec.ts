import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabSkeleton } from "./skeleton";
import { Component } from "@angular/core";
import { GoabSkeletonType, Spacing } from "@abgov/ui-components-common";

@Component({
  template: `
  <goab-skeleton [type]="type"
                 [maxWidth]="maxWidth"
                 [lineCount]="lineCount"
                 [size]="size"
                 [testId]="testId"
                 [mt]="mt"
                 [mb]="mb"
                 [mr]="mr"
                 [ml]="ml"></goab-skeleton>
  `
})
class TestSkeletonComponent {
  type = "image" as GoabSkeletonType;
  maxWidth = 100;
  lineCount = 3;
  size = 10;
  testId = "foo";
  mt = "s" as Spacing;
  mb = "m" as Spacing;
  ml = "xs" as Spacing;
  mr = "xl" as Spacing;
}

describe("GoABSkeleton", () => {
  let fixture: ComponentFixture<TestSkeletonComponent>;
  let component: TestSkeletonComponent;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [TestSkeletonComponent],
      imports: [GoabSkeleton]
    }).compileComponents();

    fixture = TestBed.createComponent(TestSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it("should render successfully", () => {
    const el = fixture.nativeElement.querySelector("goa-skeleton");
    expect(el?.getAttribute("maxwidth")).toBe(`${component.maxWidth}`);
    expect(el?.getAttribute("size")).toBe(`${component.size}`);
    expect(el?.getAttribute("linecount")).toBe(`${component.lineCount}`);
    expect(el?.getAttribute("type")).toBe(component.type);
    expect(el?.getAttribute("mt")).toBe(component.mt);
    expect(el?.getAttribute("mb")).toBe(component.mb);
    expect(el?.getAttribute("ml")).toBe(component.ml);
    expect(el?.getAttribute("mr")).toBe(component.mr);
  })
})
