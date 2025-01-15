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

  el?.addEventListener("msg", (e: Event) => {
    const ce = e as CustomEvent;
    handler(ce.detail.action, ce.detail.data, e);
  });
}

export function relay<T>(
  el: HTMLElement | Element | null | undefined,
  eventName: string,
  data?: T,
  opts?: { bubbles?: boolean; cancelable?: boolean; timeout?: number },
) {
  // console.log(`RELAY(${eventName}):`, data, el);

  const dispatch = () => {
    el?.dispatchEvent(
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
    el?.dispatchEvent(
      new CustomEvent<T>(eventName, {
        composed: true,
        bubbles: opts?.bubbles,
        cancelable: opts?.cancelable,
        detail,
      }),
    );
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
  required = false,
): [string[], (value: string | null) => void] {
  const validator = (value: string | null): void => {
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
  return setTimeout(action, delay);
}

export function ensureSlotExists(el: HTMLElement) {
  if (!el.querySelector("slot")) {
    el.appendChild(document.createElement("slot"));
  }
}
