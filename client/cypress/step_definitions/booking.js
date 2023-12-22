import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const url = 'http://localhost:5173/bokning/65533511396b28e174d7efed'

Given('I am on the ticket page', () => {
  cy.visit(url);
});

When('I click on the + buttons', () => {
  cy.get('.text-3xl.sm\\:text-4xl').click({ multiple: true });
});

Then('the counter should have increased by one', () => {
  cy.get('[data-cy="adult"]').should('be.visible');
  cy.get('[data-cy="child"]').should('be.visible');
  cy.get('[data-cy="senior"]').should('be.visible');
});

Given('that I am logged in', () => {
  cy.get('.account-circle').click();
  cy.get('[name="email"]').type('apa@gmail.com');
  cy.get('[name="password"]').type('Apaapa123');
  cy.get('[data-cy="login"]').click();
});

When('I have clicked on a place to sit', () => {
  cy.get('[id="row8seat-2"]').click();
});

When('I click on {string}', (text) => {
  cy.get(text).click();
});

When('I have canceled the booking', () => {
  cy.get('.hamburger-menu-icon').click();
  cy.get('[data-cy="mina-sidor"]').click({ force: true });
  cy.contains('Mer info').click();
  cy.get('[data-cy="avboka"]').click();
  cy.get('.bg-red-600').click();
});

When('I have logged out', () => {
  cy.get('.text-red-500').click({ force: true });
});

When('I have seen {string}', (text) => {
  cy.get(text).should('be.visible');
});

Then('I should see {string}', (text) => {
  cy.contains(text).should('be.visible');
});
