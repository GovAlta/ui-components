import { render, screen, fireEvent } from '@testing-library/angular';
import {Component, DebugElement} from '@angular/core';
import { GoADropdownComponent } from './dropdown.component';
import { GoAOptionComponent  } from './option/option.component';
import { GoAOptionGroupComponent  } from './option-group/option-group.component';

import { OverlayModule } from '@angular/cdk/overlay';

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
      declarations: [GoAOptionComponent, GoAOptionGroupComponent],
      imports: [OverlayModule]
    });

    expect(screen.getByLabelText(label, { exact: false })).not.toBeNull();
  });

  test('should render description', async () => {
    await render(GoADropdownComponent, {
      template: `<goa-dropdown label="${label}" description="${description}">
                  <goa-option label="${item1.label}" id="${item1.id}" value="${item1.value}"></goa-option>
                  <goa-option label="${item2.label}" id="${item2.id}" value="${item2.value}"></goa-option>
                </goa-dropdown>`,
      declarations: [GoAOptionComponent, GoAOptionGroupComponent],
      imports: [OverlayModule]
    });
    
    expect(screen.getByText(description)).not.toBeNull();
  });

  test('should contain all given options', async () => {
    await render(GoADropdownComponent, {
      template: `<goa-dropdown label="${label}" description="${description}">
                  <goa-option label="${item1.label}" value="${item1.value}" id="${item1.id}">${item1.label}</goa-option>
                  <goa-option label="${item2.label}" value="${item2.value}" id="${item2.id}">${item2.label}</goa-option>
                </goa-dropdown>`,
      declarations: [GoAOptionComponent, GoAOptionGroupComponent],
      imports: [OverlayModule]
    });
    
    const input = screen.getByLabelText(label, {exact: false});
    fireEvent.click(input);

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
      declarations: [GoAOptionComponent, GoAOptionGroupComponent],
      imports: [OverlayModule]
    });
    
    const input = screen.getByLabelText(label, {exact: false});
    fireEvent.click(input);

    expect(screen.getByText(item2.label)).not.toBeNull();
    expect(screen.getByText(item1.label)).not.toBeNull();
  });

  test('defaulSelected option should select', async () => {
    await render(GoADropdownComponent, {
      template: `<goa-dropdown label="${label}" description="${description}">
                  <goa-option label="${item1.label}" value="${item1.value}" id="${item1.id}">${item1.label}</goa-option>
                  <goa-option [defaultSelected]="true" label="${item2.label}" value="${item2.value}" id="${item2.id}">${item2.label}</goa-option>
                </goa-dropdown>`,
      declarations: [GoAOptionComponent, GoAOptionGroupComponent],
      imports: [OverlayModule]
    });
    
    expect(screen.getByDisplayValue(item2.label)).not.toBeNull();
  });

  test('required should display warning if none selected', async () => {
    await render(GoADropdownComponent, {
      template: `<goa-dropdown label="${label}" [required]="true" [multiple]="true" description="${description}">
                  <goa-option label="${item1.label}" value="${item1.value}" id="${item1.id}">${item1.label}</goa-option>
                  <goa-option label="${item2.label}" value="${item2.value}" id="${item2.id}">${item2.label}</goa-option>
                </goa-dropdown>`,
      declarations: [GoAOptionComponent, GoAOptionGroupComponent],
      imports: [OverlayModule]
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
      declarations: [GoAOptionComponent, GoADropdownComponent],
      imports: [OverlayModule]
    });
    
    const input = screen.getByLabelText(label, {exact: false});
    fireEvent.click(input);

    fireEvent.click(screen.getByText(item1.label));
    expect(theSelection).toEqual([item1.value]); //item 1 is the only item selected
  });

  test('typeahead mode contains should filter', async () => {
    await render(GoADropdownComponent, {
      template: `<goa-dropdown label="${label}" typeaheadMode="contains" description="${description}">
                  <goa-option label="${item1.label}" value="${item1.value}" id="${item1.id}">${item1.label}</goa-option>
                  <goa-option-group label="Test group">
                    <goa-option label="${item2.label}" value="${item2.value}" id="${item2.id}">${item2.label}</goa-option>
                  </goa-option-group>
                </goa-dropdown>`,
      declarations: [GoAOptionComponent, GoAOptionGroupComponent],
      imports: [OverlayModule]
    }); 
    


    const input = screen.getByLabelText(label, {exact: false}) as HTMLInputElement;    
    fireEvent.click(input);
    input.value = 'em'
    fireEvent.input(input);

    expect(screen.queryByText(item2.label)).not.toBeNull();
    expect(screen.queryByText(item1.label)).not.toBeNull();

    input.value = '1'
    fireEvent.input(input);

    expect(screen.queryByText(item2.label)).toBeNull();
    expect(screen.queryByText(item1.label)).not.toBeNull();
  });

  test('typeahead mode startsWith should filter', async () => {
    await render(GoADropdownComponent, {
      template: `<goa-dropdown label="${label}" typeaheadMode="startsWith" description="${description}">
                  <goa-option label="${item1.label}" value="${item1.value}" id="${item1.id}">${item1.label}</goa-option>
                  <goa-option-group label="Test group">
                    <goa-option label="${item2.label}" value="${item2.value}" id="${item2.id}">${item2.label}</goa-option>
                  </goa-option-group>
                </goa-dropdown>`,
      declarations: [GoAOptionComponent, GoAOptionGroupComponent],
      imports: [OverlayModule]
    }); 
    


    const input = screen.getByLabelText(label, {exact: false}) as HTMLInputElement;    
    fireEvent.click(input);
    input.value = 'em'
    fireEvent.input(input);

    expect(screen.queryByText(item2.label)).toBeNull();
    expect(screen.queryByText(item1.label)).toBeNull();

    input.value = 'item'
    fireEvent.input(input);

    expect(screen.queryByText(item2.label)).not.toBeNull();
    expect(screen.queryByText(item1.label)).not.toBeNull();
  });
});


