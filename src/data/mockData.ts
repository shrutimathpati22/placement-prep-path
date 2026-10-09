import {
  Company,
  Notice,
  AptitudeQuestion,
  CodingQuestion,
  TechnicalTopic,
  HRQuestion,
  Application,
  UserProfile,
  LearningPath,
  RoadmapStageGroup,
  QuizAttempt,
  RecommendedActivity,
} from '../types';

export const initialStudentUser: UserProfile = {
  id: 'usr-student-01',
  name: 'Aryan Sharma',
  email: 'aryan.sharma@apex.edu',
  rollNumber: '21BCSE042',
  college: 'Apex Institute of Technology',
  branch: 'Computer Science & Engineering',
  yearOfStudy: '3rd Year',
  cgpa: 8.65,
  graduationYear: 2027,
  role: 'student',
  targetCompanyTier: 'Super Dream',
  phone: '+91 98765 43210',
  activeBacklogs: 0,
  streakDays: 7,
  completedLessonsCount: 38,
  totalStudyHours: 54,
};

export const initialCoordinatorUser: UserProfile = {
  id: 'usr-coordinator-01',
  name: 'Prof. K. Verma',
  email: 'tpo.verma@apex.edu',
  rollNumber: 'FAC-TPO-09',
  college: 'Apex Institute of Technology',
  branch: 'Training & Placement Office',
  yearOfStudy: '4th Year',
  cgpa: 10.0,
  graduationYear: 2012,
  role: 'coordinator',
  targetCompanyTier: 'Super Dream',
  phone: '+91 98111 22334',
  activeBacklogs: 0,
  streakDays: 30,
  completedLessonsCount: 120,
  totalStudyHours: 210,
};

