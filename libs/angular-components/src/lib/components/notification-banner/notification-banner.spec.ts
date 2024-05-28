import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABNotificationBanner } from "./notification-banner";

let component: GoABNotificationBanner;
let fixture: ComponentFixture<GoABNotificationBanner>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABNotificationBanner],
  });
  fixture = TestBed.createComponent(GoABNotificationBanner);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
