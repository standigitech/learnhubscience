import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Award,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { Quiz, Question } from '../types/index.js';

interface QuizEngineProps {
  quiz: Quiz;
  onBackToLesson: () => void;
  onRecordAttempt?: (score: number) => void;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  quiz,
  onBackToLesson,
  onRecordAttempt
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimitMinutes * 60);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelectAnswer = (questionId: number, answer: string) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // calculate score
    let correct = 0;
    quiz.questions.forEach(q => {
      if ((userAnswers[q.id] || '').trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
        correct++;
      }
    });
    const scorePercent = Math.round((correct / quiz.questions.length) * 100);
    if (onRecordAttempt) {
      onRecordAttempt(scorePercent);
    }
  };

  const handleRetake = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    setTimeLeft(quiz.timeLimitMinutes * 60);
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const answeredCount = Object.keys(userAnswers).length;

  // Calculate score if submitted
  let correctCount = 0;
  if (isSubmitted) {
    quiz.questions.forEach(q => {
      if ((userAnswers[q.id] || '').trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
        correctCount++;
      }
    });
  }
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const passed = scorePercent >= quiz.passingScore;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Quiz Top Status Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-soft flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {quiz.title}
          </h2>
          <p className="text-xs text-slate-400">
            {answeredCount} of {totalQuestions} answered · Passing mark: {quiz.passingScore}%
          </p>
        </div>

        {/* Timer */}
        <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold ${
          timeLeft < 60 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-700'
        }`}>
          <Clock className="w-4 h-4" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress pill nav */}
      <div className="flex items-center gap-1.5">
        {quiz.questions.map((q, idx) => {
          const isAnswered = !!userAnswers[q.id];
          const isCurrent = idx === currentQuestionIndex;
          return (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(idx)}
              className={`flex-1 h-2 rounded-full transition-all ${
                isCurrent 
                  ? 'bg-blue-600 ring-2 ring-blue-300' 
                  : isAnswered 
                    ? 'bg-blue-300' 
                    : 'bg-slate-200'
              }`}
              title={`Question ${idx + 1}`}
            />
          );
        })}
      </div>

      {/* MAIN QUESTION CARD or RESULTS SUMMARY */}
      {!isSubmitted ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
            <span className="capitalize">{currentQuestion.questionType.replace('_', ' ')}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {currentQuestion.prompt}
          </h3>

          {/* Options for Multiple Choice and True/False */}
          {(currentQuestion.questionType === 'multiple_choice' || currentQuestion.questionType === 'true_false') && (
            <div className="space-y-3">
              {currentQuestion.options?.map((option, optIdx) => {
                const isSelected = userAnswers[currentQuestion.id] === option;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectAnswer(currentQuestion.id, option)}
                    className={`w-full text-left p-4 rounded-2xl border text-sm font-semibold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-500 text-blue-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{option}</span>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                      isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                    }`}>
                      {isSelected ? '✓' : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Numerical Input Question */}
          {currentQuestion.questionType === 'numerical' && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-600">Enter your numeric answer:</label>
              <input 
                type="text"
                value={userAnswers[currentQuestion.id] || ''}
                onChange={(e) => handleSelectAnswer(currentQuestion.id, e.target.value)}
                placeholder="Type numeric answer (e.g. 0, -4, 2.5)"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          )}

          {/* Navigation Bottom Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button 
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 disabled:opacity-30 hover:bg-slate-100 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <button 
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 active:scale-95 transition"
              >
                <span>Submit Quiz</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      ) : (
        /* RESULTS BREAKDOWN VIEW */
        <div className="space-y-6">
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft text-center space-y-4">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto text-3xl font-black ${
              passed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}>
              {passed ? '🏆' : '📝'}
            </div>

            <h3 className="text-2xl font-black text-slate-900">
              {passed ? 'Congratulations! Quiz Passed' : 'Keep Practicing! Review Errors'}
            </h3>

            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You scored <strong className="text-slate-800">{correctCount} out of {totalQuestions}</strong> correct ({scorePercent}%).
              {passed ? ' Your mastery record has been stored in your learning progress.' : ' Review the explanations below and try again.'}
            </p>

            <div className="flex justify-center gap-3 pt-2">
              <button 
                onClick={handleRetake}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>

              <button 
                onClick={onBackToLesson}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20"
              >
                <span>Return to Lesson</span>
              </button>
            </div>
          </div>

          {/* Detailed Question Review Cards */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 px-1">
              Detailed Question Explanations
            </h4>

            {quiz.questions.map((q, idx) => {
              const userAns = userAnswers[q.id];
              const isCorrect = (userAns || '').trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

              return (
                <div 
                  key={q.id}
                  className={`bg-white rounded-2xl p-6 border shadow-soft space-y-3 ${
                    isCorrect ? 'border-emerald-200' : 'border-red-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase">Question {idx + 1}</span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-slate-900">{q.prompt}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Your Submission:</span>
                      <span className={`font-semibold ${isCorrect ? 'text-emerald-700' : 'text-red-600'}`}>
                        {userAns || '(None entered)'}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                      <span className="text-emerald-700 block text-[10px] uppercase font-bold">Official Correct Answer:</span>
                      <span className="font-bold text-emerald-900">{q.correctAnswer}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-600 leading-relaxed border border-slate-100">
                    <strong className="text-slate-800">Teacher's Explanation:</strong> {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};
