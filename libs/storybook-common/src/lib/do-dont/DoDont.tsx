import React from 'react';
import { Callout } from '../callout/Callout';

/**
 * Show a list Do's and Don'ts in a callout format.
 * @property {component} dos The "do's"
 * @property {component} donts The "don'ts"
 */
export const DoDont = ({dos, donts}) => {
  return (
    <div>
      <Callout positive={true} content={dos} />
      <Callout positive={false} content={donts} />
    </div>
  )
}
