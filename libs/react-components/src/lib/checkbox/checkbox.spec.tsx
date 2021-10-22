import React, { Component, ReactNode, useState } from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event';
import GoACheckbox, { CheckboxProps } from './checkbox';

describe('GoA Checkbox', () => {
  const label = 'label test';

  function renderParent({ checked, ...props }: CheckboxProps = {}) {
    const StatefulParent = (): JSX.Element => {
      const [value, setValue] = useState<string>(checked);

      const onChange = (name: string, newValue: string) => {
        setValue(newValue)
      }

      return (
        <GoACheckbox {...props} checked={value} onChange={onChange}>{label}</GoACheckbox>
      )
    }

    render(<StatefulParent />);
  }

  it('should render label', () => {
    renderParent();

    expect(screen.getByText(label)).not.toBeNull();
  });

  test('should render checkmark svg when checked', async () => {
    renderParent();

    const cb = screen.getByRole('checkbox') as HTMLInputElement;
    userEvent.click(cb);

    const checkmark = document.getElementById('checkmark');
    const dashmark = document.getElementById('dashmark');

    expect(checkmark).not.toBeNull();
    expect(dashmark).toBeNull();
  });

  test('should render dash svg when checked is true', () => {
    renderParent({ checked: true, indeterminate: true});

    const checkmark = document.getElementById('checkmark');
    const dashmark = document.getElementById('dashmark');

    expect(dashmark).not.toBeNull();
    expect(checkmark).toBeNull();
  });

  test('required should display red border on checkbox when checked is false', () => {
    renderParent({ checked: false, required: true});

    const container = document.querySelector('.goa-checkbox');

    expect(container).not.toBeNull();
    expect(container.classList).toContain('has-error');
  });

  test('required should NOT display red border on checkbox when checked is true', () => {
    renderParent({ checked: true, required: true});

    const container = document.querySelector('.goa-checkbox');

    expect(container).not.toBeNull();
    expect(container.classList).not.toContain('has-error');
  });

  test('should emit onChange when clicked', async () => {
    const onChangeStub = jest.fn()

    const StatefulParent = ({ checked, ...props }: CheckboxProps): JSX.Element => {
      const [value, setValue] = useState<boolean>(checked);

      const onChange = (newValue: boolean) => {
        setValue(newValue)
        onChangeStub();
      }

      return (
        <GoACheckbox {...props} checked={value} onChange={onChange}>{label}</GoACheckbox>
      )
    }

    render(<StatefulParent />);

    const checkbox = screen.getByRole('checkbox', {});
    userEvent.click(checkbox);
    const onChangeResults = onChangeStub.mock.results;

    expect(onChangeStub).toHaveBeenCalledTimes(1);
    expect(onChangeResults).toBeTruthy();
  });
});
