import React from 'react';

import './header.scss';
import GoAMicroSiteLogo from '../microsite-logo/microsite-logo';
import {ServiceLevel} from "./service-level.enum";

/* eslint-disable-next-line */
export interface HeaderProps {
  serviceName: string,
  serviceHome: string,
  serviceLevel: ServiceLevel,
}

export const GoAHeader = (props: HeaderProps) => {
  const serviceLevelCss = `service-level service-level--${props.serviceLevel.toString().toLowerCase()}`;

  return (
    <>
      <header className="goa-header goa-official-site-header">
        <div>
          <span className={serviceLevelCss}>{props.serviceLevel}</span>
        </div>

        {props.serviceLevel === ServiceLevel.Live &&
        <div className="site-text">
          An official site of the <a href="https://www.alberta.ca/index.aspx" className="web-link">Alberta Government</a>
        </div>
        }

        {props.serviceLevel !== ServiceLevel.Live &&
        <div className="site-text">
          This is a new <a href="https://www.alberta.ca/index.aspx" className="web-link">Alberta Government</a> service
        </div>
        }

      </header>
      <div className="goa-header goa-microsite-header">
        <GoAMicroSiteLogo serviceName={props.serviceName} serviceHome={props.serviceHome} />
      </div>
    </>
  );
};

export default GoAHeader;
