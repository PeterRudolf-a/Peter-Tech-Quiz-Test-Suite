// end-to-end test for the quiz page
describe("Quiz", () => {
  // Load the page and check if the start quiz button is visible
  it("should load and show start quiz button", () => {
    // Load the page
    cy.visit("/quiz");
    // Check if the start quiz button is visible
    cy.get("button").contains("Start Quiz").should("be.visible");
  });

  // Start the quiz and check if the questions are loaded
  it("should start the quiz and load questions", () => {
    // Load the page
    cy.visit("/quiz");
    // Click the start quiz button
    cy.get("button").contains("Start Quiz").click();
    // Check if the first question is loaded
    cy.get(".card").find("h2", { timeout: 10000 }).should("exist");
    // Check if the answer buttons are loaded
    cy.get(".btn.btn-primary").should("have.length.greaterThan", 0);
  });

  // Answer a question and check if the next question is loaded
  it("should allow the user to answer a question", () => {
    // Load the page
    cy.visit("/quiz");
    // Start the quiz
    cy.get("button").contains("Start Quiz").click();
    // Answer the first question
    cy.get(".btn.btn-primary").first().click();
    // Check if the next question is loaded
    cy.get(".card").find("h2").should("exist");
  });

  // Answer all questions and check if the final score is displayed
  it("should show the final score when the quiz is completed", () => {
    cy.visit("/quiz");

    // Start the quiz
    cy.get("button").contains("Start Quiz").click();

    // Answer all questions
    for (let i = 0; i < 10; i++) {
      cy.get(".btn.btn-primary").first().click();
    }

    // Wait for the score display to appear
    cy.get(".alert.alert-success")
      .should("be.visible")
      .and("contain", "Your score:");
  });

  // Complete the quiz and check if the user can restart the quiz
  it("should allow the user to restart the quiz", () => {
    // Load the page and start the quizs
    cy.visit("/");
    cy.get("button").contains("Start Quiz").click();

    // Answer all questions
    for (let i = 0; i < 10; i++) {
      cy.get(".btn.btn-primary").first().click();
    }

    // Check if the score is displayed
    cy.get(".alert.alert-success")
      .should("be.visible")
      .and("contain", "Your score:");

    // Click the "Take New Quiz" button
    cy.get("button").contains("Take New Quiz").should("be.visible").click();

    // Check if the first question is displayed again
    cy.get("h2").should("exist");
  });
});
