import type { QuizType } from "../types/QuizTypes";

export const judgeOptions = {
  method: "POST",
  url: "https://judge0-extra-ce.p.rapidapi.com/submissions",
  params: {
    base64_encoded: "true",
    wait: "true",
    fields: "*",
  },
  headers: {
    "content-type": "application/json",
    "Content-Type": "application/json",
    "X-RapidAPI-Key": import.meta.env.VITE_JUDGE0_API_KEY,
    "X-RapidAPI-Host": "judge0-extra-ce.p.rapidapi.com",
  },
  data: {
    language_id: 29,
    source_code: "",
    stdin: "",
    cpu_time_limit: 3,
    cpu_extra_time: 0,
    wall_time_limit: 3,
  },
};

export const quizData: QuizType = {
  questions: [
    {
      id: 1,
      question: "Was ist das Hauptziel der dynamischen Programmierung?",
      options: [
        "Die Ausführungszeit von Algorithmen zu erhöhen",
        "Die Speichereffizienz von Programmen zu verringern",
        "Komplexe Probleme in kleinere, handhabbare Probleme zu zerlegen",
        "Dynamische Typisierung in Programmiersprachen zu erzwingen.",
      ],
      answer: "Komplexe Probleme in kleinere, handhabbare Probleme zu zerlegen",
    },
    {
      id: 2,
      question:
        "Was versteht man unter einer optimalen Teilstruktur in der dynamischen Programmierung?",
      options: [
        "Dass die optimale Lösung eines Problems direkt aus den optimalen Lösungen seiner Teilprobleme abgeleitet werden kann.",
        "Dass die optimale Lösung eines Problems unabhängig von den Lösungen seiner Teilprobleme ist",
        "Dass jedes Teilproblem nur einmal gelöst werden muss, um die Effizienz zu maximieren.",
        "Dass die Anzahl der Teilprobleme minimiert wird, um den Speicherverbrauch zu reduzieren.",
      ],
      answer:
        "Dass die optimale Lösung eines Problems direkt aus den optimalen Lösungen seiner Teilprobleme abgeleitet werden kann.",
    },
    {
      id: 3,
      question:
        "Was versteht man unter überlappenden Teilproblemen in der dynamischen Programmierung?",
      options: [
        "Dass das gleiche Teilproblem in der Berechnung mehrfach auftritt und seine Lösung wiederverwendet werden kann.",
        "Dass jedes Teilproblem einzigartig ist und keine Lösungen mit anderen Teilproblemen teilt.",
        "Dass die Lösung eines Teilproblems keinen Einfluss auf die Lösung anderer Teilprobleme hat.",
        "Dass die Anzahl der Teilprobleme minimiert wird, um den Speicherverbrauch zu reduzieren.",
      ],
      answer:
        "Dass das gleiche Teilproblem in der Berechnung mehrfach auftritt und seine Lösung wiederverwendet werden kann.",
    },
    {
      id: 4,
      question: "Was wird generell unter einem Top-Down-Ansatz verstanden?",
      options: [
        "Beginnt mit der Lösung der kleinsten Teilprobleme und kombiniert diese, um das Gesamtproblem zu lösen.",
        "Löst das Gesamtproblem durch Aufteilung in kleinere, handhabbare Teilprobleme, indem es von der allgemeinen Problemstellung ausgeht.",
        "Implementiert iterative Lösungen, die sequenziell von Anfang bis Ende des Problems fortschreiten.",
        "Ist dem Bottom-Up-Ansatz aufgrund seiner effizienteren Laufzeit in der Regel überlegen.",
      ],
      answer:
        "Löst das Gesamtproblem durch Aufteilung in kleinere, handhabbare Teilprobleme, indem es von der allgemeinen Problemstellung ausgeht.",
    },
    {
      id: 5,
      question:
        "Was versteht man unter Memoisation im Rahmen von dynamischer Programmierung?",
      options: [
        "Das wiederholte Lösen derselben Teilprobleme, um Laufzeit zu sparen.",
        "Die Technik, vorherige Ergebnisse von Teilproblemen zu speichern, um redundante Berechnungen zu vermeiden.",
        "Die direkte Implementierung von Lösungen, ohne vorherige Ergebnisse zu berücksichtigen.",
        "Die Zerlegung eines Problems in immer kleinere Teilprobleme, ohne deren Lösungen zu speichern.",
      ],
      answer:
        "Die Technik, vorherige Ergebnisse von Teilproblemen zu speichern, um redundante Berechnungen zu vermeiden.",
    },
    {
      id: 6,
      question:
        "Wie funktioniert der Bottom-Up-Ansatz in der dynamischen Programmierung?",
      options: [
        "Löst zuerst die größten und komplexesten Probleme und arbeitet sich dann zu den einfacheren Basisfällen vor.",
        "Beginnt mit den Basisfällen und baut die Lösung für größere und komplexere Probleme schrittweise auf, indem kleinere Problemlösungen wiederverwendet werden.",
        "Nutzt rekursive Funktionsaufrufe, um die Problemlösung zu strukturieren, wobei für jeden Aufruf ein Stack verwendet wird.",
        "Löst jedes Teilproblem genau einmal und speichert das Ergebnis in einer externen Datenbank für den späteren Gebrauch.",
      ],
      answer:
        "Beginnt mit den Basisfällen und baut die Lösung für größere und komplexere Probleme schrittweise auf, indem kleinere Problemlösungen wiederverwendet werden.",
    },
  ],
};
