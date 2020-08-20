import { render, screen, fireEvent } from '@testing-library/angular';
import {Component, DebugElement} from '@angular/core';
import { GoADropdownComponent } from './dropdown.component';
import { GoAOptionComponent  } from './option/option.component';
import { GoAOptionGroupComponent  } from './option-group/option-group.component';

describe('GoA Dropdown', () => {
  const label = 'label test';
  const description = 'description test';
  const item1 = {
    label: 'item 1 label',
    value: 'item1',
    id: 'option1'
  }
  const item2 = {
    label: 'item 2 label',
    value: 'item2',
    id: 'option2'
  }

  test('should render label', async () => {
    await render(GoADropdownComponent, {
      template: `<goa-dropdown label="${label}" description="${description}">
                  <goa-option label="${item1.label}" id="${item1.id}" value="${item1.value}"></goa-option>
                  <goa-option label="${item2.label}" id="${item2.id}" value="${item2.value}"></goa-option>
                </goa-dropdown>`,
      declarations: [GoAOptionComponent, GoAOptionGroupComponent]
    });

    expect(screen.getByLabelText(label, { selector: 'select', exact: false })).not.toBeNull();
  });

  test('should render description', async () => {
    await render(GoADropdownComponent, {
      template: `<goa-dropdown label="${label}" description="${description}">
                  <goa-option label="${item1.label}" id="${item1.id}" value="${item1.value}"></goa-option>
                  <goa-option label="${item2.label}" id="${item2.id}" value="${item2.value}"></goa-option>
                </goa-dropdown>`,
      declarations: [GoAOptionComponent, GoAOptionGroupComponent]
    });
    
    expect(screen.getByText(description)).not.toBeNull();
  });

  test('should contain all given options', async () => {
    await render(GoADropdownComponent, {
      template: `<goa-dropdown label="${label}" description="${description}">
                  <goa-option label="${item1.label}" value="${item1.value}" id="${item1.id}">${item1.label}</goa-option>
                  <goa-option label="${item2.label}" value="${item2.value}" id="${item2.id}">${item2.label}</goa-option>
                </goa-dropdown>`,
      declarations: [GoAOptionComponent, GoAOptionGroupComponent]
    });
    
    let selector = screen.getByLabelText(label, { selector: 'select', exact: false });

    expect(screen.getByText(item2.label)).not.toBeNull();
    expect(screen.getByText(item1.label)).not.toBeNull();
  });

  test('option in groups should render', async () => {
    await render(GoADropdownComponent, {
      template: `<goa-dropdown label="${label}" description="${description}">
                  <goa-option-group label="Test group">
                    <goa-option label="${item1.label}" value="${item1.value}" id="${item1.id}">${item1.label}</goa-option>
                  </goa-option-group>
                  <goa-option label="${item2.label}" value="${item2.value}" id="${item2.id}">${item2.label}</goa-option>
                </goa-dropdown>`,
      declarations: [GoAOptionComponent, GoAOptionGroupComponent]
    });
    
    let selector = screen.getByLabelText(label, { selector: 'select', exact: false });
    expect(screen.getByText(item2.label)).not.toBeNull();
    expect(screen.getByText(item1.label)).not.toBeNull();
  });

  test('defaulSelected option should select', async () => {
    await render(GoADropdownComponent, {
      template: `<goa-dropdown label="${label}" description="${description}">
                  <goa-option label="${item1.label}" value="${item1.value}" id="${item1.id}">${item1.label}</goa-option>
                  <goa-option [defaultSelected]="true" label="${item2.label}" value="${item2.value}" id="${item2.id}">${item2.label}</goa-option>
                </goa-dropdown>`,
      declarations: [GoAOptionComponent, GoAOptionGroupComponent]
    });
    
    let selector = screen.getByLabelText(label, { selector: 'select', exact: false });

    expect(screen.getByDisplayValue(item2.label)).not.toBeNull();
  });

  test('required should display warning if none selected', async () => {
    await render(GoADropdownComponent, {
      template: `<goa-dropdown label="${label}" [required]="true" [multiple]="true" description="${description}">
                  <goa-option label="${item1.label}" value="${item1.value}" id="${item1.id}">${item1.label}</goa-option>
                  <goa-option label="${item2.label}" value="${item2.value}" id="${item2.id}">${item2.label}</goa-option>
                </goa-dropdown>`,
      declarations: [GoAOptionComponent, GoAOptionGroupComponent]
    }); 
    
    expect(screen.getByText("At least one item must be selected.")).not.toBeNull();
  });

  test('change event should work', async () => {
    let theSelection; 

    @Component(
      {
        selector: 'test-component',
        template: `<goa-dropdown (selectionChange)="selectionChanged($event)" label="${label}" description="${description}">
                    <goa-option label="${item1.label}" value="${item1.value}" id="${item1.id}">${item1.label}</goa-option>
                    <goa-option label="${item2.label}" value="${item2.value}" id="${item2.id}">${item2.label}</goa-option>
                  </goa-dropdown>`        
      }
    )
    class TestComponentWrapper {
      private selectionChanged(selection) {
        theSelection = selection;
      }
    }
    
    await render(TestComponentWrapper, {
      declarations: [GoAOptionComponent, GoADropdownComponent]
    });
    
    let selector = screen.getByLabelText(label, { selector: 'select', exact: false });

    fireEvent.change(selector);
    expect(theSelection).toEqual([item1.value]); //item 1 is the only item selected
  });
});


