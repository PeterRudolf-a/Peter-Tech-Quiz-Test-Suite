import React from 'react';
import Quiz from '../../client/src/components/Quiz'; // import the component we are testing

// Test for the Quiz component
describe('<Quiz />', () => {
  it('renders without crashing', () => {
    // mount the component
    cy.mount(<Quiz />);
    
    // Check if the component renders and contains a heading
    cy.get('h1').should('contain.text', 'Welcome to the Tech Quiz'); // replace with the actual header text in your component
    
    // Check if quiz question appears
    cy.get('.quiz-question').should('exist'); // Adjust the class or element to match your component structure
    
    // Check if options/buttons are visible
    cy.get('.quiz-option').should('have.length.greaterThan', 0); // Ensure there are some options
  });

  it('displays the correct number of questions', () => {
    cy.mount(<Quiz />);
    // Assuming your Quiz component has a certain number of questions
    cy.get('.quiz-question').should('have.length', 20); // Replace with the actual number of questions in your quiz
  });

  it('handles button click to submit answer', () => {
    cy.mount(<Quiz />);
    
    // Simulate a click on the first option and submit
    cy.get('.quiz-option').first().click(); // Adjust based on your component structure
    cy.get('.submit-button').click(); // Replace with the actual class or element used for submission
    
    // Check if the result is displayed
    cy.get('.quiz-result').should('be.visible'); // Adjust as needed for your component
  });
});
