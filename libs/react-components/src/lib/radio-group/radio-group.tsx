import React, { Children, useState, ReactNode, FC } from 'react';
import { Data as RadioItem, LabelPosition } from './radio/radio';
import GoARadio from './radio/radio';
import './radio-group.scss';

export * from './radio/radio';

interface Props {
  // required
  name: string;

  // optional
  children?: ReactNode;
  helperText?: string;
  items?: RadioItem[];
  required?: boolean;
  requiredErrorMessage?: string;
  title?: string;

  // initial data value
  value?: string;

  // child only attributes
  labelPosition?: LabelPosition;
  disabled?: boolean;

  onChange: (value: string) => void;
}

export const RadioContext = React.createContext<string>('');
export const RadioUpdateContext = React.createContext<(value: string) => void>(
  () => { }
);

export const GoARadioGroup: FC<Props> = ({
  helperText,
  onChange,
  required,
  requiredErrorMessage,
  title,
  value,
  items,
  children,
  ...childAttrs
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(value);

  function handleOnChange(val: string) {
    setSelectedValue(val);
    onChange(val);
  }

  function hasError(): boolean {
    return required && !selectedValue;
  }

  function getChildren() {
    if (children) {
      return Children.map(children, (child: any) => {
        return React.cloneElement(child, {
          ...childAttrs,
          key: `${childAttrs.name}-${value}`,
          required,
        });
      });
    }

    return items.map((item: RadioItem) => {
      return (
        <GoARadio
          key={`${childAttrs.name}-${item.value}`}
          labelPosition={childAttrs.labelPosition}
          name={childAttrs.name}
          disabled={childAttrs.disabled}
          value={item.value}
          children={item.text}
          required={required}
        />
      );
    });
  }

  return (
    <div className="goa-radio-group">
      {title && <span className="radio-group-title">{title}</span>}
      {required && <span className="required-label">(Required)</span>}
      {helperText && <div className="helper-text">{helperText}</div>}
      <RadioContext.Provider value={selectedValue}>
        <RadioUpdateContext.Provider value={handleOnChange}>
          <div className="goa-radios">{getChildren()}</div>
        </RadioUpdateContext.Provider>
      </RadioContext.Provider>

      {hasError() && <div className="error-text">{requiredErrorMessage}</div>}
    </div>
  );
};

export default GoARadioGroup;
