"use client";
import { Circle, X } from "lucide-react";
import { useState } from "react";

interface CellProps {
  sign: string;
  coordinates: [number, number];
  makeMove: (row: number, col: number) => void;
}
const Cell = ({ sign, coordinates, makeMove }: CellProps) => {
  //const [sign, setSign] = useState("");
  return (
    <button
      onClick={() => {
        makeMove(coordinates[0], coordinates[1]);
      }}
      className="flex items-center justify-center text-black bg-white w-36 h-36"
    >
      {!sign && <div className="w-36 h-36"></div>}
      {sign === "x" && <X strokeWidth={1} className="w-36 h-36" />}
      {sign === "o" && <Circle strokeWidth={1.4} className="w-24 h-24" />}
    </button>
  );
};

export default Cell;
