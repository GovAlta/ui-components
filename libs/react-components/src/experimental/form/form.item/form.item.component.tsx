import React, { FC, ReactNode } from 'react';
import '../form.scss';

export interface GoAFormItemProps {
  children: ReactNode,
}

export const GoAFormItem: FC<GoAFormItemProps> = ({ children = null }) => {
  return (

    <div style={{ position: 'relative' }} className="goa-form-items">
      {children}

    </div>
  );
}

export default GoAFormItem;