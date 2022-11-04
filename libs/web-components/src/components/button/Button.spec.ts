import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import GoAButton from './Button.svelte'

describe('GoAButtonComponent', () => {

  it('should render', async () => {
    const baseElement = render(GoAButton);
    const button = await baseElement.findByRole('button');

    expect(button).toBeTruthy();
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

  describe("Invalid attrs", () => {
    let consoleMock: jest.SpyInstance;
    beforeEach(() => {
      consoleMock = jest.spyOn(console, "error").mockImplementation();
      expect(console.error["mock"].calls.length).toBe(0);
    })
    afterEach(() => consoleMock.mockRestore())

    it("invalid type", async () => {
      render(GoAButton, { type: "foobar" });
      await waitFor(() => {
        expect(console.error["mock"].calls.length).toBeGreaterThan(0);
      })
    });

    it("invalid size", async () => {
      render(GoAButton, { size: "verybig" });
      await waitFor(() => {
        expect(console.error["mock"].calls.length).toBeGreaterThan(0);
      })
    });
    it("invalid variant", async () => {
      render(GoAButton, { variant: "sweet" });
      await waitFor(() => {
        expect(console.error["mock"].calls.length).toBeGreaterThan(0);
      })
    });
  })

});
