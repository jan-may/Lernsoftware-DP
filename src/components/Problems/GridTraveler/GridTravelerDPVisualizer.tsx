import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { Button } from "../../../components/ui/button";

interface Cell {
  x: number;
  y: number;
  cost: number;
  dpValue: number | null; // DP table value
}

interface GridTravelerDPProps {
  gridData: number[][]; // Accept a predefined grid
}

const GridTravelerDPVisualizer: React.FC<GridTravelerDPProps> = ({
  gridData,
}) => {
  const { speed, fieldSize } = useAppSelector((store) => store.settings);
  const [grid, setGrid] = useState<Cell[][] | null>(null);
  const [dp, setDp] = useState<number[][] | null>(null); // DP table
  const [currentCell, setCurrentCell] = useState<{
    x: number;
    y: number;
  } | null>(null); // Currently calculated cell
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [comparingCells, setComparingCells] = useState<{
    top: { x: number; y: number } | null;
    left: { x: number; y: number } | null;
  }>({
    top: null,
    left: null,
  });
  const [stepsTaken, setStepsTaken] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [hideRedCell, setHideRedCell] = useState<boolean>(false);

  const setUpGrid = () => {
    const initialGrid: Cell[][] = gridData.map((row, rowIndex) =>
      row.map((cost, colIndex) => ({
        x: colIndex,
        y: rowIndex,
        cost,
        dpValue: null, // Initially DP values are null
      }))
    );
    const initialDp: number[][] = Array.from({ length: gridData.length }, () =>
      Array(gridData[0].length).fill(null)
    );

    setGrid(initialGrid);
    setDp(initialDp);
    setStepsTaken(0); // Reset step counter
    setIsFinished(false); // Reset finished state
  };

  useEffect(() => {
    setUpGrid();
  }, [gridData]);

  const fillDpTable = async () => {
    if (!grid || !dp) return;

    const dpTable = [...dp];
    dpTable[0][0] = gridData[0][0];
    setCurrentCell({ x: 0, y: 0 });
    setStepsTaken((prev) => prev + 1); // Increment steps counter
    setDp(dpTable);
    setGrid((prevGrid) =>
      prevGrid!.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          rowIndex === 0 && colIndex === 0
            ? { ...cell, dpValue: gridData[0][0] }
            : cell
        )
      )
    );
    await new Promise((resolve) => setTimeout(resolve, speed));

    // Fill the first column (dp[i][0])
    for (let i = 1; i < gridData.length; i++) {
      dpTable[i][0] = dpTable[i - 1][0] + gridData[i][0];
      setCurrentCell({ x: 0, y: i });
      setStepsTaken((prev) => prev + 1);
      setDp(dpTable);
      setGrid((prevGrid) =>
        prevGrid!.map((row, rowIndex) =>
          row.map((cell, colIndex) =>
            rowIndex === i && colIndex === 0
              ? { ...cell, dpValue: dpTable[i][0] }
              : cell
          )
        )
      );
      await new Promise((resolve) => setTimeout(resolve, speed));
    }

    // Fill the first row (dp[0][j])
    for (let j = 1; j < gridData[0].length; j++) {
      dpTable[0][j] = dpTable[0][j - 1] + gridData[0][j];
      setCurrentCell({ x: j, y: 0 });
      setStepsTaken((prev) => prev + 1);
      setDp(dpTable);
      setGrid((prevGrid) =>
        prevGrid!.map((row, rowIndex) =>
          row.map((cell, colIndex) =>
            rowIndex === 0 && colIndex === j
              ? { ...cell, dpValue: dpTable[0][j] }
              : cell
          )
        )
      );
      await new Promise((resolve) => setTimeout(resolve, speed));
    }

    // Fill the rest of the DP table
    for (let i = 1; i < gridData.length; i++) {
      for (let j = 1; j < gridData[0].length; j++) {
        setComparingCells({
          top: { x: j, y: i - 1 },
          left: { x: j - 1, y: i },
        });
        setHideRedCell(true);
        await new Promise((resolve) => setTimeout(resolve, speed * 2)); // Show comparison step

        // Now calculate and assign the DP value
        setHideRedCell(false);
        dpTable[i][j] =
          gridData[i][j] + Math.min(dpTable[i - 1][j], dpTable[i][j - 1]);
        setComparingCells({ top: null, left: null }); // Reset comparison highlights
        setCurrentCell({ x: j, y: i });
        setStepsTaken((prev) => prev + 1); // Increment steps counter
        setDp(dpTable);

        setGrid((prevGrid) =>
          prevGrid!.map((row, rowIndex) =>
            row.map((cell, colIndex) =>
              rowIndex === i && colIndex === j
                ? { ...cell, dpValue: dpTable[i][j] }
                : cell
            )
          )
        );
        await new Promise((resolve) => setTimeout(resolve, speed)); // Delay to visualize the DP value filling
      }
    }

    // Mark the last cell (bottom-right) green
    setGrid((prevGrid) =>
      prevGrid!.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          rowIndex === gridData.length - 1 &&
          colIndex === gridData[0].length - 1
            ? {
                ...cell,
                dpValue: dpTable[gridData.length - 1][gridData[0].length - 1],
              }
            : cell
        )
      )
    );

    setCurrentCell(null); // Reset current cell after the entire process
    setIsFinished(true); // Mark algorithm as finished
    setIsRunning(false); // Mark the algorithm as finished
  };

  const startAlgorithm = () => {
    // Reset Grid and DP table
    setUpGrid();
    setStepsTaken(0);
    // reset color
    setComparingCells({ top: null, left: null });
    setIsRunning(true);
    fillDpTable();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-4 my-4">
        {/* Display number of steps taken */}
        <div className="mb-4">
          <strong>Minimale Pfadkosten:</strong>{" "}
          {isFinished
            ? dp![gridData.length - 1][gridData[0].length - 1]
            : "N/A"}
        </div>
        <div className="mb-4">
          <strong>Iterationen:</strong> {stepsTaken}
        </div>
      </div>
      {grid ? (
        <div
          className="grid gap-1 mb-4"
          style={{
            gridTemplateColumns: `repeat(${gridData[0].length}, minmax(0, 1fr))`,
          }} // Dynamic grid columns
        >
          {grid.map((row, rowIndex) =>
            row.map((cell) => (
              <div
                key={`${cell.x}-${cell.y}`}
                style={{ width: `${fieldSize}px`, height: `${fieldSize}px` }} // Use inline styles for dynamic sizing
                className={`border flex items-center justify-center 
    ${
      isFinished &&
      rowIndex === gridData.length - 1 &&
      cell.x === gridData[0].length - 1
        ? "bg-green-300"
        : ""
    }
    ${
      currentCell?.x === cell.x && currentCell?.y === cell.y && !hideRedCell
        ? "border-red-500 border-4"
        : "border-gray-400"
    }
    ${
      comparingCells.top?.x === cell.x && comparingCells.top?.y === cell.y
        ? "bg-yellow-300"
        : ""
    }
    ${
      comparingCells.left?.x === cell.x && comparingCells.left?.y === cell.y
        ? "bg-purple-300"
        : ""
    }
    ${cell.dpValue !== null ? "bg-blue-300" : "bg-gray-100"}
  `}
              >
                <div className="text-center">
                  <p className="text-sm">
                    {cell.dpValue !== null ? cell.dpValue : cell.cost}
                  </p>
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
      <div className="text-left ">
        <p className="py-2 font-semibold text-sm">Legende:</p>
        <div className="text-left mb-4">
          <div className="grid grid-cols-2 gap-1 w-[470px]">
            <div>
              <span className="inline-block w-4 h-4 bg-purple-300 mr-2"></span>
              Zelle 1 für Vergleich
            </div>
            <div>
              <span className="inline-block w-4 h-4 bg-yellow-300 mr-2"></span>
              Zelle 2 für Vergleich
            </div>
            <div>
              <span className="inline-block w-4 h-4 bg-blue-500 mr-2"></span>
              bereits berechnete Zelle
            </div>
            <div>
              <span className="inline-block w-4 h-4 border-4 border-red-500 mr-2"></span>
              Zelle in Bearbeitung
            </div>
            <div>
              <span className="inline-block w-4 h-4 bg-green-300 mr-2"></span>
              Ergebnis
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridTravelerDPVisualizer;
