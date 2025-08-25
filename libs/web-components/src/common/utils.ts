// Similar to React's useEffect. Svelte's $: puts a watch on any variables within the block
// of code. The issue is that the block may then be unwantingly triggered when one of the
// non-key properties change. Using the `watch` function provides the control and makes
// it clear what the function is watching
export function watch(fn: () => void, _: unknown[]) {
  fn()
}

// Creates a style string from a list of styles.
// This function accepts booleans to prevent the need for ternary ops when passing
// in conditional styles
//
// ```
// <div
//  style={styles(
//   isImportant && "color: red",  // when isImportant === false a false value will be passed
// )}>
//   ...
// </div>

// ```
export function styles(...css: (string | boolean)[]): string {
  return (
    css
      // remove blank items
      .filter((item: string | boolean) => !!item)
      // replace the ending `;` with a blank
      .map((item: string | boolean) =>
        typeof item === "string" ? item.replace(/;$/, "") : item,
      )
      .join(";")
  );
}

// creates a style attribute/value or empty string
export function style(name: string, value: string | number): string {
  return value ? `${name}: ${value}` : "";
}

export const msg = {
  receive,
  relay,
};

export function receive(
  el: HTMLElement | Element | null | undefined,
  handler: (action: string, data: unknown, event: Event) => void,
) {
  if (!el) {
    console.warn("receive() el is null | undefined");
  }

  const listener = (e: Event) => {
    const ce = e as CustomEvent;
    handler(ce.detail.action, ce.detail.data, e);
  }

  el?.addEventListener("msg", listener);

  return () => {
    el?.removeEventListener("msg", listener);
  };
}

export function relay<T>(
  el: HTMLElement | Element | null | undefined,
  eventName: string,
  data?: T,
  opts?: { bubbles?: boolean; cancelable?: boolean; timeout?: number },
) {
  if (!el) {
    console.warn("relay() el is null | undefined");
    return;
  }

  const dispatch = () => {
    try {
      el?.dispatchEvent?.(
        new CustomEvent<{ action: string; data?: T }>("msg", {
          composed: true,
          bubbles: opts?.bubbles,
          cancelable: opts?.cancelable,
          detail: {
            action: eventName,
            data,
          },
        }),
      );
    } catch (e) {
      console.error("relay() error:", e);
    }
  };

  if (opts?.timeout) {
    setTimeout(dispatch, opts.timeout);
  } else {
    dispatch();
  }
}

export function dispatch<T>(
  el: HTMLElement | Element | null | undefined,
  eventName: string,
  detail?: T,
  opts?: { bubbles?: boolean; cancelable?: boolean; timeout?: number },
) {
  const dispatch = () => {
    try {
      el?.dispatchEvent?.(
        new CustomEvent<T>(eventName, {
          composed: true,
          bubbles: opts?.bubbles,
          cancelable: opts?.cancelable,
          detail,
        }),
      );
    } catch (e) {
      console.error("dispatch() error:", e);
    }
  };

  if (opts?.timeout) {
    setTimeout(dispatch, opts.timeout);
  } else {
    dispatch();
  }
}

export function getSlottedChildren(
  rootEl?: HTMLElement,
  parentTestSelector?: string,
): Element[] {
  const slot = rootEl?.querySelector("slot");
  if (slot) {
    return slot.assignedElements();
  } else {
    // for unit tests only
    if (parentTestSelector) {
      return [
        // @ts-expect-error testing
        ...rootEl.querySelector(parentTestSelector).children,
      ] as Element[];
    }
    // @ts-expect-error testing
    return [...rootEl.children] as Element[];
  }
}

export function toBoolean(value: string): boolean {
  // this is how false will need to be represented
  if (value === "false") {
    return false;
  }
  // for element props empty strings are also a true value
  // ex. <input type="text" disabled />  /* is a disabled input */
  if (value === "") {
    return true;
  }
  return !!value;
}

export function fromBoolean(value: boolean): string {
  return value ? "true" : "false";
}

export function isValidDate(d: Date): boolean {
  return !isNaN(d.getDate());
}

export function validateRequired(
  componentName: string,
  props: Record<string, unknown>,
) {
  Object.entries(props).forEach((prop) => {
    if (!prop[1]) {
      console.warn(`${componentName}: ${prop[0]} is required`);
    }
  });
}

