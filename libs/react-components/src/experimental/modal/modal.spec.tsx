
import { fireEvent, render, waitFor } from '@testing-library/react';
import React, { useState } from 'react';
import GoAButton from '../../lib/button/button';
import { GoAModal, GoAModalActions, GoAModalContent, GoAModalTitle } from './modal.component';

describe('Modal Tests', () => {

  it('Modal - should render with close capability via icon and background', async () => {

    const TestComponent = () => {
      const [isOpen, setIsOpen] = useState(false)

      return (<>
        <button data-testid="open-modal" onClick={() => setIsOpen(true)}>Open Modal</button>

        <GoAModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <GoAModalTitle>The Title</GoAModalTitle>
          <GoAModalContent>The content</GoAModalContent>
          <GoAModalActions>
            <GoAButton buttonType="tertiary" type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </GoAButton>
            <GoAButton buttonType="primary" type="submit">
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
    expect(queryByTestId('modal')).toBeFalsy();
    fireEvent.click(queryByTestId('open-modal'))
    expect(queryByTestId('modal')).toBeTruthy();

    // validate content
    expect(queryByTestId('modal-title').textContent).toBe('The Title');
    expect(queryByTestId('modal-content').textContent).toContain('The content');

    // close modal via close icon
    fireEvent.click(queryByTestId('icon-close'));

    // validate close
    await waitFor(() => {
      expect(queryByTestId('modal')).toBeFalsy();
    })

    // validate close via background click
    fireEvent.click(queryByTestId('open-modal'))
    expect(queryByTestId('modal')).toBeTruthy();
    fireEvent.click(queryByTestId('modal-background'));
    await waitFor(() => {
      expect(queryByTestId('modal')).toBeFalsy();
    })
  });


  it('Modal - should render without close capability via icon and background', async () => {

    const TestComponent = () => {
      const [isOpen, setIsOpen] = useState(false)

      return (<>
        <button data-testid="open-modal" onClick={() => setIsOpen(true)}>Open Modal</button>

        <GoAModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <GoAModalTitle>The Title</GoAModalTitle>
          <GoAModalContent>The content</GoAModalContent>
          <GoAModalActions>
            <GoAButton buttonType="tertiary" type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </GoAButton>
            <GoAButton buttonType="primary" type="submit">
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
    expect(queryByTestId('modal')).toBeFalsy();
    fireEvent.click(queryByTestId('open-modal'))
    expect(queryByTestId('modal')).toBeTruthy();

    // validate content
    expect(queryByTestId('modal-title').textContent).toBe('The Title');
    expect(queryByTestId('modal-content').textContent).toContain('The content');

    // close modal via close icon
    fireEvent.click(queryByTestId('icon-close'));

    // validate close
    await waitFor(() => {
      expect(queryByTestId('modal')).toBeFalsy();
    })

    // validate close via background click
    fireEvent.click(queryByTestId('open-modal'))
    expect(queryByTestId('modal')).toBeTruthy();
    fireEvent.click(queryByTestId('modal-background'));
    await waitFor(() => {
      expect(queryByTestId('modal')).toBeFalsy();
    })
  });
})
