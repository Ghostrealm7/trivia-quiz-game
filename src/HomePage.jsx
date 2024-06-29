import React from "react"

function HomePage({ changePage }) {
  return (
    <div className="container">
      <h1>Welcome to trivia quiz game</h1>
      <p>Some Description Here</p>
      <button onClick={changePage}> Start Quiz!</button>
    </div>
  )
}

export default HomePage
