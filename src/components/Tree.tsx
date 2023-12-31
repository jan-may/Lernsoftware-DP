import { TreeHelper } from "../TreeBuilder/TreeHelper";
import { TreeNodeModel } from "../TreeBuilder/TreeNodeModel";
import { Node } from "./Node";
import { useAppSelector } from "../hooks/redux";
import { useResizeDimensions } from "../hooks/resize";

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

function createFibonacciTree(input: number) {
  const tree = buildFibonacciTree(input);
  TreeHelper.calculateNodePositions(tree);
  TreeHelper.shiftTree(tree, 1);
  return tree;
}

export const Tree: React.FC = () => {
  const { input, sidebarWidth } = useAppSelector((store) => store.settings);
  const tree = createFibonacciTree(input);

  const maxDepth = TreeHelper.getMaxDepth(tree);
  const maxWidth = TreeHelper.getMaxWidth(tree);
  const dimensions = useResizeDimensions(maxDepth, maxWidth);

  return (
    <>
      <h1>Fibonacci Level: {input}</h1>
      <svg
        className="tree"
        width={window.innerWidth - sidebarWidth - 50}
        height={window.innerHeight - 70}
      >
        {tree && <Node node={tree} dimensions={dimensions} />}
      </svg>
    </>
  );
};
