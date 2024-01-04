import { TreeHelper } from "../TreeBuilder/TreeHelper";
import { TreeNodeModel } from "../TreeBuilder/TreeNodeModel";
import { Node } from "./Node";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useResizeDimensions } from "../hooks/resize";
import React, { useState } from "react";
import { ActivButton } from "../feautures/navbar/navbarSlice";
import {
  setCircleRadius,
  setHorizontalSpacing,
  setVerticalSpacing,
} from "../feautures/settings/settingsSlice";
import { useEffect } from "react";
import { createFibonacciTree } from "../trees/fibonacci";

export const Tree: React.FC = () => {
  const [localDimensions, setLocalDimensions] = useState({
    horizontalSpacing: 0,
    verticalSpacing: 0,
    circleRadius: 0,
  });

  const memo = new Map<number, TreeNodeModel<number>>();
  function buildFibonacciTreeMemoized(
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

  function createFibonacciMemoTree(input: number) {
    const tree = buildFibonacciTreeMemoized(input);
    TreeHelper.calculateNodePositions(tree);
    TreeHelper.shiftTree(tree, 1);
    return tree;
  }

  const dispatch = useAppDispatch();
  const {
    input,
    sidebarWidth,
    verticalSpacing,
    horizontalSpacing,
    circleRadius,
  } = useAppSelector((store) => store.settings);
  const { activeButton } = useAppSelector((store) => store.navbar);
  const [clickedValue, setClickedValue] = useState(-1);

  let tree = TreeHelper.createEmptyTree<number>();

  switch (activeButton) {
    case ActivButton.recursiveTree:
      tree = createFibonacciTree(input);
      break;
    case ActivButton.topDownMemo:
      tree = createFibonacciMemoTree(input);
      break;
    default:
      break;
  }

  const maxDepth = TreeHelper.getMaxDepth(tree);
  const maxWidth = TreeHelper.getMaxWidth(tree);
  const dimensions = useResizeDimensions(maxDepth, maxWidth);

  const handleClick = (value: number) => {
    if (value === clickedValue) {
      setClickedValue(-10);
    } else {
      setClickedValue(value);
    }
  };

  useEffect(() => {
    dispatch(setCircleRadius(dimensions.circleRadius));
    dispatch(setHorizontalSpacing(dimensions.horizontalSpacing));
    dispatch(setVerticalSpacing(dimensions.verticalSpacing));
    setLocalDimensions(dimensions);
  }, [dispatch, dimensions]);

  useEffect(() => {
    setLocalDimensions({
      horizontalSpacing,
      verticalSpacing,
      circleRadius,
    });
  }, [verticalSpacing, horizontalSpacing, circleRadius]);

  return (
    <>
      {activeButton === ActivButton.problem ||
      activeButton === ActivButton.bottomUp ? (
        <h1 style={{ marginTop: "100px" }}>not implemented yet</h1>
      ) : (
        <svg
          className="tree"
          width={window.innerWidth - sidebarWidth - 50}
          // width={verticalSpacing * (maxWidth + 1) + 100}
          height={window.innerHeight - 70}
        >
          {tree && (
            <Node
              node={tree}
              dimensions={localDimensions}
              clickedValue={clickedValue}
              handleClick={handleClick}
            />
          )}
        </svg>
      )}
    </>
  );
};
