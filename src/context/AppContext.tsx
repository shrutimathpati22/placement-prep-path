import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  Company,
  Notice,
  Application,
  ApplicationStage,
  LearningPath,
  RoadmapStageGroup,
  QuizAttempt,
  RecommendedActivity,
} from '../types';
import {
  initialStudentUser,
  initialCoordinatorUser,
  initialCompanies,
  initialNotices,
  initialApplications,
  initialLearningPaths,
  roadmapStages as initialRoadmapStages,
  initialQuizAttempts,
  recommendedActivities,
} from '../data/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message?: string;
}

interface AppContextType {
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  updateProfile: (updated: Partial<UserProfile>) => Promise<void>;
  switchUserRole: (role: 'student' | 'coordinator') => void;
  isCloudConnected: boolean;

  // Learning Paths
  learningPaths: LearningPath[];
  toggleLessonCompleted: (pathId: string, moduleId: string, lessonId: string) => void;

  // Placement Roadmap
  roadmap: RoadmapStageGroup[];
  toggleMilestoneCompleted: (stage: 'Beginner' | 'Intermediate' | 'Advanced', milestoneId: string) => void;

  // Quizzes & Attempts
  quizAttempts: QuizAttempt[];
  recordQuizAttempt: (attempt: Omit<QuizAttempt, 'id'>) => void;

  // Companies & Notices
  companies: Company[];
  addCompany: (company: Omit<Company, 'id'>) => void;
  updateCompany: (id: string, updated: Partial<Company>) => void;
  deleteCompany: (id: string) => void;
  notices: Notice[];
  addNotice: (notice: Omit<Notice, 'id'>) => void;
  deleteNotice: (id: string) => void;

  // Applications Tracker
  applications: Application[];
  applyToCompany: (companyId: string) => boolean;
  updateApplicationStage: (id: string, stage: ApplicationStage, notes?: string) => void;
  updateApplication: (id: string, data: Partial<Application>) => void;
  deleteApplication: (id: string) => void;
  addManualApplication: (app: Omit<Application, 'id'>) => void;

  // Solved Drills & Bookmarks
  solvedAptitude: string[];
  markAptitudeSolved: (id: string) => void;
  solvedCoding: string[];
  markCodingSolved: (id: string) => void;
  bookmarkedCompanies: string[];
  toggleBookmarkCompany: (id: string) => void;

  // Recommended Activities
  activities: RecommendedActivity[];

  // Toasts
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;

