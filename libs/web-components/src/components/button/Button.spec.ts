import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/svelte';
import GoAButton from './Button.svelte'

describe('GoAButtonComponent', () => {

  it('should render', async () => {
    const buttonText = 'Test Title';
    const baseElement = render(GoAButton, { title: buttonText });
    const button = await baseElement.findByRole('button');

    expect(button).toBeTruthy();
    expect(button).toContainHTML(buttonText)
  });

  describe("events", () => {
    it('should handle the click event', async () => {
      const onClick = jest.fn();
      const results = render(GoAButton, { testid: 'button-test' });
      const button = await results.findByTestId('button-test');

      button.addEventListener('_click', onClick)
      expect(button).not.toBeNull();

      await fireEvent.click(button);
      expect(onClick).toBeCalled();
    });
  })

  describe("size", () => {
    ["compact", "normal"].forEach(size => {
      it(`should render ${size} size`, async () => {
        const { findByRole } = render(GoAButton, { size });
        const button = await findByRole("button");

        expect(button).toBeTruthy();
        expect(button.className).toContain(size);
      });
    });
  });

  describe("type", () => {
    ["primary", "submit", "secondary", "tertiary", "start"].forEach(type => {
      it(`should render ${type} type`, async () => {
        const baseElement = render(GoAButton, { type });
        const button = await baseElement.findByRole("button");

        expect(button).toBeTruthy();
        expect(button.className).toContain(type);
      });
    });
  });

  describe("variant", () => {
    ["normal", "destructive"].forEach(variant => {
      it(`should render ${variant} variant`, async () => {
        const baseElement = render(GoAButton, { variant });
        const button = await baseElement.findByRole("button");

        expect(button).toBeTruthy();
        expect(button.className).toContain(variant);
      });
    });
  });

  describe("title", () => {
    it('should show button title', async () => {
      const buttonTitle = 'hovering';
      const baseElement = render(GoAButton, { title: buttonTitle });
      const button = await baseElement.findByRole("button");

      expect(button).toBeTruthy();
      expect(button.title).toContain(buttonTitle);
    });
  });

});
