import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { aptitudeQuestions, codingQuestions } from '../data/mockData';
import { AptitudeQuestion, CodingQuestion } from '../types';
import {
  BrainCircuit,
  FileCode2,
  Clock,
  Play,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  HelpCircle,
  Terminal,
  Trophy,
  Filter,
} from 'lucide-react';

export const PracticeCenterView: React.FC = () => {
  const {
    solvedAptitude,
    markAptitudeSolved,
    solvedCoding,
    markCodingSolved,
    recordQuizAttempt,
    addToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'quiz' | 'coding' | 'questions'>('quiz');

  // QUIZ STATE
  const [quizQuestions, setQuizQuestions] = useState<AptitudeQuestion[]>(aptitudeQuestions.slice(0, 5));
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 mins in seconds
  const [timerActive, setTimerActive] = useState(false);

  // CODING ARENA STATE
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedProblem, setSelectedProblem] = useState<CodingQuestion>(codingQuestions[0]);
  const [codeLang, setCodeLang] = useState<'python' | 'cpp' | 'java'>('python');
  const [codeContent, setCodeContent] = useState<string>(codingQuestions[0].starterCode.python);
  const [codeTestStatus, setCodeTestStatus] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');

  // Timer Effect
  useEffect(() => {
    let interval: any;
    if (timerActive && timeRemaining > 0 && !quizSubmitted) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && !quizSubmitted && timerActive) {
      handleSubmitQuiz();
    }
    return () => clearInterval(interval);
  }, [timerActive, timeRemaining, quizSubmitted]);

  const handleStartQuiz = (numQuestions: number = 5) => {
    setQuizQuestions(aptitudeQuestions.slice(0, numQuestions));
    setCurrentQuizIdx(0);
    setUserAnswers({});
    setQuizSubmitted(false);
    setTimeRemaining(numQuestions === 5 ? 300 : 600);
    setTimerActive(true);
  };

  const handleSelectAnswer = (qId: string, optIdx: number) => {
    if (quizSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmitQuiz = () => {
    setTimerActive(false);
    setQuizSubmitted(true);

    let correctCount = 0;
    quizQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
        markAptitudeSolved(q.id);
      }
    });

    const percent = Math.round((correctCount / quizQuestions.length) * 100);
    recordQuizAttempt({
      title: `${quizQuestions.length}-Question Aptitude Speed Drill`,
      category: 'Aptitude Practice',
      score: correctCount,
      totalQuestions: quizQuestions.length,
      percentage: percent,
      passed: percent >= 60,
      date: new Date().toISOString().split('T')[0],
      timeSpentSeconds: (quizQuestions.length === 5 ? 300 : 600) - timeRemaining,
    });
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Run Code Simulation
  const handleRunCode = () => {
    setCodeTestStatus('running');
    setTimeout(() => {
      if (codeContent.trim().length > 30) {
        setCodeTestStatus('success');
        markCodingSolved(selectedProblem.id);
      } else {
        setCodeTestStatus('failed');
      }
    }, 500);
  };

  const filteredCoding = codingQuestions.filter(
    (q) => selectedDifficulty === 'All' || q.difficulty === selectedDifficulty
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Practice Center Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Placement Practice Center
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Simulate campus online screening rounds, tackle verified LeetCode problems, and build test endurance.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'quiz'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Aptitude Mock Quiz
          </button>
          <button
            onClick={() => setActiveTab('coding')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'coding'
                ? 'bg-white text-blue-700 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Coding Arena
          </button>
        </div>
      </div>

      {/* TAB 1: FUNCTIONAL MULTIPLE-CHOICE QUIZ */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          {!timerActive && !quizSubmitted ? (
            /* Quiz Start Lobby */
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs text-center max-w-xl mx-auto space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
                <BrainCircuit className="w-7 h-7" />
              </div>

              <div className="space-y-1.5">
                <h2 className="text-xl font-bold text-slate-900">
                  Campus Screening Aptitude Simulator
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                  Experience standard 1-minute-per-question test constraints. Covers Quantitative Math, Logical Syllogisms, and Verbal Ability.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Standard Test Length</span>
                  <span className="font-bold text-slate-800">5 Questions / 5 Mins</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Passing Threshold</span>
                  <span className="font-bold text-emerald-700">60% (3/5 Correct)</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => handleStartQuiz(5)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" /> Start 5-Min Drill
                </button>
                <button
                  onClick={() => handleStartQuiz(10)}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors"
                >
                  Full 10-Question Test
                </button>
              </div>
            </div>
          ) : quizSubmitted ? (
            /* Quiz Score Card */
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs max-w-2xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <Trophy className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-black text-slate-900">Assessment Complete!</h2>
                <p className="text-xs text-slate-500">
                  Your results have been validated and recorded on your Progress page.
                </p>
              </div>

              {/* Score Display */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 text-center text-xs">
                <div>
                  <span className="text-slate-500 block">Total Score</span>
                  <span className="text-xl font-black text-slate-900 font-mono mt-0.5 block">
                    {
                      quizQuestions.filter((q) => userAnswers[q.id] === q.correctIndex).length
                    }{' '}
                    / {quizQuestions.length}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Percentage</span>
                  <span className="text-xl font-black text-blue-600 font-mono mt-0.5 block">
                    {Math.round(
                      (quizQuestions.filter((q) => userAnswers[q.id] === q.correctIndex).length /
                        quizQuestions.length) *
                        100
                    )}
                    %
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Status</span>
                  <span className="text-sm font-black text-emerald-700 uppercase mt-1 block">
                    {quizQuestions.filter((q) => userAnswers[q.id] === q.correctIndex).length >=
                    quizQuestions.length * 0.6
                      ? 'PASSED'
                      : 'NEEDS PRACTICE'}
                  </span>
                </div>
              </div>

              {/* Detailed Question Review */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Review & Step-by-Step Solutions
                </h3>

                <div className="space-y-3">
                  {quizQuestions.map((q, qIdx) => {
                    const isCorrect = userAnswers[q.id] === q.correctIndex;

                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-xl border text-xs space-y-2 ${
                          isCorrect
                            ? 'bg-emerald-50/30 border-emerald-200'
                            : 'bg-rose-50/30 border-rose-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-bold text-slate-900">
                            Q{qIdx + 1}. {q.question}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold flex-shrink-0 ${
                              isCorrect
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {isCorrect ? 'Correct (+1)' : 'Incorrect (0)'}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-600 space-y-1">
                          <div>
                            Your Answer:{' '}
                            <strong className={isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                              {userAnswers[q.id] !== undefined
                                ? q.options[userAnswers[q.id]]
                                : 'Not Attempted'}
                            </strong>
                          </div>
                          <div>
                            Correct Answer:{' '}
                            <strong className="text-emerald-700">
                              {q.options[q.correctIndex]}
                            </strong>
                          </div>
                        </div>

                        <div className="p-2.5 rounded-lg bg-white border border-slate-200 font-mono text-[10px] text-slate-700 whitespace-pre-line leading-relaxed">
                          {q.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => handleStartQuiz(5)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  Retake Quiz Drill
                </button>
              </div>
            </div>
          ) : (
            /* Active Live Quiz View */
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs max-w-2xl mx-auto space-y-6">
              {/* Top: Progress and Timer */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">
                    Question {currentQuizIdx + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs font-semibold text-blue-600">
                    {quizQuestions[currentQuizIdx].topic}
                  </span>
                </div>

                <div
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold font-mono ${
                    timeRemaining < 60
                      ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse'
                      : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTimer(timeRemaining)}</span>
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-4">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                  {quizQuestions[currentQuizIdx].question}
                </h3>

                {/* Options List */}
                <div className="space-y-2.5">
                  {quizQuestions[currentQuizIdx].options.map((opt, optIdx) => {
                    const isSelected =
                      userAnswers[quizQuestions[currentQuizIdx].id] === optIdx;

                    return (
                      <button
                        key={optIdx}
                        onClick={() =>
                          handleSelectAnswer(quizQuestions[currentQuizIdx].id, optIdx)
                        }
                        className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full border flex items-center justify-center font-bold text-[10px] flex-shrink-0 ${
                            isSelected
                              ? 'border-blue-600 bg-blue-600 text-white'
                              : 'border-slate-300 text-slate-500'
                          }`}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  disabled={currentQuizIdx === 0}
                  onClick={() => setCurrentQuizIdx((prev) => prev - 1)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 disabled:opacity-40 transition-colors"
                >
                  Previous
                </button>

                {currentQuizIdx < quizQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuizIdx((prev) => prev + 1)}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    Next Question →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                  >
                    Submit & Grade Quiz
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CODING ARENA */}
      {activeTab === 'coding' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Problem Selector */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Difficulty Filter:</span>
              <div className="flex items-center gap-1 text-xs">
                {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`px-2 py-1 rounded-md transition-colors ${
                      selectedDifficulty === diff
                        ? 'bg-blue-600 text-white font-bold'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {filteredCoding.map((q) => {
                const isSelected = selectedProblem.id === q.id;
                const isSolved = solvedCoding.includes(q.id);

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setSelectedProblem(q);
                      setCodeContent(q.starterCode[codeLang]);
                      setCodeTestStatus('idle');
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{q.title}</span>
                      {isSolved && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Solved
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                      <span
                        className={`font-semibold ${
                          q.difficulty === 'Easy'
                            ? 'text-emerald-600'
                            : q.difficulty === 'Medium'
                            ? 'text-amber-600'
                            : 'text-rose-600'
                        }`}
                      >
                        {q.difficulty}
                      </span>
                      <span>·</span>
                      <span>{q.topic}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Problem Workspace & Code Runner */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedProblem.title}</h3>
                  <div className="mt-1 flex flex-wrap gap-1 text-[11px] text-slate-500">
                    <span>Target Companies:</span>
                    {selectedProblem.companyTags.map((c, i) => (
                      <span key={i} className="font-semibold text-slate-800">
                        {c}
                        {i < selectedProblem.companyTags.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => markCodingSolved(selectedProblem.id)}
                  className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Mark Solved
                </button>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line border-t border-slate-100 pt-3">
                {selectedProblem.description}
              </p>
            </div>

            {/* Code Editor Box */}
            <div className="bg-slate-900 text-slate-100 rounded-xl border border-slate-800 overflow-hidden shadow-lg">
              <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <select
                  value={codeLang}
                  onChange={(e) => {
                    const l = e.target.value as 'python' | 'cpp' | 'java';
                    setCodeLang(l);
                    setCodeContent(selectedProblem.starterCode[l]);
                  }}
                  className="bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 rounded px-2.5 py-1 focus:outline-hidden"
                >
                  <option value="python">Python 3</option>
                  <option value="cpp">C++ 17</option>
                  <option value="java">Java 17</option>
                </select>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCodeContent(selectedProblem.solutionCode[codeLang])}
                    className="text-xs text-blue-400 hover:underline px-2"
                  >
                    Load Solution
                  </button>
                  <button
                    onClick={handleRunCode}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Play className="w-3 h-3 fill-current" /> Run Test Cases
                  </button>
                </div>
              </div>

              <div className="p-3">
                <textarea
                  rows={10}
                  value={codeContent}
                  onChange={(e) => setCodeContent(e.target.value)}
                  className="w-full bg-slate-900 text-slate-100 font-mono text-xs p-3 rounded-lg border border-slate-800 focus:outline-hidden focus:border-blue-500 leading-relaxed resize-y"
                  spellCheck={false}
                />
              </div>

              {codeTestStatus !== 'idle' && (
                <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 text-xs font-mono">
                  {codeTestStatus === 'running' && (
                    <span className="text-amber-400 animate-pulse">Running test cases...</span>
                  )}
                  {codeTestStatus === 'success' && (
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      All sample test cases passed!
                    </span>
                  )}
                  {codeTestStatus === 'failed' && (
                    <span className="text-rose-400 flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-400" />
                      Error: Function did not return expected value.
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
