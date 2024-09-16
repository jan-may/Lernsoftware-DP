// FibTabExplain.tsx
import React from "react";
import { HelpCircle } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { InlineMath } from "react-katex";
import { useTheme } from "../../../components/theme-provider";

const FibTabExplain: React.FC = () => {
  const { theme } = useTheme();
  return (
    <Dialog>
      {/* Dialog Trigger: Button with HelpCircle Icon */}
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="flex items-center">
          <HelpCircle className="h-6 w-6 mr-2" />
        </Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="w-[90vw] max-w-5xl p-8">
        <DialogHeader>
          <DialogTitle>
            Iterativer Fibonacci-Algorithmus (Bottom-Up)
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-4">
          <p>
            Der iterative Fibonacci-Algorithmus, auch als tabellarischer oder
            Bottom-Up-Ansatz bekannt, berechnet die Fibonacci-Zahlenfolge, indem
            er die Ergebnisse in einer Tabelle speichert und iterativ aufbaut.
          </p>
          <pre
            className={
              theme === "light" ? "bg-gray-100" : `bg-gray-800 p-2 rounded`
            }
          >
            <code>
              {`public int FibTab(int n)
{
  if (n <= 1) return n;
  int[] table = new int[n + 1];
  table[0] = 0;
  table[1] = 1;
  for (int i = 2; i <= n; i++)
  {
    table[i] = table[i - 1] + table[i - 2];
  }
  return table[n];
}`}
            </code>
          </pre>
          <p>
            In der Visualisierung wird der Aufbau der Tabelle Schritt für
            Schritt dargestellt, wobei jede Zelle den berechneten Fibonacci-Wert
            für einen bestimmten Index enthält.
          </p>
          <span>
            <p>
              Durch den iterativen Ansatz werden überlappende Teilprobleme
              vermieden und der Bedarf an Rekursion entfällt, was zu einer
              effizienteren Berechnung führt.
            </p>
          </span>
          <p>
            <strong>Funktionsweise:</strong>
          </p>

          <ul className=" !my-1">
            <li>
              Initialisierung eines Arrays <code>table</code> mit der Größe{" "}
              <InlineMath math="n + 1" />.
            </li>
            <li>
              Setzen der Basisfälle:
              <ul className="list-disc list-inside ml-6">
                <li>
                  <code>table[0] = 0</code>
                </li>
                <li>
                  <code>table[1] = 1</code>
                </li>
              </ul>
            </li>
            <li>
              Iteration von <code>i = 2</code> bis <code>i = n</code>:
              <ul className="list-disc list-inside ml-6">
                <li>
                  Berechnung von{" "}
                  <code>table[i] = table[i - 1] + table[i - 2]</code>
                </li>
              </ul>
            </li>
            <li>
              Rückgabe von <code>table[n]</code>, dem <InlineMath math="n" />
              -ten Fibonacci-Wert.
            </li>
          </ul>

          <p className="!my-2">
            <strong>Laufzeitkomplexität:</strong>
          </p>
          <InlineMath math="O(n)" />
          <p>
            <strong>Vorteile des iterativen Ansatzes:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>Vermeidung von Rekursion und damit verbundenem Overhead</li>
            <li>
              Effiziente Nutzung von Speicher durch sequentielle Berechnung
            </li>
            <li>Lineare Laufzeitkomplexität</li>
          </ul>
          <p>
            <strong>Vergleich zu anderen Ansätzen:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              Im Gegensatz zum rekursiven Ansatz vermeidet der iterative Ansatz
              Stack-Overflow-Probleme und redundante Berechnungen.
            </li>
            <li>
              Gegenüber dem memoisierten Ansatz benötigt er keinen zusätzlichen
              Speicher für die Speicherung von Zwischenergebnissen, da die Werte
              in einer festen Tabelle gehalten werden.
            </li>
          </ul>
          <p>
            Der iterative Fibonacci-Algorithmus bietet eine effiziente und
            einfache Methode zur Berechnung von Fibonacci-Zahlen, insbesondere
            für größere Werte von <InlineMath math="n" />, ohne die Nachteile
            der Rekursion.
          </p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default FibTabExplain;
