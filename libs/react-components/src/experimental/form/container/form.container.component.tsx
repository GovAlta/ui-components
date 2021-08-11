import React, { FC, ReactNode } from 'react';
import '../form.scss';

export interface GoAFormContainerProps {
  children: ReactNode;
}

export const GoAFormContainer: FC<GoAFormContainerProps> = ({
  children = null,
}) => {
  return <div className="goa-form-container">{children}</div>;
};

export default GoAFormContainer;
