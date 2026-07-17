import { Component } from "@angular/core";
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { GoabDropdownItem } from "./dropdown-item";

@Component({
  standalone: true,
  imports: [GoabDropdownItem],
  template: `
    <goab-dropdown-item value="red" label="Red">
      <div data-testid="rich-red">
        <strong>Red</strong>
        <span>Warm color</span>
      </div>
    </goab-dropdown-item>
  `,
})
class TestHostComponent {}

let component: GoabDropdownItem;
let fixture: ComponentFixture<GoabDropdownItem>;

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [GoabDropdownItem, TestHostComponent],
  });
  fixture = TestBed.createComponent(GoabDropdownItem);
  component = fixture.componentInstance;
});

it("should render", () => {
  expect(component).toBeTruthy();
});

it("should project content into the dropdown item", fakeAsync(() => {
  const hostFixture = TestBed.createComponent(TestHostComponent);
  hostFixture.detectChanges();
  tick();
  hostFixture.detectChanges();

  const content = hostFixture.debugElement.query(
    By.css("goa-dropdown-item [data-testid=rich-red]"),
  );
  expect(content.nativeElement.textContent).toContain("Red");
  expect(content.nativeElement.textContent).toContain("Warm color");
}));
