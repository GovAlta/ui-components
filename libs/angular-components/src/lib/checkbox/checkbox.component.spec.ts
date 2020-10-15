import { render, screen, fireEvent } from '@testing-library/angular';
import { Component } from '@angular/core';
import { GoACheckboxComponent } from './checkbox.component';

describe('GoACheckboxComponent', () => {
  const label = 'label test';

  test('should render label', async () => {
    await render(GoACheckboxComponent, {
      template: `<goa-checkbox>${label}</goa-checkbox>`,
    });

    expect(screen.getByText(label)).not.toBeNull();
  });

  test('should render checkmark svg when checked', async () => {
    await render(GoACheckboxComponent, {
      template: `<goa-checkbox [checked]="false">${label}</goa-checkbox>`,
    });

    fireEvent.click(screen.getByText(label));

    const checkmark = document.getElementById('checkmark');
    const dashmark = document.getElementById('dashmark');

    expect(checkmark).not.toBeNull();
    expect(dashmark).toBeNull();
  });

  describe('Indeterminate', () => {
    test('should render dash svg when checked is true', async () => {
      await render(GoACheckboxComponent, {
        template: `<goa-checkbox [checked]="true" [indeterminate]="true">${label}</goa-checkbox>`,
      });

      const checkmark = document.getElementById('checkmark');
      const dashmark = document.getElementById('dashmark');

      expect(dashmark).not.toBeNull();
      expect(checkmark).toBeNull();
    });

    test('should render dash svg when checked is false', async () => {
      await render(GoACheckboxComponent, {
        template: `<goa-checkbox [checked]="false" [indeterminate]="true">${label}</goa-checkbox>`,
      });

      const checkmark = document.getElementById('checkmark');
      const dashmark = document.getElementById('dashmark');

      expect(dashmark).not.toBeNull();
      expect(checkmark).toBeNull();
    });
  });

  test('required should display red border on checkbox when checked is false', async () => {
    await render(GoACheckboxComponent, {
      template: `<goa-checkbox [checked]="false" [required]="true">${label}</goa-checkbox>`,
    });

    const container = document.querySelector('.goa-checkbox');

    expect(container).not.toBeNull();
    expect(container.classList).toContain('has-error');
  });

  test('required should NOT display red border on checkbox when checked is true', async () => {
    await render(GoACheckboxComponent, {
      template: `<goa-checkbox [checked]="true" [required]="true">${label}</goa-checkbox>`,
    });

    const container = document.querySelector('.goa-checkbox');

    expect(container).not.toBeNull();
    expect(container.classList).not.toContain('has-error');
  });

  test('should emit selectionChange when clicked', async () => {
    const selectionChange = jest.fn(x => x);

    await render(GoACheckboxComponent, {
      // NOTE: I dont know why this only works when template is not specified
      //template: `<goa-checkbox [checked]="false">${label}</goa-checkbox>`,
      componentProperties: {
        selectionChange: { emit: selectionChange } as any
      }
    });

    const checkbox = screen.getByRole('checkbox', {});
    //console.log(checkbox.outerHTML);

    fireEvent.click(checkbox);

    const selectionChangeResults = selectionChange.mock.results[0].value;

    expect(selectionChange).toHaveBeenCalledTimes(1);
    expect(selectionChangeResults.checked).toBeTruthy();
  });

  test('change event should work', async () => {
    let isChecked;

    @Component(
      {
        selector: 'test-component',
        template: `<goa-checkbox [checked]="false" (selectionChange)="selectionChanged($event)" >${label}</goa-checkbox>`,
      }
    )
    class TestComponentWrapper {
      private selectionChanged(selection) {
        isChecked = selection.checked;
      }
    }

    await render(TestComponentWrapper, {
      declarations: [GoACheckboxComponent]
    });

    const checkbox = screen.getByRole('checkbox', {});

    fireEvent.click(checkbox);
    expect(isChecked).toBeTruthy();
  });
});