export const initialLearningPaths: LearningPath[] = [
  {
    id: 'path-01',
    title: 'Aptitude Preparation',
    slug: 'aptitude-preparation',
    category: 'Aptitude Preparation',
    description:
      'Master quantitative shortcuts, logical deduction puzzles, and verbal comprehension required for all campus screening tests.',
    difficulty: 'Beginner',
    estimatedDuration: '18 Hours',
    totalLessons: 24,
    completedLessons: 18,
    iconName: 'BrainCircuit',
    color: 'blue',
    modules: [
      {
        id: 'mod-apt-1',
        title: 'Quantitative Ability & Speed Math',
        lessons: [
          {
            id: 'les-apt-1',
            title: 'Time, Speed and Distance Shortcuts',
            durationMinutes: 40,
            completed: true,
            summary:
              'Formulas for relative velocity, trains crossing platforms, and average speed shortcuts using harmonic mean.',
          },
          {
            id: 'les-apt-2',
            title: 'Work & Pipes and Cisterns',
            durationMinutes: 45,
            completed: true,
            summary:
              'Unitary method versus LCM approach to solve multi-worker rate problems in under 60 seconds.',
          },
          {
            id: 'les-apt-3',
            title: 'Percentages, Profit & Loss Equations',
            durationMinutes: 35,
            completed: true,
            summary:
              'Marked price vs Cost price multipliers and successive discount calculation matrices.',
          },
          {
            id: 'les-apt-4',
            title: 'Permutations, Combinations & Probability',
            durationMinutes: 50,
            completed: false,
            summary:
              'Circular arrangements, conditioned selections, and dice/card conditional probabilities.',
          },
        ],
      },
      {
        id: 'mod-apt-2',
        title: 'Logical Reasoning & Analytical Puzzles',
        lessons: [
          {
            id: 'les-apt-5',
            title: 'Blood Relations & Family Trees',
            durationMinutes: 30,
            completed: true,
            summary:
              'Generational symbol charts and indirect referencing statements decoded step-by-step.',
          },
          {
            id: 'les-apt-6',
            title: 'Linear & Circular Seating Arrangements',
            durationMinutes: 45,
            completed: false,
            summary:
              'Facing inward vs outward constraints and handling multiple conditional exclusions.',
          },
          {
            id: 'les-apt-7',
            title: 'Syllogisms & Venn Logic Rules',
            durationMinutes: 35,
            completed: true,
            summary:
              'Universal affirmative vs particular negative statements and elimination of fallacy conclusions.',
          },
        ],
      },
    ],
  },
  {
    id: 'path-02',
    title: 'Data Structures and Algorithms',
    slug: 'dsa',
    category: 'Data Structures and Algorithms',
    description:
      'From arrays and recursion to trees, graphs, and dynamic programming with step-by-step Big-O complexity analysis.',
    difficulty: 'Intermediate',
    estimatedDuration: '45 Hours',
    totalLessons: 40,
    completedLessons: 24,
    iconName: 'Binary',
    color: 'indigo',
    modules: [
      {
        id: 'mod-dsa-1',
        title: 'Core Linear Structures & Pointers',
        lessons: [
          {
            id: 'les-dsa-1',
            title: 'Two Pointers & Sliding Window Patterns',
            durationMinutes: 60,
            completed: true,
            summary:
              'Optimal O(N) array traversals for subarray sums, palindromes, and container water trapping.',
          },
          {
            id: 'les-dsa-2',
            title: 'Fast & Slow Pointer Techniques in Linked Lists',
            durationMinutes: 45,
            completed: true,
            summary:
              'Cycle detection via Floyd algorithm and middle node discovery without extra space.',
          },
          {
            id: 'les-dsa-3',
            title: 'Monotonic Stacks & Queues',
            durationMinutes: 50,
            completed: true,
            summary:
              'Next greater element, largest rectangle in histogram, and stock span solutions.',
          },
        ],
      },
      {
        id: 'mod-dsa-2',
        title: 'Non-Linear Structures: Trees & Graphs',
        lessons: [
          {
            id: 'les-dsa-4',
            title: 'Binary Tree Traversals & Depth First Search',
            durationMinutes: 65,
            completed: true,
            summary:
              'Inorder, preorder, postorder traversals iteratively and recursively with call-stack memory analysis.',
          },
          {
            id: 'les-dsa-5',
            title: 'Graph BFS & Topological Sorting',
            durationMinutes: 70,
            completed: false,
            summary:
              'Kahn\'s algorithm and cycle detection in directed acyclic graphs (DAGs) for build systems.',
          },
          {
            id: 'les-dsa-6',
            title: 'Dijkstra & Minimum Spanning Trees',
            durationMinutes: 75,
            completed: false,
            summary:
              'Priority queue implementations for shortest path finding and network routing.',
          },
        ],
      },
    ],
  },
  {
    id: 'path-03',
    title: 'Programming Fundamentals',
    slug: 'programming-fundamentals',
    category: 'Programming Fundamentals',
    description:
      'Deep dive into language syntax, pointers, memory model (Stack vs Heap), and object-oriented architectures in C++ / Java / Python.',
    difficulty: 'Beginner',
    estimatedDuration: '22 Hours',
    totalLessons: 26,
    completedLessons: 20,
    iconName: 'Code',
    color: 'emerald',
    modules: [
      {
        id: 'mod-pf-1',
        title: 'Memory Architecture & Pointers',
        lessons: [
          {
            id: 'les-pf-1',
            title: 'Stack vs Heap Allocation and Garbage Collection',
            durationMinutes: 45,
            completed: true,
            summary:
              'Stack frames, heap fragmentation, dangling references, and automatic memory cleanup.',
          },
          {
            id: 'les-pf-2',
            title: 'Pass by Value vs Pass by Reference',
            durationMinutes: 40,
            completed: true,
            summary:
              'Memory implications when passing objects and primitives across function boundaries.',
          },
        ],
      },
      {
        id: 'mod-pf-2',
        title: 'Object-Oriented Design Paradigms',
        lessons: [
          {
            id: 'les-pf-3',
            title: 'Polymorphism: Virtual Functions & VTables',
            durationMinutes: 50,
            completed: true,
            summary:
              'How compilers resolve runtime method dispatches using virtual method tables.',
          },
          {
            id: 'les-pf-4',
            title: 'SOLID Principles in Clean Code',
            durationMinutes: 55,
            completed: false,
            summary:
              'Single responsibility, open-closed, and dependency inversion demonstrated with real code.',
          },
        ],
      },
    ],
  },
  {
    id: 'path-04',
    title: 'Technical Interview Preparation',
    slug: 'technical-interview-prep',
    category: 'Technical Interview Preparation',
    description:
      'High-yield computer science fundamentals: DBMS indexing & ACID, Operating Systems scheduling & deadlocks, Computer Networks.',
    difficulty: 'Intermediate',
    estimatedDuration: '28 Hours',
    totalLessons: 30,
    completedLessons: 18,
    iconName: 'Server',
    color: 'cyan',
    modules: [
      {
        id: 'mod-tech-1',
        title: 'Database Management Systems (DBMS)',
        lessons: [
          {
            id: 'les-tech-1',
            title: 'ACID Properties and Isolation Anomalies',
            durationMinutes: 50,
            completed: true,
            summary:
              'Dirty reads, non-repeatable reads, phantom reads and MVCC concurrency controls.',
          },
          {
            id: 'les-tech-2',
            title: 'B+ Tree Indexing & Query Execution Plans',
            durationMinutes: 60,
            completed: true,
            summary:
              'Clustered versus secondary indexes, composite keys, and optimizing slow SQL queries.',
          },
        ],
      },
      {
        id: 'mod-tech-2',
        title: 'Operating Systems & Concurrency',
        lessons: [
          {
            id: 'les-tech-3',
            title: 'Processes, Threads, and CPU Scheduling',
            durationMinutes: 55,
            completed: true,
            summary:
              'PCB structures, context switching overheads, and Round Robin vs CFS schedulers.',
          },
          {
            id: 'les-tech-4',
            title: 'Deadlock Detection & Banker\'s Algorithm',
            durationMinutes: 45,
            completed: false,
            summary:
              'Coffman\'s 4 conditions and resource allocation graphs for safe state transitions.',
          },
        ],
      },
    ],
  },
  {
    id: 'path-05',
    title: 'HR Interview Preparation',
    slug: 'hr-interview-prep',
    category: 'HR Interview Preparation',
    description:
      'Ace behavioral rounds with the STAR method framework, leadership storytelling, salary discussion etiquette, and cultural fitment.',
    difficulty: 'Beginner',
    estimatedDuration: '10 Hours',
    totalLessons: 14,
    completedLessons: 10,
    iconName: 'UserCheck',
    color: 'rose',
    modules: [
      {
        id: 'mod-hr-1',
        title: 'Behavioral Frameworks',
        lessons: [
          {
            id: 'les-hr-1',
            title: 'The STAR Method Blueprint',
            durationMinutes: 40,
            completed: true,
            summary:
              'Structuring Situation, Task, Action, and Measurable Result with real project examples.',
          },
          {
            id: 'les-hr-2',
            title: 'Answering Conflict & Team Failure Questions',
            durationMinutes: 45,
            completed: true,
            summary:
              'De-escalating friction without throwing team members under the bus.',
          },
        ],
      },
      {
        id: 'mod-hr-2',
        title: 'Company Fit & Personal Pitch',
        lessons: [
          {
            id: 'les-hr-3',
            title: 'The 90-Second Professional Elevator Pitch',
            durationMinutes: 35,
            completed: true,
            summary:
              'Present, past accomplishments, and future alignment crafted with natural delivery.',
          },
          {
            id: 'les-hr-4',
            title: 'Smart Questions to Ask the Interviewer',
            durationMinutes: 30,
            completed: false,
            summary:
              'Stand out by asking thoughtful questions about engineering culture and tech roadmaps.',
          },
        ],
      },
    ],
  },
  {
    id: 'path-06',
    title: 'Communication Skills',
    slug: 'communication-skills',
    category: 'Communication Skills',
    description:
      'Master Group Discussion (GD) entry techniques, technical presentation pitching, professional email writing, and active listening.',
    difficulty: 'Beginner',
    estimatedDuration: '12 Hours',
    totalLessons: 16,
    completedLessons: 12,
    iconName: 'MessageSquare',
    color: 'amber',
    modules: [
      {
        id: 'mod-comm-1',
        title: 'Group Discussion (GD) Strategy',
        lessons: [
          {
            id: 'les-comm-1',
            title: 'Entering a Heated GD Discussion Politely',
            durationMinutes: 35,
            completed: true,
            summary:
              'Key transition phrases to steer the group back onto track and demonstrate leadership.',
          },
          {
            id: 'les-comm-2',
            title: 'Structuring Points: The PESTLE Framework',
            durationMinutes: 40,
            completed: true,
            summary:
              'Analyzing abstract and current-affairs topics from Political, Economic, Social, and Tech angles.',
          },
        ],
      },
      {
        id: 'mod-comm-2',
        title: 'Technical Articulation',
        lessons: [
          {
            id: 'les-comm-3',
            title: 'Thinking Out Loud During Live Whiteboard Coding',
            durationMinutes: 45,
            completed: true,
            summary:
              'Communicating your thought process clearly before writing code in front of interviewers.',
          },
        ],
      },
    ],
  },
];

