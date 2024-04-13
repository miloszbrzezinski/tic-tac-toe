import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { checkWinner, minimax } from "@/lib/gameUtils";
import Cell from "./cell";
import { Circle, X } from "lucide-react";

type Player = "X" | "O" | "Tie" | null;

export const TicTacToe = () => {
  const [winner, setWinner] = useState("");
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const searchParams = useSearchParams();
  const gameType = searchParams.get("game");

  const handleClick = (index: number) => {
    if (board[index] || checkWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner) {
      setWinner(winner);
      return;
    }

    // Move setting the currentPlayer state to the end of the function to ensure it's the last thing done
    let nextPlayer = currentPlayer;

    if (gameType === "PvC" && currentPlayer === "X") {
      const move = minimax(newBoard, "O");
      newBoard[move.index] = "O";
      setBoard(newBoard);
      const finalWinner = checkWinner(newBoard);
      if (finalWinner) {
        setWinner(finalWinner);
        return;
      }
      nextPlayer = "X"; // Keep the same player if it's PvC and the current player is X
    } else if (gameType === "PvP") {
      nextPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
    }

    setCurrentPlayer(nextPlayer); // Update player after all other updates
  };

  const clearBoard = () => {
    setBoard(Array(9).fill(null));
    setWinner("");
    setCurrentPlayer("X");
  };

  // Player icon display logic
  const displayPlayerIcon = () => {
    return currentPlayer === "X" ? (
      <X strokeWidth={2} className="w-24 h-24 text-lime-300" />
    ) : (
      <Circle strokeWidth={2} className="w-20 h-20 text-fuchsia-500" />
    );
  };

  // Result message display logic
  const displayResultMessage = () => {
    const baseClass = "text-3xl text-orange-500";
    if (winner === "X" || winner === "O") {
      const colorClass = winner === "X" ? "text-lime-300" : "text-fuchsia-500";
      return <p className={cn(baseClass, colorClass)}>Winner</p>;
    }
    if (winner === "Tie") {
      return <p className={baseClass}>Tie</p>;
    }
    return null;
  };

  return (
    <>
      <div className="text-3xl text-orange-500 h-28 flex flex-col items-center justify-center">
        {displayPlayerIcon()}
        {displayResultMessage()}
      </div>
      <div
        className={cn(
          "bg-amber-300 shadow-2xl",
          currentPlayer === "X"
            ? "shadow-lime-300 bg-lime-300"
            : "shadow-fuchsia-500 bg-fuchsia-500",
        )}
      >
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
        className="flex w-full bg-orange-500 text-white hover:shadow-lg hover:shadow-orange-600 items-center justify-center h-10 rounded-md"
      >
        Reset
      </button>
    </>
  );
};
