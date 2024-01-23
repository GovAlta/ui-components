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
      <GoAButton onClick={() => onClick()} testId="defaultButton">
        Default
      </GoAButton>
      <GoAButton onClick={() => onClick()} type="primary">
        Primary
      </GoAButton>
      <GoAButton onClick={() => onClick()} type="submit" testId="submitButton">
        Submit
      </GoAButton>
      <GoAButton onClick={() => onClick()} type="secondary" testId="secondaryButton">
        Secondary
      </GoAButton>
      <GoAButton onClick={() => onClick()} type="tertiary" testId="tertiaryButton">
        Tertiary
      </GoAButton>
      <GoAButton onClick={() => onClick()} type="start" testId="startButton">
        Get Started
      </GoAButton>

      <h2>Disabled</h2>
      <GoAButton onClick={() => onClick()} type="primary" disabled testId="disabledPrimaryButton">
        Primary
      </GoAButton>
      <GoAButton onClick={() => onClick()} type="secondary" disabled={true} testId="disabledSecondaryButton">
        Secondary
      </GoAButton>
      <GoAButton onClick={() => onClick()} type="tertiary" disabled testId="disabledTertiaryButton">
        Tertiary
      </GoAButton>
      <GoAButton onClick={() => onClick()} type="start" disabled testId="disabledStartButton">
        Get Started
      </GoAButton>

      <h2>Sizes</h2>
      <GoAButton size="compact" onClick={() => onClick()} type="primary" testId="ButtonPrimaryCompact">
        Compact Primary
      </GoAButton>
      <GoAButton size="compact" onClick={() => onClick()} type="secondary" testId="ButtonSecondaryCompact">
        Compact Secondary
      </GoAButton>
      <GoAButton size="compact" onClick={() => onClick()} type="tertiary" testId="ButtonTertiaryCompact">
        Compact Tertiary
      </GoAButton>
      <GoAButton size="normal" onClick={() => onClick()} type="primary" testId="ButtonPrimaryNormal">
        Normal Primary
      </GoAButton>
      <GoAButton size="normal" onClick={() => onClick()} type="secondary" testId="ButtonSecondaryNormal">
        Normal Secondary
      </GoAButton>
      <GoAButton size="normal" onClick={() => onClick()} type="tertiary" testId="ButtonTertiaryNormal">
        Normal Tertiary
      </GoAButton>

      <h2>Destructive</h2>
      <GoAButton onClick={() => onClick()} type="primary" variant="destructive" testId="primaryDestructiveButton">
        Destructive Primary
      </GoAButton>
      <GoAButton onClick={() => onClick()} type="secondary" variant="destructive" testId="secondaryDestructiveButton">
        Destructive Secondary
      </GoAButton>
      <GoAButton onClick={() => onClick()} type="tertiary" variant="destructive" testId="tertiaryDestructiveButton">
        Destructive Tertiary
      </GoAButton>

      <h2>Icons</h2>
      <GoAButton
        leadingIcon="airplane"
        onClick={() => onClick()}
        type="primary"
        testId="leadingIconButton"
      >
        Leading
      </GoAButton>
      <GoAButton
        trailingIcon="airplane"
        onClick={() => onClick()}
        type="primary"
        testId="TrailingIconButton"
      >
        Trailing
      </GoAButton>
      <GoAButton
        leadingIcon="archive"
        trailingIcon="airplane"
        onClick={() => onClick()}
        type="primary"
        testId="LeadTrailIconButton"
      >
        Both
      </GoAButton>

      <h2>Margin Spacing</h2>
      <GoAButton
        mt="m"
        mb="xs"
        ml="xl"
        mr="2xl"
        size="compact"
        onClick={() => onClick()}
        type="primary"
      >
        Compact Primary
      </GoAButton>
    </>
  );
}
