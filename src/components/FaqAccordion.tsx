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

  async function handleCompleteQuiz() {
    dispatch(setIsQuizCompleted(false));
    localStorage.setItem("quizCompleted", "false");
  }

  function handleCompleteTour() {
    dispatch(setIsTourCompleted(false));
    localStorage.setItem("tourCompleted", "false");
  }

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Tour durch die App erneut starten?</AccordionTrigger>
        <AccordionContent>
          <Button onClick={() => handleCompleteTour()}>
            Tour zurücksetzten
          </Button>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          Quiz zurücksetzen und erneut starten?
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
