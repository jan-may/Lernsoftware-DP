import React, { useEffect, useState } from "react";
import { TreeNodeModel } from "../TreeBuilder/TreeNodeModel";
import { useAppSelector } from "../hooks/redux";
import { Dimensions } from "../types/TreeTypes";

interface NodeProps {
  node: TreeNodeModel<number>;
  dimensions: Dimensions;
  clickedValue: number;
  handleClick: (value: number) => void;
}

export const Node: React.FC<NodeProps> = ({
  node,
  dimensions,
  clickedValue,
  handleClick,
}) => {
  const { input, speed } = useAppSelector((store) => store.settings);
  const { active } = useAppSelector((store) => store.navbar);
  const [children, setChildren] = useState<TreeNodeModel<number>[]>([]);

  useEffect(() => {
    setChildren([]);
  }, [input, speed, active]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (node.children.length > children.length) {
        setChildren((prevChildren) => [
          ...prevChildren,
          node.children[prevChildren.length],
        ]);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [node, children]);
  return (
    <g>
      {children.map((child, index) => (
        <React.Fragment key={child.item + index}>
          <line
            x1={node.x * dimensions.verticalSpacing}
            y1={(node.y * dimensions.horizontalSpacing) / 2}
            x2={child.x * dimensions.verticalSpacing}
            y2={(child.y * dimensions.horizontalSpacing) / 2}
            stroke="black"
            strokeWidth={2}
          />
          <Node
            node={child}
            dimensions={dimensions}
            clickedValue={clickedValue}
            handleClick={handleClick}
          />
        </React.Fragment>
      ))}
      <circle
        className="node"
        onClick={() => handleClick(node.item)}
        cx={node.x * dimensions.verticalSpacing - 1}
        cy={(node.y * dimensions.horizontalSpacing) / 2}
        r={dimensions.circleRadius + 7}
        fill={node.item === clickedValue ? "red" : "black"} // Change this line
      />
      <text
        onClick={() => handleClick(node.item)}
        x={node.x * dimensions.verticalSpacing - 1}
        y={(node.y * dimensions.horizontalSpacing) / 2 + 4}
        fontSize={dimensions.circleRadius + 7}
        textAnchor="middle"
        fill={node.isMemo ? "green" : "white"}
      >
        {node.item}
      </text>
    </g>
  );
};
