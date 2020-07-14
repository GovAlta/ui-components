import React from 'react';
import { Callout } from '../callout/Callout';

export const DoDont = ({dos, donts}) => {
  return (
    <div>
      <Callout positive={true} content={dos} />
      <Callout positive={false} content={donts} />
    </div>
  )
}
