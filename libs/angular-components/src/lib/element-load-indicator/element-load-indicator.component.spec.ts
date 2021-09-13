import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoAElementLoadIndicatorComponent } from './element-load-indicator.component';

describe('GoAElementLoadIndicatorComponent', () => {
  let component: GoAElementLoadIndicatorComponent;
  let fixture: ComponentFixture<GoAElementLoadIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoAElementLoadIndicatorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoAElementLoadIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