  // Calculated Metrics
  overallProgressPercent: number;
  readinessScore: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'ppp_current_user_v2',
  PATHS: 'ppp_learning_paths_v2',
  ROADMAP: 'ppp_roadmap_v2',
  ATTEMPTS: 'ppp_quiz_attempts_v2',
  COMPANIES: 'ppp_companies_v2',
  NOTICES: 'ppp_notices_v2',
  APPLICATIONS: 'ppp_applications_v2',
  SOLVED_APTITUDE: 'ppp_solved_aptitude_v2',
  SOLVED_CODING: 'ppp_solved_coding_v2',
  BOOKMARKS: 'ppp_bookmarks_v2',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUserState] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : initialStudentUser;
    } catch {
      return initialStudentUser;
    }
  });

  const [learningPaths, setLearningPaths] = useState<LearningPath[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PATHS);
      return saved ? JSON.parse(saved) : initialLearningPaths;
    } catch {
      return initialLearningPaths;
    }
  });

  const [roadmap, setRoadmap] = useState<RoadmapStageGroup[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ROADMAP);
      return saved ? JSON.parse(saved) : initialRoadmapStages;
    } catch {
      return initialRoadmapStages;
    }
  });

  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
      return saved ? JSON.parse(saved) : initialQuizAttempts;
    } catch {
      return initialQuizAttempts;
    }
  });

  const [companies, setCompanies] = useState<Company[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPANIES);
      return saved ? JSON.parse(saved) : initialCompanies;
    } catch {
      return initialCompanies;
    }
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTICES);
      return saved ? JSON.parse(saved) : initialNotices;
    } catch {
      return initialNotices;
    }
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      return saved ? JSON.parse(saved) : initialApplications;
    } catch {
      return initialApplications;
    }
  });

  const [solvedAptitude, setSolvedAptitude] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SOLVED_APTITUDE);
      return saved ? JSON.parse(saved) : ['apt-01', 'apt-03', 'apt-05'];
    } catch {
      return ['apt-01', 'apt-03', 'apt-05'];
    }
  });

  const [solvedCoding, setSolvedCoding] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SOLVED_CODING);
      return saved ? JSON.parse(saved) : ['code-01', 'code-02'];
    } catch {
      return ['code-01', 'code-02'];
    }
  });

  const [bookmarkedCompanies, setBookmarkedCompanies] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return saved ? JSON.parse(saved) : ['comp-01', 'comp-04'];
    } catch {
      return ['comp-01', 'comp-04'];
    }
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } catch {}
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PATHS, JSON.stringify(learningPaths));
    } catch {}
  }, [learningPaths]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ROADMAP, JSON.stringify(roadmap));
    } catch {}
  }, [roadmap]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(quizAttempts));
    } catch {}
  }, [quizAttempts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMPANIES, JSON.stringify(companies));
    } catch {}
  }, [companies]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTICES, JSON.stringify(notices));
    } catch {}
  }, [notices]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(applications));
    } catch {}
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SOLVED_APTITUDE, JSON.stringify(solvedAptitude));
    } catch {}
  }, [solvedAptitude]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SOLVED_CODING, JSON.stringify(solvedCoding));
    } catch {}
  }, [solvedCoding]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarkedCompanies));
    } catch {}
  }, [bookmarkedCompanies]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setCurrentUser = (user: UserProfile) => {
    setCurrentUserState(user);
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: `Signed in as ${user.name} (${user.role === 'coordinator' ? 'Coordinator' : 'Student'})`,
    });
  };

  const updateProfile = async (updated: Partial<UserProfile>) => {
    const next = { ...currentUser, ...updated };
    setCurrentUserState(next);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('profiles').upsert({
          id: next.id,
          name: next.name,
          college: next.college,
          branch: next.branch,
          year_of_study: next.yearOfStudy,
          cgpa: next.cgpa,
          updated_at: new Date().toISOString(),
        });
      } catch (err) {
        console.warn('Supabase sync skipped, updated locally:', err);
      }
    }

    addToast({
      type: 'success',
      title: 'Profile Saved',
      message: 'Your student details were updated successfully.',
    });
  };

  const switchUserRole = (role: 'student' | 'coordinator') => {
    if (role === 'coordinator') {
      setCurrentUserState(initialCoordinatorUser);
      addToast({
        type: 'info',
        title: 'Switched to Coordinator View',
        message: 'You have full placement administration access.',
      });
    } else {
      setCurrentUserState(initialStudentUser);
      addToast({
        type: 'info',
        title: 'Switched to Student View',
        message: `Welcome back, ${initialStudentUser.name}.`,
      });
    }
  };

  // Learning Paths: Toggle Lesson Complete
  const toggleLessonCompleted = (pathId: string, moduleId: string, lessonId: string) => {
    setLearningPaths((prev) =>
      prev.map((path) => {
        if (path.id !== pathId) return path;

        let completedChange = 0;
        const updatedModules = path.modules.map((mod) => {
          if (mod.id !== moduleId) return mod;
          const updatedLessons = mod.lessons.map((les) => {
            if (les.id === lessonId) {
              const newStatus = !les.completed;
              completedChange = newStatus ? 1 : -1;
              return { ...les, completed: newStatus };
            }
            return les;
          });
          return { ...mod, lessons: updatedLessons };
        });

        const newCompleted = Math.max(
          0,
          Math.min(path.totalLessons, path.completedLessons + completedChange)
        );

        return {
          ...path,
          completedLessons: newCompleted,
          modules: updatedModules,
        };
      })
    );

    setCurrentUserState((prev) => ({
      ...prev,
      completedLessonsCount: prev.completedLessonsCount + 1,
    }));

    addToast({
      type: 'success',
      title: 'Lesson Progress Updated',
      message: 'Your path completion metric has increased!',
    });
  };

  // Roadmap: Toggle Milestone Complete
  const toggleMilestoneCompleted = (
    stage: 'Beginner' | 'Intermediate' | 'Advanced',
    milestoneId: string
  ) => {
    setRoadmap((prev) =>
      prev.map((grp) => {
        if (grp.stage !== stage) return grp;
        return {
          ...grp,
          milestones: grp.milestones.map((m) =>
            m.id === milestoneId ? { ...m, completed: !m.completed } : m
          ),
        };
      })
    );

    addToast({
      type: 'info',
      title: 'Milestone Updated',
      message: 'Placement roadmap status recorded.',
    });
  };

  // Record Quiz Attempt
  const recordQuizAttempt = (attemptData: Omit<QuizAttempt, 'id'>) => {
    const newAttempt: QuizAttempt = {
      ...attemptData,
      id: 'att-' + Date.now().toString(),
    };
    setQuizAttempts((prev) => [newAttempt, ...prev]);

    if (isSupabaseConfigured && supabase) {
      try {
        supabase.from('quiz_attempts').insert({
          user_id: currentUser.id,
          title: newAttempt.title,
          category: newAttempt.category,
          score: newAttempt.score,
          total: newAttempt.totalQuestions,
          passed: newAttempt.passed,
        });
      } catch (err) {
        console.warn('Supabase attempt sync skipped:', err);
      }
    }

    addToast({
      type: newAttempt.passed ? 'success' : 'warning',
      title: newAttempt.passed ? 'Quiz Passed! 🎉' : 'Quiz Completed',
      message: `Score: ${newAttempt.score}/${newAttempt.totalQuestions} (${newAttempt.percentage}%)`,
    });
  };

  // Company and notices CRUD
  const addCompany = (companyData: Omit<Company, 'id'>) => {
    const newComp: Company = { ...companyData, id: 'comp-' + Date.now().toString() };
    setCompanies((prev) => [newComp, ...prev]);
    addToast({
      type: 'success',
      title: 'Drive Published',
      message: `${newComp.name} is now open for registration.`,
    });
  };

  const updateCompany = (id: string, updated: Partial<Company>) => {
    setCompanies((prev) => prev.map((c) => (c.id === id ? { ...c, ...updated } : c)));
    addToast({ type: 'success', title: 'Drive Updated' });
  };

  const deleteCompany = (id: string) => {
    setCompanies((prev) => prev.filter((c) => c.id !== id));
    addToast({ type: 'info', title: 'Drive Delisted' });
  };

  const addNotice = (noticeData: Omit<Notice, 'id'>) => {
    const newNotice: Notice = { ...noticeData, id: 'notice-' + Date.now().toString() };
    setNotices((prev) => [newNotice, ...prev]);
    addToast({ type: 'success', title: 'Notice Posted' });
  };

  const deleteNotice = (id: string) => {
    setNotices((prev) => prev.filter((n) => n.id !== id));
    addToast({ type: 'info', title: 'Notice Removed' });
  };

  // Applications
  const applyToCompany = (companyId: string): boolean => {
    const existing = applications.find((a) => a.companyId === companyId);
    if (existing) {
      addToast({
        type: 'info',
        title: 'Already Registered',
        message: `Current stage: ${existing.stage}`,
      });
      return false;
    }

    const company = companies.find((c) => c.id === companyId);
    if (!company) return false;

    if (currentUser.cgpa < company.eligibility.minCgpa) {
      addToast({
        type: 'error',
        title: 'Cutoff Not Met',
        message: `Min CGPA is ${company.eligibility.minCgpa}. Yours: ${currentUser.cgpa}`,
      });
      return false;
    }

    const newApp: Application = {
      id: 'app-' + Date.now().toString(),
      companyId: company.id,
      companyName: company.name,
      jobRole: company.jobRole,
      appliedDate: new Date().toISOString().split('T')[0],
      stage: 'Applied',
      packageOffered: company.ctc,
      location: company.location,
      notes: `Applied for campus drive. Scheduled for ${company.driveDate}.`,
    };

    setApplications((prev) => [newApp, ...prev]);
    addToast({
      type: 'success',
      title: 'Application Registered!',
      message: `Added ${company.name} to your Placement Tracker.`,
    });
    return true;
  };

  const updateApplicationStage = (id: string, stage: ApplicationStage, notes?: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, stage, ...(notes ? { notes } : {}) } : app))
    );
    addToast({ type: 'success', title: `Moved to ${stage}` });
  };

  const updateApplication = (id: string, data: Partial<Application>) => {
    setApplications((prev) => prev.map((app) => (app.id === id ? { ...app, ...data } : app)));
    addToast({ type: 'success', title: 'Application Updated' });
  };

  const deleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
    addToast({ type: 'info', title: 'Application Removed' });
  };

  const addManualApplication = (appData: Omit<Application, 'id'>) => {
    const newApp: Application = { ...appData, id: 'app-' + Date.now().toString() };
    setApplications((prev) => [newApp, ...prev]);
    addToast({ type: 'success', title: 'Application Logged' });
  };

  const markAptitudeSolved = (id: string) => {
    if (!solvedAptitude.includes(id)) {
      setSolvedAptitude((prev) => [...prev, id]);
      addToast({ type: 'success', title: 'Aptitude Question Solved!' });
    }
  };

  const markCodingSolved = (id: string) => {
    if (!solvedCoding.includes(id)) {
      setSolvedCoding((prev) => [...prev, id]);
      addToast({ type: 'success', title: 'Coding Question Solved!' });
    }
  };

  const toggleBookmarkCompany = (id: string) => {
    if (bookmarkedCompanies.includes(id)) {
      setBookmarkedCompanies((prev) => prev.filter((item) => item !== id));
      addToast({ type: 'info', title: 'Bookmark Removed' });
    } else {
      setBookmarkedCompanies((prev) => [...prev, id]);
      addToast({ type: 'success', title: 'Bookmarked Company' });
    }
  };

  // Overall calculations
  const totalLessons = learningPaths.reduce((acc, p) => acc + p.totalLessons, 0);
  const totalCompletedLessons = learningPaths.reduce((acc, p) => acc + p.completedLessons, 0);
  const overallProgressPercent =
    totalLessons > 0 ? Math.round((totalCompletedLessons / totalLessons) * 100) : 0;

  // Readiness score
  const readinessScore = Math.min(
    98,
    Math.round(
      overallProgressPercent * 0.45 +
        solvedCoding.length * 6 +
        solvedAptitude.length * 3 +
        (currentUser.cgpa >= 8.0 ? 15 : 10)
    )
  );

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        updateProfile,
        switchUserRole,
        isCloudConnected: isSupabaseConfigured,
        learningPaths,
        toggleLessonCompleted,
        roadmap,
        toggleMilestoneCompleted,
        quizAttempts,
        recordQuizAttempt,
        companies,
        addCompany,
        updateCompany,
        deleteCompany,
        notices,
        addNotice,
        deleteNotice,
        applications,
        applyToCompany,
        updateApplicationStage,
        updateApplication,
        deleteApplication,
        addManualApplication,
        solvedAptitude,
        markAptitudeSolved,
        solvedCoding,
        markCodingSolved,
        bookmarkedCompanies,
        toggleBookmarkCompany,
        activities: recommendedActivities,
        toasts,
        addToast,
        removeToast,
        overallProgressPercent,
        readinessScore,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
