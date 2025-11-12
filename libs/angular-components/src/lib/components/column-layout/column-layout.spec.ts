import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabColumnLayout } from "./column-layout";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabColumnLayout],
  template: `
    <goab-column-layout>
      <p>Testing children</p>
    </goab-column-layout>
  `,
})
class TestColumnLayoutComponent {}

describe("GoABColumnLayout", () => {
  let fixture: ComponentFixture<TestColumnLayoutComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [GoabColumnLayout, TestColumnLayoutComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestColumnLayoutComponent);
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
  }));

  it("should render", () => {
    const el = fixture.debugElement.query(By.css("goa-one-column-layout")).nativeElement;
    expect(el).toBeTruthy();

    expect(el?.innerHTML).toContain("Testing children");
  });
});
