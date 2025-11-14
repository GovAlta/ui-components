import {
  GoabFormItem,
  GoabCheckboxList,
  GoabCheckbox,
  GoabText,
  GoabInput,
} from "@abgov/react-components";
import {
  GoabCheckboxOnChangeDetail,
  GoabCheckboxListOnChangeDetail,
} from "@abgov/ui-components-common";
import { useState } from "react";

export function Feat2267Route() {
  const [basicSelection, setBasicSelection] = useState<string[]>([]);
  const [checkboxListError, setCheckboxListError] = useState<string>("");
  const [errorSelection, setErrorSelection] = useState<string[]>([]);
  const [checkboxListHasError, setCheckboxListHasError] = useState<boolean>(false);

  function checkboxOnChange(event: GoabCheckboxOnChangeDetail) {
    console.log(event.value);
  }

  function checkboxListBasicOnChange(details: GoabCheckboxListOnChangeDetail) {
    console.log(details);
    setBasicSelection(details.value);
  }

  function checkboxListErrorOnChange(details: GoabCheckboxListOnChangeDetail) {
    console.log(details);
    setErrorSelection(details.value);
    if (details.value.includes("error4")) {
      setCheckboxListHasError(true);
      setCheckboxListError("This is an error");
    } else {
      setCheckboxListHasError(false);
      setCheckboxListError("");
    }
  }

  return (
    <main>
      <div
        style={{
          borderBottom: "2px solid #000",
          paddingBottom: "20px",
          marginBottom: "30px",
        }}
      >
        <GoabText tag="h1">Checkbox Testing</GoabText>
        <GoabFormItem label="Basic" mb="l">
          <GoabCheckbox
            name="item"
            text="Item"
            value="value1"
            onChange={checkboxOnChange}
          ></GoabCheckbox>
        </GoabFormItem>
        <GoabFormItem label="Basic Disabled" mb="l">
          <GoabCheckbox
            name="item"
            text="Item"
            value=""
            disabled={true}
            onChange={checkboxOnChange}
          ></GoabCheckbox>
        </GoabFormItem>
        <GoabFormItem label="Basic w/ Max Width" mb="l">
          <GoabCheckbox
            name="item"
            text="Label that should easily extend past the max width of 200px"
            value=""
            maxWidth="200px"
            onChange={checkboxOnChange}
          ></GoabCheckbox>
        </GoabFormItem>
        <GoabFormItem
          label="How would you like to be contacted?"
          helpText="Choose all that apply"
          mb="l"
        >
          <GoabCheckbox checked={false} name="optionOne" text="Email" />
          <GoabCheckbox checked={false} name="optionTwo" text="Phone" />
          <GoabCheckbox checked={false} name="optionThree" text="Text message" />
        </GoabFormItem>
        <GoabFormItem label="How would you like to be contacted?" mb="l">
          <GoabCheckbox
            checked={false}
            name="optionOne"
            text="Email"
            reveal={
              <GoabFormItem label="Email address">
                <GoabInput
                  name="email"
                  onChange={(e) => {
                    /** do nothing */
                  }}
                  value=""
                />
              </GoabFormItem>
            }
          />
          <GoabCheckbox
            checked={false}
            name="optionTwo"
            text="Phone"
            reveal={
              <GoabFormItem label="Phone number">
                <GoabInput
                  name="phoneNumber"
                  onChange={(e) => {
                    /** do nothing */
                  }}
                  value=""
                />
              </GoabFormItem>
            }
          />
          <GoabCheckbox
            checked={false}
            name="optionThree"
            text="Text message"
            reveal={
              <GoabFormItem label="Mobile phone number">
                <GoabInput
                  name="mobilePhoneNumber"
                  onChange={(e) => {
                    /** do nothing */
                  }}
                  value=""
                />
              </GoabFormItem>
            }
          />
        </GoabFormItem>
      </div>
      <div style={{ borderTop: "2px solid #000", paddingTop: "20px" }}>
        <GoabFormItem
          label="Checkbox List w/ 5 items and helper text"
          helpText="This is some help text"
          mb="2xl"
        >
          <GoabCheckboxList
            name="basic"
            value={basicSelection}
            onChange={(e) => checkboxListBasicOnChange(e)}
          >
            <GoabCheckbox name="basic1" value="basic1" text="Basic 1" />
            <GoabCheckbox name="basic2" value="basic2" text="Basic 2" />
            <GoabCheckbox name="basic3" value="basic3" text="Basic 3" />
            <GoabCheckbox name="basic4" value="basic4" text="Basic 4" />
            <GoabCheckbox name="basic5" value="basic5" text="Basic 5" />
          </GoabCheckboxList>
          <p>Basic Selection: {basicSelection}</p>
        </GoabFormItem>
        <GoabFormItem label="Diasbled Checkbox List" mb="2xl">
          <GoabCheckboxList
            name="basicDisabled"
            value={basicSelection}
            onChange={(e) => checkboxListBasicOnChange(e)}
            disabled={true}
          >
            <GoabCheckbox name="basic1" value="basic1" text="Basic 1" />
            <GoabCheckbox name="basic2" value="basic2" text="Basic 2" />
            <GoabCheckbox name="basic3" value="basic3" text="Basic 3" />
            <GoabCheckbox name="basic4" value="basic4" text="Basic 4" />
            <GoabCheckbox name="basic5" value="basic5" text="Basic 5" />
          </GoabCheckboxList>
        </GoabFormItem>
        <GoabFormItem label="Error Checkbox List" error={checkboxListError} mb="2xl">
          <GoabCheckboxList
            name="basicError"
            value={errorSelection}
            onChange={(e) => checkboxListErrorOnChange(e)}
            error={checkboxListHasError}
          >
            <GoabCheckbox name="error1" value="error1" text="Error 1" />
            <GoabCheckbox name="error2" value="error2" text="Error 2" />
            <GoabCheckbox name="error3" value="error3" text="Error 3" />
            <GoabCheckbox name="error4" value="error4" text="Error 4" />
            <GoabCheckbox name="error5" value="error5" text="Error 5" />
          </GoabCheckboxList>
          <p>Error Selection: {errorSelection}</p>
        </GoabFormItem>
        <GoabFormItem label="MaxWidth Checkbox List" mb="2xl">
          <GoabCheckboxList
            name="basicWidth"
            value={basicSelection}
            onChange={(e) => checkboxListBasicOnChange(e)}
            maxWidth="200px"
          >
            <GoabCheckbox
              name="basic1"
              value="basic1"
              text="Some long text that should easily exceed 200px"
            />
            <GoabCheckbox
              name="basic2"
              value="basic2"
              text="Some long text that should easily exceed 200px"
            />
            <GoabCheckbox
              name="basic3"
              value="basic3"
              text="Some long text that should easily exceed 200px"
            />
            <GoabCheckbox
              name="basic4"
              value="basic4"
              text="Some long text that should easily exceed 200px"
            />
            <GoabCheckbox
              name="basic5"
              value="basic5"
              text="Some long text that should easily exceed 200px"
            />
          </GoabCheckboxList>
          <p>Basic Selection: {basicSelection}</p>
        </GoabFormItem>
      </div>
    </main>
  );
}
