import React, { useState } from "react";
import {
  GoabBlock,
  GoabCheckbox,
  GoabCheckboxList,
  GoabDivider,
  GoabOneColumnLayout,
  GoabPageBlock,
  GoabRadioGroup,
  GoabRadioItem,
  GoabText,
} from "@abgov/react-components";
import { Link } from "react-router-dom";

const narrow: React.CSSProperties = { maxWidth: "20rem" };

export function Bug4140Route() {
  const [payment, setPayment] = useState("cheque");
  const [compactPayment, setCompactPayment] = useState("cheque");
  const [described, setDescribed] = useState("deposit");
  const [compactDescribed, setCompactDescribed] = useState("deposit");
  const [mixed, setMixed] = useState("cheque");
  const [wrapping, setWrapping] = useState("deposit");
  const [wrappingDescribed, setWrappingDescribed] = useState("deposit");
  const [compactWrapping, setCompactWrapping] = useState("deposit");

  return (
    <GoabPageBlock width="full">
      <GoabOneColumnLayout>
        <GoabBlock direction="column" gap="l">
          <goa-link mt={"xl"} leadingicon={"arrow-back"}>
            <Link to="/">Back</Link>
          </goa-link>

          <GoabText tag="h1" size="heading-l" mb={"m"}>
            Radio label vertical alignment
          </GoabText>

          <GoabText size="body-m">
            The radio label used to sit 3px too high, so it did not line up with the circle
            beside it. It was most noticeable at the compact size. Check that the label text
            looks vertically centred against the circle in every group below, and that it
            matches the checkbox list at the bottom.
          </GoabText>

          <GoabDivider />

          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            Default size
          </GoabText>
          <GoabRadioGroup
            name="payment"
            value={payment}
            onChange={(e) => setPayment(e.value)}
          >
            <GoabRadioItem value="deposit" label="Direct deposit" />
            <GoabRadioItem value="cheque" label="Cheque" />
            <GoabRadioItem value="card" label="Prepaid card" />
          </GoabRadioGroup>

          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            Compact size
          </GoabText>
          <GoabRadioGroup
            name="compactPayment"
            size="compact"
            value={compactPayment}
            onChange={(e) => setCompactPayment(e.value)}
          >
            <GoabRadioItem value="deposit" label="Direct deposit" />
            <GoabRadioItem value="cheque" label="Cheque" />
            <GoabRadioItem value="card" label="Prepaid card" />
          </GoabRadioGroup>

          <GoabDivider />

          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            With descriptions
          </GoabText>
          <GoabRadioGroup
            name="described"
            value={described}
            onChange={(e) => setDescribed(e.value)}
          >
            <GoabRadioItem
              value="deposit"
              label="Direct deposit"
              description="Funds arrive in 2 to 3 business days"
            />
            <GoabRadioItem
              value="cheque"
              label="Cheque"
              description="Mailed to your address on file"
            />
          </GoabRadioGroup>

          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            With descriptions, compact
          </GoabText>
          <GoabRadioGroup
            name="compactDescribed"
            size="compact"
            value={compactDescribed}
            onChange={(e) => setCompactDescribed(e.value)}
          >
            <GoabRadioItem
              value="deposit"
              label="Direct deposit"
              description="Funds arrive in 2 to 3 business days"
            />
            <GoabRadioItem
              value="cheque"
              label="Cheque"
              description="Mailed to your address on file"
            />
          </GoabRadioGroup>

          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            Some items with descriptions, some without
          </GoabText>
          <GoabRadioGroup name="mixed" value={mixed} onChange={(e) => setMixed(e.value)}>
            <GoabRadioItem
              value="deposit"
              label="Direct deposit"
              description="Funds arrive in 2 to 3 business days"
            />
            <GoabRadioItem value="cheque" label="Cheque" />
            <GoabRadioItem
              value="card"
              label="Prepaid card"
              description="A card is mailed to your address on file"
            />
          </GoabRadioGroup>

          <GoabDivider />

          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            Labels that wrap
          </GoabText>
          <GoabText size="body-s" mb="m">
            The circle stays at the top when the label wraps. Items with wrapping labels are
            3px taller than they were, which is the height their content actually needs.
          </GoabText>
          <div style={narrow}>
            <GoabRadioGroup
              name="wrapping"
              value={wrapping}
              onChange={(e) => setWrapping(e.value)}
            >
              <GoabRadioItem
                value="deposit"
                label="Direct deposit into the account you have on file"
              />
              <GoabRadioItem
                value="cheque"
                label="A cheque mailed to your current mailing address"
              />
              <GoabRadioItem value="card" label="Prepaid card" />
            </GoabRadioGroup>
          </div>

          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            Labels that wrap, with descriptions
          </GoabText>
          <div style={narrow}>
            <GoabRadioGroup
              name="wrappingDescribed"
              value={wrappingDescribed}
              onChange={(e) => setWrappingDescribed(e.value)}
            >
              <GoabRadioItem
                value="deposit"
                label="Direct deposit into the account on file"
                description="Funds arrive in two to three business days after approval"
              />
              <GoabRadioItem
                value="cheque"
                label="A cheque mailed to your address"
                description="Allow ten business days for delivery by mail"
              />
            </GoabRadioGroup>
          </div>

          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            Labels that wrap, compact, with descriptions
          </GoabText>
          <div style={narrow}>
            <GoabRadioGroup
              name="compactWrapping"
              size="compact"
              value={compactWrapping}
              onChange={(e) => setCompactWrapping(e.value)}
            >
              <GoabRadioItem
                value="deposit"
                label="Direct deposit into the account on file"
                description="Funds arrive in two to three business days"
              />
              <GoabRadioItem
                value="cheque"
                label="A cheque mailed to your address"
                description="Allow ten business days for delivery"
              />
            </GoabRadioGroup>
          </div>

          <GoabDivider />

          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            Checkbox list, for comparison
          </GoabText>
          <GoabText size="body-s" mb="m">
            The radio labels should sit the same way against their circle as these labels do
            against their box.
          </GoabText>

          <GoabCheckboxList name="cbDefault">
            <GoabCheckbox name="cbDeposit" text="Direct deposit" />
            <GoabCheckbox name="cbCheque" text="Cheque" />
            <GoabCheckbox name="cbCard" text="Prepaid card" />
          </GoabCheckboxList>

          <GoabText tag="h3" size="heading-s" mt="l" mb="m">
            Compact
          </GoabText>
          <GoabCheckboxList name="cbCompact" size="compact">
            <GoabCheckbox name="cbcDeposit" size="compact" text="Direct deposit" />
            <GoabCheckbox name="cbcCheque" size="compact" text="Cheque" />
            <GoabCheckbox name="cbcCard" size="compact" text="Prepaid card" />
          </GoabCheckboxList>

          <GoabText tag="h3" size="heading-s" mt="l" mb="m">
            With descriptions
          </GoabText>
          <GoabCheckboxList name="cbDescribed">
            <GoabCheckbox
              name="cbdDeposit"
              text="Direct deposit"
              description="Funds arrive in 2 to 3 business days"
            />
            <GoabCheckbox
              name="cbdCheque"
              text="Cheque"
              description="Mailed to your address on file"
            />
          </GoabCheckboxList>

          <GoabText tag="h3" size="heading-s" mt="l" mb="m">
            Labels that wrap
          </GoabText>
          <div style={narrow}>
            <GoabCheckboxList name="cbWrapping">
              <GoabCheckbox
                name="cbwDeposit"
                text="Direct deposit into the account you have on file"
              />
              <GoabCheckbox
                name="cbwCheque"
                text="A cheque mailed to your current mailing address"
              />
            </GoabCheckboxList>
          </div>

          <GoabDivider />

          <GoabText tag="h2" size="heading-m" mt="xl" mb="m">
            Disabled and error
          </GoabText>
          <GoabRadioGroup name="disabledGroup" value="one" disabled>
            <GoabRadioItem value="one" label="Disabled" description="With a description" />
            <GoabRadioItem value="two" label="Also disabled" />
          </GoabRadioGroup>

          <GoabRadioGroup name="errorGroup" value="one" error mt="l" mb="2xl">
            <GoabRadioItem value="one" label="Error state" description="With a description" />
            <GoabRadioItem value="two" label="Second item" />
          </GoabRadioGroup>
        </GoabBlock>
      </GoabOneColumnLayout>
    </GoabPageBlock>
  );
}
