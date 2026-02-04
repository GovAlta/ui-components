import { GoabxCheckbox, GoabxFormItem } from "@abgov/react-components/experimental";
import { GoabCheckboxList } from "@abgov/react-components";

export function IncludeALinkInTheHelperTextOfAnOption() {
  return (
    <GoabxFormItem label="How would you like to be contacted?">
      <GoabCheckboxList name="contact-options">
        <GoabxCheckbox
          name="email"
          text="Email"
          value="email"
          description={
            <span>
              Help text with a <a href="#">link</a>.
            </span>
          }
        />
        <GoabxCheckbox name="phone" text="Phone" value="phone" />
        <GoabxCheckbox name="text" text="Text message" value="text" />
      </GoabCheckboxList>
    </GoabxFormItem>
  );
}
