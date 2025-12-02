import React, { useState, useEffect, useCallback } from 'react';
import { Topic, QuizState, AppScreen } from './types';
import { generateQuestions } from './services/gemini';
import { TopicCard } from './components/TopicCard';
import { Button } from './components/Button';
import { DictionaryView } from './components/DictionaryView';
import { 
  Bot, 
  CheckCircle2, 
  XCircle, 
  RefreshCcw, 
  Trophy, 
  AlertCircle,
  ChevronLeft,
  GraduationCap,
  Book
} from 'lucide-react';

const App: React.FC = () => {
  const [screen, setScreen] = useState<AppScreen>('onboarding');
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    history: [],
    questions: [],
    isLoading: false,
    isComplete: false,
    error: undefined
  });

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // --- Actions ---

  const startQuiz = async (topic: Topic) => {
    setActiveTopic(topic);
    setQuizState(prev => ({ ...prev, isLoading: true, error: undefined, questions: [], score: 0, currentQuestionIndex: 0, history: [], isComplete: false }));
    setScreen('quiz');
    
    try {
      const questions = await generateQuestions(topic, 5); // Generate 5 questions
      setQuizState(prev => ({
        ...prev,
        questions,
        isLoading: false
      }));
    } catch (err) {
      setQuizState(prev => ({
        ...prev,
        isLoading: false,
        error: "מצטער, הייתה בעיה ביצירת השאלות. אנא נסה שנית."
      }));
    }
  };

  const handleOptionSelect = (index: number) => {
    if (showExplanation) return; // Prevent changing after submit
    setSelectedOption(index);
  };

  const submitAnswer = () => {
    if (selectedOption === null) return;
    
    setShowExplanation(true);
    const currentQ = quizState.questions[quizState.currentQuestionIndex];
    const isCorrect = selectedOption === currentQ.correctIndex;

    setQuizState(prev => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      history: [...prev.history, {
        questionId: currentQ.id,
        selectedOption,
        isCorrect
      }]
    }));
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    
    if (quizState.currentQuestionIndex + 1 >= quizState.questions.length) {
      setQuizState(prev => ({ ...prev, isComplete: true }));
      setScreen('summary');
    } else {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    }
  };

  const resetApp = () => {
    setScreen('onboarding');
    setActiveTopic(null);
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      history: [],
      questions: [],
      isLoading: false,
      isComplete: false,
      error: undefined
    });
    setSelectedOption(null);
    setShowExplanation(false);
  };

  // --- Screens ---

  const renderOnboarding = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-blue-100 text-blue-600 rounded-full mb-6">
          <GraduationCap className="w-12 h-12" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          המאמן למבחני בסמ"ח
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
          מערכת אימון מבוססת AI שתכין אותך למיוני מקצועות המחשב בצה"ל.
          בחר נושא והתחל לתרגל שאלות שנכתבו בזמן אמת.
        </p>
        
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            onClick={() => setScreen('dictionary')}
            className="border-slate-300 text-slate-700 bg-white hover:bg-slate-50"
          >
            <Book className="w-5 h-5" />
            מילון מושגים ודוגמאות
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TopicCard topic={Topic.PSEUDO_CODE} onClick={startQuiz} />
        <TopicCard topic={Topic.LOGIC_SERIES} onClick={startQuiz} />
        <TopicCard topic={Topic.ALGORITHMS} onClick={startQuiz} />
        <TopicCard topic={Topic.ENGLISH} onClick={startQuiz} />
      </div>
    </div>
  );

  const renderQuiz = () => {
    if (quizState.isLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
          <h2 className="text-2xl font-bold text-slate-800 animate-pulse">המורה בונה את המבחן...</h2>
          <p className="text-slate-500 mt-2">מייצר שאלות מאתגרות במיוחד עבורך</p>
        </div>
      );
    }

    if (quizState.error) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">אופס, משהו השתבש</h3>
          <p className="text-slate-600 mb-6">{quizState.error}</p>
          <Button onClick={() => startQuiz(activeTopic!)}>נסה שוב</Button>
          <button onClick={resetApp} className="mt-4 text-slate-500 underline">חזור לתפריט הראשי</button>
        </div>
      );
    }

    const question = quizState.questions[quizState.currentQuestionIndex];
    if (!question) return null;

    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={resetApp} className="text-slate-400 hover:text-slate-600 transition-colors">
            <XCircle className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="h-2 w-32 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-500" 
                style={{ width: `${((quizState.currentQuestionIndex) / quizState.questions.length) * 100}%` }}
              />
            </div>
            <span className="text-sm font-bold text-slate-500">
              {quizState.currentQuestionIndex + 1} / {quizState.questions.length}
            </span>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 leading-tight">
              {question.questionText}
            </h2>
            
            {question.codeSnippet && (
              <div className="bg-slate-900 text-slate-50 p-6 rounded-xl font-mono text-sm md:text-base mb-8 overflow-x-auto" dir="ltr">
                <pre>{question.codeSnippet}</pre>
              </div>
            )}

            <div className="space-y-3">
              {question.options.map((option, idx) => {
                let stateClass = "border-2 border-slate-200 hover:border-blue-400 hover:bg-blue-50";
                
                if (showExplanation) {
                  if (idx === question.correctIndex) {
                    stateClass = "border-2 border-emerald-500 bg-emerald-50 text-emerald-800";
                  } else if (idx === selectedOption) {
                    stateClass = "border-2 border-red-400 bg-red-50 text-red-800";
                  } else {
                    stateClass = "border-2 border-slate-100 opacity-50";
                  }
                } else if (selectedOption === idx) {
                  stateClass = "border-2 border-blue-600 bg-blue-50 text-blue-900 shadow-md ring-2 ring-blue-600/20";
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={showExplanation}
                    className={`w-full p-4 rounded-xl text-right transition-all duration-200 flex items-center justify-between group ${stateClass}`}
                  >
                    <span className="font-medium text-lg">{option}</span>
                    {showExplanation && idx === question.correctIndex && <CheckCircle2 className="w-6 h-6 text-emerald-600" />}
                    {showExplanation && idx === selectedOption && idx !== question.correctIndex && <XCircle className="w-6 h-6 text-red-500" />}
                    {!showExplanation && <div className={`w-5 h-5 rounded-full border-2 ${selectedOption === idx ? 'border-blue-600 bg-blue-600' : 'border-slate-300 group-hover:border-blue-400'}`}></div>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation Footer */}
          {showExplanation && (
            <div className="bg-slate-50 p-8 border-t border-slate-100 animate-in slide-in-from-bottom-5">
              <div className="flex gap-4">
                <div className="shrink-0 mt-1">
                  <Bot className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">הסבר המורה:</h4>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">{question.explanation}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={nextQuestion}>
                  {quizState.currentQuestionIndex + 1 === quizState.questions.length ? "סיום מבחן" : "השאלה הבאה"}
                   <ChevronLeft className="w-5 h-5" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Submit Action */}
          {!showExplanation && (
            <div className="p-8 border-t border-slate-100 bg-slate-50 flex justify-end">
              <Button 
                onClick={submitAnswer} 
                disabled={selectedOption === null}
                className="w-full md:w-auto"
              >
                בדוק תשובה
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSummary = () => {
    const percentage = Math.round((quizState.score / quizState.questions.length) * 100);
    let feedback = "";
    if (percentage >= 90) feedback = "מצוין! אתה מוכן למיונים.";
    else if (percentage >= 70) feedback = "עבודה טובה, אבל יש מקום לשיפור.";
    else feedback = "כדאי להמשיך לתרגל עוד קצת.";

    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-3xl shadow-xl p-12 border border-slate-100">
          <div className="inline-flex p-6 bg-yellow-100 text-yellow-600 rounded-full mb-6">
            <Trophy className="w-16 h-16" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-2">תוצאות האימון</h2>
          <div className="text-6xl font-black text-blue-600 mb-4 tracking-tighter">
            {quizState.score}/{quizState.questions.length}
          </div>
          <p className="text-xl font-bold text-slate-700 mb-8">{feedback}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 p-4 rounded-xl">
              <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">נושא</div>
              <div className="font-bold text-lg">{activeTopic === Topic.PSEUDO_CODE ? 'הוראות מחשב' : activeTopic === Topic.LOGIC_SERIES ? 'לוגיקה' : activeTopic === Topic.ENGLISH ? 'אנגלית' : 'אלגוריתמים'}</div>
            </div>
             <div className="bg-slate-50 p-4 rounded-xl">
              <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">דיוק</div>
              <div className="font-bold text-lg">{percentage}%</div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={() => startQuiz(activeTopic!)} variant="primary" className="w-full justify-center">
              <RefreshCcw className="w-5 h-5" />
              תרגל שוב באותו נושא
            </Button>
            <Button onClick={resetApp} variant="outline" className="w-full justify-center">
              חזרה לתפריט הראשי
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-10">
      {screen === 'onboarding' && renderOnboarding()}
      {screen === 'dictionary' && <DictionaryView onBack={() => setScreen('onboarding')} />}
      {screen === 'quiz' && renderQuiz()}
      {screen === 'summary' && renderSummary()}
    </div>
  );
};

export default App;