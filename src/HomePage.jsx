import React from "react";

function HomePage({ changePage }) {
  return (
    <div className="container">
      <h1>Trivia Quiz Game</h1>
      <p>Powered by Ghostrealm7</p>
      <button onClick={changePage}> Start Quiz!</button>
    </div>
  );
}

export default HomePage;
