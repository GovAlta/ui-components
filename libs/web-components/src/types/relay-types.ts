export type FormStatus = "not-started" | "incomplete"| "complete";

export type FormState = {
  form: Record<string, FieldsetData>;
  history: string[];
  editting: string;
  lastModified?: Date;
  status: FormStatus;
};

export type FieldsetData =
  | Record<string, FieldsetItemState>
  | Record<string, FieldsetItemState>[];

// ====
// Form
// ====

export const FormResetErrorsMsg = "form::reset:errors";
export const FormSetFieldsetMsg = "form::set:fieldset";
export const FormSetValueMsg = "form::set:value";
export const FormDispatchStateMsg = "form::dispatch:state";
export const FormToggleActiveMsg = "form::toggle:active";
export const FormStateChangeMsg = "form::state:change";
export const FormBindMsg = "form::bind";

export type FormBindRelayDetail = {
  el: HTMLElement;
};
export type FormStateChangeRelayDetail = FieldsetData;

export type FormFieldMountRelayDetail = {
  name: string;
  el: HTMLElement;
};

export type FormToggleActiveRelayDetail = {
  first: boolean;
  active: boolean;
};

export type FormSetFieldsetRelayDetail = {
  name: string;
  value: Record<string, FieldsetItemState> | Record<string, FieldsetItemState>[];
};

export type FormSetValueRelayDetail = {
  name: string;
  value: string | number | Date;
};

export type FormDispatchStateRelayDetail = FormState;

// ========
// Fieldset
// ========

export const FieldsetToggleActiveMsg = "fieldset::toggle-active";
export const FieldsetResetErrorsMsg = "fieldset::reset:errors";
export const FieldsetResetFieldsMsg = "fieldset::reset:fields";
export const FieldsetBindMsg = "fieldset::bind";
export const FieldsetSubmitMsg = "fieldset::submit";
export const FieldsetSetErrorMsg = "fieldset::set:error";
// Sent after fieldset handles _change events from goa input-like components
export const FieldsetChangeMsg = "fieldset::change";
// Sent to form containing the name and el of the bound child, along with the fieldset id
export const FieldsetMountFormItemMsg = "fieldset::bind:form-item";

export type FieldsetBindRelayDetail = {
  id: string;
  heading: string;
  el: HTMLElement;
};

export type FieldsetErrorRelayDetail = {
  error: string;
};

export type FieldsetChangeRelayDetail = {
  id: string;
  state: Record<string, FieldsetItemState>;
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
};

export type FieldsetValidationRelayDetail = {
  el: HTMLElement;
  state: Record<string, FieldsetItemState>;
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
export const ExternalResetStateMsg = "external::reset:state";

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
      data: FieldsetData;
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

// =========
// FormField
// =========

export const FormFieldMountMsg = "form-field::bind";

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
