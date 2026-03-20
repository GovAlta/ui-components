import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabStickyContainer } from "./sticky-container";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabStickyContainer],
  template: `
    <goab-sticky-container
      [height]="height"
      [testId]="testId"
      [header]="header"
      [footer]="footer"
    >
      <ng-template #header>
        <div class="test-header">Header Content</div>
      </ng-template>
      <ng-template #footer>
        <div class="test-footer">Footer Content</div>
      </ng-template>
      <div class="test-body">Body Content</div>
    </goab-sticky-container>
  `,
})
class TestStickyContainerComponent {
  height?: string = "400px";
  testId?: string = "sticky-test";
}

describe("GoabStickyContainer", () => {
  let fixture: ComponentFixture<TestStickyContainerComponent>;
  let component: TestStickyContainerComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabStickyContainer, TestStickyContainerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestStickyContainerComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render the goa-sticky-container element", () => {
    const el = fixture.debugElement.query(By.css("goa-sticky-container"))?.nativeElement;
    expect(el).toBeTruthy();
  });

  it("should set the height attribute", () => {
    const el = fixture.debugElement.query(By.css("goa-sticky-container"))?.nativeElement;
    expect(el?.getAttribute("height")).toBe("400px");
  });

  it("should set the testid attribute", () => {
    const el = fixture.debugElement.query(By.css("goa-sticky-container"))?.nativeElement;
    expect(el?.getAttribute("testid")).toBe("sticky-test");
  });

  it("should render header slot content", () => {
    const el = fixture.debugElement.query(By.css("goa-sticky-container"))?.nativeElement;
    const headerSlot = el?.querySelector("[slot='header']");
    expect(headerSlot).toBeTruthy();
    expect(headerSlot?.innerHTML).toContain("Header Content");
  });

  it("should render footer slot content", () => {
    const el = fixture.debugElement.query(By.css("goa-sticky-container"))?.nativeElement;
    const footerSlot = el?.querySelector("[slot='footer']");
    expect(footerSlot).toBeTruthy();
    expect(footerSlot?.innerHTML).toContain("Footer Content");
  });

  it("should render body content", () => {
    const el = fixture.debugElement.query(By.css("goa-sticky-container"))?.nativeElement;
    expect(el?.innerHTML).toContain("Body Content");
  });
});
