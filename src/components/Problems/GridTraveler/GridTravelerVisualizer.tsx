import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { Button } from "../../../components/ui/button";
import { useTheme } from "../../../components/theme-provider";

interface Cell {
  x: number;
  y: number;
  cost: number;
  onCurrentPath: boolean; // Track if the cell is part of the current path
  visited: boolean; // Track if the cell has already been visited
}

interface GridTravelerProps {
  gridData: number[][]; // Accept a predefined grid
}

const GridTravelerVisualizer: React.FC<GridTravelerProps> = ({ gridData }) => {
  const { speed, fieldSize } = useAppSelector((store) => store.settings);
  const [grid, setGrid] = useState<Cell[][] | null>(null);
  const [currentCell, setCurrentCell] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [currentCost, setCurrentCost] = useState<number>(0);
  const [minSum, setMinSum] = useState<number>(Number.MAX_SAFE_INTEGER); // Minimum sum found so far
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [visitedCellsCount, setVisitedCellsCount] = useState<number>(0); // Track how many cells have been visited
  const { theme } = useTheme();

  const currentColor = theme === "light" ? "bg-green-300" : "bg-green-400";

  useEffect(() => {
    // Initialize grid from the provided gridData
    const initialGrid: Cell[][] = gridData.map((row, rowIndex) =>
      row.map((cost, colIndex) => ({
        x: colIndex,
        y: rowIndex,
        cost,
        onCurrentPath: false, // Track if the cell is part of the current path
        visited: false, // Track if the cell has already been visited
      }))
    );
    setGrid(initialGrid);
  }, [gridData]);

  const recursiveGridTraveler = async (
    m: number,
    n: number,
    cumulativeCost: number
  ): Promise<number> => {
    if (m < 0 || n < 0) {
      return Number.MAX_SAFE_INTEGER; // Out of bounds
    }

    // Set the current cell being visited and current cumulative cost
    setCurrentCell({ x: n, y: m });
    setCurrentCost(cumulativeCost + gridData[m][n]);

    // Mark this cell as part of the current path if not visited before and increment visited cells count
    if (grid && !grid[m][n].visited) {
      setVisitedCellsCount((prevCount) => prevCount + 1); // Increment visited cells count
      setGrid((prevGrid) =>
        prevGrid!.map((row, _rowIndex) =>
          row.map((cell) => {
            if (cell.x === n && cell.y === m) {
              return { ...cell, onCurrentPath: true, visited: true }; // Mark as visited
            }
            return cell;
          })
        )
      );
    }

    // Add a delay to visualize the steps
    await new Promise((resolve) => setTimeout(resolve, speed));

    if (m === 0 && n === 0) {
      const finalCost = cumulativeCost + gridData[m][n];
      setMinSum((prevMin) => Math.min(prevMin, finalCost)); // Update min sum if we found a smaller one

      // Mark the last cell as no longer on the current path once it's visited
      setGrid((prevGrid) =>
        prevGrid!.map((row) =>
          row.map((cell) =>
            cell.x === n && cell.y === m
              ? { ...cell, onCurrentPath: false }
              : cell
          )
        )
      );

      return gridData[m][n]; // Reached top-left corner, return the cost at this cell
    }

    const costAbove = await recursiveGridTraveler(
      m - 1,
      n,
      cumulativeCost + gridData[m][n]
    ); // Move up
    const costLeft = await recursiveGridTraveler(
      m,
      n - 1,
      cumulativeCost + gridData[m][n]
    ); // Move left

    // After recursion, mark the cell as no longer part of the current path
    setGrid((prevGrid) =>
      prevGrid!.map((row) =>
        row.map((cell) =>
          cell.x === n && cell.y === m
            ? { ...cell, onCurrentPath: false }
            : cell
        )
      )
    );

    return gridData[m][n] + Math.min(costAbove, costLeft);
  };

  const startAlgorithm = () => {
    setIsRunning(true);
    setMinSum(Number.MAX_SAFE_INTEGER); // Reset minimum sum
    setVisitedCellsCount(0); // Reset visited cells count
    recursiveGridTraveler(gridData.length - 1, gridData[0].length - 1, 0).then(
      () => setIsRunning(false)
    );
  };

  return (
    <div className="flex flex-col items-center">
      {/* Display current cumulative cost, minimum path sum, and visited cells count */}
      <div className="flex space-x-4 mb-4 mt-4">
        <div>
          <strong>Aktuelle Pfadkosten:</strong> {currentCost}
        </div>
        <div>
          <strong>Bisherige min. Pfadkosten:</strong>{" "}
          {minSum === Number.MAX_SAFE_INTEGER ? "N/A" : minSum}
        </div>
        <div>
          <strong>Besuchte Zellen:</strong> {visitedCellsCount}
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
                ${
                  cell.onCurrentPath
                    ? currentColor
                    : theme === "light"
                    ? "bg-gray-100"
                    : "bg-gray-800"
                }
                ${
                  currentCell.x === cell.x && currentCell.y === cell.y
                    ? "border-red-500 border-4"
                    : "border-gray-400"
                }
                `}
              >
                <div className="text-center">
                  <p className="text-sm">{cell.cost}</p>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <p>Loading grid...</p>
      )}

      <Button
        className={`bg-blue-500 text-white px-4 py-2 rounded ${
          isRunning ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={startAlgorithm}
        disabled={isRunning}
      >
        {isRunning ? "Running..." : "Start"}
      </Button>
      {/* Legend for the colors */}
      <div className="text-left">
        <p className="py-2 font-semibold text-sm">Legende:</p>
        <div className="text-left mb-4 flex max-w-[500px] justify-center">
          <div className="grid grid-cols-2 gap-2 w-[470px]">
            <div>
              <span
                className={`inline-block w-4 h-4 ${currentColor} mr-2`}
              ></span>
              Aktueller Pfad
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

export default GridTravelerVisualizer;
