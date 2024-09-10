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
import { Problem } from "./Problem";

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
  const { isTourRunning } = useAppSelector((store) => store.tour);

  const { activeButton } = useAppSelector((store) => store.navbar);
  const [clickedValue, setClickedValue] = useState(-100);

  let tree = TreeHelper.createEmptyTree<number>();

  switch (activeButton) {
    case ActivButton.recursiveTree:
      if (input >= 15) {
        tree = TreeHelper.createEmptyTree<number>();
      } else {
        tree = createFibonacciTree(input);
      }
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

  useEffect(() => {
    isTourRunning ? setClickedValue(2) : setClickedValue(-1);
  }, [dispatch, isTourRunning]);

  return (
    <div className="relative">
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
      {activeButton === ActivButton.problem ? null : (
        <div className="absolute bottom-2 flex-col flex-wrap items-center gap-2 z-0">
          <p className="text-sm">
            <strong>Legende:</strong>
          </p>
          <div className="flex mt-1 flex-wrap items-center gap-x-4 gap-y-">
            <div className="flex items-center gap-1">
              <svg width={16} height={16}>
                <circle fill="red" cy={8} cx={8} r={8} />
              </svg>
              <p className="text-sm">= ausgewählt</p>
            </div>
            {activeButton === ActivButton.topDownMemo && (
              <div className="flex items-center space-x-1">
                <svg width={16} height={16}>
                  <circle fill="green" cy={8} cx={8} r={8} />
                </svg>
                <p className="text-sm">= memoisierter Wert</p>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <svg width={16} height={16}>
                <circle fill="white" cy={8} cx={8} r={7} stroke="black" />
              </svg>
              <p className="text-sm">= neu berechneter Wert</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
