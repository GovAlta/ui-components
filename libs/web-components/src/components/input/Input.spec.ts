import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/svelte';
import GoAInput from './Input.svelte'

afterEach(cleanup);

describe('GoAInput Component', () => {

  it("should render", async () => {
    const el = render(GoAInput, { testid: "input-test" });
    const input = await el.findByTestId('input-test');
    expect(input).toBeTruthy();
  });

  it("allows for setting of the value", async () => {
    const el = render(GoAInput, { testid: "input-test", value: "foobar" });
    const input = await el.findByTestId('input-test');
    expect((input as HTMLInputElement).value).toBe("foobar");
  });

  it("allows for setting of the name", async () => {
    const el = render(GoAInput, { testid: "input-test", name: "test-id" });
    const input = await el.findByTestId('input-test');
    expect(input.getAttribute("name")).toBe("test-id");
  });

  ["text", "number", "password", "email", "date", "datetime-local", "month", "search", "tel", "time", "url", "week"].forEach((type: string) => {
    it(`renders the ${type} type`, async () => {
      const el = render(GoAInput, { testid: "input-test", type });
      const input = await el.findByTestId('input-test');
      expect(input.getAttribute("type")).toBe(type);
    })
  });

  it("allows for placeholder text", async () => {
    const el = render(GoAInput, { testid: "input-test", placeholder: "test-id" });
    const input = await el.findByTestId('input-test');
    expect(input.getAttribute("placeholder")).toBe("test-id");
  });

  it("allows for a leading icon", async () => {
    const el = render(GoAInput, { testid: "input-test", leadingicon: "finger-print" });
    const icon = await el.findByTestId('leading-icon');
    expect(icon).toBeTruthy();
  });

  it("allows for a trailing icon", async () => {
    const el = render(GoAInput, { testid: "input-test", trailingicon: "finger-print" });
    const icon = await el.findByTestId('trailing-icon');
    expect(icon).toBeTruthy();
  });

  it("allows for a variant", async () => {
    const el = render(GoAInput, { testid: "input-test", variant: "bare" });
    const root = el.container.querySelector('.variant--bare');
    expect(root).toBeTruthy();
  });

  it("can be disabled", async () => {
    const el = render(GoAInput, { testid: "input-test", disabled: "true" });
    const root = el.container.querySelector('.goa-input--disabled');
    expect(root).toBeTruthy();
  });

  it("allows the input to be marked as readonly", async () => {
    const el = render(GoAInput, { testid: "input-test", readonly: "true" });
    const root = el.container.querySelector('input[readonly]');
    expect(root).toBeTruthy();
  });

  it("allows the input to be set to an error state", async () => {
    const el = render(GoAInput, { testid: "input-test", error: "true" });
    const root = el.container.querySelector('.error');
    expect(root).toBeTruthy();
  });

  it("allows for the trailing icon click event handling", async () => {
    const el = render(GoAInput, { testid: "input-test", trailingicon: "finger-print", handletrailingiconclick: "true" });
    const icon = await el.findByTestId('trailing-icon-button');

    const click = jest.fn();
    icon.addEventListener("_trailingIconClick", click);
    await fireEvent.click(icon);
    expect(click).toBeCalled();
  });

  it("allows the input to be focused", async () => {
    const el = render(GoAInput, { testid: "input-test", focused: "true" });
    const input = el.container.querySelector('input');
    await waitFor(() => {
      expect(input).toHaveFocus();
    })
  });

  it("handles change events", async () => {
    const { findByTestId } = render(GoAInput, { name: 'test-name', testid: "input-test" });
    const input = await findByTestId('input-test');
    const change = jest.fn();

    input.addEventListener('_change', (e: CustomEvent) => {
      expect(e.detail.name).toBe("test-name");
      expect(e.detail.value).toBe("foobar");
      change();
    });

    await fireEvent.keyUp(input, { target: { value: 'foobar' } });
    expect(change).toBeCalledTimes(1);
  });

  it("handles trailing icon click", async () => {
    const { findByTestId } = render(GoAInput, { testid: "input-test", handletrailingiconclick: "true", trailingicon: "finger-print" });
    const onClick = jest.fn();
    const iconButton = await findByTestId('trailing-icon-button');

    iconButton.addEventListener('_trailingIconClick', onClick)

    await fireEvent.click(iconButton);
    expect(onClick).toBeCalledTimes(1);
  });
});
