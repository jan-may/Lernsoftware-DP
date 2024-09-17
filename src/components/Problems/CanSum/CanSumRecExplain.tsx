// CanSumExplain.tsx
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { Button } from "../../../components/ui/button";
import { InlineMath } from "react-katex";
import { useTheme } from "../../../components/theme-provider";
const CanSumRecExplain: React.FC = () => {
  const { theme } = useTheme();
  return (
    <Dialog>
      {/* Tooltip wrapping only the DialogTrigger Button */}
      <TooltipProvider delayDuration={100} skipDelayDuration={1}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="flex items-center"
              >
                <HelpCircle className="h-6 w-6 mr-2" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent className="bg-muted text-sm">
            <p>Erklärung anzeigen</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Dialog Content */}
      <DialogContent className="w-[90vw] max-w-5xl p-8">
        <DialogHeader>
          <DialogTitle>Rekursiver canSum-Algorithmus</DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-4">
          <p>
            Der rekursive <strong>canSum</strong>-Algorithmus bestimmt, ob es
            möglich ist, eine Zielsumme (<code>targetSum</code>) unter
            Verwendung einer Kombination von Zahlen aus einem gegebenen Array (
            <code>numbers</code>) zu erreichen. Jede Zahl im Array kann beliebig
            oft verwendet werden.
          </p>
          <pre
            className={
              theme === "light" ? "bg-gray-100" : `bg-gray-800 p-2 rounded`
            }
          >
            <code>
              {`public bool CanSumRec(int targetSum, int[] numbers)
{
  if (targetSum == 0) return true;
  if (targetSum < 0) return false;

  foreach (int num in numbers)
  {
    int remainder = targetSum - num;
    if (CanSumRec(remainder, numbers))
    {
      return true;
    }
  }

  return false;
}`}
            </code>
          </pre>
          <p>
            In der Visualisierung wird der Rekursionsbaum dargestellt, der alle
            möglichen Kombinationen der Zahlen zeigt, die zur Zielsumme führen
            könnten, indem vom Wurzelknoten aus rekursive Aufrufe durchgeführt
            und dabei jeweils eine Zahl subtrahiert wird.
          </p>
          <span>
            <p>
              Von jedem Knoten aus werden rekursive Aufrufe für alle Zahlen im
              Array durchgeführt.
            </p>
          </span>
          <span>
            <div className="flex items-center space-x-2">
              <svg width={10} height={10}>
                <circle fill="gray" cy={5} cx={5} r={5} />
              </svg>
              <p>
                Negative Pfade werden mit einem grauen Blatt-Knoten dargestellt.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <svg width={10} height={10}>
                <circle fill="lightblue" cy={5} cx={5} r={5} />
              </svg>
              <span>
                <p>
                  Erfolgreiche Pfade werden mit einem blauen Blatt-Knoten (Wert
                  0) dargestellt.
                </p>
              </span>
            </div>
          </span>

          <span>
            <div className="flex items-center space-x-2">
              <svg width={10} height={10}>
                <circle fill="red" cy={5} cx={5} r={5} />
              </svg>
              <p>
                Das Klicken eines Knotens zeigt redundante Berechnungen für den
                jeweiligen Teilbaum.
              </p>
            </div>
          </span>
          <p>
            <strong>Funktionsweise:</strong>
          </p>
          <strong>Basisfälle:</strong>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              Wenn <InlineMath math="\text{targetSum} = 0" />, gibt die Funktion{" "}
              <code>true</code> zurück.
            </li>
            <li>
              Wenn <InlineMath math="\text{targetSum} &lt; 0" />, gibt die
              Funktion <code>false</code> zurück.
            </li>
          </ul>
          <strong>Rekursiver Schritt:</strong>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              Iteriere über jedes Element <code>num</code> in{" "}
              <code>numbers</code>.
            </li>
            <li>
              Berechne den Rest:{" "}
              <InlineMath math="\text{remainder} = \text{targetSum} - \text{num}" />
              .
            </li>
            <li>
              Führe einen rekursiven Aufruf mit dem neuen <code>remainder</code>{" "}
              durch:
              <code>CanSumRec(remainder, numbers)</code>.
            </li>
            <li>
              Wenn einer der rekursiven Aufrufe <code>true</code> zurückgibt,
              gibt die Funktion insgesamt
              <code>true</code> zurück.
            </li>
          </ul>
          <p>
            {" "}
            Wenn keine Kombination zur Zielsumme führt, gibt die Funktion{" "}
            <code>false</code> zurück.{" "}
          </p>
          <p className="!my-2">
            <strong>Laufzeitkomplexität:</strong>
          </p>
          <InlineMath math="O(n^{\text{m}})" />
          <p>
            <strong>Probleme des rekursiven Ansatzes:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>Redundante Berechnungen durch überlappende Teilprobleme</li>
            <li>Exponentielle Laufzeit, ineffizient für große Zielsummen</li>
            <li>Hoher Speicherverbrauch durch tiefe Rekursionen</li>
          </ul>
          <p>
            <strong>Optimierungen:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              <strong>Memoisierung:</strong> Speichern der Ergebnisse bereits
              berechneter Restsummen, um redundante Berechnungen zu vermeiden
              und die Laufzeit auf <InlineMath math="O(n \cdot \text{m})" /> zu
              reduzieren.
            </li>
            <li>
              <strong>Iterative Methode (Bottom-Up-Ansatz):</strong> Verwendung
              eines tabellarischen Ansatzes, um die Möglichkeiten zu berechnen,
              was ebenfalls zu einer effizienteren Laufzeit{" "}
              <InlineMath math="O(n \cdot \text{m})" /> führt.
            </li>
          </ul>
          <p>
            Der rekursive <code>canSum</code>-Algorithmus ist einfach zu
            verstehen und zu implementieren, jedoch aufgrund seiner
            exponentiellen Laufzeit für große Zielsummen unpraktisch. Durch
            Optimierungen wie Memoisierung kann die Effizienz erheblich
            gesteigert werden.
          </p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CanSumRecExplain;
