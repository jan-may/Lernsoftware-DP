// GridTravelerDPExplain.tsx
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

const GridTravelerDPExplain: React.FC = () => {
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
            Tabellarischer GridTraveler-Algorithmus (Bottom-Up)
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-4">
          <p>
            Der tabellarische <strong>GridTraveler</strong>-Algorithmus
            verwendet einen dynamischen Programmieransatz, um effizient die
            minimalen Kosten zu berechnen, die erforderlich sind, um von der
            Startposition (0,0) zur Zielposition (
            <InlineMath math="m" />, <InlineMath math="n" />) in einem Gitter zu
            gelangen. Dabei kann man sich nur nach rechts oder nach unten
            bewegen, und jedes Feld im Gitter hat eine bestimmte Kostenangabe.
          </p>
          <pre
            className={
              theme === "light" ? "bg-gray-100" : `bg-gray-800 p-2 rounded`
            }
          >
            <code>
              {`public static int gridTravelerTab(int[,] grid, int m, int n)
{
  int[,] dp = new int[m + 1, n + 1];
  dp[0, 0] = grid[0, 0];

  for (int i = 1; i <= m; i++)
    dp[i, 0] = dp[i - 1, 0] + grid[i, 0];

  for (int j = 1; j <= n; j++)
    dp[0, j] = dp[0, j - 1] + grid[0, j];

  for (int i = 1; i <= m; i++)
  {
    for (int j = 1; j <= n; j++)
    {
      dp[i, j] = grid[i, j] + Math.Min(dp[i - 1, j], dp[i, j - 1]);
    }
  }

  return dp[m, n];
}`}
            </code>
          </pre>
          <p>
            In der Visualisierung wird die dynamische Programmierungstabelle
            (DP-Tabelle) dargestellt, wobei jede Zelle die minimalen Kosten
            enthält, um diese Position zu erreichen. Die Zellen, die gerade
            berechnet werden, sind rot umrandet, und die verglichenen
            Nachbarzellen sind farblich hervorgehoben.
          </p>
          <span>
            <p>
              Durch den Bottom-Up-Ansatz werden die minimalen Kosten iterativ
              für jede Position berechnet, ohne die Nachteile von Rekursion oder
              Memoisierung.
            </p>
          </span>
          <span>
            <p>
              Das Klicken auf eine Zelle zeigt die Berechnungsschritte und die
              verwendeten Nachbarwerte.
            </p>
          </span>
          <p>
            <strong>Funktionsweise:</strong>
          </p>

          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              Initialisierung einer DP-Tabelle <code>dp</code> der Größe{" "}
              <InlineMath math="(m + 1) \times (n + 1)" />.
            </li>
            <li>
              Setzen der Startposition:
              <ul className="list-disc list-inside ml-6">
                <li>
                  <code>dp[0, 0] = grid[0, 0]</code>
                </li>
              </ul>
            </li>
            <li>
              Füllen der ersten Spalte:
              <ul className="list-disc list-inside ml-6">
                <li>
                  Für <code>i</code> von <code>1</code> bis <code>m</code>:
                  <code>dp[i, 0] = dp[i - 1, 0] + grid[i, 0]</code>
                </li>
              </ul>
            </li>
            <li>
              Füllen der ersten Zeile:
              <ul className="list-disc list-inside ml-6">
                <li>
                  Für <code>j</code> von <code>1</code> bis <code>n</code>:
                  <code>dp[0, j] = dp[0, j - 1] + grid[0, j]</code>
                </li>
              </ul>
            </li>
            <li>
              Füllen der restlichen Tabelle:
              <ul className="list-disc list-inside ml-6">
                <li>
                  Für <code>i</code> von <code>1</code> bis <code>m</code>:
                  <ul className="list-disc list-inside ml-6">
                    <li>
                      Für <code>j</code> von <code>1</code> bis <code>n</code>:
                      <code>
                        dp[i, j] = grid[i, j] + Math.Min(dp[i - 1, j], dp[i, j -
                        1])
                      </code>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              Die minimale Pfadkosten sind in <code>dp[m, n]</code> gespeichert.
            </li>
          </ul>

          <p className="!my-2">
            <strong>Laufzeitkomplexität:</strong>
          </p>
          <InlineMath math="O(m \cdot n)" />
          <p>
            <strong>Vorteile des tabellarischen Ansatzes:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>Vermeidung von Rekursion und damit verbundenem Overhead</li>
            <li>
              Systematische und effiziente Berechnung der minimalen Kosten für
              jede Position
            </li>
            <li>
              Lineare Laufzeit in Bezug auf die Größe des Gitters (
              <InlineMath math="m" /> und <InlineMath math="n" />)
            </li>
          </ul>
          <p>
            <strong>Vergleich zu anderen Ansätzen:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              Im Gegensatz zum rekursiven Ansatz vermeidet der tabellarische
              Ansatz tiefe Rekursionen und redundante Berechnungen.
            </li>
            <li>
              Gegenüber dem memoisierten Ansatz ist der tabellarische Ansatz oft
              einfacher zu implementieren und hat einen geringeren konstanten
              Overhead.
            </li>
            <li>
              Der Speicherverbrauch ist auf die Größe der Tabelle beschränkt und
              leicht vorhersehbar.
            </li>
          </ul>
          <p>
            Der tabellarische <code>GridTraveler</code>-Algorithmus bietet eine
            effiziente Methode zur Berechnung der minimalen Pfadkosten in einem
            Gitter. Durch die Verwendung von dynamischer Programmierung werden
            die Nachteile des rekursiven und memoisierten Ansatzes überwunden,
            und die Berechnung ist für größere Gitter praktikabel.
          </p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default GridTravelerDPExplain;