export const roadmapStages: RoadmapStageGroup[] = [
  {
    stage: 'Beginner',
    stageTitle: 'Foundation Stage (1st & 2nd Year)',
    targetAudience: 'Early College Students',
    description:
      'Build rock-solid problem solving habits, master one programming language deeply, and understand core mathematical aptitude.',
    milestones: [
      {
        id: 'mile-beg-1',
        title: 'Pick & Master One Language (C++ or Java or Python)',
        description:
          'Learn syntax, STL / Collections, pointer arithmetic, memory allocation, and basic OOP principles.',
        category: 'Programming',
        priority: 'Essential',
        completed: true,
        recommendedTimeline: 'Semester 1-2',
      },
      {
        id: 'mile-beg-2',
        title: 'Quantitative & Logical Aptitude Basics',
        description:
          'Complete standard drills on Time & Work, Speed, Ratio, Percentages, and Syllogisms.',
        category: 'Aptitude',
        priority: 'Essential',
        completed: true,
        recommendedTimeline: 'Semester 2-3',
      },
      {
        id: 'mile-beg-3',
        title: 'Linear Data Structures Foundations',
        description:
          'Implement Arrays, Linked Lists, Stacks, and Queues from scratch without using built-in libraries.',
        category: 'DSA',
        priority: 'High',
        completed: true,
        recommendedTimeline: 'Semester 3',
      },
      {
        id: 'mile-beg-4',
        title: 'Build First GitHub Portfolio Project',
        description:
          'Create a working full-stack or CLI tool with a clear README, git commit history, and deployment.',
        category: 'Projects',
        priority: 'Recommended',
        completed: true,
        recommendedTimeline: 'Semester 3-4',
      },
    ],
  },
  {
    stage: 'Intermediate',
    stageTitle: 'Core Mastery Stage (3rd Year)',
    targetAudience: 'Pre-Final Year Students',
    description:
      'Crack medium LeetCode patterns, master CS fundamentals (DBMS, OS, Networks), and prepare for summer internship drives.',
    milestones: [
      {
        id: 'mile-int-1',
        title: 'Solve 150+ LeetCode DSA Problems (Medium Focus)',
        description:
          'Practice Sliding Window, Two Pointers, Trees, BFS/DFS, and Top 20 Dynamic Programming patterns.',
        category: 'DSA',
        priority: 'Essential',
        completed: true,
        recommendedTimeline: 'Semester 5',
      },
      {
        id: 'mile-int-2',
        title: 'Core CS Subjects Revision (DBMS, OS, CN)',
        description:
          'Revise ACID properties, indexing, process scheduling, deadlocks, and TCP/IP 3-way handshake.',
        category: 'Core CS',
        priority: 'Essential',
        completed: true,
        recommendedTimeline: 'Semester 5-6',
      },
      {
        id: 'mile-int-3',
        title: 'Draft Industry-Standard One-Page Resume',
        description:
          'Adopt the Jake\'s / Harvard ATS format with quantifiable bullet points (XYZ formula: Accomplished [X] measured by [Y] by doing [Z]).',
        category: 'Career Prep',
        priority: 'High',
        completed: true,
        recommendedTimeline: 'Semester 6',
      },
      {
        id: 'mile-int-4',
        title: 'Participate in Mock Tests & Coding Contests',
        description:
          'Compete in weekly LeetCode / Codeforces contests to build speed under strict time pressure.',
        category: 'Contests',
        priority: 'Recommended',
        completed: false,
        recommendedTimeline: 'Semester 6',
      },
    ],
  },
  {
    stage: 'Advanced',
    stageTitle: 'Campus Drive Sprint (Final Year / 7th Sem)',
    targetAudience: 'Placement Season Candidates',
    description:
      'Final rehearsal with company-specific test series, system design overviews, behavioral STAR practice, and drive tracking.',
    milestones: [
      {
        id: 'mile-adv-1',
        title: 'Company-Specific Past Question Papers',
        description:
          'Solve previous test papers for target recruiters (Google, Microsoft, Goldman Sachs, TCS Digital).',
        category: 'Company Prep',
        priority: 'Essential',
        completed: true,
        recommendedTimeline: 'Pre-Placement Month',
      },
      {
        id: 'mile-adv-2',
        title: 'Low Level Design (LLD) & Object-Oriented Design',
        description:
          'Design an Elevator System, Parking Lot, or LRU Cache applying SOLID design patterns.',
        category: 'System Design',
        priority: 'High',
        completed: false,
        recommendedTimeline: 'Drive Season',
      },
      {
        id: 'mile-adv-3',
        title: 'Behavioral & HR STAR Method Rehearsals',
        description:
          'Prepare 5 versatile project stories covering leadership, technical roadblocks, conflict, and tight deadlines.',
        category: 'HR Interview',
        priority: 'Essential',
        completed: false,
        recommendedTimeline: 'Interview Week',
      },
      {
        id: 'mile-adv-4',
        title: 'Maintain Placement Application Tracker',
        description:
          'Log test links, interview rounds, interviewer remarks, and follow-ups on the Kanban board.',
        category: 'Tracking',
        priority: 'Essential',
        completed: true,
        recommendedTimeline: 'Continuous',
      },
    ],
  },
];

