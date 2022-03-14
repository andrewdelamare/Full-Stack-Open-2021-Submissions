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
  describe('When logged in', () => {
    beforeEach(() => {
      cy.get('#username').type('are');
      cy.get('#password').type('andrewismyname');
      cy.get('#login').click();
    });

    it('A blog can be created', () => {
      cy.get('#addBlogToggle').click();
      cy.get('#title').type('Being a 17th century pirate');
      cy.get('#author').type('A famous 17th centry pirate');
      cy.get('#url').type('www.thetruthofbeinga17thcentrypirate.blog.pi');
      cy.get('#createBlogButton').click();
      cy.contains('Being a 17th century pirate');
      cy.contains('A famous 17th centry pirate');
      cy.get('#success').should('have.css', 'color', 'rgb(0, 128, 0)');
      cy.get('#success').should('have.css', 'border-style', 'solid');
    });
    it('A blog can be liked', () => {
      cy.get('#addBlogToggle').click();
      cy.get('#title').type('15th centry farmers and how to control them');
      cy.get('#author').type('A noble who disdains the pesantry');
      cy.get('#url').type('www.peasantsstinkkeepthemawayfromme.blog.no');
      cy.get('#createBlogButton').click();
      cy.get('#showDetailsButton').click();
      cy.get('#likeButton').click();
      cy.contains('Likes: 1');
    });
  });
});
