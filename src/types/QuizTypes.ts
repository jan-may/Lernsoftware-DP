export type Question = {
  id: number;
  question: string;
  options: string[];
  answer: string;
};

export type QuizType = {
  questions: Question[];
};
