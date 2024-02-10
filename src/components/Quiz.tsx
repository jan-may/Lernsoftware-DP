import { useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { setIsQuizCompleted } from "../feautures/io/ioSlice";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Question } from "../types/QuizTypes";
import { quizData } from "../utils/data";

export const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [wasWrongAnswer, setWasWrongAnswer] = useState(false);
  const question: Question = quizData.questions[currentQuestionIndex];

  const dispatch = useAppDispatch();

  const quizLength = quizData.questions.length;

  const handleFinishQuiz = () => {
    localStorage.setItem("quizCompleted", "true");
    dispatch(setIsQuizCompleted(true));
  };

  const handleOptionClick = (option: string) => {
    setWasWrongAnswer(false);
    setSelectedOption(option);
  };

  const checkResult = () => {
    if (selectedOption === question.answer) {
      setWasWrongAnswer(false);
      handleNextQuestion();
    } else {
      setWasWrongAnswer(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
    } else {
      handleFinishQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption("");
      setWasWrongAnswer(false);
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div className="flex h-screen flex-col justify-center ">
      <AlertDialog defaultOpen>
        <div className="w-screen flex justify-center">
          <div className="flex flex-col">
            <AlertDialogTrigger asChild onClick={handleStartQuiz}>
              <Button className="w-32 mb-4">Quiz starten</Button>
            </AlertDialogTrigger>
            <Button className="w-48" onClick={handleFinishQuiz}>
              Quiz überspringen (Demo)
            </Button>
          </div>
        </div>
        {!quizStarted ? (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Lernstandskontrolle</AlertDialogTitle>
              <AlertDialogDescription>
                Um die App sinnvoll nutzen zu können, muss einmalig die
                Lernstandskontrolle bestanden werden. Diese dient der
                Sicherstellung eines ausreichenden Wissenstandes. Bitte
                beantworte die folgenden {quizLength} Fragen.
              </AlertDialogDescription>
              <AlertDialogDescription>
                Geschätzte Bearbeitungszeit ~ 5 min
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Abbruch</AlertDialogCancel>
              <Button onClick={handleStartQuiz} className="w-32">
                Quiz starten
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        ) : (
          <AlertDialogContent className="">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-sm flex justify-between align-middle items-center">
                {`Frage: ${currentQuestionIndex + 1} / ${quizLength}`}{" "}
                <button
                  className="text-lg"
                  onClick={() => setQuizStarted(false)}
                >
                  X
                </button>
              </AlertDialogTitle>
              <AlertDialogTitle>{question.question}</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter className="sm:flex-col">
              <div className="">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleOptionClick(option)}
                    className={`${
                      selectedOption === option
                        ? wasWrongAnswer
                          ? "animate-shake bg-red-500 text-white dark:bg-red-700"
                          : "bg-blue-500 text-white dark:bg-blue-700"
                        : "border-2 dark:bg-gray-500 dark:text-white"
                    } flex items-start w-full h-auto px-4 py-2 m-2 cursor-pointer rounded-md`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </AlertDialogFooter>
            <div>
              {currentQuestionIndex > 0 && (
                <Button onClick={handlePreviousQuestion} className="w-24 m-2">
                  Zurück
                </Button>
              )}
              <Button
                disabled={!selectedOption}
                onClick={checkResult}
                className="w-24 m-2"
              >
                {currentQuestionIndex === quizLength - 1
                  ? "Abschluss"
                  : "Weiter"}
              </Button>
            </div>
            {wasWrongAnswer && (
              <p>
                Die Antwort ist nicht korrekt. Bitte Versuchen Sie es erneut.
              </p>
            )}
          </AlertDialogContent>
        )}
      </AlertDialog>
    </div>
  );
};
