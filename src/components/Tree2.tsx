import { TreeHelper } from "../TreeBuilder/TreeHelper";
import { Node } from "./Node2";
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
import { createCanSumTree, createCanSumTreeMemo } from "../trees/canSum";
import { Problem } from "./Problem";

export const Tree2: React.FC = () => {
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
  const { isTourRunning } = useAppSelector((store) => store.tour);

  const { activeButton } = useAppSelector((store) => store.navbar);
  const [clickedValue, setClickedValue] = useState(-1);

  let tree = TreeHelper.createEmptyTree<number>();

  switch (activeButton) {
    case ActivButton.recursiveTree:
      if (input >= 15) {
        tree = TreeHelper.createEmptyTree<number>();
      } else {
        tree = createCanSumTree(8, [2, 3, 5]);
        console.log("rec");
      }
      break;
    case ActivButton.topDownMemo:
      tree = TreeHelper.createEmptyTree<number>();
      tree = createCanSumTreeMemo(8, [2, 3, 5]);
      console.log("memo");
      break;
    default:
      break;
  }

  console.log(tree);

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

  useEffect(() => {
    isTourRunning ? setClickedValue(2) : setClickedValue(-1);
  }, [dispatch, isTourRunning]);

  return (
    <>
      {activeButton === ActivButton.problem ? (
        <Problem />
      ) : (
        <svg
          className="relative"
          width={window.innerWidth - sidebarWidth - 80}
          // width={verticalSpacing * (maxWidth + 1) + 100}
          height={window.innerHeight - 80}
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
