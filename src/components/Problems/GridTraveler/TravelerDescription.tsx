import { FC } from "react";
import { InlineMath } from "react-katex";

export const TravelerDescription: FC = () => {
  return (
    <>
      <p className="text-sm">
        <p>
          Gegeben sei ein 2-dimensionales Feld <InlineMath math="G" /> mit{" "}
          <InlineMath math="m" /> Zeilen und <InlineMath math="n" /> Spalten.
          Jede Zelle des Feldes <InlineMath math="G" /> ist mit einem bestimmten
          Kostenwert <InlineMath math="c(i, j)" />
          versehen, der die Kosten für das Betreten der Zelle{" "}
          <InlineMath math="G(i,j)" />
          darstellt, wobei <InlineMath math="i" /> die Zeile und{" "}
          <InlineMath math="j" /> die Spalte angibt.
        </p>
        <p>
          Das Ziel ist es, den günstigsten Pfad von der oberen linken Ecke{" "}
          <InlineMath math="G(0, 0)" />
          zur unteren rechten Ecke <InlineMath math="G(m-1, n-1)" /> zu finden.
          Der Reisende darf sich dabei nur nach rechts oder nach unten bewegen.
          Der gesuchte Pfad minimiert die Gesamtkosten, die sich als Summe der
          Kosten der durchquerten Zellen ergeben.
        </p>
        <p className="mt-2 text-base font-semibold">Gegeben:</p>
        <ul className="ml-8 list-disc">
          <li>
            Ein Gitter <InlineMath math="G" /> mit <InlineMath math="m" />{" "}
            Zeilen und <InlineMath math="n" /> Spalten.
          </li>
          <li>
            Jeder Zelle <InlineMath math="G(i,j)" /> ist ein Kostenwert -{" "}
            <InlineMath math="c(i, j) \in \mathbb{R}^+_0" /> zugeordnet, der die
            Kosten für das Betreten dieser Zelle angibt.
          </li>
          <li>Bewegungen sind nur nach rechts oder nach unten möglich.</li>
        </ul>
        <p className="mt-2 text-base font-semibold">Gesucht:</p>
        <ul className="ml-8 list-disc">
          <li>
            Ein Pfad von <InlineMath math="G(0,0)" /> nach{" "}
            <InlineMath math="G(m-1, n-1)" />, der die Gesamtkosten minimiert.
          </li>
          <li>
            <InlineMath math="\text{Kosten}(P) = \sum_{(i,j) \in P} c(i,j)" />
          </li>
        </ul>
        <p className="mt-2 text-base font-semibold">Beispiel:</p>
        <p>
          Sei das Gitter <InlineMath math="G" /> gegeben durch:
        </p>
        <div className="ml-6 my-3">
          <p>
            <InlineMath
              math="G = \begin{bmatrix}
            1 & 3 & 1 \\
            1 & 5 & 1 \\
            4 & 2 & 1
            \end{bmatrix}"
            />
          </p>
        </div>
        <p>
          Der günstigste Pfad von <InlineMath math="G(0,0)" /> nach{" "}
          <InlineMath math="G(2,2)" /> ist{" "}
          <InlineMath
            math="1 \to 3
          \to 1 \to 1 \to 1"
          />
          , mit Gesamtkosten <InlineMath math="7" />.
        </p>
      </p>
    </>
  );
};
