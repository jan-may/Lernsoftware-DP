import { FC } from "react";
import { InlineMath } from "react-katex";

export const GridTravelerOverlappingTeilproblem: FC = () => {
  return (
    <div className="my-2">
      <p>
        Beim <InlineMath math="\textit{GridTraveller}" />
        -Problem treten überlappende Teilprobleme auf, da die Berechnung der
        Kosten für eine Zelle <InlineMath math="G(i,j)" /> von den Teilproblemen{" "}
        <InlineMath math="P(i-1,j)" /> und <InlineMath math="P(i,j-1)" />{" "}
        abhängt, die in verschiedenen Berechnungspfaden mehrfach vorkommen
        können. Es gilt:
      </p>
      <div className="my-2 ml-4">
        <InlineMath math="P(i,j) = P(i-1,j) \cup P(i,j-1)" />
      </div>
    </div>
  );
};
