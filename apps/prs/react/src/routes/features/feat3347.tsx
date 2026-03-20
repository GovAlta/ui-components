import React, { useState } from "react";
import {
  GoabBlock,
  GoabButton,
  GoabButtonGroup,
  GoabDivider,
  GoabLink,
  GoabModal,
  GoabText,
} from "@abgov/react-components";

const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.`;

const actions = (onClose: () => void) => (
  <GoabButtonGroup alignment="end">
    <GoabButton type="tertiary" onClick={onClose}>
      Cancel
    </GoabButton>
    <GoabButton type="primary" onClick={onClose}>
      Confirm
    </GoabButton>
  </GoabButtonGroup>
);

export function Feat3347Route() {
  const [v2WithActions, setV2WithActions] = useState(false);
  const [v2NoActions, setV2NoActions] = useState(false);
  const [v2ShortContent, setV2ShortContent] = useState(false);
  const [v2Callout, setV2Callout] = useState(false);
  const [v1WithActions, setV1WithActions] = useState(false);

  return (
    <div>
      <GoabText tag="h1" mt="m">
        Feature #3347: Modal sticky header / footer (v2)
      </GoabText>

      <GoabBlock>
        <GoabLink trailingIcon="open">
          <a
            href="https://github.com/GovAlta/ui-components/issues/3347"
            target="_blank"
            rel="noopener"
          >
            View on GitHub
          </a>
        </GoabLink>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Cases</GoabText>

      {/* ------------------------------------------------------------------ */}
      <GoabText tag="h3">Test 1: v2 modal with long content and actions</GoabText>
      <GoabText tag="p">
        The header should stay fixed at the top, the content area should scroll,
        and the action buttons should stay fixed at the bottom. A border should
        appear under the header when content is scrolled away from the top, and a
        border should appear above the actions when content has not yet reached
        the bottom.
      </GoabText>
      <GoabButton type="primary" onClick={() => setV2WithActions(true)}>
        Open v2 modal (scrollable + actions)
      </GoabButton>

      <GoabModal
        open={v2WithActions}
        heading="Modal with sticky header and footer"
        onClose={() => setV2WithActions(false)}
        // @ts-expect-error version prop exists on the web component
        version="2"
        actions={actions(() => setV2WithActions(false))}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <GoabText key={i} tag="p">
            {loremIpsum}
          </GoabText>
        ))}
      </GoabModal>

      {/* ------------------------------------------------------------------ */}
      <GoabText tag="h3" mt="xl">Test 2: v2 modal without actions</GoabText>
      <GoabText tag="p">
        When there are no actions, the footer area should not appear (no empty
        space at the bottom). The header should still be sticky.
      </GoabText>
      <GoabButton type="primary" onClick={() => setV2NoActions(true)}>
        Open v2 modal (no actions)
      </GoabButton>

      <GoabModal
        open={v2NoActions}
        heading="Modal without footer actions"
        onClose={() => setV2NoActions(false)}
        // @ts-expect-error version prop exists on the web component
        version="2"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <GoabText key={i} tag="p">
            {loremIpsum}
          </GoabText>
        ))}
      </GoabModal>

      {/* ------------------------------------------------------------------ */}
      <GoabText tag="h3" mt="xl">Test 3: v2 modal with short content (no scroll)</GoabText>
      <GoabText tag="p">
        When content is shorter than the viewport, there should be no scroll and
        no borders on header or footer — the modal should size to its content.
      </GoabText>
      <GoabButton type="primary" onClick={() => setV2ShortContent(true)}>
        Open v2 modal (short content)
      </GoabButton>

      <GoabModal
        open={v2ShortContent}
        heading="Short content modal"
        onClose={() => setV2ShortContent(false)}
        // @ts-expect-error version prop exists on the web component
        version="2"
        actions={actions(() => setV2ShortContent(false))}
      >
        <GoabText tag="p">This modal has very little content — no scroll needed.</GoabText>
      </GoabModal>

      {/* ------------------------------------------------------------------ */}
      <GoabText tag="h3" mt="xl">Test 4: v2 callout modal with long content and actions</GoabText>
      <GoabText tag="p">
        Callout modals should also support the sticky header / footer layout in v2.
      </GoabText>
      <GoabButton type="primary" onClick={() => setV2Callout(true)}>
        Open v2 callout modal
      </GoabButton>

      <GoabModal
        open={v2Callout}
        heading="Callout modal – information"
        calloutVariant="information"
        onClose={() => setV2Callout(false)}
        // @ts-expect-error version prop exists on the web component
        version="2"
        actions={actions(() => setV2Callout(false))}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <GoabText key={i} tag="p">
            {loremIpsum}
          </GoabText>
        ))}
      </GoabModal>

      {/* ------------------------------------------------------------------ */}
      <GoabText tag="h3" mt="xl">Test 5: v1 modal (baseline comparison)</GoabText>
      <GoabText tag="p">
        The v1 modal should still work as before (using box-shadows for scroll
        indication rather than borders).
      </GoabText>
      <GoabButton type="primary" onClick={() => setV1WithActions(true)}>
        Open v1 modal (reference)
      </GoabButton>

      <GoabModal
        open={v1WithActions}
        heading="v1 modal (reference)"
        onClose={() => setV1WithActions(false)}
        actions={actions(() => setV1WithActions(false))}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <GoabText key={i} tag="p">
            {loremIpsum}
          </GoabText>
        ))}
      </GoabModal>
    </div>
  );
}

export default Feat3347Route;
