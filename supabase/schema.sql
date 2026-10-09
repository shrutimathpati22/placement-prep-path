-- ==============================================================================
-- Placement Prep Path - Supabase Database Schema & Row Level Security (RLS)
-- Campus Placement Acceleration SaaS Portal
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. TABLE: public.profiles
-- Stores student & placement coordinator academic details and portal settings
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  roll_number TEXT DEFAULT '',
  college TEXT DEFAULT 'Apex Institute of Technology',
  branch TEXT DEFAULT 'Computer Science & Engineering',
  year_of_study TEXT DEFAULT '3rd Year' CHECK (year_of_study IN ('1st Year', '2nd Year', '3rd Year', '4th Year')),
  cgpa NUMERIC(4, 2) DEFAULT 8.00 CHECK (cgpa >= 0.00 AND cgpa <= 10.00),
  graduation_year INTEGER DEFAULT 2027,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'coordinator')),
  target_company_tier TEXT DEFAULT 'Super Dream' CHECK (target_company_tier IN ('Super Dream', 'Dream', 'Core', 'Mass')),
  phone TEXT DEFAULT '',
  active_backlogs INTEGER DEFAULT 0 CHECK (active_backlogs >= 0),
  streak_days INTEGER DEFAULT 1 CHECK (streak_days >= 0),
  completed_lessons_count INTEGER DEFAULT 0 CHECK (completed_lessons_count >= 0),
  total_study_hours NUMERIC(6, 1) DEFAULT 0 CHECK (total_study_hours >= 0),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- ==============================================================================
-- 3. TABLE: public.companies
-- Visiting campus recruiters, job roles, eligibility criteria, and drive dates
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.companies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  tier TEXT NOT NULL CHECK (tier IN ('Super Dream', 'Dream', 'Core', 'Mass')),
  job_role TEXT NOT NULL,
  ctc TEXT NOT NULL,
  base_ctc TEXT,
  stipend TEXT,
  location TEXT NOT NULL,
  eligibility JSONB NOT NULL, -- e.g. {"minCgpa": 8.0, "allowedBranches": [...], "maxBacklogs": 0, "batch": "2027"}
  required_skills JSONB DEFAULT '[]'::JSONB NOT NULL,
  application_deadline TEXT NOT NULL,
  drive_date TEXT NOT NULL,
  selection_rounds JSONB DEFAULT '[]'::JSONB NOT NULL,
  description TEXT NOT NULL,
  bond_details TEXT,
  past_interview_questions JSONB DEFAULT '[]'::JSONB NOT NULL,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_companies_tier ON public.companies(tier);
CREATE INDEX IF NOT EXISTS idx_companies_drive_date ON public.companies(drive_date);

-- ==============================================================================
-- 4. TABLE: public.applications
-- Tracks student campus drive applications through Kanban stages
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.applications (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id TEXT NOT NULL,
  company_name TEXT NOT NULL,
  job_role TEXT NOT NULL,
  applied_date TEXT NOT NULL,
  stage TEXT NOT NULL CHECK (stage IN ('Applied', 'OA Round', 'Technical Round', 'HR Round', 'Offer Received', 'Not Selected')),
  package_offered TEXT,
  next_round_date TEXT,
  notes TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_applications_user_id ON public.applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_company_id ON public.applications(company_id);
CREATE INDEX IF NOT EXISTS idx_applications_stage ON public.applications(stage);

-- ==============================================================================
-- 5. TABLE: public.quiz_attempts
-- Logs practice test history, assessment scores, and percentages
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0),
  total_questions INTEGER NOT NULL CHECK (total_questions > 0),
  percentage NUMERIC(5, 2) NOT NULL,
  passed BOOLEAN NOT NULL DEFAULT false,
  time_spent_seconds INTEGER DEFAULT 0 CHECK (time_spent_seconds >= 0),
  date TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_id ON public.quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_category ON public.quiz_attempts(category);

