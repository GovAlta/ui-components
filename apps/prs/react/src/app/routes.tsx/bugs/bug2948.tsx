import React, { useState } from "react";
import {
  GoabModal,
  GoabButton,
  GoabButtonGroup,
  GoabBlock,
} from "@abgov/react-components";

export function Bug2948Route() {
  // Modal 1: String heading
  const [modal1Open, setModal1Open] = useState(false);

  // Modal 2: ReactNode heading and content
  const [modal2Open, setModal2Open] = useState(false);

  // Modal 3: Empty heading and actions
  const [modal3Open, setModal3Open] = useState(false);

  // Modal 4: ReactNode heading and actions with ButtonGroup
  const [modal4Open, setModal4Open] = useState(false);

  const openModal1 = () => setModal1Open(true);
  const openModal2 = () => setModal2Open(true);
  const openModal3 = () => setModal3Open(true);
  const openModal4 = () => setModal4Open(true);

  const closeModal1 = () => setModal1Open(false);
  const closeModal2 = () => setModal2Open(false);
  const closeModal3 = () => setModal3Open(false);
  const closeModal4 = () => setModal4Open(false);

  return (
    <>
      <h1>Bug 2948 - Modal Testing</h1>
      <p>
        Testing different GoabModal configurations with various heading and action
        patterns.
      </p>

      <GoabBlock gap="m" direction="column">
        <h2>Modal 1: String Heading</h2>
        <p>
          This modal uses a simple string heading and can be closed with the close button
          or backdrop.
        </p>
        <GoabButton type="primary" onClick={openModal1}>
          Open Modal 1
        </GoabButton>

        <h2>Modal 2: ReactNode Heading and Content</h2>
        <p>
          This modal uses ReactNode for both heading and content, allowing for rich HTML
          content.
        </p>
        <GoabButton type="primary" onClick={openModal2}>
          Open Modal 2
        </GoabButton>

        <h2>Modal 3: Empty Heading and Actions</h2>
        <p>
          This modal has no heading and no actions, demonstrating minimal configuration.
        </p>
        <GoabButton type="primary" onClick={openModal3}>
          Open Modal 3
        </GoabButton>

        <h2>Modal 4: ReactNode Heading with ButtonGroup Actions</h2>
        <p>
          This modal uses ReactNode for heading and contains a ButtonGroup with two
          buttons in the actions slot.
        </p>
        <GoabButton type="primary" onClick={openModal4}>
          Open Modal 4
        </GoabButton>
      </GoabBlock>

      {/* Modal 1: String heading */}
      <GoabModal open={modal1Open} heading="Simple String Heading" onClose={closeModal1}>
        <p>
          This is modal 1 with a simple string heading. It can be closed by clicking the
          close button or clicking outside the modal.
        </p>
        <p>
          The heading is set using the <code>heading</code> property with a string value.
        </p>
      </GoabModal>

      {/* Modal 2: ReactNode heading and content */}
      <GoabModal
        open={modal2Open}
        onClose={closeModal2}
        heading={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontWeight: "bold" }}>Rich Content Modal</span>
          </div>
        }
      >
        <div>
          <h3>Welcome to Modal 2!</h3>
          <p>
            This modal demonstrates using <code>ReactNode</code> for both the heading and
            content.
          </p>
          <ul>
            <li>
              The heading can contain <strong>rich HTML content</strong>
            </li>
            <li>
              You can include <em>icons, formatting, and complex layouts</em>
            </li>
            <li>
              The content area supports <code>any HTML structure</code>
            </li>
          </ul>
          <p>This provides maximum flexibility for custom modal designs.</p>
        </div>
      </GoabModal>

      {/* Modal 3: Empty heading and actions */}
      <GoabModal open={modal3Open} heading="" onClose={closeModal3}>
        <p>This is modal 3 with an empty heading and no actions.</p>
        <p>It demonstrates the minimal modal configuration possible.</p>
        <p>The modal can only be closed using the close button or backdrop click.</p>
      </GoabModal>

      {/* Modal 4: ReactNode heading with ButtonGroup actions */}
      <GoabModal
        open={modal4Open}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="tertiary" onClick={closeModal4}>
              Cancel
            </GoabButton>
            <GoabButton type="primary" onClick={closeModal4}>
              Confirm
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <div>
          <p>This is modal 4 with a custom heading and action buttons.</p>
          <p>
            The actions are implemented using a <code>GoabButtonGroup</code> with two
            buttons.
          </p>
          <p>
            This pattern is commonly used for confirmation dialogs and form submissions.
          </p>
        </div>
      </GoabModal>
    </>
  );
}
