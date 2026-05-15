import { GoabIcon } from "@abgov/react-components";

export function DocsIconRoute() {
  return (
    <div>
      <h2>Icon</h2>

      <h3>Alert and messaging</h3>
      <GoabIcon type="information-circle" />
      <GoabIcon type="help-circle" />
      <GoabIcon type="close-circle" />
      <GoabIcon type="checkmark-circle" />
      <GoabIcon type="warning" />
      <GoabIcon type="alert-circle" />

      <h3>Basic</h3>
      <GoabIcon type="close" />
      <GoabIcon type="checkmark" />
      <GoabIcon type="add" />
      <GoabIcon type="remove" />
      <GoabIcon type="add-circle" />
      <GoabIcon type="remove-circle" />

      <h3>Direction</h3>
      <GoabIcon type="chevron-down" />
      <GoabIcon type="chevron-up" />
      <GoabIcon type="arrow-down" />
      <GoabIcon type="arrow-up" />
      <GoabIcon type="chevron-back" />
      <GoabIcon type="chevron-forward" />
      <GoabIcon type="arrow-back" />
      <GoabIcon type="arrow-forward" />
      <GoabIcon type="caret-down" />
      <GoabIcon type="caret-up" />
      <GoabIcon type="caret-back" />
      <GoabIcon type="caret-forward" />
      <GoabIcon type="chevron-expand" />

      <h3>Interactions</h3>
      <GoabIcon type="menu" />
      <GoabIcon type="refresh" />
      <GoabIcon type="search" />
      <GoabIcon type="pencil" />
      <GoabIcon type="flag" />
      <GoabIcon type="notifications" />
      <GoabIcon type="notifications-off" />
      <GoabIcon type="open" />
      <GoabIcon type="bookmark" />
      <GoabIcon type="eye" />
      <GoabIcon type="eye-off" />
      <GoabIcon type="calendar" />
      <GoabIcon type="copy" />
      <GoabIcon type="cloud-upload" />
      <GoabIcon type="download" />
      <GoabIcon type="cloud-download" />
      <GoabIcon type="trash" />
      <GoabIcon type="filter-lines" />
      <GoabIcon type="ellipsis-vertical" />
      <GoabIcon type="ellipsis-horizontal" />

      <h3>Accounts</h3>
      <GoabIcon type="person-circle" />
      <GoabIcon type="settings" />
      <GoabIcon type="mail" />
      <GoabIcon type="call" />

      <h3>Sizes</h3>
      <GoabIcon type="information-circle" size="2xsmall" />
      <GoabIcon type="information-circle" size="xsmall" />
      <GoabIcon type="information-circle" size="small" />
      <GoabIcon type="information-circle" size="medium" />
      <GoabIcon type="information-circle" size="large" />
      <GoabIcon type="information-circle" size="xlarge" />

      <h3>Themes</h3>
      <GoabIcon type="checkmark-circle" theme="outline" />
      <GoabIcon type="checkmark-circle" theme="filled" />
      <GoabIcon type="notifications" theme="outline" />
      <GoabIcon type="notifications" theme="filled" />
      <GoabIcon type="bookmark" theme="outline" />
      <GoabIcon type="bookmark" theme="filled" />
      <GoabIcon type="flag" theme="outline" />
      <GoabIcon type="flag" theme="filled" />
      <GoabIcon type="eye" theme="outline" />
      <GoabIcon type="eye" theme="filled" />

      <h3>With color</h3>
      <GoabIcon
        type="checkmark-circle"
        theme="filled"
        fillColor="var(--goa-color-success-default)"
      />
      <GoabIcon
        type="warning"
        theme="filled"
        fillColor="var(--goa-color-warning-default)"
      />
      <GoabIcon
        type="close-circle"
        theme="filled"
        fillColor="var(--goa-color-emergency-default)"
      />
    </div>
  );
}