// To avoid console errors due to late binding, we need to use setTimeout before calling typeValidator
export function typeValidator(
  message: string,
  values: string[],
  opts: boolean | { required?: boolean; deprecated?: string[] } = {},
): [string[], (value: string | null) => void] {
  const validator = (value: string | null): void => {
    const required = typeof opts === "boolean" ? opts : opts?.required;
    const deprecated = typeof opts === "object" ? opts?.deprecated : null;

    if (!required && !value) {
      return;
    }
    if (required && !value) {
      console.error(`[${value}] is an invalid ${message.toLowerCase()}`);
      return;
    }
    if (!values.includes(value || "")) {
      console.error(`[${value}] is an invalid ${message.toLowerCase()}`);
    }
    if (deprecated?.includes(value as string)) {
      console.warn(`[${value}] is deprecated`);
    }
  };
  return [values, validator];
}

export function getTimestamp(val?: Date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const now = val || new Date();
  const hour24 = now.getHours();
  const min0 = now.getMinutes();

  const date = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const hour = (hour24 === 0 && 12) || (hour24 > 12 && hour24 - 12) || hour24;
  const meridium = (hour24 === 0 && "AM") || (hour24 >= 12 && "PM") || "AM";
  const min = (min0 < 10 && `0${min0}`) || min0;
  const ordinal =
    (date % 10 === 1 && date !== 11 && "st") ||
    (date % 10 === 2 && date !== 12 && "nd") ||
    (date % 10 === 3 && date !== 13 && "rd") ||
    "th";

  return `${month} ${date}${ordinal} ${year}, ${hour}:${min} ${meridium}`;
}

export function pluralize(word: string, count: number) {
  if (count === 1) return word;
  return `${word}s`;
}

export function clamp(value: number, min: number, max: number): number {
  return value > max ? max : value < min ? min : value;
}

export function generateRandomId() {
  return `${Math.random().toString(36).substring(2, 9)}`;
}

export function padLeft(
  value: string | number,
  len: number,
  padWith: string | number,
): string {
  value = value + "";
  const diff = len - value.length;
  if (diff <= 0) {
    return value;
  }
  let padding = "";
  for (let i = 0; i < len - value.length; i++) {
    padding += padWith;
  }
  return `${padding}${value}`;
}

export function performOnce(
  timeoutId: any,
  action: () => void,
  delay = 100,
): any {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  if (delay === 0) {
    action();
    return;
  }
  return setTimeout(action, delay);
}

export function isPointInRectangle(
  x: number,
  y: number,
  rectX: number,
  rectY: number,
  rectWidth: number,
  rectHeight: number
): boolean {
  return x >= rectX && x <= rectX + rectWidth && y >= rectY && y <= rectY + rectHeight;
}

export function ensureSlotExists(el: HTMLElement) {
  if (!el.querySelector("slot")) {
    el.appendChild(document.createElement("slot"));
  }
}

export function getQueryParams(url: string | URL): Record<string, string> {
  const _url = url instanceof URL ? url : new URL(url);
  const query = _url.search.substring(1);
  const vars = query.split("&");

  return vars.reduce((acc: Record<string, string>, val: string) => {
    const [key, value] = val.split("=");
    acc[key] = value;
    return acc;
  }, {});
}

export function getQueryParam(
  url: string | URL,
  key: string,
): string | undefined {
  const params = getQueryParams(url);
  return params[key];
}

/**
 * Creates a temporary screen reader announcement using aria-live
 * @param text The text to announce to screen readers
 * @param duration How long to keep the announcer element in the DOM (in milliseconds)
 */
export function announceToScreenReader(text: string, duration = 3000): void {
  const announcer = document.createElement("div");

  announcer.style.position = "absolute";
  announcer.style.width = "1px";
  announcer.style.height = "1px";
  announcer.style.padding = "0";
  announcer.style.margin = "-1px";
  announcer.style.overflow = "hidden";
  announcer.style.clipPath = "inset(50%)";
  announcer.style.whiteSpace = "nowrap";
  announcer.style.borderWidth = "0";
  announcer.style.opacity = "0";

  announcer.setAttribute("aria-live", "polite");
  announcer.setAttribute("aria-atomic", "true");
  document.body.appendChild(announcer);

  setTimeout(() => {
    announcer.textContent = text;
  }, 100);

  setTimeout(() => {
    document.body.removeChild(announcer);
  }, duration);
}

