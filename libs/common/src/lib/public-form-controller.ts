import { FieldsetItemState, FieldValidator } from "./validators";

export type FormStatus = "not-started" | "incomplete" | "complete";

// Public type to define the state of the form
export type AppState<T> = {
  uuid: string;
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

export class PublicFormController<T> {
  state?: AppState<T> | AppState<T>[];
  _formData?: Record<string, string> = undefined;
  _formRef?: HTMLElement = undefined;

  constructor(private type: "details" | "list") {
    console.log("constructor", this.type);
    // nothing here
  }

  // Obtain reference to the form element
  init(e: Event) {
    // FIXME: This condition should not be needed, but currently it is the only way to get things working
    if (this._formRef) {
      console.error("init: form element has already been set");
      return;
    }
    this._formRef = (e as CustomEvent).detail.el;

    this.state = {
      uuid: crypto.randomUUID(),
      form: {},
      history: [],
      editting: "",
      status: "not-started",
    };
  }

  initList(e: Event) {
    this._formRef = (e as CustomEvent).detail.el;
    this.state = [];
  }

  // Public method to allow for the initialization of the state
  initState(state: string | AppState<T> | AppState<T>[]) {
    relay(this._formRef, "external::init:state", state);
  }

  // ISSUE:
  // The issue is that all the logic below is happening outside the form component, thereby resulting
  // in the "fixed" data not being in sync with the data within the form component.
  //

  // Public method to allow for the updating of the state
  // updateState(e: Event) {
  //   console.debug(
  //     "Utils:updateState",
  //     this.type,
  //     { state: this.state },
  //     (e as CustomEvent).detail,
  //   );
  //   if (!this.state) {
  //     console.error("updateState: state has not yet been set");
  //     return;
  //   }
  //
  //   const detail = (e as CustomEvent).detail;
  //   } else if (this.type === "details" && Array.isArray(detail.data)) {
  //     this.#updateObjectListState(detail);
  //   } else {
  //     this.#updateObjectState(detail);
  //   }
  // }

  updateListState(e: Event) {
    const detail = (e as CustomEvent).detail;

    if (!Array.isArray(detail.data)) {
      return;
    }

    this.state = detail.data;
  }

  #updateObjectListState(detail: { data: AppState<T>[]; index: number; id: string }) {
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

  updateObjectState(e: Event) {
    if (Array.isArray(this.state)) {
      return;
    }

    const detail = (e as CustomEvent).detail;
    if (detail.type === "list") {
      // form state being updated with subform array data
      this.state = {
        ...this.state,
        form: { ...(this.state?.form || {}), [detail.id]: detail.data },
        // currentFieldset: newState.currentFieldset,
        // history: detail.data.,
      } as AppState<T>;
    } else {
      // form state being updated with form data
      this.state = {
        ...this.state,
        form: { ...(this.state?.form || {}), ...detail.data.form },
        // currentFieldset: newState.currentFieldset,
        history: detail.data.history,
      } as AppState<T>;
    }
  }

  getStateList(): Record<string, string>[] {
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
  continueTo(next: T | undefined) {
    if (!next) {
      console.error("continueTo [name] is undefined");
      return;
    }
    // Relay the continue message to the form element which will
    // set the visibility of the fieldsets
    console.log("continueTo: TYPE", {
      type: this.type,
      state: this.state,
      formRef: this._formRef,
      next,
    });
    // FIXME: this makes a call to the subform instead of the form
    relay<{ next: T }>(this._formRef, "external::continue", { next });
  }

  // Public method to perform validation and send the appropriate messages to the form elements
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

  edit(index: number) {
    relay(this._formRef, "external::alter:state", { index, operation: "edit" });
  }

  remove(index: number) {
    relay(this._formRef, "external::alter:state", { index, operation: "remove" });
  }

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
