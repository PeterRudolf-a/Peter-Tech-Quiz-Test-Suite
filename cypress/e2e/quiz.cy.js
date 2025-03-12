// e2e testing for quiz page
describe("Quiz", () => {
  // Test if the quiz page loads correctly
  it("should load and show start quiz button", () => {
    // Visit the quiz page (change this URL to the correct one)
    cy.visit("/quiz");

    // Check if the "Start Quiz" button is visible
    cy.get("button").contains("Start Quiz").should("be.visible");
  });

  // Test if the quiz can be started
  it("should start the quiz and load questions", () => {
    cy.visit("/quiz");

    // Click the "Start Quiz" button to begin
    cy.get("button").contains("Start Quiz").click();

    // Ensure the question is loaded
    cy.get(".card").find("h2").should("exist"); // Check if the question exists

    // Ensure the first question's options are displayed
    cy.get(".btn.btn-primary").should("have.length.greaterThan", 0);
  });

  // Test answering the first question
  it("should allow the user to answer a question", () => {
    cy.visit("/quiz");

    // Start the quiz
    cy.get("button").contains("Start Quiz").click();

    // Select the first option
    cy.get(".btn.btn-primary").first().click();

    // Click the "Next" button to go to the next question (adjust the button selector)
    cy.get(".btn.btn-primary").contains("Next").click();

    // Check if the next question is loaded
    cy.get(".card").find("h2").should("exist");
  });

  // Test quiz completion and score display
  it("should show the final score when the quiz is completed", () => {
    cy.visit("/quiz");

    // Start the quiz
    cy.get("button").contains("Start Quiz").click();

    // Answer all the questions and click the "Next" button after each answer
    cy.get(".btn.btn-primary").each(($el, index) => {
      cy.wrap($el).click(); // Click an option for each question
      cy.get(".btn.btn-primary").contains("Next").click(); // Move to next question
    });

    // After all questions, the quiz should be completed and show the score
    cy.get(".alert.alert-success").should("contain.text", "Your score:");
  });

  // Test the "Take New Quiz" button after quiz completion
  it("should allow the user to restart the quiz", () => {
    cy.visit("/quiz");

    // Start the quiz
    cy.get("button").contains("Start Quiz").click();

    // Answer all the questions and click the "Next" button after each answer
    cy.get(".btn.btn-primary").each(($el, index) => {
      cy.wrap($el).click(); // Select answer for each question
      cy.get(".btn.btn-primary").contains("Next").click(); // Go to next question
    });

    // Submit and complete the quiz
    cy.get(".btn.btn-primary").contains("Submit").click(); // Or if using another button to end quiz

    // Check if the results are displayed
    cy.get(".quiz-result").should("be.visible"); // Adjust this selector based on your result display

    // Click "Take New Quiz" button
    cy.get("button").contains("Take New Quiz").click();

    // Ensure the quiz is restarted (should show the first question)
    cy.get(".quiz-question").should("exist");
  });
});
