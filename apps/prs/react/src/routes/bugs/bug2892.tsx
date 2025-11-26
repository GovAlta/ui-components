import React from "react";
import { GoabBlock, GoabText, GoabInput, GoabFormItem } from "@abgov/react-components";
import { GoabInputOnChangeDetail } from "@abgov/ui-components-common";

export function Bug2892Route() {
  const handleInputChange = (detail: GoabInputOnChangeDetail) => {
    console.log("Input change:", detail);
  };

  return (
    <div style={{ width: "1024px", margin: "0 auto" }}>
      <GoabText size="heading-l" mb="xl">
        Bug #2892: Width Measurements Test
      </GoabText>

      <GoabText size="body-m" mb="2xl">
        This test demonstrates various width measurements (ch, px, rem, %) on GoabInput
        components. All inputs have onChange handlers that log to console. The bug affects
        character width calculations.
      </GoabText>

      {/* Character (ch) Width Tests */}
      <GoabText size="heading-m" mb="l">
        Character (ch) Width Tests
      </GoabText>

      <GoabBlock gap="l" direction="column">
        <GoabFormItem label="Low ch width (2ch)">
          <GoabInput
            name="input-ch-low"
            placeholder="2ch width"
            width="2ch"
            onChange={handleInputChange}
          />
        </GoabFormItem>

        <GoabFormItem label="Low ch width with icons (2ch)">
          <GoabInput
            name="input-ch-low-icons"
            placeholder="2ch width with icons"
            width="2ch"
            leadingIcon="search"
            trailingIcon="close"
            onChange={handleInputChange}
          />
        </GoabFormItem>

        <GoabFormItem label="Normal ch width (40ch)">
          <GoabInput
            name="input-ch-normal"
            placeholder="40ch width"
            width="40ch"
            onChange={handleInputChange}
          />
        </GoabFormItem>

        <GoabFormItem label="Normal ch width with icons (40ch)">
          <GoabInput
            name="input-ch-normal-icons"
            placeholder="40ch width with icons"
            width="40ch"
            leadingIcon="mail"
            trailingIcon="checkmark"
            onChange={handleInputChange}
          />
        </GoabFormItem>
      </GoabBlock>

      {/* Pixel (px) Width Tests */}
      <GoabText size="heading-m" mb="l" mt="2xl">
        Pixel (px) Width Tests
      </GoabText>

      <GoabBlock gap="l" direction="column">
        <GoabFormItem label="Low px width (50px)">
          <GoabInput
            name="input-px-low"
            placeholder="50px width"
            width="50px"
            onChange={handleInputChange}
          />
        </GoabFormItem>

        <GoabFormItem label="Low px width with icons (50px)">
          <GoabInput
            name="input-px-low-icons"
            placeholder="50px width with icons"
            width="50px"
            leadingIcon="person"
            trailingIcon="eye"
            onChange={handleInputChange}
          />
        </GoabFormItem>

        <GoabFormItem label="Normal px width (300px)">
          <GoabInput
            name="input-px-normal"
            placeholder="300px width"
            width="300px"
            onChange={handleInputChange}
          />
        </GoabFormItem>

        <GoabFormItem label="Normal px width with icons (300px)">
          <GoabInput
            name="input-px-normal-icons"
            placeholder="300px width with icons"
            width="300px"
            leadingIcon="location"
            trailingIcon="information"
            onChange={handleInputChange}
          />
        </GoabFormItem>
      </GoabBlock>

      {/* Rem Width Tests */}
      <GoabText size="heading-m" mb="l" mt="2xl">
        Rem Width Tests
      </GoabText>

      <GoabBlock gap="l" direction="column">
        <GoabFormItem label="Low rem width (2rem)">
          <GoabInput
            name="input-rem-low"
            placeholder="2rem width"
            width="2rem"
            onChange={handleInputChange}
          />
        </GoabFormItem>

        <GoabFormItem label="Low rem width with icons (2rem)">
          <GoabInput
            name="input-rem-low-icons"
            placeholder="2rem width with icons"
            width="2rem"
            leadingIcon="calendar"
            trailingIcon="time"
            onChange={handleInputChange}
          />
        </GoabFormItem>

        <GoabFormItem label="Normal rem width (20rem)">
          <GoabInput
            name="input-rem-normal"
            placeholder="20rem width"
            width="20rem"
            onChange={handleInputChange}
          />
        </GoabFormItem>

        <GoabFormItem label="Normal rem width with icons (20rem)">
          <GoabInput
            name="input-rem-normal-icons"
            placeholder="20rem width with icons"
            width="20rem"
            leadingIcon="home"
            trailingIcon="settings"
            onChange={handleInputChange}
          />
        </GoabFormItem>
      </GoabBlock>

      {/* Percentage (%) Width Tests */}
      <GoabText size="heading-m" mb="l" mt="2xl">
        Percentage (%) Width Tests
      </GoabText>

      <GoabBlock gap="l" direction="column">
        <GoabFormItem label="Low percentage width (20%)">
          <GoabInput
            name="input-percent-low"
            placeholder="20% width"
            width="20%"
            onChange={handleInputChange}
          />
        </GoabFormItem>

        <GoabFormItem label="Low percentage width with icons (20%)">
          <GoabInput
            name="input-percent-low-icons"
            placeholder="20% width with icons"
            width="20%"
            leadingIcon="call"
            trailingIcon="checkmark"
            onChange={handleInputChange}
          />
        </GoabFormItem>

        <GoabFormItem label="Normal percentage width (60%)">
          <GoabInput
            name="input-percent-normal"
            placeholder="60% width"
            width="60%"
            onChange={handleInputChange}
          />
        </GoabFormItem>

        <GoabFormItem label="Normal percentage width with icons (60%)">
          <GoabInput
            name="input-percent-normal-icons"
            placeholder="60% width with icons"
            width="60%"
            leadingIcon="globe"
            trailingIcon="link"
            onChange={handleInputChange}
          />
        </GoabFormItem>
      </GoabBlock>

      {/* Default Width Test (no width specified) */}
      <GoabText size="heading-m" mb="l" mt="2xl">
        Default Width Test
      </GoabText>

      <GoabBlock gap="l" direction="column">
        <GoabFormItem label="Default width (no width specified)">
          <GoabInput
            name="input-default"
            placeholder="Default width"
            onChange={handleInputChange}
          />
        </GoabFormItem>
      </GoabBlock>

      <GoabText size="body-s" mt="2xl">
        Check the browser console to see the onChange events when you type in the inputs.
        Notice how character (ch) width inputs behave differently from other units.
      </GoabText>
    </div>
  );
}
