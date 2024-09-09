import { TreeNodeModel } from "../../../TreeBuilder/TreeNodeModel";

// Recursive function to build the CanSum tree
export const createCanSumTree = (
  targetSum: number,
  numbers: number[],
  parent: TreeNodeModel<number> | null = null
): TreeNodeModel<number> => {
  const node = new TreeNodeModel<number>(targetSum, parent);

  // Base case: target sum is 0, mark it as a success
  if (targetSum === 0) {
    node.endNode = true; // reaching 0 -> success
    return node;
  }

  // Base case: target sum is negative, return failure node
  if (targetSum < 0) {
    return node; // Failure node (no isMemo flag needed)
  }

  // Recursive step: Try subtracting each number and creating child nodes
  numbers.forEach((num) => {
    const remainder = targetSum - num;
    const childNode = createCanSumTree(remainder, numbers, node);
    childNode.key += 1;
    node.children.push(childNode);
  });

  return node;
};

export const createCanSumTreeMemo = (
  targetSum: number,
  numbers: number[],
  parent: TreeNodeModel<number> | null = null
): TreeNodeModel<number> => {
  const node = new TreeNodeModel<number>(targetSum, parent);

  // Base case: target sum is 0, mark it as a success
  if (targetSum === 0) {
    node.endNode = true; // reaching 0 -> success
    return node;
  }

  // Base case: target sum is negative, return failure node
  if (targetSum < 0) {
    return node; // Failure node (no isMemo flag needed)
  }

  // Recursive step: Try subtracting each number and creating child nodes
  numbers.forEach((num) => {
    const remainder = targetSum - num;
    const childNode = createCanSumTree(remainder, numbers, node);
    node.children.push(childNode);
  });
  return node;
};
