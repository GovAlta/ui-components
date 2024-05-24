import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovNotificationBanner } from "./notification-banner";

let component: ABGovNotificationBanner;
let fixture: ComponentFixture<ABGovNotificationBanner>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovNotificationBanner],
  });
  fixture = TestBed.createComponent(ABGovNotificationBanner);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
