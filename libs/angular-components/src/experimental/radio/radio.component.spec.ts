import { render, screen, fireEvent } from '@testing-library/angular';
import { Component } from '@angular/core';
import { GoARadioComponent } from './radio.component';

describe('GoARadioComponent', () => {
  const baseMockData = {
    name: 'fruits',
    disabled: false,
    labelPosition: 'after',
    required: true,
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
              labelPosition="${data.labelPosition}"
              [required]="${data.required}"
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

    test('should render selected/circle svg when checked', async () => {
      await render(GoARadioComponent, {
        template: getTemplate(mockData),
      });

      fireEvent.click(screen.getByText(label));

      const radiomark = document.getElementById('radiomark');

      expect(radiomark).not.toBeNull();
    });
  });

  describe('Is Required Tests', () => {
    beforeEach(() => {
      // reset mockData to ensure no other tests have influenced this test
      // set required to true for this set of tests
      mockData = {...baseMockData, required: true};
    });

    test('should display red border on radio when checked is false', async () => {
      //reset checked for this test
      mockData.checked = false;

      await render(GoARadioComponent, {
        template: getTemplate(mockData),
      });

      const container = document.querySelector('.goa-radio');

      expect(container).not.toBeNull();
      expect(container.classList).toContain('has-error');
    });

    test('required should NOT display red border on radio when checked is true', async () => {
      //reset checked for this test
      mockData.checked = true;

      await render(GoARadioComponent, {
        template: getTemplate(mockData),
      });

      const container = document.querySelector('.goa-radio');

      expect(container).not.toBeNull();
      expect(container.classList).not.toContain('has-error');
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
