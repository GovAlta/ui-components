import { GoabCheckbox, GoabCheckboxList, GoabFormItem } from "@abgov/react-components";

export function IncludeALinkInTheHelperTextOfAnOption() {
  return (
    <GoabFormItem label="How would you like to be contacted?">
      <GoabCheckboxList name="contact-options">
        <GoabCheckbox
          name="email"
          text="Email"
          value="email"
          description={
            <span>
              Help text with a <a href="#">link</a>.
            </span>
          }
        />
        <GoabCheckbox name="phone" text="Phone" value="phone" />
        <GoabCheckbox name="text" text="Text message" value="text" />
      </GoabCheckboxList>
    </GoabFormItem>
  );
}
