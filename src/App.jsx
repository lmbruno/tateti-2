import { TURNS } from "./utils.js";
import { Square } from "./components/Square.jsx";
import { useState } from "react";

export function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);

  return (
    <>
      <main className="board">
        <h1>Ta-Te-Ti</h1>
        <section className="game">
          {board.map((_, index) => (
            <Square key={index} index={index}>
              {index}
            </Square>
          ))}
        </section>
        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>
      </main>
    </>
  );
}
