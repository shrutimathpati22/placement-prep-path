import {
  Company,
  Notice,
  AptitudeQuestion,
  CodingQuestion,
  TechnicalTopic,
  HRQuestion,
  Application,
} from '../types';

export const initialCompanies: Company[] = [
  {
    id: 'comp-01',
    name: 'Google',
    tier: 'Super Dream',
    jobRole: 'Software Engineer (SWE - Campus)',
    ctc: '₹38.5 LPA',
    baseCtc: '₹22.0 LPA',
    stipend: '₹1,25,000 / month',
    location: 'Bengaluru / Hyderabad',
    eligibility: {
      minCgpa: 8.0,
      allowedBranches: [
        'Computer Science & Engineering',
        'Information Technology',
        'Artificial Intelligence & Data Science',
      ],
      maxBacklogs: 0,
      batch: '2027',
    },
    requiredSkills: [
      'Data Structures & Algorithms',
      'C++ / Java / Python',
      'System Design',
      'Operating Systems',
      'Problem Solving',
    ],
    applicationDeadline: '2026-10-25',
    driveDate: '2026-11-04',
    selectionRounds: [
      'Online Coding Assessment (2 Hard DSA Questions - 90 mins)',
      'Technical Interview Round 1 (Data Structures, Graph/DP)',
      'Technical Interview Round 2 (Algorithms & System Optimization)',
      'Googliness & Leadership Fitment Round',
    ],
    description:
      'Google is visiting our campus for full-time Software Engineering roles. Candidates will build planetary-scale services, distributed databases, and intelligent developer tools.',
    bondDetails: 'No Bond / No Service Agreement',
    pastInterviewQuestions: [
      'Design an LRU Cache with O(1) get and put operations',
      'Word Ladder problem with bidirectional BFS',
      'Find the median in a running data stream',
    ],
    website: 'https://careers.google.com',
  },
  {
    id: 'comp-02',
    name: 'Microsoft',
    tier: 'Super Dream',
    jobRole: 'Software Development Engineer - 1 (SDE)',
    ctc: '₹28.0 LPA',
    baseCtc: '₹18.0 LPA',
    stipend: '₹1,00,000 / month',
    location: 'Hyderabad / Noida / Bengaluru',
    eligibility: {
      minCgpa: 7.5,
      allowedBranches: [
        'Computer Science & Engineering',
        'Information Technology',
        'Electronics & Communication',
        'Artificial Intelligence & Data Science',
      ],
      maxBacklogs: 0,
      batch: '2027',
    },
    requiredSkills: [
      'C# / C++ / Java',
      'Object-Oriented Design',
      'Tree & Graphs',
      'DBMS & SQL',
      'Concurrency',
    ],
    applicationDeadline: '2026-10-28',
    driveDate: '2026-11-08',
    selectionRounds: [
      'Codility Online Assessment (3 Coding Questions)',
      'Technical Round 1 (Trees, Recursion & Code Quality)',
      'Technical Round 2 (Low Level Design & DBMS Internals)',
      'AA (As Appropriate / Bar Raiser) Round',
    ],
    description:
      'Microsoft Azure and Microsoft 365 teams are seeking high-caliber engineers to engineer hyperscale cloud infrastructure and AI integration across enterprise platforms.',
    bondDetails: 'No Bond',
    pastInterviewQuestions: [
      'Lowest Common Ancestor in Binary Tree & BST',
      'Serialize and Deserialize Binary Tree',
      'Implement Thread-safe Singleton in Java or C++',
    ],
    website: 'https://careers.microsoft.com',
  },
  {
    id: 'comp-03',
    name: 'Goldman Sachs',
    tier: 'Super Dream',
    jobRole: 'New Analyst - Global Investment Research & Tech',
    ctc: '₹24.0 LPA',
    baseCtc: '₹17.5 LPA',
    stipend: '₹95,000 / month',
    location: 'Bengaluru',
    eligibility: {
      minCgpa: 7.0,
      allowedBranches: [
        'Computer Science & Engineering',
        'Information Technology',
        'Electronics & Communication',
        'Electrical Engineering',
      ],
      maxBacklogs: 0,
      batch: '2027',
    },
    requiredSkills: [
      'Quantitative Aptitude',
      'Advanced DSA',
      'Operating Systems',
      'Probability & Stats',
      'Java / Python',
    ],
    applicationDeadline: '2026-10-18',
    driveDate: '2026-10-27',
    selectionRounds: [
      'Aptitude + CS Fundamentals + Coding Assessment (HackerRank)',
      'Technical Round 1 (Data Structures, Math & DP)',
      'Technical Round 2 (System Design & Memory Management)',
      'Leadership & Values Interview',
    ],
    description:
      'Goldman Sachs Engineering develops next-generation trading systems, quantitative risk engines, and financial technology infrastructure serving global capital markets.',
    bondDetails: 'No Bond',
    pastInterviewQuestions: [
      'Trapping Rain Water with two pointers',
      'Count set bits in integers up to N in O(log N)',
      'Explain ACID properties and transaction isolation levels in trading systems',
    ],
    website: 'https://www.goldmansachs.com/careers',
  },
  {
    id: 'comp-04',
    name: 'Atlassian',
    tier: 'Super Dream',
    jobRole: 'Associate Software Engineer',
    ctc: '₹32.0 LPA',
    baseCtc: '₹20.0 LPA',
    stipend: '₹1,10,000 / month',
    location: 'Bengaluru / Remote-first',
    eligibility: {
      minCgpa: 8.0,
      allowedBranches: [
        'Computer Science & Engineering',
        'Information Technology',
        'Artificial Intelligence & Data Science',
      ],
      maxBacklogs: 0,
      batch: '2027',
    },
    requiredSkills: [
      'Java / Kotlin',
      'React / TypeScript',
      'Microservices',
      'Distributed Systems',
      'Git & CI/CD',
    ],
    applicationDeadline: '2026-11-02',
    driveDate: '2026-11-12',
    selectionRounds: [
      'HackerRank Test (2 Coding + MCQ on Web/OS)',
      'Technical Craft Round (Pair Programming & Live Debugging)',
      'System Architecture & Design Discussion',
      'Values Interview (Don\'t #@!% the customer)',
    ],
    description:
      'Join the team empowering millions of software engineers around the globe through Jira, Confluence, and Bitbucket.',
    bondDetails: 'No Bond',
    pastInterviewQuestions: [
      'Design rate limiter with token bucket algorithm',
      'Deep copy of graph with visited map',
      'Discussion on why React virtual DOM works',
    ],
    website: 'https://atlassian.com/company/careers',
  },
  {
    id: 'comp-05',
    name: 'Cisco Systems',
    tier: 'Dream',
    jobRole: 'Consulting Engineer / Software Engineer',
    ctc: '₹17.5 LPA',
    baseCtc: '₹13.5 LPA',
    stipend: '₹65,000 / month',
    location: 'Bengaluru',
    eligibility: {
      minCgpa: 7.0,
      allowedBranches: [
        'Computer Science & Engineering',
        'Information Technology',
        'Electronics & Communication',
        'Electrical Engineering',
      ],
      maxBacklogs: 0,
      batch: '2027',
    },
    requiredSkills: [
      'Computer Networks (TCP/IP, Routing)',
      'Python / C',
      'Linux Shell Scripting',
      'OS Fundamentals',
    ],
    applicationDeadline: '2026-11-05',
    driveDate: '2026-11-16',
    selectionRounds: [
      'Online Assessment (Aptitude, Networking MCQs, 2 Coding)',
      'Technical Interview (Subnetting, OSI model, C memory allocation)',
      'Managerial Round',
      'HR Interview',
    ],
    description:
      'Cisco connects people, computing, and cloud systems. Develop high-speed network operating systems and cybersecurity telemetry.',
    bondDetails: 'No Service Bond',
    pastInterviewQuestions: [
      'What happens when you type google.com in the browser?',
      'Detect loop in singly linked list',
      'Calculate subnet mask and broadcast IP for given CIDR block',
    ],
    website: 'https://jobs.cisco.com',
  },
  {
    id: 'comp-06',
    name: 'Oracle',
    tier: 'Dream',
    jobRole: 'Associate Software Developer (Server Tech)',
    ctc: '₹19.5 LPA',
    baseCtc: '₹14.0 LPA',
    stipend: '₹55,000 / month',
    location: 'Bengaluru / Hyderabad',
    eligibility: {
      minCgpa: 7.5,
      allowedBranches: [
        'Computer Science & Engineering',
        'Information Technology',
        'Artificial Intelligence & Data Science',
      ],
      maxBacklogs: 0,
      batch: '2027',
    },
    requiredSkills: [
      'SQL & Query Optimization',
      'C++ / Java',
      'B-Tree & Indexing',
      'Operating Systems Paging',
      'Data Structures',
    ],
    applicationDeadline: '2026-11-10',
    driveDate: '2026-11-20',
    selectionRounds: [
      'Online Aptitude + Technical MCQs + 2 Coding questions',
      'Technical Round 1 (Data Structures, SQL queries & Normalization)',
      'Technical Round 2 (Operating Systems, Deadlock, Virtual Memory)',
      'Director / HR Round',
    ],
    description:
      'Oracle Cloud Infrastructure (OCI) and Database groups build enterprise storage engines and relational query planners.',
    bondDetails: 'No Bond',
    pastInterviewQuestions: [
      'Difference between Clustered vs Non-Clustered index',
      'Implement stack using queues',
      'Explain B+ Tree leaf node layout',
    ],
    website: 'https://oracle.com/corporate/careers',
  },
  {
    id: 'comp-07',
    name: 'Samsung R&D Institute',
    tier: 'Dream',
    jobRole: 'Software Engineer - Mobile & AI',
    ctc: '₹16.0 LPA',
    baseCtc: '₹12.0 LPA',
    stipend: '₹50,000 / month',
    location: 'Bengaluru / Noida',
    eligibility: {
      minCgpa: 7.0,
      allowedBranches: [
        'Computer Science & Engineering',
        'Information Technology',
        'Electronics & Communication',
      ],
      maxBacklogs: 0,
      batch: '2027',
    },
    requiredSkills: ['Advanced C++', 'Android / Kotlin', 'Graph Algorithms', 'Computer Vision / ML Basics'],
    applicationDeadline: '2026-11-14',
    driveDate: '2026-11-24',
    selectionRounds: [
      'Samsung SW Competency Test (3 hours, 1 Graph/DP Problem, strict 50/50 test cases required to pass)',
      'Technical Interview (Code walkthrough of the SW test + Core CS)',
      'HR / Cultural Fitment Round',
    ],
    description:
      'Innovate on Galaxy smartphone experiences, on-device AI algorithms, and camera image processing pipelines.',
    bondDetails: 'No Service Agreement',
    pastInterviewQuestions: [
      'Bipartite Graph check using BFS / DFS',
      'Travelling Salesperson with DP and bitmask',
      'Smart pointers in C++ (unique_ptr vs shared_ptr)',
    ],
    website: 'https://research.samsung.com',
  },
  {
    id: 'comp-08',
    name: 'TCS Digital / Ninja',
    tier: 'Core',
    jobRole: 'Digital Systems Engineer / Prime Developer',
    ctc: '₹9.0 LPA',
    baseCtc: '₹9.0 LPA',
    stipend: '₹25,000 / month',
    location: 'PAN India',
    eligibility: {
      minCgpa: 6.5,
      allowedBranches: [
        'Computer Science & Engineering',
        'Information Technology',
        'Electronics & Communication',
        'Electrical Engineering',
        'Mechanical Engineering',
      ],
      maxBacklogs: 1,
      batch: '2027',
    },
    requiredSkills: [
      'Logical Aptitude',
      'Python / Java',
      'Basic SQL',
      'Object-Oriented Programming',
      'Communication Skills',
    ],
    applicationDeadline: '2026-11-20',
    driveDate: '2026-11-30',
    selectionRounds: [
      'TCS NQT (National Qualifier Test) - Quant, Verbal, Reasoning, 2 Coding',
      'Technical + Managerial + HR Combined Interview',
    ],
    description:
      'Tata Consultancy Services Digital cadre hires high-performing graduates into strategic innovation units.',
    bondDetails: '1 Year Service Agreement (₹50,000)',
    pastInterviewQuestions: [
      'Palindrome string check with space cleanup',
      'Difference between abstract class and interface in Java',
      'Write a SQL query to find the 2nd highest salary',
    ],
    website: 'https://www.tcs.com/careers',
  },
];

