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
  data:
    | { type: "details"; fieldsets: Record<string, FieldsetItemState> }
    | { type: "list"; items: AppState<T>[] };
};

export class PublicFormController<T> {
  state?: AppState<T> | AppState<T>[];
  _formData?: Record<string, string> = undefined;
  _formRef?: HTMLElement = undefined;

  constructor(private type: "details" | "list") {}

  // Obtain reference to the form element
  init(e: Event) {
    // FIXME: This condition should not be needed, but currently it is the only way to get things working
    if (this._formRef) {
      console.warn("init: form element has already been set");
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
  initState(state?: string | AppState<T> | AppState<T>[], callback?: () => void) {
    relay(this._formRef, "external::init:state", state);

    if (typeof state === "string") {
      this.state = JSON.parse(state);
    } else if (!Array.isArray(state)) {
      this.state = state;
    }

    if (callback) {
      setTimeout(callback, 200);
    }
  }

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
      } as AppState<T>;
    } else {
      // form state being updated with form data
      this.state = {
        ...this.state,
        ...detail.data,
        form: { ...(this.state?.form || {}), ...detail.data.form },
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
  //
  //   const data = this.state.form[group].data;
  //   if (data.type !== "list") {
  //     return [];
  //   }
  //
  //   return data.items.;
  // }

  // Public method to allow for the retrieval of the state value
  getStateValue(group: string, key: string): string {
    if (Array.isArray(this.state)) {
      console.error("getStateValue: unable to update the state of a multi form type");
      return "";
    }
    if (!this.state) {
      console.error("getStateValue: state has not yet been set");
      return "";
    }

    const data = this.state.form[group].data;
    if (data.type !== "details") {
      return "";
    }

    return data.fieldsets[key].value;
  }

  // Public method to allow for the continuing to the next page
  continueTo(next: T | undefined) {
    if (!next) {
      console.error("continueTo [name] is undefined");
      return;
    }
    // Relay the continue message to the form element which will
    // set the visibility of the fieldsets
    // FIXME: this makes a call to the subform instead of the form
    relay<{ next: T }>(this._formRef, "external::continue", { next });
  }

  // Public method to perform validation and send the appropriate messages to the form elements
  validate(e: Event, field: string, validators: FieldValidator[], options?: { grouped: boolean }): [boolean, string] {
    const { el, state, cancelled } = (e as CustomEvent).detail;
    const value = state?.[field]?.value;

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (cancelled) {
      return [true, value];
    }

    for (const validator of validators) {
      const msg = validator(value);
      this.#dispatchError(el, field, msg, options);
      if (msg) {
        return [false, ""];
      }
    }
    return [true, value];
  }

  /**
   * Validates a group of fields ensuring that at least `minPassCount` of the items within the group
   * passes. This is useful in the scenario when n number fields are required out of n+m number of fields.
   *
   * @param {string[]} fields - An array of field names to be validated.
   * @param {Event} e - The event object associated with the validation trigger.
   * @param minPassCount - The minimum number of fields that are required to pass to return true.
   * @param {FieldValidator[]} validators - An array of validator functions to apply to the fields.
   * @return {boolean} - Returns true if at least one field in the group is valid; otherwise, false.
   */
  validateGroup(e: Event, fields: string[], minPassCount: number, validators: FieldValidator[]): boolean {
    let passCount = 0;
    for (const field of fields) {
      const [_valid] = this.validate(e, field, validators, { grouped: true });
      if (_valid) {
        passCount++;
      }
    }

    return passCount >= minPassCount;
  }

  edit(index: number) {
    relay(this._formRef, "external::alter:state", { index, operation: "edit" });
  }

  remove(index: number) {
    relay(this._formRef, "external::alter:state", { index, operation: "remove" });
  }

  // Private method to dispatch the error message to the form element
  #dispatchError(el: HTMLElement, name: string, msg: string, options?: { grouped: boolean }) {
    el.dispatchEvent(
      new CustomEvent("msg", {
        composed: true,
        detail: {
          action: "external::set:error",
          data: {
            name,
            msg,
            grouped: options?.grouped,
          },
        },
      }),
    );
  }

  // removes any data collected that doesn't correspond with the final history path
  clean(data: AppState<T>) {
    return data.history.reduce<Record<string, unknown>>((acc, fieldsetId) => {
      acc[fieldsetId] = data.form[fieldsetId];
      return acc;
    }, {});
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
