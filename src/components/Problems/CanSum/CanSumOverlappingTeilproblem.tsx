import { FC } from "react";
import { InlineMath } from "react-katex";

export const CanSumOverlappingTeilproblem: FC = () => {
  return (
    <div className="my-2">
      <p>
        Teilprobleme <InlineMath math="\text{canSum}(t - a_i)" /> überlappen
        sich und treten während der Rekursion mehrfach auf.{" "}
      </p>
    </div>
  );
};
