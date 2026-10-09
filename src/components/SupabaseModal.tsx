import React, { useState, useEffect } from 'react';
import {
  checkSupabaseStatus,
  TableStatusReport,
  isSupabaseConfigured,
  getMaskedSupabaseUrl,
  getMaskedAnonKey,
} from '../lib/supabase';
import { SUPABASE_SCHEMA_SQL } from '../data/supabaseSchema';
import {
  Cloud,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Database,
  ShieldCheck,
  X,
  AlertTriangle,
} from 'lucide-react';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshCompleted?: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({
  isOpen,
  onClose,
  onRefreshCompleted,
}) => {
  const [report, setReport] = useState<TableStatusReport | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const loadStatus = async () => {
    setLoading(true);
    try {
      const res = await checkSupabaseStatus();
      setReport(res);
      if (onRefreshCompleted) {
        onRefreshCompleted();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadStatus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopySql = async () => {
    try {
      await navigator.clipboard.writeText(SUPABASE_SCHEMA_SQL);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback for older browsers or permission denials
      const textArea = document.createElement('textarea');
      textArea.value = SUPABASE_SCHEMA_SQL;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const tableList = [
    { key: 'profiles', label: 'profiles', desc: 'Academic details, CGPA, target tier & role' },
    { key: 'applications', label: 'applications', desc: 'Recruitment rounds, status, package' },
    { key: 'quiz_attempts', label: 'quiz_attempts', desc: 'Aptitude & technical test score history' },
    { key: 'user_progress', label: 'user_progress', desc: 'Solved questions & completed milestones' },
    { key: 'companies', label: 'companies', desc: 'Recruiter drives, job roles, and cutoffs' },
    { key: 'notices', label: 'notices', desc: 'Placement cell circulars and drive alerts' },
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">
                  Supabase Backend Integration
                </h3>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    report?.allTablesReady
                      ? 'bg-emerald-100 text-emerald-800'
                      : isSupabaseConfigured
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {report?.allTablesReady
                    ? 'Fully Connected'
                    : isSupabaseConfigured
                    ? 'Schema Setup Required'
                    : 'Not Configured'}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Database tables, Row Level Security (RLS) policies, and authentication status
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-600">
          {/* Connection Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Supabase Project Endpoint
              </span>
              <div className="font-mono text-xs text-slate-800 font-semibold truncate">
                {getMaskedSupabaseUrl()}
              </div>
              <div className="text-[10px] text-slate-400">
                Loaded via <code className="text-blue-600">VITE_SUPABASE_URL</code>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Client Anon Public Key
              </span>
              <div className="font-mono text-xs text-slate-800 font-semibold truncate">
                {getMaskedAnonKey()}
              </div>
              <div className="text-[10px] text-slate-400">
                Loaded via <code className="text-blue-600">VITE_SUPABASE_ANON_KEY</code> (safe for client)
              </div>
            </div>
          </div>

          {/* Current Auth Status */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <div>
                <span className="font-bold text-slate-900 block">Supabase Authentication</span>
                <span className="text-[11px] text-slate-500">
                  {report?.hasActiveSession
                    ? `Logged in as: ${report.userEmail}`
                    : 'No active Supabase session (Using local demo session)'}
                </span>
              </div>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              {report?.hasActiveSession ? 'Session Active' : 'Offline / Demo'}
            </div>
          </div>

          {/* Table Status Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-xs">
                Database Tables Status ({report ? 6 - (report.missingTablesCount || 0) : 0}/6 Active)
              </h4>
              <button
                onClick={loadStatus}
                disabled={loading}
                className="flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-medium disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Checking...' : 'Refresh Status'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {tableList.map(({ key, label, desc }) => {
                const isReady = report?.tables[key];
                return (
                  <div
                    key={key}
                    className={`p-3 rounded-xl border flex items-start justify-between gap-2 transition-all ${
                      isReady
                        ? 'border-emerald-200 bg-emerald-50/30'
                        : 'border-amber-200 bg-amber-50/30'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-slate-800">
                        {label}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{desc}</div>
                    </div>
                    {isReady ? (
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px] flex-shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Ready
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-amber-700 font-semibold text-[11px] flex-shrink-0">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Pending
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Setup Instructions if missing tables */}
          {!report?.allTablesReady && (
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs">
                    One-Step Database Migration Required
                  </h4>
                </div>
                <button
                  onClick={handleCopySql}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-xs transition-colors text-xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'SQL Copied!' : 'Copy SQL Schema'}
                </button>
              </div>

              <p className="text-[11px] text-slate-600 leading-relaxed">
                Supabase uses PostgreSQL with Row Level Security. Because the public Anon key
                safely cannot alter database structure, follow these simple steps to initialize the tables:
              </p>

              <ol className="space-y-2 text-[11px] text-slate-700 font-medium pl-1">
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    Open your project at{' '}
                    <a
                      href="https://supabase.com/dashboard"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline font-semibold inline-flex items-center gap-0.5"
                    >
                      Supabase Dashboard <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    Click on <strong>SQL Editor</strong> in the left sidebar, then click{' '}
                    <strong>New query</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    Click the <strong>Copy SQL Schema</strong> button above, paste the code into
                    the editor, and click <strong>Run</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0 mt-0.5">
                    4
                  </span>
                  <span>
                    Come back here and click <strong>Refresh Status</strong> to verify table creation!
                  </span>
                </li>
              </ol>
            </div>
          )}

          {report?.allTablesReady && (
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              <div>
                <div className="font-bold text-emerald-900 text-xs">
                  All Database Tables & RLS Policies are Active!
                </div>
                <div className="text-[11px] text-emerald-700">
                  Student profiles, applications, practice test scores, and recruiter drives are synchronized with your Supabase PostgreSQL database.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="text-[10px] text-slate-400">
            Last checked: {report?.lastChecked || 'Just now'}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySql}
              className="px-3 py-1.5 text-xs text-slate-700 hover:text-slate-900 font-medium border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy SQL'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
