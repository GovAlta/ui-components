Feature: Radio
  Scenario: Radio-component
    Given cs I am a user of GOA application
    When cs Navigating to Radio basic component
    Then cs I should be able to validate radio basic button css property when unchecked
    Then cs I should be able to validate radio basic button css property when checked
    Then cs I should be able to validate radio error button css property when unchecked
    Then cs I should be able to validate radio error button css property when checked