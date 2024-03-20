"use client";
import Cell from "@/components/cell";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [sign, setSign] = useState("x");
  const [result, setResult] = useState("tic tac toe");

  const makeMove = (row: number, col: number) => {
    let tmpBoard = [...board];
    if (!tmpBoard[row][col]) {
      tmpBoard[row][col] = sign;
      sign === "x" ? setSign("o") : setSign("x");
    }
    setResult(isWinner());
    setBoard(tmpBoard);
  };

  const clearBoard = () => {
    let tmpBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    setBoard(tmpBoard);
    setResult("");
  };

  const isThreeSame = (first: string, second: string, third: string) => {
    return first && first === second && second === third;
  };

  const isWinner = () => {
    let winner = "";
    board.forEach((row) => {
      if (isThreeSame(row[0], row[1], row[2])) {
        winner = row[0];
      }
    });
    for (let i = 0; i < 3; i++) {
      if (isThreeSame(board[0][i], board[1][i], board[2][i])) {
        winner = board[0][i];
      }
    }
    if (
      isThreeSame(board[0][0], board[1][1], board[2][2]) ||
      isThreeSame(board[0][2], board[1][1], board[2][0])
    ) {
      winner = board[1][1];
    }

    return winner;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="space-y-10">
        <div>
          <p className="text-6xl font-light w-full text-center">Tic Tac Toe</p>
          <p className="text-3xl">Player: {sign}</p>
          <p className="text-3xl">Winner: {result}</p>
        </div>

        <div className="grid grid-cols-3 bg-neutral-900 gap-1">
          {board.map((row, i) =>
            row.map((cell, j) => (
              <Cell
                key={j}
                sign={cell}
                coordinates={[i, j]}
                makeMove={makeMove}
              />
            )),
          )}
        </div>
        <button
          onClick={clearBoard}
          className="flex w-full bg-red-900 text-white items-center justify-center h-10 rounded-md"
        >
          Reset
        </button>
      </div>
    </main>
  );
}
