import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import GoAText from './Text.svelte';

describe('GoAText', () => {
  it('should render successfully', () => {
    const result = render(GoAText, {});
    expect(result.container).toBeTruthy();
  });

  it('should apply id attribute when provided', () => {
    const testId = 'test-text-id';
    const result = render(GoAText, {
      id: testId,
    });
    
    const element = result.container.querySelector('#' + testId);
    expect(element).toBeTruthy();
    expect(element?.id).toBe(testId);
  });

  it('should not have id attribute when not provided', () => {
    const result = render(GoAText, {});
    
    const element = result.container.firstElementChild;
    expect(element?.hasAttribute('id')).toBe(false);
  });

  it('should apply id with other properties', () => {
    const testId = 'combined-text-id';
    const result = render(GoAText, {
      id: testId,
      as: 'h2',
      size: 'heading-m',
      color: 'secondary'
    });
    
    const element = result.container.querySelector('#' + testId);
    expect(element).toBeTruthy();
    expect(element?.tagName.toLowerCase()).toBe('h2');
    expect(element?.classList.contains('heading-m')).toBe(true);
  });

  it('should handle different tag elements with id', () => {
    const cases = [
      { as: 'p', id: 'paragraph-id' },
      { as: 'span', id: 'span-id' },
      { as: 'h1', id: 'heading-id' },
    ];

    cases.forEach(({ as, id }) => {
      const result = render(GoAText, { as, id });

      const element = result.container.querySelector('#' + id);
      expect(element).toBeTruthy();
      expect(element?.tagName.toLowerCase()).toBe(as);
      expect(element?.id).toBe(id);
    });
  });

  it('should handle empty id by not setting the attribute', () => {
    const result = render(GoAText, {
      id: '',
    });
    
    const element = result.container.firstElementChild;
    expect(element?.hasAttribute('id')).toBe(false);
  });
});