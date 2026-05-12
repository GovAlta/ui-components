import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  GoabBlock,
  GoabButton,
  GoabButtonGroup,
  GoabDropdownItem,
  GoabDropdownMultiselect,
  GoabFormItem,
  GoabModal,
  GoabText,
} from "@abgov/angular-components";
import { GoabDropdownMultiselectOnChangeDetail } from "@abgov/ui-components-common";

const FRUIT_POOL = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
  { value: "fig", label: "Fig" },
];

@Component({
  standalone: true,
  selector: "abgov-feat1233",
  templateUrl: "./feat1233.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GoabBlock,
    GoabButton,
    GoabButtonGroup,
    GoabDropdownItem,
    GoabDropdownMultiselect,
    GoabFormItem,
    GoabModal,
    GoabText,
  ],
})
export class Feat1233Component implements OnInit {
  private fb = inject(FormBuilder);
  form = this.fb.group({
    fruitsReactive: [[] as string[]],
    fruitsControlledReactive: [["apple", "banana"] as string[]],
  });
  fruitsNgModel: string[] = [];
  fruitsControlledNgModel: string[] = ["apple", "banana"];
  selected1: string[] = [];
  selected2: string[] = ["apple", "banana"];
  selectedFilterable: string[] = [];
  selectedSelectAll: string[] = [];
  brooklyn99Selected: string[] = [
    "Andy Samberg",
    "Stephanie Beatriz",
    "Terry Crews",
    "Andre Braugher",
  ];
  asyncOptions: { value: string; label: string }[] = [];
  asyncLoading = true;
  selectedAsync: string[] = [];
  modalOpen = false;
  selectedInModal: string[] = [];
  filterableModalOpen = false;
  selectedFilterableInModal: string[] = [];
  maxHeightOptions = Array.from({ length: 100 }, (_, i) => ({ value: `fruit-${i}`, label: `Fruit ${i}` }));

  ngOnInit(): void {
    // Simulate options arriving from an API after a delay.
    setTimeout(() => {
      this.asyncOptions = FRUIT_POOL.slice(0, 3);
      this.asyncLoading = false;
    }, 3000);
  }

  addOption() {
    const next = FRUIT_POOL[this.asyncOptions.length];
    if (next) {
      this.asyncOptions = [...this.asyncOptions, next];
    }
  }

  removeLastOption() {
    this.asyncOptions = this.asyncOptions.slice(0, -1);
  }

  onSelected1Change(detail: GoabDropdownMultiselectOnChangeDetail) {
    this.selected1 = detail.value;
  }

  onSelected2Change(detail: GoabDropdownMultiselectOnChangeDetail) {
    this.selected2 = detail.value;
  }

  onFilterableChange(detail: GoabDropdownMultiselectOnChangeDetail) {
    this.selectedFilterable = detail.value;
  }

  onBrooklyn99Change(detail: GoabDropdownMultiselectOnChangeDetail) {
    this.brooklyn99Selected = detail.value;
  }

  onSelectAllChange(detail: GoabDropdownMultiselectOnChangeDetail) {
    this.selectedSelectAll = detail.value;
  }

  resetBasic() {
    this.selected1 = [];
  }

  resetReactive() {
    this.form.get("fruitsReactive")?.setValue([]);
  }

  resetNgModel() {
    this.fruitsNgModel = [];
  }
}
