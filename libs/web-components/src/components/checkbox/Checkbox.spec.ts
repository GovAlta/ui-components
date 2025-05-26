import { render, fireEvent } from '@testing-library/svelte';
import GoACheckbox from './Checkbox.svelte'
import { it, describe } from "vitest";

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
    it("can set value", async () => {
      const el = await createElement({ value: "foobar" });
      const checkbox = el.container.querySelector("input");
      expect((checkbox as HTMLInputElement).value).toBe("foobar");
    });

    it("can set name", async () => {
      const el = await createElement();
      const checkbox = el.container.querySelector("input");
      expect((checkbox as HTMLInputElement).name).toBe("checkbox-test-name");
      expect((checkbox as HTMLInputElement).id).toBe("checkbox-test-name");
    });

    it("can set text", async () => {
      const el = await createElement({ text: "foobar" });
      const div = await el.findByTestId('text');
      expect(div).toHaveTextContent("foobar");
    });

    it("can set max width", async () => {
      const el = await createElement({ text: "foobar", maxwidth: "480px" });
      const root = await el.container.querySelector(".root");
      expect(root?.getAttribute("style")).toContain("max-width: 480px;")
    });

    it("can set description", async () => {
      const el = await createElement({ description: "foobar" });
      const div = await el.findByTestId('description');
      expect(div).toHaveTextContent("foobar");
    });

    it("can be checked", async () => {
      const el = await createElement({ checked: "true" });
      const root = el.container.querySelector('.selected');
      expect(root).toBeTruthy();

      const svg = await el.findByTestId('checkmark');
      expect(svg).toBeTruthy();

      const checkbox = el.container.querySelector("input");
      expect((checkbox as HTMLInputElement).checked).toBeTruthy();
    });

    it("can be disabled", async () => {
      const el = await createElement({ disabled: "true" });
      const root = el.container.querySelector('.disabled');
      expect(root).toBeTruthy();
      const checkbox = el.container.querySelector("input");
      expect((checkbox as HTMLInputElement).disabled).toBeTruthy();
    });

    it("can set error state", async () => {
      const el = await createElement({ error: "true" });
      const root = el.container.querySelector('.error');
      expect(root).toBeTruthy();
    });

    describe("aria-describedby", () => {
      it("should not have aria-describedby when description is empty", async () => {
        const el = await createElement({ description: "" });
        const checkbox = el.container.querySelector("input");
        expect(checkbox?.getAttribute("aria-describedby")).toBeNull();
      });

      it("should have aria-describedby when description has content", async () => {
        const el = await createElement({ description: "test description" });
        const checkbox = el.container.querySelector("input");
        expect(checkbox?.getAttribute("aria-describedby")).toBe("description_checkbox-test-name");
      });
    });
  });

  describe("events", () => {
    it("handles change event that results in checked state with value initialized", async () => {
      const el = await createElement({ value: 'foobar' });
      const checkbox = el.container.querySelector("input");
      const change = vi.fn();

      checkbox?.addEventListener('_change', (e: Event) => {
        const detail = (e as CustomEvent).detail;
        expect(detail.name).toBe('checkbox-test-name');
        expect(detail.value).toBe('foobar');
        expect(detail.checked).toBeTruthy();
        change();
      })

      checkbox && await fireEvent.click(checkbox);
      expect(change).toBeCalledTimes(1);
    });

    it("handles change event that results in checked state with value not initialized", async () => {
      const el = await createElement({});
      const checkbox = el.container.querySelector("input");
      const change = vi.fn();

      checkbox?.addEventListener('_change', (e: Event) => {
        const detail = (e as CustomEvent).detail;
        expect(detail.name).toBe('checkbox-test-name');
        expect(detail.value).toBe('checked');
        expect(detail.checked).toBeTruthy();
        change();
      })

      checkbox && await fireEvent.click(checkbox);
      expect(change).toBeCalledTimes(1);
    });

    it("handles change event that results in unchecked state", async () => {
      const el = await createElement({ checked: true, value: "foo" });
      const checkbox = el.container.querySelector("input");
      const change = vi.fn();

      checkbox?.addEventListener('_change', (e: Event) => {
        const detail = (e as CustomEvent).detail;
        expect(detail.name).toBe('checkbox-test-name');
        expect(detail.value).toBe('');
        expect(detail.checked).toBeFalsy();
        change();
      })

      checkbox && await fireEvent.click(checkbox);
      expect(change).toBeCalledTimes(1);
    });
  });

  describe("Reveal slot", () => {
    it("should stop propagation of _click and _change events from reveal slot", async () => {
      const el = await createElement();
      const revealSlot = document.createElement('div');
      revealSlot.setAttribute('slot', 'reveal');
      revealSlot.textContent = 'Reveal content';

      const checkbox = el.container.querySelector('goa-checkbox');
      checkbox?.appendChild(revealSlot);
      await new Promise(resolve => setTimeout(resolve, 100));

      // Test _click event propagation
      const clickSpy = vi.fn();
      checkbox?.addEventListener('_click', clickSpy);

      const clickEvent = new CustomEvent('_click', { bubbles: true });
      revealSlot.dispatchEvent(clickEvent);
      expect(clickSpy).not.toHaveBeenCalled();

      // Test _change event propagation
      const changeSpy = vi.fn();
      checkbox?.addEventListener('_change', changeSpy);

      const changeEvent = new CustomEvent('_change', { bubbles: true });
      revealSlot.dispatchEvent(changeEvent);
      expect(changeSpy).not.toHaveBeenCalled();
    });
  });

  describe("Margins", () => {
    it(`should add the margin`, async () => {
      const baseElement = render(GoACheckbox, {
        testid: "checkbox-test",
        name: "test",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      });
      const checkbox = await baseElement.findByTestId("checkbox-test");

      expect(checkbox).toBeTruthy();
      expect(checkbox).toHaveStyle("margin-top:var(--goa-space-s)");
      expect(checkbox).toHaveStyle("margin-right:var(--goa-space-m)");
      expect(checkbox).toHaveStyle("margin-bottom:var(--goa-space-l)");
      expect(checkbox).toHaveStyle("margin-left:var(--goa-space-xl)");
    });
  });
});
