import React, { FC, useEffect, useState } from 'react';
import GoAScrollable from '../scrollable/scrollable.component';
import './modal.css';
import { GoAIcon } from '../icons/icons';
import { TestProps } from '../common';
import { GoATransitionSequence } from '../transitions/transitionSequence';

/**
 * Modal - Main Component
 */
interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface ModalTestProps extends TestProps {
  backgroundTestId?: string;
}

const TRANSITION_INIT = 0;
const TRANSITION_VISIBLE = 1;
const TRANSITION_HIDDEN = 2;

export const GoAModal: FC<ModalProps & ModalTestProps> = ({ children, isOpen, onClose, testId, backgroundTestId }) => {
  const [transitionIndex, setTransitionIndex] = useState(TRANSITION_INIT);

  useEffect(() => {
    if (isOpen) {
      show();
    } else if (transitionIndex !== 0) {  // don't hide() on the when in the init state
      hide();
    }
  }, [isOpen]);

  function show() {
    setTransitionIndex(TRANSITION_VISIBLE);
    const scrollbarWidth = calculateScrollbarWidth();
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = scrollbarWidth + 'px';
  }

  function hide() {
    setTransitionIndex(TRANSITION_HIDDEN);
    // need to perform on the next render cycle to allow the css transitions to take place
    setTimeout(() => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '0';
    }, 300); // 300ms allows for any close animations to complete

  }

  // allows the current state to be easily determined within tests
  function getState(): string {
    return ['init', 'visible', 'hidden'][transitionIndex]
  }

  return (
    <GoATransitionSequence transitions={['fade-in', 'fade-out']} transitionIndex={transitionIndex} onComplete={(_index, done) => done && setTransitionIndex(0)}>
      <div className="modal-root" data-testid={testId} data-state={getState()}>
        <Content onClick={onClose}>
          {children}
        </Content>
        <Background onClick={() => onClose?.()} testId={backgroundTestId} />
      </div>
    </GoATransitionSequence>
  );
}

export default GoAModal;


// ******************************************************************************
// Public Child Components
// ******************************************************************************

// ***************
// GoAModalActions
// ***************

export const GoAModalActions: FC = ({ children }) => {
  return <div className="modal-actions">{children}</div>;
};

// ***************
// GoAModalContent
// ***************

export const GoAModalContent: FC<TestProps> = ({ children, testId }) => {
  return (
    <GoAScrollable testId={testId} vertical={true} hPadding={1}>
      {children}
    </GoAScrollable>
  );
};

// *************
// GoAModalTitle
// *************

export const GoAModalTitle: FC<TestProps> = ({ children, testId }) => {
  return <div data-testid={testId} className="modal-title">{children}</div>;
};


// ******************************************************************************
// Private Components
// ******************************************************************************


// *************
// Content
// *************

interface ContentProps {
  onClick: () => void;
}

const Content: FC<ContentProps> = ({ children, onClick }) => {
  return (
    <div className="modal">
      {onClick && <GoAIcon type='close' variant="circular" onClick={onClick} />}
      <div className="modal-content">{children}</div>
      {onClick && <div style={{ minHeight: '1rem' }}></div>}
    </div>
  );
}

// ****************
// Background
// ****************

interface BackgroundProps {
  onClick: () => void;
}

const Background: FC<BackgroundProps & TestProps> = ({ onClick, testId }) => {
  return <div className="modal-background" onClick={onClick} data-testid={testId}></div>;
}

// *******
// Helpers
// *******

/**
 * Based on the an invisible container and the window width it calculates the scrollbar width
 */
function calculateScrollbarWidth() {

  // no scrollbars present
  if (document.body.clientHeight <= document.documentElement.clientHeight) {
    return 0;
  }

  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  document.body.appendChild(outer);

  // Creating inner element and placing it in the container
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculating difference between container's full width and the child width
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Removing temporary elements from the DOM
  outer.parentNode.removeChild(outer);

  return scrollbarWidth;
}
