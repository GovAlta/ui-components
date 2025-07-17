import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoabText } from './text';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('GoabText', () => {
  let component: GoabText;
  let fixture: ComponentFixture<GoabText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoabText],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(GoabText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render text content', () => {
    const testText = 'Test Content';
    const compiled = fixture.nativeElement as HTMLElement;
    compiled.innerHTML = testText;
    fixture.detectChanges();

    expect(compiled.textContent).toContain(testText);
  });

  it('should render with all properties', () => {
    component.tag = 'h1';
    component.maxWidth = '100px';
    component.size = 'heading-xl';
    component.color = 'secondary';
    component.mt = 's';
    component.mr = 'm';
    component.mb = 'l';
    component.ml = 'xl';
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('goa-text');
    expect(element.getAttribute('as')).toBe('h1');
    expect(element.getAttribute('maxwidth')).toBe('100px');
    expect(element.getAttribute('size')).toBe('heading-xl');
    expect(element.getAttribute('color')).toBe('secondary');
    expect(element.getAttribute('mt')).toBe('s');
    expect(element.getAttribute('mr')).toBe('m');
    expect(element.getAttribute('mb')).toBe('l');
    expect(element.getAttribute('ml')).toBe('xl');
  });

  it('should handle undefined properties', () => {
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('goa-text');

    expect(element.getAttribute('as')).toBeNull();
    expect(element.getAttribute('maxwidth')).toBeNull();
    expect(element.getAttribute('size')).toBeNull();
    expect(element.getAttribute('color')).toBeNull();
    expect(element.getAttribute('id')).toBeNull();
    expect(element.getAttribute('mt')).toBeNull();
    expect(element.getAttribute('mr')).toBeNull();
    expect(element.getAttribute('mb')).toBeNull();
    expect(element.getAttribute('ml')).toBeNull();
  });

  it('should apply id property correctly', () => {
    const testId = 'test-angular-id';
    component.id = testId;
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('goa-text');
    expect(element.getAttribute('id')).toBe(testId);
  });

  it('should handle id with other properties', () => {
    const testId = 'combined-angular-id';
    component.id = testId;
    component.tag = 'h2';
    component.size = 'heading-m';
    component.color = 'primary';
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('goa-text');
    expect(element.getAttribute('id')).toBe(testId);
    expect(element.getAttribute('as')).toBe('h2');
    expect(element.getAttribute('size')).toBe('heading-m');
    expect(element.getAttribute('color')).toBe('primary');
  });
});