/**
 * Helper function primarily for use within the datepicker component that extracts
 * the year, month and day values from a date-formatted string or JS Date object.
 */
const YMDDateMatcher = /^(\d{4})-(\d{2})-(\d{2})/;
export function getLocalDateValues(input: string | Date): {
  year: number;
  month: number;
  day: number;
} | null {
  let matches: RegExpMatchArray | null;

  if (typeof input === "string") {
    matches = YMDDateMatcher.exec(input);
    if (matches) {
      return {
        year: +matches[1],
        month: +matches[2],
        day: +matches[3],
      }
    }
  }

  if (typeof input === "object") {
    return {
      year: input.getFullYear(),
      month: input.getMonth() + 1,
      day: input.getDate(),
    }
  }

  return null;
}

/**
 * Check if a specific HTML Element is focusable
 * @param node
 */
export function shouldFocus(
  node: Node
): Node | null {
  const element = node as HTMLElement;

  // 1 = element_node (div, span, input, a, ...)
  if (element.nodeType !== 1) return null;

  // Skip elements with data-ignore-focus attribute
  if (element.getAttribute?.("data-ignore-focus")) return null;

  const isTabbable =
    element.tabIndex > 0 ||
    (element.tabIndex === 0 && element.getAttribute("tabindex") !== null);
  if (isTabbable) return node;

  if (("disabled" in element && element.disabled) || element?.getAttribute("disabled")) return null;

  if (element.tabIndex < 0 || element.getAttribute?.("tabindex") === "-1")
    return null;

  let focusableNode = null;
  switch (element.nodeName) {
    case "A": {
      const el = element as HTMLLinkElement;
      if (el.href && el.rel !== "ignore") {
        focusableNode = node;
      }
      break;
    }
    case "INPUT": {
      const el = element as HTMLInputElement;
      if (el.type !== "hidden" && el.type !== "file") {
        focusableNode = node;
      }
      break;
    }
    case "BUTTON":
    case "SELECT":
    case "TEXTAREA":
      focusableNode = node;
      break;
  }

  return focusableNode;
}

/**
 * return the first focusable element of nodes list (including each node's shadow/slot)
 * @param nodes
 * @param reversed: false as default, search from first to last, true: search from last to first
 * @param isFocusable: a function to return if a node should be focused, if null passed, we will use shouldFocus() above
 */
export function findFirstFocusableNode(
  nodes: NodeList | Node[],
  reversed = false,
  isFocusable: ((node: Node) => Node | null | "ignore-focus") | null = null,
): Node | null {
  let focusableNode = null;

  const nodeList = reversed ? [...nodes].reverse() : nodes;
  for (const node of nodeList) {
    // Check shadow DOM first before considering the host element focusable
    if (node instanceof HTMLElement && node.shadowRoot) {
      focusableNode = findFirstNodeOfShadowDOM(node, reversed);
      if (focusableNode) break;
    }

    if (node.hasChildNodes()) {
      focusableNode = findFirstFocusableNode(Array.from(node.childNodes), reversed);
      if (focusableNode) break;
    }

    // Check slot content
    focusableNode = findFirstNodeOfSlot(node, reversed);
    if (focusableNode) break;

    // Finally, check if the node itself is focusable (but only if no focusable content was found inside)
    const result = isFocusable ? isFocusable(node) : shouldFocus(node);
    if (result === "ignore-focus") continue;
    if (result) {
      focusableNode = result;
      break;
    }
  }

  return focusableNode;
}

function findFirstNodeOfSlot(
  node: Node,
  reversed: boolean,
): Node | null {
  if (!(node instanceof HTMLSlotElement)) return null;
  return findFirstFocusableNode([...node.assignedNodes()], reversed);
}

function findFirstNodeOfShadowDOM(
  node: Node,
  reversed: boolean,
): Node | null {
  if (!(node instanceof HTMLElement)) return null;
  return findFirstFocusableNode([...(node.shadowRoot?.childNodes || [])], reversed);
}


