import React from "react";
import Quiz from "../../client/src/components/Quiz"; // Import the component we are testing
import mockQuestions from "../fixtures/questions.json"; // Import the mock questions data

// define tests for the Quiz component
describe("<Quiz />", () => {
  // before each test, intercept the request to the questions API and return the mock questions data
  beforeEach(() => {
    cy.intercept("GET", "/api/questions", (req) => {
      console.log("Intercepted request: ", req);
      req.reply({
        statusCode: 200,
        body: mockQuestions,
      });
    }).as("getQuestions");
  });

  // test if the Quiz component renders without crashing
  it("renders without crashing", () => {
    cy.mount(<Quiz />);

    // Check if the component renders and has a button to start the quiz
    cy.contains("button", "Start Quiz").should("be.visible");
  });

  // test if the Quiz component loads questions when the start quiz button is clicked
  it("displays a score when the quiz is completed", () => {
    cy.mount(<Quiz />);

    // Start the quiz
    cy.contains("button", "Start Quiz").click();

    // Answer all questions
    for (let i = 0; i < 10; i++) {
      cy.get(".btn.btn-primary").first().click();
    }

    // Check if the final score is displayed
    cy.contains(".alert", "Your score:").should("be.visible");
  });

  // test if the Quiz component allows the user to answer a question
  it("allows the user to restart the quiz", () => {
    cy.mount(<Quiz />);

    // Start the quiz
    cy.contains("button", "Start Quiz").click();

    // Answer all questions
    for (let i = 0; i < 10; i++) {
      cy.get(".btn.btn-primary").first().click();
    }

    // Restart the quiz
    cy.contains("button", "Take New Quiz").click();

    // Check if the first question is displayed again
    cy.get("h2").should("exist");
  });
});
