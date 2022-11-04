import { GoAFormItem, GoAFlexRow, GoAInput } from "@abgov/react-components";
import * as React from "react";

export default function FormItem() {
  return (
    <>
      <h1>Form Item</h1>
      <h2>Basic</h2>
      <GoAFormItem label="First name">
        <GoAInput
          name="firstName"
          value=""
          onChange={() => void 0}
          type="text"
        ></GoAInput>
      </GoAFormItem>

      <br />
      <h2>Optional</h2>
      <GoAFormItem label="First name" requirement="optional">
        <GoAInput
          name="firstName2"
          value=""
          onChange={() => void 0}
          type="text"
        ></GoAInput>
      </GoAFormItem>

      <br />
      <h2>Help text</h2>
      <GoAFormItem label="First name" helpText="Help text">
        <GoAInput
          name="firstName3"
          value=""
          onChange={() => void 0}
          type="text"
        ></GoAInput>
      </GoAFormItem>

      <br />
      <h2>Required</h2>
      <GoAFormItem
        label="First name"
        error="First name is required"
        helpText="Help text"
        requirement="required"
      >
        <GoAInput
          name="firstName4"
          value=""
          onChange={() => void 0}
          type="text"
          error
        ></GoAInput>
      </GoAFormItem>

      <br />
      <h2>Form row</h2>
      <GoAFlexRow gap="small">
        <GoAFormItem
          label="First name"
          error="First name is required"
          helpText="Help text"
        >
          <GoAInput
            name="firstName5"
            value=""
            onChange={() => void 0}
            type="text"
            error
            width="100%"
          ></GoAInput>
        </GoAFormItem>
        <GoAFormItem
          label="Last name"
          error="Last name is required"
          helpText="Help text"
        >
          <GoAInput
            name="lasstName"
            value=""
            onChange={() => void 0}
            type="text"
            error
            width="100%"
          ></GoAInput>
        </GoAFormItem>
      </GoAFlexRow>
    </>
  );
}
