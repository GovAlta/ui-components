import type { CSSProperties } from "react";
import {
  GoabButton,
  GoabCallout,
  GoabTooltip,
  GoabIcon,
  GoabContainer,
  GoabText,
  GoabGrid,
} from "@abgov/react-components";

const supportsCssAnchorPositioning =
  typeof CSS !== "undefined" &&
  typeof CSS.supports === "function" &&
  CSS.supports("anchor-name: --goa-tooltip-target");

export function Bug3323Route() {
  return (
    <>
      <GoabText tag="h1" mt="m" mb="s">
        Fix 3323 - Tooltip with fixed positioning
      </GoabText>
      <GoabText>
        CSS anchor positioning support in this browser:{" "}
        <strong>{supportsCssAnchorPositioning ? "Supported" : "Not supported"}</strong>.
      </GoabText>

      <GoabText tag="h2" mt="l" mb="s">
        Tooltip in callout
      </GoabText>
      <GoabCallout emphasis="low">
        <GoabTooltip content="This tooltip shoudn't be cut off">
          <GoabButton type="tertiary" size="compact">
            Hover me
          </GoabButton>
        </GoabTooltip>
      </GoabCallout>

      <GoabText tag="h2" mt="l" mb="s">
        Tooltip in container
      </GoabText>
      <GoabContainer>
        <GoabTooltip content="This tooltip shoudn't be cut off">
          <GoabIcon type="information-circle" />
        </GoabTooltip>
      </GoabContainer>

      <GoabText tag="h2" mt="l" mb="s">
        Basic tooltip
      </GoabText>
      <GoabTooltip content="Additional information about this item">
        <GoabButton type="secondary">Hover me</GoabButton>
      </GoabTooltip>

      <GoabText tag="h2" mt="l" mb="s">
        Horizontal alignment
      </GoabText>
      <GoabGrid minChildWidth="60px">
        <GoabTooltip content="Left aligned tooltip" hAlign="left">
          <GoabIcon type="information-circle" />
        </GoabTooltip>
        <GoabTooltip content="Center aligned tooltip" hAlign="center">
          <GoabIcon type="information-circle" />
        </GoabTooltip>
        <GoabTooltip content="Right aligned tooltip" hAlign="right">
          <GoabIcon type="information-circle" />
        </GoabTooltip>
      </GoabGrid>

      <GoabText tag="h2" mt="l" mb="s">
        Long Tooltip
      </GoabText>
      <GoabTooltip
        content="This is a deliberately long tooltip message that should render at a readable width, wrap naturally, and not collapse into a one-pixel column on first hover."
        maxWidth="320px"
      >
        <GoabButton type="tertiary" size="compact">
          Long tooltip
        </GoabButton>
      </GoabTooltip>
    </>
  );
}
