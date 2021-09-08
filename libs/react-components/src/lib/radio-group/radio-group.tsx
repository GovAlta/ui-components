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
  onChange: (value: string) => void;
}

export const GoARadioGroup: FC<Props> = ({
  onChange,
  value,
  children,
  orientation,
  ...childAttrs
}) => {
  function getChildren() {
    return Children.map(children, (child: ReactElement) => {
      const key = `${childAttrs.name}-${child.props.value}`;
      return React.cloneElement(child, {
        ...childAttrs,
        checked: child.props.value === value,
        onChange,
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
