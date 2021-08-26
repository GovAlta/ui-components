/******************************************************************************
 * <div class="modal-root">
 *   <div class="modal" style="opacity: 1">
 *     <img
 *       class="modal-close"
 *       src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGNsYXNzPSdpb25pY29uJyB2aWV3Qm94PScwIDAgNTEyIDUxMic+PHRpdGxlPkNsb3NlPC90aXRsZT48cGF0aCBmaWxsPSdub25lJyBzdHJva2U9J2N1cnJlbnRDb2xvcicgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyBzdHJva2Utd2lkdGg9JzMyJyBkPSdNMzY4IDM2OEwxNDQgMTQ0TTM2OCAxNDRMMTQ0IDM2OCcvPjwvc3ZnPg=="
 *       alt="Close"
 *     />
 *     <div class="modal-content">
 *       <div class="modal-title">Show a little bit of text</div>
 *       <div class="goa-scrollable">
 *         <div style="overflow: hidden auto; height: 100%; padding: 0rem 1rem">
 *           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
 *           magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
 *           consequat.
 *         </div>
 *       </div>
 *       <div class="modal-actions">
 *         <button class="goa-button goa--tertiary" type="button">Cancel</button>
 *         <button class="goa-button" type="submit">Save</button>
 *       </div>
 *     </div>
 *   </div>
 *   <div class="modal-background" style="opacity: 1"></div>
 * </div>
/*****************************************************************************/

import React, { FC, useEffect, useState } from 'react';
import GoAScrollable from '../scrollable/scrollable.component';
import './modal.css';
import { GoACloseIcon } from '../icons';
import { TestProps } from '../common';

type ModalState = 'init' | 'visible' | 'hidden';

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

export const GoAModal: FC<ModalProps & ModalTestProps> = ({ children, isOpen, onClose, testId, backgroundTestId }) => {
  const [state, setState] = useState<ModalState>('init');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      show();
    }
    if (!isOpen && state === 'visible') {
      hide();
    }
  }, [isOpen, state]);

  function show() {
    setVisible(true);

    // need to perform on the next render cycle to allow the css transitions to take place
    setTimeout(() => {
      setState('visible');
      const scrollbarWidth = calculateScrollbarWidth();
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = scrollbarWidth + 'px';
    }, 0);
  }

  function hide() {
    setState('hidden')

    // need to perform on the next render cycle to allow the css transitions to take place
    setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '0';
    }, 300); // 300ms allows for any close animations to complete
  }

  return visible &&
    <div className="modal-root" data-testid={testId}>
      <Content onClick={onClose} visible={state === 'visible'}>
        {children}
      </Content>
      <Background onClick={() => onClose?.()} visible={state === 'visible'} testId={backgroundTestId} />
    </div>;
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
  visible: boolean;
  onClick: () => void;
}

const Content: FC<ContentProps> = ({ children, onClick, visible }) => {
  const opacity = visible ? 1 : 0;

  return (
    <div className="modal" onClick={(e) => e.stopPropagation()} style={{ opacity }}>
      {onClick && <GoACloseIcon className="modal-close" onClick={onClick} />}
      <div className="modal-content">{children}</div>
    </div>
  );
}

// ****************
// Background
// ****************

interface BackgroundProps {
  visible: boolean;
  onClick: () => void;
}

const Background: FC<BackgroundProps & TestProps> = ({ visible, onClick, testId }) => {
  const opacity = visible ? 1 : 0;
  return <div className="modal-background" onClick={onClick} style={{ opacity }} data-testid={testId}></div>;
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
