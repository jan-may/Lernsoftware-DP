import { useAppDispatch } from "../hooks/redux";
import { setIsQuizCompleted } from "../feautures/io/ioSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Button } from "./ui/button";

export const Quiz = () => {
  // function to check local storage for quiz data
  const dispatch = useAppDispatch();

  const handleFinishQuiz = () => {
    localStorage.setItem("quizCompleted", "true");
    dispatch(setIsQuizCompleted(true));
  };

  return (
    <div className="flex h-screen flex-col justify-center ">
      <AlertDialog defaultOpen>
        <div className="flex w-screen justify-center">
          <AlertDialogTrigger asChild>
            <Button className="w-32">Start Quiz</Button>
          </AlertDialogTrigger>
        </div>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Lerneinstigskontrolle</AlertDialogTitle>
            <AlertDialogDescription>
              Um die App sinnvoll nutzen zu können, musst du einmalig die
              Lerneinstigskontrolle bestehen. Diese dient der Sicherstellung
              eines einheitlichen Wissenstandes. Bitte beantworte die folgenden
              Fragen.
            </AlertDialogDescription>
            <AlertDialogDescription>
              Geschätzte Bearbeitungszeit ~ 5 min
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbruch</AlertDialogCancel>
            <AlertDialogAction onClick={handleFinishQuiz}>
              Quiz abschließen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
