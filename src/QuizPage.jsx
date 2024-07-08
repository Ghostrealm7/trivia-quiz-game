import React from "react";

function QuizPage({
  quizData,
  insertSelectedAnswer,
  checkAnswers,
  gameOver,
  newGame,
  correctAnswerCount,
}) {
  let quizElements = quizData.map((quiz) => {
    return (
      <div key={quiz.id} className="question-container">
        <h3>{quiz.question}</h3>

        <div className="answers-container">
          {quiz.incorrect_answers.map((answer, index) => {
            const answerStyle =
              gameOver && answer === quiz.correct_answer
                ? { backgroundColor: "#4caf50", borderColor: "#4caf50" }
                : {};
            return (
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
                  disabled={gameOver}
                />
                <label
                  className="label"
                  style={answerStyle}
                  htmlFor={`option-${quiz.id}-${index}`}>
                  {answer}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  const postGameText = <h2>You got {correctAnswerCount}/5 answers right!</h2>;

  return (
    <div className="quiz-container">
      <h1>Trivia Quiz Game</h1>
      {quizElements}
      {gameOver && postGameText}
      <button onClick={gameOver ? newGame : checkAnswers}>
        {gameOver ? " Play Again " : " Check Answers "}
      </button>
    </div>
  );
}

export default QuizPage;
