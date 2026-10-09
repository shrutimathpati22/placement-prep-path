import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  aptitudeQuestions,
  codingQuestions,
  technicalTopics,
  hrQuestions,
} from '../data/mockData';
import { AptitudeQuestion, CodingQuestion } from '../types';
import {
  BrainCircuit,
  FileCode2,
  BookOpen,
  Users,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
  Clock,
  Layers,
  Download,
  ExternalLink,
  Code2,
  Check,
} from 'lucide-react';

type PrepSubTab = 'aptitude' | 'coding' | 'technical' | 'hr' | 'resources';

export const PrepHubView: React.FC = () => {
  const {
    solvedAptitude,
    markAptitudeSolved,
    solvedCoding,
    markCodingSolved,
    addToast,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<PrepSubTab>('aptitude');

  // Aptitude States
  const [aptitudeFilter, setAptitudeFilter] = useState<'All' | 'Quantitative' | 'Logical Reasoning' | 'Verbal Ability'>('All');
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: number }>({});
  const [showExplanation, setShowExplanation] = useState<{ [qId: string]: boolean }>({});

  // Coding States
  const [selectedCodeQuestion, setSelectedCodeQuestion] = useState<CodingQuestion>(codingQuestions[0]);
  const [codeLanguage, setCodeLanguage] = useState<'python' | 'cpp' | 'java'>('python');
  const [userCode, setUserCode] = useState<string>(codingQuestions[0].starterCode.python);
  const [codeTab, setCodeTab] = useState<'editor' | 'solution'>('editor');
  const [testOutput, setTestOutput] = useState<{
    status: 'idle' | 'running' | 'success' | 'failed';
    message?: string;
  }>({ status: 'idle' });

  // Technical Accordion State
  const [openTechSubject, setOpenTechSubject] = useState<string>('DBMS');
  const [expandedTechTopics, setExpandedTechTopics] = useState<{ [topicId: string]: boolean }>({
    'tech-01': true,
  });

  // HR Accordion State
  const [expandedHR, setExpandedHR] = useState<{ [hrId: string]: boolean }>({
    'hr-01': true,
  });

  // Handle Aptitude Option Click
  const handleSelectOption = (question: AptitudeQuestion, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [question.id]: optionIndex }));
    setShowExplanation((prev) => ({ ...prev, [question.id]: true }));

    if (optionIndex === question.correctIndex) {
      markAptitudeSolved(question.id);
    }
  };

  // Switch Coding Question
  const handleSelectCodingQuestion = (q: CodingQuestion) => {
    setSelectedCodeQuestion(q);
    setUserCode(q.starterCode[codeLanguage]);
    setCodeTab('editor');
    setTestOutput({ status: 'idle' });
  };

  // Switch Language in Code Editor
  const handleLanguageChange = (lang: 'python' | 'cpp' | 'java') => {
    setCodeLanguage(lang);
    setUserCode(selectedCodeQuestion.starterCode[lang]);
    setTestOutput({ status: 'idle' });
  };

  // Simulate Running Code Test Cases
  const handleRunCode = () => {
    setTestOutput({ status: 'running' });
    setTimeout(() => {
      // Validate that user kept or wrote substantial code
      if (userCode.trim().length > 30) {
        setTestOutput({
          status: 'success',
          message: `All ${selectedCodeQuestion.testCases.length} sample test cases passed! Runtime: 42ms (Beats 89.4% submissions).`,
        });
        markCodingSolved(selectedCodeQuestion.id);
      } else {
        setTestOutput({
          status: 'failed',
          message: 'SyntaxError / Missing Implementation: Function returned None or empty value.',
        });
      }
    }, 600);
  };

  const filteredAptitude = aptitudeQuestions.filter(
    (q) => aptitudeFilter === 'All' || q.topic === aptitudeFilter
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Placement Preparation Hub
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Structured interview modules designed for campus recruitment assessments and technical rounds.
        </p>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveSubTab('aptitude')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg whitespace-nowrap transition-all ${
            activeSubTab === 'aptitude'
              ? 'bg-white text-blue-700 shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BrainCircuit className="w-4 h-4 text-blue-600" />
          <span>Aptitude Practice</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
            {solvedAptitude.length}/{aptitudeQuestions.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('coding')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg whitespace-nowrap transition-all ${
            activeSubTab === 'coding'
              ? 'bg-white text-blue-700 shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileCode2 className="w-4 h-4 text-indigo-600" />
          <span>Coding Arena</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
            {solvedCoding.length}/{codingQuestions.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab('technical')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg whitespace-nowrap transition-all ${
            activeSubTab === 'technical'
              ? 'bg-white text-blue-700 shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4 text-cyan-600" />
          <span>Technical CS Core</span>
        </button>

        <button
          onClick={() => setActiveSubTab('hr')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg whitespace-nowrap transition-all ${
            activeSubTab === 'hr'
              ? 'bg-white text-blue-700 shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4 text-emerald-600" />
          <span>HR & Behavioral Guide</span>
        </button>

        <button
          onClick={() => setActiveSubTab('resources')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg whitespace-nowrap transition-all ${
            activeSubTab === 'resources'
              ? 'bg-white text-blue-700 shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-600" />
          <span>Formula & Cheat Sheets</span>
        </button>
      </div>

      {/* SUBTAB 1: APTITUDE PRACTICE */}
      {activeSubTab === 'aptitude' && (
        <div className="space-y-5">
          {/* Aptitude Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-semibold">
              <span className="text-slate-500 mr-1">Topic:</span>
              {(['All', 'Quantitative', 'Logical Reasoning', 'Verbal Ability'] as const).map(
                (topic) => (
                  <button
                    key={topic}
                    onClick={() => setAptitudeFilter(topic)}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      aptitudeFilter === topic
                        ? 'bg-blue-600 text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {topic}
                  </button>
                )
              )}
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Score: <strong className="text-emerald-700">{solvedAptitude.length}</strong> /{' '}
              {aptitudeQuestions.length} Questions Solved
            </div>
          </div>

          {/* Question List */}
          <div className="space-y-4">
            {filteredAptitude.map((q, idx) => {
              const userSelected = selectedAnswers[q.id];
              const isAnswered = userSelected !== undefined;
              const isCorrect = userSelected === q.correctIndex;
              const isOpen = showExplanation[q.id];

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-bold text-slate-900">Q{idx + 1}.</span>
                        <span>{q.topic}</span>
                        <span>·</span>
                        <span>{q.subtopic}</span>
                        <span>·</span>
                        <span className="font-medium text-blue-600">{q.difficulty}</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-900 whitespace-pre-line leading-relaxed">
                        {q.question}
                      </p>
                    </div>

                    {isAnswered && (
                      <div className="flex-shrink-0">
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-md">
                            <XCircle className="w-3.5 h-3.5" /> Incorrect
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {q.options.map((opt, optIdx) => {
                      let btnStyle =
                        'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';

                      if (isAnswered) {
                        if (optIdx === q.correctIndex) {
                          btnStyle =
                            'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                        } else if (optIdx === userSelected) {
                          btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-bold';
                        } else {
                          btnStyle = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => handleSelectOption(q, optIdx)}
                          className={`p-3 rounded-lg border text-left text-xs transition-all flex items-start gap-2.5 ${btnStyle}`}
                        >
                          <span className="w-5 h-5 rounded-full border flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="flex-1 leading-snug">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation Toggle */}
                  {isAnswered && (
                    <div className="pt-2 border-t border-slate-100">
                      <button
                        onClick={() =>
                          setShowExplanation((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                        }
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        {isOpen ? 'Hide Detailed Solution' : 'View Step-by-Step Explanation'}
                        {isOpen ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="mt-2.5 p-3.5 rounded-lg bg-blue-50/50 border border-blue-100 text-xs text-slate-800 leading-relaxed font-mono whitespace-pre-line">
                          {q.explanation}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 2: CODING ARENA */}
      {activeSubTab === 'coding' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Problem Selector List */}
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Placement Coding Problems
              </h3>
              <p className="text-[11px] text-slate-500">
                Most repeated questions in campus online assessments
              </p>
            </div>

            <div className="space-y-2">
              {codingQuestions.map((q) => {
                const isSelected = selectedCodeQuestion.id === q.id;
                const isSolved = solvedCoding.includes(q.id);

                return (
                  <button
                    key={q.id}
                    onClick={() => handleSelectCodingQuestion(q)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{q.title}</span>
                      {isSolved && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-md flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" /> Solved
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

                    <div className="mt-2 flex flex-wrap gap-1">
                      {q.companyTags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Problem Description & Interactive Code Workspace */}
          <div className="lg:col-span-8 space-y-4">
            {/* Problem Details Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-slate-900">
                      {selectedCodeQuestion.title}
                    </h2>
                    <span className="text-xs text-slate-400">·</span>
                    <span
                      className={`text-xs font-bold ${
                        selectedCodeQuestion.difficulty === 'Easy'
                          ? 'text-emerald-700'
                          : selectedCodeQuestion.difficulty === 'Medium'
                          ? 'text-amber-700'
                          : 'text-rose-700'
                      }`}
                    >
                      {selectedCodeQuestion.difficulty}
                    </span>
                    <span className="text-xs text-slate-400">·</span>
                    <span className="text-xs text-slate-600 font-medium">
                      {selectedCodeQuestion.topic}
                    </span>
                  </div>

                  <div className="mt-1.5 flex flex-wrap gap-1 text-[11px] text-slate-500">
                    <span>Asked at:</span>
                    {selectedCodeQuestion.companyTags.map((c, i) => (
                      <span key={i} className="font-semibold text-slate-700">
                        {c}
                        {i < selectedCodeQuestion.companyTags.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                {solvedCoding.includes(selectedCodeQuestion.id) ? (
                  <span className="px-3 py-1 text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 rounded-lg flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Solved
                  </span>
                ) : (
                  <button
                    onClick={() => markCodingSolved(selectedCodeQuestion.id)}
                    className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100"
                  >
                    Mark as Solved
                  </button>
                )}
              </div>

              {/* Description */}
              <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line border-t border-slate-100 pt-3">
                {selectedCodeQuestion.description}
              </div>

              {/* Examples */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Sample Test Cases:
                </h4>
                {selectedCodeQuestion.examples.map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-100 font-mono text-xs space-y-1"
                  >
                    <div>
                      <span className="text-slate-500 font-semibold">Input: </span>
                      <span className="text-slate-800">{ex.input}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 font-semibold">Output: </span>
                      <span className="text-slate-800">{ex.output}</span>
                    </div>
                    {ex.explanation && (
                      <div className="text-[11px] text-slate-500 font-sans mt-1">
                        Explanation: {ex.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Code Workspace Card */}
            <div className="bg-slate-900 text-slate-100 rounded-xl border border-slate-800 overflow-hidden shadow-lg">
              {/* Workspace Top Bar */}
              <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 p-0.5 bg-slate-900 rounded-md border border-slate-800 text-xs font-semibold">
                    <button
                      onClick={() => setCodeTab('editor')}
                      className={`px-3 py-1 rounded transition-colors ${
                        codeTab === 'editor' ? 'bg-blue-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      Editor
                    </button>
                    <button
                      onClick={() => setCodeTab('solution')}
                      className={`px-3 py-1 rounded transition-colors ${
                        codeTab === 'solution' ? 'bg-blue-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      Optimal Solution
                    </button>
                  </div>

                  {/* Language Selector */}
                  <select
                    value={codeLanguage}
                    onChange={(e) => handleLanguageChange(e.target.value as any)}
                    className="bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 rounded px-2.5 py-1 focus:outline-hidden"
                  >
                    <option value="python">Python 3</option>
                    <option value="cpp">C++ (g++ 17)</option>
                    <option value="java">Java 17</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setUserCode(selectedCodeQuestion.starterCode[codeLanguage])}
                    className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1 rounded flex items-center gap-1 transition-colors"
                    title="Reset to starter code"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>

                  <button
                    onClick={handleRunCode}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Run Test Cases
                  </button>
                </div>
              </div>

              {/* Textarea Editor or Solution View */}
              {codeTab === 'editor' ? (
                <div className="p-3">
                  <textarea
                    rows={12}
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    className="w-full bg-slate-900 text-slate-100 font-mono text-xs p-3 rounded-lg border border-slate-800 focus:outline-hidden focus:border-blue-500 leading-relaxed resize-y"
                    spellCheck={false}
                  />
                </div>
              ) : (
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Verified {codeLanguage.toUpperCase()} Reference Solution</span>
                    <button
                      onClick={() => {
                        setUserCode(selectedCodeQuestion.solutionCode[codeLanguage]);
                        setCodeTab('editor');
                        addToast({
                          type: 'info',
                          title: 'Solution Copied to Editor',
                        });
                      }}
                      className="text-blue-400 hover:underline"
                    >
                      Copy to Editor
                    </button>
                  </div>
                  <pre className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-emerald-400 overflow-x-auto border border-slate-800 leading-relaxed">
                    {selectedCodeQuestion.solutionCode[codeLanguage]}
                  </pre>
                </div>
              )}

              {/* Test Case Execution Output Panel */}
              {testOutput.status !== 'idle' && (
                <div className="px-4 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-slate-400" />
                    {testOutput.status === 'running' && (
                      <span className="text-amber-400 animate-pulse">
                        Compiling and running test cases against runner sandbox...
                      </span>
                    )}
                    {testOutput.status === 'success' && (
                      <span className="text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        {testOutput.message}
                      </span>
                    )}
                    {testOutput.status === 'failed' && (
                      <span className="text-rose-400 flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-rose-400" />
                        {testOutput.message}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: TECHNICAL CS CORE */}
      {activeSubTab === 'technical' && (
        <div className="space-y-5">
          {/* Subject Pills */}
          <div className="flex flex-wrap gap-2">
            {['DBMS', 'Operating Systems', 'Computer Networks', 'OOP'].map((subj) => (
              <button
                key={subj}
                onClick={() => setOpenTechSubject(subj)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  openTechSubject === subj
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {technicalTopics
              .filter((t) => t.subject === openTechSubject)
              .map((topic) => {
                const isExpanded = expandedTechTopics[topic.id];

                return (
                  <div
                    key={topic.id}
                    className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden"
                  >
                    <div
                      onClick={() =>
                        setExpandedTechTopics((prev) => ({
                          ...prev,
                          [topic.id]: !prev[topic.id],
                        }))
                      }
                      className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-blue-600 uppercase">
                            {topic.subject}
                          </span>
                          <span className="text-xs text-slate-400">·</span>
                          <h3 className="text-sm font-bold text-slate-900">{topic.title}</h3>
                        </div>
                        <p className="text-xs text-slate-600 leading-snug">{topic.summary}</p>
                      </div>

                      <div className="p-2 text-slate-400">
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-5 pt-0 space-y-4 border-t border-slate-100 mt-2">
                        {/* Key Points */}
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                            Key Architectural Takeaways:
                          </h4>
                          <ul className="space-y-1.5 text-xs text-slate-700">
                            {topic.keyPoints.map((pt, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2">
                                <span className="text-blue-600 font-bold">•</span>
                                <span className="leading-relaxed">{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Top Viva / Interview Questions */}
                        <div className="space-y-2.5 pt-2">
                          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                            Frequently Asked Interview Questions:
                          </h4>
                          {topic.sampleQnA.map((qa, qIdx) => (
                            <div
                              key={qIdx}
                              className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5"
                            >
                              <div className="text-xs font-bold text-slate-900">
                                Q: {qa.question}
                              </div>
                              <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                                {qa.answer}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* SUBTAB 4: HR & BEHAVIORAL INTERVIEWS */}
      {activeSubTab === 'hr' && (
        <div className="space-y-5">
          {/* STAR Method Banner */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 rounded-2xl shadow-md space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-200">
              The STAR Method Framework
            </h3>
            <p className="text-xs text-blue-100 max-w-2xl leading-relaxed">
              Top recruiters (Google, Microsoft, Goldman Sachs) use behavioral questions to assess leadership and culture fit. Always structure your responses with:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="bg-white/10 p-2.5 rounded-lg">
                <span className="font-bold text-white block">S - Situation</span>
                <span className="text-[11px] text-blue-200">Context of the challenge</span>
              </div>
              <div className="bg-white/10 p-2.5 rounded-lg">
                <span className="font-bold text-white block">T - Task</span>
                <span className="text-[11px] text-blue-200">Your responsibility</span>
              </div>
              <div className="bg-white/10 p-2.5 rounded-lg">
                <span className="font-bold text-white block">A - Action</span>
                <span className="text-[11px] text-blue-200">Specific steps taken</span>
              </div>
              <div className="bg-white/10 p-2.5 rounded-lg">
                <span className="font-bold text-white block">R - Result</span>
                <span className="text-[11px] text-blue-200">Measurable impact</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {hrQuestions.map((hr) => {
              const isOpen = expandedHR[hr.id];

              return (
                <div
                  key={hr.id}
                  className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden"
                >
                  <div
                    onClick={() =>
                      setExpandedHR((prev) => ({ ...prev, [hr.id]: !prev[hr.id] }))
                    }
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                        <span className="font-bold text-emerald-700">{hr.category}</span>
                        <span>·</span>
                        <span>{hr.framework}</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">{hr.question}</h3>
                    </div>

                    <div className="p-2 text-slate-400">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="p-5 pt-0 space-y-4 border-t border-slate-100 mt-2">
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="text-xs font-bold text-slate-900 block mb-1">
                          Model Response:
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line italic">
                          {hr.sampleAnswer}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-200">
                          <span className="font-bold text-emerald-800 block mb-1">
                            ✓ What to Do:
                          </span>
                          <ul className="space-y-1 text-slate-700">
                            {hr.doAndDonts.dos.map((d, i) => (
                              <li key={i}>• {d}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3 rounded-lg bg-rose-50/50 border border-rose-200">
                          <span className="font-bold text-rose-800 block mb-1">
                            ✗ What to Avoid:
                          </span>
                          <ul className="space-y-1 text-slate-700">
                            {hr.doAndDonts.donts.map((d, i) => (
                              <li key={i}>• {d}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 5: CHEAT SHEETS & STUDY RESOURCES */}
      {activeSubTab === 'resources' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              DSA Time & Space Complexity Matrix
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Big-O comparison chart of sorting algorithms (QuickSort, MergeSort, HeapSort) and data structures (HashMaps, Red-Black Trees, Heaps).
            </p>
            <div className="pt-2">
              <button
                onClick={() =>
                  addToast({
                    type: 'success',
                    title: 'DSA Cheat Sheet Opened',
                    message: 'Accessing Big-O complexity handbook.',
                  })
                }
                className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> View DSA Cheat Sheet
              </button>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              SQL & Database Query Quick-Guide
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Window functions (RANK, DENSE_RANK, ROW_NUMBER), complex subqueries, GROUP BY with HAVING, and index optimization cheats.
            </p>
            <div className="pt-2">
              <button
                onClick={() =>
                  addToast({
                    type: 'success',
                    title: 'SQL Reference Ready',
                    message: 'Loading relational query patterns.',
                  })
                }
                className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> View SQL Cheat Sheet
              </button>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Aptitude Speed Math Formulas
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Shortcuts for square roots, percentage base conversions, relative speed formulas, and modular arithmetic tricks.
            </p>
            <div className="pt-2">
              <button
                onClick={() =>
                  addToast({
                    type: 'success',
                    title: 'Math Formula Sheet Ready',
                    message: 'Loading aptitude formula summary.',
                  })
                }
                className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> View Math Cheat Sheet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
