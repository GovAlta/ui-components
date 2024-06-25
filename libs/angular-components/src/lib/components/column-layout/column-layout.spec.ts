import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoABColumnLayout } from "./column-layout";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  template: `
  <goab-column-layout>
    <p>Testing children</p>
  </goab-column-layout>
  `
})
class TestColumnLayoutComponent {}

describe("GoABColumnLayout", () => {
  let fixture: ComponentFixture<TestColumnLayoutComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [GoABColumnLayout],
      declarations: [TestColumnLayoutComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TestColumnLayoutComponent);
    fixture.detectChanges();
  })

  it("should render", () => {
    const el = fixture.debugElement.query(By.css("goa-column-layout")).nativeElement;
    expect(el).toBeTruthy();

    expect(el?.innerHTML).toContain("Testing children");
  });

})
