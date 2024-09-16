// FibonacciGrid.tsx
import React, { useState, useEffect } from "react";
import { useAppSelector } from "../hooks/redux"; // Adjust the import path as necessary
import { Button } from "../components/ui/button"; // Adjust the import path as necessary
import { useTheme } from "../components/theme-provider"; // Adjust the import path as necessary

interface FibonacciCell {
  index: number;
  value: number | null;
  isComparingFirst?: boolean; // First comparing cell
  isComparingSecond?: boolean; // Second comparing cell
  isCalculated?: boolean; // Indicates if the cell has been calculated
}

export const Grid: React.FC = () => {
  const { input, speed, fieldSize } = useAppSelector((store) => store.settings);
  const [fibonacciArray, setFibonacciArray] = useState<FibonacciCell[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [stepsTaken, setStepsTaken] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const { theme } = useTheme();

  const compareColor1 = theme === "light" ? "bg-purple-300" : "bg-purple-400";
  const compareColor2 = theme === "light" ? "bg-yellow-300" : "bg-yellow-400";
  const finishedColor = theme === "light" ? "bg-green-300" : "bg-green-400";

  // Initialize or reset the Fibonacci array
  const setupFibonacciArray = () => {
    const initialArray: FibonacciCell[] = [];
    initialArray.push({ index: 0, value: 0, isCalculated: true }); // Fibonacci(0) = 0
    if (input > 0) {
      initialArray.push({ index: 1, value: 1, isCalculated: true }); // Fibonacci(1) = 1
    }
    setFibonacciArray([...initialArray]);
    setStepsTaken(0);
    setIsFinished(false);
    setCurrentIndex(null);
    return initialArray; // Return the initial array
  };

  // Setup the Fibonacci array whenever input changes
  useEffect(() => {
    setupFibonacciArray();
  }, [input]);

  // Function to fill the Fibonacci table step by step
  const fillFibonacciTable = async (updatedArray: FibonacciCell[]) => {
    if (input <= 1) return;

    for (let i = 2; i <= input; i++) {
      setStepsTaken((prev) => prev + 1);

      // Step 1: Highlight the two previous cells for comparison
      setCurrentIndex(i);
      updatedArray[i - 1].isComparingFirst = true; // Highlight first cell
      updatedArray[i - 2].isComparingSecond = true; // Highlight second cell
      setFibonacciArray([...updatedArray]);

      await new Promise((resolve) => setTimeout(resolve, speed * 2));

      // Step 2: Calculate the new value
      const newValue =
        (updatedArray[i - 1].value || 0) + (updatedArray[i - 2].value || 0);
      updatedArray.push({ index: i, value: newValue, isCalculated: true });

      setFibonacciArray([...updatedArray]);

      await new Promise((resolve) => setTimeout(resolve, speed));

      // Step 3: Remove comparing highlights
      updatedArray[i - 1].isComparingFirst = false;
      updatedArray[i - 2].isComparingSecond = false;

      setFibonacciArray([...updatedArray]);
    }

    setIsFinished(true);
    setCurrentIndex(null);
    setIsRunning(false);
  };

  // Start the Fibonacci algorithm
  const startAlgorithm = () => {
    if (isRunning) return; // Prevent multiple starts
    const initialArray = setupFibonacciArray(); // Reset the grid
    setIsRunning(true); // Set the running state
    fillFibonacciTable(initialArray); // Start the Fibonacci calculation
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-4 my-4">
        {/* Display Fibonacci value and steps taken */}
        <div className="mb-4">
          <strong>Fibonacci Wert:</strong>{" "}
          {isFinished ? fibonacciArray[fibonacciArray.length - 1].value : "N/A"}
        </div>
        <div className="mb-4">
          <strong>Schritte:</strong> {stepsTaken}
        </div>
      </div>

      {/* Wrapping grid with dynamic cell size */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignContent: "flex-start",
          justifyContent: "center", // Center the grid horizontally
          gap: "10px", // Add some space between the cells
          maxWidth: "95%", // Ensure the grid doesn't overflow horizontally
        }}
      >
        {fibonacciArray.map((cell, i) => (
          <div
            key={i}
            style={{
              minWidth: `${fieldSize}px`,
              minHeight: `${fieldSize}px`,
              padding: "10px",
              flexGrow: 1,
              flexBasis: "content",
              boxSizing: "border-box",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            className={`border flex items-center justify-center
              ${
                cell.isComparingFirst
                  ? compareColor1 // First comparing cell color
                  : cell.isComparingSecond
                  ? compareColor2 // Second comparing cell color
                  : isFinished && i === fibonacciArray.length - 1
                  ? finishedColor // Last cell color when finished
                  : cell.isCalculated
                  ? theme === "light"
                    ? "bg-gray-100"
                    : "bg-gray-800" // Calculated cell color
                  : "bg-transparent" // Default cell color
              }
              ${
                i === currentIndex
                  ? "border-red-500 border-4"
                  : "border-gray-400"
              }
            `}
          >
            <p
              className="text-sm break-words"
              style={{
                fontSize: `${Math.max(
                  12 - Math.floor(String(cell.value).length / 4),
                  10
                )}px`, // Dynamic font size
                margin: 0,
                textAlign: "center",
                width: "100%",
              }}
              title={cell.value !== null ? cell.value.toString() : ""}
            >
              {cell.value !== null ? cell.value : ""}
            </p>
          </div>
        ))}
      </div>

      {/* Start button */}
      <div className="mt-4">
        <Button
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            isRunning ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={startAlgorithm}
          disabled={isRunning}
        >
          {isRunning ? "Running..." : "Start"}
        </Button>
      </div>

      {/* Legend for the colors */}
      <div className="text-left mt-4">
        <p className="py-2 font-semibold text-sm">Legende:</p>
        <div className="text-left mb-4">
          <div className="grid grid-cols-2 gap-1 w-[470px]">
            <div className="flex items-center">
              <span
                className={`inline-block w-4 h-4 ${compareColor2} mr-2`}
              ></span>
              Zelle 1 für Vergleich
            </div>
            <div className="flex items-center">
              <span
                className={`inline-block w-4 h-4 ${compareColor1} mr-2`}
              ></span>
              Zelle 2 für Vergleich
            </div>
            <div className="flex items-center">
              <span className="inline-block w-4 h-4 bg-gray-100 mr-2"></span>
              bereits berechnete Zelle
            </div>
            <div>
              <span className="inline-block w-4 h-4 border-4 border-red-500 mr-2"></span>
              Zelle in Bearbeitung
            </div>
            <div>
              <span
                className={`inline-block w-4 h-4 ${finishedColor} mr-2`}
              ></span>
              Ergebnis
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
