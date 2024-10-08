import React, { useEffect, useState } from "react";
import { TreeNodeModel } from "../TreeBuilder/TreeNodeModel";
import { useAppSelector } from "../hooks/redux";
import { Dimensions } from "../types/TreeTypes";
import { TreeHelper } from "../TreeBuilder/TreeHelper";
import { useTheme } from "./theme-provider";
import { ActivButton } from "../feautures/navbar/navbarSlice";

interface NodeProps {
  node: TreeNodeModel<number>;
  dimensions: Dimensions;
  clickedValue: number;
  handleClick: (value: number) => void;
}

interface NodeWithParent {
  node: TreeNodeModel<number>;
  parent: TreeNodeModel<number> | null;
}

export const Node: React.FC<NodeProps> = ({
  node,
  dimensions,
  clickedValue,
  handleClick,
}) => {
  const { speed, input } = useAppSelector((store) => store.settings);
  const { activeButton } = useAppSelector((store) => store.navbar);
  const [renderQueue, setRenderQueue] = useState<NodeWithParent[]>([]);
  const [renderedNodes, setRenderedNodes] = useState<NodeWithParent[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    if (activeButton === ActivButton.recursiveTree && input >= 15) {
      setRenderQueue([]);
      setRenderedNodes([]);
    } else {
      setRenderQueue(TreeHelper.newpreorderedWithParent(node, null));
    }
  }, [activeButton, speed]);

  useEffect(() => {
    if (activeButton === ActivButton.recursiveTree && input >= 15) {
      setRenderQueue([]);
      setRenderedNodes([]);
    } else if (renderQueue.length > 0 && speed > 0) {
      const timer = setTimeout(() => {
        const nextNode = renderQueue.shift();
        if (nextNode) {
          setRenderedNodes((prevNodes) => [...prevNodes, nextNode]);
        }
        setRenderQueue([...renderQueue]);
      }, speed);

      return () => clearTimeout(timer);
    } else if (renderQueue.length > 0 && speed === 0) {
      setRenderedNodes(renderQueue);
    }
  }, [renderQueue, speed, activeButton]);

  // Function to calculate the position offset for the line (edge of the circle)
  const calculateOffset = (
    parentX: number,
    parentY: number,
    childX: number,
    childY: number,
    radius: number
  ) => {
    const dx = childX - parentX;
    const dy = childY - parentY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const offsetX = (dx / distance) * radius;
    const offsetY = (dy / distance) * radius;
    return { offsetX, offsetY };
  };

  return (
    <g>
      <text
        x={10} // X-coordinate for the counter
        y={20} // Y-coordinate for the counter
        fontSize={14}
        fill={theme === "dark" ? "white" : "black"}
        fontWeight="bold"
      >
        Knoten: {renderedNodes.length}
      </text>
      {renderedNodes.map(({ node: renderedNode, parent }, _index) => (
        <React.Fragment key={renderedNode.key}>
          {parent && (
            <>
              {/* Calculate the line offset based on the parent and child positions */}
              {(() => {
                const { offsetX: parentOffsetX, offsetY: parentOffsetY } =
                  calculateOffset(
                    parent.x * dimensions.verticalSpacing,
                    (parent.y * dimensions.horizontalSpacing) / 2,
                    renderedNode.x * dimensions.verticalSpacing,
                    (renderedNode.y * dimensions.horizontalSpacing) / 2,
                    dimensions.circleRadius + 7
                  );
                const { offsetX: childOffsetX, offsetY: childOffsetY } =
                  calculateOffset(
                    renderedNode.x * dimensions.verticalSpacing,
                    (renderedNode.y * dimensions.horizontalSpacing) / 2,
                    parent.x * dimensions.verticalSpacing,
                    (parent.y * dimensions.horizontalSpacing) / 2,
                    dimensions.circleRadius + 7
                  );
                return (
                  <line
                    x1={parent.x * dimensions.verticalSpacing + parentOffsetX}
                    y1={
                      (parent.y * dimensions.horizontalSpacing) / 2 +
                      parentOffsetY
                    }
                    x2={
                      renderedNode.x * dimensions.verticalSpacing - childOffsetX
                    }
                    y2={
                      (renderedNode.y * dimensions.horizontalSpacing) / 2 -
                      childOffsetY
                    }
                    stroke={theme === "dark" ? "white" : "black"}
                    strokeWidth={1}
                    className="ease-in-out duration-50"
                  />
                );
              })()}
            </>
          )}
          <circle
            className="cursor-pointer ease-in-out duration-100 animate-fadeIn"
            onClick={() => handleClick(renderedNode.item)}
            cx={renderedNode.x * dimensions.verticalSpacing - 1}
            cy={(renderedNode.y * dimensions.horizontalSpacing) / 2}
            r={dimensions.circleRadius + 7}
            fill={
              renderedNode.item === clickedValue
                ? "red"
                : renderedNode.isMemo
                ? "#009B60"
                : theme === "dark"
                ? "black"
                : "white"
            }
            stroke={theme === "dark" ? "white" : "black"}
          />
          <text
            onClick={() => handleClick(renderedNode.item)}
            x={renderedNode.x * dimensions.verticalSpacing - 1}
            y={(renderedNode.y * dimensions.horizontalSpacing) / 2 + 4}
            fontSize={dimensions.circleRadius + 7}
            textAnchor="middle"
            fill={theme === "dark" ? "white" : "black"}
          >
            {renderedNode.item}
          </text>
        </React.Fragment>
      ))}
    </g>
  );
};
