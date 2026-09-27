import cloudArchitectureImg from '../assets/images/project_cloud_architecture_1790505651766.jpg';
import questCampusSuiteImg from '../assets/images/project_quest_campus_suite_1790505673252.jpg';
import algorithmEngineImg from '../assets/images/project_algorithm_engine_1790505690195.jpg';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: 'web' | 'python' | 'education';
  categoryLabel: string;
  year: string;
  featuredSpan: boolean;
  image?: string;
  metrics: {
    label: string;
    value: string;
  }[];
  stack: string[];
  summary: string;
  challenge: string;
  architecture: string;
  outcome: string;
  codePreview: {
    filename: string;
    language: string;
    snippet: string;
  };
  liveUrl: string;
  repoUrl: string;
}

export interface CapabilityGroup {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  coreTechnologies: string[];
  engineeringPractices: string[];
  benchmarkMetric: {
    value: string;
    label: string;
    context: string;
  };
  sampleArchitectureCode: string;
}

export interface AcademicMilestone {
  id: string;
  period: string;
  role: string;
  institution: string;
  location: string;
  summary: string;
  highlights: string[];
  courseworkOrFocus: string[];
}

export const PROFILE_INFO = {
  name: 'Zubair Ali',
  handle: 'zubairteevino',
  role: 'Software Engineering Student · Certified Web & Python Developer',
  institution: 'Quaid-e-Awam University of Engineering, Science & Technology (QUEST)',
  campusLocation: 'Nawabshah, Sindh, Pakistan',
  email: 'zubairteevino@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/zubairteevino',
  linkedinDisplay: 'linkedin.com/in/zubairteevino',
  availability: 'Available for Web Development, Python Projects, Tutoring & Speaking Engagements',
  heroHeadline:
    "I'm ZT - Software Engineering Student and a Front-End Web Developer and a Public Speaker",
  heroBio:
    'I am Zubair Ali, a Software Engineering student at QUEST Nawabshah. Certified as both a Web Developer and Python Developer through the Peoples Information Technology Programme (PITP) by IBA Sukkur & Government of Sindh, alongside extensive experience as a Provincial-Level Public Speaker, Competition-Winning Debater, and Tutor.',
  keyMetrics: [
    {
      value: '2× PITP',
      label: 'Certified Web & Python Developer',
      detail: 'Peoples Information Technology Programme by IBA Sukkur & Govt. of Sindh',
    },
    {
      value: 'Provincial',
      label: 'Public Speaker & Debate Winner',
      detail: 'Award-winning speaker and competitive debater at the provincial level',
    },
    {
      value: 'QUEST',
      label: 'Software Engineering & Tutor',
      detail: 'Undergraduate at QUEST Nawabshah & dedicated student mentor',
    },
  ],
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'quest-campus-web-portal',
    index: '01',
    title: 'QUEST Student Resource & Study Hub',
    subtitle: 'Responsive Web Application for Software Engineering Cohorts',
    category: 'web',
    categoryLabel: 'Web Development',
    year: '2026',
    featuredSpan: true,
    image: questCampusSuiteImg,
    metrics: [
      { label: 'Credential Backing', value: 'PITP Web Certified' },
      { label: 'Responsive Layout', value: 'Mobile & Desktop' },
      { label: 'Core Focus', value: 'Student Productivity' },
    ],
    stack: ['React', 'Tailwind CSS', 'Framer Motion', 'JavaScript', 'HTML5 & CSS3'],
    summary:
      'A sleek, responsive web portal created to help QUEST Nawabshah software engineering students organize lecture schedules, course notes, and lab study materials.',
    challenge:
      'Students needed a clean, distraction-free dark-mode interface to access semester coursework, timetables, and tutoring resources from both phones and laptops.',
    architecture:
      'Built using modular React components, Tailwind CSS responsive grids, and smooth Framer Motion transitions with clean client-side filtering.',
    outcome:
      'Provided fellow students and tutees with a fast, intuitive hub for semester study coordination and academic reference.',
    codePreview: {
      filename: 'StudyResourceFilter.jsx',
      language: 'JavaScript / React',
      snippet: `export function filterStudyModules(modules, selectedSemester, searchQuery) {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return modules.filter((item) => {
    const matchesSemester =
      selectedSemester === 'all' || item.semester === selectedSemester;
    const matchesTopic =
      !normalizedQuery ||
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.subject.toLowerCase().includes(normalizedQuery);

    return matchesSemester && matchesTopic;
  });
}`,
    },
    liveUrl: '#quest-campus-web-portal',
    repoUrl: 'https://www.linkedin.com/in/zubairteevino',
  },
  {
    id: 'python-automation-suite',
    index: '02',
    title: 'PyAcademic — Automated Grading & Attendance Toolkit',
    subtitle: 'Python Data Processing & Report Generation Utility',
    category: 'python',
    categoryLabel: 'Python Development',
    year: '2026',
    featuredSpan: false,
    image: cloudArchitectureImg,
    metrics: [
      { label: 'Certification', value: 'PITP Python Certified' },
      { label: 'Processing Speed', value: 'Instant CSV/JSON' },
      { label: 'Accuracy', value: '100% Deterministic' },
    ],
    stack: ['Python', 'Object-Oriented Programming', 'File I/O & CSV', 'Data Structures'],
    summary:
      'A Python-based automation utility developed to parse student attendance sheets, calculate sessional grade percentages, and generate clean summary reports for tutoring cohorts.',
    challenge:
      'Manually calculating attendance eligibility and quiz averages across multiple student batches was repetitive and prone to spreadsheet formula errors.',
    architecture:
      'Structured with clean Python classes and standard library modules to validate records, compute weighted scores, and export formatted summaries.',
    outcome:
      'Streamlined tutoring assessment workflows and served as a practical teaching demonstration for students learning Python fundamentals.',
    codePreview: {
      filename: 'grade_analyzer.py',
      language: 'Python',
      snippet: `class StudentRecord:
    def __init__(self, name: str, roll_no: str, scores: list[float]):
        self.name = name
        self.roll_no = roll_no
        self.scores = scores

    def average_score(self) -> float:
        if not self.scores:
            return 0.0
        return round(sum(self.scores) / len(self.scores), 2)

    def status(self, passing_threshold: float = 50.0) -> str:
        return "Qualified" if self.average_score() >= passing_threshold else "Needs Review"`,
    },
    liveUrl: '#python-automation-suite',
    repoUrl: 'https://www.linkedin.com/in/zubairteevino',
  },
  {
    id: 'python-logic-tutor-lab',
    index: '03',
    title: 'PyLogic — Interactive Python & Problem-Solving Workbook',
    subtitle: 'Structured Code Examples for Programming Tutees',
    category: 'python',
    categoryLabel: 'Python Development',
    year: '2025',
    featuredSpan: false,
    image: algorithmEngineImg,
    metrics: [
      { label: 'Core Language', value: 'Python 3' },
      { label: 'Practice Modules', value: 'OOP & Logic' },
      { label: 'Audience', value: 'Programming Tutees' },
    ],
    stack: ['Python', 'Algorithmic Logic', 'Functions & Modules', 'Clean Code'],
    summary:
      'A curated collection of Python scripts and step-by-step problem-solving exercises crafted to teach beginners loops, functions, dictionaries, and object-oriented programming.',
    challenge:
      'New programming students often struggle to transition from basic syntax to writing structured, reusable Python programs.',
    architecture:
      'Organized into progressive modules with clear docstrings, input validation, and practical console exercises used directly during tutoring sessions.',
    outcome:
      'Helped tutees build strong confidence in Python programming and software engineering coursework.',
    codePreview: {
      filename: 'mentorship_exercises.py',
      language: 'Python',
      snippet: `def summarize_cohort_progress(submissions: dict[str, int], total_tasks: int) -> dict[str, str]:
    """Calculates completion percentage for each student in the tutoring batch."""
    report = {}
    for student, completed in submissions.items():
        pct = round((completed / max(1, total_tasks)) * 100, 1)
        report[student] = f"{pct}% Completed ({completed}/{total_tasks})"
    return report`,
    },
    liveUrl: '#python-logic-tutor-lab',
    repoUrl: 'https://www.linkedin.com/in/zubairteevino',
  },
  {
    id: 'debate-speaker-timer-web',
    index: '04',
    title: 'OratorStage — Debate & Public Speaking Timekeeper Web App',
    subtitle: 'Stage Timer & Adjudication Scorecard for Debate Competitions',
    category: 'education',
    categoryLabel: 'Public Speaking & Tutoring',
    year: '2025',
    featuredSpan: false,
    metrics: [
      { label: 'Domain Experience', value: 'Provincial Debater' },
      { label: 'Interface Mode', value: 'High-Contrast Stage UI' },
      { label: 'Built With', value: 'React & Tailwind CSS' },
    ],
    stack: ['React', 'Tailwind CSS', 'Framer Motion', 'Responsive Web Design'],
    summary:
      'Inspired by provincial-level debating and public speaking competitions, this web utility provides speakers and adjudicators with visual bell cues, speech segment timers, and rebuttal tracking.',
    challenge:
      'During practice debates and coaching sessions, speakers need clear visual time warnings (protected time, warning bell, grace period) without distractions.',
    architecture:
      'Designed as a high-contrast dark-mode React interface with large tabular numerals and instant stage-status color transitions.',
    outcome:
      'Used during speech preparation and student debate mentoring sessions to sharpen timing discipline and stage delivery.',
    codePreview: {
      filename: 'useSpeechTimer.js',
      language: 'JavaScript / React',
      snippet: `export function getSpeechStageStatus(elapsedSeconds, maxSeconds) {
  const remaining = Math.max(0, maxSeconds - elapsedSeconds);
  if (remaining === 0) return { phase: 'Time Up', accent: 'text-rose-400' };
  if (remaining <= 30) return { phase: 'Final Bell Warning', accent: 'text-amber-400' };
  return { phase: 'Active Floor Time', accent: 'text-blue-400' };
}`,
    },
    liveUrl: '#debate-speaker-timer-web',
    repoUrl: 'https://www.linkedin.com/in/zubairteevino',
  },
];

