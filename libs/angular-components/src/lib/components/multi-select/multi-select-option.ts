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
  selector: "goab-multi-select-option",
  template: `@if (isReady) {
    <goa-multi-select-option
      [value]="value"
      [label]="label"
    >
    </goa-multi-select-option>
  }`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabMultiSelectOption implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  @Input({ required: true }) value!: string;
  @Input() label?: string;

  isReady = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }
}