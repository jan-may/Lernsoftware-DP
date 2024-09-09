// export const findPath = (grid: number[][]): [number, number][] => {
//   const m = grid.length;
//   const n = grid[0].length;

//   if (m === 0 || n === 0) return [];

//   const dp: number[][] = Array.from({ length: m }, () =>
//     Array(n).fill(Infinity)
//   );
//   const path: (number | null)[][] = Array.from({ length: m }, () =>
//     Array(n).fill(null)
//   );

//   dp[0][0] = grid[0][0];

//   for (let i = 0; i < m; i++) {
//     for (let j = 0; j < n; j++) {
//       if (i > 0 && dp[i][j] > dp[i - 1][j] + grid[i][j]) {
//         dp[i][j] = dp[i - 1][j] + grid[i][j];
//         path[i][j] = (i - 1) * n + j; // Store the index of the previous cell
//       }
//       if (j > 0 && dp[i][j] > dp[i][j - 1] + grid[i][j]) {
//         dp[i][j] = dp[i][j - 1] + grid[i][j];
//         path[i][j] = i * n + (j - 1); // Store the index of the previous cell
//       }
//     }
//   }

//   // Reconstruct path
//   const resultPath: [number, number][] = [];
//   let x = m - 1;
//   let y = n - 1;
//   while (x !== 0 || y !== 0) {
//     resultPath.push([x, y]);
//     const prevIndex = path[x][y];
//     if (prevIndex === null) break;
//     x = Math.floor(prevIndex / n);
//     y = prevIndex % n;
//   }
//   resultPath.push([0, 0]);
//   resultPath.reverse();

//   return resultPath;
// };

interface RecursiveStep {
  grid: number[][];
  path: [number, number][];
}

export const gridTravelerRecursive = (
  grid: number[][],
  m: number,
  n: number,
  steps: RecursiveStep[],
  path: [number, number][] = []
): number => {
  if (m < 0 || n < 0) return Infinity;
  if (m === 0 && n === 0) {
    path.push([0, 0]);
    steps.push({ grid: JSON.parse(JSON.stringify(grid)), path: [...path] });
    return grid[0][0];
  }

  let costFromAbove = Infinity;
  let costFromLeft = Infinity;

  if (m > 0) {
    costFromAbove = gridTravelerRecursive(grid, m - 1, n, steps, [
      ...path,
      [m, n],
    ]);
  }
  if (n > 0) {
    costFromLeft = gridTravelerRecursive(grid, m, n - 1, steps, [
      ...path,
      [m, n],
    ]);
  }

  const minCost = grid[m][n] + Math.min(costFromAbove, costFromLeft);

  steps.push({
    grid: JSON.parse(JSON.stringify(grid)),
    path: [...path, [m, n]],
  });

  return minCost;
};
