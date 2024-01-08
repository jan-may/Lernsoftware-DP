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
  TreeHelper.shiftTree(tree, 1);
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
  TreeHelper.shiftTree(array[n], 1);
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

export const fibCode = `public static int Fib(int n)
{
  if (n <= 1) return n;
  return Fib(n - 1) + Fib(n - 2);
}`;

export const fibMemoCode = `public static int Fib(int n)
{
  int[] memo = new int[n + 1];
  return Fib(n, memo);
}
  
private static int Fib(int n, int[] memo)
{
  if (n <= 1) return n;
  if (memo[n] != 0) return memo[n];
  memo[n] = Fib(n - 1, memo) + Fib(n - 2, memo);
  return memo[n];
}`;

export const fibTabCode = `public static int Fib(int n)
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
}`;
