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

  metaLinks = '[ { url:"#", title: "meta abc xyz1" }, { url:"#", title: "meta abc xyz2" }, { url:"#", title: "meta  abc xyz3" }, { url:"#", title: "meta  abc xyz4" }]';
  navigationSections = `[
    { name: "Health Care", links: [{ url:"#", title: "navigation  abc xyz1" }, { url:"#", title: "navigation  abc xyz2" }]},
    { name: "Young At Heart", links: [{url:"#", title: "navigation  abc xyz3" }, { url:"#", title: "navigation  abc xyz4" }, { url:"#", title: "navigation  abc xyz5" }, { url:"#", title: "navigation  abc xyz6" }, { url:"#", title: "navigation  abc xyz7" }]},
    { name: "Transit tickets", links: [{ url:"#", title: "navigation  abc xyz8" }, { url:"#", title: "navigation  abc xyz9" }, { url:"#", title: "navigation  abc xyz10" }]}
  ]`;

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
