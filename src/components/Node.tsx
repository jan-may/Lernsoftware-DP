import React, { useEffect, useState } from "react";
import { TreeNodeModel } from "../TreeBuilder/TreeNodeModel";
import { useAppSelector } from "../hooks/redux";

interface Dimensions {
  verticalSpacing: number;
  horizontalSpacing: number;
  circleRadius: number;
}

interface NodeProps {
  node: TreeNodeModel<number>;
  dimensions: Dimensions;
}

export const Node: React.FC<NodeProps> = ({ node, dimensions }) => {
  const { input, speed } = useAppSelector((store) => store.settings);

  const [children, setChildren] = useState<TreeNodeModel<number>[]>([]);
  useEffect(() => {
    setChildren([]);
  }, [input, speed]);

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
      <circle
        cx={node.x * dimensions.verticalSpacing - 1}
        cy={(node.y * dimensions.horizontalSpacing) / 2}
        r={dimensions.circleRadius + 7}
        fill="black"
      />
      <text
        x={node.x * dimensions.verticalSpacing - 1}
        y={(node.y * dimensions.horizontalSpacing) / 2 + 4}
        fontSize={dimensions.circleRadius + 7}
        textAnchor="middle"
        fill="white"
      >
        {node.item}
      </text>
      {children.map((child, index) => (
        <React.Fragment key={child.item + index}>
          <line
            x1={node.x * dimensions.verticalSpacing}
            y1={(node.y * dimensions.horizontalSpacing + 30) / 2}
            x2={child.x * dimensions.verticalSpacing}
            y2={(child.y * dimensions.horizontalSpacing + 30) / 2}
            stroke="black"
            strokeWidth={1}
          />
          <Node node={child} dimensions={dimensions} />
        </React.Fragment>
      ))}
    </g>
  );
};
