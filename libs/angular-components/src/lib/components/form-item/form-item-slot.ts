import { Component, Input } from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-form-item-slot",
  template: `<ng-content></ng-content>`,
})
/**
 * @deprecated Use `TemplateRef` inputs on `goab-form-item` (`[helpText]` / `[error]`) instead.
 */
export class GoabFormItemSlot {
  /** @required Sets which form-item slot this content should render into. */
  @Input({ required: true }) slot!: "helptext" | "error";
}