export const CAPABILITY_GROUPS: CapabilityGroup[] = [
  {
    id: 'certified-web-dev',
    index: '01',
    title: 'Certified Web Development',
    subtitle: 'PITP by IBA Sukkur & Govt. of Sindh · React · Tailwind CSS',
    description:
      'Certified Web Developer trained under the Peoples Information Technology Programme (PITP) by IBA Sukkur & Government of Sindh, building modern, responsive dark-mode websites and interactive React applications.',
    coreTechnologies: [
      'React & Component Architecture',
      'Tailwind CSS Responsive Design',
      'Framer Motion Smooth Animations',
      'JavaScript (ES6+)',
      'Semantic HTML5 & Modern CSS3',
      'Responsive Dark-Mode UI Layout',
    ],
    engineeringPractices: [
      'Clean, mobile-first responsive layouts across all screen sizes',
      'Smooth interactive animations and intuitive user navigation',
      'Structured, maintainable frontend component organization',
    ],
    benchmarkMetric: {
      value: 'Certified',
      label: 'PITP Web Developer',
      context: 'Awarded by IBA Sukkur & Government of Sindh (Peoples IT Programme)',
    },
    sampleArchitectureCode: `// PITP Certified Web Development — Responsive React & Motion
const fadeInUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
};`,
  },
  {
    id: 'certified-python-dev',
    index: '02',
    title: 'Certified Python Development',
    subtitle: 'PITP by IBA Sukkur & Govt. of Sindh · Python Programming',
    description:
      'Certified Python Developer through PITP (IBA Sukkur & GoS), experienced in writing clean Python scripts, object-oriented programs, data processing tools, and problem-solving logic.',
    coreTechnologies: [
      'Python 3 Core Programming',
      'Object-Oriented Programming (OOP)',
      'Python Data Structures (Lists, Dicts, Sets)',
      'File Handling & Automation Scripts',
      'Modular Functions & Error Handling',
      'Algorithmic Problem Solving in Python',
    ],
    engineeringPractices: [
      'Readable, well-documented Python code following PEP-8 conventions',
      'Modular class and function design for reusable utilities',
      'Clear step-by-step logic ideal for both production scripts and teaching',
    ],
    benchmarkMetric: {
      value: 'Certified',
      label: 'PITP Python Developer',
      context: 'Awarded by IBA Sukkur & Government of Sindh (Peoples IT Programme)',
    },
    sampleArchitectureCode: `# PITP Certified Python Developer — Clean OOP Pattern
class CourseModule:
    def __init__(self, title: str, mentor: str = "Zubair Ali"):
        self.title = title
        self.mentor = mentor`,
  },
  {
    id: 'speaking-debate-tutoring',
    index: '03',
    title: 'Public Speaking, Debating & Tutoring',
    subtitle: 'Provincial-Level Speaker · Competition Winner · Academic Tutor',
    description:
      'Accomplished Provincial-Level Public Speaker and Competition-Winning Debater, combining persuasive communication with dedicated tutoring in programming and academics.',
    coreTechnologies: [
      'Provincial-Level Public Speaking',
      'Competitive Debating & Argumentation',
      'Declamation & Oratory Championship Winner',
      '1-on-1 & Group Academic Tutoring',
      'Python & Web Development Mentorship',
      'Technical Presentation & Stage Confidence',
    ],
    engineeringPractices: [
      'Breaking down complex technical concepts into clear, relatable lessons',
      'Structuring persuasive, evidence-backed arguments on provincial stages',
      'Guiding students with structured exercises and constructive feedback',
    ],
    benchmarkMetric: {
      value: 'Winner',
      label: 'Provincial Debate & Oratory',
      context: 'Recognized across provincial-level speaking competitions & student mentorship',
    },
    sampleArchitectureCode: `// Communication & Mentorship Pillar
const mentorshipApproach = [
  "1. Clarify core fundamentals with real examples",
  "2. Practice hands-on coding & critical thinking",
  "3. Build confidence in presentation & articulation",
];`,
  },
];

