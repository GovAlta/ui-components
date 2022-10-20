import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/svelte';
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

  describe("properties", () => {
    it("allows for setting of the value", async () => {
      const el = await createElement({ value: "foobar" });
      const checkbox = await el.findByTestId(testid);
      expect((checkbox as HTMLInputElement).value).toBe("foobar");
    });

    it("allows for setting of the name", async () => {
      const el = await createElement();
      const checkbox = await el.findByTestId(testid);
      expect((checkbox as HTMLInputElement).name).toBe("checkbox-test-name");
      expect((checkbox as HTMLInputElement).id).toBe("checkbox-test-name");
    });

    it("allows for setting of the text", async () => {
      const el = await createElement({ text: "foobar" });
      const div = await el.findByTestId('text');
      expect(div).toHaveTextContent("foobar");
    });

    it("can be checked", async () => {
      const el = await createElement({ checked: "true" });
      const root = el.container.querySelector('.goa-checkbox--selected');
      expect(root).toBeTruthy();

      const svg = await el.findByTestId('checkmark');
      expect(svg).toBeTruthy();

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

    it("allows the checkbox to be set to an error state", async () => {
      const el = await createElement({ error: "true" });
      const root = el.container.querySelector('.goa-checkbox--error');
      expect(root).toBeTruthy();
    });
  });

  describe("events", () => {
    it("handles change event that results in checked state with value initialized", async () => {
      const { findByTestId } = await createElement({ value: 'foobar' });
      const checkbox = await findByTestId(testid);
      const change = jest.fn();

      checkbox.addEventListener('_change', (event: CustomEvent) => {
        expect(event.detail.name).toBe('checkbox-test-name');
        expect(event.detail.value).toBe('foobar');
        expect(event.detail.checked).toBeTruthy();
        change();
      })

      await fireEvent.click(checkbox);
      expect(change).toBeCalledTimes(1);
    });

    it("handles change event that results in checked state with value not initialized", async () => {
      const { findByTestId } = await createElement({});
      const checkbox = await findByTestId(testid);
      const change = jest.fn();

      checkbox.addEventListener('_change', (event: CustomEvent) => {
        expect(event.detail.name).toBe('checkbox-test-name');
        expect(event.detail.value).toBe('checked');
        expect(event.detail.checked).toBeTruthy();
        change();
      })

      await fireEvent.click(checkbox);
      expect(change).toBeCalledTimes(1);
    });

    it("handles change event that results in unchecked state", async () => {
      const { findByTestId } = await createElement({checked:true, value: "foo"});
      const checkbox = await findByTestId(testid);
      const change = jest.fn();

      checkbox.addEventListener('_change', (event: CustomEvent) => {
        expect(event.detail.name).toBe('checkbox-test-name');
        expect(event.detail.value).toBe('');
        expect(event.detail.checked).toBeFalsy();
        change();
      })

      await fireEvent.click(checkbox);
      expect(change).toBeCalledTimes(1);
    });
  });


});
