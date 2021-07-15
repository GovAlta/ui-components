import React, { FC, useContext, useEffect, useState } from 'react';
import '../form.scss';
import PropTypes from 'prop-types';
import { GoAInput } from '../../input/input.component';
import { FormContext } from '../form.component';
type GoAFormItemProps = {
  type: string;
  inputType: string;
  name?: string;
  labelText: string;
  helpText?: string;
  required?: boolean;
  multiLine?: boolean;
  validators?: [];
  onChange?: (value: string) => void;
  children?: React.ReactNode;
}

export const GoAFormItem = ({ type, inputType = 'text', name, labelText = '', helpText = '', multiLine = false, validators = [], onChange = null, children = null }: GoAFormItemProps) => {
  const { errors, data, setFieldValue, registerInput } = useContext(
    FormContext
  );
  const [valid, setValid] = useState(true);
  useEffect(
    () =>
      registerInput({
        name: name,
        validators: validators
      }),
    []
  );
  const handleChange = val => {
    setFieldValue(name, val);
    if (onChange) {
      onChange(val);
    }
  };
  const errorMsg = errors[name] || [];

  function renderInput(type: string, name: string, helpText: string, multiLine: boolean) {
    switch (type) {
      case 'input':
        return (
          <GoAInput
            name={name}
            type={inputType}
            errorMsg={errorMsg.toString()}
            helpText={helpText}
            multiLine={multiLine}
            onChange={handleChange}
          />
        );
      default:

        return children;
    }

  }

  return (
    <div id={name} style={{ position: 'relative' }} className="goa-form-items">
      <label>{labelText}</label>
      {renderInput(type, name, helpText, multiLine)}
    </div>
  );
}
GoAFormItem.propTypes = {
  labelText: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  inputType: PropTypes.string,
  required: PropTypes.bool,
  helpText: PropTypes.string,
  onChange: PropTypes.func,
  validators: PropTypes.array,
}

export default GoAFormItem;