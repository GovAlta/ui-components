import { Component } from '@angular/core';

class User {
  constructor(public id: number, public name: string) {}
}

@Component({
  selector: 'ngd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  availableUsers: User[] = [
    new User(1, "jim"),
    new User(2, "john"),
    new User(3, "sam"),
  ]

  selectedUsers: number[] = [];

  multiselect = false;
  filterable = true;
  error = false;

  onInputChangeEvent(event: any) {
    console.log('onEvent', event.detail);
  }

  onCheckboxChangeEvent(event: any) {
    console.log('onChange event of checkbox', event.detail);
  }

  onRadioChange(e: any) {
    console.log('onRadioChange', e.detail.name, e.detail.value);
  }

  submitForm() {
    console.log('handleClick');
  }


  onAssignedUserSelected(event: any) {
    console.log('users selected', event.detail.value)
    this.selectedUsers = event.detail.value;
  }
}
