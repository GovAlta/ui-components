Feature: Form component
  Scenario: form-component
    Given cs I am a user of GOA application
    When cs Navigating to form item component
    Then cs I should be able to Required FirstName label css property
    Then cs I should be able to Required MiddleName with optional textfield css properties
    Then cs I should be able to Required FirstName with HelpText textfield css properties
    Then cs I should be able to Required FirstName error field css property
