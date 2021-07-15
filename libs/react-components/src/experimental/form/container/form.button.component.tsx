
import React, { FC, ReactNode } from 'react';
import '../form.scss';

export interface GoAFormButtonProps {

  children: ReactNode,
}

export const GoAFormButton: FC<GoAFormButtonProps> = ({ children = null }) => {

  return (
    <div className="goa-form-button">

      {children}

    </div>
  );
}


export default GoAFormButton;