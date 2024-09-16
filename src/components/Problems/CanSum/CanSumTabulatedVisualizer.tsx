// CanSumTabulatedVisualizer.tsx
import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { Button } from "../../../components/ui/button";
import { useTheme } from "../../../components/theme-provider";

interface TableCell {
  value: number; // The index value
  isReachable: boolean; // True if reachable
}

interface CanSumTabulatedVisualizerProps {
  targetSum: number;
  numbers: number[];
}

const CanSumTabulatedVisualizer: React.FC<CanSumTabulatedVisualizerProps> = ({
  targetSum,
  numbers,
}) => {
  const [table, setTable] = useState<TableCell[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [updatedCells, setUpdatedCells] = useState<number[]>([]);
  const [newlyReachedCells, setNewlyReachedCells] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const { speed } = useAppSelector((store) => store.settings);
  const { theme } = useTheme();

  useEffect(() => {
    // Initialize the table with all cells set to false (no cell is reachable initially)
    const initialTable: TableCell[] = Array(targetSum + 1)
      .fill(false)
      .map((_, index) => ({
        value: index,
        isReachable: false, // No cell is reachable initially
      }));
    setTable(initialTable);
  }, [targetSum]);

  const runAlgorithm = async () => {
    setIsRunning(true);
    const newTable = [...table];

    // Mark the first cell as reachable at the start
    newTable[0].isReachable = true;
    setTable([...newTable]);

    // Track if targetSum has been reached
    let targetReached = newTable[targetSum].isReachable;

    // Main DP logic with visualization
    for (let i = 0; i <= targetSum; i++) {
      if (newTable[i].isReachable) {
        setCurrentIndex(i);
        setUpdatedCells([]); // Clear updated cells for the current index
        setNewlyReachedCells([]);
        await new Promise((resolve) => setTimeout(resolve, speed));

        for (let num of numbers) {
          setCurrentNumber(num);
          await new Promise((resolve) => setTimeout(resolve, speed));

          const newSum = i + num;
          if (newSum <= targetSum) {
            if (!newTable[newSum].isReachable) {
              // Cell is newly reachable
              newTable[newSum].isReachable = true;
              setNewlyReachedCells((prev) => [...prev, newSum]);
              setTable([...newTable]); // Update the table
              await new Promise((resolve) => setTimeout(resolve, speed));

              if (newSum === targetSum && !targetReached) {
                // Update 'Erreichbar?' status immediately
                targetReached = true;
              }
            } else {
              // Cell is already reachable, but we're updating it again
              setUpdatedCells((prev) => [...prev, newSum]);
              await new Promise((resolve) => setTimeout(resolve, speed));
            }
          }
        }
      }
    }

    // Reset states after completion
    setCurrentIndex(null);
    setCurrentNumber(null);
    setUpdatedCells([]);
    setNewlyReachedCells([]);
    setIsRunning(false); // Mark the algorithm as done
    setTable([...newTable]);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-4 my-8">
        <div>
          <strong>Zielzahl:</strong> {targetSum}
        </div>

        <div>
          <strong>Wählbare Zahlen:</strong>{" "}
          {numbers.map((num, idx) => (
            <span
              key={idx}
              className={`mx-1 ${
                currentNumber === num ? "text-red-500 font-bold" : ""
              }`}
            >
              {num}
            </span>
          ))}
        </div>
        <div>
          <strong>Erreichbar?</strong>{" "}
          {table[targetSum]?.isReachable ? "Ja" : "Nein"}
        </div>
      </div>

      <div
        className="grid gap-1 mb-4"
        style={{
          gridTemplateColumns: `repeat(${Math.min(
            targetSum + 1,
            10
          )}, minmax(0, 1fr))`,
        }}
      >
        {table.map((cell, index) => {
          // Determine the cell's background style
          let cellBackgroundClass = "";
          let cellStyle = {};

          const isCurrentIndex = currentIndex === index;
          const isNewlyReached = newlyReachedCells.includes(index);
          const isUpdatedAgain = updatedCells.includes(index);
          const isReachable = cell.isReachable;

          if (theme === "light") {
            if (isNewlyReached) {
              cellBackgroundClass = "bg-yellow-300";
            } else if (isUpdatedAgain) {
              // Cell is already reachable and is being updated again
              cellStyle = {
                background: "linear-gradient(135deg, #86efac, #fde047)", // Green and Yellow gradient
              };
            } else if (isReachable) {
              cellBackgroundClass = "bg-green-300";
            } else {
              cellBackgroundClass = "bg-gray-100";
            }
          } else {
            // Dark theme
            if (isNewlyReached) {
              cellBackgroundClass = "bg-yellow-400";
            } else if (isUpdatedAgain) {
              // Cell is already reachable and is being updated again
              cellStyle = {
                background: "linear-gradient(90deg, #4ade80, #facc15", // Green and Yellow gradient
              };
            } else if (isReachable) {
              cellBackgroundClass = "bg-green-400";
            } else {
              cellBackgroundClass = "bg-gray-800";
            }
          }

          return (
            <div
              key={index}
              className={`w-16 h-16 border-gray-400 border flex items-center justify-center
                  ${cellBackgroundClass}
                  ${isCurrentIndex ? "border-red-500 border-4" : ""}
                `}
              style={cellStyle}
            >
              {cell.value}
            </div>
          );
        })}
      </div>

      <div className="mt-2"></div>
      <Button
        className={`bg-blue-500 text-white px-4 py-2 rounded ${
          isRunning ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={runAlgorithm}
        disabled={isRunning}
      >
        {isRunning ? "Running..." : "Start"}
      </Button>
      <div className="text-left">
        <p className="py-2 font-semibold">Legende:</p>
        <div className="text-left mb-4 flex max-w-[500px] justify-center">
          <div className="grid grid-cols-2 gap-2 w-[470px]">
            <div>
              <span className="inline-block w-4 h-4 border-4 border-red-500 mr-2"></span>
              aktueller Index
            </div>
            <div>
              <span
                className={`inline-block w-4 h-4 ${
                  theme === "light" ? "bg-yellow-300" : "bg-yellow-400"
                } mr-2`}
              ></span>
              neuer ereichbarer Wert
            </div>
            <div>
              <span
                className={`inline-block w-4 h-4 ${
                  theme === "light" ? "bg-green-300" : "bg-green-400"
                } mr-2`}
              ></span>
              erreichbarer Wert
            </div>
            <div>
              <span
                className="inline-block w-4 h-4 mr-2"
                style={{
                  background:
                    theme === "light"
                      ? "linear-gradient(135deg, #86efac, #fde047)"
                      : "linear-gradient(90deg, #4ade80, #facc15",
                }}
              ></span>
              erneut erreicht
            </div>
            <div>
              <span className="text-red-500 font-bold mr-2">Zahl</span> in
              Bearbeitung
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanSumTabulatedVisualizer;
