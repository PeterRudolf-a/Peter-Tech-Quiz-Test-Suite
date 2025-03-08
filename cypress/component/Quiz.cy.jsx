import React from "react";
import { Quiz } from "../../src/components/Quiz";

describe("Quiz", () => {
    it("renders a quiz", () => {
        const questions = [
        {
            question: "What is the capital of France?",
            answers: ["Paris", "Berlin", "Madrid", "Rome"],
            correctAnswer: "Paris",
        },
        ];
        cy.mount(<Quiz questions={questions} />);
        cy.contains("What is the capital of France?");
        cy.contains("Paris");
        cy.contains("Berlin");
        cy.contains("Madrid");
        cy.contains("Rome");
    });
    });