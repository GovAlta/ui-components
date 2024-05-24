import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovFileUploadCard } from "./file-upload-card";

let component: ABGovFileUploadCard;
let fixture: ComponentFixture<ABGovFileUploadCard>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovFileUploadCard],
  });
  fixture = TestBed.createComponent(ABGovFileUploadCard);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
