import React from "react"

function QuizPage() {
  return (
    <div className="container">
      <p> This is Question One</p>
      <fieldset>
        <input name="option" type="radio" id="option-1" vale="" onChange={""} />
        <label htmlFor="option1">Option 1</label>
        <input type="radio" name="option" id="option-2" vale="" onChange={""} />
        <label htmlFor="option2">Option 2</label>
        <input type="radio" name="option" id="option-2" vale="" onChange={""} />
        <label htmlFor="option3">Option 3</label>
        <input type="radio" name="option" id="option-2" vale="" onChange={""} />
        <label htmlFor="option4">Option 4</label>
      </fieldset>

      <button> Check Answer </button>
    </div>
  )
}

export default QuizPage
