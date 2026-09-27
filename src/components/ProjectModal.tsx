import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Copy, Check, Code2, Layers } from 'lucide-react';
import { ProjectItem, PROFILE_INFO } from '../data/portfolioData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onRequestProjectDiscussion: (projectTitle: string) => void;
  isDark?: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onRequestProjectDiscussion,
  isDark = false,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'code'>('overview');
  const [copiedCode, setCopiedCode] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setActiveTab('overview');
    setCopiedCode(false);
    setImgFailed(false);
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  const handleCopySnippet = () => {
    if (!project) return;
    navigator.clipboard.writeText(project.codePreview.snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/75 backdrop-blur-md overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-4xl border rounded-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col shadow-2xl ${
              isDark
                ? 'bg-[#0D0F16] border-[#222634] text-[#F4F4F0]'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Modal Top Header */}
            <div
              className={`flex items-center justify-between px-6 py-4 border-b ${
                isDark
                  ? 'border-[#222634] bg-[#090A0F]'
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div
                className={`flex items-center gap-2 text-xs font-mono tabular-nums ${
                  isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                }`}
              >
                <span>Case Study {project.index}</span>
                <span aria-hidden="true">·</span>
                <span>{project.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{project.year}</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study modal"
                className={`inline-flex items-center justify-center w-9 h-9 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#3B82F6] ${
                  isDark
                    ? 'text-[#94A3B8] hover:text-[#F4F4F0] hover:bg-[#161924]'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/70'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
              {/* Title & Interactive View Switcher */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2
                    id="modal-project-title"
                    className={`font-display text-2xl sm:text-3xl font-bold tracking-tight ${
                      isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                    }`}
                  >
                    {project.title}
                  </h2>
                  <p
                    className={`text-sm sm:text-base mt-1 ${
                      isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                    }`}
                  >
                    {project.subtitle}
                  </p>
                </div>

                {/* Segmented interactive control */}
                <div
                  className={`flex items-center gap-1 p-1 border rounded-lg self-start ${
                    isDark
                      ? 'bg-[#141722] border-[#222634]'
                      : 'bg-slate-100 border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveTab('overview')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      activeTab === 'overview'
                        ? 'bg-[#2563EB] text-white'
                        : isDark
                        ? 'text-[#94A3B8] hover:text-[#F4F4F0]'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Overview</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('code')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      activeTab === 'code'
                        ? 'bg-[#2563EB] text-white'
                        : isDark
                        ? 'text-[#94A3B8] hover:text-[#F4F4F0]'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Code Snippet</span>
                  </button>
                </div>
              </div>

              {activeTab === 'overview' ? (
                <>
                  {/* High-Res Visual Container with Resilient Fallback */}
                  <div
                    className={`relative aspect-[16/9] w-full rounded-xl overflow-hidden border ${
                      isDark
                        ? 'bg-[#121521] border-[#222634]'
                        : 'bg-slate-900 border-slate-200'
                    }`}
                  >
                    {project.image && !imgFailed ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        onError={() => setImgFailed(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col justify-between p-8 bg-gradient-to-br from-[#131B31] via-[#0E1322] to-[#080A11]">
                        <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                          <span>PROJECT OVERVIEW · {project.index}</span>
                          <span>{project.year}</span>
                        </div>
                        <div className="my-auto max-w-lg">
                          <p className="font-serif italic text-2xl text-[#93C5FD]">
                            {project.subtitle}
                          </p>
                          <p className="text-sm text-[#E2E8F0] mt-2 leading-relaxed">
                            {project.architecture}
                          </p>
                        </div>
                        <div className="text-xs font-mono text-[#94A3B8]">
                          {project.stack.join(' · ')}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quantitative Metrics Row */}
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-3 gap-6 py-5 border-y ${
                      isDark ? 'border-[#222634]' : 'border-slate-200'
                    }`}
                  >
                    {project.metrics.map((metric) => (
                      <div key={metric.label}>
                        <p
                          className={`font-mono text-2xl font-semibold tabular-nums ${
                            isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                          }`}
                        >
                          {metric.value}
                        </p>
                        <p
                          className={`text-xs mt-1 ${
                            isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                          }`}
                        >
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Problem / Implementation / Outcome */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                      <h3
                        className={`text-sm font-semibold ${
                          isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                        }`}
                      >
                        01. Objective
                      </h3>
                      <p
                        className={`text-sm mt-2 leading-relaxed ${
                          isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                        }`}
                      >
                        {project.challenge}
                      </p>
                    </div>
                    <div>
                      <h3
                        className={`text-sm font-semibold ${
                          isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                        }`}
                      >
                        02. Approach
                      </h3>
                      <p
                        className={`text-sm mt-2 leading-relaxed ${
                          isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                        }`}
                      >
                        {project.architecture}
                      </p>
                    </div>
                    <div>
                      <h3
                        className={`text-sm font-semibold ${
                          isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                        }`}
                      >
                        03. Outcome
                      </h3>
                      <p
                        className={`text-sm mt-2 leading-relaxed ${
                          isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                        }`}
                      >
                        {project.outcome}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                /* Code Implementation View */
                <div className="rounded-xl border border-[#222634] bg-[#07080C] overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-[#222634] bg-[#0D0F17]">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
                      <span className="text-[#F4F4F0] font-medium">
                        {project.codePreview.filename}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{project.codePreview.language}</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopySnippet}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium text-[#94A3B8] hover:text-[#F4F4F0] bg-[#151824] hover:bg-[#1E2334] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Snippet</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-5 text-xs sm:text-sm font-mono text-[#E2E8F0] overflow-x-auto leading-relaxed">
                    <code>{project.codePreview.snippet}</code>
                  </pre>
                </div>
              )}

              {/* Unboxed Stack Metadata & Actions Footer */}
              <div
                className={`pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isDark ? 'border-[#222634]' : 'border-slate-200'
                }`}
              >
                <div
                  className={`text-xs ${
                    isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                  }`}
                >
                  <span
                    className={`font-medium mr-2 ${
                      isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                    }`}
                  >
                    Technologies:
                  </span>
                  <span>{project.stack.join(' · ')}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onRequestProjectDiscussion(project.title);
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Inquire About Project
                  </button>
                  <a
                    href={PROFILE_INFO.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium border rounded-lg transition-colors whitespace-nowrap ${
                      isDark
                        ? 'text-[#F4F4F0] bg-[#141722] hover:bg-[#1C2030] border-[#222634]'
                        : 'text-slate-800 bg-slate-100 hover:bg-slate-200 border-slate-200'
                    }`}
                  >
                    <span>Discuss on LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
