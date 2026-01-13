import { Component } from "@angular/core";

@Component({
  selector: "app-ask-for-birthday",
  templateUrl: "./angular.html",
})
export class AskForBirthdayComponent {
  birthdate: Date | undefined;

  onDateChange(event: { value: Date }) {
    this.birthdate = event.value;
  }
}
