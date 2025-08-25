import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabDataGrid } from "./data-grid";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  standalone: true,
  imports: [GoabDataGrid],
  template: `
    <goab-data-grid
      [keyboardIconVisibility]="keyboardIconVisibility"
      [keyboardIconPosition]="keyboardIconPosition"
      [keyboardNav]="keyboardNav">
      <div>Test content</div>
    </goab-data-grid>
  `
})
class TestDataGridComponent {
  keyboardIconVisibility: "visible" | "hidden" = "visible";
  keyboardIconPosition: "left" | "right" = "left";
  keyboardNav: "layout" | "table" = "table";
}

describe("GoabDataGrid", () => {
  let fixture: ComponentFixture<TestDataGridComponent>;
  let component: TestDataGridComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoabDataGrid, TestDataGridComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestDataGridComponent);
    component = fixture.componentInstance;
  });

  it("should create component and render goa-data-grid with projected content", fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(component).toBeTruthy();

    const dataGridElement = fixture.debugElement.query(By.css("goa-data-grid"))?.nativeElement;
    expect(dataGridElement).toBeTruthy();
    expect(dataGridElement.textContent).toContain("Test content");
    expect(dataGridElement.getAttribute("keyboard-icon-visibility")).toBe("visible");
    expect(dataGridElement.getAttribute("keyboard-icon-position")).toBe("left");
  }));

  it("should hide keyboard icon when keyboardIconVisibility is hidden", fakeAsync(() => {
    component.keyboardIconVisibility = "hidden";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const dataGridElement = fixture.debugElement.query(By.css("goa-data-grid"))?.nativeElement;
    expect(dataGridElement).toBeTruthy();
    expect(dataGridElement.getAttribute("keyboard-icon-visibility")).toBe("hidden");
  }));

  it("should set keyboard icon position to right", fakeAsync(() => {
    component.keyboardIconPosition = "right";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const dataGridElement = fixture.debugElement.query(By.css("goa-data-grid"))?.nativeElement;
    expect(dataGridElement).toBeTruthy();
    expect(dataGridElement.getAttribute("keyboard-icon-position")).toBe("right");
  }));

  it("should set keyboardNav to table mode", fakeAsync(() => {
    component.keyboardNav = "table";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const dataGridElement = fixture.debugElement.query(By.css("goa-data-grid"))?.nativeElement;
    expect(dataGridElement).toBeTruthy();
    expect(dataGridElement.getAttribute("keyboard-nav")).toBe("table");
  }));

  it("should set keyboardNav to layout mode", fakeAsync(() => {
    component.keyboardNav = "layout";
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const dataGridElement = fixture.debugElement.query(By.css("goa-data-grid"))?.nativeElement;
    expect(dataGridElement).toBeTruthy();
    expect(dataGridElement.getAttribute("keyboard-nav")).toBe("layout");
  }));
});
