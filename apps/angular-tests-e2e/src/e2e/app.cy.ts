import { getGreeting } from "../support/app.po";

describe("angular-tests-e2e", () => {
  beforeEach(() => cy.visit("/"));

  it("should expand accordions", () => {
    cy.get("goab-side-menu-group[heading=Components]").click();
    cy.get("a[href='/accordion']").click();
    cy.get("goab-accordion:first-of-type").click();
    cy.contains("Lorem ipsum dolor sit amet");
  });
});
