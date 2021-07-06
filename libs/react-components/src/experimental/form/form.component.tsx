import React, { FormEvent, ReactNode } from 'react';
import { GoAFormItem } from './container/form.item.component';
import { GoAFormButton } from './container/form.button.component';
import { GoAFormContainer } from './container/form.container.component';
import './form.scss';

import PropTypes from "prop-types";

type FormProps = {
  formTitle: string,
  formDescription: string,
  /**
   * Action to take on submit button click
   */
  onSubmit?: (e: FormEvent<Element>) => void;
  /**
   * Provide children to be rendered inside of the element
   */
  children?: ReactNode
}

export const GoAForm = ({ formTitle = '', formDescription = '', onSubmit = null, children = null, ...props }: FormProps) => {

  return (
    <div>
      <span className="goa-form-title">{formTitle}</span>
      <div className="goa-text">{formDescription}</div>
      {onSubmit ? (
        <form onSubmit={onSubmit} className="goa-form">
          {children}
        </form>
      ) : (
          children
        )}
    </div>
  );
}
GoAForm.propTypes = {
  formTitle: PropTypes.string,
  formDescription: PropTypes.string,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
}
export default GoAForm;
export { GoAFormItem, GoAFormButton, GoAFormContainer }