export type FormStatus = "not-started" | "incomplete"| "complete";

export type AppState = {
  form: Record<string, Record<string, FieldsetItemState>[]>;
  history: string[];
  editting: string;
  lastModified?: Date;
  status: FormStatus;
};

export type FieldsetItemState = {
  name: string;
  label: string;
  value: string;
};

export function dispatch<T>(
  el: HTMLElement | Element | null | undefined,
  eventName: string,
  detail?: T,
  opts?: { bubbles?: boolean },
) {
  if (!el) {
    console.error("dispatch element is null");
    return;
  }
  el.dispatchEvent(
    new CustomEvent<T>(eventName, {
      composed: true,
      bubbles: opts?.bubbles,
      detail: detail,
    }),
  );
}

export function relay<T>(
  el: HTMLElement | Element | null | undefined,
  eventName: string,
  data?: T,
  opts?: { bubbles?: boolean },
) {
  if (!el) {
    console.error("dispatch element is null");
    return;
  }
  // console.log(`RELAY(${eventName}):`, data, el);
  el.dispatchEvent(
    new CustomEvent<{ action: string; data?: T }>("msg", {
      composed: true,
      bubbles: opts?.bubbles,
      detail: {
        action: eventName,
        data,
      },
    }),
  );
}

// TODO: Logic similar to this needs to be done on the React side as well i.e. an initial onMount
// event that passes a ref to the form,
export function continueTo(el: HTMLElement, name: string) {
  relay<{ next: string }>(el, "external::continue", {
    next: name,
  });
}
