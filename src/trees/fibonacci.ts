import { TreeHelper } from "../TreeBuilder/TreeHelper";
import { TreeNodeModel } from "../TreeBuilder/TreeNodeModel";

function buildFibonacciTree(
  n: number,
  parent?: TreeNodeModel<number>
): TreeNodeModel<number> {
  const node = new TreeNodeModel(n, parent);

  if (n >= 2) {
    node.children.push(buildFibonacciTree(n - 1, node));
    node.children.push(buildFibonacciTree(n - 2, node));
  }
  return node;
}

export function createFibonacciTree(input: number) {
  const tree = buildFibonacciTree(input);
  TreeHelper.calculateNodePositions(tree);
  input <= 5
    ? TreeHelper.shiftTree(tree, 0.5)
    : TreeHelper.shiftTree(tree, 0.25);
  return tree;
}

// simulate memoization
export function createFibonacciTreeMemo(n: number): TreeNodeModel<number> {
  const array = new Array(n * 2).fill(0);
  const root = new TreeNodeModel<number>(n);
  array[n] = root;
  array[n + 1] = new TreeNodeModel<number>(n - 1, array[n]);
  array[n + 2] = new TreeNodeModel<number>(n - 2, array[n]);
  array[n + 2].isMemo = true;
  array[n].children.push(array[n + 1], array[n + 2]);

  for (let i = 3, j = 2; i < n * 2 - 2; i += 2, j++) {
    array[n + i] = new TreeNodeModel<number>(n - j, array[n + i - 2]);
    array[n + i + 1] = new TreeNodeModel<number>(n - (j + 1), array[n + i - 2]);
    array[n + i + 1].isMemo = true;
    array[n + i - 2].children.push(array[n + i], array[n + i + 1]);
  }
  TreeHelper.calculateNodePositions(array[n]);
  n <= 5
    ? TreeHelper.shiftTree(array[n], 1)
    : TreeHelper.shiftTree(array[n], 0.2);
  return array[n];
}

export function createFibonacciTab(n: number): number[] {
  const array = new Array(n + 1).fill(0);
  array[0] = 0;
  array[1] = 1;
  for (let i = 2; i <= n; i++) {
    array[i] = array[i - 1] + array[i - 2];
  }
  return array;
}

export const fibCode = `public class Fibonacci
{
  public int Fib(int n)
  {
    if (n <= 1) return n;
    return Fib(n - 1) + Fib(n - 2);
  }
}`;

export const fibMemoCode = `public class Fibonacci
{
  public int FibMemo(int n, int[] memo)
  {
    if (memo[n] != 0) return memo[n];
    if (n <= 1) return n;
    {
        memo[n] = FibMemo(n - 1, memo) + FibMemo(n - 2, memo);
        return memo[n];
    }
  }
}`;

export const fibTabCode = `public class Fibonacci
{
  public int FibTab(int n)
  {
    if (n <= 1) return n;
    int[] table = new int[n + 1];
    table[0] = 0;
    table[1] = 1;
    for (int i = 2; i <= n; i++)
    {
      table[i] = table[i - 1] + table[i - 2];
    }
      return table[n];
  }
}`;

export const fibonacciDefinition = `F(n) = 
\\begin{cases} 
0 & \\text{if } n = 0 \\\\
1 & \\text{if } n = 1 \\\\
F(n-1) + F(n-2) & \\text{if } n > 1 
\\end{cases}`;

export const fibCsCode = `public class Fibonacci
{
  public int Fib(int n) {return -1;} //recursive

  public int FibMemo(int n, int[] memo){return -1;} //top-down with memoization

  public int FibTab(int n) {return -1;} //bottom-up with tabulation
}`;

export const testCases = `

class Tests
{
    public static void Main(string[] args)
    {
        Fibonacci fibonacci = new Fibonacci();
        int[][] testCases = new int[][]
        {
            new int[] {0, 0},
            new int[] {1, 1},
            new int[] {2, 1},
            new int[] {5, 5},
            new int[] {10, 55},
            new int[] {20, 6765},
            new int[] {30, 832040},
            new int[] {40, 102334155},
            new int[] {46, 1836311903} // max for int
        };

        // Testing fib method
        foreach (var testCase in testCases)
        {
            int n = testCase[0];
            int expected = testCase[1];

            if (n <= 20) // The recursive method is practical only for n <= 20
            {
                int actual = fibonacci.Fib(n);
                Console.WriteLine($"Fib({n}) {expected} {actual} {(actual == expected ? "passed" : "failed")}");
            }
        }

        // Testing fibMemo method
        foreach (var testCase in testCases)
        {
            int n = testCase[0];
            int expected = testCase[1];
            int actual = fibonacci.FibMemo(n, new int[n + 1]);
            Console.WriteLine($"FibMemo({n}) {expected} {actual} {(actual == expected ? "passed" : "failed")}");
        }

        // Testing fibTab method
        foreach (var testCase in testCases)
        {
            int n = testCase[0];
            int expected = testCase[1];
            int actual = fibonacci.FibTab(n);
            Console.WriteLine($"FibTab({n}) {expected} {actual} {(actual == expected ? "passed" : "failed")}");
        }
    }
}`;