export const initialNotices: Notice[] = [
  {
    id: 'notice-01',
    title: 'Google Campus Recruitment Drive 2026-27: Registration Window Live',
    content:
      'Students from CSE, IT, and AI/DS branches meeting the minimum CGPA criterion of 8.0 with zero backlogs must register on the T&P Portal before 25th October 2026, 11:59 PM.',
    date: '2026-10-08',
    urgent: true,
    author: 'Prof. K. Verma (Head TPO)',
    category: 'Drive Alert',
  },
  {
    id: 'notice-02',
    title: 'Mandatory Aptitude Mock Assessment #3 Scheduled for Saturday',
    content:
      'The T&P Cell has scheduled an Online Assessment Simulation on 12th October from 10:00 AM to 11:30 AM covering Quantitative Aptitude, Logical Reasoning, and Coding.',
    date: '2026-10-07',
    urgent: true,
    author: 'Placement Committee',
    category: 'Workshop',
  },
  {
    id: 'notice-03',
    title: 'Updated Policy on Multiple Job Offers (2-Offer Policy for 2027 Batch)',
    content:
      'A student securing an offer in the Core tier (up to ₹8 LPA) remains eligible to sit for Dream and Super Dream companies.',
    date: '2026-10-04',
    urgent: false,
    author: 'Dean - Academic & Corporate Relations',
    category: 'Policy',
  },
  {
    id: 'notice-04',
    title: 'Pre-Placement Talk (PPT) by Atlassian Engineering Leadership',
    content:
      'Atlassian engineering managers will conduct an online interactive session discussing work culture and coding test preparation strategies on 15th October at 5:00 PM.',
    date: '2026-10-02',
    urgent: false,
    author: 'TPO Coordination Desk',
    category: 'Workshop',
  },
];

