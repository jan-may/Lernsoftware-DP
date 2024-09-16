// CanSumTabExplain.tsx
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";

const CanSumTabExplain: React.FC = () => {
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
          <DialogTitle>
            Tabellarischer canSum-Algorithmus (Bottom-Up)
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-4">
          <p>
            Der tabellarische <strong>canSum</strong>-Algorithmus verwendet
            einen dynamischen Programmieransatz, um effizient zu bestimmen, ob
            es möglich ist, eine Zielsumme (<code>targetSum</code>) unter
            Verwendung einer Kombination von Zahlen aus einem gegebenen Array (
            <code>numbers</code>) zu erreichen. Dieser Ansatz baut eine Tabelle
            auf, die systematisch alle möglichen Summen bis zur Zielsumme
            berechnet.
          </p>
          <pre
            className={
              theme === "light" ? "bg-gray-100" : `bg-gray-800 p-2 rounded`
            }
          >
            <code>
              {`public bool CanSumTab(int targetSum, int[] numbers)
{
  bool[] table = new bool[targetSum + 1];
  table[0] = true;

  for (int i = 0; i <= targetSum; i++)
  {
    if (table[i])
    {
      foreach (int num in numbers)
      {
        if (i + num <= targetSum)
        {
          table[i + num] = true;
        }
      }
    }
  }
  return table[targetSum];
}`}
            </code>
          </pre>
          <p>
            In der Visualisierung wird die Tabelle dargestellt, wobei jede Zelle
            anzeigt, ob eine bestimmte Summe erreichbar ist. Grün markierte
            Zellen sind erreichbar, während die aktuelle Zelle, die verarbeitet
            wird, rot umrandet ist.
          </p>
          <span>
            <p>
              Durch den Bottom-Up-Ansatz werden alle möglichen Kombinationen
              systematisch geprüft, ohne redundante Berechnungen oder tiefe
              Rekursionen.
            </p>
          </span>
          <span>
            <p>
              Das Klicken auf eine Zelle zeigt, welche Summen durch Hinzufügen
              der verfügbaren Zahlen erreicht werden können.
            </p>
          </span>
          <p>
            <strong>Funktionsweise:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              Initialisierung eines booleschen Arrays <code>table</code> der
              Größe <InlineMath math="\text{targetSum} + 1" />, wobei alle Werte
              auf <code>false</code> gesetzt sind, außer <code>table[0]</code>,
              das auf <code>true</code> gesetzt wird.
            </li>
            <li>
              Iteration von <code>i = 0</code> bis <code>i = targetSum</code>:
              <ul className="list-disc list-inside ml-6">
                <li>
                  Wenn <code>table[i]</code> <code>true</code> ist, bedeutet
                  dies, dass die Summe <code>i</code> erreichbar ist.
                </li>
                <li>
                  Für jede Zahl <code>num</code> in <code>numbers</code>:
                  <ul className="list-disc list-inside ml-6">
                    <li>
                      Berechne die neue Summe:{" "}
                      <InlineMath math="\text{newSum} = i + \text{num}" />.
                    </li>
                    <li>
                      Wenn <code>newSum &leq; targetSum</code>, setze{" "}
                      <code>table[newSum]</code> auf <code>true</code>.
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              Nach Abschluss der Iterationen gibt <code>table[targetSum]</code>{" "}
              an, ob die Zielsumme erreichbar ist.
            </li>
          </ul>
          <p className="!my-2">
            <strong>Laufzeitkomplexität:</strong>
          </p>
          <InlineMath math="O(n \cdot m)" />, wobei <InlineMath math="n" /> die
          Anzahl der Elemente in <code>numbers</code> ist.
          <p>
            <strong>Vorteile des tabellarischen Ansatzes:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>Vermeidung von Rekursion und damit verbundenem Overhead</li>
            <li>
              Systematische Berechnung aller möglichen Summen ohne redundante
              Berechnungen
            </li>
            <li>
              Lineare Laufzeit in Bezug auf die Zielsumme und die Anzahl der
              Zahlen
            </li>
          </ul>
          <p>
            <strong>Vergleich zu anderen Ansätzen:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              Im Gegensatz zum rekursiven Ansatz vermeidet der tabellarische
              Ansatz tiefe Rekursionen und Stack-Overflow-Probleme.
            </li>
            <li>
              Gegenüber dem memoisierten rekursiven Ansatz bietet der
              tabellarische Ansatz oft eine bessere konstante Zeit aufgrund der
              iterativen Natur.
            </li>
            <li>
              Der Speicherverbrauch ist auf die Größe der Tabelle beschränkt,
              unabhängig von der Tiefe der Rekursion.
            </li>
          </ul>
          <p>
            Der tabellarische <code>canSum</code>-Algorithmus ist eine
            effiziente Methode, um festzustellen, ob eine Zielsumme erreicht
            werden kann. Durch die Verwendung von dynamischer Programmierung
            werden die Nachteile des rekursiven Ansatzes überwunden, und die
            Berechnung ist für große Zielwerte praktikabel.
          </p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CanSumTabExplain;
