import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { Button } from "../../../components/ui/button";

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
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const { speed } = useAppSelector((store) => store.settings);

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
    table[0].isReachable = false;
    const newTable = [...table];

    // Mark the first cell as reachable at the start
    setTable([...newTable]);
    newTable[0].isReachable = true;

    // Main DP logic with visualization
    for (let i = 0; i <= targetSum; i++) {
      if (newTable[i].isReachable) {
        for (let num of numbers) {
          const newSum = i + num;
          if (newSum <= targetSum) {
            newTable[newSum].isReachable = true;
            setTable([...newTable]); // Update the table
            setCurrentStep(newSum); // Update the current step for visualization

            await new Promise((resolve) => setTimeout(resolve, speed));
          }
        }
      }
    }
    setIsRunning(false); // Mark the algorithm as done
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-4 my-4">
        <div>
          <strong>Ziehlzahl:</strong> {targetSum}
        </div>

        <div>
          <strong>Wählbare Zahlen:</strong> {numbers.join(", ")}
        </div>
        <div>
          <strong>erreichbar?</strong>{" "}
          {isRunning
            ? "N/A" // Not available while running
            : table[targetSum]?.isReachable
            ? "Ja"
            : "Nein"}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1 mb-4">
        {table.map((cell, index) => (
          <div
            key={index}
            className={`w-16 h-16 border-gray-400 border flex items-center justify-center
              ${cell.isReachable ? "bg-green-300" : "bg-gray-100"}
              ${currentStep === cell.value ? "border-red-500 border-4" : ""}
            `}
          >
            {cell.value}
          </div>
        ))}
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
              <span className="inline-block w-4 h-4 bg-green-300 mr-2"></span>
              Erreichbarer Wert
            </div>
            <div>
              <span className="inline-block w-4 h-4 border-4 border-red-500 mr-2"></span>
              Zelle in Bearbeitung
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CanSumTabulatedVisualizer;