export const initialQuizAttempts: QuizAttempt[] = [
  {
    id: 'att-01',
    title: 'Quantitative Speed Drill #1',
    category: 'Quantitative',
    score: 8,
    totalQuestions: 10,
    percentage: 80,
    passed: true,
    date: '2026-10-06',
    timeSpentSeconds: 420,
  },
  {
    id: 'att-02',
    title: 'Logical Deduction Assessment',
    category: 'Logical Reasoning',
    score: 9,
    totalQuestions: 10,
    percentage: 90,
    passed: true,
    date: '2026-10-04',
    timeSpentSeconds: 380,
  },
  {
    id: 'att-03',
    title: 'DBMS ACID & Indexing Quiz',
    category: 'Technical CS',
    score: 7,
    totalQuestions: 10,
    percentage: 70,
    passed: true,
    date: '2026-09-29',
    timeSpentSeconds: 490,
  },
  {
    id: 'att-04',
    title: 'Verbal Ability & Grammar Mock',
    category: 'Verbal Ability',
    score: 6,
    totalQuestions: 10,
    percentage: 60,
    passed: true,
    date: '2026-09-22',
    timeSpentSeconds: 320,
  },
];

export const recommendedActivities: RecommendedActivity[] = [
  {
    id: 'rec-1',
    title: 'Complete "Binary Tree Traversals" in DSA Path',
    pathSlug: 'dsa',
    category: 'DSA',
    durationMinutes: 25,
    priority: 'High',
    type: 'learning',
  },
  {
    id: 'rec-2',
    title: 'Take the 10-Question Quantitative Mock Quiz',
    category: 'Aptitude',
    durationMinutes: 15,
    priority: 'High',
    type: 'quiz',
  },
  {
    id: 'rec-3',
    title: 'Review Deadlocks & Coffman Conditions in CS Core',
    pathSlug: 'technical-interview-prep',
    category: 'Operating Systems',
    durationMinutes: 20,
    priority: 'Medium',
    type: 'learning',
  },
  {
    id: 'rec-4',
    title: 'Mark Off Milestone: Draft Industry ATS Resume',
    category: 'Roadmap',
    durationMinutes: 30,
    priority: 'High',
    type: 'roadmap',
  },
];

// Re-export other existing mock data
export {
  initialCompanies,
  initialNotices,
  initialApplications,
  aptitudeQuestions,
  codingQuestions,
  technicalTopics,
  hrQuestions,
} from './mockDataLegacy';
