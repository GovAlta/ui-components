import { GoabButton, GoabButtonGroup, GoabModal } from "@abgov/react-components";
import { JSX, useState } from "react";

export function Bug2685Route(): JSX.Element {
  const [isWithOpen, setWithOpen] = useState(false);
  const [isWithoutOpen, setWithoutOpen] = useState(false);
  const [isNoneOpen, setNoneOpen] = useState(false);

  return (
    <>
      <GoabButtonGroup alignment="end">
        <GoabButton onClick={() => setWithOpen(true)}>Show Modal w/ Actions</GoabButton>
        <GoabButton onClick={() => setWithoutOpen(true)}>
          Show Modal w/o Actions
        </GoabButton>
        <GoabButton onClick={() => setNoneOpen(true)}>
          Show Modal w/ No Actions
        </GoabButton>
      </GoabButtonGroup>
      <GoabModal
        testId="without-actions"
        heading="Actions Modal react ✅"
        open={isWithOpen}
        actions={
          <GoabButtonGroup testId="without-actions-bg" alignment="end" mt={"none"}>
            <GoabButton
              type="tertiary"
              onClick={() => {
                setWithOpen(false);
              }}
            >
              Cancel
            </GoabButton>
            <GoabButton
              type="primary"
              onClick={() => {
                setWithOpen(false);
              }}
            >
              Exit
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id
          molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi
          eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.
        </p>
      </GoabModal>
      <GoabModal
        testId="with-actions"
        heading="No Actions Modal react ❌"
        open={isWithoutOpen}
        onClose={() => setWithoutOpen(false)}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id
          molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi
          eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.
        </p>
        <GoabButtonGroup testId="with-actions-bg" alignment="end" mt="none">
          <GoabButton type="tertiary" onClick={() => setWithoutOpen(false)}>
            Cancel
          </GoabButton>
          <GoabButton type="primary" onClick={() => setWithoutOpen(false)}>
            Exit
          </GoabButton>
        </GoabButtonGroup>
      </GoabModal>
      <GoabModal testId="none" heading="No Actions At All" open={isNoneOpen}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia obcaecati id
          molestiae, natus dicta, eaque qui iusto similique, libero explicabo eligendi
          eius laboriosam! Repellendus ducimus officia asperiores. Eos, eius numquam.
        </p>
      </GoabModal>
    </>
  );
}
