import React, { Component, ReactNode, useState } from 'react';
import { render } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event';
import GoACheckbox, { Props as CheckboxProps } from './checkbox';

describe('GoA Checkbox', () => {
  const label = 'label test';

  function renderParent(props: CheckboxProps) {
    const StatefulParent = (): JSX.Element => {
      const [value, setValue] = useState<string>(`${props.value}`);

      const onChange = (_name: string, newValue: string) => {
        setValue(newValue)
      }

      return (
        <GoACheckbox name={props.name} {...props} onChange={onChange}>{label}</GoACheckbox>
      )
    }

    render(<StatefulParent />);
  }

  it('should render label', () => {
    renderParent({ name: 'someCheckBox' });
    expect(screen.getByText(label)).not.toBeNull();
  });

  test('should emit onChange when clicked', async () => {
    const onChangeStub = jest.fn()

    const StatefulParent = (props: CheckboxProps): JSX.Element => {
      const [value, setValue] = useState<string>(`${props.value}`);

      const onChange = (newValue: string) => {
        setValue(newValue)
        onChangeStub();
      }

      return (
        <GoACheckbox {...props} testId="checkbox" value={props.value} checked={props.checked} onChange={onChange}>{label}</GoACheckbox>
      )
    }

    render(<StatefulParent name="someCheckbox" />);

    const checkbox = screen.getByText(label, {});
    userEvent.click(checkbox);
    const onChangeResults = onChangeStub.mock.results;

    waitFor(() => {
      expect(onChangeStub).toHaveBeenCalledTimes(1);
      expect(onChangeResults).toBeTruthy();
    })
  });
});
