import "katex/dist/katex.min.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { Button } from "./ui/button";
import { Editor } from "./Editor";
import { useAppSelector } from "../hooks/redux";
import { FibDescription } from "./Problems/Fib/FibDescription";
import { TravelerDescription } from "./Problems/GridTraveler/TravelerDescription";
import { CanSumDescription } from "./Problems/CanSum/CanSumDescription";
import { CanSumTeilstruktur } from "./Problems/CanSum/CanSumTeilstruktur";
import { CanSumOverlappingTeilproblem } from "./Problems/CanSum/CanSumOverlappingTeilproblem";
import { GridTravelerTeilstruktur } from "./Problems/GridTraveler/GridTravelerTeilstruktur";
import { GridTravelerOverlappingTeilproblem } from "./Problems/GridTraveler/GridTravelerOverlappingProblem";
import { FibTeilstruktur } from "./Problems/Fib/FibTeilstruktur";
import { FibOverlappingTeilproblem } from "./Problems/Fib/FibOverlappingTeilproblem";

const renderContent = (selectedProblem: any) => {
  switch (selectedProblem) {
    case "fibonacci":
      return <FibDescription />;
    case "canSum":
      return <CanSumDescription />;
    case "gridTraveler":
      return <TravelerDescription />;

    default:
      return <div>Default</div>;
  }
};

const renderProblemName = (selectedProblem: any) => {
  switch (selectedProblem) {
    case "fibonacci":
      return <code>Fibonacci</code>;
    case "canSum":
      return <code>CanSum</code>;
    case "gridTraveler":
      return <code>GridTraveler</code>;
    default:
      return <div>Default</div>;
  }
};

const renderDynProblemTeilstruktur = (selectedProblem: any) => {
  switch (selectedProblem) {
    case "fibonacci":
      return <FibTeilstruktur />;
    case "canSum":
      return <CanSumTeilstruktur />;
    case "gridTraveler":
      return <GridTravelerTeilstruktur />;
    default:
      return <div>Default</div>;
  }
};

const renderDynProblemOverlappingTeilproblem = (selectedProblem: any) => {
  switch (selectedProblem) {
    case "fibonacci":
      return <FibOverlappingTeilproblem />;
    case "canSum":
      return <CanSumOverlappingTeilproblem />;
    case "gridTraveler":
      return <GridTravelerOverlappingTeilproblem />;
    default:
      return <div>Default</div>;
  }
};

export const Problem = () => {
  const { selectedProblem } = useAppSelector((store) => store.settings);
  const { accordionOpen } = useAppSelector((store) => store.tour);
  const [teilstrukturBlur, setTeilstrukturBlur] = useState(true);
  const [teilproblemBlur, setTeilproblemBlur] = useState(true);

  console.log(selectedProblem);

  useEffect(() => {
    setTeilstrukturBlur(true);
    setTeilproblemBlur(true);
  }, [selectedProblem]);

  return (
    <div style={{ minHeight: "calc(100vh - 78px)" }}>
      <Accordion type="multiple" defaultValue={accordionOpen}>
        <AccordionItem value="Beschreibung">
          <AccordionTrigger className="text-xl">
            Problembeschreibung
          </AccordionTrigger>
          <AccordionContent>{renderContent(selectedProblem)}</AccordionContent>
        </AccordionItem>
        <AccordionItem value="Bedingung">
          <AccordionTrigger className="text-xl">
            Bedingungen für dynamische Programmierung
          </AccordionTrigger>
          <AccordionContent className="block">
            <div className="max-w-3xl">
              <p>
                Um dynamische Programmierung anwenden zu können, ist es
                essenziell, die Rekursionsbedingung des Problems zu verstehen
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
                Versuchen Sie die beiden unten stehenden Eigenschaften für das
                gegebene Problem zu definieren. Sollten Sie nach einiger Zeit zu
                keiner Lösung kommen, können Sie sich die Lösung anzeigen
                lassen. Der Lernerfolg ist jedoch größer, wenn Sie die Lösung
                selbst erarbeiten.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="aufgabe-dyn">
          <AccordionTrigger className="text-xl">
            Selbstlernaufgabe - Dynamische Programmierung
          </AccordionTrigger>
          <AccordionContent>
            <div className="max-w-3xl">
              <p className="mb-4">
                Versuchen Sie, die beiden unten stehenden Eigenschaften für das
                gegebene Problem zu definieren. Sollten Sie nach einiger Zeit zu
                keiner Lösung kommen, können Sie sich die Lösung anzeigen
                lassen. Der Lernerfolg ist jedoch größer, wenn Sie die Lösung
                selbst erarbeiten.
              </p>
              <p className="mb-2">
                <span className="mr-4 text-base font-semibold">
                  Optimale Teilstruktur:
                </span>
                <span className="relative inline-flex items-center">
                  <div className={teilstrukturBlur ? "blur-md" : ""}>
                    {renderDynProblemTeilstruktur(selectedProblem)}
                  </div>
                  <Button
                    className={
                      teilstrukturBlur
                        ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10000 blur-none p-0 h-6 w-8  "
                        : "hidden"
                    }
                    variant="outline"
                    size="sm"
                    onClick={() => setTeilstrukturBlur(!teilstrukturBlur)}
                  >
                    <Eye />
                  </Button>
                </span>
              </p>
              <p>
                <span className="mr-4 text-base font-semibold">
                  Überlappende Teilprobleme:
                </span>
                <span className="relative inline-flex items-center">
                  <div className={teilproblemBlur ? "blur-md" : ""}>
                    {renderDynProblemOverlappingTeilproblem(selectedProblem)}
                  </div>
                  <Button
                    className={
                      teilproblemBlur
                        ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10000 blur-none p-0 h-6 w-8  "
                        : "hidden"
                    }
                    variant="outline"
                    size="sm"
                    onClick={() => setTeilproblemBlur(!teilproblemBlur)}
                  >
                    <Eye />
                  </Button>
                </span>
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="aufgabe-code">
          <AccordionTrigger className="text-xl">
            Selbstlernaufgabe - Implementierung
          </AccordionTrigger>
          <AccordionContent>
            <div className="max-w-[800px] tour-3">
              <p className="mb-1">
                Implementieren Sie folgende Methoden der Klasse{" "}
                {renderProblemName(selectedProblem)}.
              </p>
              <p>
                Nutzen Sie dabei die Kommentare und Methodennamen als
                Hilfestellung. Musterlösungen und eine unterstützende
                Visualisierung finden Sie in den jeweiligen Tabs der
                Algorithmen.
              </p>
              <Editor />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
