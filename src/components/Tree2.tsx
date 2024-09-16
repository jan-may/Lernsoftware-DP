import React, { useState, useMemo, useCallback, useEffect } from "react";
import { TreeHelper } from "../TreeBuilder/TreeHelper";
import { Node } from "./Node2";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useResizeDimensions } from "../hooks/resize";
import { ActivButton } from "../feautures/navbar/navbarSlice";
import {
  setCircleRadius,
  setHorizontalSpacing,
  setVerticalSpacing,
} from "../feautures/settings/settingsSlice";
import { createCanSumTree, createCanSumTreeMemo } from "../trees/canSum";
import { Problem } from "./Problem";
import { useTheme } from "./theme-provider";

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
    numbers,
    targetNumber,
  } = useAppSelector((store) => store.settings);
  const { isTourRunning } = useAppSelector((store) => store.tour);

  const { activeButton } = useAppSelector((store) => store.navbar);
  const [clickedValue, setClickedValue] = useState(-100);
  const { theme } = useTheme();

  const tree = useMemo(() => {
    let newTree = TreeHelper.createEmptyTree<number>();

    switch (activeButton) {
      case ActivButton.recursiveTree:
        if (input >= 15) {
          newTree = TreeHelper.createEmptyTree<number>();
        } else {
          newTree = createCanSumTree(targetNumber, numbers);
        }
        break;
      case ActivButton.topDownMemo:
        newTree = createCanSumTreeMemo(targetNumber, numbers);
        break;
      default:
        break;
    }

    return newTree;
  }, [activeButton, input, targetNumber, numbers]);

  const maxDepth = useMemo(() => TreeHelper.getMaxDepth(tree), [tree]);
  const maxWidth = useMemo(() => TreeHelper.getMaxWidth(tree), [tree]);
  const dimensions = useResizeDimensions(maxDepth, maxWidth);

  const handleClick = useCallback(
    (value: number) => {
      if (value === clickedValue) {
        setClickedValue(-10);
      } else {
        setClickedValue(value);
      }
    },
    [clickedValue]
  );

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
    isTourRunning ? setClickedValue(2) : setClickedValue(-100);
  }, [isTourRunning]);

  return (
    <div>
      {activeButton === ActivButton.problem ? (
        <Problem />
      ) : (
        <svg
          className="relative"
          width={window.innerWidth - sidebarWidth - 80}
          height={window.innerHeight - 80}
        >
          {tree && (
            <Node
              node={tree}
              dimensions={localDimensions}
              clickedValue={clickedValue}
              handleClick={handleClick}
              theme={""}
            />
          )}
        </svg>
      )}
      <div className="absolute bottom-2 flex-col flex-wrap items-center gap-2 ">
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
          <div className="flex items-center space-x-1">
            <svg width={16} height={16}>
              <circle fill="green" cy={8} cx={8} r={8} />
            </svg>
            <p className="text-sm">= memoisierter Wert</p>
          </div>
          <div className="flex items-center space-x-1">
            <svg width={16} height={16}>
              <circle fill="gray" cy={8} cx={8} r={8} />
            </svg>
            <p className="text-sm">= negativer Pfad</p>
          </div>
          <div className="flex items-center space-x-1">
            <svg width={16} height={16}>
              <circle fill="lightblue" cy={8} cx={8} r={8} />
            </svg>
            <p className="text-sm">= erfolgreicher Pfad</p>
          </div>
          <div className="flex items-center space-x-1">
            <svg width={16} height={16}>
              <circle
                fill={theme === "light" ? "transparent" : "black"}
                cy={8}
                cx={8}
                r={7}
                stroke={theme === "light" ? "black" : "white"}
              />
            </svg>
            <p className="text-sm">= neu berechneter Wert</p>
          </div>
        </div>
      </div>
    </div>
  );
};
