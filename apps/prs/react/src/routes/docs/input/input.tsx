import { useState } from "react";
import {
  GoabBlock,
  GoabFormItem,
  GoabInput,
} from "@abgov/react-components";
import type { GoabInputOnChangeDetail } from "@abgov/ui-components-common";

export function DocsInputRoute() {
  const [fullName, setFullName] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  // Examples - Indian registration number
  const [bandNo, setBandNo] = useState<string>("");
  const [family, setFamily] = useState<string>("");
  const [position, setPosition] = useState<string>("");

  // Examples - Dollar amounts
  const [tuitionAmount, setTuitionAmount] = useState<string>("");
  const [suppliesAmount, setSuppliesAmount] = useState<string>("");
  const [othersAmount, setOthersAmount] = useState<string>("");

  return (
    <div>
      <h2>Input</h2>

      <h3>Basic example</h3>
      <GoabFormItem label="Full name" mb="l">
        <GoabInput
          name="fullName"
          value={fullName}
          onChange={(detail: GoabInputOnChangeDetail) => setFullName(detail.value)}
        />
      </GoabFormItem>
      <p>Value: {fullName}</p>

      <h3>With icons</h3>
      <GoabFormItem label="Search" mb="l">
        <GoabInput name="searchIcon" leadingIcon="search" width="30ch" />
      </GoabFormItem>
      <GoabFormItem label="Website" mb="l">
        <GoabInput name="website" trailingIcon="open" width="30ch" />
      </GoabFormItem>

      <h3>Clearable</h3>
      <GoabFormItem label="Search" mb="l">
        <GoabInput
          name="search"
          value={search}
          trailingIcon="close"
          onTrailingIconClick={() => setSearch("")}
          onChange={(detail: GoabInputOnChangeDetail) => setSearch(detail.value)}
        />
      </GoabFormItem>

      <h3>Known widths</h3>
      <GoabFormItem label="Postal code" mb="l">
        <GoabInput name="postalCode" width="7ch" />
      </GoabFormItem>
      <GoabFormItem label="Year" mb="l">
        <GoabInput name="year" width="4ch" />
      </GoabFormItem>
      <GoabFormItem label="SIN" mb="l">
        <GoabInput name="sin" width="11ch" />
      </GoabFormItem>

      <h3>With leading or trailing content</h3>
      <GoabFormItem label="Price" mb="l">
        <GoabInput name="price" type="number" width="10ch" leadingContent="$" />
      </GoabFormItem>
      <GoabFormItem label="Weight" mb="l">
        <GoabInput name="weight" type="number" width="10ch" trailingContent="kg" />
      </GoabFormItem>

      <h3>Sizes</h3>
      <GoabFormItem label="Default size" mb="l">
        <GoabInput name="sizeDefault" />
      </GoabFormItem>
      <GoabFormItem label="Compact size" labelSize="compact" mb="l">
        <GoabInput name="sizeCompact" size="compact" />
      </GoabFormItem>

      <h3>Right-aligned text</h3>
      <GoabFormItem label="Amount" mb="l">
        <GoabInput
          name="amount"
          type="number"
          textAlign="right"
          width="10ch"
          trailingContent="CAD"
        />
      </GoabFormItem>

      <h3>States</h3>
      <GoabFormItem label="Disabled input" mb="l">
        <GoabInput name="disabled" disabled value="Cannot edit" />
      </GoabFormItem>
      <GoabFormItem label="Read-only input" mb="l">
        <GoabInput name="readonly" readonly value="View only" />
      </GoabFormItem>
      <GoabFormItem label="Input with error" error="This field is required" mb="l">
        <GoabInput name="error" error />
      </GoabFormItem>

      <h3>Input types</h3>
      <GoabFormItem label="Email address" mb="l">
        <GoabInput name="email" type="email" />
      </GoabFormItem>
      <GoabFormItem label="Password" mb="l">
        <GoabInput name="password" type="password" />
      </GoabFormItem>
      <GoabFormItem label="Date of birth" mb="l">
        <GoabInput name="dob" type="date" />
      </GoabFormItem>
      <GoabFormItem label="Age" mb="l">
        <GoabInput name="age" type="number" width="3ch" />
      </GoabFormItem>

      <h2>Examples</h2>

      <h3>Ask a user for an Indian registration number</h3>
      <GoabFormItem label="Indian registration number" labelSize="large">
        <GoabBlock gap="m" direction="row">
          <GoabFormItem label="Band #" helpText="3 digits">
            <GoabInput
              onChange={(e) => setBandNo(e.value)}
              value={bandNo}
              name="bandNo"
              width="88px"
              maxLength={3}
            />
          </GoabFormItem>
          <GoabFormItem label="Family" helpText="Up to 5 digits">
            <GoabInput
              onChange={(e) => setFamily(e.value)}
              value={family}
              name="family"
              width="105px"
              maxLength={5}
            />
          </GoabFormItem>
          <GoabFormItem label="Position" helpText="2 digits">
            <GoabInput
              onChange={(e) => setPosition(e.value)}
              value={position}
              name="position"
              width="71px"
              maxLength={2}
            />
          </GoabFormItem>
        </GoabBlock>
      </GoabFormItem>

      <h3>Ask a user for dollar amounts</h3>
      <GoabFormItem label="Tuition">
        <GoabInput
          onChange={(e) => setTuitionAmount(e.value)}
          value={tuitionAmount}
          name="tuitionAmount"
          leadingContent="$"
        />
      </GoabFormItem>
      <GoabFormItem label="Books/Supplies/Instruments" mt="l">
        <GoabInput
          onChange={(e) => setSuppliesAmount(e.value)}
          value={suppliesAmount}
          name="suppliesAmount"
          leadingContent="$"
        />
      </GoabFormItem>
      <GoabFormItem label="Other costs" mt="l">
        <GoabInput
          onChange={(e) => setOthersAmount(e.value)}
          value={othersAmount}
          name="othersAmount"
          leadingContent="$"
        />
      </GoabFormItem>
    </div>
  );
}
