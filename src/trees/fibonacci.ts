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


  const memo = new Map<number, TreeNodeModel<number>>();
  
  export function buildFibonacciTreeMemoized(
  n: number,
  parent?: TreeNodeModel<number>
): TreeNodeModel<number> {
  if (memo.has(n)) {
    return memo.get(n)!;
  }
  const node = new TreeNodeModel(n, parent);
  if (n >= 2) {
    node.children.push(buildFibonacciTreeMemoized(n - 1, node));
    const memo_node = new TreeNodeModel(n);
    memo_node.isMemo = true;
    memo.set(n, memo_node);

    node.children.push(buildFibonacciTreeMemoized(n - 2, node));
    const memo_node2 = new TreeNodeModel(n);
    memo_node2.isMemo = true;
    memo.set(n, memo_node2);
  }
  return node;
}

export function createFibonacciMemoTree(input: number) {
    const tree = buildFibonacciTreeMemoized(input);
    TreeHelper.calculateNodePositions(tree);
    TreeHelper.shiftTree(tree, 1);
    return tree;
  }

  function buildFibonacciTreeIterative(n: number): TreeNodeModel<number> {
    if (n < 0) return new TreeNodeModel(0);
  
    // Create root node
    const root = new TreeNodeModel(n);
  
    // Stack to keep nodes that need processing
    const stack: { node: TreeNodeModel<number>; val: number }[] = [];
    stack.push({ node: root, val: n });
  
    while (stack.length > 0) {
      const { node, val } = stack.pop()!;
  
      if (val >= 2) {
        // Create child nodes for n-1 and n-2
        const child1 = new TreeNodeModel(val - 1, node);
        const child2 = new TreeNodeModel(val - 2, node);
  
        // Add children to current node
        node.children.push(child1, child2);
  
        // Push children onto stack to process their children later
        stack.push({ node: child1, val: val - 1 });
        stack.push({ node: child2, val: val - 2 });
      }
    }
  
    return root;
  }
  
 export function createFiboncaacciTreeIterative(input: number) {
    const tree = buildFibonacciTreeIterative(input);
    TreeHelper.calculateNodePositions(tree);
    TreeHelper.shiftTree(tree, 1);
    return tree;
  }  