export const ACADEMIC_TIMELINE: AcademicMilestone[] = [
  {
    id: 'quest-se-degree',
    period: 'Present',
    role: 'Bachelor of Software Engineering Student',
    institution: 'Quaid-e-Awam University of Engineering, Science & Technology (QUEST)',
    location: 'Nawabshah, Sindh, Pakistan',
    summary:
      'Pursuing undergraduate studies in Software Engineering at QUEST Nawabshah, focusing on software development, programming fundamentals, and modern web technologies.',
    highlights: [
      'Building practical web and Python projects alongside core Software Engineering coursework',
      'Actively participating in university literary, debating, and technical societies',
      'Collaborating with fellow software engineering students on academic and coding initiatives',
    ],
    courseworkOrFocus: [
      'Software Engineering',
      'Web Development',
      'Python Programming',
      'Object-Oriented Programming',
    ],
  },
  {
    id: 'pitp-iba-sukkur-gos',
    period: 'Certified',
    role: 'Certified Web Developer & Certified Python Developer',
    institution: 'Peoples Information Technology Programme (PITP) — IBA Sukkur & Govt. of Sindh (GoS)',
    location: 'Sindh, Pakistan',
    summary:
      'Successfully completed intensive hands-on technical certifications under the Peoples Information Technology Programme (PITP), an initiative by IBA Sukkur and the Government of Sindh.',
    highlights: [
      'Certified Web Developer — Mastered responsive web design, modern frontend interfaces, and interactive web development',
      'Certified Python Developer — Mastered core Python programming, object-oriented design, scripting, and problem solving',
      'Applied certified skills to build responsive web portfolios, student tools, and Python utilities',
    ],
    courseworkOrFocus: [
      'PITP by IBA Sukkur & GoS',
      'Certified Web Developer',
      'Certified Python Developer',
      'Practical Project Assessments',
    ],
  },
  {
    id: 'public-speaking-tutor',
    period: 'Provincial & Mentorship',
    role: 'Provincial-Level Public Speaker, Competition-Winning Debater & Tutor',
    institution: 'Provincial Oratory Championships & Academic Tutoring',
    location: 'Sindh, Pakistan',
    summary:
      'Extensive track record representing at the provincial level in public speaking and debating competitions with multiple competition victories, while serving as a dedicated Tutor for students.',
    highlights: [
      'Competition Winner in Provincial-Level Public Speaking and Debating contests',
      'Experienced Debater skilled in critical thinking, structured rebuttal, and stage presence',
      'Dedicated Tutor mentoring students in programming (Python & Web) and academic subjects with clear, engaging instruction',
    ],
    courseworkOrFocus: [
      'Provincial Public Speaking',
      'Debate Competition Winner',
      'Academic & Programming Tutor',
      'Student Mentorship',
    ],
  },
];
