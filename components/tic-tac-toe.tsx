import React, { useState } from "react";
import Cell from "./cell";
import { useSearchParams } from "next/navigation";

type Player = "X" | "O" | "Tie" | null;

interface TicTacToeProps {
  onPlayer: (player: string) => void;
  onWinner: (winner: string) => void;
}

export const TicTacToe = ({ onPlayer, onWinner }: TicTacToeProps) => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | null>(null);
  const searchParams = useSearchParams();
  const gameType = searchParams.get("game");

  const checkWinner = (squares: Player[]) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    if (!squares.includes(null)) return "Tie"; // Tie if no spaces left
    return null;
  };

  const minimax = (newBoard: Player[], player: Player): any => {
    const availSpots = newBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter((v) => v !== null);

    const winner = checkWinner(newBoard);
    if (winner === "O") return { score: -10 };
    else if (winner === "X") return { score: 10 };
    else if (winner === "Tie") return { score: 0 };

    let moves = [];
    for (let i = 0; i < availSpots.length; i++) {
      let move: any = {};
      move.index = availSpots[i];
      newBoard[availSpots[i]] = player;

      let result = minimax(newBoard, player === "X" ? "O" : "X");
      move.score = result.score;

      newBoard[availSpots[i]] = null;
      moves.push(move);
    }

    let bestMove;
    if (player === "X") {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = moves[i];
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = moves[i];
        }
      }
    }
    return bestMove;
  };

  const handleClick = (index: number) => {
    if (winner || board[index]) return;
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      onWinner(newWinner);
      return;
    }

    if (gameType === "PvC" && currentPlayer === "X") {
      // Machine plays as 'O'
      const move = minimax(newBoard, "O");
      newBoard[move.index] = "O";
      setBoard(newBoard);
      const finalWinner = checkWinner(newBoard);
      if (finalWinner) {
        setWinner(finalWinner);
        return;
      }
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const clearBoard = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    onWinner("");
  };

  return (
    <>
      <div className="bg-fuchsia-500 shadow-2xl shadow-fuchsia-800 ">
        <div className="grid grid-cols-3 gap-1">
          {board.map((cell, index) => (
            <Cell
              key={index}
              index={index}
              sign={cell}
              handleClick={handleClick}
            />
          ))}
        </div>
      </div>
      <button
        onClick={clearBoard}
        className="flex w-full bg-fuchsia-500 text-white hover:shadow-lg hover:shadow-fuchsia-500 items-center justify-center h-10 rounded-md"
      >
        Reset
      </button>
    </>
  );
};
