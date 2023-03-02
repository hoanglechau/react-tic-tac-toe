import React, { useState, useEffect } from "react";
import Board from "./Board";

function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  //Declaring a Winner
  useEffect(() => {
    // calculateWinner returns either the winner or null
    const gameWinner = calculateWinner(squares);
    setWinner((prevWinner) => gameWinner);
  }, [squares]); // this side effect will run every time there is a change to squares

  //function to check if a player has won.
  //If a player has won, we can display text such as “Winner: X” or “Winner: O”.
  //Input: squares: given an array of 9 squares:'X', 'O', or null.
  const calculateWinner = (squares) => {
    // This array contains the values which determine that a player has won
    const lines = [
      [0, 1, 2], // 3 in a horizontal row
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // 3 in a vertical row
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // 3 in a diagonal row
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      // Destructure the array element
      const [a, b, c] = lines[i];
      // Check if all 3 squares contain the same value
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]; // returning the winner, either "X" or "O"
      }
    }
    return null;
  };

  //Handle player
  const handleClick = (i) => {
    // Create a shallow copy of the squares array
    const newSquares = squares.slice();
    // This function will not work if there's already been a winner or the square already has a value
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    // Set the value of the square to be "X" or "O" depending on which player is next
    newSquares[i] = xIsNext ? "X" : "O";
    // Update the squares array with the new array
    setSquares((prevSquares) => newSquares);
    // Let the next player plays
    setXIsNext((prevXIsNext) => !prevXIsNext);
  };

  //Restart game
  const handleRestart = () => {
    // reset the squares array to its initial value
    setSquares(Array(9).fill(null));
    // Let X starts the new game
    setXIsNext(true);
  };

  return (
    <div className="main">
      <h2 className="result">Winner is: {winner ? winner : "N/N"}</h2>
      <div className="game">
        <span className="player">Next player is: {xIsNext ? "X" : "O"}</span>
        <Board squares={squares} handleClick={handleClick} />
      </div>
      <button onClick={handleRestart} className="restart-btn">
        Restart
      </button>
    </div>
  );
}

export default Game;
