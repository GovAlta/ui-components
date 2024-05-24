import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABFileUploadCard } from "./file-upload-card";

let component: GoABFileUploadCard;
let fixture: ComponentFixture<GoABFileUploadCard>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoABFileUploadCard],
  });
  fixture = TestBed.createComponent(GoABFileUploadCard);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});
