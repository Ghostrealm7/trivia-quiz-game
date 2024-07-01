import { useEffect, useState } from "react";
import "./styles.css";
import HomePage from "./HomePage";
import QuizPage from "./QuizPage";
import axios from "axios";

//Next steps: put modified quiz array in state. Then send State as prop to homepage, then render quiz array in homepage using map.

function App() {
  const [homePage, setHomePage] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [quizData, setQuizData] = useState([]);

  // Shuffle algorithm - Fisher-Yates shuffle
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function changePage() {
    setHomePage(!homePage);
    // setArray((prevArray) => {
    //   const newField_2 = [...prevArray.field_2, prevArray.field_1]; //Access the array inside the object
    //   const shuffledArray = shuffle(newField_2);
    //   return { ...prevArray, field_2: shuffledArray }; //we are now setting the new array inside the object
    // });
  }

  //tast for tomorrow, put setquizdata in a function, run a for loop to populate the new array where the correct answer is randomly put with fake answers and save it in another array
  useEffect(() => {
    console.log("effect ran");
    async function apiData() {
      let response = await axios.get(
        "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple",
      );
      let quizQuestions = await response.data.results;
      // Save correct_answer in the incorrect answer array, then shuffle the incorrect answer array and save in NewArray.
      const newArray = quizQuestions.map((quizQuestion) => {
        const newAnswers = [
          ...quizQuestion.incorrect_answers,
          quizQuestion.correct_answer,
        ];
        const shuffledAnswers = shuffle(newAnswers);
        return { ...quizQuestion, incorrect_answers: shuffledAnswers };
      });
      setQuizData(newArray);
    }
    apiData();
  }, []);

  return (
    <main>
      {homePage ? (
        <HomePage changePage={changePage} />
      ) : (
        <QuizPage quizData={quizData} />
      )}
    </main>
  );
}

export default App;
