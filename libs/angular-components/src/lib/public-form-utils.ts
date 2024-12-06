import { FieldValidator } from "./validation";

export type FormStatus = "not-started" | "incomplete" | "complete";

// Public type to define the state of the form
export type AppState<T> = {
  form: Record<string, AppStateData<T>>;
  history: string[];
  editting: string;
  lastModified?: Date;
  status: FormStatus;
  currentFieldset?: { id: T; dispatchType: "change" | "continue" };
};

export type AppStateData<T> = {
  heading: string;
  data: Record<string, FieldsetItemState | FieldsetItemState[]> | AppState<T>[];
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
  _formRef?: HTMLElement = undefined;

  // Obtain reference to the form element
  init(e: Event) {
    console.debug("Utils::init", e);
    this._formRef = (e as CustomEvent).detail.el;

    this.state = {
      form: {},
      history: [],
      editting: "",
      status: "not-started",
    };
  }

  initList(e: Event) {
    console.debug("Utils::initList", e);
    this._formRef = (e as CustomEvent).detail.el;
    this.state = [];
  }

  // Public method to allow for the initialization of the state
  initState(state: string | AppState<T>) {
    console.debug("Utils:initState", state);
    relay(this._formRef, "external::init:state", state);
  }

  // Public method to allow for the updating of the state
  updateState(e: Event) {
    console.debug("Utils:updateState", { state: this.state }, (e as CustomEvent).detail);
    if (!this.state) {
      console.error("updateState: state has not yet been set");
      return;
    }

    const detail = (e as CustomEvent).detail;
    const isSubform = Array.isArray(this.state);
    const isRootFormSubformDetail = detail.data && !isSubform;

    if (isSubform) {
      this.#updateListState(detail);
    } else if (isRootFormSubformDetail) {
      this.#updateRootListValue(detail);
    } else {
      this.#updateObjectState(detail);
    }
  }

  #updateListState(detail: { data: AppState<T>[]; index: number; id: string }) {
    console.debug("Utils:updateListStateOfRoot", detail);

    if (!Array.isArray(this.state)) {
      return;
    }

    this.state = detail.data;
    // this.state[detail.index].form[detail.id].data = detail.data;
  }

  // WEDNESDAY Start here
  // FIXME: newState's type can also be `{ id: string, index: number, data: AppState<T>[] }`
  #updateRootListValue(detail: { data: AppState<T>[]; index: number; id: string }) {
    console.debug("Utils:updateRootListValue", detail);

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

    this.state = {
      ...this.state,
      form: { ...(this.state?.form || {}), ...newState.form },
      currentFieldset: newState.currentFieldset,
    } as AppState<T>;
  }

  getStateList(): Record<string, string>[] {
    if (!Array.isArray(this.state)) {
      console.error(
        "Utils:getStateList: unable to update the state of a non-multi form type",
      );
      return [];
    }

    return this.state.map((s) => {
      return Object.values(s.form)
        .map((item) => item.data || {})
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

  // getStateItems(group: string): Record<string, FieldsetItemState>[] {
  //   if (Array.isArray(this.state)) {
  //     console.error(
  //       "Utils:getStateItems: unable to update the state of a multi form type",
  //     );
  //     return [];
  //   }
  //   if (!this.state) {
  //     console.error("Utils:getStateItems: state has not yet been set");
  //     return [];
  //   }

  //   console.debug("Utils:getStateItems", this.state, { group });
  //   return (this.state.form[group]?.data ?? []) as Record<string, FieldsetItemState>[];
  // }

  // Public method to allow for the retrieval of the state value
  // getStateValue(group: string, key: string): string {
  //   if (Array.isArray(this.state)) {
  //     console.error("getStateValue: unable to update the state of a multi form type");
  //     return "";
  //   }
  //   if (!this.state) {
  //     console.error("getStateValue: state has not yet been set");
  //     return "";
  //   }

  //   const data = this.state.form[group].data as Record<string, FieldsetItemState>[];
  //   // @ts-expect-error "ignore"
  //   return (data as Record<string, string>)[key]?.value ?? "";
  // }

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
