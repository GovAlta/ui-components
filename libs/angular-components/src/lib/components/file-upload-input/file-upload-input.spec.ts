import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABFileUploadInput } from "./file-upload-input";

let component: GoABFileUploadInput;
let fixture: ComponentFixture<GoABFileUploadInput>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABFileUploadInput],
  });
  fixture = TestBed.createComponent(GoABFileUploadInput);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
