"use client";
import { Circle, X } from "lucide-react";

interface CellProps {
  index: number;
  sign: string | null;
  handleClick: (index: number) => void;
}
const Cell = ({ index, sign, handleClick }: CellProps) => {
  //const [sign, setSign] = useState("");
  return (
    <button
      onClick={() => {
        handleClick(index);
      }}
      className="flex items-center justify-center text-black bg-black aspect-square md:aspect-square w-full h-full"
    >
      {sign === "X" && (
        <X strokeWidth={1} className="w-24 h-24 text-lime-300" />
      )}
      {sign === "O" && (
        <Circle strokeWidth={1.4} className="w-20 h-20 text-amber-300" />
      )}
    </button>
  );
};

export default Cell;
