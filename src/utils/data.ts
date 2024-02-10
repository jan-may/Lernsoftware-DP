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
        "Statische Typisierung in Programmiersprachen zu erzwingen.",
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
      question:
        "Was kennzeichnet eine Problemstellung, die sich gut für die Lösung mit dynamischer Programmierung eignet?",
      options: [
        "Das Problem lässt sich in mehrere kleine Probleme aufteilen, die nicht voneinander abhängen.",
        "Das Problem hat eine rekursive Struktur, bei der sich die gleichen Teilprobleme wiederholen.",
        "Jedes Teilproblem ist völlig einzigartig und teilt keine Lösungen mit anderen Teilproblemen.",
        "Das Problem kann nur durch Ausprobieren aller möglichen Lösungen gelöst werden.",
      ],
      answer:
        "Das Problem hat eine rekursive Struktur, bei der sich die gleichen Teilprobleme wiederholen.",
    },
    {
      id: 6,
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
      id: 7,
      question:
        "Was beschreibt am besten den Top-Down-Ansatz in der dynamischen Programmierung?",
      options: [
        "Beginnt mit der Lösung der kleinsten Teilprobleme und kombiniert diese, um größere Probleme zu lösen.",
        "Löst das Problem, indem es von der ursprünglichen Fragestellung ausgeht und sich durch rekursive Aufrufe zu den Basisfällen vorarbeitet.",
        "Implementiert iterative Lösungen, die von Anfang bis Ende des Problems fortschreiten.",
        "Nutzt eine Tiefensuche, um alle möglichen Lösungen zu erkunden, bevor eine Entscheidung getroffen wird.",
      ],
      answer:
        "Löst das Problem, indem es von der ursprünglichen Fragestellung ausgeht und sich durch rekursive Aufrufe zu den Basisfällen vorarbeitet.",
    },
    {
      id: 8,
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
