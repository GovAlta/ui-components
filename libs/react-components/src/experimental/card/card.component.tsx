import classnames from 'classnames';
import React, { FC } from 'react';

interface Props {
  title?: string;
  type: 'primary' | 'secondary' | 'tertiary';
  minWidth?: string;
  maxWidth?: string;
  other?: Record<string, unknown>;
}

export const GoAContainer : FC<Props> = ({
  title,
  children,
  type = 'primary',
  minWidth = 'auto',
  maxWidth = 'auto',
  ...other
}) => {
  const dataProps =
    Object.entries(other)
      .filter(item => item[0].startsWith('data-'))
      .reduce((previous, current) => {
        return { ...previous, [current[0]]: current[1] }
      }, {});

  return (
    <div {...dataProps} className={classnames(css['goa-card'], css[`goa-card--${type}`])} data-testid='card-container' style={{ minWidth, maxWidth }}>
      <div className={classnames(css['goa-card-top'], css[`goa-card-top--${type}`])}></div>
      <div className={classnames(css['goa-card-content'], css[`goa-card-content--${type}`])}>
        {title && <h3 className={css['goa-card-title']}>{title}</h3>}
        <div className={css['goa-card-details']} data-testid='card-content'>{children}</div>
      </div>
    </div>
  );
};

export default GoAContainer;
