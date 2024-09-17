// GridTravelerMemoExplain.tsx
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

const GridTravelerMemoExplain: React.FC = () => {
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
          <DialogTitle>Memoisierter GridTraveler-Algorithmus</DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-4">
          <p>
            Der memoisierte <strong>GridTraveler</strong>-Algorithmus verbessert
            die Effizienz des rekursiven Ansatzes, indem er bereits berechnete
            Ergebnisse speichert und somit redundante Berechnungen vermeidet. Er
            berechnet die minimalen Kosten, um von der Startposition (0,0) zur
            Zielposition (<InlineMath math="m" />, <InlineMath math="n" />) in
            einem Gitter zu gelangen.
          </p>
          <pre
            className={
              theme === "light" ? "bg-gray-100" : `bg-gray-800 p-2 rounded`
            }
          >
            <code>
              {`private static int GridTravelMemo(int[,] grid, int m, int n, int[,] memo)
{
  if (m == 0 && n == 0) return grid[0, 0];
  if (m < 0 || n < 0) return int.MaxValue;
  if (memo[m, n] != -1)
    return memo[m, n];

  int costFromAbove = GridTravelMemo(grid, m - 1, n, memo);
  int costFromLeft = GridTravelMemo(grid, m, n - 1, memo);

  memo[m, n] = grid[m, n] + Math.Min(costFromAbove, costFromLeft);

  return memo[m, n];
}

public static int MinCost(int[,] grid, int m, int n)
{
  int[,] memo = new int[m + 1, n + 1];
  for (int i = 0; i <= m; i++)
    for (int j = 0; j <= n; j++)
      memo[i, j] = -1;

  return GridTravelMemo(grid, m, n, memo);
}`}
            </code>
          </pre>
          <p>
            In der Visualisierung wird der Rekursionsbaum in form einer Tabelle
            dargestellt, wobei bereits berechnete Positionen aus dem
            Memoisierungs-Cache abgerufen und nicht erneut berechnet werden.
          </p>
          <span>
            <p>
              Der Algorithmus startet ähnlich wie der rekursive Ansatz, jedoch
              wird werden die bereits berechneten Ergebnisse im
              Memoisierungs-Array gespeichert und wiederverwendet. Durch die
              Speicherung der Ergebnisse werden überlappende Teilprobleme
              vermieden, was zu einer erheblichen Reduzierung der Anzahl der
              Berechnungen führt.
            </p>
          </span>
          <span>
            <p>
              <span
                className={`inline-block w-3 h-3 bg-orange-300 mr-1`}
              ></span>
              repräsentiert Zellen, die aus dem Memo-Array abgerufen wurden und
              nicht erneut berechnet werden mussten.
            </p>
          </span>
          <span>
            <p>
              <span className={`inline-block w-3 h-3 bg-blue-300 mr-1`}></span>
              repräsentiert Zellen, die neu berechnet wurden und dem Memo-Array
              hinzugefügt wurden.
            </p>
          </span>
          <span>
            <p>
              <span className={`inline-block w-3 h-3 bg-green-300 mr-1`}></span>
              repräsentiert die minimalen Pfadkosten in Zelle{" "}
              <InlineMath math="(m, n)" />.
            </p>
          </span>
          <span>
            <p>
              <span className="text-sm"> (Wert) </span> repräsentiert die
              memoisierten Pfadkosten der Zelle.
            </p>
          </span>

          <p>
            <strong>Funktionsweise:</strong>
          </p>
          <strong>Initialisierung:</strong>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              Ein Memoisierungs-Array <code>memo</code> der Größe{" "}
              <InlineMath math="(m + 1) \times (n + 1)" /> wird erstellt und mit{" "}
              <code>-1</code> initialisiert.
            </li>
          </ul>
          <strong>Basisfälle:</strong>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              Wenn <InlineMath math="m = 0" /> und <InlineMath math="n = 0" />,
              gibt die Funktion <code>grid[0, 0]</code> zurück.
            </li>
            <li>
              Wenn <InlineMath math="m &lt; 0" /> oder{" "}
              <InlineMath math="n &lt; 0" />, gibt die Funktion{" "}
              <code>int.MaxValue</code> zurück.
            </li>
          </ul>
          <strong>Memoisierung:</strong>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              Wenn <code>memo[m, n] != -1</code>, wurde dieser Wert bereits
              berechnet und wird direkt zurückgegeben.
            </li>
          </ul>
          <strong>Rekursiver Schritt:</strong>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              Berechne die minimalen Kosten vom Feld oberhalb:{" "}
              <code>costFromAbove = GridTravelMemo(grid, m - 1, n, memo)</code>.
            </li>
            <li>
              Berechne die minimalen Kosten vom Feld links:{" "}
              <code>costFromLeft = GridTravelMemo(grid, m, n - 1, memo)</code>.
            </li>
            <li>
              Speichere das Ergebnis im Memo-Array:{" "}
              <code>
                memo[m, n] = grid[m, n] + Math.Min(costFromAbove, costFromLeft)
              </code>
              .
            </li>
          </ul>
          <p>
            <strong>Laufzeitkomplexität:</strong>
          </p>
          <InlineMath math="O(m \cdot n)" />
          <p>
            <strong>Vorteile des memoisierten Ansatzes:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              Vermeidung redundanter Berechnungen durch Speicherung bereits
              berechneter Ergebnisse
            </li>
            <li>
              Signifikante Reduzierung der Laufzeit von exponentiell auf
              polynomiell
            </li>
            <li>Effizientere Nutzung von Ressourcen</li>
          </ul>
          <p>
            <strong>Unterschiede zum rekursiven Ansatz:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              Während der einfache rekursive Ansatz dieselben Positionen
              mehrfach berechnet, speichert der memoisierte Ansatz diese, um sie
              wiederzuverwenden.
            </li>
            <li>
              Der memoisierte Ansatz erfordert zusätzlichen Speicherplatz für
              das Memoisierungs-Array.
            </li>
            <li>
              Die Laufzeit verbessert sich von exponentiell auf polynomiell.
            </li>
          </ul>
          <p>
            Durch die Verwendung von Memoisierung wird der{" "}
            <code>GridTraveler</code>-Algorithmus erheblich effizienter, wodurch
            die Berechnung für größere Gitter praktikabel wird.
          </p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default GridTravelerMemoExplain;
