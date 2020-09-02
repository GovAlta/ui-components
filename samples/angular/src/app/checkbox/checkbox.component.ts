import { Component } from '@angular/core';

@Component({
  selector: 'checkbox-sample',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxSampleComponent {
  ngModelValue = { checked: true };
  indeterminateCheckboxItem = {
    checked: false,
    required: false,
    disabled: false,
  };

  indeterminateChildren = [
    {
      checked: false,
      label: 'Child 1',
    },
    {
      checked: false,
      label: 'Child 2',
    },
    {
      checked: false,
      label: 'Child 3',
    },
  ];

  clickHandler() {
    console.log('I was clicked!');
  }

  onCheckBoxSelectionChange(event) {
    console.log(`checkbox was ${event.checked ? 'checked' : 'unchecked'}`);
  }

  onIndeterminateClick(event) {
    // set all children to checked or not checked based on the checked state of the parent indeterminate checkbox
    this.indeterminateChildren.forEach(ic => ic.checked = event.target.checked);
  }

  isIndeterminate = false;

  checkIndeterminate() {
    const checkedStatus = this.indeterminateChildren.map(ic => ic.checked);
    const every  = checkedStatus.every(Boolean);
    const some = checkedStatus.some(Boolean);

    this.isIndeterminate = some && !every;

    this.indeterminateCheckboxItem.checked = every;
  }

  ngOnInit(): void {
    this.checkIndeterminate();
  }

  childModelChange() {
    const x = this.indeterminateChildren;
  }
}