export const initialApplications: Application[] = [
  {
    id: 'app-01',
    companyId: 'comp-01',
    companyName: 'Google',
    jobRole: 'Software Engineer (SWE - Campus)',
    appliedDate: '2026-10-06',
    stage: 'OA Round',
    nextRoundDate: '2026-10-22',
    notes: 'Online test link received via HackerEarth. Practicing medium-hard trees and DP.',
    packageOffered: '₹38.5 LPA',
    location: 'Bengaluru',
  },
  {
    id: 'app-02',
    companyId: 'comp-03',
    companyName: 'Goldman Sachs',
    jobRole: 'New Analyst - Global Investment Research & Tech',
    appliedDate: '2026-10-02',
    stage: 'Technical Round',
    nextRoundDate: '2026-10-18',
    notes: 'Cleared HackerRank assessment with 100% test cases. Technical round scheduled.',
    packageOffered: '₹24.0 LPA',
    location: 'Bengaluru',
  },
  {
    id: 'app-03',
    companyId: 'comp-02',
    companyName: 'Microsoft',
    jobRole: 'Software Development Engineer - 1 (SDE)',
    appliedDate: '2026-10-05',
    stage: 'Applied',
    notes: 'Resume submitted on Microsoft Careers portal.',
    packageOffered: '₹28.0 LPA',
    location: 'Hyderabad',
  },
  {
    id: 'app-04',
    companyId: 'comp-05',
    companyName: 'Cisco Systems',
    jobRole: 'Consulting Engineer / Software Engineer',
    appliedDate: '2026-09-28',
    stage: 'HR Round',
    nextRoundDate: '2026-10-14',
    notes: 'Cleared technical round discussing subnetting and TCP handshake. Awaiting HR.',
    packageOffered: '₹17.5 LPA',
    location: 'Bengaluru',
  },
  {
    id: 'app-05',
    companyId: 'comp-08',
    companyName: 'TCS Digital',
    jobRole: 'Digital Systems Engineer / Prime Developer',
    appliedDate: '2026-09-15',
    stage: 'Offer Received',
    notes: 'Received Letter of Intent (LOI) for TCS Digital prime cadre! ₹9 LPA confirmed.',
    packageOffered: '₹9.0 LPA',
    location: 'Pune / Mumbai',
  },
];

