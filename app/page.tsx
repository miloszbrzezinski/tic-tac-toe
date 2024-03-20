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

  const makeMove = (row: number, col: number) => {
    let tmpBoard = [...board];
    if (!tmpBoard[row][col]) {
      tmpBoard[row][col] = sign;
      sign === "x" ? setSign("o") : setSign("x");
    }
    setBoard(tmpBoard);
  };

  const clearBoard = () => {
    let tmpBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    setBoard(tmpBoard);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="space-y-10">
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
