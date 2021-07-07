import React, { FormEvent, FC, ReactNode, useState } from 'react';
import { GoAFormItem } from './form.item/form.item.component';
import { GoAFormButton } from './form.item/form.button.component';
import GoACallout from '../../lib/callout/callout';
import './form.scss';
import { GoAButton } from '../../lib/button/button';

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
          <GoACallout
            type='emergency'
            title='Please fix the following errors'>
            <ul>
              <li>Coffee</li>
              <li>Tea</li>
              <li>Milk</li>
            </ul>
          </GoACallout>
          <GoAFormButton>
            <GoAButton buttonType="tertiary" type="button">
              Cancel
        </GoAButton>
            <GoAButton
              buttonType="primary"
              type="submit"
            >
              Submit
        </GoAButton>
          </GoAFormButton>
        </form>
      ) : (
          children
        )}

    </div>
  );
}

export default GoAForm;
export { GoAFormItem, GoAFormButton }