import { FC } from "react";
import { InlineMath } from "react-katex";

export const CanSumTeilstruktur: FC = () => {
  return (
    <div className="my-2">
      <p>
        Die Lösung für die Zielzahl <InlineMath math="t" /> kann durch die
        Lösung der Teilprobleme für kleinere Zielzahlen{" "}
        <InlineMath math="t - a_i" /> aufgebaut werden.
        <InlineMath math="\text{canSum}(t) = \text{canSum}(t - a_1) \lor \text{canSum}(t - a_2) \lor \dots \lor \text{canSum}(t - a_n)" />
      </p>
    </div>
  );
};
