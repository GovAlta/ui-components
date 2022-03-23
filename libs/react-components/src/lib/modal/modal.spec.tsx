import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import React, { useState } from 'react';
import GoAButton from '../../lib/button/button';
import { GoAModal } from './modal';

describe('Modal Tests', () => {

  it.skip('Modal - should render with close capability via icon and background', async () => {

    const TestComponent = () => {
      const [isOpen, setIsOpen] = useState(false)

      return (<>
        <button data-testid="open-modal" onClick={() => setIsOpen(true)}>Open Modal</button>

        <GoAModal
          open={isOpen}
          title="The Title"
          onClose={() => setIsOpen(false)}
          actions={<>
            <GoAButton type="tertiary" onClick={() => setIsOpen(false)}>
              Cancel
            </GoAButton>
            <GoAButton type="primary" onClick={() => { }}>
              Save
            </GoAButton>
          </>}
        >
          The content
        </GoAModal>
      </>
      );
    };

    const { baseElement, queryByTestId } = render(<TestComponent />);

    // open modal
    const openButton = queryByTestId('open-modal')
    expect(openButton).toBeTruthy();
    fireEvent.click(openButton)

    await waitFor(() => {
      // validate content
      expect(queryByTestId('modal-title').textContent).toBe('The Title');
      expect(queryByTestId('modal-content').textContent).toContain('The content');
    });

    // close modal via close icon
    // fireEvent.click(queryByTestId('modal-close-button'));
    // expect(queryByTestId('modal')).not.toBeVisible();

    // // validate close via background click
    // fireEvent.click(queryByTestId('open-modal'))
    // expect(queryByTestId('modal')).toBeVisible();
    // fireEvent.click(queryByTestId('modal-background'));
  });


  it.skip('Modal - should render without close capability via icon and background', async () => {

    const TestComponent = () => {
      const [isOpen, setIsOpen] = useState(false)

      return (<>
        <button data-testid="open-modal" onClick={() => setIsOpen(true)}>Open Modal</button>

        <GoAModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          title="The Title"
          actions={<>
            <GoAButton type="tertiary" onClick={() => setIsOpen(false)}>
              Cancel
            </GoAButton>
            <GoAButton type="primary" onClick={() => { }}>
              Save
            </GoAButton>
          </>}
        >
          The content
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
