import * as React from 'react';
import { GoAButton, GoAModal, GoAButtonGroup } from "@abgov/react-components";
import { useState } from 'react';

export default function Modal() {

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [speed, setSpeed] = useState<any>("none");

  function show(speed: string) {
    setSpeed(speed)
    setShowModal(true)
  }

  return (
    <>
      <GoAButton onClick={() => setShowModal(true)}>Open Basic Modal</GoAButton>
      <GoAModal
        heading="Do you agree?"
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati
          id molestiae, natus dicta, eaque qui iusto similique, libero explicabo
          eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius
          numquam.
        </p>
      </GoAModal>

      <br />
      <GoAButton onClick={() => setShowModal2(true)}> Open Modal with actions</GoAButton>
      <GoAModal heading="Do you agree?" open={showModal2} >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati
          id molestiae, natus dicta, eaque qui iusto similique, libero explicabo
          eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius
          numquam.
        </p>
        <GoAButtonGroup alignment="end">
          <GoAButton type="secondary" onClick={() => setShowModal2(false)}>Secondary</GoAButton>
          <GoAButton onClick={() => setShowModal2(false)} > Primary</GoAButton>
        </GoAButtonGroup>
      </GoAModal>

      <br />
      <GoAButtonGroup alignment="start">
        <GoAButton type="tertiary" onClick={() => show('none')}>None</GoAButton>
        <GoAButton type="tertiary" onClick={() => show('slow')} > Slow</GoAButton>
        <GoAButton type="tertiary" onClick={() => show('fast')} > Fast</GoAButton>
      </GoAButtonGroup>
      <GoAModal
        heading="Do you agree?"
        open={showModal3}
        onClose={() => setShowModal2(false)}
        transition={speed}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati
          id molestiae, natus dicta, eaque qui iusto similique, libero explicabo
          eligendi eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius
          numquam.
        </p>
      </GoAModal>

    </>
  );
}
