import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import GoACheckbox from './Checkbox.svelte'

const testid = "checkbox-test";

async function createElement(props = {}) {
  return render(GoACheckbox, { testid: testid, name: "checkbox-test-name", ...props });
}

describe('GoACheckbox Component', () => {

  it("should render", async () => {
    const el = await createElement();
    const checkbox = await el.findByTestId(testid);
    expect(checkbox).toBeTruthy();
  });

  it("allows for setting of the value", async () => {
    const el = await createElement({ value: "foobar" });
    const checkbox = await el.findByTestId(testid);
    expect((checkbox as HTMLInputElement).value).toBe("foobar");
  });

  it("allows for setting of the text", async () => {
    const el = await createElement({ text: "foobar" });
    const div = await el.findByTestId(testid + '-text');
    expect(div).toHaveTextContent("foobar");
  });

  it("can be checked", async () => {
    const el = await createElement({ checked: "true" });
    const root = el.container.querySelector('.goa-checkbox--selected');
    expect(root).toBeTruthy();

    const checkbox = await el.findByTestId(testid);
    expect((checkbox as HTMLInputElement).checked).toBeTruthy();
  });

  it("can be disabled", async () => {
    const el = await createElement({ disabled: "true" });
    const root = el.container.querySelector('.goa-checkbox--disabled');
    expect(root).toBeTruthy();
    const checkbox = await el.findByTestId(testid);
    expect((checkbox as HTMLInputElement).disabled).toBeTruthy();
  });

  it("can be set to be indeterminate", async () => {
    const el = await createElement({ indeterminate: "true" });
    const svg = await el.findByTestId(testid + '-dashmark');
    expect(svg).toBeTruthy();
  });

  it("allows the checkbox to be set to an error state", async () => {
    const el = await createElement({ error: "true" });
    const root = el.container.querySelector('.goa-checkbox--error');
    expect(root).toBeTruthy();
  });

  it("handles change events", async () => {
    const { findByTestId } = await createElement({ value: 'foobar' });
    const checkbox = await findByTestId(testid);
    const change = jest.fn();

    checkbox.addEventListener('_change', change)

    await fireEvent.click(checkbox, { target: { value: 'foobar' } });
    expect(change).toBeCalledTimes(1);
  });
});
