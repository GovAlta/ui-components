import React, { Component, ReactNode, useState } from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event';
import GoACheckbox, { Props as CheckboxProps } from './checkbox';

const noop = () => { };
const testId = 'test-id';

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

  it('should render', () => {
    const props: CheckboxProps = {
      name: "foo",
      value: "bar",
      text: "to display",
      disabled: false,
      checked:true,
      error: false,
      onChange: noop,
      testId: testId,
    }

    render(<GoACheckbox {...props} />);

    const checkbox = screen.getByTestId(testId);
    expect(checkbox).toBeTruthy();
    expect(checkbox.getAttribute('name')).toBe('foo');
    expect(checkbox.getAttribute('value')).toBe('bar');
    expect(checkbox.getAttribute('text')).toBe('to display');
    expect(checkbox.getAttribute("disabled")).toBe("false");
    expect(checkbox.getAttribute("checked")).toBe("true");
    expect(checkbox.getAttribute("error")).toBe("false");
    expect(checkbox.getAttribute("data-testid")).toBe(testId);
  });

  it('should handle the onChange event', async function () {

    const onChange = jest.fn();

    const props: CheckboxProps = {
      name: "foo",
      value: "bar",
      text: "to display",
      disabled: true,
      checked:true,
      error: false,
      onChange: onChange,
      testId: testId,
    }

    const { getByTestId } = render(<GoACheckbox {...props} />);
    const checkbox = getByTestId(testId);
    expect(checkbox).toBeTruthy();

    fireEvent(checkbox, new CustomEvent('_change', { detail: { data: { value: "bar" } } }));
    expect(onChange).toBeCalled();
  });

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

    const checkbox = screen.getByTestId("checkbox", {});
    userEvent.click(checkbox);
    const onChangeResults = onChangeStub.mock.results;

    waitFor(() => {
      expect(onChangeStub).toHaveBeenCalledTimes(1);
      expect(onChangeResults).toBeTruthy();
    })
  });
});
