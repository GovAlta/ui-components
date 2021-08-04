import React, { useContext, useEffect, Children } from 'react';
import '../form.scss';
import PropTypes from 'prop-types';
import { FormContext } from '../form.component';
type GoAFormItemProps = {
  name?: string;
  validators?: [];
  onChange?: (value: string) => void;
  children?: React.ReactNode;
}

export const GoAFormItem = ({ name, validators = [], onChange = null, children = null }: GoAFormItemProps) => {
  const { errors, highLightError, setFieldValue, registerInput } = useContext(
    FormContext
  );
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
  const highLight = highLightError.name === name;

  function renderChildren() {
    return Children.map(children, (child: any) => {
      if (child.props.originalType !== 'label') {
        return React.cloneElement(child, {
          onChange: handleChange,
          errorMsg: errorMsg.toString(),
          id: name,
          highLightError: highLight
        });
      } else {
        return child;
      }

    });
  }

  return (
    <div id={name} className="goa-form-items">
      {renderChildren()}
    </div>
  );
}
GoAFormItem.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  validators: PropTypes.array,
}

export default GoAFormItem;