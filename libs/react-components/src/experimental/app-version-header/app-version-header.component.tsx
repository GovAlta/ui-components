import React, { FC, ReactNode, useState } from 'react';
import classnames from 'classnames';
import styles from './app-version-header.module.scss';


interface GoAAppVersionHeaderProps {
  isProdEnvironment?: boolean
  environment?: string
  version?: string
}

export const GoAAppVersionHeader: FC<GoAAppVersionHeaderProps> = ({ isProdEnvironment, environment, version }: GoAAppVersionHeaderProps) => {
  const [closed, setClosed] = useState(false);

  if (closed || isProdEnvironment) return null;

  return (
    <div
      className={classnames(styles['goa-app-version-header'])}
    >
      <span className={classnames(styles['content-wrapper'])} data-testid='content-wrapper'>
        <span className={classnames(styles['environment-and-version'])}>{environment} {version}</span>
        <span className={classnames(styles['close'])} data-testid='close' onClick={() => setClosed(true)}>X</span>
      </span>
    </div>
  )
}

export default GoAAppVersionHeader;
