Feature: AppHeader
  Scenario: app-header-component
    Given cs I am a user of GOA application
    When cs I navigate to App Header section
    Then cs it should validate the css properties of basic app header
    Then cs it should validate the css properties of app header with title
    Then cs it should validate the css properties of custom app header