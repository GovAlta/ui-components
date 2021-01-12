import React from 'react';
import { render } from '@testing-library/react';
import { fireEvent, screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event';
import GoACheckbox from './checkbox';

describe('GoA Checkbox', () => {
  const label = 'label test';

  it('should render label', () => {
    render(<GoACheckbox>{label}</GoACheckbox>);

    expect(screen.getByText(label)).not.toBeNull();
  });

  test('should render checkmark svg when checked', async () => {
    render(<GoACheckbox checked={false}>{label}</GoACheckbox>);

    userEvent.click(screen.getByText(label));

    const checkmark = document.getElementById('checkmark');
    const dashmark = document.getElementById('dashmark');

    expect(checkmark).not.toBeNull();
    expect(dashmark).toBeNull();
  });

  describe('Indeterminate', () => {
    test('should render dash svg when checked is true', () => {
      render(<GoACheckbox checked={true} indeterminate={true} >{label}</GoACheckbox>);

      const checkmark = document.getElementById('checkmark');
      const dashmark = document.getElementById('dashmark');

      expect(dashmark).not.toBeNull();
      expect(checkmark).toBeNull();
    });

    test('should render dash svg when checked is false', () => {
      render(<GoACheckbox checked={false} indeterminate={true} >{label}</GoACheckbox>);

      const checkmark = document.getElementById('checkmark');
      const dashmark = document.getElementById('dashmark');

      expect(dashmark).not.toBeNull();
      expect(checkmark).toBeNull();
    });
  });

  test('required should display red border on checkbox when checked is false', () => {
    render(<GoACheckbox checked={false} required={true} >{label}</GoACheckbox>);

    const container = document.querySelector('.goa-checkbox');

    expect(container).not.toBeNull();
    expect(container.classList).toContain('has-error');
  });

  test('required should NOT display red border on checkbox when checked is true', () => {
    render(<GoACheckbox checked={true} required={true} >{label}</GoACheckbox>);

    const container = document.querySelector('.goa-checkbox');

    expect(container).not.toBeNull();
    expect(container.classList).not.toContain('has-error');
  });

  test('should emit selectionChange when clicked', async () => {
    const selectionChangeStub = jest.fn()

    render(<GoACheckbox selectionChange={selectionChangeStub} checked={true} required={true} >{label}</GoACheckbox>);

    const checkbox = screen.getByRole('checkbox', {});

    userEvent.click(checkbox);

    const selectionChangeResults = selectionChangeStub.mock.results;

    expect(selectionChangeStub).toHaveBeenCalledTimes(1);
    expect(selectionChangeResults).toBeTruthy();
  });

  test('change event should work', async () => {
    const isChecked = jest.fn()

    render(<GoACheckbox selectionChange={isChecked} checked={false} required={true} >${label}</GoACheckbox>);

    const checkbox = screen.getByRole('checkbox', {});
    userEvent.click(checkbox);

    const selectionChangeResults = isChecked.mock.results;
    expect(selectionChangeResults).toBeTruthy();
  });
});
