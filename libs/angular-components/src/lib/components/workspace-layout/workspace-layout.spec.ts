import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabWorkspaceLayout } from "./workspace-layout";
import { GoabWorkspaceLayoutScrollStateService } from "./workspace-layout-scroll-state.service";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabWorkspaceLayout],
  template: `
    <goab-workspace-layout
      [testId]="testId"
      [sideMenu]="sideMenu"
      [pageHeader]="pageHeader"
      [pageFooter]="pageFooter"
    >
      <ng-template #sideMenu>
        <div class="test-side-menu">Side Menu Content</div>
      </ng-template>
      <ng-template #pageHeader>
        <div class="test-page-header">Page Header Content</div>
      </ng-template>
      <ng-template #pageFooter>
        <div class="test-page-footer">Page Footer Content</div>
      </ng-template>
      <div class="test-body">Body Content</div>
    </goab-workspace-layout>
  `,
})
class TestWorkspaceLayoutComponent {
  testId = "ws-test";
}

describe("GoabWorkspaceLayout", () => {
  let fixture: ComponentFixture<TestWorkspaceLayoutComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabWorkspaceLayout, TestWorkspaceLayoutComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestWorkspaceLayoutComponent);

    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render the goa-workspace-layout element", () => {
    const el = fixture.debugElement.query(By.css("goa-workspace-layout"))?.nativeElement;
    expect(el).toBeTruthy();
  });

  it("should set the testid attribute", () => {
    const el = fixture.debugElement.query(By.css("goa-workspace-layout"))?.nativeElement;
    expect(el?.getAttribute("testid")).toBe("ws-test");
  });

  it("should render side-menu slot content", () => {
    const el = fixture.debugElement.query(By.css("goa-workspace-layout"))?.nativeElement;
    const slot = el?.querySelector("[slot='side-menu']");
    expect(slot).toBeTruthy();
    expect(slot?.innerHTML).toContain("Side Menu Content");
  });

  it("should render page-header slot content", () => {
    const el = fixture.debugElement.query(By.css("goa-workspace-layout"))?.nativeElement;
    const slot = el?.querySelector("[slot='page-header']");
    expect(slot).toBeTruthy();
    expect(slot?.innerHTML).toContain("Page Header Content");
  });

  it("should render page-footer slot content", () => {
    const el = fixture.debugElement.query(By.css("goa-workspace-layout"))?.nativeElement;
    const slot = el?.querySelector("[slot='page-footer']");
    expect(slot).toBeTruthy();
    expect(slot?.innerHTML).toContain("Page Footer Content");
  });

  it("should render body content", () => {
    const el = fixture.debugElement.query(By.css("goa-workspace-layout"))?.nativeElement;
    expect(el?.innerHTML).toContain("Body Content");
  });

  it("should update the scroll state service when the inner event fires", () => {
    const service = TestBed.inject(GoabWorkspaceLayoutScrollStateService);
    expect(service.scrollPosition()).toBe("no-scroll");

    const el = fixture.debugElement.query(By.css("goa-workspace-layout"))?.nativeElement as HTMLElement;
    el.dispatchEvent(
      new CustomEvent("_scrollStateChange", {
        detail: { state: "middle", isScrollable: true },
      }),
    );

    expect(service.scrollPosition()).toBe("middle");
    expect(service.isScrollable()).toBe(true);
  });
});
