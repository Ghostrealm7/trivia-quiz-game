import React from "react";

function QuizPage({ quizData }) {
  let quizElements = quizData.map((quiz) => {
    return (
      <div className="question-container">
        <p>{quiz.question}</p>
        {quiz.incorrect_answers.map((answer) => (
          <fieldset>
            <input
              name="option"
              type="radio"
              id={`option-${answer}`}
              vale=""
              onChange={() => {}}
            />
            <label htmlFor="option1">{answer}</label>
          </fieldset>
        ))}
      </div>
    );
  });

  return (
    <div className="quiz-container">
      {quizElements}
      <button> Check Answer </button>
    </div>
  );
}

export default QuizPage;
