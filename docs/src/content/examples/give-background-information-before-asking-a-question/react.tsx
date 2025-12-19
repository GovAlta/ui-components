import {
  GoabButton,
  GoabFormItem,
  GoabLink,
  GoabRadioGroup,
  GoabRadioItem,
  GoabText
} from "@abgov/react-components";
import { GoabRadioGroupOnChangeDetail } from "@abgov/ui-components-common";
import { useState } from "react";

export function GiveBackgroundInformationBeforeAskingAQuestion() {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (event: GoabRadioGroupOnChangeDetail) => {
    setSelectedValue(event.value as string);
  };

  const handleSubmit = () => {
    console.log("Selected:", selectedValue);
  };

  return (
    <>
      <GoabLink leadingIcon="arrow-back" size="small" mb="none">
        Back
      </GoabLink>

      <GoabText as="h2" mt="xl" mb="m">Current school status</GoabText>
      <GoabText mt="none" mb="s">
        School can encompass foundational programs that help individuals gain basic skills for
        further learning and living, such as literacy and numeracy courses. It also includes
        skills and employment training programs, designed to equip you with specific skills for
        the job market.
      </GoabText>
      <GoabText mt="none" mb="s">
        Post-secondary education, such as Bachelor's, Master's, or Doctoral degrees, and
        continuing education courses for professional or personal development, are also
        categorized under 'school'.
      </GoabText>
      <GoabText mt="none" mb="xl">
        Contact your provider if you're concerned about your school status.
      </GoabText>

      <GoabFormItem label="Are you currently in school?">
        <GoabRadioGroup
          name="school"
          ariaLabel="are you currently in school?"
          onChange={handleChange}>
          <GoabRadioItem value="yes" label="Yes" />
          <GoabRadioItem value="no" label="No" />
        </GoabRadioGroup>
      </GoabFormItem>

      <GoabButton type="submit" mt="2xl" onClick={handleSubmit}>
        Save and continue
      </GoabButton>
    </>
  );
}
