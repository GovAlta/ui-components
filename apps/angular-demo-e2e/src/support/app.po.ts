export const getGreeting = () => cy.get('h1');

export const injectAxe = () => {
  cy.readFile('../../node_modules/axe-core/axe.min.js').then((source) => {
    cy.window({ log: false }).then((window) => {
      window.eval(source);
    });
  });
};