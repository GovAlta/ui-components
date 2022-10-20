import * as React from "react";
import {
  GoAButton,
  GoAModal,
  GoAButtonGroup,
  ModalTransition,
} from "@abgov/react-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Modal() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [speed, setSpeed] = useState<ModalTransition>("none");

  function show(speed: ModalTransition) {
    setSpeed(speed);
    setShowModal3(true);
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero
          explicabo eligendi eius laboriosam! Repellendus ducimus officia
          asperiores. Eos, eius numquam.
        </p>
      </GoAModal>

      <br />
      <GoAButton onClick={() => setShowModal2(true)}>
        {" "}
        Open Modal with actions
      </GoAButton>
      <GoAModal heading="Do you agree?" open={showModal2} transition="fast">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero
          explicabo eligendi eius laboriosam! Repellendus ducimus officia
          asperiores. Eos, eius numquam.
        </p>
        <GoAButtonGroup alignment="end">
          <GoAButton type="secondary" onClick={() => setShowModal2(false)}>
            Secondary
          </GoAButton>
          <GoAButton onClick={() => setShowModal2(false)}> Primary</GoAButton>
        </GoAButtonGroup>
      </GoAModal>

      <br />
      <GoAButtonGroup alignment="start">
        <GoAButton type="tertiary" onClick={() => show("none")}>
          None
        </GoAButton>
        <GoAButton type="tertiary" onClick={() => show("slow")}>
          {" "}
          Slow
        </GoAButton>
        <GoAButton type="tertiary" onClick={() => show("fast")}>
          {" "}
          Fast
        </GoAButton>
      </GoAButtonGroup>
      <GoAModal
        heading="Do you agree?"
        open={showModal3}
        onClose={() => setShowModal2(false)}
        transition={speed}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero
          explicabo eligendi eius laboriosam! Repellendus ducimus officia
          asperiores. Eos, eius numquam.
        </p>

        <GoAButton
          type="primary"
          onClick={() => {
            setShowModal3(false);
            // setTimeout(() => navigate("/input"), 300) } // will allow any modal animations to be run
            navigate("/input");
          }}
        >
          Click
        </GoAButton>
      </GoAModal>

      {/* To show scrollbars */}
      <div style={{ height: "100vh" }}></div>
    </>
  );
}
