// FibExplain.tsx
import React from "react";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
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

const FibExplain: React.FC = () => {
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
          <DialogTitle>Rekursiver Fibonacci-Algorithmus</DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-4">
          <p>
            Der rekursive Fibonacci-Algorithmus implementiert die mathematische
            Definition der Fibonacci-Reihe direkt:
          </p>
          <pre
            className={
              theme === "light"
                ? "bg-gray-100 p-2 rounded"
                : "bg-gray-800 p-2 rounded"
            }
          >
            <code>
              {`public int Fib(int n)
{
  if (n <= 1) return n;
  return Fib(n - 1) + Fib(n - 2);
}`}
            </code>
          </pre>
          <p>
            Der dargestellte Baum spiegelt den gebildeten Rekursionsbaum für
            Aufruf von <code>Fib(int n)</code> mit dem gewählten Input wider.
          </p>
          <span>
            <p>
              Bei steigendem Input werden die überlappenden Teilprobleme schnell
              ersichtlich und führen zu redundanten Berechnungen.
            </p>
          </span>
          <span>
            <div className="flex items-center space-x-1">
              <svg width={10} height={10}>
                <circle fill="red" cy={5} cx={5} r={5} />
              </svg>
              <p>
                Das Klicken eines Knotens zeigt alle redundanten Berechnungen
                für den jeweiligen Teilbaum.
              </p>
            </div>
          </span>
          <p>
            <strong>Funktionsweise:</strong>
          </p>

          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              Für <InlineMath math="n > 1" /> ruft die Funktion sich selbst
              zweimal auf: <InlineMath math="Fib(n - 1)" /> und{" "}
              <InlineMath math="Fib(n - 2)" />.
            </li>
            <li>
              Die Ergebnisse dieser Aufrufe werden addiert, um{" "}
              <InlineMath math="Fib(n)" /> zu berechnen.
            </li>
          </ul>

          <p className="!my-2">
            <strong>Laufzeitkomplexität:</strong>
          </p>
          <InlineMath math="O(2^n)" />
          <p>
            <strong>Probleme des rekursiven Ansatzes:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>Redundante Berechnungen</li>
            <li>Hoher Speicherverbrauch</li>
            <li>Exponentielle Laufzeit</li>
          </ul>
          <p>
            <strong>Optimierungen:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              <strong>Memoisierung (Top-Down-Ansatz):</strong> Durch das
              Speichern bereits berechneter Werte werden redundante Berechnungen
              vermieden, wodurch sich die Laufzeitkomplexität auf{" "}
              <InlineMath math="O(n)" /> reduziert.
            </li>
            <li>
              <strong>Iterative Methode (Bottom-Up-Ansatz):</strong> Die Sequenz
              wird iterativ berechnet, was ebenfalls eine lineare
              Laufzeitkomplexität von <InlineMath math="O(n)" /> ermöglicht.
            </li>
          </ul>
          <p>
            Obwohl der rekursive Fibonacci-Algorithmus die mathematische
            Definition elegant widerspiegelt, ist er aufgrund seiner
            exponentiellen Laufzeit für praktische Anwendungen ineffizient.
            Durch Implementierung von Optimierungen wie Memoisierung oder
            Verwendung eines iterativen Ansatzes wird die Performance erheblich
            verbessert, sodass auch größere Fibonacci-Zahlen effizient berechnet
            werden können.
          </p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default FibExplain;
