export type FormStatus = "not-started" | "cannot-start-yet" | "in-progress" | "submitted" | "update-needed" | "complete";

export type FormState = {
  uuid: string;
  form: Record<string, Fieldset>;
  history: string[];
  editting: string;
  lastModified?: Date;
  status: FormStatus;
};

export type Fieldset = {
  heading?: string;
  data?: FieldsetData;
};

export type FieldsetData =
  | { type: "details"; fieldsets: Record<string, FieldsetItemState> }
  | { type: "list"; items: FormState[] };

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
export const FormResetFormMsg = "form::reset:form";

// Message to allow forms to register themselves with their parent form to allow for
// form data to be passed down to the child form
export const FormBindMsg = "form::bind";
export type FormBindRelayDetail = {
  id: string;
  el: HTMLElement;
};

export const FormToggleActiveMsg = "form::toggle:active";
export type FormToggleActiveRelayDetail = {
  active: boolean;
};

export const FormSetFieldsetMsg = "form::set:fieldset";
export type FormSetFieldsetRelayDetail = {
  name: string;
  value: FieldsetData;
};

export const FormDispatchStateMsg = "form::dispatch:state";
export type FormDispatchStateRelayDetail = FormState;
export type FormDispatchStateRelayDetailList = FormState[];

export const FormDispatchEditMsg = "form::edit";
export type FormDispatchEditRelayDetail = { id: string };

// ======
// Subform
// ======

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

export const FieldsetResetErrorsMsg = "fieldset::reset:errors";
export const FieldsetResetFieldsMsg = "fieldset::reset:fields";
export const FieldsetCompleteMsg = "fieldset::submit";

// ========
// FormPage
// ========

export const FormPageContinueMsg = "form-page:continue";
export type FormPageContinueRelayDetail = {
  cancelled: boolean;
};

export const FormPageBackMsg = "form-page:back";

export const FormPageBindMsg = "form=page::bind";
export type FormPageBindRelayDetail = {
  id: string;
  heading: string;
  el: HTMLElement;
};

// ========
// Fieldset
// ========

export const FieldsetBindMsg = "fieldset::bind";
export type FieldsetBindRelayDetail = {
  id: string;
  el: HTMLElement;
  cb?: (id: string) => void;
};

export const FieldsetSetErrorMsg = "fieldset::set:error";
export type FieldsetErrorRelayDetail = {
  error: string;
};

export const FieldsetChangeMsg = "fieldset::change";
export type FieldsetChangeRelayDetail = {
  id: string;
  state: {
    heading?: string;
    data: Record<string, FieldsetItemState>;
  };
  dispatchOn: "change" | "continue";
};

export type FieldsetItemState = {
  name: string;
  label: string;
  value: string | number | Date;
  order: number;
  valueLabel?: string; // for radio/checkbox label to be able to display on summary page
  labels? : string[]
};

export type FieldsetValidationRelayDetail = {
  el: HTMLElement;
  state: Record<string, FieldsetItemState>;
  cancelled: boolean;
};

export const FieldsetSetValueMsg = "fieldset::set:value";

// TODO: I don't think name is required, which would allow this type to eliminate the
//       need for the FieldsetResetFieldMsg/Detail
export type FieldsetSetValueRelayDetail = {
  name: string;
  value: string | number | Date | string[];
};

// ========
// FormItem
// ========

export const FormItemMountMsg = "form-item::bind";
export type FormItemMountRelayDetail = {
  id: string;
  label: string;
  el: HTMLElement;
  order: number;
};

// ========
// External
// ========

export const ExternalAlterDataMsg = "external::alter:state";
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

export const ExternalContinueMsg = "external::continue";
export type ExternalContinueRelayDetail = {
  next: string;
};

export const ExternalSetErrorMsg = "external::set:error";
export type ExternalErrorRelayDetail = {
  name: string;
  msg: string;
  grouped: boolean; // whether the error message applies to more than one form field
};

export const ExternalInitStateMsg = "external::init:state";
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
export type FormSummaryBindRelayDetail = {
  el: HTMLElement;
};

export const FormSummaryEditPageMsg = "form-summary::edit:page";
export type FormSummaryEditPageRelayDetail = {
  id: string;
};
