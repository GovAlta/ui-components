import * as React from "react";
import { GoAButtonGroup, GoAButton } from "@abgov/react-components";

export default function ButtonGroup() {
  function onClick() {
    console.log("clicked");
  }

  return (
    <>
      <h2>Start Alignment</h2>
      <GoAButtonGroup alignment="start">
        <GoAButton type="primary" onClick={() => console.log("clicked")}>
          Primary
        </GoAButton>
        <GoAButton type="submit" onClick={() => console.log("clicked")}>
          Submit
        </GoAButton>
        <GoAButton type="secondary" onClick={() => console.log("clicked")}>
          Secondary
        </GoAButton>
      </GoAButtonGroup>
      <h2>Center Alignment</h2>
      <GoAButtonGroup alignment="center">
        <GoAButton type="primary" onClick={() => console.log("clicked")}>
          Primary
        </GoAButton>
        <GoAButton type="submit" onClick={() => console.log("clicked")}>
          Submit
        </GoAButton>
        <GoAButton type="secondary" onClick={() => console.log("clicked")}>
          Secondary
        </GoAButton>
      </GoAButtonGroup>
      <h2>End Alignment</h2>
      <GoAButtonGroup alignment="end">
        <GoAButton type="primary" onClick={() => console.log("clicked")}>
          Primary
        </GoAButton>
        <GoAButton type="submit" onClick={() => console.log("clicked")}>
          Submit
        </GoAButton>
        <GoAButton type="secondary" onClick={() => console.log("clicked")}>
          Secondary
        </GoAButton>
      </GoAButtonGroup>

      <h2>Compact Gap</h2>
      <GoAButtonGroup alignment="start" gap="compact">
        <GoAButton
          type="primary"
          size="compact"
          onClick={() => console.log("clicked")}
        >
          Primary
        </GoAButton>
        <GoAButton
          type="submit"
          size="compact"
          onClick={() => console.log("clicked")}
        >
          Submit
        </GoAButton>
        <GoAButton
          type="secondary"
          size="compact"
          onClick={() => console.log("clicked")}
        >
          Secondary
        </GoAButton>
      </GoAButtonGroup>

      <h2>Margin Spacing</h2>
      <GoAButtonGroup mt="m" mb="xs" ml="xl" mr="2xl" alignment="start">
        <GoAButton type="primary" onClick={() => console.log("clicked")}>
          Primary
        </GoAButton>
        <GoAButton type="submit" onClick={() => console.log("clicked")}>
          Submit
        </GoAButton>
        <GoAButton type="secondary" onClick={() => console.log("clicked")}>
          Secondary
        </GoAButton>
      </GoAButtonGroup>
    </>
  );
}
