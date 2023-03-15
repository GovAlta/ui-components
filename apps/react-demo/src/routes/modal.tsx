import * as React from "react";
import {
  GoAButton,
  GoAModal,
  GoAButtonGroup,
  ModalTransition,
  CalloutVariant,
  GoAFormItem,
  GoAInput,
} from "@abgov/react-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Modal() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [speed, setSpeed] = useState<ModalTransition>("none");
  const [calloutVariant, setCalloutVariant] =
    useState<CalloutVariant>("information");

  function showCallout(calloutVariant: CalloutVariant) {
    setCalloutVariant(calloutVariant);
    setShowModal(true);
  }

  function show(speed: ModalTransition) {
    setSpeed(speed);
    setShowModal3(true);
  }

  return (
    <>
      <h2>Basic</h2>
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
      <h2>Modal with Actions</h2>
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
      <h2>Transitions</h2>
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

      <br />
      <h2>Callout Variants</h2>
      <GoAButtonGroup alignment="start">
        <GoAButton onClick={() => showCallout("information")}>
          Information Callout
        </GoAButton>
        <GoAButton onClick={() => showCallout("important")}>
          Important Callout
        </GoAButton>
        <GoAButton onClick={() => showCallout("success")}>
          Success Callout
        </GoAButton>
        <GoAButton onClick={() => showCallout("emergency")}>
          Emergency Callout
        </GoAButton>
        <GoAButton onClick={() => showCallout("event")}>
          Event Callout
        </GoAButton>
      </GoAButtonGroup>
      <GoAModal
        type="callout"
        calloutVariant={calloutVariant}
        heading="Do you agree?"
        open={showModal}
        onClose={() => setShowModal(false)}
        actions={
          <GoAButtonGroup alignment="end">
            <GoAButton type="secondary" onClick={() => setShowModal(false)}>
              Secondary
            </GoAButton>
            <GoAButton type="primary" onClick={() => setShowModal(false)}>
              Primary
            </GoAButton>
          </GoAButtonGroup>
        }
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero
          explicabo eligendi eius laboriosam! Repellendus ducimus officia
          asperiores. Eos, eius numquam.
        </p>
      </GoAModal>

      <h2>Formatting Options</h2>
      <GoAButton onClick={() => setShowModal4(true)}>With Actions</GoAButton>
      <GoAModal
        heading={
          <>
            Lorem <b>ipsum</b> dolor <b>sit</b> amet
          </>
        }
        open={showModal4}
        actions={
          <GoAButtonGroup alignment="end">
            <GoAButton onClick={() => setShowModal4(false)}>
              Secondary
            </GoAButton>
            <GoAButton onClick={() => setShowModal4(false)}>Primary</GoAButton>
          </GoAButtonGroup>
        }
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero
          explicabo eligendi eius laboriosam! Repellendus ducimus officia
          asperiores. Eos, eius numquam. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque
          qui iusto similique, libero explicabo eligendi eius laboriosam!
          Repellendus ducimus officia asperiores. Eos, eius numquam.
        </p>
        <GoAFormItem label="First name">
          <GoAInput name="firstName" value="" onChange={() => void 0} />
        </GoAFormItem>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero
          explicabo eligendi eius laboriosam! Repellendus ducimus officia
          asperiores. Eos, eius numquam.
        </p>
      </GoAModal>

      <GoAButton onClick={() => setShowModal5(true)}>Without Actions</GoAButton>
      <GoAModal
        heading={
          <>
            Lorem <b>ipsum</b> dolor <b>sit</b> amet
          </>
        }
        open={showModal5}
        onClose={() => setShowModal5(false)}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero
          explicabo eligendi eius laboriosam! Repellendus ducimus officia
          asperiores. Eos, eius numquam. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Mollitia obcaecati id molestiae, natus dicta, eaque
          qui iusto similique, libero explicabo eligendi eius laboriosam!
          Repellendus ducimus officia asperiores. Eos, eius numquam.
        </p>
        <GoAFormItem label="First name">
          <GoAInput name="firstName" value="" onChange={() => void 0} />
        </GoAFormItem>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
          obcaecati id molestiae, natus dicta, eaque qui iusto similique, libero
          explicabo eligendi eius laboriosam! Repellendus ducimus officia
          asperiores. Eos, eius numquam.
        </p>
      </GoAModal>

      {/* To show scrollbars */}
      <div style={{ height: "100vh" }}></div>
    </>
  );
}
