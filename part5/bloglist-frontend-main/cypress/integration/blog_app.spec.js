// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Andrew d',
      username: 'are',
      password: 'andrewismyname',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Username');
    cy.contains('Password');
    cy.contains('login');
  });
  describe('Login', () => {
    it('succeeds with correct login info', () => {
      cy.get('#username').type('are');
      cy.get('#password').type('andrewismyname');
      cy.get('#login').click();
      cy.contains('Logged in as are');
    });

    it('fails with wrong login info', () => {
      cy.get('#username').type('are');
      cy.get('#password').type('imapirate');
      cy.get('#login').click();
      cy.contains('Incorrect username or password');
      cy.get('#failure').should('have.css', 'color', 'rgb(255, 0, 0)');
      cy.get('#failure').should('have.css', 'border-style', 'solid');
    });
  });
});
