const TURNS = {
  X: "❌",
  O: "⭕",
};

const WINNER_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const saveGameToStorage = ({ board, turn }) => {
  // guardar aqui partida
  window.localStorage.setItem("board", JSON.stringify(board));
  window.localStorage.setItem("turn", turn);
};

export const resetGameStorage = () => {
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
};

function checkWinner(newBoard) {
  for (let combo of WINNER_COMBINATIONS) {
    const [a, b, c] = combo;

    if (
      newBoard[a] &&
      newBoard[a] === newBoard[b] &&
      newBoard[a] === newBoard[c]
    ) {
      return newBoard[a];
    }
  }
  return false;
}

function checkEndGame(newBoard) {
  return newBoard.every((square) => square !== null);
}

export { TURNS, WINNER_COMBINATIONS, checkEndGame, checkWinner };
