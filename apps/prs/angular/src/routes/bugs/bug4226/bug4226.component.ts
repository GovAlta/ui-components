import { Component } from "@angular/core";
import {
  GoabButton,
  GoabButtonGroup,
  GoabDivider,
  GoabFormItem,
  GoabLink,
  GoabRadioGroup,
  GoabRadioItem,
  GoabText,
} from "@abgov/angular-components";

type RadioOption = {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
};

type RadioScenario = {
  id: string;
  title: string;
  description: string;
  initial: string;
  disabled?: boolean;
  orientation?: "vertical" | "horizontal";
  size?: "default" | "compact";
  options: RadioOption[];
};

const fruitOptions: RadioOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

const scenarios: RadioScenario[] = [
  {
    id: "basic",
    title: "Basic, unselected group",
    description:
      "Tab will enter at Apple and not select it. Use arrow keys to select other items, it will wrap. Spacebar selects the first item. Accessibility should read x of 3.",
    initial: "",
    options: [
      {
        value: "apple",
        label: "Apple",
      },
      {
        value: "banana",
        label: "Banana",
      },
      {
        value: "cherry",
        label: "Cherry",
      },
    ],
  },
  {
    id: "explicit",
    title: "Explicitly enabled items",
    description:
      "The group and each item explicitly receive disabled=false. All three options should remain available to readers and selectable with Space or the mouse.",
    initial: "",
    disabled: false,
    options: [
      {
        value: "apple",
        label: "Apple",
        disabled: false,
      },
      {
        value: "banana",
        label: "Banana",
        disabled: false,
      },
      {
        value: "cherry",
        label: "Cherry",
        disabled: false,
      },
    ],
  },
  {
    id: "preset",
    title: "Preselected, horizontal and compact",
    description: "Banana starts selected. Tab will select Banana.",
    initial: "banana",
    orientation: "horizontal",
    size: "compact",
    options: [
      {
        value: "apple",
        label: "Apple",
        description: "First option",
      },
      {
        value: "banana",
        label: "Banana",
        description: "Initially selected",
      },
      {
        value: "cherry",
        label: "Cherry",
        description: "Last option",
      },
    ],
  },
  {
    id: "middle",
    title: "Disabled middle item",
    description:
      "Banana is unavailable and skipped by arrow keys. Apple and Cherry should announce 1 of 2 and 2 of 2, then wrap.",
    initial: "",
    options: [
      {
        value: "apple",
        label: "Apple",
      },
      {
        value: "banana",
        label: "Banana",
        disabled: true,
      },
      {
        value: "cherry",
        label: "Cherry",
      },
    ],
  },
  {
    id: "edges",
    title: "Only one enabled item",
    description:
      "Apple and Cherry are disabled. Tab enters at Banana, which announces 1 of 1. Arrow keys stay on Banana. Tab still leaves the group.",
    initial: "",
    options: [
      {
        value: "apple",
        label: "Apple",
        disabled: true,
      },
      {
        value: "banana",
        label: "Banana",
      },
      {
        value: "cherry",
        label: "Cherry",
        disabled: true,
      },
    ],
  },
  {
    id: "disabled-selection",
    title: "The selected item is disabled",
    description:
      "Banana starts selected but disabled. Tab enters at Apple without changing the selection. Space or an arrow key selects an enabled option.",
    initial: "banana",
    options: [
      {
        value: "apple",
        label: "Apple",
      },
      {
        value: "banana",
        label: "Banana",
        disabled: true,
      },
      {
        value: "cherry",
        label: "Cherry",
      },
    ],
  },
];

@Component({
  standalone: true,
  selector: "abgov-bug4226",
  templateUrl: "./bug4226.component.html",
  imports: [
    GoabButton,
    GoabButtonGroup,
    GoabDivider,
    GoabFormItem,
    GoabLink,
    GoabRadioGroup,
    GoabRadioItem,
    GoabText,
  ],
})
export class Bug4226Component {
  readonly scenarios = scenarios;
  readonly fruitOptions = fruitOptions;
  values: Record<string, string> = Object.fromEntries(
    scenarios.map((scenario) => [scenario.id, scenario.initial]),
  );
  disabledItems = ["banana"];
  disabledValue = "apple";
  items: RadioOption[] = [...fruitOptions];
  listValue = "banana";
  nextOption = 1;
  outerValue = "";
  innerValue = "";

  toggleItem(value: string): void {
    this.disabledItems = this.disabledItems.includes(value)
      ? this.disabledItems.filter((item) => item !== value)
      : [...this.disabledItems, value];
  }

  addItem(atStart: boolean): void {
    const item = {
      value: `added-${this.nextOption}`,
      label: `Added option ${this.nextOption}`,
    };
    this.nextOption++;
    this.items = atStart ? [item, ...this.items] : [...this.items, item];
  }

  reverseItems(): void {
    this.items = [...this.items].reverse();
  }

  removeItem(value: string): void {
    this.items = this.items.filter((item) => item.value !== value);
    if (this.listValue === value) this.listValue = "";
  }
}
