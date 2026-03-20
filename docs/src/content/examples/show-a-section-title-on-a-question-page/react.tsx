import {
  GoabxButton,
  GoabxFormItem,
  GoabxLink,
  GoabxRadioGroup,
  GoabxRadioItem,
} from "@abgov/react-components/experimental";
import { GoabText } from "@abgov/react-components";

export function ShowASectionTitleOnAQuestionPage() {
  return (
    <>
      <GoabxLink leadingIcon="arrow-back" size="small" mb="none">
        Back
      </GoabxLink>

      <GoabText as="h3" size="body-m" mt="xl" mb="m" color="secondary">
        Personal information
      </GoabText>

      <GoabxFormItem label="Do you currently live in Canada?" labelSize="large">
        <GoabxRadioGroup
          name="canada"
          ariaLabel="Do you currently live in Canada?"
          onChange={() => {}}
        >
          <GoabxRadioItem value="yes" label="Yes" />
          <GoabxRadioItem value="no" label="No" />
        </GoabxRadioGroup>
      </GoabxFormItem>

      <GoabxButton type="submit" mt="2xl">
        Save and continue
      </GoabxButton>
    </>
  );
}
