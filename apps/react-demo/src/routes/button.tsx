import * as React from "react";
import { GoAButton } from "@abgov/react-components";

export default function Button() {
  function onClick() {
    console.log("clicked");
  }

  return (
    <>
      <h1>Button</h1>
      <h2>Types</h2>
      <GoAButton onClick={() => onClick()} type="primary">
        Primary
      </GoAButton>
      <GoAButton onClick={() => onClick()} type="submit">
        Submit
      </GoAButton>
      <GoAButton onClick={() => onClick()} type="secondary">
        Secondary
      </GoAButton>
      <GoAButton onClick={() => onClick()} type="tertiary">
        Tertiary
      </GoAButton>
      <GoAButton onClick={() => onClick()} type="start">
        Get Started
      </GoAButton>

      <h2>Disabled</h2>
      <GoAButton onClick={() => onClick()} type="primary" disabled>
        Primary
      </GoAButton>
      <GoAButton onClick={() => onClick()} type="secondary" disabled={true}>
        Secondary
      </GoAButton>
      <GoAButton onClick={() => onClick()} type="tertiary" disabled>
        Tertiary
      </GoAButton>
      <GoAButton onClick={() => onClick()} type="start" disabled>
        Get Started
      </GoAButton>

      <h2>Sizes</h2>
      <GoAButton size="compact" onClick={() => onClick()} type="primary">
        Compact Primary
      </GoAButton>
      <GoAButton size="compact" onClick={() => onClick()} type="secondary">
        Compact Secondary
      </GoAButton>
      <GoAButton size="compact" onClick={() => onClick()} type="tertiary">
        Compact Tertiary
      </GoAButton>

      <h2>Icons</h2>
      <GoAButton
        leadingIcon="airplane"
        onClick={() => onClick()}
        type="primary"
      >
        Leading
      </GoAButton>
      <GoAButton
        trailingIcon="airplane"
        onClick={() => onClick()}
        type="primary"
      >
        Trailing
      </GoAButton>
      <GoAButton
        leadingIcon="archive"
        trailingIcon="airplane"
        onClick={() => onClick()}
        type="primary"
      >
        Both
      </GoAButton>
    </>
  );
}
