import { useState } from "react";
import {
  GoabDatePicker,
  GoabFormItem,
  GoabRadioGroup,
  GoabRadioItem,
} from "@abgov/react-components";
import type {
  GoabDatePickerOnChangeDetail,
  GoabRadioGroupOnChangeDetail,
} from "@abgov/ui-components-common";

export function DocsRadioGroupRoute() {
  const [contact, setContact] = useState<string>("");

  function handleDateChange(_detail: GoabDatePickerOnChangeDetail) {
    // no-op for demo
  }

  return (
    <div>
      <h2>Radio group</h2>

      <h3>Basic example</h3>
      <GoabFormItem label="Contact preference" mb="l">
        <GoabRadioGroup
          name="contact"
          value={contact}
          onChange={(detail: GoabRadioGroupOnChangeDetail) =>
            setContact(detail.value as string)
          }
        >
          <GoabRadioItem value="email" label="Email" />
          <GoabRadioItem value="phone" label="Phone" />
          <GoabRadioItem value="mail" label="Mail" />
        </GoabRadioGroup>
      </GoabFormItem>
      <p>Value: {contact}</p>

      <h3>Horizontal layout</h3>
      <GoabFormItem label="Size" mb="l">
        <GoabRadioGroup name="size" value="" orientation="horizontal">
          <GoabRadioItem value="small" label="Small" />
          <GoabRadioItem value="medium" label="Medium" />
          <GoabRadioItem value="large" label="Large" />
        </GoabRadioGroup>
      </GoabFormItem>

      <h3>With descriptions</h3>
      <GoabFormItem label="Shipping method" mb="l">
        <GoabRadioGroup name="shipping" value="">
          <GoabRadioItem value="standard" label="Standard" description="5-7 business days" />
          <GoabRadioItem value="express" label="Express" description="2-3 business days" />
          <GoabRadioItem value="overnight" label="Overnight" description="Next business day" />
        </GoabRadioGroup>
      </GoabFormItem>

      <h3>With reveal content</h3>
      <GoabFormItem label="Do you have a preferred date?" mb="l">
        <GoabRadioGroup name="hasDate" value="">
          <GoabRadioItem value="no" label="No" />
          <GoabRadioItem
            value="yes"
            label="Yes"
            reveal={
              <GoabFormItem label="Preferred date" mb="l">
                <GoabDatePicker name="preferredDate" onChange={handleDateChange} />
              </GoabFormItem>
            }
          />
        </GoabRadioGroup>
      </GoabFormItem>

      <h3>Preselected</h3>
      <GoabFormItem label="Notification frequency" mb="l">
        <GoabRadioGroup name="frequency" value="daily">
          <GoabRadioItem value="realtime" label="Real-time" />
          <GoabRadioItem value="daily" label="Daily digest" />
          <GoabRadioItem value="weekly" label="Weekly summary" />
        </GoabRadioGroup>
      </GoabFormItem>

      <h3>Sizes</h3>
      <GoabFormItem label="Default size" mb="l">
        <GoabRadioGroup name="sizeDefault" value="">
          <GoabRadioItem value="yes" label="Yes" />
          <GoabRadioItem value="no" label="No" />
        </GoabRadioGroup>
      </GoabFormItem>
      <GoabFormItem label="Compact size" labelSize="compact" mb="l">
        <GoabRadioGroup name="sizeCompact" value="" size="compact">
          <GoabRadioItem value="yes" label="Yes" />
          <GoabRadioItem value="no" label="No" />
        </GoabRadioGroup>
      </GoabFormItem>

      <h3>States</h3>
      <GoabFormItem label="Account type" mb="l">
        <GoabRadioGroup name="accountType" value="basic" disabled>
          <GoabRadioItem value="basic" label="Basic" />
          <GoabRadioItem value="premium" label="Premium" />
        </GoabRadioGroup>
      </GoabFormItem>
      <GoabFormItem
        label="Payment method"
        error="Please select a payment method"
        mb="l"
      >
        <GoabRadioGroup name="payment" value="" error>
          <GoabRadioItem value="credit" label="Credit card" />
          <GoabRadioItem value="debit" label="Debit card" />
          <GoabRadioItem value="bank" label="Bank transfer" />
        </GoabRadioGroup>
      </GoabFormItem>
    </div>
  );
}
