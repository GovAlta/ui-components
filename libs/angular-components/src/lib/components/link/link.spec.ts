import { ComponentFixture, TestBed } from "@angular/core/testing";
import { GoabLink } from "./link";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GoabIconType, Spacing } from "@abgov/ui-components-common";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <goab-link
      [leadingIcon]="leadingIcon"
      [trailingIcon]="trailingIcon"
      [testId]="testId"
      [mt]="mt"
      [mb]="mb"
      [ml]="ml"
      [mr]="mr"
    >
      <a href="https://example.com">Test Link</a>
    </goab-link>
  `,
})
class TestLinkComponent {
  leadingIcon?: GoabIconType;
  trailingIcon?: GoabIconType;
  testId?: string;
  mt?: Spacing;
  mb?: Spacing;
  ml?: Spacing;
  mr?: Spacing;
}

describe("GoABLink", () => {
  let fixture: ComponentFixture<TestLinkComponent>;
  let component: TestLinkComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoabLink],
      declarations: [TestLinkComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestLinkComponent);
    component = fixture.componentInstance;
    component.leadingIcon = "add";
    component.trailingIcon = "archive";
    component.testId = "test-id";
    component.mt = "xs" as Spacing;
    component.mb = "m" as Spacing;
    component.ml = "l" as Spacing;
    component.mr = "xl" as Spacing;

    fixture.detectChanges();
  });

  it("should render and set the props correctly", () => {
    const linkElement = fixture.debugElement.query(By.css("goa-link")).nativeElement;
    expect(linkElement.getAttribute("leadingicon")).toBe("add");
    expect(linkElement.getAttribute("trailingicon")).toBe("archive");
    expect(linkElement.getAttribute("testid")).toBe("test-id");
    expect(linkElement.getAttribute("mt")).toBe("xs");
    expect(linkElement.getAttribute("mb")).toBe("m");
    expect(linkElement.getAttribute("ml")).toBe("l");
    expect(linkElement.getAttribute("mr")).toBe("xl");
  });
});
