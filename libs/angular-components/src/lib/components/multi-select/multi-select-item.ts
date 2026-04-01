import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  inject,
} from "@angular/core";

@Component({
  standalone: true,
  selector: "goab-multi-select-item",
  template: `@if (isReady) {
    <goa-multi-select-option
      [value]="value"
      [label]="label"
      [attr.filter]="filter"
    >
    </goa-multi-select-option>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabMultiSelectItem implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  @Input({ required: true }) value!: string;
  @Input() filter?: string;
  @Input() label?: string;

  isReady = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }
}
