import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../hooks/redux";

interface Cell {
  x: number;
  y: number;
  cost: number;
  memoized: boolean; // Track if the cell value is memoized
  fromMemo: boolean; // Track if the cell value is retrieved from memo
  memoValue: number | null; // Store the memoized value for display
  isFinal: boolean; // Track if this is the final cell
}

interface GridTravelerMemoProps {
  gridData: number[][]; // Accept a predefined grid
}

const GridTravelerMemoVisualizer: React.FC<GridTravelerMemoProps> = ({
  gridData,
}) => {
  const { speed, fieldSize } = useAppSelector((store) => store.settings);
  const [grid, setGrid] = useState<Cell[][] | null>(null);
  const [currentCell, setCurrentCell] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [minSum, setMinSum] = useState<number>(Number.MAX_SAFE_INTEGER); // Minimum sum found so far
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [visitedCellsCount, setVisitedCellsCount] = useState<number>(0); // Track how many cells have been visited
  const [memo, setMemo] = useState<number[][] | null>(null); // Memoization table

  useEffect(() => {
    // Initialize grid and memo table
    const initialGrid: Cell[][] = gridData.map((row, rowIndex) =>
      row.map((cost, colIndex) => ({
        x: colIndex,
        y: rowIndex,
        cost,
        memoized: false, // Initially, no cell is memoized
        fromMemo: false, // Initially, no cell is retrieved from memo
        memoValue: null, // No memoized value at first
        isFinal: false, // Only the bottom-right cell will be marked final
      }))
    );
    const initialMemo: number[][] = Array.from(
      { length: gridData.length },
      () => Array(gridData[0].length).fill(-1)
    );

    setGrid(initialGrid);
    setMemo(initialMemo);
  }, [gridData]);

  const gridTravelerMemo = async (
    m: number,
    n: number,
    cumulativeCost: number
  ): Promise<number> => {
    if (m < 0 || n < 0) {
      return Number.MAX_SAFE_INTEGER; // Out of bounds
    }

    // If the value is already memoized, return it and mark the cell as retrieved from memo
    if (memo && memo[m][n] !== -1) {
      setCurrentCell({ x: n, y: m });
      setGrid((prevGrid) =>
        prevGrid!.map((row, rowIndex) =>
          row.map((cell, colIndex) =>
            rowIndex === m && colIndex === n
              ? { ...cell, fromMemo: true, memoized: false } // Mark as retrieved from memo, not memoized
              : cell
          )
        )
      );
      await new Promise((resolve) => setTimeout(resolve, speed)); // Small delay for visualization
      return memo[m][n];
    }

    // Set the current cell being visited
    setCurrentCell({ x: n, y: m });

    // Increment visited cell counter if this cell is not yet memoized or visited
    if (!grid![m][n].memoized && !grid![m][n].fromMemo) {
      if (m !== 0 || n !== 0)
        // Don't count the starting cell
        setVisitedCellsCount((prevCount) => prevCount + 1);
    }

    // Add a delay to visualize the steps
    await new Promise((resolve) => setTimeout(resolve, speed));

    if (m === 0 && n === 0) {
      return gridData[0][0]; // Base case
    }

    // Recurse to the top and left cells
    const costFromAbove = await gridTravelerMemo(
      m - 1,
      n,
      cumulativeCost + gridData[m][n]
    );
    const costFromLeft = await gridTravelerMemo(
      m,
      n - 1,
      cumulativeCost + gridData[m][n]
    );

    // Store the computed value in the memo table
    const memoizedValue =
      gridData[m][n] + Math.min(costFromAbove, costFromLeft);
    if (memo) {
      setMemo((prevMemo) => {
        const newMemo = [...prevMemo!];
        newMemo[m][n] = memoizedValue;
        return newMemo;
      });

      // Mark the current cell as memoized and show the red border while processing
      setGrid((prevGrid) =>
        prevGrid!.map((row, rowIndex) =>
          row.map((cell) =>
            rowIndex === m && cell.x === n
              ? {
                  ...cell,
                  memoized: true,
                  fromMemo: false,
                  memoValue: memoizedValue,
                } // Store the memoized value for display
              : cell
          )
        )
      );

      // Add delay to visualize memoization step for each cell individually
      await new Promise((resolve) => setTimeout(resolve, speed));

      // Remove the red border after memoization
      setCurrentCell(null);
    }

    // When we reach the last cell, update the minimum sum and mark the last cell as final (green)
    if (m === gridData.length - 1 && n === gridData[0].length - 1) {
      setMinSum(memoizedValue);
      setGrid((prevGrid) =>
        prevGrid!.map((row, rowIndex) =>
          row.map((cell) =>
            rowIndex === m && cell.x === n
              ? {
                  ...cell,
                  isFinal: true, // Mark the last cell as final
                }
              : cell
          )
        )
      );
    }

    return memoizedValue;
  };

  const startAlgorithm = () => {
    setIsRunning(true);
    setMinSum(Number.MAX_SAFE_INTEGER); // Reset minimum sum
    setVisitedCellsCount(0); // Reset visited cells count
    gridTravelerMemo(gridData.length - 1, gridData[0].length - 1, 0).then(() =>
      setIsRunning(false)
    ); // Start from bottom-right corner
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl mb-4">GridTraveler Memoization Visualization</h1>

      {/* Display current cumulative cost, minimum path sum, and visited cells count */}
      <div className="flex space-x-4 mb-4">
        <div>{/* <strong>Current Path Cost:</strong> {currentCost} */}</div>
        <div>
          <strong>Minimum Path Sum to Last Cell:</strong>{" "}
          {minSum === Number.MAX_SAFE_INTEGER ? "Not Found" : minSum}
        </div>
        <div>
          <strong>Visited Cells:</strong> {visitedCellsCount}
        </div>
      </div>

      {grid ? (
        <div
          className="grid gap-1 mb-4"
          style={{
            gridTemplateColumns: `repeat(${gridData[0].length}, minmax(0, 1fr))`,
          }} // Dynamic grid columns
        >
          {grid.map((row, _rowIndex) =>
            row.map((cell) => (
              <div
                key={`${cell.x}-${cell.y}`}
                style={{ width: `${fieldSize}px`, height: `${fieldSize}px` }} // Use inline styles for dynamic sizing
                className={`border flex items-center justify-center 
    ${cell.isFinal ? "bg-green-300" : ""} /* Mark final cell green */
    ${cell.memoized ? "bg-blue-300" : "bg-gray-100"}
    ${cell.fromMemo ? "bg-orange-300" : ""}
    ${
      currentCell?.x === cell.x && currentCell?.y === cell.y
        ? "border-red-500 border-4"
        : "border-gray-400"
    }
  `}
              >
                <div className="text-center">
                  <p className="text-sm">
                    {cell.cost}
                    <br />
                    {cell.memoValue !== null ? (
                      <small>({cell.memoValue})</small>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <p>Loading grid...</p>
      )}

      <button
        className={`bg-blue-500 text-white px-4 py-2 rounded ${
          isRunning ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={startAlgorithm}
        disabled={isRunning}
      >
        {isRunning ? "Running..." : "Start"}
      </button>
      {/* Legend for the colors */}
      <div className="text-left">
        <p className="py-2 font-semibold">Legende:</p>
        <div className="text-left mb-4 flex max-w-[500px] justify-center">
          <div className="grid grid-cols-2 gap-1 w-[470px]">
            <div className="w-[220px]">
              <span className="inline-block w-4 h-4 bg-blue-300 mr-2"></span>
              Memoisierte Zelle
            </div>
            <div>
              <span className="inline-block w-4 h-4 bg-orange-300 mr-2"></span>
              Aus Memo abgerufene Zelle
            </div>
            <div>
              <span className="inline-block w-4 h-4 bg-green-300 mr-2"></span>
              Minimale Kosten
            </div>
            <div>
              <span className="inline-block w-4 h-4 border-4 border-red-500 mr-2"></span>
              Zelle in Bearbeitung
            </div>
            <div>
              <small>(Wert)</small> = Memoisierte Kosten
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridTravelerMemoVisualizer;
