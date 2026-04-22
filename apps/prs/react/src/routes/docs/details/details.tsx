import { useState } from "react";
import {
  GoabDetails, GoabText, GoabFormItem, GoabInput, GoabButton,
  GoabLink, GoabTextArea, GoabButtonGroup, GoabRadioGroup, GoabRadioItem, GoabBlock,
} from "@abgov/react-components";
import { GoabTextAreaOnChangeDetail, GoabRadioGroupOnChangeDetail } from "@abgov/ui-components-common";

export function DocsDetailsRoute() {
  const [bankNumber, setBankNumber] = useState("");
  const [transitNumber, setTransitNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [textValue, setTextValue] = useState("");

  const handleChange = (event: GoabTextAreaOnChangeDetail) => {
    setTextValue(event.value);
  };

  const handleContinue = () => {
    console.log("Submitted:", textValue);
  };

  const handleRadioChange = (event: GoabRadioGroupOnChangeDetail) => {
    console.log("value is", event.value);
  };

  return (
    <div>
      <h2>Details</h2>

      <h3>Basic details</h3>
      <GoabDetails heading="More information">
        <p>This content is revealed when the details component is expanded.</p>
      </GoabDetails>

      <h3>Open by default</h3>
      <GoabDetails heading="Visible by default" open>
        <p>This content is shown when the page loads.</p>
      </GoabDetails>

      <h2>Examples</h2>

      <h3>Ask a user for direct deposit information</h3>
      <GoabText tag="h1" size="heading-l" mt="none" mb="m">Direct deposit information</GoabText>
      <GoabText tag="p" mb="xl">
        Find this information on your bank's website or on your personal cheques.
        Contact your bank if you can't find this information.
      </GoabText>
      <form>
        <GoabFormItem
          label="Bank or Institution number"
          helpText="3-4 digits in length"
        >
          <GoabInput
            maxLength={4}
            name="bankNumber"
            onChange={(e) => setBankNumber(e.value)}
            value={bankNumber}
            ariaLabel="bankNumber"
            width="88px"
          />
        </GoabFormItem>
        <GoabFormItem
          label="Branch or Transit number"
          helpText="5 digits in length"
          mt="l"
        >
          <GoabInput
            maxLength={5}
            name="transitNumber"
            onChange={(e) => setTransitNumber(e.value)}
            value={transitNumber}
            ariaLabel="transitNumber"
            width="143px"
          />
        </GoabFormItem>
        <GoabFormItem
          label="Account number"
          helpText="3-12 digits in length"
          mt="l"
        >
          <GoabInput
            maxLength={12}
            name="accountNumber"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.value)}
            ariaLabel="accountNumber"
          />
        </GoabFormItem>
      </form>
      <GoabDetails heading="Where can I find this information on a personal cheque?" mt="l">
        <GoabText tag="p" mb="m">
          Below is an example of where you can find the required bank information
          on a personal cheque.
        </GoabText>
        <img src="https://design.alberta.ca/images/details-demo.jpg" alt="Cheque example showing bank information locations" />
      </GoabDetails>

      <GoabButton type="submit" mt="2xl">
        Save and continue
      </GoabButton>

      <h3>Give context before asking a long answer question</h3>
      <GoabLink leadingIcon="arrow-back" size="small" mb="none">
        Back
      </GoabLink>

      <GoabText tag="h2" mt="xl" mb="m">Submit a question about your benefits</GoabText>
      <GoabText mt="none" mb="xl">
        If you need clarification about your benefit eligibility, payment schedule, or application status, submit your
        question here.
      </GoabText>

      <form>
        <GoabFormItem
          label="Provide details about your situation"
          helpText="Include specific details to help us answer your question quickly.">
          <GoabTextArea
            name="program"
            onChange={handleChange}
            value={textValue}
            maxCount={400}
            countBy="character"
          />
        </GoabFormItem>
      </form>

      <GoabDetails mt="m" heading="What kind of information is useful?">
        <p>
          Include your benefit program name, mention any recent correspondence you received and/or provide any
          relevant case or reference numbers.
        </p>
      </GoabDetails>

      <GoabButtonGroup alignment="start" mt="2xl">
        <GoabButton type="primary" onClick={handleContinue}>
          Continue
        </GoabButton>
      </GoabButtonGroup>

      <h3>Show a list to help answer a question</h3>
      <form>
        <GoabFormItem
          label="Do you have additional education expenses?"
          helpText="You can request funding for these now or at any time during your program."
          mb="m"
        >
          <GoabRadioGroup name="additional" onChange={handleRadioChange}>
            <GoabRadioItem label="Yes" value="yes" name="additional" />
            <GoabRadioItem label="No" value="no" name="additional" />
          </GoabRadioGroup>
        </GoabFormItem>

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

      <h3>Show more information to help answer a question</h3>
      <GoabLink leadingIcon="arrow-back" size="small" mb="none">
        Back
      </GoabLink>

      <GoabFormItem
        mt="xl"
        label="Do you pay for child care?"
        labelSize="large"
        helpText="Examples of child care are daycares, day homes and baby-sisters."
      >
        <GoabRadioGroup
          name="child-care"
          ariaLabel="Do you pay for child care?"
          onChange={() => { /* no-op */ }}
        >
          <GoabRadioItem value="yes" label="Yes" />
          <GoabRadioItem value="no" label="No" />
        </GoabRadioGroup>
      </GoabFormItem>

      <GoabDetails heading="Why are we asking this question?" mt="l">
        <p>We ask this question to determine if you are eligible for child care benefits.</p>
      </GoabDetails>

      <GoabButton type="submit" mt="2xl">
        Save and continue
      </GoabButton>
    </div>
  );
}

export default DocsDetailsRoute;
