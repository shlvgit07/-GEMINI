export enum Topic {
  PSEUDO_CODE = 'pseudo_code', // מחשבון קרב / הוראות מחשב
  LOGIC_SERIES = 'logic_series', // סדרות ומבחני צורות
  ENGLISH = 'english', // אנגלית טכנית
  ALGORITHMS = 'algorithms', // חשיבה אלגוריתמית
  OOP = 'oop' // תכנות מונחה עצמים
}

export interface Question {
  id: string;
  topic: Topic;
  questionText: string;
  codeSnippet?: string; // Optional code block for pseudo-code questions
  svgContent?: string; // Optional SVG string for visual logic questions
  options: string[];
  optionsType?: 'text' | 'svg'; // Indicates if options are plain text or SVG strings
  correctIndex: number;
  explanation: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard'; // Difficulty level
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
  category: 'pseudo' | 'logic' | 'algo' | 'oop';
  description: string;
  codeExample?: string;
  explanation: string;
  visualSvg?: string; // Optional visual representation of the concept
}