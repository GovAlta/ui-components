import React, { FC, useEffect, useState } from 'react'
import './transitions.css';

export interface GoATransitionProps {
  name: string;
  active: boolean;
  onComplete?: () => void;
}

type State = 'init' | 'start' | 'active';

export const GoATransition: FC<GoATransitionProps> = ({ name, active, onComplete, children }) => {
  const [state, setState] = useState<State>('init');

  useEffect(() => {
    if (active) {
      setState('start')
      setTimeout(() => setState('active'), 100)

      setTimeout(() => {
        onComplete?.();
      }, 500)
    } else {
      setState('init');
    }
  }, [active])  // `onComplete` in the dependencies results in an animation stutter

  function getCss(): string {
    switch (state) {
      case 'init':
        return `${name}-init`;
      case 'start':
        return `${name}-start`;
      case 'active':
        return `${name}-start ${name}-active`;
    }
  }

  return (
    <div className={getCss()}>
      {children}
    </div>
  )
}

export default GoATransition
