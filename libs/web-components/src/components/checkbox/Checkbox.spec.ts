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
    it("should stop _change propagation but relay form field changes as _revealChange", async () => {
      const el = await createElement({ checked: "true" });
      const revealSlot = document.createElement('div');
      revealSlot.setAttribute('slot', 'reveal');
      revealSlot.textContent = 'Reveal content';

      const checkbox = el.container.querySelector('goa-checkbox');
      checkbox?.appendChild(revealSlot);
      await new Promise(resolve => setTimeout(resolve, 100));

      // Test _click event propagation (should be stopped)
      const clickSpy = vi.fn();
      checkbox?.addEventListener('_click', clickSpy);

      const clickEvent = new CustomEvent('_click', { bubbles: true });
      revealSlot.dispatchEvent(clickEvent);
      expect(clickSpy).not.toHaveBeenCalled();

      // Test _change event propagation (should be stopped)
      const changeSpy = vi.fn();
      checkbox?.addEventListener('_change', changeSpy);

      // Listen for _revealChange event (should be dispatched for form fields)
      const revealChangeSpy = vi.fn();
      checkbox?.addEventListener('_revealChange', revealChangeSpy);

      // Dispatch a _change event with form field details (name and value)
      const changeEvent = new CustomEvent('_change', {
        bubbles: true,
        detail: { name: 'reveal-input', value: 'new-value' }
      });
      revealSlot.dispatchEvent(changeEvent);
      setTimeout(() => {
        // Verify _change was stopped but _revealChange was dispatched
        expect(changeSpy).not.toHaveBeenCalled();
        expect(revealChangeSpy).toHaveBeenCalledTimes(1);

        const relayedEvent = revealChangeSpy.mock.calls[0][0] as CustomEvent;
        expect(relayedEvent.detail.name).toBe('reveal-input');
        expect(relayedEvent.detail.value).toBe('new-value');
      }, 1000)
    });

    it("should not dispatch _revealChange for non-form field events", async () => {
      const el = await createElement({ checked: "true" });
      const revealSlot = document.createElement('div');
      revealSlot.setAttribute('slot', 'reveal');
      revealSlot.textContent = 'Reveal content';

      const checkbox = el.container.querySelector('goa-checkbox');
      checkbox?.appendChild(revealSlot);
      await new Promise(resolve => setTimeout(resolve, 100));

      const revealChangeSpy = vi.fn();
      checkbox?.addEventListener('_revealChange', revealChangeSpy);

      // Test accordion change event (has open property)
      const accordionChangeEvent = new CustomEvent('_change', {
        bubbles: true,
        detail: { open: true }
      });
      revealSlot.dispatchEvent(accordionChangeEvent);
      expect(revealChangeSpy).not.toHaveBeenCalled();

      // Test event without name property
      const invalidEvent = new CustomEvent('_change', {
        bubbles: true,
        detail: { value: 'some-value' }
      });
      revealSlot.dispatchEvent(invalidEvent);
      expect(revealChangeSpy).not.toHaveBeenCalled();
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


  describe("indeterminate", () => {
    it("defaults to false", async () => {
      const el = await createElement();
      const input = el.container.querySelector("input") as HTMLInputElement;

      // native property should be false
      expect(input.indeterminate).toBeFalsy();
      // aria should reflect a determinate unchecked state by default
      expect(input.getAttribute("aria-checked")).toBe("false");
      // dash icon should not exist
      const dash = el.queryByTestId("dashmark");
      expect(dash).toBeNull();
    });

    it("renders dash and sets aria to mixed when true", async () => {
      const el = await createElement({ indeterminate: "true" });
      const input = el.container.querySelector("input") as HTMLInputElement;
      const container = el.container.querySelector(".container");

      // dash icon should be present
      const dash = await el.findByTestId("dashmark");
      expect(dash).toBeTruthy();
      // native property should be true
      expect(input.indeterminate).toBeTruthy();
      // aria should be mixed
      expect(input.getAttribute("aria-checked")).toBe("mixed");
      // container should appear selected for styling
      expect(container?.classList.contains("selected")).toBeTruthy();
    });

    it("can be toggled dynamically", async () => {
      const el = await createElement({ indeterminate: "false" });
      const input = el.container.querySelector("input") as HTMLInputElement;

      // Initially not indeterminate
      expect(input.indeterminate).toBeFalsy();
      expect(input.getAttribute("aria-checked")).toBe("false");

      // Update component props to make it indeterminate
      await el.component.$set({ indeterminate: "true" });

      expect(input.indeterminate).toBeTruthy();
      expect(input.getAttribute("aria-checked")).toBe("mixed");
      const dash = await el.findByTestId("dashmark");
      expect(dash).toBeTruthy();
    });

    });
});
