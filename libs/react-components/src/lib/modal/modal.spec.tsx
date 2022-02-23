import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React, { useState } from 'react';
import GoAButton from '../../lib/button/button';
import { GoAModal, GoAModalActions, GoAModalContent, GoAModalTitle } from './modal';

describe.skip('Modal Tests', () => {

  it('Modal - should render with close capability via icon and background', async () => {

    const TestComponent = () => {
      const [isOpen, setIsOpen] = useState(false)

      return (<>
        <button data-testid="open-modal" onClick={() => setIsOpen(true)}>Open Modal</button>

        <GoAModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          testId="modal"
          backgroundTestId="modal-background"
        >
          <GoAModalTitle testId="modal-title">The Title</GoAModalTitle>
          <GoAModalContent testId="modal-content">The content</GoAModalContent>
          <GoAModalActions>
            <GoAButton buttonType="tertiary" onClick={() => setIsOpen(false)}>
              Cancel
            </GoAButton>
            <GoAButton buttonType="primary">
              Save
            </GoAButton>
          </GoAModalActions>
        </GoAModal>
      </>
      );
    };

    const { queryByTestId } = render(<TestComponent />);

    // open modal
    expect(queryByTestId('open-modal')).toBeTruthy();
    expect(queryByTestId('modal').getAttribute('data-state')).toBe('init');
    fireEvent.click(queryByTestId('open-modal'))
    expect(queryByTestId('modal').getAttribute('data-state')).toBe('visible');

    // validate content
    expect(queryByTestId('modal-title').textContent).toBe('The Title');
    expect(queryByTestId('modal-content').textContent).toContain('The content');

    // close modal via close icon
    fireEvent.click(queryByTestId('icon-close'));

    // validate close
    await waitFor(() => {
      expect(queryByTestId('modal').getAttribute('data-state')).toBe('init');
    })

    // validate close via background click
    fireEvent.click(queryByTestId('open-modal'))
    expect(queryByTestId('modal')).toBeVisible();
    fireEvent.click(queryByTestId('modal-background'));
    await waitFor(() => {
      expect(queryByTestId('modal').getAttribute('data-state')).toBe('init');
    })
  });


  it('Modal - should render without close capability via icon and background', async () => {

    const TestComponent = () => {
      const [isOpen, setIsOpen] = useState(false)

      return (<>
        <button data-testid="open-modal" onClick={() => setIsOpen(true)}>Open Modal</button>

        <GoAModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          testId="modal"
          backgroundTestId="modal-background"
        >
          <GoAModalTitle testId="modal-title">The Title</GoAModalTitle>
          <GoAModalContent testId="modal-content">The content</GoAModalContent>
          <GoAModalActions>
            <GoAButton buttonType="tertiary" onClick={() => setIsOpen(false)}>
              Cancel
            </GoAButton>
            <GoAButton buttonType="primary">
              Save
            </GoAButton>
          </GoAModalActions>
        </GoAModal>
      </>
      );
    };

    const { queryByTestId } = render(<TestComponent />);

    // open modal
    expect(queryByTestId('open-modal')).toBeTruthy();
    expect(queryByTestId('modal').getAttribute('data-state')).toBe('init');
    fireEvent.click(queryByTestId('open-modal'))
    expect(queryByTestId('modal').getAttribute('data-state')).toBe('visible');

    // validate content
    expect(queryByTestId('modal-title').textContent).toBe('The Title');
    expect(queryByTestId('modal-content').textContent).toContain('The content');

    // close modal via close icon
    fireEvent.click(queryByTestId('icon-close'));

    // validate close
    await waitFor(() => {
      expect(queryByTestId('modal').getAttribute('data-state')).toBe('init');
    })

    // validate close via background click
    fireEvent.click(queryByTestId('open-modal'))
    expect(queryByTestId('modal')).toBeTruthy();
    fireEvent.click(queryByTestId('modal-background'));
    await waitFor(() => {
      expect(queryByTestId('modal').getAttribute('data-state')).toBe('init');
    })
  });
})
