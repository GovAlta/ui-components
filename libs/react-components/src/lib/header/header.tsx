import React from 'react';

import './header.scss';
import GoAMicroSiteLogo from '../microsite-logo/microsite-logo';

type ServiceLevel = 'alpha' | 'beta' | 'live'

/* eslint-disable-next-line */
export interface HeaderProps {
  serviceName: string,
  serviceHome: string,
  serviceLevel: ServiceLevel,
}

export const GoAHeader = (props: HeaderProps) => {
  const serviceLevelCss = `service-level service-level--${props.serviceLevel.toString().toLowerCase()}`;

  function serviceLevelFormatted(): string {
    return props.serviceLevel.toLowerCase();
  }

  return (
    <>
      <header className="goa-header goa-official-site-header">
        <div>
          <span className={serviceLevelCss}>{serviceLevelFormatted()}</span>
        </div>

        {props.serviceLevel === 'live' &&
        <div className="site-text">
          An official site of the <a href="https://www.alberta.ca/index.aspx" className="web-link">Alberta Government</a>
        </div>
        }

        {props.serviceLevel !== 'live' &&
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
