export function createFibonacciTab(n: number): number[] {
  const array = new Array(n + 1).fill(0);
  array[0] = 0;
  array[1] = 1;
  for (let i = 2; i <= n; i++) {
    array[i] = array[i - 1] + array[i - 2];
  }
  return array;
}

export const gridTravelerCode = `public int GridTravel(int[,] grid, int m, int n)
{
    if (m == 0 && n == 0)
        return grid[0, 0];

    if (m < 0 || n < 0)
        return int.MaxValue;

    int costAbove = GridTravel(grid, m - 1, n);
    int costLeft = GridTravel(grid, m, n - 1);

    return grid[m, n] + Math.Min(costAbove, costLeft);
}`;

export const gridTravelerMemoCode = `private static int GridTravelMemo(int[,] grid, int m, int n,
  int[,] memo)
{

    if (m == 0 && n == 0) return grid[0, 0];
    if (m < 0 || n < 0) return int.MaxValue;
    if (memo[m, n] != -1)
        return memo[m, n];

    int costFromAbove = GridTravelMemo(grid, m - 1, n, memo);
    int costFromLeft = GridTravelMemo(grid, m, n - 1, memo);

    memo[m, n] = grid[m, n] + Math.Min(costFromAbove,
      costFromLeft);

    return memo[m, n];
}

public static int MinCost(int[,] grid, int m, int n)
{
    int[,] memo = new int[m + 1, n + 1];
    for (int i = 0; i <= m; i++)
        for (int j = 0; j <= n; j++)
            memo[i, j] = -1;

    return GridTravelMemo(grid, m, n, memo);
}`;

export const gridTravelerTabCode = `public static int gridTravelerTab(int[,] grid, int m, int n)
{
    int[,] dp = new int[m + 1, n + 1];
    dp[0, 0] = grid[0, 0];

    for (int i = 1; i <= m; i++)
        dp[i, 0] = dp[i - 1, 0] + grid[i, 0];

    for (int j = 1; j <= n; j++)
        dp[0, j] = dp[0, j - 1] + grid[0, j];

    for (int i = 1; i <= m; i++)
    {
        for (int j = 1; j <= n; j++)
        {
            dp[i, j] = grid[i, j] + Math.Min(dp[i - 1, j],
            dp[i, j - 1]);
        }
    }

    return dp[m, n];
}`;

export const travelerCsCode = `public class GridTraveler
{
  public int GridTravel(int[,] grid, int m, int n) {return -1;} //recursive

  private static int GridTravelMemo(int[,] grid, int m, int n, int[,] memo) 
  { return -1;}

  // Helper method for GridTravelMemo
  public static int MinCost(int[,] grid, int m, int n)
  {
    int[,] memo = new int[m + 1, n + 1];
    for (int i = 0; i <= m; i++)
        for (int j = 0; j <= n; j++)
            memo[i, j] = -1;
    return GridTravelMemo(grid, m, n, memo);
  }

  public static int gridTravelerTab(int[,] grid, int m, int n) {return -1;} //bottom-up with tabulation
}`;

export const travelerTestCases = `

class Tests
{
    public static void Main(string[] args)
    {
        GridTraveler gridTraveler = new GridTraveler();

        // Test cases (just examples, not intended to work immediately)
        int[][,] testCases = new int[][,]
        {
            new int[,] { { 1 } }, // 1x1 grid
            new int[,] { { 1, 2 }, { 1, 3 } }, // 2x2 grid
            new int[,] { { 1, 3, 1 }, { 1, 5, 1 }, { 4, 2, 1 } }, // 3x3 grid
            new int[,] { { 1, 2, 5 }, { 3, 2, 1 }, { 4, 3, 2 }, { 2, 1, 5 } }, // 4x3 grid
            new int[,] { { 2, 4, 1, 3 }, { 3, 2, 1, 6 }, { 8, 1, 1, 4 }, { 1, 5, 2, 7 } } // 4x4 grid
        };

        int[,] expectedCosts = new int[,]
        {
            { 1 }, // Expected cost for 1x1 grid
            { 5 }, // Expected cost for 2x2 grid
            { 7 }, // Expected cost for 3x3 grid
            { 13 }, // Expected cost for 4x3 grid
            { 18 } // Expected cost for 4x4 grid
        };

        Console.WriteLine();
        Console.WriteLine(String.Format("{0,-14} {1,-25} {2,-12} {3,-11} {4,-8} {5,-10}", "Debug_tag", "Input", "Expected", "Actual", "Status", "Elapsed Time"));
        Console.WriteLine(new String('-', 80));

        int start = Environment.TickCount;
        int failed = 0;

        // Test recursive GridTravel method
        for (int i = 0; i < testCases.Length; i++)
        {
            var grid = testCases[i];
            int m = grid.GetLength(0) - 1;
            int n = grid.GetLength(1) - 1;
            int expected = expectedCosts[i, 0];

            int now = Environment.TickCount;
            int actual = gridTraveler.GridTravel(grid, m, n);
            int elapsed = Environment.TickCount - now;

            if (elapsed > 400 || actual != expected) failed++;
            Console.WriteLine(String.Format("{0,13} {1,-25} {2,-12} {3,-11} {4,-8} {5,-10}", "--TestBegin-- ", $"GridTravel(Grid#{i+1})", expected, actual, (actual == expected ? elapsed <= 400 ? "passed" : "failed" : "failed"), (elapsed + "ms" + (elapsed > 400 ? " -> Time Limit exceeded" : ""))));
        }

        // Test memoized GridTravelMemo method
        for (int i = 0; i < testCases.Length; i++)
        {
            var grid = testCases[i];
            int m = grid.GetLength(0) - 1;
            int n = grid.GetLength(1) - 1;
            int expected = expectedCosts[i, 0];

            int now = Environment.TickCount;
            int actual = GridTraveler.MinCost(grid, m, n);
            int elapsed = Environment.TickCount - now;

            if (elapsed > 400 || actual != expected) failed++;
            Console.WriteLine(String.Format("{0,13} {1,-25} {2,-12} {3,-11} {4,-8} {5,-10}", "--TestBegin-- ", $"GridTravel(Grid#{i+1})", expected, actual, (actual == expected ? elapsed <= 400 ? "passed" : "failed" : "failed"), (elapsed + "ms" + (elapsed > 400 ? " -> Time Limit exceeded" : ""))));
        }

        // Test tabulated GridTravelTab method
        for (int i = 0; i < testCases.Length; i++)
        {
            var grid = testCases[i];
            int m = grid.GetLength(0) - 1;
            int n = grid.GetLength(1) - 1;
            int expected = expectedCosts[i, 0];

            int now = Environment.TickCount;
            int actual = GridTraveler.gridTravelerTab(grid, m, n);
            int elapsed = Environment.TickCount - now;

            if (elapsed > 400 || actual != expected) failed++;
            Console.WriteLine(String.Format("{0,13} {1,-25} {2,-12} {3,-11} {4,-8} {5,-10}", "--TestBegin-- ", $"GridTravel(Grid#{i+1})", expected, actual, (actual == expected ? elapsed <= 400 ? "passed" : "failed" : "failed"), (elapsed + "ms" + (elapsed > 400 ? " -> Time Limit exceeded" : ""))));
        }

        int elapsedAll = Environment.TickCount - start;
        Console.WriteLine();
        Console.WriteLine($"--TotalTime-- {elapsedAll}ms");
        Console.WriteLine();

        if (failed == 0) Console.WriteLine("All tests passed");
        else Console.WriteLine($"Failed {failed} tests");

        Console.WriteLine();
    }
}`;
