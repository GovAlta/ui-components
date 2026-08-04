import {
  GoabBlock,
  GoabText,
  GoabDivider,
  GoabDetails,
  GoabLink,
  GoabMenuButton,
  GoabMenuAction,
  GoabDatePicker,
} from "@abgov/react-components";
import {
  GoabDatePickerOnChangeDetail,
  GoabMenuButtonOnActionDetail,
} from "@abgov/ui-components-common";

export function Bug3662Route() {
  const onAction = (detail: GoabMenuButtonOnActionDetail) => {
    console.log("Menu Action:", detail);
  };

  const onChange = (detail: GoabDatePickerOnChangeDetail) => {
    console.log("Date Picker Change:", detail);
  };

  return (
    <div>
      <GoabText tag="h1" mt="m">
        Bug #3662: Menu button: closing the menu swallows the next click event
      </GoabText>

      <GoabBlock direction="column" gap="m">
        <GoabLink trailingIcon="open">
          <a
            href="https://github.com/GovAlta/ui-components/issues/3662"
            target="_blank"
            rel="noreferrer noopener"
          >
            View on GitHub
          </a>
        </GoabLink>

        <GoabDetails heading="Issue Description">
          <GoabText tag="p">
            When closing a menu button dropdown, the next click event on the page gets
            swallowed. For example, if you click outside the menu to close it, clicking a
            button immediately after doesn't register.
          </GoabText>
          <GoabText tag="p">
            Refer to the GitHub issue for a video demonstration.
          </GoabText>
        </GoabDetails>
      </GoabBlock>

      <GoabDivider mt="l" mb="l" />

      <GoabText tag="h2">Test Case #1</GoabText>
      <GoabText tag="p">Two Menu Buttons</GoabText>

      <GoabBlock direction="row">
        <GoabMenuButton testId="friends" text="Friends" onAction={onAction}>
          <GoabMenuAction text="Joey" action="#joey" />
          <GoabMenuAction text="Chandler" action="#chandler" />
          <GoabMenuAction text="Ross" action="#ross" />
          <GoabMenuAction text="Rachel" action="#rachel" />
          <GoabMenuAction text="Monica" action="#monica" />
          <GoabMenuAction text="Phoebe" action="#phoebe" />
        </GoabMenuButton>
        <GoabMenuButton testId="enemies" text="Enemies" onAction={onAction}>
          <GoabMenuAction text="Janice" action="#janice" />
          <GoabMenuAction text="Richard" action="#richard" />
          <GoabMenuAction text="Gunther" action="#gunther" />
          <GoabMenuAction text="Khan" action="#khan" />
        </GoabMenuButton>
      </GoabBlock>

      <GoabText tag="h2">Test Case #2</GoabText>
      <GoabText tag="p">One Menu Button beside Date Picker</GoabText>
      <GoabText tag="p">
        The DatePicker also fires the "goa:closePopover" event, and so it could cause the
        same issue.
      </GoabText>
      <GoabBlock direction="row">
        <GoabMenuButton testId="coffees" text="Coffees" onAction={onAction}>
          <GoabMenuAction text="Starbucks" action="#starbucks" />
          <GoabMenuAction text="Second Cup" action="#secondcup" />
          <GoabMenuAction text="Tim Hortons" action="#timhortons" />
          <GoabMenuAction text="The Columbian" action="#columbian" />
        </GoabMenuButton>
        <GoabDatePicker testId="datePicker1" name="Picked Date" onChange={onChange} />
      </GoabBlock>
    </div>
  );
}

export default Bug3662Route;
