import { FC } from "react";
import { InlineMath } from "react-katex";

export const GridTravelerTeilstruktur: FC = () => {
  return (
    <div className="my-2">
      <p>
        Der günstigste Pfad zum Erreichen einer Zelle{" "}
        <InlineMath math="G(i,j)" /> ist von der optimalen Lösung der
        benachbarten Zellen <InlineMath math="G(i-1,j)" /> und{" "}
        <InlineMath math="G(i,j-1)" /> abhängig. Es Gilt:
      </p>
      <div className="my-2 ml-4">
        <p>
          <InlineMath math="C(i,j) = c(i,j) + \min(C(i-1,j), C(i,j-1))" />
        </p>
      </div>
      <p>wobei:</p>
      <ul className="ml-8 list-disc">
        <li>
          <InlineMath math="C(i, j)" /> die minimalen Kosten beschreibt, um die
          Zelle{" "}
          <InlineMath
            math="
      G(i,j)"
          />{" "}
          zu erreichen,{" "}
        </li>
        <li>
          <InlineMath math="c(i,j)" /> die Kosten für das Betreten der Zelle{" "}
          <InlineMath math="G(i,j)" /> darstellt.{" "}
        </li>
      </ul>
    </div>
  );
};
