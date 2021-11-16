import { Component } from '@angular/core';
import { render, screen, fireEvent } from '@testing-library/angular';
import { GoARadioComponent } from '../radio/radio.component';
import { GoARadioGroupComponent } from './radio-group.component';

describe('RadioGroupComponent', () => {
  const baseMockData = {
    disabled: false,
    selected: undefined,

    radios: [
      { id: 1, name: 'apples', checked: false },
      { id: 2, name: 'oranges', checked: false },
      { id: 3, name: 'bananas', checked: false },
    ],
  };

  // override this in tests when you need to change any of the mock data properties
  // also reset it for each tests/set of tests so prior tests dont influence subsequent ones
  let mockData = { ...baseMockData };

  function getTemplate(data) {
    return `
      <goa-radio-group
      name="fruits"
      [disabled]="${data.disabled}"
      >
        <goa-radio value="${data.radios[0].id}">${data.radios[0].name}</goa-radio>
        <goa-radio value="${data.radios[1].id}">${data.radios[1].name}</goa-radio>
        <goa-radio value="${data.radios[2].id}">${data.radios[2].name}</goa-radio>
      </goa-radio-group>
    `
  }

  describe('Selection Change Tests', () => {
    let selectionChangeTemplate;
    beforeEach(() => {
      // reset mockData to ensure no other tests have influenced this test
      mockData = { ...baseMockData };
      selectionChangeTemplate = `
        <goa-radio-group
          name="fruits"
          [disabled]="${mockData.disabled}"
          (selectionChange)="selectionChanged($event)"
        >
          <goa-radio value="${mockData.radios[0].id}">${mockData.radios[0].name}</goa-radio>
          <goa-radio value="${mockData.radios[1].id}">${mockData.radios[1].name}</goa-radio>
          <goa-radio value="${mockData.radios[2].id}">${mockData.radios[2].name}</goa-radio>
        </goa-radio-group>`;
    });

    test('change event should work', async () => {
      let isSelected;

      @Component({
        selector: 'test-component',
        template: selectionChangeTemplate,
      })
      class TestComponentWrapper {
        private selectionChanged(selection) {
          isSelected = selection.checked;
        }
      }

      await render(TestComponentWrapper, {
        declarations: [GoARadioGroupComponent, GoARadioComponent],
      });

      const radios = screen.getAllByRole('radio', {});

      fireEvent.click(radios[0]);
      expect(isSelected).toBeTruthy();
    });
  });
});
