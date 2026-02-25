import { GoabxFormItem, GoabxRadioGroup, GoabxRadioItem } from "@abgov/react-components/experimental";
import { GoabBlock, GoabDetails } from "@abgov/react-components";
import { GoabRadioGroupOnChangeDetail } from "@abgov/ui-components-common";

export function ShowAListToHelpAnswerAQuestion() {
  const handleChange = (event: GoabRadioGroupOnChangeDetail) => {
    console.log("value is", event.value);
  };

  return (
    <form>
      <GoabxFormItem
        label="Do you have additional education expenses?"
        helpText="You can request funding for these now or at any time during your program."
        mb="m">
        <GoabxRadioGroup name="additional" onChange={handleChange}>
          <GoabxRadioItem label="Yes" value="yes" name="additional" />
          <GoabxRadioItem label="No" value="no" name="additional" />
        </GoabxRadioGroup>
      </GoabxFormItem>

      <GoabDetails heading="What are additional education expenses?">
        <GoabBlock gap="m" mt="m">
          <div>
            <strong>Examples of education expenses</strong>
            <ul className="goa-unordered-list">
              <li>Laptop and computer hardware</li>
              <li>Computer apps and subscriptions</li>
              <li>Home internet</li>
              <li>Testing and exam fees</li>
              <li>Work or school clothing, like work boots</li>
            </ul>
          </div>
          <div>
            <strong>Do not include</strong>
            <ul className="goa-unordered-list">
              <li>Tuition</li>
              <li>Mandatory fees</li>
              <li>Books and supplies</li>
              <li>School association fees</li>
            </ul>
          </div>
        </GoabBlock>
      </GoabDetails>
    </form>
  );
}
