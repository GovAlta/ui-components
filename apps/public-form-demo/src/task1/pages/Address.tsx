import { GoabxFormItem, GoabxInput, GoabxDropdown, GoabxDropdownItem } from "@abgov/react-components/experimental";

/**
 * Page 3: Address
 *
 * Multi-field form with street, city, province dropdown, postal code.
 * Province and postal code in horizontal layout.
 * Heading comes from outline.props automatically.
 */
export function Address() {
  return (
    <div className="form-fields">
      <GoabxFormItem label="Street address">
        <GoabxInput name="streetAddress" data-pf-item="" />
      </GoabxFormItem>

      <GoabxFormItem label="City or town">
        <GoabxInput name="city" data-pf-item="" />
      </GoabxFormItem>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--goa-space-l)", alignItems: "start" }}>
        <GoabxFormItem label="Province or territory">
          <GoabxDropdown name="province" data-pf-item="">
            <GoabxDropdownItem value="AB" label="Alberta" />
            <GoabxDropdownItem value="BC" label="British Columbia" />
            <GoabxDropdownItem value="MB" label="Manitoba" />
            <GoabxDropdownItem value="NB" label="New Brunswick" />
            <GoabxDropdownItem value="NL" label="Newfoundland and Labrador" />
            <GoabxDropdownItem value="NS" label="Nova Scotia" />
            <GoabxDropdownItem value="NT" label="Northwest Territories" />
            <GoabxDropdownItem value="NU" label="Nunavut" />
            <GoabxDropdownItem value="ON" label="Ontario" />
            <GoabxDropdownItem value="PE" label="Prince Edward Island" />
            <GoabxDropdownItem value="QC" label="Quebec" />
            <GoabxDropdownItem value="SK" label="Saskatchewan" />
            <GoabxDropdownItem value="YT" label="Yukon" />
          </GoabxDropdown>
        </GoabxFormItem>

        <GoabxFormItem label="Postal code" helpText="For example, T2P 3G8">
          <GoabxInput name="postalCode" data-pf-item="" width="10ch" />
        </GoabxFormItem>
      </div>
    </div>
  );
}
