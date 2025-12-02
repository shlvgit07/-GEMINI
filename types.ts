export enum Topic {
  PSEUDO_CODE = 'pseudo_code', // מחשבון קרב / הוראות מחשב
  LOGIC_SERIES = 'logic_series', // סדרות ומבחני צורות
  ENGLISH = 'english', // אנגלית טכנית
  ALGORITHMS = 'algorithms' // חשיבה אלגוריתמית
}

export interface Question {
  id: string;
  topic: Topic;
  questionText: string;
  codeSnippet?: string; // Optional code block for pseudo-code questions
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  history: {
    questionId: string;
    selectedOption: number;
    isCorrect: boolean;
  }[];
  questions: Question[];
  isLoading: boolean;
  isComplete: boolean;
  error?: string;
}

export type AppScreen = 'onboarding' | 'quiz' | 'summary' | 'dictionary';

export interface Term {
  id: string;
  title: string;
  category: 'pseudo' | 'logic' | 'algo';
  description: string;
  codeExample?: string;
  explanation: string;
}