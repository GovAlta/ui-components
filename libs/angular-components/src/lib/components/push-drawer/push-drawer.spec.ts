import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabPushDrawer } from "./push-drawer";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabPushDrawer],
  template: `
    <goab-push-drawer
      [open]="open"
      [heading]="heading"
      [testId]="testId"
      [width]="width"
      (onClose)="closePushDrawer()"
    >
      <p>This is the content of the push drawer.</p>
      <button (click)="closePushDrawer()">Close</button>
    </goab-push-drawer>
  `,
})
class TestPushDrawerComponent {
  open = true;
  heading = "Push Drawer";
  testId = "test-drawer";
  width = "400px";

  closePushDrawer = () => {
    this.open = false;
  };
}

describe("GoabPushDrawer", () => {
  let fixture: ComponentFixture<TestPushDrawerComponent>;
  let component: TestPushDrawerComponent;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabPushDrawer, TestPushDrawerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestPushDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    tick(); // Wait for component initialization
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("renders a goab-push-drawer", fakeAsync(() => {
    const el = fixture.debugElement.query(By.css("goa-push-drawer"));
    expect(el).toBeTruthy();
  }));

  describe("attributes", () => {
    it("renders with testId", fakeAsync(() => {
      const el = fixture.debugElement.query(By.css("goa-push-drawer"));
      expect(el.attributes["test-id"]).toBe("test-drawer");
    }));

    it("passes heading", fakeAsync(() => {
      const el = fixture.debugElement.query(By.css("goa-push-drawer"));
      expect(el.attributes["heading"]).toBe("Push Drawer");
    }));
  });
});
