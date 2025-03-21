import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AngularComponentsComponent } from "./angular-components.component";

describe("AngularComponentsComponent", () => {
  let component: AngularComponentsComponent;
  let fixture: ComponentFixture<AngularComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularComponentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
