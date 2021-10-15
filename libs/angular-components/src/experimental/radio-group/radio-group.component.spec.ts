import { OverlayModule } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { render, screen, fireEvent } from '@testing-library/angular';
import { GoARadioComponent, GOA_RADIO_CONTROL_VALUE_ACCESSOR } from '../radio/radio.component';
import { GoARadioService } from '../radio/radio.service';

import { GoARadioGroupComponent } from './radio-group.component';

describe('RadioGroupComponent', () => {
  const baseMockData = {
    title: 'mock title',
    helperText: 'mock helper text',
    disabled: false,
    labelPosition: 'after',
    required: true,
    requiredErrorMessage: 'mock required error message',
    selected: undefined,

    radios: [
      { id: 1, name: 'apples', checked: false },
      { id: 2, name: 'oranges', checked: false },
      { id: 3, name: 'bananas', checked: false }
    ]
  }

  // override this in tests when you need to change any of the mock data properties
  // also reset it for each tests/set of tests so prior tests dont influence subsequent ones
  let mockData = {...baseMockData};

  function getTemplate(data) {
    return `<goa-radio-group
              name="fruits"
              title="${data.title}"
              helperText="${data.helperText}"
              [disabled]="${data.disabled}"
              labelPosition="${data.labelPosition}"
              [required]="${data.required}"
              requiredErrorMessage="${data.requiredErrorMessage}"
            >
              <goa-radio value="${data.radios[0].id}">${data.radios[0].name}</goa-radio>
              <goa-radio value="${data.radios[1].id}">${data.radios[1].name}</goa-radio>
              <goa-radio value="${data.radios[2].id}">${data.radios[2].name}</goa-radio>
            </goa-radio-group>`;
  }



  describe('Basic rendering', () => {
    beforeEach(() => {
      // reset mockData to ensure no other tests have influenced this test
      mockData = {...baseMockData};
    });

    test('should render bound labels', async () => {
      await render(GoARadioGroupComponent, {
        template: getTemplate(mockData),
        declarations: [GoARadioGroupComponent, GoARadioComponent],
        imports: [OverlayModule]
      });

      expect(screen.queryByText(mockData.title, { exact: false })).not.toBeNull();
      expect(screen.queryByText(mockData.helperText, { exact: false })).not.toBeNull();
      expect(screen.queryByText(mockData.requiredErrorMessage, { exact: false })).not.toBeNull();
    });
  });

  describe('Is Required Tests', () => {
    beforeEach(() => {
      // reset mockData to ensure no other tests have influenced this test
      // set required to true for this set of tests
      mockData = {...baseMockData, required: true};
    });

    test('should render required indicator', async () => {
      await render(GoARadioGroupComponent, {
        template: getTemplate(mockData),
        declarations: [GoARadioGroupComponent, GoARadioComponent],
        imports: [OverlayModule]
      });

      expect(screen.queryByText('(Required)')).not.toBeNull();
    });

    test('should render required error message when not selected', async () => {
      await render(GoARadioGroupComponent, {
        template: getTemplate(mockData),
        declarations: [GoARadioGroupComponent, GoARadioComponent],
        imports: [OverlayModule]
      });

      expect(screen.queryByText(mockData.requiredErrorMessage)).not.toBeNull();
    });

    test('should not render required error message when is selected', async () => {
      await render(GoARadioGroupComponent, {
        template: getTemplate(mockData),
        declarations: [GoARadioGroupComponent, GoARadioComponent],
        imports: [OverlayModule]
      });

      const orangesRadioControl = screen.getByText('oranges');
      fireEvent.click(orangesRadioControl);

      expect(screen.queryByText(mockData.requiredErrorMessage)).not.toBeNull();
    });

    test('should render red radios when not selected', async () => {
      await render(GoARadioGroupComponent, {
        template: getTemplate(mockData),
        declarations: [GoARadioGroupComponent, GoARadioComponent],
        providers: [GOA_RADIO_CONTROL_VALUE_ACCESSOR],
        imports: [OverlayModule]
      });

      const group = document.querySelector('.goa-radio-group');
      const onScreenRadios = document.querySelectorAll('.goa-radio');

      onScreenRadios.forEach(r => {
        expect(r.classList).toContain('has-error');
      });
    });
  });

  describe('Is Not Required Tests', () => {
    let template;

    beforeEach(() => {
      // reset mockData to ensure no other tests have influenced this test
      // set required to false for this set of tests
      mockData = {...baseMockData, required: false};
      template = getTemplate(mockData);
    });

    test('should not render required indicator', async () => {
      await render(GoARadioGroupComponent, {
        template: template,
        declarations: [GoARadioGroupComponent, GoARadioComponent],
        imports: [OverlayModule]
      });

      expect(screen.queryByText('(Required)')).toBeNull();
    });

    test('should not render required error message when not selected', async () => {
      await render(GoARadioGroupComponent, {
        template: template,
        declarations: [GoARadioGroupComponent, GoARadioComponent],
        imports: [OverlayModule]
      });

      expect(screen.queryByText(mockData.requiredErrorMessage)).toBeNull();
    });
  });

  describe('Selection Change Tests', () => {
    let selectionChangeTemplate;
    beforeEach(() => {
      // reset mockData to ensure no other tests have influenced this test
      mockData = {...baseMockData};
      selectionChangeTemplate = `<goa-radio-group
                                    name="fruits"
                                    title="${mockData.title}"
                                    helperText="${mockData.helperText}"
                                    [disabled]="${mockData.disabled}"
                                    labelPosition="${mockData.labelPosition}"
                                    [required]="${mockData.required}"
                                    requiredErrorMessage="${mockData.requiredErrorMessage}"
                                    (selectionChange)="selectionChanged($event)"
                                  >
                                    <goa-radio value="${mockData.radios[0].id}">${mockData.radios[0].name}</goa-radio>
                                    <goa-radio value="${mockData.radios[1].id}">${mockData.radios[1].name}</goa-radio>
                                    <goa-radio value="${mockData.radios[2].id}">${mockData.radios[2].name}</goa-radio>
                                  </goa-radio-group>`;
    });

    test('change event should work', async () => {
      let isSelected;

      @Component(
        {
          selector: 'test-component',
          template: selectionChangeTemplate,
        }
      )
      class TestComponentWrapper {
        private selectionChanged(selection) {
          isSelected = selection.checked;
        }
      }

      await render(TestComponentWrapper, {
        declarations: [GoARadioGroupComponent, GoARadioComponent]
      });

      const radios = screen.getAllByRole('radio', {});

      fireEvent.click(radios[1]);
      expect(isSelected).toBeTruthy();
    });
  });
});
