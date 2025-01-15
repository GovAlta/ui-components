export type FormStatus = "not-started" | "incomplete" | "complete";

export type FormState = {
  uuid: string;
  // TODO: rename form to "data" or "detail"
  form: Record<string, Fieldset>;
  history: string[];
  editting: string;
  lastModified?: Date;
  status: FormStatus;
};

export type Fieldset = {
  heading?: string;
  skipSummary?: boolean;
  data?: FieldsetData;
};

export type FieldsetData =
  | { type: "details"; fieldsets: Record<string, FieldsetItemState> }
  | { type: "list"; items: FormState[] }; // TODO: rename `items` to `form`

// ===========
// StateChange
// ===========

export const StateChangeEvent = "_stateChange";
export type StateChangeRelayDetail =
  | {
      type: "details";
      data: FormState;
    }
  | {
      id: string;
      type: "list";
      data: FormState[];
    };

// ====
// Form
// ====

export const FormResetErrorsMsg = "form::reset:errors";
export const FormSetFieldsetMsg = "form::set:fieldset";
export const FormDispatchStateMsg = "form::dispatch:state";
export const FormToggleActiveMsg = "form::toggle:active";
export const FormStateChangeMsg = "form::state:change";
export const FormBackUrlMsg = "form::back-url";

export const FormResetFormMsg = "form::reset:form";

// Message to allow forms to register themselves with their parent form to allow for
// form data to be passed down to the child form
export const FormBindMsg = "form::bind";
export type FormBindRelayDetail = {
  id: string;
  el: HTMLElement;
};

export type FormStateChangeRelayDetail = Fieldset;

export type FormToggleActiveRelayDetail = {
  first: boolean;
  active: boolean;
};

export type FormSetFieldsetRelayDetail = {
  name: string;
  value: FieldsetData;
};

export type FormDispatchStateRelayDetail = FormState;
export type FormDispatchStateRelayDetailList = FormState[];

export const FormDispatchEditMsg = "form::edit";
export type FormDispatchEditRelayDetail = { id: string };

export type FormBackUrlDetail = {
  url: string;
};

// ======
// Subform
// ======

export type SubFormDeleteDataRelayDetail = {
  data: FormState[];
  id: string;
};
export const SubFormDeleteDataMsg = "subform::delete:data";

export const SubFormBindMsg = "subform::bind";
export type SubFormBindRelayDetail = {
  el: HTMLElement;
};
// ============
// SubformIndex
// ============
export const SubFormIndexContinueToParentMsg = "subform::indexContinueToParent";
export const SubFormIndexContinueToSubFormMsg =
  "subform::indexContinueToSubForm";

// ========
// Fieldset
// ========

export const FieldsetToggleActiveMsg = "fieldset::toggle-active";
export const FieldsetResetErrorsMsg = "fieldset::reset:errors";
export const FieldsetResetFieldsMsg = "fieldset::reset:fields";
export const FieldsetBindMsg = "fieldset::bind";
export const FieldsetCompleteMsg = "fieldset::submit";
export const FieldsetSetErrorMsg = "fieldset::set:error";
// Sent after fieldset handles _change events from goa input-like components
export const FieldsetChangeMsg = "fieldset::change";
// Sent to form containing the name and el of the bound child, along with the fieldset id
export const FieldsetMountFormItemMsg = "fieldset::bind:form-item";

export type FieldsetBindRelayDetail = {
  id: string;
  skipSummary?: boolean;
  heading: string;
  el: HTMLElement;
};

export type FieldsetErrorRelayDetail = {
  error: string;
};

export type FieldsetChangeRelayDetail = {
  id: string;
  state: {
    heading: string;
    data: Record<string, FieldsetItemState>;
  };
  dispatchOn: "change" | "continue";
};

export type FieldsetMountFormRelayDetail = {
  id: string;
  name: string;
  el: HTMLElement;
};

export type FieldsetItemState = {
  name: string;
  label: string;
  value: string | number | Date;
  order: number;
};

export type FieldsetValidationRelayDetail = {
  el: HTMLElement;
  state: Record<string, FieldsetItemState>;
  first: boolean;
  last: boolean;
};

export const FieldsetSetValueMsg = "fieldset::set:value";
export type FieldsetSetValueRelayDetail = {
  name: string;
  value: string | number | Date;
};

// ========
// FormItem
// ========

export const FormItemMountMsg = "form-item::bind";

export type FormItemMountRelayDetail = {
  id: string;
  label: string;
  el: HTMLElement;
};

// ========
// External
// ========

export const ExternalSetErrorMsg = "external::set:error";
export const ExternalContinueMsg = "external::continue";
export const ExternalAppendDataMsg = "external::append:state";
export const ExternalAlterDataMsg = "external::alter:state";
export const ExternalInitStateMsg = "external::init:state";

export type ExternalAlterDataRelayDetail =
  | {
      id: string;
      operation: "remove";
      index: number;
    }
  | {
      id: string;
      operation: "edit";
      index: number;
    };

export type ExternalContinueRelayDetail = {
  next: string;
};

export type ExternalErrorRelayDetail = {
  name: string;
  msg: string;
};

export type ExternalAppendDataRelayDetail = {
  id: string;
  data: FieldsetItemState;
};

export type ExternalInitStateDetail = FormState | string;

// =========
// FormField
// =========

export const FormFieldMountMsg = "form-field::bind";
export type FormFieldMountRelayDetail = {
  name: string;
  el: HTMLElement;
};

// ===========
// FormSummary
// ===========

export const FormSummaryBindMsg = "form-summary::bind";
export const FormSummaryEditPageMsg = "form-summary::edit:page";

export type FormSummaryBindRelayDetail = {
  el: HTMLElement;
};

export type FormSummaryEditPageRelayDetail = {
  id: string;
};

// ======
// Button
// ======

export type PublicFormButtonClick = {
  action: string;
  index: number;
};
