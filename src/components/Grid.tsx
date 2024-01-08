import { FC, ReactNode, useState, useEffect } from "react";
import { createFibonacciTab } from "../trees/fibonacci";
import { useAppSelector } from "../hooks/redux";

interface RectangleProps {
  value: ReactNode;
  highlight1: boolean;
  highlight2: boolean;
}

const Rectangle: FC<RectangleProps> = ({ value, highlight1, highlight2 }) => (
  <div
    style={{
      border: highlight1
        ? "3px solid red"
        : highlight2
        ? "3px solid green"
        : "1px solid black",
      padding: "10px",
      width: "20px",
      margin: "2px",
      transition: "ease",
    }}
  >
    {value}
  </div>
);

// interface GridProps {
//   data: ReactNode[] | ReactNode[][];
// }

export const Grid: FC = () => {
  const { input, speed } = useAppSelector((store) => store.settings);
  const [renderIndex, setRenderIndex] = useState(2);
  const [data, setData] = useState<ReactNode[]>([]);
  const [renderedIndices, setRenderedIndices] = useState<number[]>([0, 1, 2]);

  useEffect(() => {
    setRenderIndex(2);
    setRenderedIndices([0, 1, 2]);
    setData(createFibonacciTab(input));
    const timer1 = setInterval(() => {
      setRenderIndex((prevIndex) => {
        setRenderedIndices((prevIndices) => [...prevIndices, prevIndex + 1]);
        return prevIndex + 1;
      });
    }, speed); // Change the interval as needed

    return () => {
      clearInterval(timer1);
    };
  }, [speed, input]);

  if (!data.length) {
    return null; // or some fallback UI
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", marginTop: "100px" }}>
      {(data as ReactNode[]).map((value, i) => (
        <Rectangle
          key={i}
          value={renderedIndices.includes(i) ? value : null}
          highlight1={i === renderIndex}
          highlight2={
            (i === renderIndex - 1 && i < input) ||
            (i === renderIndex - 2 && i < input - 1)
          }
        />
      ))}
    </div>
  );
};
