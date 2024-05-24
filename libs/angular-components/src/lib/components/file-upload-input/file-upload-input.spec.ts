import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ABGovFileUploadInput } from "./file-upload-input";

let component: ABGovFileUploadInput;
let fixture: ComponentFixture<ABGovFileUploadInput>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ABGovFileUploadInput],
  });
  fixture = TestBed.createComponent(ABGovFileUploadInput);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
