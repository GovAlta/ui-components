import { Component, OnInit, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  GoabButton, GoabButtonGroup, GoabDivider, GoabDropdown, GoabDropdownItem,
  GoabFormItem, GoabInput, GoabRadioGroup, GoabRadioItem,
} from "@abgov/angular-components";
import type {
  GoabDropdownItemMountType, GoabDropdownOnChangeDetail,
  GoabInputOnChangeDetail, GoabRadioGroupOnChangeDetail,
} from "@abgov/ui-components-common";

interface Task {
  value: string;
  label: string;
  mount: GoabDropdownItemMountType;
}

@Component({
  standalone: true,
  selector: "abgov-docs-dropdown",
  templateUrl: "./dropdown.component.html",
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    GoabButton, GoabButtonGroup, GoabDivider, GoabDropdown, GoabDropdownItem,
    GoabFormItem, GoabInput, GoabRadioGroup, GoabRadioItem,
  ],
})
export class DocsDropdownComponent implements OnInit {
  private fb = inject(FormBuilder);

  basicForm = new FormGroup({
    province: new FormControl(""),
  });

  ngModelProvince = "";

  placeholderForm: FormGroup = this.fb.group({
    contactMethod: [""],
  });
  statesForm: FormGroup = this.fb.group({
    disabled: [{ value: "AB", disabled: true }],
    errorValue: [""],
  });

  // Examples - dynamically add
  defaultTasks: Task[] = [
    { label: "Finish Report", value: "finish-report", mount: "append" },
    { label: "Attend Meeting", value: "attend-meeting", mount: "append" },
    { label: "Reply Emails", value: "reply-emails", mount: "append" },
  ];
  tasks: Task[] = [...this.defaultTasks];
  newTask = "";
  mountType: GoabDropdownItemMountType = "append";
  selectedTask = "";
  taskError = false;
  renderTrigger = true;

  // Examples - dynamically change
  changeForm = new FormGroup({
    parentDropdown: new FormControl(""),
    childDropdown: new FormControl(""),
  });
  parents = ["All", "Big", "Small"];
  children: string[] = [];
  childrenAll = ["Bus", "Elephant", "Key", "Pen", "Watch", "Truck"];
  childrenBig = ["Elephant", "Truck", "Bus"];
  childrenSmall = ["Key", "Pen", "Watch"];

  ngOnInit(): void {
    this.changeForm.get("parentDropdown")?.valueChanges.subscribe((value) => {
      if (value === "All") this.children = this.childrenAll;
      else if (value === "Big") this.children = this.childrenBig;
      else this.children = this.childrenSmall;
    });
  }

  onDropdownChange(event: GoabDropdownOnChangeDetail): void {
    this.ngModelProvince = event.value as string;
  }

  // Dynamically add handlers
  onMountTypeChange(event: GoabRadioGroupOnChangeDetail): void {
    this.mountType = event.value as GoabDropdownItemMountType;
  }

  onNewTaskChange(event: GoabInputOnChangeDetail): void {
    this.newTask = event.value;
    this.taskError = false;
  }

  onSelectedTaskChange(event: GoabDropdownOnChangeDetail): void {
    this.selectedTask = event.value as string;
  }

  addTask(): void {
    if (this.newTask === "") {
      this.taskError = true;
      return;
    }
    this.taskError = false;
    const task: Task = {
      label: this.newTask,
      value: this.newTask.toLowerCase().replace(" ", "-"),
      mount: this.mountType,
    };
    this.tasks = this.mountType === "prepend"
      ? [task, ...this.tasks]
      : [...this.tasks, task];
    this.newTask = "";
  }

  reset(): void {
    this.newTask = "";
    this.selectedTask = "";
    this.taskError = false;
    this.tasks = [...this.defaultTasks];
    this.renderTrigger = false;
    setTimeout(() => { this.renderTrigger = true; }, 0);
  }
}
