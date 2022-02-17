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

  describe("type", () => {
    const buttonPrimaryClassName = 'primary';
    const buttonSecondaryClassName = 'secondary';
    const buttonTertiaryClassName = 'tertiary';

    it('should render primary styling', async () => {
      const baseElement = render(GoAButton, { type: "primary" });
      const button = await baseElement.findByRole("button");

      expect(button).toBeTruthy();

      expect(button.className).toContain(buttonPrimaryClassName);
      expect(button.className).not.toContain(buttonSecondaryClassName);
      expect(button.className).not.toContain(buttonTertiaryClassName);
    });

    it('should render secondary styling', async () => {
      const baseElement = render(GoAButton, { type: "secondary" });
      const button = await baseElement.findByRole("button");

      expect(button).toBeTruthy();

      expect(button.className).not.toContain(buttonPrimaryClassName);
      expect(button.className).toContain(buttonSecondaryClassName);
      expect(button.className).not.toContain(buttonTertiaryClassName);
    });

    it('should render tertiary styling', async () => {
      const baseElement = render(GoAButton, { type: "tertiary" });
      const button = await baseElement.findByRole("button");

      expect(button).toBeTruthy();

      expect(button.className).not.toContain(buttonPrimaryClassName);
      expect(button.className).not.toContain(buttonSecondaryClassName);
      expect(button.className).toContain(buttonTertiaryClassName);
    });
  });

  describe("size", () => {
    it('should render small size', async () => {
      const baseElement = render(GoAButton, { size: 'small' });
      const button = await baseElement.findByRole("button");

      expect(button).toBeTruthy();
      expect(button.className).toContain("small");
    });

    it('should render medium size', async () => {
      const baseElement = render(GoAButton, { size: 'medium' });
      const button = await baseElement.findByRole("button");

      expect(button).toBeTruthy();
      expect(button.className).toContain("medium");
    });

    it('should render large size', async () => {
      const baseElement = render(GoAButton, { size: 'large' });
      const button = await baseElement.findByRole("button");

      expect(button).toBeTruthy();
      expect(button.className).toContain("large");
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
