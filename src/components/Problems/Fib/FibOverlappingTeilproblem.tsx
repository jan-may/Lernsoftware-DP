import { FC } from "react";
import { InlineMath } from "react-katex";

export const FibOverlappingTeilproblem: FC = () => {
  return (
    <div className="my-2">
      <p>
        <InlineMath math="F(n) = F(n-1) + F(n-2)" />
      </p>
      <p>
        <InlineMath math="F(n-1) = F(n-2) + F(n-3)" />
      </p>
      <p>
        Hier wird deutlich, dass <InlineMath math="F(n-2)" /> sowohl für die
        Berechnung von
        <InlineMath math="F(n)" /> als auch für <InlineMath math="F(n-1)" />{" "}
        benötigt wird, was die überlappenden Teilprobleme zeigt.
      </p>
    </div>
  );
};
