import { FC } from "react";
import { InlineMath } from "react-katex";

export const FibTeilstruktur: FC = () => {
  return (
    <div className="my-2">
      Um <InlineMath math="F(n)" /> zu berechnen, verwenden wir die optimalen
      Lösungen der Teilprobleme <InlineMath math="F(n-1)" />{" "}
      <InlineMath math="F(n-2)" />, was die optimale Teilstruktur für dieses
      Problem darstellt.
    </div>
  );
};
