// GridTravelerRecExplain.tsx
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

const GridTravelerExplain: React.FC = () => {
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
          <DialogTitle>Rekursiver GridTraveler-Algorithmus</DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-4">
          <p>
            Der rekursive <strong>GridTraveler</strong>-Algorithmus berechnet
            die minimalen Kosten, um von der Startposition (0,0) zur
            Zielposition (<InlineMath math="m" />, <InlineMath math="n" />) in
            einem Gitter zu gelangen. Dabei kann man sich nur nach rechts oder
            nach unten bewegen, und jedes Feld im Gitter hat eine bestimmte
            Kostenangabe.
          </p>
          <pre
            className={
              theme === "light" ? "bg-gray-100" : `bg-gray-800 p-2 rounded`
            }
          >
            <code>
              {`public int GridTravel(int[,] grid, int m, int n)
{
  if (m == 0 && n == 0)
    return grid[0, 0];

  if (m < 0 || n < 0)
    return int.MaxValue;

  int costAbove = GridTravel(grid, m - 1, n);
  int costLeft = GridTravel(grid, m, n - 1);

  return grid[m, n] + Math.Min(costAbove, costLeft);
}`}
            </code>
          </pre>
          <p>
            In der Visualisierung werden alle möglichen Pfade vom Startpunkt zum
            Zielpunkt dargestellt. Die Kosten für jeden möglichen Pfad werden
            berechnet, um den minimalen Gesamtpfadkosten zu ermitteln.
          </p>
          <span>
            <p>
              Durch Anklicken eines Knotens können Sie die weiteren rekursiven
              Aufrufe und deren Kosten einsehen.
            </p>
          </span>
          <p>
            <strong>Funktionsweise:</strong>
          </p>
          <strong>Basisfälle:</strong>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              Wenn <InlineMath math="m = 0" /> und <InlineMath math="n = 0" />,
              wird die Funktion mit den Kosten des Startfelds{" "}
              <code>grid[0, 0]</code> initialisiert.
            </li>
            <li>
              Wenn <InlineMath math="m &lt; 0" /> oder{" "}
              <InlineMath math="n &lt; 0" />, gibt die Funktion{" "}
              <code>int.MaxValue</code> zurück, was bedeutet, dass dieser Pfad
              nicht gültig ist.
            </li>
          </ul>
          <strong>Rekursiver Schritt:</strong>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              Berechne die minimalen Kosten vom Feld oberhalb:{" "}
              <code>costAbove = GridTravel(grid, m - 1, n)</code>.
            </li>
            <li>
              Berechne die minimalen Kosten vom Feld links:{" "}
              <code>costLeft = GridTravel(grid, m, n - 1)</code>.
            </li>
            <li>
              Die minimalen Kosten zum aktuellen Feld sind die Kosten des
              aktuellen Feldes plus dem Minimum der beiden zuvor berechneten
              Kosten: <code>grid[m, n] + Math.Min(costAbove, costLeft)</code>.
            </li>
          </ul>
          <p className="!my-2">
            <strong>Laufzeitkomplexität:</strong>
          </p>
          <InlineMath math="O(2^{m+n})" />
          <p>
            <strong>Probleme des rekursiven Ansatzes:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>Redundante Berechnungen durch überlappende Teilprobleme</li>
            <li>Exponentielle Laufzeit, ineffizient für größere Gitter</li>
            <li>Hoher Speicherverbrauch durch tiefe Rekursionen</li>
          </ul>
          <p>
            <strong>Optimierungen:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              <strong>Memoisierung:</strong> Speichern der Ergebnisse bereits
              berechneter Positionen, um redundante Berechnungen zu vermeiden
              und die Laufzeit auf <InlineMath math="O(m \cdot n)" /> zu
              reduzieren.
            </li>
            <li>
              <strong>Iterative Methode (Bottom-Up-Ansatz):</strong> Verwendung
              einer tabellarischen Methode, um die minimalen Kosten für jede
              Position im Gitter iterativ zu berechnen.
            </li>
          </ul>
          <p>
            Der rekursive <code>GridTravel</code>-Algorithmus ist einfach zu
            verstehen, jedoch aufgrund seiner exponentiellen Laufzeit für
            größere Gitter unpraktisch. Durch Optimierungen wie Memoisierung
            oder den tabellarischen Ansatz kann die Effizienz erheblich
            gesteigert werden.
          </p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default GridTravelerExplain;
