import { GoARadioChange } from '@abgov/angular-components';
import { Component } from '@angular/core';

@Component({
  selector: 'radios-sample',
  templateUrl: './radios.component.html',
  styleUrls: ['./radios.component.css']
})
export class RadiosSampleComponent {
  selectedRadioValue = '--';
  selectedGroupRadioValue = '--';

  clickHandler() {
    console.log('I was clicked!');
  }

  onRadioSelectionChange(event: GoARadioChange) {
    console.log(`radio was ${event.checked ? 'checked' : 'unchecked'}`);
    this.selectedRadioValue = event.source.value;
  }

  onRadioGroupSelectionChange(event: GoARadioChange) {
    console.log(`radio was ${event.checked ? 'checked' : 'unchecked'}`);
    this.selectedGroupRadioValue = event.source.value;
  }

  ngOnInit(): void {
  }
}
