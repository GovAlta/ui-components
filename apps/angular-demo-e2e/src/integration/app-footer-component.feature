Feature: AppFooter
  Scenario: app-footer-component
    Given cs I am a user of GOA application
    When cs I navigate to App Footer section
    Then cs it should validate the css properties of app footer with title
    Then cs it should validate the css properties of meta app footer with title

  Scenario: app-footer-navigator-component
    Given cs I am a user of GOA application
    When cs I navigate to App Footer section
    Then cs it should validate the css properties of navigator app footer with title
    Then cs it should validate the css properties of navigator app footer multi section with title
    Then cs it should validate the css properties of navigator app footer multi section with multicolumn section
    Then cs it should validate the css properties of navigator app footer multi section with links to meta information
    Then cs it should validate the css properties of navigator app footer multi section and links to meta info