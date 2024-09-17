import { FC } from "react";
import { InlineMath } from "react-katex";

export const CanSumDescription: FC = () => {
  return (
    <div className="max-w-[1000px]">
      <p>
        Gegeben sei eine Menge{" "}
        <InlineMath math="S = \{a_1, a_2, \dots, a_n\}" /> von{" "}
        <InlineMath math="n" /> positiven ganzen Zahlen sowie eine Zielzahl{" "}
        <InlineMath math="t \in \mathbb{Z}^+ " />.
      </p>
      <p>
        Es soll überprüft werden, ob es möglich ist, durch die Summe einer
        beliebigen Anzahl von Elementen aus <InlineMath math="S" /> genau die
        Zielzahl <InlineMath math="t" /> zu erreichen. Jedes Element aus{" "}
        <InlineMath math="t" /> kann dabei beliebig oft verwendet werden.
      </p>
      <p className="mt-2 text-base font-semibold">Gegeben:</p>
      <ul className="ml-8 list-disc">
        <li>
          Eine Menge <InlineMath math="S \subset \mathbb{Z}^+" /> von positiven
          ganzen Zahlen.
        </li>
        <li>
          Eine Zielzahl <InlineMath math="t \in \mathbb{Z}^+" />.
        </li>
      </ul>
      <p className="mt-2 text-base font-semibold">Gesucht:</p>
      <ul className="ml-8 list-disc">
        <li>
          Existiert eine Teilmenge (mit Wiederholung) von{" "}
          <InlineMath math="S" />, deren Summe genau <InlineMath math="t" />{" "}
          ergibt?
        </li>
      </ul>

      <p className="mt-2 text-base font-semibold">Formal:</p>
      <ul className="ml-8 list-disc">
        <li>
          Gibt es <InlineMath math="x_1, x_2, \dots, x_n \in \mathbb{Z}^+" />,
          sodass{" "}
          <InlineMath
            math="x_1 a_1 + x_2 a_2 +
        \dots + x_n a_n = t"
          />
          , wobei <InlineMath math="x_i \geq 0" /> die Anzahl der Verwendungen
          des jeweiligen Elements <InlineMath math="a_i \in S" /> angibt.
        </li>
      </ul>
      <p className="mt-2 text-base font-semibold">Beispiel:</p>
      <ul className="ml-8 list-disc">
        <li>
          Sei <InlineMath math="S = \{5, 3, 4, 7\}" /> und{" "}
          <InlineMath math="t = 7" />. In diesem Fall lautet die Antwort "Ja",
          da <InlineMath math="3 + 4 = 7" /> oder <InlineMath math="7 = 7" />.
        </li>
        <li>
          Sei <InlineMath math="S = \{2, 4\}" /> und <InlineMath math="t = 7" />
          . In diesem Fall lautet die Antwort "Nein", da keine Kombination der
          gegebenen Zahlen die Zielsumme ergibt.
        </li>
      </ul>
    </div>
  );
};
