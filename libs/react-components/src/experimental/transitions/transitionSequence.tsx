import React, { FC } from 'react'
import { GoATransition, GoATransitionProps } from './transition';

type TransitionType
  = 'fade-in'
  | 'fade-out'
  | 'slide-in-up'
  | 'slide-out-up'
  | 'slide-in-down'
  | 'slide-out-down'
  | 'slide-in-left'
  | 'slide-out-left'
  | 'slide-in-right'
  | 'slide-out-right';

interface Props {
  transitions: string[] | TransitionType[];
  transitionIndex: number;
  onComplete?: (index: number, done: boolean) => void;
}

export const GoATransitionSequence: FC<Props> = (props) => {
  function createTransition(props: GoATransitionProps, children?: JSX.Element): JSX.Element {
    return <GoATransition {...props}>{children}</GoATransition>
  }

  return props.transitions
    // create components for the transitions
    .map((state: string, index: number): JSX.Element => {
      return createTransition({
        active: (props.transitionIndex % (props.transitions.length + 1)) > index,
        name: state,
        onComplete: () => props?.onComplete(index, index === props.transitions.length - 1)
      })
    })
    // on `reduce` we need to start with the innermost child
    .reverse()
    // create parent/child relationship between components
    .reduce((child: JSX.Element, parent: JSX.Element): JSX.Element => {
      if (!child) {
        // the original children (user defined content to be transitioned)
        return React.cloneElement(parent, {
          children: props.children
        })
      }
      return React.cloneElement(parent, {
        children: child
      })
    }, null)
}
