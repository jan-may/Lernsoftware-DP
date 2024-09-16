// FibMemoExplain.tsx
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

const FibMemoExplain: React.FC = () => {
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
          <DialogTitle>Memoisierter Fibonacci-Algorithmus</DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-4">
          <p>
            Der memoisierte Fibonacci-Algorithmus optimiert den rekursiven
            Ansatz, indem er bereits berechnete Ergebnisse speichert und somit
            redundante Berechnungen vermeidet.
          </p>
          <pre
            className={
              theme === "light" ? "bg-gray-100" : `bg-gray-800 p-2 rounded`
            }
          >
            <code>
              {`public int FibMemo(int n, int[] memo)
{
  if (memo[n] != 0) return memo[n];
  if (n <= 1) return n;
  memo[n] = FibMemo(n - 1, memo) + FibMemo(n - 2, memo);
  return memo[n];
}`}
            </code>
          </pre>
          <p>
            Der Baum spiegelt den Rekursionsbaum für den Aufruf von{" "}
            <code>FibMemo(int n, int[] memo)</code> mit dem gewählten Input
            wider, wobei bereits berechnete Werte gespeichert werden.
          </p>
          <span>
            <p>
              Durch die Speicherung von Zwischenergebnissen werden überlappende
              Teilprobleme vermieden, was zu einer erheblichen Reduzierung der
              Berechnungen, besonders für große Inputs führt. Grüne Knoten
              zeigen nun bereits gespeicherte Werte an.
            </p>
          </span>
          <span>
            <p>
              Das Klicken eines Knotens zeigt weiterhin mehrfach berechnete
              Knoten an. Die Anzahl kann 2 nun nicht mehr überschreiten.
            </p>
          </span>
          <p>
            <strong>Funktionsweise:</strong>
          </p>

          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              Für jeden Aufruf wird überprüft, ob <code>memo[n]</code> bereits
              einen Wert enthält. Ist dies der Fall, wird dieser direkt
              zurückgegeben.
            </li>
            <li>
              Wenn <InlineMath math="n \leq 1" /> ist, wird <code>n</code>{" "}
              zurückgegeben.
            </li>
            <li>
              Andernfalls wird <code>FibMemo(n - 1, memo)</code> und{" "}
              <code>FibMemo(n - 2, memo)</code> aufgerufen, und das Ergebnis
              wird in <code>memo[n]</code> gespeichert.
            </li>
          </ul>

          <p className="!my-2">
            <strong>Laufzeitkomplexität:</strong>
          </p>
          <InlineMath math="O(n)" />
          <p>
            <strong>Vorteile des memoisierten Ansatzes:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>Vermeidung redundanter Berechnungen</li>
            <li>Effizientere Nutzung des Speichers</li>
            <li>Lineare Laufzeitkomplexität</li>
          </ul>
          <p>
            <strong>Unterschiede zum rekursiven Ansatz:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              Während der rekursive Ansatz dieselben Teilprobleme mehrfach
              berechnet, speichert der memoiserte Ansatz diese, um sie
              wiederzuverwenden.
            </li>
            <li>Die Laufzeit verbessert sich von exponentiell zu linear.</li>
            <li>
              Zusätzlicher Speicherplatz für das Memoisierungs-Array wird
              benötigt.
            </li>
          </ul>
          <p>
            Durch die Verwendung von Memoisierung wird der Fibonacci-Algorithmus
            erheblich effizienter, wodurch die Berechnung größerer
            Fibonacci-Zahlen in akzeptabler Zeit möglich ist.
          </p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default FibMemoExplain;
