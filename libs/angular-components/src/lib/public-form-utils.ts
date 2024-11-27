import { FieldValidator } from "./validation";

export type FormStatus = "not-started" | "incomplete" | "complete";

// Public type to define the state of the form
export type AppState<T> = {
  form: Record<string, { heading: string; data: Record<string, FieldsetItemState>[] }>;
  history: string[];
  editting: string;
  lastModified?: Date;
  status: FormStatus;
  currentFieldset?: { id: T; dispatchType: "change" | "continue" };
};

// Public type to define the state of the fieldset items
export type FieldsetItemState = {
  name: string;
  label: string;
  value: string;
};

export class PublicFormComponent<T> {
  state: AppState<T> = {
    form: {},
    history: [],
    editting: "",
    status: "not-started",
  };
  _formData?: Record<string, string> = undefined;
  _formRef?: HTMLElement = undefined;

  // Obtain reference to the form element
  init(e: Event) {
    console.log("PUblicformComponent::init", e);
    this._formRef = (e as CustomEvent).detail.el;
    // relay(this._formRef, "init", {});
  }

  // Public method to allow for the initialization of the state
  initState(state: string | AppState<T>) {
    relay(this._formRef, "external::init:state", state);
  }
  // Public method to allow for the updating of the state
  updateState(e: Event) {
    const state = (e as CustomEvent).detail as AppState<T>;
    console.log("updateSTate", state);
    this.state = {
      ...this.state,
      form: state.form,
      currentFieldset: state.currentFieldset,
    };
  }

  getStateItems(group: string): Record<string, FieldsetItemState>[] {
    console.log("getStateItems", this.state, group);
    return (this.state.form[group]?.data ?? []) as Record<string, FieldsetItemState>[];
  }

  // Public method to allow for the retrieval of the state value
  getStateValue(group: string, key: string): string {
    const data = this.state.form[group].data as Record<string, FieldsetItemState>[];
    // @ts-expect-error "ignore"
    return (data as Record<string, string>)[key]?.value ?? "";
  }

  // Public method to allow for the continuing to the next page
  continueTo(name: T | undefined) {
    if (!name) {
      console.error("continueTo [name] is undefined");
      return;
    }
    // Relay the continue message to the form element which will
    // set the visibility of the fieldsets
    relay<{ next: T }>(this._formRef, "external::continue", {
      next: name,
    });
  }

  // Public method to peform validation and send the appropriate messages to the form elements
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

  edit(index: number) {}

  remove(index: number) {}

  // Private method to dispatch the error message to the form element
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

// Public helper function to dispatch messages
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

// Public helper function to relay messages
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
  console.debug(`RELAY(${eventName}):`, data, el);
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
