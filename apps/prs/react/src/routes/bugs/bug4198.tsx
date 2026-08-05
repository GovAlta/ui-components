import React, { useState } from "react";
import {
  GoabBlock,
  GoabDivider,
  GoabDropdown,
  GoabDropdownItem,
  GoabDropdownMultiselect,
  GoabFormItem,
  GoabInput,
  GoabOneColumnLayout,
  GoabPageBlock,
  GoabText,
  GoabTextarea,
} from "@abgov/react-components";

const narrow: React.CSSProperties = { maxWidth: "20rem" };

export function Bug4198Route() {
  const [emptyCity, setEmptyCity] = useState("");
  const [filledCity, setFilledCity] = useState("calgary");
  const [openCity, setOpenCity] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [comments, setComments] = useState("");

  return (
    <GoabPageBlock width="full">
      <GoabOneColumnLayout>
        <GoabBlock direction="column" gap="l">
          <GoabText tag="h1" size="heading-l" mt="xl" mb="m">
            Dropdown text colour hierarchy
          </GoabText>

          <GoabText size="body-m">
            The dropdown used to paint its placeholder in the darkest text colour and its menu
            options in a lighter grey, so an empty field looked filled and the options looked
            like the least important thing on screen. That weighting is now the other way
            round.
          </GoabText>

          <GoabText size="body-m">
            Two things to look for. The placeholder should look lighter than the text around
            it, and it should match the placeholder in the text input and text area. Open a
            menu and the options should be the darkest text in the component, darker than the
            placeholder sitting above them.
          </GoabText>

          <GoabText size="body-s">
            Use the theme toggle in the nav to check both light and dark mode. The fix carries
            into dark mode on its own, because these tokens resolve through greyscale values
            that the dark theme already overrides.
          </GoabText>

          <GoabDivider />

          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            Empty fields, all four together
          </GoabText>
          <GoabText size="body-m" mb="m">
            Every placeholder here should look the same weight. Before the fix the two
            dropdowns were noticeably darker than the text input and text area.
          </GoabText>

          <div style={narrow}>
            <GoabBlock direction="column" gap="m">
              <GoabFormItem label="Dropdown">
                <GoabDropdown
                  name="emptyCity"
                  value={emptyCity}
                  onChange={(detail) => setEmptyCity(detail.value ?? "")}
                >
                  <GoabDropdownItem value="edmonton" label="Edmonton" />
                  <GoabDropdownItem value="calgary" label="Calgary" />
                  <GoabDropdownItem value="red-deer" label="Red Deer" />
                  <GoabDropdownItem value="lethbridge" label="Lethbridge" />
                </GoabDropdown>
              </GoabFormItem>

              <GoabFormItem label="Dropdown multiselect">
                <GoabDropdownMultiselect
                  name="cities"
                  placeholder="—Select—"
                  value={cities}
                  onChange={(detail) => setCities(detail.value)}
                >
                  <GoabDropdownItem value="edmonton" label="Edmonton" />
                  <GoabDropdownItem value="calgary" label="Calgary" />
                  <GoabDropdownItem value="red-deer" label="Red Deer" />
                  <GoabDropdownItem value="lethbridge" label="Lethbridge" />
                </GoabDropdownMultiselect>
              </GoabFormItem>

              <GoabFormItem label="Text input">
                <GoabInput
                  name="note"
                  placeholder="—Select—"
                  value={note}
                  onChange={(detail) => setNote(detail.value)}
                />
              </GoabFormItem>

              <GoabFormItem label="Text area">
                <GoabTextarea
                  name="comments"
                  placeholder="—Select—"
                  value={comments}
                  onChange={(detail) => setComments(detail.value)}
                />
              </GoabFormItem>
            </GoabBlock>
          </div>

          <GoabDivider />

          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            An empty field beside a filled one
          </GoabText>
          <GoabText size="body-m" mb="m">
            This is the point of the change. Scanning a long form, an empty field should be
            obviously empty. Before the fix both of these rendered in the same near black.
          </GoabText>

          <div style={narrow}>
            <GoabBlock direction="column" gap="m">
              <GoabFormItem label="Nothing chosen yet">
                <GoabDropdown
                  name="emptyCompare"
                  value=""
                  onChange={() => undefined}
                >
                  <GoabDropdownItem value="edmonton" label="Edmonton" />
                  <GoabDropdownItem value="calgary" label="Calgary" />
                </GoabDropdown>
              </GoabFormItem>

              <GoabFormItem label="Something chosen">
                <GoabDropdown
                  name="filledCity"
                  value={filledCity}
                  onChange={(detail) => setFilledCity(detail.value ?? "")}
                >
                  <GoabDropdownItem value="edmonton" label="Edmonton" />
                  <GoabDropdownItem value="calgary" label="Calgary" />
                </GoabDropdown>
              </GoabFormItem>
            </GoabBlock>
          </div>

          <GoabDivider />

          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            Open the menu
          </GoabText>
          <GoabText size="body-m" mb="m">
            Open this one and compare the options against the placeholder still visible in the
            field. The options should be the darker of the two. Hover and selected states are
            unchanged and still carry their own background colour, so they should read exactly
            as they did before.
          </GoabText>

          <div style={narrow}>
            <GoabFormItem label="City">
              <GoabDropdown
                name="openCity"
                value={openCity}
                onChange={(detail) => setOpenCity(detail.value ?? "")}
              >
                <GoabDropdownItem value="edmonton" label="Edmonton" />
                <GoabDropdownItem value="calgary" label="Calgary" />
                <GoabDropdownItem value="red-deer" label="Red Deer" />
                <GoabDropdownItem value="lethbridge" label="Lethbridge" />
                <GoabDropdownItem value="medicine-hat" label="Medicine Hat" />
                <GoabDropdownItem value="grande-prairie" label="Grande Prairie" />
              </GoabDropdown>
            </GoabFormItem>
          </div>

          <GoabDivider />

          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            Multiselect options are deliberately unchanged
          </GoabText>
          <GoabText size="body-m" mb="m">
            Only the placeholder changed on this one. Its options are checkbox elements, so
            their text comes from the checkbox label colour, which is already near black.
            Matching the dropdown exactly would mean repainting every checkbox in the system
            for a very small difference, so the two are not identical on purpose. Open it and
            the option text should look the same as it always has.
          </GoabText>

          <div style={narrow}>
            <GoabFormItem label="Cities">
              <GoabDropdownMultiselect
                name="citiesOpen"
                placeholder="—Select—"
                value={cities}
                onChange={(detail) => setCities(detail.value)}
              >
                <GoabDropdownItem value="edmonton" label="Edmonton" />
                <GoabDropdownItem value="calgary" label="Calgary" />
                <GoabDropdownItem value="red-deer" label="Red Deer" />
                <GoabDropdownItem value="lethbridge" label="Lethbridge" />
              </GoabDropdownMultiselect>
            </GoabFormItem>
          </div>

          <GoabDivider />

          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            States that should not have moved
          </GoabText>
          <GoabText size="body-m" mb="m">
            Disabled and error text use their own tokens and were not touched. These are here
            to confirm nothing drifted.
          </GoabText>

          <div style={narrow}>
            <GoabBlock direction="column" gap="m" mb="2xl">
              <GoabFormItem label="Disabled">
                <GoabDropdown name="disabledCity" value="" disabled onChange={() => undefined}>
                  <GoabDropdownItem value="edmonton" label="Edmonton" />
                </GoabDropdown>
              </GoabFormItem>

              <GoabFormItem label="Error">
                <GoabDropdown name="errorCity" value="" error onChange={() => undefined}>
                  <GoabDropdownItem value="edmonton" label="Edmonton" />
                </GoabDropdown>
              </GoabFormItem>

              <GoabFormItem label="Multiselect, disabled">
                <GoabDropdownMultiselect
                  name="disabledCities"
                  placeholder="—Select—"
                  value={[]}
                  disabled
                  onChange={() => undefined}
                >
                  <GoabDropdownItem value="edmonton" label="Edmonton" />
                </GoabDropdownMultiselect>
              </GoabFormItem>
            </GoabBlock>
          </div>
        </GoabBlock>
      </GoabOneColumnLayout>
    </GoabPageBlock>
  );
}

export default Bug4198Route;
