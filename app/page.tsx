import { TicTacToe } from "@/components/tic-tac-toe";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 p-2 bg-black">
      <div className="space-y-10">
        <div>
          <p className="text-6xl font-light w-full text-center text-orange-500 mb-5">
            Tic-Tac-Toe
          </p>
        </div>
        <TicTacToe />
      </div>
    </main>
  );
}