export const aptitudeQuestions: AptitudeQuestion[] = [
  {
    id: 'apt-01',
    topic: 'Quantitative',
    subtopic: 'Time and Work',
    question:
      'A can complete a piece of work in 12 days and B can complete the same work in 18 days. If they work together for 4 days, what fraction of the work remains unfinished?',
    options: ['1/3', '4/9', '5/18', '7/18'],
    correctIndex: 1,
    explanation:
      '1. In 1 day, A does 1/12 and B does 1/18.\n2. Together in 1 day: (1/12) + (1/18) = 5/36.\n3. In 4 days: 4 × (5/36) = 20/36 = 5/9 completed.\n4. Remaining work = 1 - 5/9 = 4/9.',
    difficulty: 'Easy',
  },
  {
    id: 'apt-02',
    topic: 'Quantitative',
    subtopic: 'Speed, Distance & Time',
    question:
      'A train 240 meters long passes a pole in 24 seconds. How long will it take to pass a platform 650 meters long at the same speed?',
    options: ['65 seconds', '89 seconds', '72 seconds', '96 seconds'],
    correctIndex: 1,
    explanation:
      '1. Train Speed = 240 / 24 = 10 m/s.\n2. Total Distance = 240 + 650 = 890 m.\n3. Time = 890 / 10 = 89 seconds.',
    difficulty: 'Medium',
  },
  {
    id: 'apt-03',
    topic: 'Quantitative',
    subtopic: 'Profit and Loss',
    question:
      'An article is sold at a discount of 20% on marked price, yet the shopkeeper makes a profit of 25%. If the cost price is ₹480, what is the marked price?',
    options: ['₹600', '₹750', '₹720', '₹800'],
    correctIndex: 1,
    explanation:
      '1. Selling Price (SP) = 480 × 1.25 = ₹600.\n2. SP = 0.80 × MP.\n3. MP = 600 / 0.80 = ₹750.',
    difficulty: 'Medium',
  },
  {
    id: 'apt-04',
    topic: 'Quantitative',
    subtopic: 'Permutations & Combinations',
    question:
      'In how many different ways can the letters of the word "LEADING" be arranged such that the vowels always appear together?',
    options: ['360', '720', '5040', '1440'],
    correctIndex: 1,
    explanation:
      '1. Consonants: L, D, N, G (4). Vowels: E, A, I (3).\n2. (4 + 1 block) = 5 entities -> 5! = 120.\n3. Vowels rearrange in 3! = 6 ways.\n4. Total = 120 × 6 = 720.',
    difficulty: 'Medium',
  },
  {
    id: 'apt-05',
    topic: 'Logical Reasoning',
    subtopic: 'Syllogisms',
    question:
      'Statements:\n1. All engineers are innovators.\n2. Some innovators are leaders.\nConclusions:\nI. Some engineers are leaders.\nII. Some innovators are engineers.',
    options: ['Only conclusion I follows', 'Only conclusion II follows', 'Both I and II follow', 'Neither I nor II follows'],
    correctIndex: 1,
    explanation:
      '1. "All engineers are innovators" implies "Some innovators are engineers" (Conclusion II follows).\n2. No direct bridge exists to prove conclusion I.',
    difficulty: 'Easy',
  },
  {
    id: 'apt-06',
    topic: 'Logical Reasoning',
    subtopic: 'Blood Relations',
    question:
      'Pointing towards a photograph, Rohit said, "She is the daughter of the only son of my grandfather." How is the girl in the photograph related to Rohit?',
    options: ['Sister', 'Mother', 'Cousin', 'Aunt'],
    correctIndex: 0,
    explanation:
      '1. Only son of Rohit\'s grandfather = Rohit\'s father.\n2. Daughter of father = Rohit\'s sister.',
    difficulty: 'Easy',
  },
  {
    id: 'apt-07',
    topic: 'Logical Reasoning',
    subtopic: 'Number Series',
    question:
      'Find the next number in the sequence: 4, 9, 25, 49, 121, 169, ?',
    options: ['225', '256', '289', '361'],
    correctIndex: 2,
    explanation:
      'The series consists of squares of consecutive prime numbers: 2²=4, 3²=9, 5²=25, 7²=49, 11²=121, 13²=169. Next prime is 17 -> 17² = 289.',
    difficulty: 'Medium',
  },
  {
    id: 'apt-08',
    topic: 'Verbal Ability',
    subtopic: 'Sentence Correction & Grammar',
    question:
      'Identify the grammatically correct sentence:',
    options: [
      'Neither the project manager nor the developers was aware of the deadlock.',
      'Neither the project manager nor the developers were aware of the deadlock.',
      'Neither the project manager or the developers was aware of the deadlock.',
      'Neither the project manager nor the developers have been aware with the deadlock.',
    ],
    correctIndex: 1,
    explanation:
      'When two subjects are joined by "neither... nor", the verb agrees with the subject closest to it. "The developers" is plural, so "were" is correct.',
    difficulty: 'Medium',
  },
  {
    id: 'apt-09',
    topic: 'Verbal Ability',
    subtopic: 'Vocabulary & Antonyms',
    question:
      'Choose the word most opposite in meaning (Antonym) to "EPHEMERAL":',
    options: ['Transient', 'Eternal', 'Fleeting', 'Nebulous'],
    correctIndex: 1,
    explanation:
      '"Ephemeral" means lasting for a very short time. Its opposite is "Eternal" or permanent.',
    difficulty: 'Easy',
  },
  {
    id: 'apt-10',
    topic: 'Quantitative',
    subtopic: 'Probability',
    question:
      'Two dice are rolled simultaneously. What is the probability that the sum of the numbers obtained is a prime number?',
    options: ['5/12', '7/18', '15/36', '13/36'],
    correctIndex: 0,
    explanation:
      '1. Total outcomes = 36.\n2. Prime sums: 2, 3, 5, 7, 11.\nFavorable counts = 1 + 2 + 4 + 6 + 2 = 15.\nProbability = 15 / 36 = 5 / 12.',
    difficulty: 'Medium',
  },
];

