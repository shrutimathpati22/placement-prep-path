export type TierType = 'Super Dream' | 'Dream' | 'Core' | 'Mass';

export interface Company {
  id: string;
  name: string;
  logoUrl?: string;
  tier: TierType;
  jobRole: string;
  ctc: string;
  baseCtc?: string;
  stipend?: string;
  location: string;
  eligibility: {
    minCgpa: number;
    allowedBranches: string[];
    maxBacklogs: number;
    batch: string;
  };
  requiredSkills: string[];
  applicationDeadline: string;
  driveDate: string;
  selectionRounds: string[];
  description: string;
  bondDetails?: string;
  pastInterviewQuestions?: string[];
  website?: string;
}

export type ApplicationStage =
  | 'Applied'
  | 'OA Round'
  | 'Technical Round'
  | 'HR Round'
  | 'Offer Received'
  | 'Not Selected';

export interface Application {
  id: string;
  companyId: string;
  companyName: string;
  jobRole: string;
  appliedDate: string;
  stage: ApplicationStage;
  packageOffered?: string;
  nextRoundDate?: string;
  notes?: string;
  location?: string;
}

export type NoticeCategory = 'Drive Alert' | 'Policy' | 'Workshop' | 'Schedule Change';

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  urgent: boolean;
  author: string;
  category: NoticeCategory;
}

export interface AptitudeQuestion {
  id: string;
  topic: 'Quantitative' | 'Logical Reasoning' | 'Verbal Ability';
  subtopic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface CodingTestCase {
  input: string;
  expected: string;
}

export interface CodingQuestion {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  companyTags: string[];
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: {
    cpp: string;
    java: string;
    python: string;
  };
  solutionCode: {
    cpp: string;
    java: string;
    python: string;
  };
  testCases: CodingTestCase[];
}

export interface TechnicalTopic {
  id: string;
  subject: 'DBMS' | 'Operating Systems' | 'Computer Networks' | 'OOP' | 'System Design';
  title: string;
  summary: string;
  keyPoints: string[];
  sampleQnA: {
    question: string;
    answer: string;
  }[];
}

export interface HRQuestion {
  id: string;
  category: 'Self Introduction' | 'Behavioral' | 'Situational' | 'Culture & Goals';
  question: string;
  framework: string;
  sampleAnswer: string;
  doAndDonts: {
    dos: string[];
    donts: string[];
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  college: string;
  branch: string;
  yearOfStudy: '1st Year' | '2nd Year' | '3rd Year' | '4th Year';
  cgpa: number;
  graduationYear: number;
  role: 'student' | 'coordinator';
  targetCompanyTier: TierType;
  phone?: string;
  activeBacklogs: number;
  streakDays: number;
  completedLessonsCount: number;
  totalStudyHours: number;
}

// Learning Paths Types
export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  completed: boolean;
  summary: string;
  keyPoints?: string[];
}

export interface LearningModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface LearningPath {
  id: string;
  title: string;
  slug: string;
  category:
    | 'Aptitude Preparation'
    | 'Data Structures and Algorithms'
    | 'Programming Fundamentals'
    | 'Technical Interview Preparation'
    | 'HR Interview Preparation'
    | 'Communication Skills';
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedDuration: string;
  totalLessons: number;
  completedLessons: number;
  iconName: string;
  color: string;
  modules: LearningModule[];
}

// Roadmap Types
export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'Essential' | 'High' | 'Recommended';
  completed: boolean;
  recommendedTimeline: string;
}

export interface RoadmapStageGroup {
  stage: 'Beginner' | 'Intermediate' | 'Advanced';
  stageTitle: string;
  targetAudience: string;
  description: string;
  milestones: RoadmapMilestone[];
}

// Quiz & Practice Attempt Types
export interface QuizAttempt {
  id: string;
  title: string;
  category: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  date: string;
  timeSpentSeconds: number;
}

// Recommended Activity
export interface RecommendedActivity {
  id: string;
  title: string;
  pathSlug?: string;
  category: string;
  durationMinutes: number;
  priority: 'High' | 'Medium';
  type: 'learning' | 'quiz' | 'coding' | 'roadmap';
}
