import React, { useContext, useEffect, Children } from 'react';
import '../form.scss';
import PropTypes from 'prop-types';
import { FormContext } from '../form.component';
type GoAFormItemProps = {
  name?: string;
  validators?: [];
  onChange?: (value: string) => void;
  children?: React.ReactNode;
};

export const GoAFormItem = ({
  name,
  validators = [],
  onChange = null,
  children = null,
}: GoAFormItemProps) => {
  const { errors, navigator, setFieldValue, registerInput } = useContext(
    FormContext
  );
  useEffect(
    () =>
      registerInput({
        name: name,
        validators: validators,
      }),
    []
  );
  const handleChange = (val) => {
    if (typeof val === 'string') {
      setFieldValue(name, val);
    } else {
      setFieldValue(name, val.target.value);
    }

    if (onChange) {
      onChange(val);
    }
  };
  const message = errors[name] || [];
  const navigateTo =
    navigator && navigator.name && navigator.name === name;

  function renderChildren() {
    return Children.map(children, (child: any) => {
      if (child.props.originalType !== 'label') {
        return React.cloneElement(child, {
          onChange: handleChange,
          message: message.toString(),
          id: name,
          navigator: navigateTo,
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
};
GoAFormItem.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  validators: PropTypes.array,
};

export default GoAFormItem;