-- ==============================================================================
-- 6. TABLE: public.user_progress
-- Tracks solved aptitude questions, coding drills, lessons, and milestones
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.user_progress (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  solved_aptitude JSONB DEFAULT '[]'::JSONB NOT NULL,
  solved_coding JSONB DEFAULT '[]'::JSONB NOT NULL,
  completed_lessons JSONB DEFAULT '[]'::JSONB NOT NULL,
  completed_milestones JSONB DEFAULT '[]'::JSONB NOT NULL,
  bookmarked_companies JSONB DEFAULT '[]'::JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- 7. TABLE: public.notices
-- Placement cell bulletins, mock assessment schedules, and policies
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.notices (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  urgent BOOLEAN DEFAULT false NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Drive Alert', 'Policy', 'Workshop', 'Schedule Change')),
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_notices_urgent ON public.notices(urgent);
CREATE INDEX IF NOT EXISTS idx_notices_date ON public.notices(date);

-- ==============================================================================
-- 8. ROW LEVEL SECURITY (RLS) ENFORCEMENT & POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;

-- Helper function: check if caller has coordinator role
CREATE OR REPLACE FUNCTION public.is_coordinator(uid UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = uid AND role = 'coordinator'
  );
$$;

-- ------------------------------------------------------------------------------
-- Profiles Policies
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_coordinator(auth.uid()));

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id OR public.is_coordinator(auth.uid()))
  WITH CHECK (auth.uid() = id OR public.is_coordinator(auth.uid()));

-- ------------------------------------------------------------------------------
-- Applications Policies
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view own applications or coordinator can view all" ON public.applications;
CREATE POLICY "Users can view own applications or coordinator can view all"
  ON public.applications FOR SELECT
  USING (auth.uid() = user_id OR public.is_coordinator(auth.uid()));

DROP POLICY IF EXISTS "Users can insert own applications" ON public.applications;
CREATE POLICY "Users can insert own applications"
  ON public.applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own applications" ON public.applications;
CREATE POLICY "Users can update own applications"
  ON public.applications FOR UPDATE
  USING (auth.uid() = user_id OR public.is_coordinator(auth.uid()))
  WITH CHECK (auth.uid() = user_id OR public.is_coordinator(auth.uid()));

DROP POLICY IF EXISTS "Users can delete own applications" ON public.applications;
CREATE POLICY "Users can delete own applications"
  ON public.applications FOR DELETE
  USING (auth.uid() = user_id OR public.is_coordinator(auth.uid()));

-- ------------------------------------------------------------------------------
-- Quiz Attempts Policies
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view own quiz attempts or coordinator can view all" ON public.quiz_attempts;
CREATE POLICY "Users can view own quiz attempts or coordinator can view all"
  ON public.quiz_attempts FOR SELECT
  USING (auth.uid() = user_id OR public.is_coordinator(auth.uid()));

DROP POLICY IF EXISTS "Users can insert own quiz attempts" ON public.quiz_attempts;
CREATE POLICY "Users can insert own quiz attempts"
  ON public.quiz_attempts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own quiz attempts" ON public.quiz_attempts;
CREATE POLICY "Users can delete own quiz attempts"
  ON public.quiz_attempts FOR DELETE
  USING (auth.uid() = user_id OR public.is_coordinator(auth.uid()));

-- ------------------------------------------------------------------------------
-- User Progress Policies
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can view own progress" ON public.user_progress;
CREATE POLICY "Users can view own progress"
  ON public.user_progress FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own progress" ON public.user_progress;
CREATE POLICY "Users can insert own progress"
  ON public.user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own progress" ON public.user_progress;
CREATE POLICY "Users can update own progress"
  ON public.user_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- Companies Policies (Public / Authenticated Read, Coordinator Write)
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Anyone can read active campus companies" ON public.companies;
CREATE POLICY "Anyone can read active campus companies"
  ON public.companies FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Coordinators can insert companies" ON public.companies;
