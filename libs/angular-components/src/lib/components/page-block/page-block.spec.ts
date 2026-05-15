import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabPageBlock } from "./page-block";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabPageBlockSize } from "@abgov/ui-components-common";

@Component({
  standalone: true,
  imports: [GoabPageBlock],
  template: `
    <goab-page-block [width]="width" [testId]="testId">
      <div>Inner content</div>
    </goab-page-block>
  `,
})
class TestPageBlockComponent {
  width?: GoabPageBlockSize;
  testId?: string;
}

describe("GoabPageBlock", () => {
  let fixture: ComponentFixture<TestPageBlockComponent>;
  let component: TestPageBlockComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestPageBlockComponent, GoabPageBlock],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestPageBlockComponent);
    component = fixture.componentInstance;

    component.testId = "testId";
    component.width = "full";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render", () => {
    const el = fixture.nativeElement.querySelector("goa-page-block");
    expect(el).toBeTruthy();

    expect(el.getAttribute("width")).toBe(component.width);
    expect(el.getAttribute("testid")).toBe(component.testId);
    expect(el.innerHTML).toContain("Inner content");
  });
});
