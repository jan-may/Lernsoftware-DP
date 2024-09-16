import { TreeHelper } from "../TreeBuilder/TreeHelper";
import { TreeNodeModel } from "../TreeBuilder/TreeNodeModel";

/**
 * Recursive function to build the CanSum tree.
 * @param targetSum The current target sum.
 * @param numbers The list of numbers that can be used to sum to the target.
 * @param parent Optional parent node to connect child nodes.
 * @returns TreeNodeModel<number> representing the root node of the CanSum tree.
 */
function buildCanSumTree(
  targetSum: number,
  numbers: number[],
  parent?: TreeNodeModel<number>
): TreeNodeModel<number> {
  const node = new TreeNodeModel(targetSum, parent);

  // Base case: targetSum is 0, which means we found a solution
  if (targetSum === 0) {
    return node;
  }

  // Base case: targetSum is less than 0, which means this path is invalid
  if (targetSum < 0) {
    return node; // Failure node, return it without children
  }

  // Recursive step: Subtract each number from the target sum and create child nodes
  numbers.forEach((num) => {
    const remainder = targetSum - num;
    const childNode = buildCanSumTree(remainder, numbers, node);
    node.children.push(childNode); // Add the child node to the tree
  });

  return node;
}

/**
 * Function to create the CanSum tree and calculate node positions for visualization.
 * @param targetSum The target sum to reach.
 * @param numbers The list of numbers available to sum to the target.
 * @returns TreeNodeModel<number> representing the root node of the CanSum tree.
 */
export function createCanSumTree(targetSum: number, numbers: number[]) {
  const tree = buildCanSumTree(targetSum, numbers);
  // Calculate node positions for visualization
  TreeHelper.calculateNodePositions(tree);
  // Adjust the tree spacing depending on the size of the input
  const numberOfNodes = tree.children;
  console.log(numberOfNodes);
  targetSum <= 5
    ? TreeHelper.shiftTree(tree, 0)
    : TreeHelper.shiftTree(tree, 0.25);
  return tree;
}

/**
 * Recursive function to build the CanSum tree with memoization.
 * @param targetSum The current target sum.
 * @param numbers The list of numbers that can be used to sum to the target.
 * @param parent Optional parent node to connect child nodes.
 * @param memo Memoization object to store computed results.
 * @param memoCount Object to track the number of memoized values.
 * @returns TreeNodeModel<number> representing the root node of the CanSum tree.
 */
const buildCanSumTreeMemo = (
  targetSum: number,
  numbers: number[],
  parent: TreeNodeModel<number> | null = null,
  memo: { [key: number]: boolean } = {},
  memoCount: { count: number } = { count: 0 }
): TreeNodeModel<number> => {
  const node = new TreeNodeModel<number>(targetSum, parent);

  // Base case: target sum is 0, mark it as a success
  if (targetSum === 0) {
    node.endNode = true; // Success node
    return node;
  }

  // Base case: target sum is negative, return failure node
  if (targetSum < 0) {
    return node; // Failure node, no need to memoize
  }

  // Check if the target sum has been computed before (memoization)
  if (memo[targetSum] !== undefined) {
    node.isMemo = true; // Mark node as memoized
    memoCount.count += 1; // Increment memoization count
    return node; // Return memoized node without creating more children
  }

  // Recursive step: Subtract each number and create child nodes
  numbers.forEach((num) => {
    const remainder = targetSum - num;
    const childNode = buildCanSumTreeMemo(
      remainder,
      numbers,
      node,
      memo,
      memoCount
    );
    node.children.push(childNode); // Add child node to the tree
  });

  // After computing, memoize the result for the current targetSum
  memo[targetSum] = node.children.some((child) => child.endNode);

  // Mark the node if the current path leads to a solution
  //   if (memo[targetSum]) {
  //     node.isMemo = true; // Mark node as memoized
  //   }

  return node;
};

/**
 * Function to create the CanSum tree with memoization and calculate node positions for visualization.
 * @param targetSum The target sum to reach.
 * @param numbers The list of numbers available to sum to the target.
 * @returns TreeNodeModel<number> representing the root node of the CanSum tree.
 */
export function createCanSumTreeMemo(targetSum: number, numbers: number[]) {
  const memo = {}; // Memoization object
  const memoCount = { count: 0 }; // Object to track the number of memoized values

  // Build the tree with memoization
  const tree = buildCanSumTreeMemo(targetSum, numbers, null, memo, memoCount);

  // Calculate node positions for visualization
  TreeHelper.calculateNodePositions(tree);

  // Adjust the tree spacing depending on the size of the input
  targetSum <= 5
    ? TreeHelper.shiftTree(tree, 0)
    : TreeHelper.shiftTree(tree, 0.25);

  return tree;
}
