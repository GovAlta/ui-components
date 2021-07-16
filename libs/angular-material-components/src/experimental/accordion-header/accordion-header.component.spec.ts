import { MatAccordion } from '@angular/material/expansion';
import { GoaAccordionHeaderComponent } from './accordion-header.component';

describe('AccordionHeaderComponent', () => {
  let component: GoaAccordionHeaderComponent;

  beforeEach(() => {
    component = new GoaAccordionHeaderComponent({} as MatAccordion);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
