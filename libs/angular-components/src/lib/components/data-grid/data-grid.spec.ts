import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { GoabDataGrid } from "./data-grid";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <goab-data-grid [keyboardIcon]="keyboardIcon" [keyboardNav]="keyboardNav">
      <div>Test content</div>
    </goab-data-grid>
  `
})
class TestDataGridComponent {
  keyboardIcon = true;
  keyboardNav: "layout" | "table" = "table";
}

describe("GoabDataGrid", () => {
  let fixture: ComponentFixture<TestDataGridComponent>;
  let component: TestDataGridComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoabDataGrid],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [TestDataGridComponent]
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
    expect(dataGridElement.hasAttribute("keyboard-icon")).toBe(true);
    expect(dataGridElement.getAttribute("keyboard-icon")).toBe("");
  }));

  it("should remove keyboard-icon attribute when set to false", fakeAsync(() => {
    component.keyboardIcon = false;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const dataGridElement = fixture.debugElement.query(By.css("goa-data-grid"))?.nativeElement;
    expect(dataGridElement).toBeTruthy();
    expect(dataGridElement.hasAttribute("keyboard-icon")).toBe(false);
    expect(dataGridElement.getAttribute("keyboard-icon")).toBeNull();
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
