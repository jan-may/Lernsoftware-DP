import { useAppDispatch } from "../hooks/redux";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import {
  setIsQuizCompleted,
  setIsTourCompleted,
} from "../feautures/io/ioSlice";

export const FaqAccordion = () => {
  const dispatch = useAppDispatch();

  function handleCompleteQuiz() {
    dispatch(setIsQuizCompleted(false));
    localStorage.removeItem("quizCompleted");
  }

  function handleCompleteTour() {
    dispatch(setIsTourCompleted(false));
    localStorage.removeItem("tourCompleted");
  }

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <p>Wie kann ich die Testcases nutzen?</p>
        </AccordionTrigger>
        <AccordionContent>
          <p>
            Die Testcases sind im Editor ersichtlich, wenn das Quellcode Symbol
            oben rechts geklickt wird.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-left">
          <p>Wie kann ich die Tour durch die App erneut starten?</p>
        </AccordionTrigger>
        <AccordionContent>
          <Button onClick={() => handleCompleteTour()}>
            Tour zurücksetzten
          </Button>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-left">
          <p>Wie kann ich das Quiz zurücksetzen und erneut starten?</p>
        </AccordionTrigger>
        <AccordionContent>
          <Button onClick={() => handleCompleteQuiz()}>
            Quiz zurücksetzten
          </Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
