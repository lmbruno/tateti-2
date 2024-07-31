import {
  TURNS,
  checkEndGame,
  checkWinner,
  resetGameStorage,
  saveGameToStorage,
} from "./utils.js";
import { Square } from "./components/Square.jsx";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { useState } from "react";
import confetti from "canvas-confetti";

export function App() {
  const [board, setBoard] = useState(() => {
    const boardInStorage = window.localStorage.getItem("board");
    return boardInStorage ? JSON.parse(boardInStorage) : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnInStorage = localStorage.getItem("turn");
    return turnInStorage ?? TURNS.X;
  });
  const [winner, setWinner] = useState(null);

  function updateBoard(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    saveGameToStorage({ board: newBoard, turn: newTurn });

    const newWinner = checkWinner(newBoard);

    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else {
      if (checkEndGame(newBoard)) {
        setWinner(false);
      }
    }
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameStorage();
  }

  return (
    <>
      <main className="board">
        <h1>Ta-Te-Ti</h1>
        <button onClick={resetGame}>Reset juego</button>
        <section className="game">
          {board.map((square, index) => (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          ))}
        </section>
        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>
        {<WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>}
      </main>
    </>
  );
}
