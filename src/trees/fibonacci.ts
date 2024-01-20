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

export const fibCode = `public class FibonacciCalculator
{
  public int fib(int n)
  {
    if (n <= 1) return n;
    return Fib(n - 1) + Fib(n - 2);
  }
}`;

export const fibMemoCode = `public class FibonacciCalculator
{
  public int fibMemo(int n, int[] memo)
  {
    if (memo[n] != 0) return memo[n];
    if (n <= 1) return n;
    {
        memo[n] = FibMemo(n - 1, memo) + FibMemo(n - 2, memo);
        return memo[n];
    }
  }
}`;

export const fibTabCode = `public class FibonacciCalculator
{
  public int fibTab(int n)
  {
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

export const aufgabeCode = `public class FibonacciCalculator
{
  public int fib(int n) {} //recursive
  public int fibMemo(int n, int[] memo){} //top-down with memoization
  public int fibTab(int n) {} //bottom-up with tabulation
}`;

export const fibUnitTests = `using NUnit.Framework;

[TestFixture]
public class FibonacciCalculatorTests
{
    [Test]
    public void Fib_WithZero_ShouldReturnZero()
    {
        Assert.AreEqual(0, FibonacciCalculator.Fib(0));
    }

    [Test]
    public void Fib_WithOne_ShouldReturnOne()
    {
        Assert.AreEqual(1, FibonacciCalculator.Fib(1));
    }

    [Test]
    public void Fib_WithPositiveNumber_ShouldReturnCorrectValue()
    {
        Assert.AreEqual(1, FibonacciCalculator.Fib(2));
        Assert.AreEqual(2, FibonacciCalculator.Fib(3));
        Assert.AreEqual(5, FibonacciCalculator.Fib(5));
        Assert.AreEqual(8, FibonacciCalculator.Fib(6));
        Assert.AreEqual(610 ,FibonacciCalculator.Fib(15));
        Assert.AreEqual(75025 ,FibonacciCalculator.Fib(25));
    }

    [Test]
    public void Fib_WithNegativeNumber_ShouldHandleAccordingly(int input)
    {
      if (input < 0)
      {
          Assert.Catch(() => FibonacciCalculator.Fib(input), "Exception was not thrown for negative input.");
      }
    }
}`;
