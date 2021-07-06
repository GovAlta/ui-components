import React, { FormEvent, FC, ReactNode, useState } from 'react';
import { GoAFormItem } from './form.item/form.item.component';
import { GoAFormButton } from './form.item/form.button.component';
import './form.scss';

interface Props {
  onSubmit?: (e: FormEvent<Element>) => void;
  children?: ReactNode
}

export const GoAForm: FC<Props> = ({ onSubmit = null, children = null }) => {
  const [errorMsg, setErrorMsg] = useState('');
  function handleOnSubmit(evt: FormEvent) {
    evt.preventDefault();
    if (validationSubmit()) { onSubmit(evt) }
  }

  function validationSubmit(): boolean {

    return true;
  }
  return (

    <div className="goa-form" style={{ position: 'relative' }}>
      {onSubmit ? (
        <form onSubmit={handleOnSubmit} >
          {children}

        </form>
      ) : (
          children
        )}

    </div>
  );
}

export default GoAForm;
export { GoAFormItem, GoAFormButton }