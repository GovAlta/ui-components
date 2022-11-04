Feature: Modal
  Scenario: Modal-close-component
    Given cs I am a user of GOA application
    When cs Navigating to Modal basic component
    Then cs I should be able to validate modal component Title css properties
    Then cs I should be able to validate modal component content css properties
  Scenario: Modal-Button-Component
    Given cs I am a user of GOA application
    When cs Navigating to Modal basic component
    Then cs I should be able to validate modal component Title css properties
    Then cs I should be able to validate modal component content css properties
    Then cs I should be able to validate modal component Primary button css properties
    Then cs I should be able to validate modal component Secondary button css properties