export const codingQuestions: CodingQuestion[] = [
  {
    id: 'code-01',
    title: 'Two Sum',
    difficulty: 'Easy',
    topic: 'Arrays & Hashing',
    companyTags: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs'],
    description:
      'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 2 + 7 == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
      },
    ],
    starterCode: {
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.count(complement)) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
      java: `import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
    },
    solutionCode: {
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    lookup = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in lookup:
            return [lookup[diff], i]
        lookup[num] = i
    return []`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> prevMap;
    for (int i = 0; i < nums.size(); i++) {
        int diff = target - nums[i];
        if (prevMap.find(diff) != prevMap.end()) {
            return {prevMap[diff], i};
        }
        prevMap[nums[i]] = i;
    }
    return {};
}`,
      java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int diff = target - nums[i];
        if (map.containsKey(diff)) {
            return new int[]{map.get(diff), i};
        }
        map.put(nums[i], i);
    }
    return new int[]{};
}`,
    },
    testCases: [
      { input: 'nums = [2,7,11,15], target = 9', expected: '[0, 1]' },
      { input: 'nums = [3,2,4], target = 6', expected: '[1, 2]' },
    ],
  },
  {
    id: 'code-02',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    topic: 'Stack',
    companyTags: ['Microsoft', 'Goldman Sachs', 'Oracle', 'Cisco'],
    description:
      'Given a string `s` containing characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the string is valid.',
    examples: [
      {
        input: 's = "()"',
        output: 'true',
      },
      {
        input: 's = "()[]{}"',
        output: 'true',
      },
    ],
    starterCode: {
      python: `def isValid(s: str) -> bool:
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') st.push(c);
            else {
                if (st.empty()) return false;
                char top = st.top(); st.pop();
                if (c == ')' && top != '(') return false;
                if (c == '}' && top != '{') return false;
                if (c == ']' && top != '[') return false;
            }
        }
        return st.empty();
    }
};`,
      java: `class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '{' || c == '[') stack.push(c);
            else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if (c == ')' && top != '(') return false;
                if (c == '}' && top != '{') return false;
                if (c == ']' && top != '[') return false;
            }
        }
        return stack.isEmpty();
    }
}`,
    },
    solutionCode: {
      python: `def isValid(s: str) -> bool:
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for c in s:
        if c in pairs:
            if not stack or stack.pop() != pairs[c]:
                return False
        else:
            stack.append(c)
    return len(stack) == 0`,
      cpp: `bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(') st.push(')');
        else if (c == '{') st.push('}');
        else if (c == '[') st.push(']');
        else if (st.empty() || st.top() != c) return false;
        else st.pop();
    }
    return st.empty();
}`,
      java: `public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    for (char c : s.toCharArray()) {
        if (c == '(') stack.push(')');
        else if (c == '{') stack.push('}');
        else if (c == '[') stack.push(']');
        else if (stack.isEmpty() || stack.pop() != c) return false;
    }
    return stack.isEmpty();
}`,
    },
    testCases: [
      { input: 's = "()"', expected: 'true' },
      { input: 's = "()[]{}"', expected: 'true' },
    ],
  },
  {
    id: 'code-03',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    topic: 'Sliding Window',
    companyTags: ['Google', 'Atlassian', 'Microsoft'],
    description:
      'Given a string `s`, find the length of the longest substring without duplicate characters.',
    examples: [
      { input: 's = "abcabcbb"', output: '3' },
      { input: 's = "bbbbb"', output: '1' },
    ],
    starterCode: {
      python: `def lengthOfLongestSubstring(s: str) -> int:
    seen = {}
    left = max_len = 0
    for right, c in enumerate(s):
        if c in seen and seen[c] >= left:
            left = seen[c] + 1
        seen[c] = right
        max_len = max(max_len, right - left + 1)
    return max_len`,
      cpp: `int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> seen;
    int maxLen = 0, left = 0;
    for (int right = 0; right < s.length(); ++right) {
        if (seen.count(s[right]) && seen[s[right]] >= left) left = seen[s[right]] + 1;
        seen[s[right]] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
      java: `public int lengthOfLongestSubstring(String s) {
    HashMap<Character, Integer> map = new HashMap<>();
    int maxLen = 0, left = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (map.containsKey(c) && map.get(c) >= left) left = map.get(c) + 1;
        map.put(c, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
    },
    solutionCode: {
      python: `def lengthOfLongestSubstring(s: str) -> int:
    char_map = {}
    left = res = 0
    for right in range(len(s)):
        if s[right] in char_map:
            left = max(left, char_map[s[right]] + 1)
        char_map[s[right]] = right
        res = max(res, right - left + 1)
    return res`,
      cpp: `int lengthOfLongestSubstring(string s) {
    vector<int> dict(256, -1);
    int maxLen = 0, start = -1;
    for (int i = 0; i < s.length(); i++) {
        if (dict[s[i]] > start) start = dict[s[i]];
        dict[s[i]] = i;
        maxLen = max(maxLen, i - start);
    }
    return maxLen;
}`,
      java: `public int lengthOfLongestSubstring(String s) {
    int[] index = new int[128];
    int ans = 0;
    for (int j = 0, i = 0; j < s.length(); j++) {
        i = Math.max(index[s.charAt(j)], i);
        ans = Math.max(ans, j - i + 1);
        index[s.charAt(j)] = j + 1;
    }
    return ans;
}`,
    },
    testCases: [{ input: 's = "abcabcbb"', expected: '3' }],
  },
];

export const technicalTopics: TechnicalTopic[] = [
  {
    id: 'tech-01',
    subject: 'DBMS',
    title: 'ACID Properties & Transaction Isolation',
    summary:
      'ACID guarantees that database transactions are processed reliably.',
    keyPoints: [
      'Atomicity: All-or-nothing execution via WAL and rollback logs.',
      'Consistency: State transition preserves database integrity constraints.',
      'Isolation: Concurrent execution without dirty reads or phantom reads.',
      'Durability: Committed transactions persist across power outages.',
    ],
    sampleQnA: [
      {
        question: 'What is a Dirty Read, and which isolation level prevents it?',
        answer:
          'A dirty read occurs when Transaction A reads uncommitted modifications made by Transaction B. Prevented by Read Committed isolation level and above using shared locks or MVCC.',
      },
    ],
  },
  {
    id: 'tech-02',
    subject: 'Operating Systems',
    title: 'Process vs Thread, Deadlocks & Virtual Memory',
    summary:
      'Foundational concepts required by Google, Microsoft, and Cisco interviews.',
    keyPoints: [
      'Process: Independent address space (Text, Data, Heap, Stack).',
      'Thread: Lightweight unit of execution sharing address space with sibling threads.',
      'Deadlock: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait.',
    ],
    sampleQnA: [
      {
        question: 'How do you prevent a deadlock in concurrent programming?',
        answer:
          'Impose a global total order on resource acquisition to eliminate Circular Wait, or use timed try-locks.',
      },
    ],
  },
];

export const hrQuestions: HRQuestion[] = [
  {
    id: 'hr-01',
    category: 'Self Introduction',
    question: 'Tell me about yourself / Walk me through your resume.',
    framework: 'Present -> Past -> Future Framework (90 to 120 seconds)',
    sampleAnswer:
      '"Good morning. I am Aryan Sharma, currently pursuing my B.Tech in Computer Science at Apex Institute with an 8.65 CGPA. Over the past three years, I developed a strong passion for scalable systems and built a distributed task queue handling 5,000 req/min. I have solved 350+ DSA problems and look forward to contributing my engineering skills here."',
    doAndDonts: {
      dos: [
        'Keep it structured: Who you are, key technical achievements, why this company.',
        'Highlight measurable metrics (CGPA, projects, problems solved).',
      ],
      donts: [
        'Do not repeat your resume line-by-line.',
        'Do not exceed 2 minutes.',
      ],
    },
  },
];
