Feature: TextArea
  Scenario: Text-Area-component
    Given cs I am a user of GOA application
    When cs Navigating to Text Area component
    Then cs I should be able to validate css properties of a basic TextArea
    Then cs I should be able to validate css properties of a inFocus TextArea
    Then cs I should be able to validate css properties of a Disabled TextArea
    Then cs I should be able to validate css properties of a ErrorSate TextArea