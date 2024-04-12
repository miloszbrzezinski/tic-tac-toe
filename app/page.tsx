"use client";
import { TicTacToe } from "@/components/tic-tac-toe";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [board, setBoard] = useState<[string[], string[], string[]]>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [sign, setSign] = useState("x");
  const [result, setResult] = useState("tic tac toe");

  const router = useRouter();
  const searchParams = useSearchParams();

  const gameType = searchParams.get("game");

  const onClick = (gameType: string) => {
    router.push(`?game=${gameType}`);
  };

  const setWinner = (winner: string) => {
    setResult(winner);
  };

  const setPlayer = (player: string) => {
    setSign(player);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 p-2 bg-black">
      <div className="space-y-10">
        <div>
          <p className="text-6xl font-light w-full text-center text-fuchsia-500 mb-5">
            <span className="">Tic</span>-<span className="">Tic</span>-
            <span className="">Toe</span>
          </p>
          <p className="text-3xl text-fuchsia-500">Player: {sign}</p>
          <p className="text-3xl text-fuchsia-500">Winner: {result}</p>
        </div>
        <TicTacToe onPlayer={setPlayer} onWinner={setWinner} />
        <div className="space-y-2 pt-10">
          <div className="flex space-x-2">
            <button
              onClick={() => {
                onClick("PvP");
              }}
              className={cn(
                "flex w-full border border-fuchsia-500 text-fuchsia-500 items-center justify-center h-10 rounded-md",
                gameType === "PvP" &&
                  "bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500",
              )}
            >
              player vs player
            </button>
            <button
              onClick={() => {
                onClick("PvC");
              }}
              className={cn(
                "flex w-full border border-fuchsia-500 text-fuchsia-500 items-center justify-center h-10 rounded-md",
                gameType === "PvC" &&
                  "bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500",
              )}
            >
              player vs AI
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
