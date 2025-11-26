import React from 'react';
import { render } from '@testing-library/react';
import GoabText from './text';
import { GoabTextHeadingElement, GoabTextTextElement } from "@abgov/ui-components-common";

describe('GoabText', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GoabText>Test Content</GoabText>);
    expect(baseElement).toBeTruthy();
  });

  it('should render content correctly', () => {
    const testText = 'Test Content';
    const { getByText } = render(<GoabText>{testText}</GoabText>);
    expect(getByText(testText)).toBeTruthy();
  });

  it('should set as attribute using tag property', () => {
    const { container } = render(<GoabText tag="h2">Heading</GoabText>);
    const element = container.querySelector('goa-text');

    expect(element).toBeTruthy();
    expect(element?.getAttribute('as')).toBe('h2');
  });

  it('should prioritize `tag` property over `as` property', () => {
    const { container } = render(
      <GoabText as="h1" tag="h3">Heading</GoabText>
    );
    const element = container.querySelector('goa-text');

    expect(element?.getAttribute('as')).toBe('h3');
  });

  it('should handle tag property with other properties', () => {
    const { container } = render(
      <GoabText
        tag="p"
        size="body-l"
        maxWidth="480px"
        color="primary"
        mt="m"
        mb="l"
      >
        Paragraph Text
      </GoabText>
    );

    const element = container.querySelector('goa-text');
    expect(element?.getAttribute('as')).toBe('p');
    expect(element?.getAttribute('size')).toBe('body-l');
    expect(element?.getAttribute('maxwidth')).toBe('480px');
    expect(element?.getAttribute('color')).toBe('primary');
    expect(element?.getAttribute('mt')).toBe('m');
    expect(element?.getAttribute('mb')).toBe('l');
  });

  it('should handle different tag values', () => {
    const cases = [
      { tag: 'p', name: 'paragraph' },
      { tag: 'span', name: 'span' },
      { tag: 'h1', name: 'heading 1' },
      { tag: 'h6', name: 'heading 6' }
    ];

    cases.forEach(({ tag, name }) => {
      const { container } = render(
        <GoabText tag={tag as GoabTextTextElement | GoabTextHeadingElement}>{name}</GoabText>
      );

      const element = container.querySelector('goa-text');
      expect(element?.getAttribute('as')).toBe(tag);
    });
  });

  it('should apply id to the web component host', () => {
    const { container } = render(<GoabText id="react-text-id">Content</GoabText>);
    const element = container.querySelector('goa-text');

    expect(element?.getAttribute('id')).toBe('react-text-id');
  });
});