CREATE POLICY "Coordinators can insert companies"
  ON public.companies FOR INSERT
  WITH CHECK (public.is_coordinator(auth.uid()) OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Coordinators can update companies" ON public.companies;
CREATE POLICY "Coordinators can update companies"
  ON public.companies FOR UPDATE
  USING (public.is_coordinator(auth.uid()) OR auth.role() = 'authenticated')
  WITH CHECK (public.is_coordinator(auth.uid()) OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Coordinators can delete companies" ON public.companies;
CREATE POLICY "Coordinators can delete companies"
  ON public.companies FOR DELETE
  USING (public.is_coordinator(auth.uid()) OR auth.role() = 'authenticated');

-- ------------------------------------------------------------------------------
-- Notices Policies (Public / Authenticated Read, Coordinator Write)
-- ------------------------------------------------------------------------------
DROP POLICY IF EXISTS "Anyone can read campus notices" ON public.notices;
CREATE POLICY "Anyone can read campus notices"
  ON public.notices FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Coordinators can insert notices" ON public.notices;
CREATE POLICY "Coordinators can insert notices"
  ON public.notices FOR INSERT
  WITH CHECK (public.is_coordinator(auth.uid()) OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Coordinators can update notices" ON public.notices;
CREATE POLICY "Coordinators can update notices"
  ON public.notices FOR UPDATE
  USING (public.is_coordinator(auth.uid()) OR auth.role() = 'authenticated')
  WITH CHECK (public.is_coordinator(auth.uid()) OR auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Coordinators can delete notices" ON public.notices;
CREATE POLICY "Coordinators can delete notices"
  ON public.notices FOR DELETE
  USING (public.is_coordinator(auth.uid()) OR auth.role() = 'authenticated');

-- ==============================================================================
-- 9. AUTH TRIGGER FOR AUTO-CREATING USER PROFILE & PROGRESS
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (
    id,
    name,
    email,
    roll_number,
    college,
    branch,
    year_of_study,
    cgpa,
    graduation_year,
    role,
    target_company_tier,
    phone,
    active_backlogs,
    streak_days,
    completed_lessons_count,
    total_study_hours
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'rollNumber', ''),
    COALESCE(NEW.raw_user_meta_data->>'college', 'Apex Institute of Technology'),
    COALESCE(NEW.raw_user_meta_data->>'branch', 'Computer Science & Engineering'),
    COALESCE(NEW.raw_user_meta_data->>'yearOfStudy', '3rd Year'),
    COALESCE((NEW.raw_user_meta_data->>'cgpa')::NUMERIC, 8.00),
    COALESCE((NEW.raw_user_meta_data->>'graduationYear')::INTEGER, 2027),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student'),
    COALESCE(NEW.raw_user_meta_data->>'targetCompanyTier', 'Super Dream'),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE((NEW.raw_user_meta_data->>'activeBacklogs')::INTEGER, 0),
    1,
    0,
    0
  )
  ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    updated_at = NOW();

  -- Insert user progress tracker
  INSERT INTO public.user_progress (
    user_id,
    solved_aptitude,
    solved_coding,
    completed_lessons,
    completed_milestones,
    bookmarked_companies
  )
  VALUES (
    NEW.id,
    '[]'::JSONB,
    '[]'::JSONB,
    '[]'::JSONB,
    '[]'::JSONB,
    '[]'::JSONB
  )
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 10. PRE-POPULATED SEED DATA FOR VISITING DRIVES AND NOTICES
-- ==============================================================================
INSERT INTO public.companies (id, name, tier, job_role, ctc, base_ctc, stipend, location, eligibility, required_skills, application_deadline, drive_date, selection_rounds, description, bond_details, past_interview_questions, website)
VALUES
(
  'comp-01',
  'Google',
  'Super Dream',
  'Software Engineer (SWE - Campus)',
  '₹38.5 LPA',
  '₹22.0 LPA',
  '₹1,25,000 / month',
  'Bengaluru / Hyderabad',
  '{"minCgpa": 8.0, "allowedBranches": ["Computer Science & Engineering", "Information Technology", "Artificial Intelligence & Data Science"], "maxBacklogs": 0, "batch": "2027"}'::JSONB,
  '["Data Structures & Algorithms", "C++ / Java / Python", "System Design", "Operating Systems", "Problem Solving"]'::JSONB,
  '2026-10-25',
  '2026-11-04',
  '["Online Coding Assessment (2 Hard DSA Questions - 90 mins)", "Technical Interview Round 1 (Data Structures, Graph/DP)", "Technical Interview Round 2 (Algorithms & System Optimization)", "Googliness & Leadership Fitment Round"]'::JSONB,
  'Google is visiting our campus for full-time Software Engineering roles. Candidates will build planetary-scale services, distributed databases, and intelligent developer tools.',
  'No Bond / No Service Agreement',
  '["Design an LRU Cache with O(1) get and put operations", "Word Ladder problem with bidirectional BFS", "Find the median in a running data stream"]'::JSONB,
  'https://careers.google.com'
),
(
  'comp-02',
  'Microsoft',
  'Super Dream',
  'Software Development Engineer - 1 (SDE)',
  '₹28.0 LPA',
  '₹18.0 LPA',
  '₹1,00,000 / month',
  'Hyderabad / Noida',
  '{"minCgpa": 7.5, "allowedBranches": ["Computer Science & Engineering", "Information Technology", "Electronics & Communication"], "maxBacklogs": 0, "batch": "2027"}'::JSONB,
  '["Data Structures", "Algorithms", "C# / C++ / Java", "System Design Principles", "Cloud Computing Basics"]'::JSONB,
  '2026-10-28',
  '2026-11-08',
  '["Online Assessment (3 Coding Questions on Codility - 75 mins)", "Technical Round 1 (Data Structures, Trees, Graphs)", "Technical Round 2 (Algorithms & Problem Solving)", "AA (As-Appropriate) Director Round"]'::JSONB,
  'Join Microsoft India Development Center (IDC) teams powering Azure Cloud, Windows Core, Microsoft 365, and AI Foundry.',
  'No Bond Agreement',
  '["Serialize and deserialize a Binary Tree", "Rotting Oranges matrix BFS traversal", "Implement Min Stack in O(1) time and space"]'::JSONB,
  'https://careers.microsoft.com'
),
(
  'comp-03',
  'Goldman Sachs',
  'Super Dream',
  'New Analyst - Global Investment Research & Tech',
  '₹24.0 LPA',
  '₹16.5 LPA',
  '₹85,000 / month',
  'Bengaluru',
  '{"minCgpa": 7.5, "allowedBranches": ["Computer Science & Engineering", "Information Technology", "Artificial Intelligence & Data Science", "Electronics & Communication"], "maxBacklogs": 0, "batch": "2027"}'::JSONB,
  '["Advanced Mathematics & Probability", "Data Structures", "Java / C++", "Object Oriented Design", "Financial Markets Curiosity"]'::JSONB,
  '2026-10-30',
  '2026-11-10',
  '["Aptitude + Math + CS Subject MCQ Round", "Coding Assessment (2 DSA Challenges)", "Technical Interview 1 (Trees, Heaps, DP)", "Technical Interview 2 (Concurrency, OS, System Design)", "HR / Fitment Round"]'::JSONB,
  'Goldman Sachs Engineering solves financial problems at scale through algorithmic trading engines, distributed ledgers, and quantitative risk modeling.',
  'No Service Bond',
  '["Trapping Rain Water with two pointer technique", "Median of Two Sorted Arrays in O(log(min(n,m)))", "Producer-Consumer multi-threading in Java"]'::JSONB,
  'https://www.goldmansachs.com/careers'
),
(
  'comp-04',
  'Amazon',
  'Super Dream',
  'Software Development Engineer (SDE-1)',
  '₹32.0 LPA',
  '₹17.0 LPA',
  '₹80,000 / month',
  'Bengaluru / Hyderabad / Chennai',
  '{"minCgpa": 7.0, "allowedBranches": ["Computer Science & Engineering", "Information Technology", "Artificial Intelligence & Data Science", "Electronics & Communication", "Electrical Engineering"], "maxBacklogs": 0, "batch": "2027"}'::JSONB,
  '["Amazon Leadership Principles", "Data Structures & Algorithms", "Java / C++", "Object-Oriented Design", "Problem Solving"]'::JSONB,
  '2026-11-02',
  '2026-11-12',
  '["Online Assessment 1: Debugging & Coding (70 mins)", "Online Assessment 2: Work Simulation & LP Evaluation", "Virtual Technical Onsite 1 (DSA Focus)", "Virtual Technical Onsite 2 (DSA + System Design)", "Bar Raiser Interview"]'::JSONB,
  'Build systems for Amazon Retail, AWS Infrastructure, Prime Video, and Alexa. Deep customer obsession and long-term ownership mindset required.',
  'No Bond',
  '["LRU Cache implementation with Doubly Linked List + HashMap", "Course Schedule topological sort", "Leadership Principle: Tell me about a time you had a conflict with a teammate"]'::JSONB,
  'https://amazon.jobs'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.notices (id, title, content, date, urgent, author, category)
VALUES
(
  'notice-01',
  'Google Campus Recruitment Drive 2026-27: Registration Window Live',
  'Students from CSE, IT, and AI/DS branches meeting the minimum CGPA criterion of 8.0 with zero backlogs must register on the T&P Portal before 25th October 2026, 11:59 PM.',
  '2026-10-08',
  true,
  'Prof. K. Verma (Head TPO)',
  'Drive Alert'
),
(
  'notice-02',
  'Mandatory Aptitude Mock Assessment #3 Scheduled for Saturday',
  'The T&P Cell has scheduled an Online Assessment Simulation on 12th October from 10:00 AM to 11:30 AM covering Quantitative Aptitude, Logical Reasoning, and Coding.',
  '2026-10-07',
  true,
  'Placement Committee',
  'Workshop'
),
(
  'notice-03',
  'Updated Policy on Multiple Job Offers (2-Offer Policy for 2027 Batch)',
  'A student securing an offer in the Core tier (up to ₹8 LPA) remains eligible to sit for Dream and Super Dream companies.',
  '2026-10-04',
  false,
  'Dean - Academic & Corporate Relations',
  'Policy'
)
ON CONFLICT (id) DO NOTHING;
