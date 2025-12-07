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
  ChevronRight,
  GraduationCap,
  Book,
  Signal,
  SignalHigh,
  SignalMedium,
  SignalLow,
  Sparkles,
  Code2
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

  // Helper to load the state of a specific question index (if it was answered before)
  const loadQuestionState = (index: number, history: typeof quizState.history, questions: typeof quizState.questions) => {
    const question = questions[index];
    const historyItem = history.find(h => h.questionId === question.id);

    if (historyItem) {
      setSelectedOption(historyItem.selectedOption);
      setShowExplanation(true);
    } else {
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  const prevQuestion = () => {
    if (quizState.currentQuestionIndex > 0) {
      const newIndex = quizState.currentQuestionIndex - 1;
      setQuizState(prev => ({ ...prev, currentQuestionIndex: newIndex }));
      loadQuestionState(newIndex, quizState.history, quizState.questions);
    }
  };

  const nextQuestion = () => {
    if (quizState.currentQuestionIndex + 1 >= quizState.questions.length) {
      setQuizState(prev => ({ ...prev, isComplete: true }));
      setScreen('summary');
    } else {
      const newIndex = quizState.currentQuestionIndex + 1;
      setQuizState(prev => ({ ...prev, currentQuestionIndex: newIndex }));
      loadQuestionState(newIndex, quizState.history, quizState.questions);
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

  const getDifficultyBadge = (difficulty?: string) => {
    switch (difficulty) {
      case 'Easy':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
            <SignalLow className="w-3.5 h-3.5" />
            קל
          </span>
        );
      case 'Hard':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
            <SignalHigh className="w-3.5 h-3.5" />
            קשה
          </span>
        );
      default: // Medium
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
            <SignalMedium className="w-3.5 h-3.5" />
            בינוני
          </span>
        );
    }
  };

  // --- Screens ---

  const renderOnboarding = () => (
    <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col min-h-[calc(100vh-40px)]">
      <div className="flex-grow">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-blue-100 text-blue-600 rounded-full mb-6">
            <GraduationCap className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            המאמן למבחני בסמ"ח
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            מערכת אימון מבוססת AI שתכין אותך למיוני מקצועות המחשב בצה"ל.
            בחר נושא והתחל לתרגל שאלות קשות שנכתבו בזמן אמת.
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="md:col-span-2 lg:col-span-1">
            <TopicCard topic={Topic.PSEUDO_CODE} onClick={startQuiz} />
          </div>
          <TopicCard topic={Topic.LOGIC_SERIES} onClick={startQuiz} />
          <TopicCard topic={Topic.ALGORITHMS} onClick={startQuiz} />
          <TopicCard topic={Topic.OOP} onClick={startQuiz} />
          <TopicCard topic={Topic.ENGLISH} onClick={startQuiz} />
        </div>
      </div>

      {/* Footer / Credits */}
      <div className="mt-20 pt-8 border-t border-slate-200">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 opacity-90">
          
          {/* Developer Credit */}
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-slate-400" />
            <div className="text-sm text-slate-600 font-medium">
              נבנה ע״י <span className="font-bold text-slate-900">שלו שקלים</span>
            </div>
          </div>

          <div className="hidden md:block w-px h-4 bg-slate-300"></div>

          {/* Created with AI Studio */}
          <div className="flex items-center gap-2 group">
             <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-1 rounded-md">
               <Sparkles className="w-3 h-3" />
             </div>
             <div className="text-sm text-slate-600 font-medium">
                באמצעות <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Google AI Studio</span>
             </div>
          </div>

          <div className="hidden md:block w-px h-4 bg-slate-300"></div>

          {/* Ort Rehovot */}
          <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all duration-300">
             <img 
               src="data:image/png;base64,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" 
               alt="לוגו אורט" 
               className="h-6 w-auto"
             />
             <div className="flex flex-col text-right h-6 justify-center border-r-2 border-slate-300 pr-2 mr-1">
               <span className="font-black text-slate-700 leading-none text-xs">אורט</span>
               <span className="text-[10px] font-bold text-slate-500 leading-none mt-0.5">רחובות</span>
             </div>
          </div>

        </div>
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
            <div className="flex justify-between items-start mb-4">
              {getDifficultyBadge(question.difficulty)}
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 leading-tight whitespace-pre-line" dir="auto">
              {question.questionText}
            </h2>
            
            {question.codeSnippet && (
              <div className="bg-slate-900 text-slate-50 p-6 rounded-xl font-mono text-sm md:text-base mb-8 overflow-x-auto" dir="ltr">
                <pre>{question.codeSnippet}</pre>
              </div>
            )}

            {question.svgContent && (
               <div className="bg-white border-2 border-slate-100 p-6 rounded-xl mb-8 flex justify-center overflow-hidden">
                 <div 
                   className="w-full max-w-sm h-48 flex items-center justify-center [&>svg]:max-w-full [&>svg]:max-h-full"
                   dangerouslySetInnerHTML={{ __html: question.svgContent }} 
                 />
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
                    <div className="w-full">
                      {question.optionsType === 'svg' ? (
                        <div 
                          className="h-12 md:h-16 flex justify-center [&>svg]:h-full [&>svg]:w-auto"
                          dangerouslySetInnerHTML={{ __html: option }}
                        />
                      ) : (
                        <span className="font-medium text-lg block">{option}</span>
                      )}
                    </div>
                    
                    <div className="shrink-0 mr-4">
                      {showExplanation && idx === question.correctIndex && <CheckCircle2 className="w-6 h-6 text-emerald-600" />}
                      {showExplanation && idx === selectedOption && idx !== question.correctIndex && <XCircle className="w-6 h-6 text-red-500" />}
                      {!showExplanation && <div className={`w-5 h-5 rounded-full border-2 ${selectedOption === idx ? 'border-blue-600 bg-blue-600' : 'border-slate-300 group-hover:border-blue-400'}`}></div>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation Footer */}
          {showExplanation && (
            <div className="bg-slate-50 p-8 border-t border-slate-100 animate-in slide-in-from-bottom-5">
              <div className="flex gap-4 mb-6">
                <div className="shrink-0 mt-1">
                  <Bot className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">הסבר המורה:</h4>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line">{question.explanation}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                 <div>
                    {quizState.currentQuestionIndex > 0 && (
                      <Button onClick={prevQuestion} variant="outline" className="gap-2">
                        <ChevronRight className="w-5 h-5" />
                        שאלה קודמת
                      </Button>
                    )}
                 </div>
                 <Button onClick={nextQuestion}>
                   {quizState.currentQuestionIndex + 1 === quizState.questions.length ? "סיום מבחן" : "השאלה הבאה"}
                   <ChevronLeft className="w-5 h-5" />
                 </Button>
              </div>
            </div>
          )}
          
          {/* Submit Action (Only when no explanation is shown) */}
          {!showExplanation && (
            <div className="p-8 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
              <div>
                {quizState.currentQuestionIndex > 0 && (
                  <Button onClick={prevQuestion} variant="outline" className="gap-2 text-slate-500 hover:text-slate-700 border-transparent hover:border-slate-200 hover:bg-white">
                    <ChevronRight className="w-5 h-5" />
                    חזור
                  </Button>
                )}
              </div>
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
              <div className="font-bold text-lg">
                {activeTopic === Topic.PSEUDO_CODE ? 'הוראות מחשב' : 
                 activeTopic === Topic.LOGIC_SERIES ? 'לוגיקה' : 
                 activeTopic === Topic.ENGLISH ? 'אנגלית' : 
                 activeTopic === Topic.OOP ? 'OOP' : 'אלגוריתמים'}
              </div>
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