import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  GoabDataGrid,
  GoabTable,
  GoabTableSortHeader,
  GoabCheckbox
} from "@abgov/angular-components";


@Component({
  standalone: true,
  selector: "abgov-bug3637",
  templateUrl: "./bug3637.component.html",
  imports: [CommonModule,
  GoabDataGrid,
  GoabTable,
  GoabTableSortHeader,
  GoabCheckbox
],
})
export class Bug3637Component {}
