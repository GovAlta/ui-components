import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  TemplateRef,
  booleanAttribute,
  numberAttribute,
} from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import {
  GoabSnackbarType,
  GoabSnackbarVerticalPosition,
  GoabSnackbarHorizontalPosition,
  Spacing,
} from "@abgov/ui-components-common";

@Component({
  standalone: true,
  selector: "goab-snackbar",
  imports: [NgTemplateOutlet],
  template: `
    <goa-snackbar
      [attr.type]="type"
      [attr.duration]="duration"
      [attr.progress]="progress"
      [attr.testid]="testId"
      [visible]="visible"
      [attr.verticalposition]="verticalPosition"
      [attr.horizontalposition]="horizontalPosition"
      [attr.mt]="mt"
      [attr.mb]="mb"
      [attr.ml]="ml"
      [attr.mr]="mr"
    >
      <ng-content />
      <div slot="actions">
        <ng-container [ngTemplateOutlet]="actions"></ng-container>
      </div>
    </goa-snackbar>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabSnackbar {
  @Input() type?: GoabSnackbarType;
  @Input({ transform: numberAttribute }) duration?: number = 4000;
  @Input({ transform: numberAttribute }) progress?: number = -1;
  @Input() testId?: string;
  @Input({ transform: booleanAttribute }) visible?: boolean = false;
  @Input() verticalPosition?: GoabSnackbarVerticalPosition = "bottom";
  @Input() horizontalPosition?: GoabSnackbarHorizontalPosition = "left";
  @Input() actions!: TemplateRef<any>;
  @Input() mt?: Spacing;
  @Input() mb?: Spacing;
  @Input() ml?: Spacing;
  @Input() mr?: Spacing;
}
