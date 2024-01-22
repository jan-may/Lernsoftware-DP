import { DownloadBtn } from "./Download";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneLight,
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "./theme-provider";
import { FibTable } from "./FibTable";
import { ClipboardBtn } from "./ClipboardBtn";
import { aufgabeCode, fibonacciDefinition } from "../trees/fibonacci";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export const Problem = () => {
  const { theme } = useTheme();
  return (
    <div style={{ minHeight: "calc(100vh - 54px)",  }}>
      <Accordion type="multiple">
        <AccordionItem value="beschreibung">
          <AccordionTrigger className="text-xl">
            Problembeschreibung
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm">
              Die Fibonacci-Folge ist rekursiv wie folgt definiert:
            </p>
            <div className="my-10 w-32">
              <BlockMath math={fibonacciDefinition} />
            </div>
            <FibTable />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="bedingung">
          <AccordionTrigger className="text-xl">
            Bedingungen Für dynamische Programmierung
          </AccordionTrigger>
          <AccordionContent>
            <div className="max-w-3xl">
              <p>
                Um dynamische Programmierung anwenden zu können ist es
                essenziell, die Rekursionbedingung des Problemes zu verstehen
                und das Problem gedanklich in Teilprobleme zu zerlegen. Die
                Teilprobleme müssen in der Form vorliegen, dass sie sich
                überlappen und somit die Lösung des Gesamtproblems aus den
                Lösungen der Teilprobleme zusammengesetzt werden kann.
              </p>
              <p>
                Der oftmals schwierigste Teil ist es, diese optimale
                Teilstruktur zu erkennen.
              </p>
              <p className="mb-4">
                Versuchen Sie die beiden untenstehenden Eigenschaften für das
                gegebene Problem zu definieren. Sollten Sie nach einiger Zeit zu
                keiner Lösung kommen, können Sie sich die Lösung anzeigen
                lassen. Der Lernerfolg ist jedoch größer, wenn Sie die Lösung
                selbst erarbeiten.
              </p>
              <p className="mb-2">
                <span className="mr-4 ">Optimale Teilstruktur:</span>
                <InlineMath math=" F(n-1)" /> und <InlineMath math="F(n-2)" />
              </p>
              <p>
                <span className="mr-4">Überlappende Teilprobleme:</span>
                <InlineMath math="F(n) = F(n-1) + F(n-2)" />
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="aufgabe">
          <AccordionTrigger className="text-xl">
            Aufgabenstellug
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-1">
              Implementieren Sie folgende Methoden der Klasse{" "}
              <code>FibonacciCalculator</code>:
            </p>
            <div
              style={{
                fontSize: "14px",
                maxWidth: "650px",
                position: "relative",
              }}
            >
              <SyntaxHighlighter
                language={"cs"}
                style={theme === "light" ? oneLight : oneDark}
                wrapLines
                wrapLongLines
              >
                {aufgabeCode}
              </SyntaxHighlighter>

              <ClipboardBtn code={aufgabeCode} bluredCode={false} />
              <div className="max-w-3xl">
                <p className="mb-2">
                  Die Implemnetierung der Methoden kann mit folgenden
                  bereitgestellten Testcases überprüft werden. Das Bestehen der
                  Testcases setzt vorraus, dass konzete der dynamischen
                  Programmierung angewand wurden.
                </p>
                <p className="mb-4">
                  Im FAQ Bereich befindet sich eine Anleitung zum Ausführen der
                  Testcases.
                </p>
              </div>
              <DownloadBtn />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
