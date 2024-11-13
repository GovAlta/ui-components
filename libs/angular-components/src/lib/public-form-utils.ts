import { FieldValidator } from "./validation";

export type FormStatus = "not-started" | "incomplete" | "complete";

export class PublicFormComponent<T> {
  state: AppState<T> = {
    form: {},
    history: [],
    editting: "",
    status: "not-started",
  };
  _formData?: Record<string, string> = undefined;
  _formRef?: HTMLElement = undefined;

  init(e: Event) {
    this._formRef = (e as CustomEvent).detail.el;
    relay(this._formRef, "init", {});
  }

  initState(state: string | AppState<T>) {
    relay(this._formRef, "external::init:state", state);
  }

  updateState(e: Event) {
    const state = (e as CustomEvent).detail as AppState<T>;
    this.state = {
      ...this.state,
      form: state.form,
      currentFieldset: state.currentFieldset,
    };
  }

  getStateValue(group: string, key: string): string {
    const data = this.state.form[group].data as Record<string, FieldsetItemState>[];
    // @ts-expect-error "ignore"
    return (data as Record<string, string>)[key]?.value ?? "";
  }

  continueTo(name: T | undefined) {
    if (!name) {
      console.error("continueTo [name] is undefined");
      return;
    }
    relay<{ next: T }>(this._formRef, "external::continue", {
      next: name,
    });
  }

  validate(field: string, e: Event, validators: FieldValidator[]): [boolean, string] {
    const { el, state } = (e as CustomEvent).detail;
    const value = state?.[field]?.value;

    for (const validator of validators) {
      const msg = validator(value);
      this.#dispatchError(el, field, msg);
      if (msg) {
        return [false, ""];
      }
    }
    return [true, value];
  }

  #dispatchError(el: HTMLElement, name: string, msg: string) {
    el.dispatchEvent(
      new CustomEvent("msg", {
        composed: true,
        detail: {
          action: "external::set:error",
          data: {
            name,
            msg,
          },
        },
      }),
    );
  }
}

export type AppState<T> = {
  form: Record<string, { heading: string; data: Record<string, FieldsetItemState>[] }>;
  history: string[];
  editting: string;
  lastModified?: Date;
  status: FormStatus;
  currentFieldset?: { id: T; dispatchType: "change" | "continue" };
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
