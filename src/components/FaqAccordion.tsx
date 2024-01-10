import { useAppDispatch, useAppSelector } from "../hooks/redux";
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
import { useSaveFile } from "../hooks/fileOperations";
import { BaseDirectory, writeTextFile } from "@tauri-apps/api/fs";

const SAVEFILE = "save.txt";

export const FaqAccordion = () => {
  const isTourCompleted = useAppSelector((state) => state.io.isTourCompleted);
  const isQuizCompleted = useAppSelector((state) => state.io.isQuizCompleted);
  const dispatch = useAppDispatch();

  async function handleCompleteQuiz() {
    const data = {
      isTourCompleted: isTourCompleted,
      isQuizCompleted: !isQuizCompleted,
    };
    handleSave(data);
    dispatch(setIsQuizCompleted(!isQuizCompleted));
  }

  function handleCompleteTour() {
    const data = {
      isTourCompleted: !isTourCompleted,
      isQuizCompleted: isQuizCompleted,
    };
    handleSave(data);
    dispatch(setIsTourCompleted(!isTourCompleted));
  }
  async function handleSave(data: any) {
    await writeTextFile(
      {
        path: SAVEFILE,
        contents: JSON.stringify(data, null, 2),
      },
      { dir: BaseDirectory.AppData }
    );
    console.log("saved");
  }

  useSaveFile(dispatch, setIsTourCompleted, setIsQuizCompleted, {
    tourCompleted: false,
    quizCompleted: false,
  });

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Tour durch die App erneut starten?</AccordionTrigger>
        <AccordionContent>
          <Button onClick={() => handleCompleteQuiz()}>complete Quiz</Button>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          Quiz zurücksetzen und erneut starten?
        </AccordionTrigger>
        <AccordionContent>
          <Button onClick={() => handleCompleteTour()}>complete Tour</Button>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
