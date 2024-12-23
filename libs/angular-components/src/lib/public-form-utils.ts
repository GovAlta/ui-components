import { FieldValidator } from "./validation";

export type FormStatus = "not-started" | "incomplete" | "complete";

// Public type to define the state of the form
export type AppState<T> = {
  form: Record<string, Fieldset<T>>;
  history: string[];
  editting: string;
  lastModified?: Date;
  status: FormStatus;
  currentFieldset?: { id: T; dispatchType: "change" | "continue" };
};

export type Fieldset<T> = {
  heading: string;
  skipSummary?: boolean;
  data:
    | { type: "details"; fieldsets: Record<string, FieldsetItemState> }
    | { type: "list"; items: AppState<T>[] };
};

// Public type to define the state of the fieldset items
export type FieldsetItemState = {
  name: string;
  label: string;
  value: string;
};

export class PublicFormComponent<T> {
  state?: AppState<T> | AppState<T>[];
  _formData?: Record<string, string> = undefined;

  // reference to the form element representing this data
  _formRef?: HTMLElement = undefined;

  constructor(private type: "details" | "list") {
    if (type === "list") {
      this.state = [];
    }
  }

  // Obtain reference to the form element
  bind(e: Event) {
    console.debug("Utils::init", e);
    const { el } = (e as CustomEvent).detail;
    this._formRef = el;
  }

  // initList(e: Event) {
  //   alert("initList called!!!");
  //   console.debug("Utils::initList", e);
  //   const { el } = (e as CustomEvent).detail;
  //   this._formRef = el;
  //   this.state = [];
  // }

  // Public method to allow for the initialization of the state
  initState(state: string | AppState<T> | AppState<T>[]) {
    console.debug("Utils:initState", { state });
    relay(this._formRef, "external::init:state", state);
  }

  // Public method to allow for the updating of the state that is accessible at the
  // top component level
  updateState(e: Event) {
    console.debug(
      "Utils:updateState",
      this.type,
      { state: this.state, newState: (e as CustomEvent).detail },
      (e as CustomEvent).detail,
    );

    // TODO: maybe all the commented out code is still needed...
    // this.state = (e as CustomEvent).detail;
    const detail = (e as CustomEvent).detail;
    if (this.type === "list") {
      this.#updateListState(detail);
    } else if (this.type === "details" && Array.isArray(detail.data)) {
      this.#updateObjectListState(detail);
    } else {
      this.#updateObjectState(detail);
    }
  }

  #updateListState(detail: { data: AppState<T>[]; index: number; id: string }) {
    console.debug("Utils:updateListState", detail);

    if (!Array.isArray(detail.data)) {
      return;
    }

    this.state = detail.data;
    // this.state[detail.index].form[detail.id].data = detail.data;
  }

  #updateObjectListState(detail: { data: AppState<T>[]; index: number; id: string }) {
    console.debug("Utils:updateObjectListState", detail);

    if (!Array.isArray(detail.data)) {
      return;
    }

    if (Array.isArray(this.state)) {
      return;
    }

    this.state = {
      ...this.state,
      form: {
        ...(this.state?.form || {}),
        [detail.id]: detail.data,
      },
    } as AppState<T>;
  }

  #updateObjectState(newState: AppState<T>) {
    console.debug("Utils:updateObjectState", newState);

    if (Array.isArray(this.state)) {
      return;
    }

    // this.state = newState;
    this.state = {
      ...this.state,
      form: { ...(this.state?.form || {}), ...newState.form },
      currentFieldset: newState.currentFieldset,
      history: newState.history,
    } as AppState<T>;
  }

  getStateList(): Record<string, string>[] {
    console.log("Utils:getStateList", { state: this.state });
    if (!this.state) {
      return [];
    }
    if (!Array.isArray(this.state)) {
      console.warn(
        "Utils:getStateList: unable to update the state of a non-multi form type",
        this.state,
      );
      return [];
    }
    if (this.state.length === 0) {
      return [];
    }

    return this.state.map((s) => {
      return Object.values(s.form)
        .filter((item) => {
          return item?.data?.type === "details";
        })
        .map((item) => {
          return (item.data.type === "details" && item.data?.fieldsets) || {};
        })
        .reduce(
          (acc, item) => {
            for (const [key, value] of Object.entries(item)) {
              acc[key] = value.value;
            }
            return acc;
          },
          {} as Record<string, string>,
        );
    });
  }

  // Public method to allow for the continuing to the next page
  continueTo(name: T | undefined) {
    console.debug("Utils:continueTo", { name, state: this.state });

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
    console.debug("Utils:validate", { field, e, validators });
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

  edit(id: string, index: number) {
    console.log("Utils:edit", this._formRef);
    relay(this._formRef, "external::alter:state", { id, index, operation: "edit" });
  }

  remove(id: string, index: number) {
    relay(this._formRef, "external::alter:state", { id, index, operation: "remove" });
  }

  // Private method to dispatch the error message to the form element
  #dispatchError(el: HTMLElement, name: string, msg: string) {
    dispatch(el, "external::set:error", { name, msg });
  }
}

// Public helper function to dispatch messages
export function dispatch<T>(
  el: HTMLElement | null | undefined,
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
  el: HTMLElement | null | undefined,
  eventName: string,
  data?: T,
  opts?: { bubbles?: boolean },
) {
  if (!el) {
    console.error("dispatch element is null");
    return;
  }
  console.debug(`  RELAY(${eventName}):`, data, el);
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

// TODO: try to move these function to a shared location
export function receive(
  el: HTMLElement | null | undefined,
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
