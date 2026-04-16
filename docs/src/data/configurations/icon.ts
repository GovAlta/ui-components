/**
 * Icon Component Configurations
 *
 * Icons provide visual cues and enhance comprehension.
 * Organized by the core icon set categories.
 */

import type { ComponentConfigurations } from "./types";

export const iconConfigurations: ComponentConfigurations = {
  componentSlug: "icon",
  componentName: "Icon",
  defaultConfigurationId: "alert-messaging",

  configurations: [
    {
      id: "alert-messaging",
      name: "Alert and messaging",
      description: "Icons for alerts, status, and messaging",
      code: {
        react: `<GoabIcon type="information-circle" />
<GoabIcon type="help-circle" />
<GoabIcon type="close-circle" />
<GoabIcon type="checkmark-circle" />
<GoabIcon type="warning" />
<GoabIcon type="alert-circle" />`,
        angular: `<goab-icon type="information-circle"></goab-icon>
<goab-icon type="help-circle"></goab-icon>
<goab-icon type="close-circle"></goab-icon>
<goab-icon type="checkmark-circle"></goab-icon>
<goab-icon type="warning"></goab-icon>
<goab-icon type="alert-circle"></goab-icon>`,
        webComponents: `<goa-icon type="information-circle"></goa-icon>
<goa-icon type="help-circle"></goa-icon>
<goa-icon type="close-circle"></goa-icon>
<goa-icon type="checkmark-circle"></goa-icon>
<goa-icon type="warning"></goa-icon>
<goa-icon type="alert-circle"></goa-icon>`,
      },
    },
    {
      id: "basic-icons",
      name: "Basic",
      description: "Core basic icons",
      code: {
        react: `<GoabIcon type="close" />
<GoabIcon type="checkmark" />
<GoabIcon type="add" />
<GoabIcon type="remove" />
<GoabIcon type="add-circle" />
<GoabIcon type="remove-circle" />`,
        angular: `<goab-icon type="close"></goab-icon>
<goab-icon type="checkmark"></goab-icon>
<goab-icon type="add"></goab-icon>
<goab-icon type="remove"></goab-icon>
<goab-icon type="add-circle"></goab-icon>
<goab-icon type="remove-circle"></goab-icon>`,
        webComponents: `<goa-icon type="close"></goa-icon>
<goa-icon type="checkmark"></goa-icon>
<goa-icon type="add"></goa-icon>
<goa-icon type="remove"></goa-icon>
<goa-icon type="add-circle"></goa-icon>
<goa-icon type="remove-circle"></goa-icon>`,
      },
    },
    {
      id: "direction",
      name: "Direction",
      description: "Arrows, chevrons, and navigation icons",
      code: {
        react: `<GoabIcon type="chevron-down" />
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
<GoabIcon type="chevron-expand" />`,
        angular: `<goab-icon type="chevron-down"></goab-icon>
<goab-icon type="chevron-up"></goab-icon>
<goab-icon type="arrow-down"></goab-icon>
<goab-icon type="arrow-up"></goab-icon>
<goab-icon type="chevron-back"></goab-icon>
<goab-icon type="chevron-forward"></goab-icon>
<goab-icon type="arrow-back"></goab-icon>
<goab-icon type="arrow-forward"></goab-icon>
<goab-icon type="caret-down"></goab-icon>
<goab-icon type="caret-up"></goab-icon>
<goab-icon type="caret-back"></goab-icon>
<goab-icon type="caret-forward"></goab-icon>
<goab-icon type="chevron-expand"></goab-icon>`,
        webComponents: `<goa-icon type="chevron-down"></goa-icon>
<goa-icon type="chevron-up"></goa-icon>
<goa-icon type="arrow-down"></goa-icon>
<goa-icon type="arrow-up"></goa-icon>
<goa-icon type="chevron-back"></goa-icon>
<goa-icon type="chevron-forward"></goa-icon>
<goa-icon type="arrow-back"></goa-icon>
<goa-icon type="arrow-forward"></goa-icon>
<goa-icon type="caret-down"></goa-icon>
<goa-icon type="caret-up"></goa-icon>
<goa-icon type="caret-back"></goa-icon>
<goa-icon type="caret-forward"></goa-icon>
<goa-icon type="chevron-expand"></goa-icon>`,
      },
    },
    {
      id: "interactions",
      name: "Interactions",
      description: "Icons for common user interactions",
      code: {
        react: `<GoabIcon type="menu" />
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
<GoabIcon type="ellipsis-horizontal" />`,
        angular: `<goab-icon type="menu"></goab-icon>
<goab-icon type="refresh"></goab-icon>
<goab-icon type="search"></goab-icon>
<goab-icon type="pencil"></goab-icon>
<goab-icon type="flag"></goab-icon>
<goab-icon type="notifications"></goab-icon>
<goab-icon type="notifications-off"></goab-icon>
<goab-icon type="open"></goab-icon>
<goab-icon type="bookmark"></goab-icon>
<goab-icon type="eye"></goab-icon>
<goab-icon type="eye-off"></goab-icon>
<goab-icon type="calendar"></goab-icon>
<goab-icon type="copy"></goab-icon>
<goab-icon type="cloud-upload"></goab-icon>
<goab-icon type="download"></goab-icon>
<goab-icon type="cloud-download"></goab-icon>
<goab-icon type="trash"></goab-icon>
<goab-icon type="filter-lines"></goab-icon>
<goab-icon type="ellipsis-vertical"></goab-icon>
<goab-icon type="ellipsis-horizontal"></goab-icon>`,
        webComponents: `<goa-icon type="menu"></goa-icon>
<goa-icon type="refresh"></goa-icon>
<goa-icon type="search"></goa-icon>
<goa-icon type="pencil"></goa-icon>
<goa-icon type="flag"></goa-icon>
<goa-icon type="notifications"></goa-icon>
<goa-icon type="notifications-off"></goa-icon>
<goa-icon type="open"></goa-icon>
<goa-icon type="bookmark"></goa-icon>
<goa-icon type="eye"></goa-icon>
<goa-icon type="eye-off"></goa-icon>
<goa-icon type="calendar"></goa-icon>
<goa-icon type="copy"></goa-icon>
<goa-icon type="cloud-upload"></goa-icon>
<goa-icon type="download"></goa-icon>
<goa-icon type="cloud-download"></goa-icon>
<goa-icon type="trash"></goa-icon>
<goa-icon type="filter-lines"></goa-icon>
<goa-icon type="ellipsis-vertical"></goa-icon>
<goa-icon type="ellipsis-horizontal"></goa-icon>`,
      },
    },
    {
      id: "accounts",
      name: "Accounts",
      description: "Icons for user accounts and communication",
      code: {
        react: `<GoabIcon type="person-circle" />
<GoabIcon type="settings" />
<GoabIcon type="mail" />
<GoabIcon type="call" />`,
        angular: `<goab-icon type="person-circle"></goab-icon>
<goab-icon type="settings"></goab-icon>
<goab-icon type="mail"></goab-icon>
<goab-icon type="call"></goab-icon>`,
        webComponents: `<goa-icon type="person-circle"></goa-icon>
<goa-icon type="settings"></goa-icon>
<goa-icon type="mail"></goa-icon>
<goa-icon type="call"></goa-icon>`,
      },
    },
    {
      id: "sizes",
      name: "Sizes",
      description: "Named and numeric icon sizes",
      code: {
        react: `<GoabIcon type="information-circle" size="2xsmall" />
<GoabIcon type="information-circle" size="xsmall" />
<GoabIcon type="information-circle" size="small" />
<GoabIcon type="information-circle" size="medium" />
<GoabIcon type="information-circle" size="large" />
<GoabIcon type="information-circle" size="xlarge" />`,
        angular: `<goab-icon type="information-circle" size="2xsmall"></goab-icon>
<goab-icon type="information-circle" size="xsmall"></goab-icon>
<goab-icon type="information-circle" size="small"></goab-icon>
<goab-icon type="information-circle" size="medium"></goab-icon>
<goab-icon type="information-circle" size="large"></goab-icon>
<goab-icon type="information-circle" size="xlarge"></goab-icon>`,
        webComponents: `<goa-icon type="information-circle" size="2xsmall"></goa-icon>
<goa-icon type="information-circle" size="xsmall"></goa-icon>
<goa-icon type="information-circle" size="small"></goa-icon>
<goa-icon type="information-circle" size="medium"></goa-icon>
<goa-icon type="information-circle" size="large"></goa-icon>
<goa-icon type="information-circle" size="xlarge"></goa-icon>`,
      },
    },
    {
      id: "themes",
      name: "Themes",
      description: "Outline and filled icon styles",
      code: {
        react: `<GoabIcon type="checkmark-circle" theme="outline" />
<GoabIcon type="checkmark-circle" theme="filled" />
<GoabIcon type="notifications" theme="outline" />
<GoabIcon type="notifications" theme="filled" />
<GoabIcon type="bookmark" theme="outline" />
<GoabIcon type="bookmark" theme="filled" />
<GoabIcon type="flag" theme="outline" />
<GoabIcon type="flag" theme="filled" />
<GoabIcon type="eye" theme="outline" />
<GoabIcon type="eye" theme="filled" />`,
        angular: `<goab-icon type="checkmark-circle" theme="outline"></goab-icon>
<goab-icon type="checkmark-circle" theme="filled"></goab-icon>
<goab-icon type="notifications" theme="outline"></goab-icon>
<goab-icon type="notifications" theme="filled"></goab-icon>
<goab-icon type="bookmark" theme="outline"></goab-icon>
<goab-icon type="bookmark" theme="filled"></goab-icon>
<goab-icon type="flag" theme="outline"></goab-icon>
<goab-icon type="flag" theme="filled"></goab-icon>
<goab-icon type="eye" theme="outline"></goab-icon>
<goab-icon type="eye" theme="filled"></goab-icon>`,
        webComponents: `<goa-icon type="checkmark-circle" theme="outline"></goa-icon>
<goa-icon type="checkmark-circle" theme="filled"></goa-icon>
<goa-icon type="notifications" theme="outline"></goa-icon>
<goa-icon type="notifications" theme="filled"></goa-icon>
<goa-icon type="bookmark" theme="outline"></goa-icon>
<goa-icon type="bookmark" theme="filled"></goa-icon>
<goa-icon type="flag" theme="outline"></goa-icon>
<goa-icon type="flag" theme="filled"></goa-icon>
<goa-icon type="eye" theme="outline"></goa-icon>
<goa-icon type="eye" theme="filled"></goa-icon>`,
      },
    },
    {
      id: "with-color",
      name: "With color",
      description: "Icons with custom colors",
      code: {
        react: `<GoabIcon type="checkmark-circle" theme="filled" fillColor="var(--goa-color-success-default)" />
<GoabIcon type="warning" theme="filled" fillColor="var(--goa-color-warning-default)" />
<GoabIcon type="close-circle" theme="filled" fillColor="var(--goa-color-emergency-default)" />`,
        angular: `<goab-icon type="checkmark-circle" theme="filled" fillColor="var(--goa-color-success-default)"></goab-icon>
<goab-icon type="warning" theme="filled" fillColor="var(--goa-color-warning-default)"></goab-icon>
<goab-icon type="close-circle" theme="filled" fillColor="var(--goa-color-emergency-default)"></goab-icon>`,
        webComponents: `<goa-icon type="checkmark-circle" theme="filled" fillcolor="var(--goa-color-success-default)"></goa-icon>
<goa-icon type="warning" theme="filled" fillcolor="var(--goa-color-warning-default)"></goa-icon>
<goa-icon type="close-circle" theme="filled" fillcolor="var(--goa-color-emergency-default)"></goa-icon>`,
      },
    },
  ],
};
