import { useState } from "react";
import {
  GoabBlock,
  GoabButton,
  GoabDivider,
  GoabText,
} from "@abgov/react-components";
import { GoabxButton } from "@abgov/react-components/experimental";

export function Spike3285Route() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <GoabBlock direction="column" gap="l">
      <GoabBlock direction="column" gap="s">
        <GoabText tag="h1" mb="0" mt="0">
          <a
            href="https://github.com/GovAlta/ui-components/issues/3285"
            target="_blank"
            rel="noreferrer"
          >
            3285
          </a>
          {" "}- Experimental React Button wrapper
        </GoabText>
        <GoabText tag="p" mt="0">
          This demonstrates an experimental wrapper that renders a v2 Svelte component with experimental design tokens.
          These components can be used alongside current ones.
        </GoabText>
      </GoabBlock>

      <GoabText tag="h2" mt="0" mb="0">Experimental (GoabxButton)</GoabText>

      <GoabBlock gap="m">
        <GoabxButton type="primary" onClick={() => setClickCount((c) => c + 1)}>
          Primary
        </GoabxButton>
        <GoabxButton type="secondary" onClick={() => setClickCount((c) => c + 1)}>
          Secondary
        </GoabxButton>
        <GoabxButton type="tertiary" onClick={() => setClickCount((c) => c + 1)}>
          Tertiary
        </GoabxButton>
      </GoabBlock>

      <GoabBlock gap="m" mb="xl">
        <GoabxButton
          type="primary"
          leadingIcon="add"
          onClick={() => setClickCount((c) => c + 1)}
        >
          Leading icon
        </GoabxButton>
        <GoabxButton
          type="primary"
          trailingIcon="arrow-forward"
          onClick={() => setClickCount((c) => c + 1)}
        >
          Trailing icon
        </GoabxButton>
        <GoabxButton type="secondary" disabled>
          Disabled
        </GoabxButton>
      </GoabBlock>

      <GoabBlock direction="column" gap="m">
        <GoabText tag="h2" mt="0" mb="0">Non-experimental (GoabButton)</GoabText>

        <GoabBlock gap="m">
          <GoabButton type="primary" onClick={() => setClickCount((c) => c + 1)}>
            Primary
          </GoabButton>
          <GoabButton type="secondary" onClick={() => setClickCount((c) => c + 1)}>
            Secondary
          </GoabButton>
          <GoabButton type="tertiary" onClick={() => setClickCount((c) => c + 1)}>
            Tertiary
          </GoabButton>
        </GoabBlock>

        <GoabBlock gap="m">
          <GoabButton type="primary" leadingIcon="add" onClick={() => setClickCount((c) => c + 1)}>
            Leading icon
          </GoabButton>
          <GoabButton type="primary" trailingIcon="arrow-forward" onClick={() => setClickCount((c) => c + 1)}>
            Trailing icon
          </GoabButton>
          <GoabButton type="secondary" disabled>
            Disabled
          </GoabButton>
        </GoabBlock>

        <GoabDivider mt="l" mb="l"></GoabDivider>
        <GoabText tag="p" mt="0" mb="0">Clicks: {clickCount}</GoabText>
      </GoabBlock>
    </GoabBlock>
  );
}

export default Spike3285Route;
