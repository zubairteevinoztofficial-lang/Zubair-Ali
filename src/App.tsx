/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from 'motion/react';
import {
  ArrowUpRight,
  ArrowUp,
  Copy,
  Check,
  Mail,
  Send,
  Award,
  Mic,
  BookOpen,
  Code2,
  Sun,
  Moon,
} from 'lucide-react';
import {
  PROFILE_INFO,
  PROJECTS,
  CAPABILITY_GROUPS,
  ACADEMIC_TIMELINE,
  ProjectItem,
} from './data/portfolioData';
import { PortraitShowcase } from './components/PortraitShowcase';
import { ProjectModal } from './components/ProjectModal';

type ProjectFilter = 'all' | 'web' | 'python' | 'education';

interface InquirySubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

const sectionRevealVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function App() {
  // White / Light mode by default, with interactive toggle for Dark / Light mode
  const [isDark, setIsDark] = useState<boolean>(false);

  // Smooth scroll depth progress tracking & Scroll-to-Top visibility
  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    // Show floating 'Scroll to Top' button once user scrolls past the hero section (~520px)
    setShowScrollTop(latest > 520);
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#050505';
      document.body.style.color = '#F4F4F0';
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#FFFFFF';
      document.body.style.color = '#0F172A';
    }
  }, [isDark]);

  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const [activeCapabilityId, setActiveCapabilityId] = useState<string>(
    CAPABILITY_GROUPS[0].id
  );
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Interactive Credential & Experience Spotlight state
  const [activeHighlightTab, setActiveHighlightTab] = useState<
    'pitp' | 'speaking' | 'tutor'
  >('pitp');

  // Contact Inquiry Form state
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [inquirySubject, setInquirySubject] = useState(
    'Web / Python Project, Tutoring, or Speaking Inquiry'
  );
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submissions, setSubmissions] = useState<InquirySubmission[]>([]);

  const filteredProjects =
    activeFilter === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  const activeCapability =
    CAPABILITY_GROUPS.find((c) => c.id === activeCapabilityId) ||
    CAPABILITY_GROUPS[0];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestProjectDiscussion = (projectTitle: string) => {
    setInquirySubject(`Project Discussion: ${projectTitle}`);
    setInquiryMessage(
      `Hi Zubair,\n\nI explored your project "${projectTitle}" on your portfolio and would like to connect with you.`
    );
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !inquiryMessage.trim()) {
      setFormError('Please complete your name, email address, and message.');
      return;
    }
    setFormError(null);

    const newEntry: InquirySubmission = {
      id: String(Date.now()),
      name: senderName.trim(),
      email: senderEmail.trim(),
      subject: inquirySubject.trim() || 'Portfolio Inquiry',
      message: inquiryMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setSubmissions((prev) => [newEntry, ...prev]);
    setSenderName('');
    setSenderEmail('');
    setInquiryMessage('');
  };

  const marqueeItems = [
    'software engineering · quest nawabshah',
    'pitp by iba sukkur & gos',
    'certified web developer',
    'certified python developer',
    'provincial-level public speaker & debater',
    'competition winner & academic tutor',
  ];

  const credentialSpotlightContent = {
    pitp: {
      tag: 'PITP · IBA Sukkur & Government of Sindh',
      title: 'Dual Certified: Web Developer & Python Developer',
      summary:
        'Completed intensive technical training under the Peoples Information Technology Programme (PITP) by IBA Sukkur & GoS, earning official certifications in both Web Development and Python Development.',
      points: [
        'Certified Web Developer — Responsive layouts, React, Tailwind CSS, JavaScript, and modern UI craft',
        'Certified Python Developer — Core Python 3, Object-Oriented Programming, scripting, and problem solving',
        'Hands-on project completions verified under IBA Sukkur & Government of Sindh standards',
      ],
      statValue: '2 Certifications',
      statLabel: 'PITP by IBA Sukkur & GoS',
    },
    speaking: {
      tag: 'Provincial Stage · Oratory & Debating',
      title: 'Provincial-Level Public Speaker & Competition Winner',
      summary:
        'Extensive stage experience representing in Provincial-Level Public Speaking and Debating championships, winning multiple competitions through structured argumentation and impactful delivery.',
      points: [
        'Competition Winner at provincial-level declamation and debating events',
        'Experienced Debater adept at critical analysis, persuasive rhetoric, and impromptu rebuttals',
        'Brings strong communication and leadership clarity to technical presentations and team settings',
      ],
      statValue: 'Provincial Winner',
      statLabel: 'Public Speaking & Debating Championships',
    },
    tutor: {
      tag: 'Mentorship & Teaching',
      title: 'Programming & Academic Tutor',
      summary:
        'Dedicated Tutor helping students master Web Development, Python programming, and foundational academic subjects with clear, structured, and encouraging guidance.',
      points: [
        'Mentors students in Python programming, logic building, and responsive Web Development',
        'Translates public speaking clarity into engaging, easy-to-follow teaching sessions',
        'Focuses on practical exercises, concept mastery, and building student confidence',
      ],
      statValue: 'Active Tutor',
      statLabel: 'Web, Python & Academic Mentorship',
    },
  }[activeHighlightTab];

  return (
    <div
      className={`min-h-screen flex flex-col selection:bg-[#2563EB] selection:text-white transition-colors duration-300 ${
        isDark
          ? 'bg-[#050505] text-[#F4F4F0]'
          : 'bg-white text-slate-900'
      }`}
    >
      {/* STICKY HEADER WITH THIN COLORED SCROLL PROGRESS BAR AT THE VERY TOP */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
          isDark
            ? 'bg-[#050505]/90 border-[#222634]'
            : 'bg-white/90 border-slate-200'
        }`}
      >
        {/* Thin colored scroll-depth progress bar across the top of the header */}
        <div
          aria-hidden="true"
          className={`relative w-full h-[3px] overflow-hidden ${
            isDark ? 'bg-[#121521]' : 'bg-slate-100'
          }`}
        >
          <motion.div
            style={{ scaleX: smoothProgress }}
            className="h-full w-full origin-left bg-gradient-to-r from-[#2563EB] via-[#38BDF8] to-[#D97706] shadow-[0_0_12px_rgba(37,99,235,0.55)]"
          />
        </div>

        <div className="max-w-[1240px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className={`font-display text-lg font-bold tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#3B82F6] ${
              isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
            }`}
          >
            Zubair Ali <span className="text-[#2563EB]">(ZT)</span>
          </a>

          {/* Zone 2: 4 clean navigation links with subtle hover underlines */}
          <nav
            aria-label="Primary Navigation"
            className={`hidden md:flex items-center gap-8 text-sm font-medium ${
              isDark ? 'text-[#94A3B8]' : 'text-slate-600'
            }`}
          >
            <a
              href="#works"
              className={`hover:underline underline-offset-8 decoration-[#2563EB] transition-colors whitespace-nowrap ${
                isDark ? 'hover:text-[#F4F4F0]' : 'hover:text-slate-900'
              }`}
            >
              Projects
            </a>
            <a
              href="#capabilities"
              className={`hover:underline underline-offset-8 decoration-[#2563EB] transition-colors whitespace-nowrap ${
                isDark ? 'hover:text-[#F4F4F0]' : 'hover:text-slate-900'
              }`}
            >
              Skills &amp; Certifications
            </a>
            <a
              href="#academic"
              className={`hover:underline underline-offset-8 decoration-[#2563EB] transition-colors whitespace-nowrap ${
                isDark ? 'hover:text-[#F4F4F0]' : 'hover:text-slate-900'
              }`}
            >
              Education &amp; Speaking
            </a>
            <a
              href="#contact"
              className={`hover:underline underline-offset-8 decoration-[#2563EB] transition-colors whitespace-nowrap ${
                isDark ? 'hover:text-[#F4F4F0]' : 'hover:text-slate-900'
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: Theme Toggle (Dark / Light Mode) & Primary CTA */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                isDark
                  ? 'bg-[#12141C] hover:bg-[#191D2B] text-[#F4F4F0] border-[#222634]'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-800 border-slate-200'
              }`}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            <a
              href="#contact"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* HERO SECTION — SPLIT-SCREEN EDITORIAL LAYOUT */}
        <section
          className={`relative pt-12 pb-20 md:py-24 border-b transition-colors duration-300 ${
            isDark
              ? 'border-[#222634] bg-[#050505]'
              : 'border-slate-200 bg-gradient-to-b from-slate-50/70 to-white'
          }`}
        >
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
              {/* Left Column: Typographic Hierarchy, Bio, Actions & Verified Credentials */}
              <div className="lg:col-span-7 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-5"
                >
                  {/* Unboxed clean metadata kicker */}
                  <div
                    className={`flex flex-wrap items-center gap-2 text-xs sm:text-sm ${
                      isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                    }`}
                  >
                    <span className="text-[#2563EB] font-semibold">
                      Zubair Ali · QUEST Nawabshah
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>PITP Certified (IBA Sukkur &amp; GoS)</span>
                  </div>

                  {/* Display Headline with "I'm ZT" */}
                  <h1
                    className={`font-display text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight leading-[1.12] max-w-2xl ${
                      isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                    }`}
                  >
                    I&apos;m ZT -{' '}
                    <span
                      className={`font-serif italic font-normal ${
                        isDark ? 'text-[#93C5FD]' : 'text-[#2563EB]'
                      }`}
                    >
                      Software Engineering Student
                    </span>{' '}
                    and a Front-End Web Developer and a Public Speaker
                  </h1>

                  {/* Body Prose (65-75ch max width) */}
                  <p
                    className={`text-base sm:text-lg leading-relaxed max-w-[64ch] ${
                      isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                    }`}
                  >
                    {PROFILE_INFO.heroBio}
                  </p>
                </motion.div>

                {/* Primary & Secondary Action Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-wrap items-center gap-3 pt-1"
                >
                  <a
                    href="#works"
                    className="px-5 py-3 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl transition-colors whitespace-nowrap shadow-sm"
                  >
                    Explore Projects
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-medium border rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
                      isDark
                        ? 'text-[#F4F4F0] bg-[#12141C] hover:bg-[#181B28] border-[#222634]'
                        : 'text-slate-800 bg-white hover:bg-slate-100 border-slate-200 shadow-xs'
                    }`}
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-500" />
                        <span>Copied: {PROFILE_INFO.email}</span>
                      </>
                    ) : (
                      <>
                        <Copy
                          className={`w-4 h-4 ${
                            isDark ? 'text-[#94A3B8]' : 'text-slate-500'
                          }`}
                        />
                        <span>{PROFILE_INFO.email}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={PROFILE_INFO.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                      isDark
                        ? 'text-[#94A3B8] hover:text-[#F4F4F0]'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>{PROFILE_INFO.linkedinDisplay}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </motion.div>

                {/* Verified Credentials & Highlights Row */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.18,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`pt-8 border-t grid grid-cols-1 sm:grid-cols-3 gap-6 ${
                    isDark ? 'border-[#222634]' : 'border-slate-200'
                  }`}
                >
                  {PROFILE_INFO.keyMetrics.map((item) => (
                    <div key={item.label} className="space-y-1">
                      <p
                        className={`font-mono text-2xl sm:text-3xl font-semibold tabular-nums ${
                          isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                        }`}
                      >
                        {item.value}
                      </p>
                      <p
                        className={`text-xs font-semibold ${
                          isDark ? 'text-[#E2E8F0]' : 'text-slate-800'
                        }`}
                      >
                        {item.label}
                      </p>
                      <p
                        className={`text-xs leading-snug ${
                          isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                        }`}
                      >
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right Column: Studio Portrait Showcase */}
              <div className="lg:col-span-5">
                <PortraitShowcase isDark={isDark} />
              </div>
            </div>
          </div>
        </section>

        {/* SUBTLE ANIMATED MARQUEE SECTION DIVIDER */}
        <div
          aria-hidden="true"
          className={`py-3.5 border-b overflow-hidden select-none transition-colors duration-300 ${
            isDark
              ? 'bg-[#090B11] border-[#222634] text-[#94A3B8]'
              : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}
        >
          <div className="animate-marquee flex items-center gap-8 text-xs font-mono tracking-wider">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
              <React.Fragment key={`${item}-${idx}`}>
                <span className="whitespace-nowrap">{item}</span>
                <span className="text-[#2563EB]">·</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* SECTION 01: SELECTED PROJECTS (SCROLL-REVEAL ANIMATED) */}
        <motion.section
          id="works"
          variants={sectionRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className={`py-20 md:py-28 border-b transition-colors duration-300 ${
            isDark ? 'border-[#222634] bg-[#050505]' : 'border-slate-200 bg-white'
          }`}
        >
          <div className="max-w-[1240px] mx-auto px-6 space-y-12">
            {/* Section Header + Interactive Filter Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <p className="text-xs font-mono text-[#2563EB] font-semibold">
                  01. Selected Projects
                </p>
                <h2
                  className={`font-display text-3xl sm:text-4xl font-bold tracking-tight ${
                    isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                  }`}
                >
                  Web Development &amp; Python Builds
                </h2>
                <p
                  className={`text-sm sm:text-base ${
                    isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                  }`}
                >
                  Click any project card to inspect the project overview and
                  clean code snippets in React, JavaScript, and Python.
                </p>
              </div>

              {/* Interactive Segmented Filter Bar */}
              <div
                role="tablist"
                aria-label="Filter projects by domain"
                className={`flex flex-wrap items-center gap-1 p-1.5 border rounded-xl self-start ${
                  isDark
                    ? 'bg-[#10121B] border-[#222634]'
                    : 'bg-slate-100 border-slate-200'
                }`}
              >
                {(
                  [
                    { id: 'all', label: 'All Projects' },
                    { id: 'web', label: 'Web Development' },
                    { id: 'python', label: 'Python Development' },
                    { id: 'education', label: 'Speaking & Tutoring' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeFilter === tab.id}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      activeFilter === tab.id
                        ? 'bg-[#2563EB] text-white shadow-xs'
                        : isDark
                        ? 'text-[#94A3B8] hover:text-[#F4F4F0]'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Bento Box Grid with Scroll-Down Animations */}
            <motion.div
              layout
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => {
                  const isWide =
                    activeFilter === 'all'
                      ? project.featuredSpan || index === 3
                      : index === 0;
                  const colSpanClass = isWide
                    ? 'lg:col-span-7'
                    : 'lg:col-span-5';
                  const hasValidImage =
                    Boolean(project.image) && !failedImages[project.id];

                  return (
                    <motion.article
                      layout
                      key={project.id}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      onClick={() => setSelectedProject(project)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedProject(project);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Open details for ${project.title}`}
                      className={`${colSpanClass} group relative rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2563EB] ${
                        isDark
                          ? 'bg-[#0D0F17] border-[#222634] hover:border-[#3B82F6]/70'
                          : 'bg-white border-slate-200 hover:border-[#2563EB]/70 shadow-sm hover:shadow-xl hover:shadow-blue-950/5'
                      }`}
                    >
                      {/* Media Container */}
                      <div
                        className={`relative aspect-[16/10] w-full overflow-hidden border-b ${
                          isDark
                            ? 'bg-[#131724] border-[#222634]'
                            : 'bg-slate-900 border-slate-200'
                        }`}
                      >
                        {hasValidImage ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            referrerPolicy="no-referrer"
                            onError={() =>
                              setFailedImages((prev) => ({
                                ...prev,
                                [project.id]: true,
                              }))
                            }
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        ) : (
                          /* Styled Code Preview Fallback Surface */
                          <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-[#16203A] via-[#0E1322] to-[#080B12]">
                            <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                              <span>{project.codePreview.filename}</span>
                              <span>{project.year}</span>
                            </div>
                            <pre className="text-[11px] sm:text-xs font-mono text-[#93C5FD]/90 overflow-hidden leading-relaxed my-auto py-3">
                              <code>
                                {project.codePreview.snippet
                                  .split('\n')
                                  .slice(0, 6)
                                  .join('\n')}
                              </code>
                            </pre>
                            <div className="text-xs font-mono text-[#94A3B8]">
                              Click to inspect project details &amp; source snippet
                            </div>
                          </div>
                        )}

                        <div
                          className={`absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t to-transparent pointer-events-none ${
                            isDark ? 'from-[#0D0F17]' : 'from-black/40'
                          }`}
                        />
                      </div>

                      {/* Card Content Body */}
                      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                        <div className="space-y-2.5">
                          <div
                            className={`flex items-center justify-between gap-2 text-xs font-mono tabular-nums ${
                              isDark ? 'text-[#94A3B8]' : 'text-slate-500'
                            }`}
                          >
                            <div>
                              <span>{project.index}</span>
                              <span className="mx-1.5" aria-hidden="true">
                                ·
                              </span>
                              <span>{project.categoryLabel}</span>
                              <span className="mx-1.5" aria-hidden="true">
                                ·
                              </span>
                              <span>{project.year}</span>
                            </div>
                            <span className="inline-flex items-center gap-1 text-[#2563EB] font-medium group-hover:translate-x-0.5 transition-transform">
                              <span>View Details</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>
                          </div>

                          <h3
                            className={`font-display text-xl sm:text-2xl font-bold transition-colors ${
                              isDark
                                ? 'text-[#F4F4F0] group-hover:text-[#93C5FD]'
                                : 'text-slate-900 group-hover:text-[#2563EB]'
                            }`}
                          >
                            {project.title}
                          </h3>

                          <p
                            className={`text-sm leading-relaxed ${
                              isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                            }`}
                          >
                            {project.summary}
                          </p>
                        </div>

                        <div
                          className={`pt-4 border-t space-y-3 ${
                            isDark ? 'border-[#222634]/80' : 'border-slate-200'
                          }`}
                        >
                          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                            {project.metrics.map((m) => (
                              <div
                                key={m.label}
                                className="flex items-baseline gap-1.5 text-xs"
                              >
                                <span
                                  className={`font-mono font-semibold tabular-nums ${
                                    isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                                  }`}
                                >
                                  {m.value}
                                </span>
                                <span
                                  className={
                                    isDark ? 'text-[#94A3B8]' : 'text-slate-500'
                                  }
                                >
                                  {m.label}
                                </span>
                              </div>
                            ))}
                          </div>

                          <p
                            className={`text-xs font-mono ${
                              isDark ? 'text-[#94A3B8]' : 'text-slate-500'
                            }`}
                          >
                            {project.stack.join(' · ')}
                          </p>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.section>

        {/* SECTION 02: SKILLS, PITP CERTIFICATIONS & LEADERSHIP WORKBENCH */}
        <motion.section
          id="capabilities"
          variants={sectionRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className={`py-20 md:py-28 border-b transition-colors duration-300 ${
            isDark
              ? 'bg-[#080A10] border-[#222634]'
              : 'bg-slate-50/80 border-slate-200'
          }`}
        >
          <div className="max-w-[1240px] mx-auto px-6 space-y-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <p className="text-xs font-mono text-[#2563EB] font-semibold">
                  02. Verified Skills, Certifications &amp; Leadership
                </p>
                <h2
                  className={`font-display text-3xl sm:text-4xl font-bold tracking-tight ${
                    isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                  }`}
                >
                  Web Development, Python &amp; Public Speaking
                </h2>
                <p
                  className={`text-sm sm:text-base ${
                    isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                  }`}
                >
                  Grounded in official certifications from the Peoples
                  Information Technology Programme (PITP) by IBA Sukkur &amp;
                  Government of Sindh, Software Engineering at QUEST Nawabshah,
                  and provincial-level stage excellence.
                </p>
              </div>

              {/* Interactive Domain Selector */}
              <div
                className={`flex flex-wrap items-center gap-1 p-1.5 border rounded-xl self-start ${
                  isDark
                    ? 'bg-[#10131E] border-[#222634]'
                    : 'bg-white border-slate-200 shadow-2xs'
                }`}
              >
                {CAPABILITY_GROUPS.map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => setActiveCapabilityId(group.id)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      activeCapabilityId === group.id
                        ? 'bg-[#2563EB] text-white'
                        : isDark
                        ? 'text-[#94A3B8] hover:text-[#F4F4F0]'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {group.index}. {group.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Capability Detail Panel + Interactive Credential & Achievements Spotlight */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 7 Columns: Selected Capability Breakdown */}
              <motion.div
                key={activeCapability.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`lg:col-span-7 p-7 sm:p-8 rounded-2xl border space-y-8 ${
                  isDark
                    ? 'bg-[#0D0F17] border-[#222634]'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="space-y-2">
                  <p
                    className={`text-xs font-mono ${
                      isDark ? 'text-[#94A3B8]' : 'text-slate-500'
                    }`}
                  >
                    {activeCapability.subtitle}
                  </p>
                  <h3
                    className={`font-display text-2xl font-bold ${
                      isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                    }`}
                  >
                    {activeCapability.index}. {activeCapability.title}
                  </h3>
                  <p
                    className={`text-sm sm:text-base leading-relaxed ${
                      isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                    }`}
                  >
                    {activeCapability.description}
                  </p>
                </div>

                <div
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t ${
                    isDark ? 'border-[#222634]' : 'border-slate-200'
                  }`}
                >
                  <div>
                    <h4
                      className={`text-xs font-semibold mb-3 ${
                        isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                      }`}
                    >
                      Core Skills &amp; Focus
                    </h4>
                    <ul
                      className={`space-y-2 text-sm ${
                        isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                      }`}
                    >
                      {activeCapability.coreTechnologies.map((tech) => (
                        <li key={tech} className="flex items-center gap-2">
                          <span className="text-[#2563EB] font-mono font-bold">
                            ·
                          </span>
                          <span>{tech}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4
                      className={`text-xs font-semibold mb-3 ${
                        isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                      }`}
                    >
                      Practical Standards
                    </h4>
                    <ul
                      className={`space-y-2.5 text-sm ${
                        isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                      }`}
                    >
                      {activeCapability.engineeringPractices.map((practice) => (
                        <li key={practice} className="leading-snug">
                          {practice}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Code Pattern & Credential Footer */}
                <div
                  className={`pt-6 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
                    isDark ? 'border-[#222634]' : 'border-slate-200'
                  }`}
                >
                  <div>
                    <p
                      className={`font-mono text-2xl font-bold tabular-nums ${
                        isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                      }`}
                    >
                      {activeCapability.benchmarkMetric.value}
                    </p>
                    <p
                      className={`text-xs font-semibold ${
                        isDark ? 'text-[#E2E8F0]' : 'text-slate-800'
                      }`}
                    >
                      {activeCapability.benchmarkMetric.label}
                    </p>
                    <p
                      className={`text-xs mt-0.5 ${
                        isDark ? 'text-[#94A3B8]' : 'text-slate-500'
                      }`}
                    >
                      {activeCapability.benchmarkMetric.context}
                    </p>
                  </div>

                  <pre className="p-3.5 rounded-xl bg-[#07080D] border border-[#222634] text-xs font-mono text-[#93C5FD] overflow-x-auto max-w-full sm:max-w-xs">
                    <code>{activeCapability.sampleArchitectureCode}</code>
                  </pre>
                </div>
              </motion.div>

              {/* Right 5 Columns: Interactive PITP, Public Speaking & Tutoring Explorer */}
              <div
                className={`lg:col-span-5 p-7 sm:p-8 rounded-2xl border space-y-6 ${
                  isDark
                    ? 'bg-[#0D0F17] border-[#222634]'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-mono text-[#2563EB] font-semibold">
                      Credentials &amp; Distinctions
                    </p>
                    <h3
                      className={`font-display text-lg font-bold mt-0.5 ${
                        isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                      }`}
                    >
                      Certifications, Oratory &amp; Mentorship
                    </h3>
                  </div>
                  <Award className="w-5 h-5 text-[#2563EB]" />
                </div>

                {/* Interactive Switcher for PITP / Speaking / Tutoring */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveHighlightTab('pitp')}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                      activeHighlightTab === 'pitp'
                        ? 'bg-[#2563EB] border-[#2563EB] text-white'
                        : isDark
                        ? 'bg-[#121520] border-[#222634] text-[#94A3B8] hover:text-[#F4F4F0]'
                        : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>PITP Courses</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveHighlightTab('speaking')}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                      activeHighlightTab === 'speaking'
                        ? 'bg-[#2563EB] border-[#2563EB] text-white'
                        : isDark
                        ? 'bg-[#121520] border-[#222634] text-[#94A3B8] hover:text-[#F4F4F0]'
                        : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>Debate &amp; Stage</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveHighlightTab('tutor')}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                      activeHighlightTab === 'tutor'
                        ? 'bg-[#2563EB] border-[#2563EB] text-white'
                        : isDark
                        ? 'bg-[#121520] border-[#222634] text-[#94A3B8] hover:text-[#F4F4F0]'
                        : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Tutoring</span>
                  </button>
                </div>

                {/* Dynamic Spotlight Body */}
                <motion.div
                  key={activeHighlightTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 pt-1"
                >
                  <div>
                    <p className="text-xs font-mono text-[#2563EB] font-medium">
                      {credentialSpotlightContent.tag}
                    </p>
                    <h4
                      className={`font-display text-base font-bold mt-1 ${
                        isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                      }`}
                    >
                      {credentialSpotlightContent.title}
                    </h4>
                    <p
                      className={`text-xs sm:text-sm mt-1.5 leading-relaxed ${
                        isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                      }`}
                    >
                      {credentialSpotlightContent.summary}
                    </p>
                  </div>

                  <ul
                    className={`space-y-2 text-xs sm:text-sm ${
                      isDark ? 'text-[#E2E8F0]' : 'text-slate-700'
                    }`}
                  >
                    {credentialSpotlightContent.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2">
                        <span className="text-[#2563EB] font-mono font-bold mt-0.5">
                          ·
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* Spotlight Footer */}
                <div
                  className={`pt-4 border-t flex items-center justify-between text-xs font-mono ${
                    isDark ? 'border-[#222634]' : 'border-slate-200'
                  }`}
                >
                  <div>
                    <span
                      className={isDark ? 'text-[#94A3B8]' : 'text-slate-500'}
                    >
                      Recognition:{' '}
                    </span>
                    <span
                      className={`font-semibold ${
                        isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                      }`}
                    >
                      {credentialSpotlightContent.statValue}
                    </span>
                  </div>
                  <span className="text-[#2563EB] font-medium">
                    {credentialSpotlightContent.statLabel}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 03: EDUCATION, PITP CERTIFICATIONS & PUBLIC SPEAKING / TUTORING TIMELINE */}
        <motion.section
          id="academic"
          variants={sectionRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className={`py-20 md:py-28 border-b transition-colors duration-300 ${
            isDark ? 'border-[#222634] bg-[#050505]' : 'border-slate-200 bg-white'
          }`}
        >
          <div className="max-w-[1240px] mx-auto px-6 space-y-12">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-mono text-[#2563EB] font-semibold">
                03. Education, Certifications &amp; Experience
              </p>
              <h2
                className={`font-display text-3xl sm:text-4xl font-bold tracking-tight ${
                  isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                }`}
              >
                QUEST Nawabshah, PITP (IBA Sukkur &amp; GoS) &amp; Provincial Stage
              </h2>
              <p
                className={`text-sm sm:text-base ${
                  isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                }`}
              >
                Academic foundation in Software Engineering paired with certified
                Web &amp; Python development, provincial debating victories, and
                dedicated student tutoring.
              </p>
            </div>

            <div
              className={`divide-y border-y ${
                isDark
                  ? 'divide-[#222634] border-[#222634]'
                  : 'divide-slate-200 border-slate-200'
              }`}
            >
              {ACADEMIC_TIMELINE.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
                >
                  {/* Left 4 cols: Period & Institution */}
                  <div className="lg:col-span-4 space-y-1.5">
                    <p className="font-mono text-xs text-[#2563EB] font-semibold tabular-nums">
                      {item.period}
                    </p>
                    <h3
                      className={`font-display text-xl font-bold ${
                        isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                      }`}
                    >
                      {item.role}
                    </h3>
                    <p
                      className={`text-sm font-medium ${
                        isDark ? 'text-[#E2E8F0]' : 'text-slate-700'
                      }`}
                    >
                      {item.institution}
                    </p>
                    <p
                      className={`text-xs ${
                        isDark ? 'text-[#94A3B8]' : 'text-slate-500'
                      }`}
                    >
                      {item.location}
                    </p>
                  </div>

                  {/* Right 8 cols: Summary, Highlights & Focus */}
                  <div className="lg:col-span-8 space-y-5">
                    <p
                      className={`text-sm sm:text-base leading-relaxed ${
                        isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                      }`}
                    >
                      {item.summary}
                    </p>

                    <ul
                      className={`space-y-2 text-sm ${
                        isDark ? 'text-[#E2E8F0]' : 'text-slate-700'
                      }`}
                    >
                      {item.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2.5">
                          <span className="text-[#2563EB] font-mono font-bold mt-0.5">
                            ·
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <div
                      className={`pt-2 text-xs font-mono ${
                        isDark ? 'text-[#94A3B8]' : 'text-slate-500'
                      }`}
                    >
                      <span
                        className={`font-sans font-semibold mr-2 ${
                          isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                        }`}
                      >
                        Key Areas:
                      </span>
                      {item.courseworkOrFocus.join(' · ')}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* SECTION 04: DIRECT INQUIRY & CONTACT */}
        <motion.section
          id="contact"
          variants={sectionRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className={`py-20 md:py-28 transition-colors duration-300 ${
            isDark ? 'bg-[#07090E]' : 'bg-slate-50/70'
          }`}
        >
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left 5 Columns: Direct Coordinates */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-3">
                  <p className="text-xs font-mono text-[#2563EB] font-semibold">
                    04. Direct Inquiry &amp; Collaboration
                  </p>
                  <h2
                    className={`font-display text-3xl sm:text-4xl font-bold tracking-tight ${
                      isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                    }`}
                  >
                    Let&apos;s Connect &amp; Collaborate.
                  </h2>
                  <p
                    className={`text-sm sm:text-base leading-relaxed ${
                      isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                    }`}
                  >
                    Available for Front-End Web Development projects, Python
                    development, programming/academic tutoring, and public
                    speaking or debating invitations. Reach out directly via
                    email or LinkedIn.
                  </p>
                </div>

                {/* Direct Contact Action Rows */}
                <div className="space-y-4 pt-2">
                  <div
                    className={`p-5 rounded-2xl border flex items-center justify-between gap-4 ${
                      isDark
                        ? 'bg-[#0D0F17] border-[#222634]'
                        : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="min-w-0">
                      <p
                        className={`text-xs ${
                          isDark ? 'text-[#94A3B8]' : 'text-slate-500'
                        }`}
                      >
                        Direct Email
                      </p>
                      <p
                        className={`font-mono text-sm sm:text-base truncate mt-0.5 ${
                          isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                        }`}
                      >
                        {PROFILE_INFO.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className={`px-3 py-2 text-xs font-medium border rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                          isDark
                            ? 'text-[#F4F4F0] bg-[#151926] hover:bg-[#1E2436] border-[#222634]'
                            : 'text-slate-700 bg-slate-100 hover:bg-slate-200 border-slate-200'
                        }`}
                      >
                        {copiedEmail ? 'Copied' : 'Copy'}
                      </button>
                      <a
                        href={`mailto:${PROFILE_INFO.email}`}
                        className="p-2 text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors"
                        aria-label="Send email to Zubair Ali"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  <div
                    className={`p-5 rounded-2xl border flex items-center justify-between gap-4 ${
                      isDark
                        ? 'bg-[#0D0F17] border-[#222634]'
                        : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="min-w-0">
                      <p
                        className={`text-xs ${
                          isDark ? 'text-[#94A3B8]' : 'text-slate-500'
                        }`}
                      >
                        LinkedIn Profile
                      </p>
                      <p
                        className={`font-mono text-sm sm:text-base truncate mt-0.5 ${
                          isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                        }`}
                      >
                        {PROFILE_INFO.linkedinDisplay}
                      </p>
                    </div>
                    <a
                      href={PROFILE_INFO.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>Connect</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div
                  className={`text-xs space-y-1 pt-2 ${
                    isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                  }`}
                >
                  <p
                    className={`font-semibold ${
                      isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                    }`}
                  >
                    Academic Affiliation
                  </p>
                  <p>{PROFILE_INFO.institution}</p>
                  <p>{PROFILE_INFO.campusLocation}</p>
                </div>
              </div>

              {/* Right 7 Columns: Interactive Inquiry Composer */}
              <div
                className={`lg:col-span-7 p-7 sm:p-9 rounded-2xl border space-y-6 ${
                  isDark
                    ? 'bg-[#0D0F17] border-[#222634]'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="space-y-1">
                  <h3
                    className={`font-display text-xl font-bold ${
                      isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                    }`}
                  >
                    Send a Direct Message
                  </h3>
                  <p
                    className={`text-xs sm:text-sm ${
                      isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                    }`}
                  >
                    Compose a message below for Web Development, Python projects,
                    tutoring sessions, or speaking inquiries addressed to{' '}
                    <span
                      className={`font-mono font-medium ${
                        isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                      }`}
                    >
                      {PROFILE_INFO.email}
                    </span>
                    .
                  </p>
                </div>

                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="sender-name"
                        className={`block text-xs font-medium mb-1.5 ${
                          isDark ? 'text-[#E2E8F0]' : 'text-slate-700'
                        }`}
                      >
                        Your Name
                      </label>
                      <input
                        id="sender-name"
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="e.g. Ali Raza"
                        className={`w-full px-3.5 py-2.5 text-sm border focus:border-[#2563EB] rounded-xl focus:outline-none transition-colors ${
                          isDark
                            ? 'bg-[#07090E] border-[#222634] text-[#F4F4F0] placeholder-[#64748B]'
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                        }`}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="sender-email"
                        className={`block text-xs font-medium mb-1.5 ${
                          isDark ? 'text-[#E2E8F0]' : 'text-slate-700'
                        }`}
                      >
                        Your Email Address
                      </label>
                      <input
                        id="sender-email"
                        type="email"
                        value={senderEmail}
                        onChange={(e) => setSenderEmail(e.target.value)}
                        placeholder="name@example.com"
                        className={`w-full px-3.5 py-2.5 text-sm border focus:border-[#2563EB] rounded-xl focus:outline-none transition-colors ${
                          isDark
                            ? 'bg-[#07090E] border-[#222634] text-[#F4F4F0] placeholder-[#64748B]'
                            : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-subject"
                      className={`block text-xs font-medium mb-1.5 ${
                        isDark ? 'text-[#E2E8F0]' : 'text-slate-700'
                      }`}
                    >
                      Subject
                    </label>
                    <input
                      id="inquiry-subject"
                      type="text"
                      value={inquirySubject}
                      onChange={(e) => setInquirySubject(e.target.value)}
                      className={`w-full px-3.5 py-2.5 text-sm border focus:border-[#2563EB] rounded-xl focus:outline-none transition-colors ${
                        isDark
                          ? 'bg-[#07090E] border-[#222634] text-[#F4F4F0] placeholder-[#64748B]'
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-message"
                      className={`block text-xs font-medium mb-1.5 ${
                        isDark ? 'text-[#E2E8F0]' : 'text-slate-700'
                      }`}
                    >
                      Message
                    </label>
                    <textarea
                      id="inquiry-message"
                      rows={4}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      placeholder="Share details about your web project, Python task, tutoring requirement, or speaking invitation..."
                      className={`w-full px-3.5 py-2.5 text-sm border focus:border-[#2563EB] rounded-xl focus:outline-none transition-colors resize-y ${
                        isDark
                          ? 'bg-[#07090E] border-[#222634] text-[#F4F4F0] placeholder-[#64748B]'
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                    />
                  </div>

                  {formError && (
                    <p className="text-xs text-rose-500" role="alert">
                      {formError}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl transition-colors whitespace-nowrap cursor-pointer shadow-xs"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </button>

                    <a
                      href={`mailto:${PROFILE_INFO.email}?subject=${encodeURIComponent(
                        inquirySubject
                      )}&body=${encodeURIComponent(
                        `${inquiryMessage}\n\n— ${senderName} (${senderEmail})`
                      )}`}
                      className={`text-xs underline underline-offset-4 transition-colors whitespace-nowrap ${
                        isDark
                          ? 'text-[#94A3B8] hover:text-[#F4F4F0]'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Or open directly in Mail Client
                    </a>
                  </div>
                </form>

                {/* Confirmation Log of Dispatched Briefs */}
                {submissions.length > 0 && (
                  <div
                    className={`pt-6 border-t space-y-3 ${
                      isDark ? 'border-[#222634]' : 'border-slate-200'
                    }`}
                  >
                    <p className="text-xs font-mono text-emerald-500 font-semibold">
                      Message Prepared for Zubair Ali ({submissions.length})
                    </p>
                    {submissions.map((sub) => (
                      <div
                        key={sub.id}
                        className={`p-4 rounded-xl border space-y-1.5 text-xs ${
                          isDark
                            ? 'bg-[#07090E] border-[#222634]'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div
                          className={`flex items-center justify-between font-mono tabular-nums ${
                            isDark ? 'text-[#94A3B8]' : 'text-slate-500'
                          }`}
                        >
                          <span
                            className={`font-semibold ${
                              isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
                            }`}
                          >
                            {sub.subject}
                          </span>
                          <span>{sub.timestamp}</span>
                        </div>
                        <p
                          className={
                            isDark ? 'text-[#94A3B8]' : 'text-slate-600'
                          }
                        >
                          {sub.message}
                        </p>
                        <div className="pt-1 flex items-center justify-between text-slate-500">
                          <span>
                            From: {sub.name} · {sub.email}
                          </span>
                          <a
                            href={`mailto:${PROFILE_INFO.email}?subject=${encodeURIComponent(
                              sub.subject
                            )}&body=${encodeURIComponent(sub.message)}`}
                            className="text-[#2563EB] font-medium hover:underline"
                          >
                            Launch Email →
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* CLEAN EDITORIAL FOOTER */}
      <footer
        className={`py-8 border-t transition-colors duration-300 ${
          isDark
            ? 'bg-[#050505] border-[#222634] text-[#94A3B8]'
            : 'bg-white border-slate-200 text-slate-600'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <span
              className={`font-semibold ${
                isDark ? 'text-[#F4F4F0]' : 'text-slate-900'
              }`}
            >
              Zubair Ali (ZT)
            </span>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            <span>Software Engineering Student @ QUEST Nawabshah</span>
            <span className="mx-2" aria-hidden="true">
              ·
            </span>
            <span>PITP Certified Web &amp; Python Developer</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={`mailto:${PROFILE_INFO.email}`}
              className={`transition-colors ${
                isDark ? 'hover:text-[#F4F4F0]' : 'hover:text-slate-900'
              }`}
            >
              {PROFILE_INFO.email}
            </a>
            <a
              href={PROFILE_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                isDark ? 'hover:text-[#F4F4F0]' : 'hover:text-slate-900'
              }`}
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      {/* FLOATING 'SCROLL TO TOP' BUTTON (BOTTOM RIGHT CORNER AFTER SCROLLING PAST HERO) */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.9 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleScrollToTop}
            aria-label="Scroll to top of page"
            className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold shadow-lg shadow-blue-600/30 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
          >
            <ArrowUp className="w-4 h-4" />
            <span>Top</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* FULLSCREEN CASE STUDY LIGHTBOX MODAL */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestProjectDiscussion={handleRequestProjectDiscussion}
        isDark={isDark}
      />
    </div>
  );
}
