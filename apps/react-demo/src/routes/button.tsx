import * as React from 'react';
import { GoAButton } from "@abgov/react-components";

export default function Button() {

  function onClick() {
    console.log('clicked');
  }

  return (
    <>
      <h3>Types</h3>
      <GoAButton onClick={() => onClick()} type="primary">Primary</GoAButton ><br />
      <GoAButton onClick={() => onClick()} type="secondary" > Secondary</GoAButton ><br />
      <GoAButton onClick={() => onClick()} type="tertiary" > Tertiary</GoAButton ><br />
      <GoAButton onClick={() => onClick()} type="start" > Get Started</GoAButton ><br />

      <h3>Disabled</h3>
      <GoAButton onClick={() => onClick()} type="primary" disabled > Primary</GoAButton ><br />
      <GoAButton onClick={() => onClick()} type="secondary" disabled={true} > Secondary</GoAButton ><br />
      <GoAButton onClick={() => onClick()} type="tertiary" disabled > Tertiary</GoAButton ><br />
      <GoAButton onClick={() => onClick()} type="start" disabled > Get Started</GoAButton ><br />

      <h3>Sizes</h3>
      <GoAButton size="compact" onClick={() => onClick()} type="primary"
      > Compact Primary</GoAButton
      ><br />
      <GoAButton size="compact" onClick={() => onClick()} type="secondary"
      > Compact Secondary</GoAButton
      ><br />
      <GoAButton size="compact" onClick={() => onClick()} type="tertiary"
      > Compact Tertiary</GoAButton
      ><br />

      <h3>Icons</h3>
      <GoAButton leadingIcon="airplane" onClick={() => onClick()} type="primary"
      > Leading</GoAButton
      ><br />
      <GoAButton trailingIcon="airplane" onClick={() => onClick()} type="primary"
      > Trailing</GoAButton
      ><br />
      <GoAButton
        leadingIcon="archive"
        trailingIcon="airplane"
        onClick={() => onClick()}
        type="primary"
      > Both</GoAButton
      > <br />

    </>
  );
}
