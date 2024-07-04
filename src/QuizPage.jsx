import React from "react";

function QuizPage({ quizData, insertSelectedAnswer, checkAnswers }) {
  let quizElements = quizData.map((quiz) => {
    return (
      <div key={quiz.id} className="question-container">
        <h3>{quiz.question}</h3>

        <div className="answers-container">
          {quiz.incorrect_answers.map((answer, index) => (
            <div className="button" key={index}>
              <input
                name={quiz.id}
                type="radio"
                id={`option-${quiz.id}-${index}`}
                value={answer}
                checked={quiz.selected_answer === answer}
                onChange={(event) => {
                  insertSelectedAnswer(event, quiz.id);
                }}
              />
              <label className="label" htmlFor={`option-${quiz.id}-${index}`}>
                {answer}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  });

  return (
    <div className="quiz-container">
      {quizElements}
      <button onClick={() => checkAnswers()}> Check Answer </button>
    </div>
  );
}

export default QuizPage;

// Get a way to track the selected ID, then send the ID on click to a function which will check the chosen answers against the correct answer. Do for 1 object first then for all.
// Need a complete game state.

//need to set ID in object for name property in radio buttons
