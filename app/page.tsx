"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TicTacToe } from "@/components/tic-tac-toe";
import { Circle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const gameType = searchParams.get("game");

  // Handle changing the game type via URL query
  const onClickGameType = (type: string) => {
    router.push(`?game=${type}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 p-2 bg-black">
      <div className="space-y-10">
        <div>
          <p className="text-6xl font-light w-full text-center text-orange-500 mb-5">
            Tic-Tac-Toe
          </p>
        </div>
        <TicTacToe  />
        <div className="space-y-2 pt-10">
          <div className="flex space-x-2">
            <button
              onClick={() => onClickGameType("PvP")}
              className={cn(
                "flex w-full border border-orange-500 text-orange-500 items-center justify-center h-10 rounded-md",
                gameType === "PvP" &&
                  "bg-orange-500 text-white shadow-lg shadow-orange-800",
              )}
            >
              Player vs Player
            </button>
            <button
              onClick={() => onClickGameType("PvC")}
              className={cn(
                "flex w-full border border-orange-500 text-orange-500 items-center justify-center h-10 rounded-md",
                gameType === "PvC" &&
                  "bg-orange-500 text-white shadow-lg shadow-orange-800",
              )}
            >
              Player vs AI
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
