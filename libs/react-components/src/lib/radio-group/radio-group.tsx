import React, { Children, FC, ReactElement } from 'react';

export * from './radio';

interface Props {
  /**
   * Name of the form value
   */
  name: string;

  /**
   * Initial data value
   */
  value?: string;

  /**
   * Disable radio buttons
   */
  disabled?: boolean;

  /**
   * Orientation of the radio buttons
   */
  orientation: 'horizontal' | 'vertical';

  /**
   * Callback function containing the newly selected value
   */
  onChange: (name: string, value: string) => void;
}

export const GoARadioGroup: FC<Props> = ({
  name,
  value,
  children,
  orientation,
  onChange,
  ...childAttrs
}) => {

  function onChangeHandler(value: string) {
    onChange(name, value);
  }

  function getChildren() {
    return Children.map(children, (child: ReactElement) => {
      const key = `${name}-${child.props.value}`;
      const _name = `${name}-${Date.now()}`;
      return React.cloneElement(child, {
        ...childAttrs,
        name: _name,
        checked: child.props.value === value,
        onChange: onChangeHandler,
        key,
      });
    });
  }

  return (
    <div>
      <div className={`goa-radio-group--${orientation}`}>
        {getChildren()}
      </div>
    </div>
  );
};

export default GoARadioGroup;
