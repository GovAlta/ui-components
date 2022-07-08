Feature: CallOut
  Scenario: CallOut-component
    Given cs I am a user of GOA application
    When cs Navigating to CallOut component
    Then cs I should be able to validate callout emergency css property
    Then cs I should be able to validate callout Important css property
    Then cs I should be able to validate callout information css property
    Then cs I should be able to validate callout success css property
    Then cs I should be able to validate callout event css property