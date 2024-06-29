import { useEffect, useState } from "react"
import "./styles.css"
import HomePage from "./HomePage"
import QuizPage from "./QuizPage"
import axios from "axios"

function App() {
  const [homePage, setHomePage] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [quizData, setQuizData] = useState([])

  function changePage() {
    setHomePage(!homePage)
  }
  //tast for tomorrow, put setquizdata in a function, run a for loop to populate the new array where the correct answer is randomly put with fake answers and save it in another array
  useEffect(() => {
    async function apiData() {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple",
      )
      setQuizData(response.data.results)
    }
    apiData()
  }, [])

  return (
    <main>
      {homePage ? <HomePage changePage={changePage} /> : <QuizPage />}
    </main>
  )
}

export default App
