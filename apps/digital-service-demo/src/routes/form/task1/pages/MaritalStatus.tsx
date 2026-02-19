import { GoabxFormItem, GoabxDropdown, GoabxDropdownItem } from "@abgov/react-components/experimental";
import { GoabDetails } from "@abgov/react-components";

/**
 * Page 2: Marital Status
 *
 * Dropdown selection with Details component for help text.
 * Heading comes from outline.props automatically.
 */
export function MaritalStatus() {
  return (
    <div className="form-fields">
      <GoabxFormItem label="">
        <GoabxDropdown name="maritalStatus" data-pf-item="">
          <GoabxDropdownItem value="single" label="Single" />
          <GoabxDropdownItem value="married" label="Married" />
          <GoabxDropdownItem value="common-law" label="Common-law" />
          <GoabxDropdownItem value="separated" label="Separated" />
          <GoabxDropdownItem value="divorced" label="Divorced" />
          <GoabxDropdownItem value="widowed" label="Widowed" />
        </GoabxDropdown>
      </GoabxFormItem>

      <GoabDetails heading="How do I know my marital status?" mb="none">
        <p>
          Your marital status is your legal relationship status. Choose the option
          that best describes your current situation.
        </p>
        <ul>
          <li><strong>Single:</strong> Never been legally married</li>
          <li><strong>Married:</strong> Currently legally married</li>
          <li><strong>Common-law:</strong> Living with a partner for at least 12 months</li>
          <li><strong>Separated:</strong> Legally married but living apart from your spouse</li>
          <li><strong>Divorced:</strong> Marriage has been legally dissolved</li>
          <li><strong>Widowed:</strong> Spouse has passed away</li>
        </ul>
      </GoabDetails>
    </div>
  );
}
