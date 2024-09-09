import { FC } from "react";
import { FibTable } from "../../FibTable";
import { BlockMath } from "react-katex";
import { fibonacciDefinition } from "../../../trees/fibonacci";

export const FibDescription: FC = () => {
  return (
    <>
      <p className="text-sm">
        Die Fibonacci-Folge ist rekursiv wie folgt definiert:
      </p>
      <div className="my-10 w-32">
        <BlockMath math={fibonacciDefinition} />
      </div>
      <FibTable />
    </>
  );
};
