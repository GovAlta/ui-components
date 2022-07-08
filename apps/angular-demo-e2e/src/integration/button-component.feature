Feature: Button
  Scenario: Button-type-component
    Given cs I am a user of GOA application
    When cs Navigating to Button Type primary component
    Then cs I should be able to validate primary button css property
    Then cs I should be able to validate secondary button css property
    Then cs I should be able to validate Tertiary button css property
  Scenario: Button-size-component
    Given cs I am a user of GOA application
    When cs Navigating to Button Type primary component
    Then cs I should be able to validate sizes Compact primary button css property
    Then cs I should be able to validate sizes Compact Secondary button css property
    Then cs I should be able to validate sizes Compact tertiary button css property
