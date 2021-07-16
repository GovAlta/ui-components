import { Component, ChangeDetectionStrategy, Input, Host } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'goa-accordion-header',
  templateUrl: './accordion-header.component.html',
  styleUrls: ['./accordion-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoaAccordionHeaderComponent {
  /**
   Collapse All button tooltip
   */
  @Input()
  collapseTooltip?= 'Collapse All';

  /**
  Expand All button tooltip
  */
  @Input() expandTooltip?= 'Expand All';

  constructor(@Host() public accordion: MatAccordion) { }
}
