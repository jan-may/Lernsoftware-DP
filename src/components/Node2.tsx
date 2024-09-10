import React, { useEffect, useState } from "react";
import { TreeNodeModel } from "../TreeBuilder/TreeNodeModel";
import { useAppSelector } from "../hooks/redux";
import { Dimensions } from "../types/TreeTypes";
import { TreeHelper } from "../TreeBuilder/TreeHelper";
import { useTheme } from "./theme-provider";
import { ActivButton } from "../feautures/navbar/navbarSlice";
import { useToast } from "./ui/use-toast";

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
  const { toast } = useToast();

  useEffect(() => {
    setRenderedNodes([]);
  }, [activeButton, input, speed]);

  useEffect(() => {
    if (activeButton === ActivButton.recursiveTree && input >= 15) {
      toast({
        title: "Input für rekursive Berechnung zu groß",
        description:
          "Bitte eine dynamisch programmierte Lösung zur Visualisierung verwenden.",
        variant: "destructive",
      });
      setRenderQueue([]);
      setRenderedNodes([]);
    } else {
      setRenderQueue(TreeHelper.newpreorderedWithParent(node, null));
    }
  }, [activeButton, input, speed]);

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

  return (
    <g>
      {renderedNodes.map(({ node: renderedNode, parent }, _index) => (
        <React.Fragment key={renderedNode.key}>
          {parent && (
            <line
              x1={parent.x * dimensions.verticalSpacing}
              y1={(parent.y * dimensions.horizontalSpacing) / 2}
              x2={renderedNode.x * dimensions.verticalSpacing}
              y2={(renderedNode.y * dimensions.horizontalSpacing) / 2}
              stroke={theme === "dark" ? "white" : "black"}
              strokeWidth={1}
              className="ease-in-out duration-50"
            />
          )}
          <circle
            className="cursor-pointer ease-in-out duration-100 animate-fadeIn"
            onClick={() => handleClick(renderedNode.item)}
            cx={renderedNode.x * dimensions.verticalSpacing - 1}
            cy={(renderedNode.y * dimensions.horizontalSpacing) / 2}
            r={dimensions.circleRadius + 7}
            fill={
              renderedNode.item < 0
                ? "gray"
                : renderedNode.isMemo
                ? "#009B60"
                : renderedNode.item === 0
                ? "lightblue"
                : renderedNode.item === clickedValue
                ? "red"
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
