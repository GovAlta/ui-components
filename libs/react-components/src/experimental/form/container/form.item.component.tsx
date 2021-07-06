import React, { FC } from 'react';
import '../form.scss';
import PropTypes from 'prop-types';
import { GoAInput } from '../../input/input.component';
type GoAFormItemProps = {
  type: string;
  inputType: string;
  name?: string;
  labelText: string;
  errorMsg?: string;
  helpText?: string;
  required?: boolean;
  multiLine?: boolean;
  validate?: (value: string) => boolean;
  onChange?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

export const GoAFormItem: FC<GoAFormItemProps> = ({ type, inputType = 'text', name, labelText = '', errorMsg = '', required = false, helpText = '', multiLine = false, validate = null, onChange = null, children = null }) => {
  function renderInput(type: string, name: string, errorMsg: string, helpText: string, required: boolean, multiLine: boolean, validate, onChange, children) {
    switch (type) {
      case 'input':
        return (
          <GoAInput
            name={name}
            type={inputType}
            errorMsg={errorMsg}
            helpText={helpText}
            multiLine={multiLine}
            validate={validate}
            required={required}
            onChange={onChange}
          />
        );
      default:

        return children;
    }

  }

  return (
    <div style={{ position: 'relative' }} className="goa-form-items">
      <label>{labelText}</label>
      {renderInput(type, name, errorMsg, helpText, required, multiLine, validate, onChange, children)}
    </div>
  );
}
GoAFormItem.propTypes = {
  labelText: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  inputType: PropTypes.string,
  errorMsg: PropTypes.string,
  required: PropTypes.bool,
  helpText: PropTypes.string,
  onChange: PropTypes.func,
  validate: PropTypes.func,
}

export default GoAFormItem;