import { FC, ReactNode, useState, useEffect } from "react";
import { createFibonacciTab } from "../trees/fibonacci";
import { useAppSelector } from "../hooks/redux";
import { scale } from "../utils/util";

interface RectangleProps {
  value: ReactNode;
  highlight1: boolean;
  highlight2: boolean;
  highlight3?: boolean;
}

const Rectangle: FC<RectangleProps> = ({
  value,
  highlight1,
  highlight2,
  highlight3,
}) => {
  const size = scale(Number(value));
  return (
    <div
      style={{
        border: highlight1
          ? "3px solid red"
          : highlight2
          ? "3px solid green"
          : highlight3
          ? "3px solid blue"
          : "1px solid black",
        padding: "10px",
        width: `${size}px`,
        height: "50px",
        margin: "2px",
        transition: "ease",
      }}
    >
      {value}
    </div>
  );
};

export const Grid: FC = () => {
  const { input, speed } = useAppSelector((store) => store.settings);
  const [renderIndex, setRenderIndex] = useState(2);
  const [data, setData] = useState<ReactNode[]>([]);
  const [renderedIndices, setRenderedIndices] = useState<number[]>([0, 1, 2]);

  useEffect(() => {
    if (speed > 0) {
      setRenderIndex(2);
      setRenderedIndices([0, 1, 2]);
      setData(createFibonacciTab(input));
      const timer1 = setInterval(() => {
        setRenderIndex((prevIndex) => {
          setRenderedIndices((prevIndices) => [...prevIndices, prevIndex + 1]);
          return prevIndex + 1;
        });
      }, speed);
      return () => {
        clearInterval(timer1);
      };
    } else {
      setRenderIndex(input + 1);
      setData(createFibonacciTab(input));
      setRenderedIndices(createFibonacciTab(input).map((_, i) => i));
    }
  }, [speed, input]);

  if (!data.length) {
    return null;
  }
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        // minHeight: "calc(100vh - 58px)",
        alignContent: "flex-start",
      }}
    >
      {(data as ReactNode[]).map((value, i) => (
        <Rectangle
          key={i}
          value={renderedIndices.includes(i) ? value : null}
          highlight1={i === renderIndex}
          highlight2={
            (i === renderIndex - 1 && i < input) ||
            (i === renderIndex - 2 && i < input - 1)
          }
          highlight3={i === input && renderIndex > input}
        />
      ))}
    </div>
  );
};
