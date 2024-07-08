import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import "./styles.css";
import HomePage from "./HomePage";
import QuizPage from "./QuizPage";
import axios from "axios";

//Next steps: put modified quiz array in state. Then send State as prop to homepage, then render quiz array in homepage using map.

function App() {
  const [homePage, setHomePage] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [error, setError] = useState(null);

  function checkAnswers() {
    let count = 0;
    for (let i = 0; i < quizData.length; i++) {
      if (quizData[i].correct_answer === quizData[i].selected_answer) {
        console.log(`Your answer ${quizData[i].selected_answer} is correct`);
        count++;
      } else {
        console.log(
          `Your answer ${quizData[i].selected_answer} is incorrect, the correct answer is ${quizData[i].correct_answer}`,
        );
      }
    }
    setCorrectAnswerCount(count);
    console.log(`You got ${count}/5 answers right!`);
    setGameOver(true);
  }

  async function getNewQuiz() {
    try {
      let response = await axios.get(
        "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple",
      );
      let quizQuestions = await response.data.results;
      // Save correct_answer in the incorrect answer array, then shuffle the incorrect answer array and save in NewArray.
      const newArray = quizQuestions.map((quizQuestion) => {
        const newAnswers = [
          ...quizQuestion.incorrect_answers,
          quizQuestion.correct_answer,
        ];
        const shuffledAnswers = shuffle(newAnswers);
        return {
          id: nanoid(),
          ...quizQuestion,
          incorrect_answers: shuffledAnswers,
          selected_answer: "",
        };
      });
      setQuizData(newArray);
    } catch (err) {
      console.log(err.message);
    }
  }

  function newGame() {
    getNewQuiz();
    setGameOver((prevState) => !prevState);
    setCorrectAnswerCount(0);
  }

  // put axios call in a function so you can call it ousite useEffect

  // Shuffle algorithm - Fisher-Yates shuffle
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  //function to update quizData array with selected_answer key
  function insertSelectedAnswer(event, id) {
    const { value } = event.target;
    const updatedQuiz = quizData.map((quizQuestion) => {
      return id === quizQuestion.id
        ? { ...quizQuestion, selected_answer: value }
        : quizQuestion;
    });
    setQuizData((prevQuizData) => (prevQuizData = updatedQuiz));
  }

  function changePage() {
    setHomePage(!homePage);
  }

  //tast for tomorrow, put setquizdata in a function, run a for loop to populate the new array where the correct answer is randomly put with fake answers and save it in another array
  useEffect(() => {
    console.log("effect ran");

    getNewQuiz();
  }, []);

  return (
    <main>
      {homePage ? (
        <HomePage changePage={changePage} />
      ) : (
        <QuizPage
          quizData={quizData}
          insertSelectedAnswer={insertSelectedAnswer}
          checkAnswers={checkAnswers}
          gameOver={gameOver}
          newGame={newGame}
          correctAnswerCount={correctAnswerCount}
        />
      )}
    </main>
  );
}

export default App;
