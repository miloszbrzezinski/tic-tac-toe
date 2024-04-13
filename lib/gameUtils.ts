type Player = "X" | "O" | "Tie" | null;

export const checkWinner = (squares: Player[]): Player | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return squares.includes(null) ? null : "Tie";
};

export const minimax = (newBoard: Player[], player: Player): any => {
  const availSpots = newBoard
    .map((val, idx) => (val === null ? idx : null))
    .filter((v) => v !== null);
  const winner = checkWinner(newBoard);
  if (winner === "O") return { score: -10 };
  else if (winner === "X") return { score: 10 };
  else if (winner === "Tie") return { score: 0 };

  let moves: any[] = [];
  for (let i = 0; i < availSpots.length; i++) {
    let move: any = { index: availSpots[i] };
    newBoard[availSpots[i]] = player;
    move.score = minimax(newBoard, player === "X" ? "O" : "X").score;
    newBoard[availSpots[i]] = null;
    moves.push(move);
  }

  return moves.reduce(
    (best, move) => {
      return (
        player === "X" ? move.score > best.score : move.score < best.score
      )
        ? move
        : best;
    },
    { score: player === "X" ? -1000 : 1000 },
  );
};
