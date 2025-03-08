describe("Quiz", () => {
  it("should be able to complete the quiz", () => {
    cy.visit("/quiz");

    cy.get('input[name="name"]').type("John Doe");
    cy.get('input[name="email"]').type("john@email.com");
    cy.get('input[name="phone"]').type("1234567890");

    cy.get('button[type="submit"]').click();

    cy.get('input[name="answer1"]').type("answer1");
    cy.get('input[name="answer2"]').type("answer2");
    cy.get('input[name="answer3"]').type("answer3");

    cy.get('button[type="submit"]').click();

    cy.get("h1").should("have.text", "Thank you for completing the quiz!");
  });
});
