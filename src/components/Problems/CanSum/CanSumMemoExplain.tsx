// CanSumMemoExplain.tsx
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

const CanSumMemoExplain: React.FC = () => {
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
          <DialogTitle>Memoisierter canSum-Algorithmus</DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-4">
          <p>
            Der memoisierte <strong>canSum</strong>-Algorithmus verbessert die
            Effizienz des rekursiven Ansatzes, indem er bereits berechnete
            Ergebnisse speichert und somit redundante Berechnungen vermeidet. Er
            bestimmt, ob es möglich ist, eine Zielsumme (<code>targetSum</code>)
            unter Verwendung einer Kombination von Zahlen aus einem gegebenen
            Array (<code>numbers</code>) zu erreichen.
          </p>
          <pre
            className={
              theme === "light" ? "bg-gray-100" : `bg-gray-800 p-2 rounded`
            }
          >
            <code>
              {`public bool CanSumMemo(int targetSum, int[] numbers, Dictionary<int, bool> memo = null)
{
  if (memo == null)
    memo = new Dictionary<int, bool>();

  if (memo.ContainsKey(targetSum)) return memo[targetSum];
  if (targetSum == 0) return true;
  if (targetSum < 0) return false;

  foreach (int num in numbers)
  {
    int remainder = targetSum - num;
    if (CanSumMemo(remainder, numbers, memo))
    {
      memo[targetSum] = true;
      return true;
    }
  }

  memo[targetSum] = false;
  return false;
}`}
            </code>
          </pre>
          <p>
            In der Visualisierung wird der Rekursionsbaum dargestellt, wobei
            bereits berechnete Restsummen aus dem Memoisierungs-Cache abgerufen
            und nicht erneut berechnet werden.
          </p>
          <span>
            <p>
              Durch die Speicherung der Ergebnisse werden überlappende
              Teilprobleme vermieden, was zu einer erheblichen Reduzierung der
              Anzahl der Berechnungen führt.
            </p>
          </span>
          <span>
            <p>
              Das Klicken eines Knotens zeigt, welche Werte aus dem Cache
              abgerufen wurden (grün) und welche neu berechnet wurden.
            </p>
          </span>
          <p>
            <strong>Funktionsweise:</strong>
          </p>
          <strong>Initialisierung:</strong>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              Wenn das <code>memo</code>-Dictionary nicht vorhanden ist, wird es
              initialisiert.
            </li>
          </ul>
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
          <strong>Memoisierung:</strong>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              Wenn <code>memo</code> bereits einen Eintrag für{" "}
              <code>targetSum</code> enthält, wird dieser Wert zurückgegeben.
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
              durch: <code>CanSumMemo(remainder, numbers, memo)</code>.
            </li>
            <li>
              Wenn einer der rekursiven Aufrufe <code>true</code> zurückgibt:
              <ul className="list-disc list-inside ml-6">
                <li>
                  Speichere <code>memo[targetSum] = true</code>.
                </li>
                <li>
                  Gib <code>true</code> zurück.
                </li>
              </ul>
            </li>
          </ul>
          <p>Wenn keine Kombination zur Zielsumme führt:</p>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              Speichere <code>memo[targetSum] = false</code>.
            </li>
            <li>
              Gib <code>false</code> zurück.
            </li>
          </ul>
          <p className="!my-2">
            <strong>Laufzeitkomplexität:</strong>
          </p>
          <InlineMath math="O(n \cdot \text{m})" />, wobei{" "}
          <InlineMath math="n" /> die Anzahl der Elemente in{" "}
          <code>numbers</code> und <InlineMath math="m" /> die Zielsumme (
          <code>targetSum</code>) ist.
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
              polynomial
            </li>
            <li>Effizientere Nutzung von Ressourcen</li>
          </ul>
          <p>
            <strong>Unterschiede zum rekursiven Ansatz:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 !my-1">
            <li>
              Während der einfache rekursive Ansatz dieselben Restsummen
              mehrfach berechnet, speichert der memoisierte Ansatz diese, um sie
              wiederzuverwenden.
            </li>
            <li>
              Der memoisierte Ansatz erfordert zusätzlichen Speicherplatz für
              das <code>memo</code>-Dictionary.
            </li>
            <li>
              Die Laufzeit verbessert sich von exponentiell auf polynomial.
            </li>
          </ul>
          <p>
            Durch die Verwendung von Memoisierung wird der <code>canSum</code>
            -Algorithmus erheblich effizienter, wodurch die Berechnung für
            größere Zielwerte und größere Zahlenarrays praktikabel wird.
          </p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default CanSumMemoExplain;
