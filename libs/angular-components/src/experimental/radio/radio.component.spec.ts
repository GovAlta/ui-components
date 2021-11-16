import { render, screen, fireEvent } from '@testing-library/angular';
import { Component } from '@angular/core';
import { GoARadioComponent } from './radio.component';

describe('GoARadioComponent', () => {
  const baseMockData = {
    name: 'fruits',
    disabled: false,
    checked: false,
  }

  const label = 'label test';

  // override this in tests when you need to change any of the mock data properties
  // also reset it for each tests/set of tests so prior tests dont influence subsequent ones
  let mockData = {...baseMockData};

  function getTemplate(data) {
    return `<goa-radio
              name="fruits"
              [disabled]="${data.disabled}"
              [checked]="${data.checked}"
            >
              ${label}
            </goa-radio>`;
  }

  describe('Basic rendering', () => {
    beforeEach(() => {
      // reset mockData to ensure no other tests have influenced this test
      mockData = {...baseMockData};
    });

    test('should render label', async () => {
      await render(GoARadioComponent, {
        template: getTemplate(mockData),
      });

      expect(screen.getByText(label)).not.toBeNull();
    });
  });

  describe('Selection Change Tests', () => {
    test('should emit selectionChange when clicked', async () => {
      const selectionChange = jest.fn(x => x);

      await render(GoARadioComponent, {
        // NOTE: I dont know why this only works when template is not specified
        //template: `<goa-radio [checked]="false">${label}</goa-radio>`,
        componentProperties: {
          selectionChange: { emit: selectionChange } as any
        }
      });

      const radio = screen.getByRole('radio', {});
      //console.log(radio.outerHTML);

      fireEvent.click(radio);

      const selectionChangeResults = selectionChange.mock.results[0].value;

      expect(selectionChange).toHaveBeenCalledTimes(1);
      expect(selectionChangeResults.checked).toBeTruthy();
    });

    test('change event should work', async () => {
      let isSelected;

      @Component(
        {
          selector: 'test-component',
          template: `<goa-radio [checked]="false" (selectionChange)="selectionChanged($event)" >${label}</goa-radio>`,
        }
      )
      class TestComponentWrapper {
        private selectionChanged(selection) {
          isSelected = selection.checked;
        }
      }

      await render(TestComponentWrapper, {
        declarations: [GoARadioComponent]
      });

      const radio = screen.getByRole('radio', {});

      fireEvent.click(radio);
      expect(isSelected).toBeTruthy();
    });
  });
});
