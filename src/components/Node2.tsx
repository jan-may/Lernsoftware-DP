// Node.tsx
import React from "react";
import { TreeNodeModel } from "../TreeBuilder/TreeNodeModel";
import { Dimensions } from "../types/TreeTypes";
import { TreeHelper } from "../TreeBuilder/TreeHelper";
import { ActivButton } from "../feautures/navbar/navbarSlice";
import { useAppSelector } from "../hooks/redux";

interface NodeProps {
  node: TreeNodeModel<number>;
  dimensions: Dimensions;
  clickedValue: number;
  handleClick: (value: number) => void;
  theme: string; // Accept theme as a prop
}

interface NodeWithParent {
  node: TreeNodeModel<number>;
  parent: TreeNodeModel<number> | null;
}

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

const NodeComponent: React.FC<NodeProps> = ({
  node,
  dimensions,
  clickedValue,
  handleClick,
  theme,
}) => {
  const speed = useAppSelector((store) => store.settings.speed);
  const input = useAppSelector((store) => store.settings.input);
  const activeButton = useAppSelector((store) => store.navbar.activeButton);

  const [renderQueue, setRenderQueue] = React.useState<NodeWithParent[]>([]);
  const [renderedNodes, setRenderedNodes] = React.useState<NodeWithParent[]>(
    []
  );

  React.useEffect(() => {
    if (activeButton === ActivButton.recursiveTree && input >= 15) {
      setRenderQueue([]);
      setRenderedNodes([]);
    } else {
      setRenderQueue(TreeHelper.newpreorderedWithParent(node, null));
    }
  }, [activeButton, input, speed, node]);

  React.useEffect(() => {
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

  // Determine if a successful path exists (i.e., a node with value 0 is rendered)
  const hasSuccessfulPath = React.useMemo(
    () =>
      renderedNodes.some(({ node: renderedNode }) => renderedNode.item === 0),
    [renderedNodes]
  );

  return (
    <g>
      {/* Nodes Rendered Counter */}
      <text
        x={10}
        y={20}
        fontSize={14}
        fill={theme === "dark" ? "white" : "black"}
        fontWeight="bold"
      >
        Knoten: {renderedNodes.length}
      </text>

      {/* Successful Path Indicator */}
      <text
        x={10}
        y={40}
        fontSize={14}
        fill={
          hasSuccessfulPath ? "green" : theme === "dark" ? "white" : "black"
        }
        fontWeight="bold"
      >
        Erfolgreicher Pfad: {hasSuccessfulPath ? "Ja" : "Nein"}
      </text>

      {/* Render Lines and Nodes */}
      <Lines
        renderedNodes={renderedNodes}
        dimensions={dimensions}
        theme={theme}
      />
      <Nodes
        renderedNodes={renderedNodes}
        dimensions={dimensions}
        theme={theme}
        clickedValue={clickedValue}
        handleClick={handleClick}
      />
    </g>
  );
};

export const Node = React.memo(
  NodeComponent,
  (prevProps, nextProps) =>
    prevProps.node === nextProps.node &&
    prevProps.dimensions === nextProps.dimensions &&
    prevProps.clickedValue === nextProps.clickedValue &&
    prevProps.handleClick === nextProps.handleClick &&
    prevProps.theme === nextProps.theme
);

interface LinesProps {
  renderedNodes: NodeWithParent[];
  dimensions: Dimensions;
  theme: string;
}

const Lines: React.FC<LinesProps> = React.memo(
  ({ renderedNodes, dimensions, theme }) => {
    const lines = renderedNodes
      .map(({ node: renderedNode, parent }) => {
        if (parent) {
          return (
            <LineComponent
              key={`line-${parent.key}-${renderedNode.key}`}
              parent={parent}
              child={renderedNode}
              dimensions={dimensions}
              theme={theme}
            />
          );
        } else {
          return null;
        }
      })
      .filter(Boolean); // Remove nulls

    return <>{lines}</>;
  },
  (prevProps, nextProps) =>
    prevProps.renderedNodes === nextProps.renderedNodes &&
    prevProps.dimensions === nextProps.dimensions &&
    prevProps.theme === nextProps.theme
);

interface NodesProps {
  renderedNodes: NodeWithParent[];
  dimensions: Dimensions;
  theme: string;
  clickedValue: number;
  handleClick: (value: number) => void;
}

const Nodes: React.FC<NodesProps> = ({
  renderedNodes,
  dimensions,
  theme,
  clickedValue,
  handleClick,
}) => {
  const nodes = renderedNodes.map(({ node: renderedNode }) => (
    <NodeCircle
      key={`node-${renderedNode.key}`}
      node={renderedNode}
      dimensions={dimensions}
      theme={theme}
      clickedValue={clickedValue}
      handleClick={handleClick}
    />
  ));

  return <>{nodes}</>;
};

interface LineProps {
  parent: TreeNodeModel<number>;
  child: TreeNodeModel<number>;
  dimensions: Dimensions;
  theme: string;
}

const LineComponent: React.FC<LineProps> = React.memo(
  ({ parent, child, dimensions, theme }) => {
    const { offsetX: parentOffsetX, offsetY: parentOffsetY } = calculateOffset(
      parent.x * dimensions.verticalSpacing,
      (parent.y * dimensions.horizontalSpacing) / 2,
      child.x * dimensions.verticalSpacing,
      (child.y * dimensions.horizontalSpacing) / 2,
      dimensions.circleRadius + 7
    );
    const { offsetX: childOffsetX, offsetY: childOffsetY } = calculateOffset(
      child.x * dimensions.verticalSpacing,
      (child.y * dimensions.horizontalSpacing) / 2,
      parent.x * dimensions.verticalSpacing,
      (parent.y * dimensions.horizontalSpacing) / 2,
      dimensions.circleRadius + 7
    );

    return (
      <line
        x1={parent.x * dimensions.verticalSpacing + parentOffsetX}
        y1={(parent.y * dimensions.horizontalSpacing) / 2 + parentOffsetY}
        x2={child.x * dimensions.verticalSpacing - childOffsetX}
        y2={(child.y * dimensions.horizontalSpacing) / 2 - childOffsetY}
        stroke={theme === "dark" ? "white" : "black"}
        strokeWidth={1}
        className="ease-in-out duration-50"
      />
    );
  },
  (prevProps, nextProps) =>
    prevProps.parent === nextProps.parent &&
    prevProps.child === nextProps.child &&
    prevProps.dimensions === nextProps.dimensions &&
    prevProps.theme === nextProps.theme
);

interface NodeCircleProps {
  node: TreeNodeModel<number>;
  dimensions: Dimensions;
  theme: string;
  clickedValue: number;
  handleClick: (value: number) => void;
}

const NodeCircle: React.FC<NodeCircleProps> = React.memo(
  ({ node, dimensions, theme, clickedValue, handleClick }) => {
    return (
      <>
        <circle
          className="cursor-pointer ease-in-out duration-100 animate-fadeIn"
          onClick={() => handleClick(node.item)}
          cx={node.x * dimensions.verticalSpacing - 1}
          cy={(node.y * dimensions.horizontalSpacing) / 2}
          r={dimensions.circleRadius + 7}
          fill={
            node.item < 0
              ? "gray"
              : node.isMemo
              ? "#009B60" // Green for memoized
              : node.item === 0
              ? "lightblue"
              : node.item === clickedValue
              ? "red"
              : theme === "dark"
              ? "black"
              : "white"
          }
          stroke={theme === "dark" ? "white" : "black"}
        />
        <text
          onClick={() => handleClick(node.item)}
          x={node.x * dimensions.verticalSpacing - 1}
          y={(node.y * dimensions.horizontalSpacing) / 2 + 4}
          fontSize={dimensions.circleRadius + 7}
          textAnchor="middle"
          fill={theme === "dark" ? "white" : "black"}
        >
          {node.item}
        </text>
      </>
    );
  },
  (prevProps, nextProps) =>
    prevProps.node === nextProps.node &&
    prevProps.dimensions === nextProps.dimensions &&
    prevProps.theme === nextProps.theme &&
    prevProps.clickedValue === nextProps.clickedValue
);
