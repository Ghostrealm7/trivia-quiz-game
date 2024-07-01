import { useEffect, useState } from "react";
import "./styles.css";
import HomePage from "./HomePage";
import QuizPage from "./QuizPage";
import axios from "axios";

function App() {
  const [homePage, setHomePage] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [newQuizData, setNewQuizData] = useState({
    category: "",
    correct_answer: "",
    difficulty: "",
    incorrect_answers: [],
    question: "",
    type: "",
  });

  const [array, setArray] = useState({
    field_1: "This is Correct Answer",
    field_2: ["A", "B", "C", "D"],
  });

  // Shuffle algorithm - Fisher-Yates shuffle
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function changePage() {
    // setHomePage(!homePage)
    // setArray((prevArray) => {
    //   const newField_2 = [...prevArray.field_2, prevArray.field_1]; //Access the array inside the object
    //   const shuffledArray = shuffle(newField_2);
    //   return { ...prevArray, field_2: shuffledArray }; //we are now setting the new array inside the object
    // });
  }

  //tast for tomorrow, put setquizdata in a function, run a for loop to populate the new array where the correct answer is randomly put with fake answers and save it in another array
  useEffect(() => {
    async function apiData() {
      let response = await axios.get(
        "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple",
      );
      let quizQuestions = await response.data.results;
      console.log(quizQuestions);

      // Save correct_answer in the incorrect answer array, then shuffle the incorrect answer array.
      const NewArray = quizQuestions.map((quizQuestion) => {
        const NewAnswers = [
          ...quizQuestion.incorrect_answers,
          quizQuestion.correct_answer,
        ];
        const ShuffledAnswers = shuffle(NewAnswers);
        return { ...quizQuestion, incorrect_answers: ShuffledAnswers };
      });
      console.log(NewArray);
    }
    apiData();
  }, []);

  return (
    <main>
      {homePage ? <HomePage changePage={changePage} /> : <QuizPage />}
    </main>
  );
}

export default App;
