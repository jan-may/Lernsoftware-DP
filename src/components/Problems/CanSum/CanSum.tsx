export function createFibonacciTab(n: number): number[] {
  const array = new Array(n + 1).fill(0);
  array[0] = 0;
  array[1] = 1;
  for (let i = 2; i <= n; i++) {
    array[i] = array[i - 1] + array[i - 2];
  }
  return array;
}

export const canSumCode = `public bool CanSumRec(int targetSum, int[] numbers)
{
    if (targetSum == 0) return true;
    if (targetSum < 0) return false;

    foreach (int num in numbers)
    {
        int remainder = targetSum - num;
        if (CanSumRec(remainder, numbers))
        {
            return true;
        }
    }

    return false;
}
`;

export const canSumMemoCode = `public bool CanSumMemo(int targetSum, int[] numbers, Dictionary<int, bool> memo = null)
{
    if (memo == null)
        memo = new Dictionary<int, bool>();

    if (memo.ContainsKey(targetSum)) return memo[targetSum];
    if (targetSum == 0) return true;
    if (targetSum < 0) return false;

    foreach (int num in numbers)
    {
        int remainder = targetSum - num;
        if (CanSumMemo(remainder, numbers, memo))
        {
            memo[targetSum] = true;
            return true;
        }
    }

    memo[targetSum] = false;
    return false;
}
`;

export const canSumTabCode = `public bool CanSumTab(int targetSum, int[] numbers)
{
    bool[] table = new bool[targetSum + 1];
    table[0] = true;

    for (int i = 0; i <= targetSum; i++)
    {
        if (table[i])
        {
            foreach (int num in numbers)
            {
                if (i + num <= targetSum)
                {
                    table[i + num] = true;
                }
            }
        }
    }
    return table[targetSum];
}
`;

export const canSumCsCode = `public class CanSum
{
  public bool CanSumRec(int targetSum, int[] numbers) {return false;} //recursive

  public bool CanSumMemo(int targetSum, int[] numbers, Dictionary<int, bool> memo = null) {return false;} //top-down with memoization

  public bool CanSumTab(int targetSum, int[] numbers) {return false;} //bottom-up with tabulation
}`;

export const canSumTestCases = `

class Tests
{
    public static void Main(string[] args)
    {
        CanSum canSum = new CanSum();
        int[][][] testCases = new int[][][]
        {
            // { { set of numbers }, targetSum, expectedResult (1 for true, 0 for false) }
            new int[][] { new int[] {2, 3}, new int[] {7}, new int[] {1} }, // Can sum to 7 using 2+2+3
            new int[][] { new int[] {5, 3, 4, 7}, new int[] {7}, new int[] {1} }, // Can sum to 7 using 7
            new int[][] { new int[] {2, 4}, new int[] {7}, new int[] {0} }, // Cannot sum to 7
            new int[][] { new int[] {2, 3, 5}, new int[] {8}, new int[] {1} }, // Can sum to 8 using 3+5
            new int[][] { new int[] {1, 2, 5}, new int[] {11}, new int[] {1} }, // Can sum to 11 using 5+5+1
            new int[][] { new int[] {1, 5, 10, 25}, new int[] {100}, new int[] {1} }, // Can sum to 100 using coins
            new int[][] { new int[] {7, 14}, new int[] {300}, new int[] {0} }, // Cannot sum to 300
        };

        Console.WriteLine();
        Console.WriteLine(String.Format("{0,-14} {1,-25} {2,-12} {3,-11} {4,-8} {5,-10}", "Debug_tag", "Input", "Expected", "Actual", "Status", "Elapsed Time"));
        Console.WriteLine(new String('-', 80));

        int start = Environment.TickCount;
        int failed = 0;

        // Testing CanSumRec method
        foreach (var testCase in testCases)
        {
            int[] numbers = testCase[0];
            int targetSum = testCase[1][0];
            bool expected = testCase[2][0] == 1;
            int now = Environment.TickCount;
            
            if (targetSum <= 100) // The recursive method is practical only for n <= 100
            {
              bool actual = canSum.CanSumRec(targetSum, numbers);
              int elapsed = Environment.TickCount - now;
              if (elapsed > 400 || actual != expected) failed++;
              Console.WriteLine(String.Format("{0,13} {1,-25} {2,-12} {3,-11} {4,-8} {5,-10}", "--TestBegin-- ", "CanSumRec(" + targetSum + ")", expected, actual, (actual == expected ? elapsed <= 400 ? "passed" : "failed" : "failed"), (elapsed + "ms" + (elapsed > 400 ? " -> Time Limit exceeded" : ""))));
            }
        }

        // Testing CanSumMemo method
        foreach (var testCase in testCases)
        {
            int[] numbers = testCase[0];
            int targetSum = testCase[1][0];
            bool expected = testCase[2][0] == 1;
            int now = Environment.TickCount;

            bool actual = canSum.CanSumMemo(targetSum, numbers, new Dictionary<int, bool>());
            int elapsed = Environment.TickCount - now;
            if (elapsed > 400 || actual != expected) failed++;
            Console.WriteLine(String.Format("{0,13} {1,-25} {2,-12} {3,-11} {4,-8} {5,-10}", "--TestBegin-- ", "CanSumMemo(" + targetSum + ")", expected, actual, (actual == expected ? elapsed <= 400 ? "passed" : "failed" : "failed"), (elapsed + "ms" + (elapsed > 400 ? " -> Time Limit exceeded" : ""))));
              
        }

        // Testing canSumTab method
        foreach (var testCase in testCases)
        {
            int[] numbers = testCase[0];
            int targetSum = testCase[1][0];
            bool expected = testCase[2][0] == 1;
            int now = Environment.TickCount;

            bool actual = canSum.CanSumTab(targetSum, numbers);
            int elapsed = Environment.TickCount - now;
            if (elapsed > 400 || actual != expected) failed++;
            Console.WriteLine(String.Format("{0,13} {1,-25} {2,-12} {3,-11} {4,-8} {5,-10}", "--TestBegin-- ", "CanSumTab(" + targetSum + ")", expected, actual, (actual == expected ? elapsed <= 400 ? "passed" : "failed" : "failed"), (elapsed + "ms" + (elapsed > 400 ? " -> Time Limit exceeded" : ""))));
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
