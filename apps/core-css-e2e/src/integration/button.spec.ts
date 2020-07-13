import 'cypress-iframe';

describe('Storybook-html', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4400');
    })

    // Tests for button-variants
    describe('button-variants', () => {
        beforeEach(() => {
            // button-variants story
            cy.get('#explorerdesign-system-basic-elements-buttons-html--variants').click().then(() => {
                return cy.frameLoaded('#storybook-preview-iframe').iframe().as('button-iframe');
            });
        });

        describe('Button-primary', () => {
            beforeEach(() => {
                cy.get('@button-iframe').find('[data-cy=button-primary]').should('exist').as('button-primary');
            });

            it('should be clickable', () => {
                cy.get('@button-primary').click();
            });

            it('should contain class goa-button', () => {
                cy.get('@button-primary').should('have.class', 'goa-button');
            });
        });

        // Tests for button-Secondary  
        describe('Button-secondary', () => {
            beforeEach(() => {
                cy.get('@button-iframe').find('[data-cy=button-secondary]').should('exist').as('button-secondary');
            });

            it('should be clickable', () => {
                cy.get('@button-secondary').click();
            });

            it('should contain class goa-button', () => {
                cy.get('@button-secondary').should('have.class', 'goa-button');
            });

            it('should contain class goa--secondary', () => {
                cy.get('@button-secondary').should('have.class', 'goa--secondary');
            });
        });

        // Tests for button-tertiary  
        describe('Button-tertiary', () => {
            beforeEach(() => {
                cy.get('@button-iframe').find('[data-cy=button-tertiary]').should('exist').as('button-tertiary');
            });

            it('should be clickable', () => {
                cy.get('@button-tertiary').click();
            });

            it('should contain class goa-button', () => {
                cy.get('@button-tertiary').should('have.class', 'goa-button');
            });

            it('should contain class goa--tertiary', () => {
                cy.get('@button-tertiary').should('have.class', 'goa--tertiary');
            });
        });
    });

    // Tests for button-links  
    describe('button-variants', () => {
        beforeEach(() => {
            // button-variants story
            cy.get('#explorerdesign-system-basic-elements-buttons-html--links-as-buttons').click().then(() => {
                return cy.frameLoaded('#storybook-preview-iframe').iframe().as('button-iframe');
            });
        });

        describe('Button-links', () => {
            beforeEach(() => {
                cy.get('@button-iframe').find('[data-cy=button-link]').should('exist').as('button-link');
            });

            it('should be clickable', () => {
                cy.get('@button-link').click();
            });

            it('should contain class goa-link-button', () => {
                cy.get('@button-link').should('have.class', 'goa-link-button');
            });
        });
    });
});
