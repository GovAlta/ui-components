import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoAAppVersionHeaderComponent } from './app-version-header.component';

describe('GoAAppVersionHeaderComponent', () => {
  let component: GoAAppVersionHeaderComponent;
  let fixture: ComponentFixture<GoAAppVersionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoAAppVersionHeaderComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoAAppVersionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit closed when the close button is clicked', () => {
    const expected = true;
    let actual = null;

    component.closed.subscribe(value => actual = value);

    component.onCloseClick();

    expect(actual).toBe(expected);
  });
});
