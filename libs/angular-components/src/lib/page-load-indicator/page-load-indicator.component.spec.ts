import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoAPageLoadIndicatorComponent } from './page-load-indicator.component';

describe('GoAPageLoadIndicatorComponent', () => {
  let component: GoAPageLoadIndicatorComponent;
  let fixture: ComponentFixture<GoAPageLoadIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoAPageLoadIndicatorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoAPageLoadIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
