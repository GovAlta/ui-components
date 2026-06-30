import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabScrollPanel } from "./scroll-panel";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabScrollPanel],
  template: `
    <goab-scroll-panel
      [height]="height"
      [width]="width"
      [direction]="direction"
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
    </goab-scroll-panel>
  `,
})
class TestScrollPanelComponent {
  height?: string = "400px";
  width?: string = "";
  direction?: string = "vertical";
  testId?: string = "panel-test";
}

describe("GoabScrollPanel", () => {
  let fixture: ComponentFixture<TestScrollPanelComponent>;
  let component: TestScrollPanelComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabScrollPanel, TestScrollPanelComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestScrollPanelComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render the goa-scroll-panel element", () => {
    const el = fixture.debugElement.query(By.css("goa-scroll-panel"))?.nativeElement;
    expect(el).toBeTruthy();
  });

  it("should set the height attribute", () => {
    const el = fixture.debugElement.query(By.css("goa-scroll-panel"))?.nativeElement;
    expect(el?.getAttribute("height")).toBe("400px");
    // height is also applied as inline style so shadow-DOM flex layout is constrained
    expect(el?.style.height).toBe("400px");
  });

  it("should set the testid attribute", () => {
    const el = fixture.debugElement.query(By.css("goa-scroll-panel"))?.nativeElement;
    expect(el?.getAttribute("testid")).toBe("panel-test");
  });

  it("should render header slot content", () => {
    const el = fixture.debugElement.query(By.css("goa-scroll-panel"))?.nativeElement;
    const headerSlot = el?.querySelector("[slot='header']");
    expect(headerSlot).toBeTruthy();
    expect(headerSlot?.innerHTML).toContain("Header Content");
  });

  it("should render footer slot content", () => {
    const el = fixture.debugElement.query(By.css("goa-scroll-panel"))?.nativeElement;
    const footerSlot = el?.querySelector("[slot='footer']");
    expect(footerSlot).toBeTruthy();
    expect(footerSlot?.innerHTML).toContain("Footer Content");
  });

  it("should render body content", () => {
    const el = fixture.debugElement.query(By.css("goa-scroll-panel"))?.nativeElement;
    expect(el?.innerHTML).toContain("Body Content");
  });

  it("should set the width attribute", fakeAsync(() => {
    component.width = "500px";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css("goa-scroll-panel"))?.nativeElement;
    expect(el?.getAttribute("width")).toBe("500px");
    expect(el?.style.width).toBe("500px");
  }));

  it("should set the direction attribute", fakeAsync(() => {
    component.direction = "horizontal";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.css("goa-scroll-panel"))?.nativeElement;
    expect(el?.getAttribute("direction")).toBe("horizontal");
  }));
});
