import { TreeHelper } from "../TreeBuilder/TreeHelper";
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
import {
  createFibonacciTree,
  createFibonacciTreeMemo,
} from "../trees/fibonacci";

export const Tree: React.FC = () => {
  const [localDimensions, setLocalDimensions] = useState({
    horizontalSpacing: 0,
    verticalSpacing: 0,
    circleRadius: 0,
  });

  const dispatch = useAppDispatch();
  const {
    input,
    sidebarWidth,
    verticalSpacing,
    horizontalSpacing,
    circleRadius,
  } = useAppSelector((store) => store.settings);

  const { isTourCompleted, isQuizCompleted } = useAppSelector(
    (store) => store.io
  );
  const { activeButton } = useAppSelector((store) => store.navbar);
  const [clickedValue, setClickedValue] = useState(-1);

  let tree = TreeHelper.createEmptyTree<number>();

  switch (activeButton) {
    case ActivButton.recursiveTree:
      if (input >= 15) {
        tree = TreeHelper.createEmptyTree<number>();
      }
      tree = createFibonacciTree(input);
      break;
    case ActivButton.topDownMemo:
      tree = createFibonacciTreeMemo(input);
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
      {activeButton === ActivButton.problem ? (
        <>
          <h1 style={{ marginTop: "100px" }}>not implemented yet</h1>
          <p>tour completed: {isTourCompleted ? "true" : "false"}</p>
          <p>quiz completed: {isQuizCompleted ? "true" : "false"}</p>
        </>
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
