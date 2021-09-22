import React, { FC } from 'react';

interface Props {
  alignment: 'left' | 'right';
}

export const GoAFormActions: FC<Props> = ({ alignment = 'left', children }) => {
  return <div className={`goa-form-actions goa-form-actions--${alignment}`}>{children}</div>;
};

export default GoAFormActions;
