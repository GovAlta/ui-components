import React, { FC } from 'react';
import { GoAFormItem } from './form.item.component';
import { GoAFormActions } from './form.actions.component';
import './form.scss';

export const GoAForm: FC = ({ children }) => {
  return (
    <div className="goa-form" >
      {children}
    </div>
  );
};

export default { GoAForm };

export { GoAFormItem, GoAFormActions };
