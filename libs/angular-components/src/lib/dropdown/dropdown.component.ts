import { Component, OnInit, AfterViewInit, Input, Output, ContentChildren, EventEmitter, ViewChild, ElementRef, QueryList, ChangeDetectorRef, Query } from '@angular/core';

import { GoAOptionComponent } from './option/option.component';
import { GoAOptionGroupComponent } from './option-group/option-group.component';

import { ConnectedPosition } from '@angular/cdk/overlay';
import '@angular/cdk/overlay-prebuilt.css';
import { throwError } from 'rxjs';

@Component({
  selector: 'goa-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
/**
 * Dropdown component with Government of Alberta styling.
 */
export class GoADropdownComponent implements OnInit, AfterViewInit {
  /**
   * boolean for if the dropdown is open.
   */
  _isOpen = false;

  /**
   * Is the required error tripped?
   */
  _requiredError = false;
  
  /**
   * Bounding box of textInput.
   */
  _triggerRect;
  
    /**
   * This position config ensures that the top "start" corner of the overlay
   * is aligned with with the bottom "start" of the origin by default (overlapping
   * the trigger completely). If the panel cannot fit below the trigger, it
   * will fall back to a position above the trigger.
   */
  _positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
    },
  ];

  /**
   * The current active option
   */
  _activeOption: GoAOptionComponent;

  /**
   * The current active index
   */
  _activeIndex;

  /**
   * All options currently matching filter including groups.
   */
  _allFilteredOptions: Array<GoAOptionComponent> = [];
  
  /**
   * The list of filtered options to show in the view.
   */
  _filteredOptions: Array<GoAOptionComponent>;

  /**
   * Whats the mode for typeahead.  
   */
  @Input() typeaheadMode: 'none' | 'contains' | 'startsWith' = 'none'; 

  /**
   * The label for the dropdown.
   */
  @Input() label: string;

  /**
   * Helper text description of the dropdown.
   */
  @Input() description: string;

  /**
   * Update the selected options, select the options with the given ids
   */
  @Input() 
  set selectedIds(ids: Array<string>) {
    if(this.allOptions === undefined) {
      // aren't initialized yet, return
      return;
    }

    if(ids === null || ids === undefined) {
      ids = [];
    }

    if(ids.length > 1 && this.multiple === false) {
      throw new Error("Cannot select multiple options when the dropdown has multiple set to false.");
    }

    const selectedOptions = [];    
    this.allOptions.forEach(option => {
      if(ids.includes(option.id)) {
        option.selected = true;
        selectedOptions.push(option);
      } 
      else {
        option.selected = false;
      }
    });

    this.selectionChanged(selectedOptions, true);
  }

  /**
   * Is the select disabled.
   */
  @Input() disabled = false;

  /**
   * Is multiple selection?
   */
  @Input() 
  set multiple(value: boolean) {    
    this._multiple = value;
    if(this._multiple === false) {
      // If we have changed from multiple to no multiple then deselect everything.
      this.selectedItems.forEach(option => {
        option.selected = false;
      });
    }
  }
  get multiple(): boolean {
    return this._multiple;
  }
  private _multiple = false;

  /**
   * Is a selection required?
   */
  @Input() 
  set required(value: boolean) {
    this._required = value;
    this._requiredError = this.selectedItems.length === 0 && this._required === true;
  }
  get required(): boolean {
    return this._required;
  }
  private _required = false;

  /**
   * The select element.
   */
  @ViewChild('textInput') textInput: ElementRef<HTMLInputElement>;

  /** 
   * All options.  
   */
  @ContentChildren(GoAOptionComponent, {descendants: true}) allOptions: QueryList<GoAOptionComponent>;

  /** 
   * The top level options for rendering options.  
   */
  @ContentChildren(GoAOptionComponent, {descendants: false}) options: QueryList<GoAOptionComponent>;

  /** 
   * The option groups for rendering.  
   */
  @ContentChildren(GoAOptionGroupComponent, {descendants: false}) optionGroups: QueryList<GoAOptionGroupComponent>;

   /**
   * Event emitted containing the value field of all selected options when the selection changes.  
   */
  @Output() selectionChange = new EventEmitter<Array<any>>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {

  }

  ngAfterViewInit() {    
    this._triggerRect = this.textInput.nativeElement.getBoundingClientRect();

    this._filteredOptions = [...this.options];
    this._allFilteredOptions = [...this.allOptions];

    if(this.selectedItems.length === 0) {
      // no option was selected by default, select the first in the list
      const firstOption = this.allOptions.first;
      firstOption.selected = true;
      this.setTextInput(firstOption.label);
    }
    else {
      this.setTextInput(this.selectedItems[0].label);
    }

    // The template output cache is populated by child components during render, so tell angular that there have been changes during the render here.
    this.cdr.detectChanges();
  }

    /**
   * Called when user updates the text in the searchbox.
   * @param text The text of the input
   */
  onFilterChange(text: string) {  
    // open the dropdown if it is not already  
    if(!this._isOpen === true) {
      this._isOpen = true;
    }
    
    this.filterOptions(text);
  }

  /**
   * Handler for keyboard events when menu is open.
   * @param event keyboard event
   */
  overlayKeydown(event: KeyboardEvent) {
    if(event.code === 'Enter' || event.code === 'NumpadEnter') {
      this.optionClicked(this._activeOption);
    }
    else if(event.code === 'ArrowDown') {
      this._activeIndex = (this._activeIndex + 1) % this._allFilteredOptions.length;
      this._activeOption = this._allFilteredOptions[this._activeIndex];
    }
    else if(event.code === 'ArrowUp') {
      if(this._activeIndex > 0) {
        this._activeIndex = this._activeIndex - 1;
        this._activeOption = this._allFilteredOptions[this._activeIndex];    
      }
    }
  }

  /**
   * Sets the active option.  Active option is the option that when enter is pressed is selected.
   * @param option The option to make the active option
   */
  setActiveOption(option) {
    this._activeOption = option;
    this._activeIndex = this._allFilteredOptions.findIndex((filteredOption) => {
      return filteredOption.id === option.id;
    });
  }

  /**
   * Handler for when the input is clicked.
   */
  inputClicked() {
    if(this.disabled === false) {
      this._isOpen = !this._isOpen;

      // set the active option to the first in the list
      if(this._allFilteredOptions.length > 0) {
        this._activeOption = this._allFilteredOptions[0];
        this._activeIndex = 0;
      }
    }
  }

  /**
   * Handler for when descendant an option is clicked.
   */
  optionClicked(option: GoAOptionComponent) {
    let selectedOptions = [];

    if(this.multiple === true) {
      option.selected = !option.selected;
      selectedOptions = this.selectedItems;
    }
    else {
      option.selected = true;
      this.selectedItems.forEach((o) => {
        if(option.id !== o.id) {
          // change all options that weren't selected to false without notifying change
          o.selected = false;
        }

        selectedOptions = [option];
      });
    }

    this.selectionChanged(selectedOptions, true);

    if(this.multiple === false) {
      // close the dropdown if we are in single selection mode
      this._isOpen = false;
    }
  }

  /**
   * Update view when selection changes
   * @param options 
   */
  private selectionChanged(options: Array<GoAOptionComponent>, emitEvent: boolean) {
    if(options.length > 0) {
      this._requiredError = false;
      this.setTextInput(options[0].label);
    }
    else {
      this._requiredError = this.required;
      this.setTextInput('');
    }
    
    if(emitEvent === true) {
      this.emitChange(options);
    }
  }

  /**
   * Emit selection change
   */
  private emitChange(options: Array<GoAOptionComponent>) {   
    const values = options.map((option) => {
      return option.value;
    });

    this.selectionChange.emit(values);
  }

  /**
   * Gets all the currently selected options
   */
  private get selectedItems(): Array<GoAOptionComponent> { 
    if(this.allOptions === undefined) {
      return [];
    }

    return [...this.allOptions.filter((option) => {
      return option.selected === true;
    })];
  }

  /**
   * Set the text of the input.
   * @param value The value to set
   */
  private setTextInput(value: string) {
    if(this.textInput) {
      this.textInput.nativeElement.value = value;
      // Exact matches show whole list?
      this.filterOptions('');
    }
  }

  /**
   * Update the filtered options with the passed in filter text.
   * @param filterText The text to filter by
   */
  private filterOptions(filterText: string) {
    this.optionGroups.forEach(group => {
      group._filteredOptions = group.options.filter(this.typeaheadFilter.bind(this, filterText, this.typeaheadMode));
    });

    this._filteredOptions = this.options.filter(this.typeaheadFilter.bind(this, filterText, this.typeaheadMode));
    this._allFilteredOptions = this.allOptions.filter(this.typeaheadFilter.bind(this, filterText, this.typeaheadMode));

    // The filters have changed so update the active option incase it has been filtered out.
    this._activeOption = this._allFilteredOptions[this._activeIndex % this._allFilteredOptions.length];
  }

  /**
   * Filter for typeahead with logic for what mode we are in.
   * @param option 
   */
  private typeaheadFilter(filterText: string, typeaheadMode: 'none'|'startsWith'|'contains', option: GoAOptionComponent) {
    if(typeaheadMode === 'none' || this.typeaheadMode === undefined) {
      return true;
    }
    
    if(typeaheadMode === 'startsWith') {
      return option.label.toLocaleLowerCase().startsWith(filterText.toLocaleLowerCase());
    }

    if(typeaheadMode === 'contains') {
      return option.label.toLocaleLowerCase().includes(filterText.toLocaleLowerCase());
    }
  }
}
