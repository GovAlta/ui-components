import { GoAFormItem, GoAFlexRow, GoAInput } from '@abgov/react-components';
import * as React from 'react';

export default function FormItem() {
  return (
    <>
      <h3>Basic</h3>
      <GoAFormItem label="First name">
        <GoAInput name="firstName" value="" onChange={() => void 0} type="text"></GoAInput>
      </GoAFormItem>

      <br />
      <h3>Optional</h3>
      <GoAFormItem label="First name" optional>
        <GoAInput name="firstName2" value="" onChange={() => void 0} type="text"></GoAInput>
      </GoAFormItem>

      <br />
      <h3>Help text</h3>
      <GoAFormItem label="First name" helpText="Help text">
        <GoAInput name="firstName3" value="" onChange={() => void 0} type="text"></GoAInput>
      </GoAFormItem>

      <br />
      <h3>Required</h3>
      <GoAFormItem
        label="First name"
        error="First name is required"
        helpText="Help text"
      >
        <GoAInput name="firstName4" value="" onChange={() => void 0} type="text" error></GoAInput>
      </GoAFormItem>

      <br />
      <h3>Form row</h3>
      <GoAFlexRow gap="small">
        <GoAFormItem
          label="First name"
          error="First name is required"
          helpText="Help text"
        >
          <GoAInput
            name="firstName5" value="" onChange={() => void 0}
            type="text"
            error
            width="100%"
            showCounter={true}
            maxCharCount={20}
          ></GoAInput>
        </GoAFormItem>
        <GoAFormItem
          label="Last name"
          error="Last name is required"
          helpText="Help text"
        >
          <GoAInput name="lasstName" value="" onChange={() => void 0} type="text" error width="100%"></GoAInput>
        </GoAFormItem>
      </GoAFlexRow>
    </>
  );
}
