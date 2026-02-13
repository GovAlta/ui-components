import { useState } from "react";
import { GoabxFormItem, GoabxCheckbox, GoabxInput } from "@abgov/react-components/experimental";

/**
 * Page 4: Contact Preference
 *
 * Each checkbox has a unique name because the public form system
 * overwrites fields with the same name.
 *
 * IMPORTANT: Conditional inputs must always be in the DOM (just hidden)
 * because the form registers fields at initialization. If they're
 * conditionally rendered, their _change events get rejected with
 * "Invalid formField key" error.
 *
 * Known issues documented in brief:
 * - CheckboxList doesn't work with public form pattern
 * - Multiple checkboxes with same name don't work (only last one registers)
 * - Reveal slot inputs don't register with form
 * - Conditionally rendered inputs don't work (must be hidden, not unmounted)
 */
export function ContactPreference() {
  const [showPhone, setShowPhone] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const revealStyle = (visible: boolean) => ({
    borderLeft: "4px solid var(--goa-color-greyscale-200)",
    paddingLeft: "var(--goa-space-l)",
    marginLeft: "var(--goa-space-s)",
    marginTop: "var(--goa-space-xs)",
    marginBottom: "var(--goa-space-xs)",
    display: visible ? "block" : "none",
  });

  return (
    <div className="form-fields">
      <GoabxFormItem label="Select all that apply">
        <>
          <GoabxCheckbox
            name="contactByPhone"
            text="Phone"
            data-pf-item=""
            onChange={(e) => setShowPhone(e.checked)}
          />
          <div style={revealStyle(showPhone)}>
            <GoabxFormItem label="Phone number" helpText="Include area code">
              <GoabxInput name="phoneNumber" type="tel" data-pf-item="" />
            </GoabxFormItem>
          </div>

          <GoabxCheckbox
            name="contactByEmail"
            text="Email"
            data-pf-item=""
            onChange={(e) => setShowEmail(e.checked)}
          />
          <div style={revealStyle(showEmail)}>
            <GoabxFormItem label="Email address">
              <GoabxInput name="emailAddress" type="email" data-pf-item="" />
            </GoabxFormItem>
          </div>

          <GoabxCheckbox
            name="contactByMail"
            text="Mail (postal address)"
            data-pf-item=""
          />
        </>
      </GoabxFormItem>
    </div>
  );
}
