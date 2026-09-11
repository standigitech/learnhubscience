import React, { useState, useEffect, useMemo } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Atom,
  Award,
  BarChart2,
  Bell,
  BookMarked,
  BookOpen,
  Bookmark,
  Calculator,
  Calendar,
  Check,
  CheckCircle,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  Clock,
  Compass,
  CreditCard,
  Dna,
  DollarSign,
  Download,
  ExternalLink,
  FileText,
  Filter,
  Flame,
  FlaskConical,
  FolderDown,
  GraduationCap,
  HelpCircle,
  History,
  Home,
  Layers,
  LayoutDashboard,
  Lightbulb,
  Loader2,
  Lock,
  Menu,
  Play,
  PlayCircle,
  Plus,
  RotateCcw,
  Search,
  Settings,
  Share2,
  ShieldAlert,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Star,
  Tag,
  Trash2,
  TrendingUp,
  Upload,
  User as UserIcon,
  UserCheck,
  Users,
  Video,
  X,
  XCircle
} from 'lucide-react';

export type UserRole = 'learner' | 'teacher' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt?: string;
}

export interface LearnerProfile {
  id: number;
  userId: number;
  schoolOrCollege: string;
  targetExams: string;
  totalStudyMinutes: number;
  points: number;
}

export interface TeacherProfile {
  id: number;
  userId: number;
  title: string;
  qualifications: string;
  experienceYears: number;
  biography: string;
  rating: number;
  reviewCount: number;
  subjectsTaught: string[];
  earningsKsh: number;
  avatarUrl: string;
  email?: string;
}

export interface Subject {
  id: number;
  slug: 'mathematics' | 'chemistry' | 'physics' | 'biology';
  name: string;
  tagline: string;
  accentColor: string;
  iconName: string;
  description: string;
  topics: Topic[];
  coursesCount?: number;
  studentsCount?: number;
}

export interface Topic {
  id: number;
  subjectId: number;
  name: string;
  slug: string;
  description: string;
  orderIndex: number;
}

export interface Course {
  id: number;
  subjectId: number;
  subjectSlug: string;
  topicId: number;
  topicName: string;
  teacherId: number;
  teacherName: string;
  teacherAvatar: string;
  title: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  priceKsh: number;
  isPremium: boolean;
  level: 'Secondary' | 'Advanced / College';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  rating: number;
  reviewCount: number;
  lessonsCount: number;
  totalDuration: string;
  published: boolean;
}

export interface LessonSection {
  id: string;
  title: string;
  content: string;
  formula?: string;
  formulaExplanation?: string;
  diagramSvg?: string;
  callout?: {
    type: 'tip' | 'warning' | 'info' | 'key-concept';
    text: string;
  };
  workedExample?: {
    problem: string;
    steps: string[];
    answer: string;
  };
}

export interface Lesson {
  id: number;
  courseId: number;
  courseTitle: string;
  subjectSlug: string;
  subjectName: string;
  topicName: string;
  teacherName: string;
  teacherAvatar: string;
  teacherTitle: string;
  title: string;
  slug: string;
  orderIndex: number;
  durationMinutes: number;
  isFree: boolean;
  objectives: string[];
  introduction: string;
  sections: LessonSection[];
  videoUrl?: string;
  videoDuration?: string;
  resources: Resource[];
  quizId?: number;
}

export interface Resource {
  id: number;
  lessonId?: number;
  courseId?: number;
  subjectSlug: string;
  subjectName: string;
  topicName: string;
  title: string;
  resourceType: 'pdf' | 'worksheet' | 'past_paper' | 'study_guide';
  level: string;
  year: number;
  fileUrl: string;
  fileSize: string;
  isPremium: boolean;
  downloadsCount: number;
}

export interface Question {
  id: number;
  quizId: number;
  questionType: 'multiple_choice' | 'true_false' | 'numerical';
  prompt: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  orderIndex: number;
}

export interface Quiz {
  id: number;
  lessonId?: number;
  courseId?: number;
  title: string;
  description: string;
  timeLimitMinutes: number;
  passingScore: number;
  questions: Question[];
}

export interface QuizAttempt {
  id: number;
  quizId: number;
  userId: number;
  score: number;
  totalPoints: number;
  passed: boolean;
  timeTakenSeconds: number;
  answers: Record<number, string>;
  createdAt: string;
}

export interface Article {
  id: number;
  subjectSlug: string;
  subjectName: string;
  authorName: string;
  authorAvatar: string;
  authorTitle: string;
  title: string;
  slug: string;
  shortDescription: string;
  contentMarkdown: string;
  featuredImage: string;
  readingTimeMinutes: number;
  tags: string[];
  isPremium: boolean;
  viewsCount: number;
  publishedAt: string;
}

export interface LearnerProgress {
  userId: number;
  currentCourse: {
    courseId: number;
    courseTitle: string;
    topicName: string;
    lessonNumber: number;
    lessonTitle: string;
    lessonId: number;
    progressPercent: number;
  };
  totalCoursesEnrolled: number;
  completedLessons: number;
  totalStudyMinutes: number;
  averageQuizScore: number;
  streakDays: number;
  recentLessons: {
    lessonId: number;
    lessonTitle: string;
    subjectSlug: string;
    subjectName: string;
    progressPercent: number;
    lastAccessed: string;
  }[];
}

export interface Subscription {
  id: number;
  userId: number;
  planType: 'monthly' | 'annual';
  amountKsh: number;
  status: 'active' | 'cancelled' | 'expired';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  paymentReference: string;
}

export interface PaymentRecord {
  id: number;
  userId: number;
  amountKsh: number;
  currency: 'KSh' | 'USD';
  paymentMethod: 'mpesa' | 'stripe_card';
  referenceCode: string;
  status: 'success' | 'pending' | 'failed';
  itemType: 'subscription' | 'course' | 'lesson';
  itemTitle: string;
  date: string;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api/${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers
    }
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload && typeof payload.error === 'string'
      ? payload.error
      : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return payload as T;
}

export const api = {
  getSubjects: () => request<Subject[]>('subjects'),
  getCourses: (query?: string) => request<Course[]>(`courses${query ? `?q=${encodeURIComponent(query)}` : ''}`),
  createCourse: (course: Partial<Course>) =>
    request<{ success: boolean; course: Course }>('courses', {
      method: 'POST',
      body: JSON.stringify(course)
    }),
  getArticles: () => request<Article[]>('articles'),
  getResources: () => request<Resource[]>('resources'),
  getProgress: () => request<LearnerProgress>('progress'),
  updateProgress: (lessonId: number, progressPercent: number) =>
    request<{ success: boolean; progress: LearnerProgress }>('progress/update', {
      method: 'POST',
      body: JSON.stringify({ lessonId, progressPercent })
    }),
  getQuiz: (quizId: number) => request<Quiz>(`quizzes/${quizId}`),
  submitQuiz: (quizId: number, answers: Record<number, string>, timeTakenSeconds: number) =>
    request<{ success: boolean; attempt: { score: number } }>(`quizzes/${quizId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ quizId, answers, timeTakenSeconds })
    })
};

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 1,
    slug: 'mathematics',
    name: 'Mathematics',
    tagline: 'Precision, Logic & Problem Solving',
    accentColor: '#0284C7',
    iconName: 'Calculator',
    description: 'Master foundational and advanced mathematical principles, from algebraic equations and calculus proofs to spatial geometry and statistical analysis.',
    topics: [
      { id: 101, subjectId: 1, name: 'Algebra', slug: 'algebra', description: 'Equations, polynomials, inequalities and algebraic systems', orderIndex: 1 },
      { id: 102, subjectId: 1, name: 'Calculus', slug: 'calculus', description: 'Differential & integral calculus with real-world rate applications', orderIndex: 2 },
      { id: 103, subjectId: 1, name: 'Geometry', slug: 'geometry', description: 'Euclidean geometry, coordinate geometry, and circle theorems', orderIndex: 3 },
      { id: 104, subjectId: 1, name: 'Trigonometry', slug: 'trigonometry', description: 'Trig ratios, unit circle, sine & cosine rules, and identities', orderIndex: 4 },
      { id: 105, subjectId: 1, name: 'Statistics', slug: 'statistics', description: 'Measures of central tendency, dispersion, and regression modeling', orderIndex: 5 },
      { id: 106, subjectId: 1, name: 'Probability', slug: 'probability', description: 'Combinatorics, conditional probability, and random variables', orderIndex: 6 }
    ],
    coursesCount: 18,
    studentsCount: 3420
  },
  {
    id: 2,
    slug: 'chemistry',
    name: 'Chemistry',
    tagline: 'The Central Molecular Science',
    accentColor: '#9333EA',
    iconName: 'FlaskConical',
    description: 'Explore the molecular building blocks of our universe, chemical reactions, thermodynamics, atomic orbitals, and analytical mechanisms.',
    topics: [
      { id: 201, subjectId: 2, name: 'Organic Chemistry', slug: 'organic-chemistry', description: 'Hydrocarbons, functional groups, reaction mechanisms, and polymers', orderIndex: 1 },
      { id: 202, subjectId: 2, name: 'Inorganic Chemistry', slug: 'inorganic-chemistry', description: 'Periodic trends, transition metals, and coordination compounds', orderIndex: 2 },
      { id: 203, subjectId: 2, name: 'Physical Chemistry', slug: 'physical-chemistry', description: 'Thermodynamics, chemical kinetics, equilibrium, and electrochemistry', orderIndex: 3 },
      { id: 204, subjectId: 2, name: 'Analytical Chemistry', slug: 'analytical-chemistry', description: 'Spectroscopy, titration stoichiometry, and chromatography', orderIndex: 4 },
      { id: 205, subjectId: 2, name: 'Atomic Structure', slug: 'atomic-structure', description: 'Quantum numbers, electron configurations, and orbital shapes', orderIndex: 5 },
      { id: 206, subjectId: 2, name: 'Chemical Bonding', slug: 'chemical-bonding', description: 'Ionic, covalent, metallic bonds, VSEPR shapes, and intermolecular forces', orderIndex: 6 }
    ],
    coursesCount: 14,
    studentsCount: 2890
  },
  {
    id: 3,
    slug: 'physics',
    name: 'Physics',
    tagline: 'Forces, Energy & The Cosmos',
    accentColor: '#F97316',
    iconName: 'Atom',
    description: 'Understand the fundamental laws governing motion, energy, gravitational fields, quantum mechanics, and electromagnetic phenomena.',
    topics: [
      { id: 301, subjectId: 3, name: 'Mechanics', slug: 'mechanics', description: 'Kinematics, dynamics, Newton’s laws, momentum, and rotational motion', orderIndex: 1 },
      { id: 302, subjectId: 3, name: 'Waves', slug: 'waves', description: 'Wave optics, Doppler effect, simple harmonic motion, and acoustics', orderIndex: 2 },
      { id: 303, subjectId: 3, name: 'Electricity', slug: 'electricity', description: 'Coulomb’s law, electric circuits, Kirchhoff’s laws, and capacitance', orderIndex: 3 },
      { id: 304, subjectId: 3, name: 'Magnetism', slug: 'magnetism', description: 'Magnetic fields, Lorentz force, Faraday’s law, and induction', orderIndex: 4 },
      { id: 305, subjectId: 3, name: 'Thermodynamics', slug: 'thermodynamics', description: 'Gas laws, entropy, heat engines, and thermal conduction', orderIndex: 5 },
      { id: 306, subjectId: 3, name: 'Modern Physics', slug: 'modern-physics', description: 'Photoelectric effect, special relativity, and nuclear decay', orderIndex: 6 }
    ],
    coursesCount: 16,
    studentsCount: 3110
  },
  {
    id: 4,
    slug: 'biology',
    name: 'Biology',
    tagline: 'Life Systems & Cellular Machinery',
    accentColor: '#10B981',
    iconName: 'Dna',
    description: 'Investigate the marvels of living organisms, from molecular DNA replication and organelle functions to macroscopic ecosystems and human physiology.',
    topics: [
      { id: 401, subjectId: 4, name: 'Cell Biology', slug: 'cell-biology', description: 'Organelle structure, membrane transport, and cellular respiration', orderIndex: 1 },
      { id: 402, subjectId: 4, name: 'Genetics', slug: 'genetics', description: 'Mendelian inheritance, DNA replication, transcription, and CRISPR', orderIndex: 2 },
      { id: 403, subjectId: 4, name: 'Ecology', slug: 'ecology', description: 'Biogeochemical cycles, population dynamics, and ecosystem resilience', orderIndex: 3 },
      { id: 404, subjectId: 4, name: 'Human Biology', slug: 'human-biology', description: 'Cardiovascular, nervous, endocrine, and immune physiological systems', orderIndex: 4 },
      { id: 405, subjectId: 4, name: 'Evolution', slug: 'evolution', description: 'Natural selection, speciation, phylogenetic trees, and adaptations', orderIndex: 5 },
      { id: 406, subjectId: 4, name: 'Anatomy', slug: 'anatomy', description: 'Comparative vertebrate anatomy, skeletal, and muscular systems', orderIndex: 6 }
    ],
    coursesCount: 15,
    studentsCount: 2780
  }
];

export const TEACHER_PROFILES: TeacherProfile[] = [
  {
    id: 1,
    userId: 2,
    title: 'Dr. Kelvin M.',
    qualifications: 'PhD in Chemistry, University of Nairobi',
    experienceYears: 12,
    biography: 'Specialist in organic synthesis and chemical education. Passionate about deconstructing complex orbital mechanics and reaction mechanisms into visually intuitive models.',
    rating: 4.8,
    reviewCount: 320,
    subjectsTaught: ['Chemistry', 'Physical Chemistry'],
    earningsKsh: 485000,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    email: 'dr.kelvin@learnsci.edu'
  },
  {
    id: 2,
    userId: 4,
    title: 'Prof. Sarah Ochieng',
    qualifications: 'MSc in Pure Mathematics, Oxford Alumna',
    experienceYears: 10,
    biography: 'National STEM Olympiad trainer and secondary curriculum specialist. Helps high school and college students master algebra, calculus, and competition problem solving.',
    rating: 4.9,
    reviewCount: 412,
    subjectsTaught: ['Mathematics', 'Calculus', 'Algebra'],
    earningsKsh: 620000,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    email: 'prof.sarah@learnsci.edu'
  },
  {
    id: 3,
    userId: 5,
    title: 'Dr. Alan Kipkorir',
    qualifications: 'PhD in Applied Physics, MIT Postdoc',
    experienceYears: 14,
    biography: 'Former theoretical researcher turned high-impact science educator. Specializes in Newtonian mechanics, electromagnetism, and visual laboratory simulations.',
    rating: 4.8,
    reviewCount: 295,
    subjectsTaught: ['Physics', 'Mechanics', 'Waves'],
    earningsKsh: 540000,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    email: 'dr.alan@learnsci.edu'
  },
  {
    id: 4,
    userId: 6,
    title: 'Dr. Brenda Wanjiku',
    qualifications: 'MBChB, Cellular Biology Specialist',
    experienceYears: 9,
    biography: 'Medical doctor and biological researcher. Connects microscopic cellular pathways and molecular genetics directly to clinical real-world health applications.',
    rating: 4.9,
    reviewCount: 380,
    subjectsTaught: ['Biology', 'Cell Biology', 'Genetics'],
    earningsKsh: 590000,
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    email: 'dr.brenda@learnsci.edu'
  }
];

export const COURSES: Course[] = [
  {
    id: 1,
    subjectId: 1,
    subjectSlug: 'mathematics',
    topicId: 101,
    topicName: 'Algebra Basics',
    teacherId: 2,
    teacherName: 'Prof. Sarah Ochieng',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    title: 'Mastering Linear & Quadratic Equations',
    slug: 'linear-and-quadratic-equations',
    description: 'Complete breakdown of polynomial factorization, completing the square, quadratic formula derivations, and graphical roots analysis.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600',
    priceKsh: 150,
    isPremium: false,
    level: 'Secondary',
    difficulty: 'Intermediate',
    rating: 4.7,
    reviewCount: 142,
    lessonsCount: 8,
    totalDuration: '3 hrs 40 mins',
    published: true
  },
  {
    id: 2,
    subjectId: 2,
    subjectSlug: 'chemistry',
    topicId: 206,
    topicName: 'Inorganic Chemistry',
    teacherId: 1,
    teacherName: 'Dr. Kelvin M.',
    teacherAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    title: 'Chemical Bonding & Molecular Architecture',
    slug: 'chemical-bonding-and-molecular-architecture',
    description: 'Understand how electrons drive matter: ionic lattices, covalent sharing, VSEPR geometries, hybridisation, and intermolecular bonding forces.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&q=80&w=600',
    priceKsh: 200,
    isPremium: true,
    level: 'Secondary',
    difficulty: 'Intermediate',
    rating: 4.8,
    reviewCount: 189,
    lessonsCount: 10,
    totalDuration: '4 hrs 15 mins',
    published: true
  },
  {
    id: 3,
    subjectId: 3,
    subjectSlug: 'physics',
    topicId: 301,
    topicName: 'Mechanics',
    teacherId: 3,
    teacherName: 'Dr. Alan Kipkorir',
    teacherAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    title: 'Newtonian Mechanics & Laws of Motion',
    slug: 'laws-of-motion-and-mechanics',
    description: 'In-depth analysis of Newton’s three laws, free-body diagram kinematics, friction coefficients, and conservation of linear momentum.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=600',
    priceKsh: 180,
    isPremium: true,
    level: 'Secondary',
    difficulty: 'Beginner',
    rating: 4.6,
    reviewCount: 118,
    lessonsCount: 7,
    totalDuration: '3 hrs 10 mins',
    published: true
  },
  {
    id: 4,
    subjectId: 4,
    subjectSlug: 'biology',
    topicId: 401,
    topicName: 'Cell Biology',
    teacherId: 4,
    teacherName: 'Dr. Brenda Wanjiku',
    teacherAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    title: 'Cell Structure & Organelle Ultrastructure',
    slug: 'cell-structure-and-organelles',
    description: 'Explore prokaryotic vs eukaryotic distinctions, endomembrane networks, mitochondrial ATP synthesis, and selectively permeable membranes.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=600',
    priceKsh: 150,
    isPremium: false,
    level: 'Secondary',
    difficulty: 'Beginner',
    rating: 4.7,
    reviewCount: 165,
    lessonsCount: 6,
    totalDuration: '2 hrs 50 mins',
    published: true
  },
  {
    id: 5,
    subjectId: 1,
    subjectSlug: 'mathematics',
    topicId: 102,
    topicName: 'Calculus',
    teacherId: 2,
    teacherName: 'Prof. Sarah Ochieng',
    teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    title: 'Differential Calculus & Rate Optimization',
    slug: 'differential-calculus-and-optimization',
    description: 'Limits, first principles, chain rule, product & quotient rules, tangent lines, and real-world stationary points.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509869175650-a1c97835a570?auto=format&fit=crop&q=80&w=600',
    priceKsh: 250,
    isPremium: true,
    level: 'Advanced / College',
    difficulty: 'Advanced',
    rating: 4.9,
    reviewCount: 210,
    lessonsCount: 12,
    totalDuration: '5 hrs 30 mins',
    published: true
  },
  {
    id: 6,
    subjectId: 2,
    subjectSlug: 'chemistry',
    topicId: 201,
    topicName: 'Organic Chemistry',
    teacherId: 1,
    teacherName: 'Dr. Kelvin M.',
    teacherAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    title: 'Hydrocarbons & Organic Reaction Pathways',
    slug: 'hydrocarbons-and-reaction-pathways',
    description: 'Alkanes, alkenes, alkynes, electrophilic addition, nucleophilic substitution, isomerism, and synthetic pathways.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=600',
    priceKsh: 220,
    isPremium: true,
    level: 'Advanced / College',
    difficulty: 'Advanced',
    rating: 4.8,
    reviewCount: 145,
    lessonsCount: 9,
    totalDuration: '4 hrs 45 mins',
    published: true
  }
];

export const QUADRATIC_EQUATIONS_LESSON: Lesson = {
  id: 1,
  courseId: 1,
  courseTitle: 'Mastering Linear & Quadratic Equations',
  subjectSlug: 'mathematics',
  subjectName: 'Mathematics',
  topicName: 'Algebra Basics',
  teacherName: 'Prof. Sarah Ochieng',
  teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
  teacherTitle: 'MSc Pure Mathematics',
  title: 'Quadratic Equations & Roots',
  slug: 'quadratic-equations',
  orderIndex: 5,
  durationMinutes: 45,
  isFree: true,
  objectives: [
    'Define a quadratic equation in canonical standard polynomial form ax² + bx + c = 0 where a ≠ 0.',
    'Master algebraic factorization when trinomials can be decomposed into integer factors.',
    'Execute the method of completing the square systematically for monic and non-monic quadratics.',
    'Apply the quadratic formula x = (-b ± √(b² - 4ac)) / (2a) and interpret the discriminant Δ.',
    'Analyze parabolic vertex coordinates and sketch roots on the Cartesian plane.'
  ],
  introduction: 'Quadratic equations are second-degree polynomial equations ubiquitous across physics (projectile trajectories), engineering (parabolic antennas), biology (population inflection curves), and economics (profit maximization). In this masterclass lesson, we break down all 9 structural facets to guarantee exam excellence.',
  sections: [
    {
      id: 'section-1',
      title: '1. Introduction & Geometric Interpretation',
      content: 'A quadratic expression produces a parabola when graphed on the Cartesian plane. The solutions to the equation ax² + bx + c = 0 are the x-intercepts (also known as roots or zeros) where the curve intersects the horizontal axis y = 0. When a > 0, the parabola opens upwards having a global minimum; when a < 0, it opens downwards having a global maximum.'
    },
    {
      id: 'section-2',
      title: '2. Learning Objectives & Prerequisites',
      content: 'Before proceeding, ensure familiarity with basic linear expansion (FOIL method) and perfect square identities like (x + d)² = x² + 2dx + d². By completing this lesson, you will be equipped to tackle any secondary or college entrance quadratic problem with 100% confidence.'
    },
    {
      id: 'section-3',
      title: '3. The Standard Form',
      content: 'Any quadratic equation must first be rearranged into standard canonical form before choosing a solution method:',
      formula: 'ax^2 + bx + c = 0 \\quad (a \\neq 0)',
      formulaExplanation: 'Where "a" is the quadratic coefficient, "b" is the linear coefficient, and "c" is the constant term.',
      callout: {
        type: 'warning',
        text: 'Always ensure one side of the equation is equal to zero before identifying coefficients a, b, and c! For example, in 3x² = 5x - 2, rearrange to 3x² - 5x + 2 = 0.'
      }
    },
    {
      id: 'section-4',
      title: '4. Factorization Method (Grouping & Inspection)',
      content: 'When a quadratic equation has rational roots, factoring is the fastest method. For ax² + bx + c = 0, find two integers p and q such that p + q = b and p · q = a · c.',
      workedExample: {
        problem: 'Solve by factorization: x² - 5x + 6 = 0',
        steps: [
          'Identify a = 1, b = -5, c = 6. Product ac = 6, Sum b = -5.',
          'Find two numbers whose product is +6 and sum is -5: -2 and -3.',
          'Factor into binomials: (x - 2)(x - 3) = 0.',
          'By the Zero Product Property: x - 2 = 0 or x - 3 = 0.'
        ],
        answer: 'x = 2  or  x = 3'
      }
    },
    {
      id: 'section-5',
      title: '5. Completing the Square',
      content: 'Completing the square transforms ax² + bx + c = 0 into the vertex form a(x - h)² + k = 0, allowing direct root extraction by taking square roots of both sides.',
      workedExample: {
        problem: 'Solve by completing the square: x² + 6x - 7 = 0',
        steps: [
          'Move constant to the right: x² + 6x = 7.',
          'Take half the linear coefficient (6/2 = 3) and square it (3² = 9).',
          'Add 9 to both sides: x² + 6x + 9 = 7 + 9.',
          'Rewrite left side as a perfect square: (x + 3)² = 16.',
          'Take square roots: x + 3 = ±4, hence x = -3 ± 4.'
        ],
        answer: 'x = 1  or  x = -7'
      }
    },
    {
      id: 'section-6',
      title: '6. The Universal Quadratic Formula & Discriminant',
      content: 'Derived directly by completing the square on the general standard form, this formula delivers solutions for ANY real or complex quadratic equation:',
      formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
      formulaExplanation: 'The quantity under the radical sign Δ = b² - 4ac is called the Discriminant. It dictates the nature of the roots.',
      callout: {
        type: 'key-concept',
        text: 'Discriminant Rules:\n• If Δ > 0: Two distinct real roots.\n• If Δ = 0: Exactly one repeated real root (curve touches axis at vertex).\n• If Δ < 0: No real roots (two complex conjugate roots).'
      }
    },
    {
      id: 'section-7',
      title: '7. Worked Examples with Step-by-Step Breakdown',
      content: 'Let us solve a non-monic quadratic with irrational roots using the formula:',
      workedExample: {
        problem: 'Solve: 2x² - 4x - 1 = 0',
        steps: [
          'Identify a = 2, b = -4, c = -1.',
          'Calculate discriminant: Δ = (-4)² - 4(2)(-1) = 16 + 8 = 24.',
          'Substitute into formula: x = [ -(-4) ± √24 ] / (2 × 2).',
          'Simplify radical: √24 = √(4 × 6) = 2√6.',
          'x = (4 ± 2√6) / 4 = (2 ± √6) / 2.'
        ],
        answer: 'x ≈ 2.22  or  x ≈ -0.22'
      }
    },
    {
      id: 'section-8',
      title: '8. Practice Questions with Instant Checking',
      content: 'Test your understanding before the graded quiz. Solve these quick diagnostic questions and verify your steps against the mathematical breakdown.'
    },
    {
      id: 'section-9',
      title: '9. Graded Quiz & Mastery Certification',
      content: 'Ready to benchmark your knowledge? Launch the interactive 5-question timed quiz below to record your performance to your student progress profile.'
    }
  ],
  videoUrl: 'https://www.youtube.com/embed/ZBalWWHYzCs',
  videoDuration: '18:45',
  resources: [
    {
      id: 1,
      lessonId: 1,
      courseId: 1,
      subjectSlug: 'mathematics',
      subjectName: 'Mathematics',
      topicName: 'Algebra',
      title: 'Quadratic Equations Comprehensive Revision Guide (PDF)',
      resourceType: 'pdf',
      level: 'Secondary Form 3-4 / College Prep',
      year: 2025,
      fileUrl: '/resources/quadratics-revision-guide.pdf',
      fileSize: '3.2 MB',
      isPremium: false,
      downloadsCount: 1420
    },
    {
      id: 2,
      lessonId: 1,
      courseId: 1,
      subjectSlug: 'mathematics',
      subjectName: 'Mathematics',
      topicName: 'Algebra',
      title: 'Worked Practice Worksheet - 50 Exam Problems with Solutions',
      resourceType: 'worksheet',
      level: 'Secondary',
      year: 2025,
      fileUrl: '/resources/quadratics-practice-worksheet.pdf',
      fileSize: '1.8 MB',
      isPremium: true,
      downloadsCount: 890
    }
  ],
  quizId: 1
};

export const QUIZZES: Quiz[] = [
  {
    id: 1,
    lessonId: 1,
    courseId: 1,
    title: 'Quadratic Equations Mastery Quiz',
    description: 'Assess your ability to find roots, evaluate discriminants, and apply quadratic factorization under exam conditions.',
    timeLimitMinutes: 10,
    passingScore: 70,
    questions: [
      {
        id: 1,
        quizId: 1,
        questionType: 'multiple_choice',
        prompt: 'What are the roots of the quadratic equation x² - 7x + 12 = 0?',
        options: ['x = 3 and x = 4', 'x = -3 and x = -4', 'x = 2 and x = 6', 'x = 1 and x = 12'],
        correctAnswer: 'x = 3 and x = 4',
        explanation: 'Factoring gives (x - 3)(x - 4) = 0, giving roots x = 3 and x = 4 because (-3) × (-4) = 12 and (-3) + (-4) = -7.',
        orderIndex: 1
      },
      {
        id: 2,
        quizId: 1,
        questionType: 'multiple_choice',
        prompt: 'If the discriminant of a quadratic equation is Δ = -16, which statement is TRUE regarding its roots?',
        options: [
          'There are two distinct real roots.',
          'There is exactly one repeated real root.',
          'There are no real roots (two complex conjugate roots).',
          'The equation cannot be graphed.'
        ],
        correctAnswer: 'There are no real roots (two complex conjugate roots).',
        explanation: 'When Δ < 0, the square root √(Δ) is imaginary, meaning the parabola does not cross the real x-axis.',
        orderIndex: 2
      },
      {
        id: 3,
        quizId: 1,
        questionType: 'true_false',
        prompt: 'True or False: Every quadratic equation can be written in the form ax² + bx + c = 0 where a ≠ 0.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'By definition, a second-degree polynomial must possess a non-zero leading coefficient a for the squared term to exist.',
        orderIndex: 3
      },
      {
        id: 4,
        quizId: 1,
        questionType: 'numerical',
        prompt: 'Calculate the discriminant value (Δ = b² - 4ac) for 2x² - 4x + 2 = 0:',
        correctAnswer: '0',
        explanation: 'b² - 4ac = (-4)² - 4(2)(2) = 16 - 16 = 0. This confirms the equation has one repeated root x = 1.',
        orderIndex: 4
      },
      {
        id: 5,
        quizId: 1,
        questionType: 'multiple_choice',
        prompt: 'What number must be added to x² + 10x to make it a perfect square trinomial?',
        options: ['20', '25', '100', '5'],
        correctAnswer: '25',
        explanation: 'Take half the linear coefficient (10 / 2 = 5) and square it: 5² = 25. Thus (x + 5)² = x² + 10x + 25.',
        orderIndex: 5
      }
    ]
  }
];

export const ARTICLES: Article[] = [
  {
    id: 1,
    subjectSlug: 'chemistry',
    subjectName: 'Chemistry',
    authorName: 'Dr. Kelvin M.',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    authorTitle: 'PhD in Chemistry, UoN',
    title: 'Types of Chemical Reactions and Examples',
    slug: 'types-of-chemical-reactions-and-examples',
    shortDescription: 'A systematic visual walkthrough of synthesis, decomposition, single replacement, double replacement, combustion, and redox chemistry.',
    readingTimeMinutes: 7,
    tags: ['Chemistry', 'Reactions', 'Stoichiometry', 'Lab Practical'],
    isPremium: false,
    viewsCount: 3840,
    publishedAt: '2026-08-14T10:00:00Z',
    featuredImage: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&q=80&w=800',
    contentMarkdown: `### The 5 Foundational Types of Chemical Reactions

Chemical reactions transform reactants into new products through the breaking and formation of chemical bonds. Understanding reaction taxonomy lets students predict products with precision.

#### 1. Synthesis (Combination) Reactions
Two or more simple reactants unite to synthesize a single compound:
**A + B → AB**
*Example:* 2Mg(s) + O₂(g) → 2MgO(s)  
*Observation:* Brilliant dazzling white flame, forming white magnesium oxide powder.

#### 2. Decomposition Reactions
A single complex reactant breaks down into simpler constituent substances, typically triggered by thermal energy, electricity, or photons:
**AB → A + B**
*Example:* 2KClO₃(s) —(heat/MnO₂)→ 2KCl(s) + 3O₂(g)

#### 3. Single Displacement (Replacement) Reactions
A more electropositive or reactive element displaces a less reactive element from an aqueous ionic solution:
**A + BC → AC + B**
*Example:* Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s)  
*Observation:* Blue solution fades to colourless as reddish-brown copper precipitates.

#### 4. Double Displacement (Metathesis)
Ions of two reacting aqueous compounds exchange mutual partners to form a precipitate, gas, or stable neutral molecule:
**AB + CD → AD + CB**
*Example:* AgNO₃(aq) + NaCl(aq) → AgCl(s)↓ + NaNO₃(aq)

#### 5. Combustion Reactions
Hydrocarbon fuels vigorously react with molecular oxygen, yielding carbon dioxide, water vapor, and exothermic thermal release:
*Example:* CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(g) + Energy
`
  },
  {
    id: 2,
    subjectSlug: 'physics',
    subjectName: 'Physics',
    authorName: 'Dr. Alan Kipkorir',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    authorTitle: 'PhD Applied Physics',
    title: 'Understanding Energy Conservation: From Classical Mechanics to Relativity',
    slug: 'understanding-energy-conservation',
    shortDescription: 'Why the total energy of an isolated system remains constant, and how mechanical, thermal, and relativistic forms interconvert.',
    readingTimeMinutes: 6,
    tags: ['Physics', 'Thermodynamics', 'Mechanics', 'Energy'],
    isPremium: false,
    viewsCount: 2910,
    publishedAt: '2026-08-20T14:30:00Z',
    featuredImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800',
    contentMarkdown: `### The Principle of Conservation of Energy

Energy can neither be created nor destroyed; it only transforms from one energetic form into another. The total energy of an isolated system remains strictly invariant over time.

#### Mechanical Energy Interconversion
In ideal conservative gravitational fields (ignoring non-conservative dissipative friction), the sum of kinetic energy (KE) and gravitational potential energy (PE) remains invariant:

**E_total = KE + PE = (1/2)mv² + mgh = Constant**

At the pinnacle of a roller coaster or pendulum swing, kinetic velocity is zero while potential energy reaches peak magnitude. At the nadir, potential drops to zero and kinetic velocity peaks.

#### Einstein’s Mass-Energy Equivalence
In modern physics, the law of conservation of mass and conservation of energy unify into the single conservation of mass-energy:

**E = mc²**

During nuclear fission and stellar fusion in the Sun, minute mass defects Δm directly convert into enormous electromagnetic radiation according to the square of the speed of light.`
  },
  {
    id: 3,
    subjectSlug: 'biology',
    subjectName: 'Biology',
    authorName: 'Dr. Brenda Wanjiku',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    authorTitle: 'MBChB Cellular Biology',
    title: 'DNA Structure and Replication Process',
    slug: 'dna-structure-and-replication-process',
    shortDescription: 'The semi-conservative double helix mechanism, helicase unwinding, DNA polymerase synthesis, and Okazaki fragment ligation.',
    readingTimeMinutes: 8,
    tags: ['Biology', 'Genetics', 'Molecular Biology', 'Biochemistry'],
    isPremium: true,
    viewsCount: 4120,
    publishedAt: '2026-08-28T09:15:00Z',
    featuredImage: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800',
    contentMarkdown: `### The Molecular Architecture of Deoxyribonucleic Acid

Discovered by Rosalind Franklin, James Watson, and Francis Crick, the DNA double helix encodes hereditary information across all known cellular life forms.

#### Structural Nucleotide Building Blocks
Each nucleotide monomer comprises:
1. A deoxyribose five-carbon pentose sugar
2. A negatively charged phosphate group forming the hydrophilic backbone
3. One of four nitrogenous bases: Adenine (A), Thymine (T), Guanine (G), Cytosine (C)

**Chargaff's Rules of Complementary Base Pairing:**
- Adenine pairs exclusively with Thymine via **2 hydrogen bonds** (A=T).
- Guanine pairs exclusively with Cytosine via **3 hydrogen bonds** (G≡C).

#### The Semiconservative Replication Machinery
Before a cell divides (S-phase of interphase), its complete genome must be duplicated with near-zero error rates:
- **Helicase:** Unzips the parental double helix by breaking hydrogen bonds, forming the replication fork.
- **Single-Stranded Binding Proteins (SSBs):** Prevent premature annealing of separated single strands.
- **Primase:** Lays down short complementary RNA primers.
- **DNA Polymerase III:** Synthesizes new DNA continuously on the Leading Strand (5' to 3'), and discontinuously in Okazaki fragments on the Lagging Strand.
- **DNA Ligase:** Catalyzes phosphodiester bonds to seal nicks between adjacent fragments.`
  },
  {
    id: 4,
    subjectSlug: 'mathematics',
    subjectName: 'Mathematics',
    authorName: 'Prof. Sarah Ochieng',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    authorTitle: 'MSc Pure Mathematics',
    title: 'Limits and Continuity Explained Clearly',
    slug: 'limits-and-continuity-explained-clearly',
    shortDescription: 'Building rigorous visual intuition for epsilon-delta limits, one-sided limits, indeterminate forms, and continuous functions.',
    readingTimeMinutes: 9,
    tags: ['Mathematics', 'Calculus', 'Limits', 'Analysis'],
    isPremium: false,
    viewsCount: 3340,
    publishedAt: '2026-09-02T16:00:00Z',
    featuredImage: 'https://images.unsplash.com/photo-1509869175650-a1c97835a570?auto=format&fit=crop&q=80&w=800',
    contentMarkdown: `### Demystifying Calculus: The Foundation of Limits

All of calculus—derivatives, tangent slopes, integrals, and infinite series—rests atop the single foundational concept of the limit.

#### What is a Limit?
The limit of f(x) as x approaches c equals L:
**lim_{x → c} f(x) = L**
It signifies that we can make the output values of f(x) arbitrarily close to L by choosing input x values sufficiently close (yet not necessarily equal) to c.

#### One-Sided Limits and Existence
For a two-sided limit to exist at x = c:
1. Left-hand limit **lim_{x → c⁻} f(x)** must exist.
2. Right-hand limit **lim_{x → c⁺} f(x)** must exist.
3. Both one-sided limits must equal the identical real number L.

#### Definition of Continuity at a Point
A function f(x) is continuous at x = c if and only if three conditions are satisfied simultaneously:
1. f(c) is defined (c is within the domain).
2. lim_{x → c} f(x) exists.
3. lim_{x → c} f(x) = f(c).

If a curve can be drawn without lifting your pencil off the paper, it represents a continuous function!`
  }
];

export const ALL_RESOURCES: Resource[] = [
  {
    id: 1,
    lessonId: 1,
    courseId: 1,
    subjectSlug: 'mathematics',
    subjectName: 'Mathematics',
    topicName: 'Algebra',
    title: 'Complete Algebra Formula & Theorem Pocket Sheet (PDF)',
    resourceType: 'pdf',
    level: 'Secondary',
    year: 2025,
    fileUrl: '/resources/math-algebra-cheat-sheet.pdf',
    fileSize: '1.4 MB',
    isPremium: false,
    downloadsCount: 3120
  },
  {
    id: 2,
    lessonId: 1,
    courseId: 1,
    subjectSlug: 'mathematics',
    subjectName: 'Mathematics',
    topicName: 'Algebra Basics',
    title: 'KCSE & College Prep Algebra Past Papers 2020-2025 with Full Marking Schemes',
    resourceType: 'past_paper',
    level: 'Secondary Form 4',
    year: 2025,
    fileUrl: '/resources/algebra-past-papers-2025.pdf',
    fileSize: '6.8 MB',
    isPremium: true,
    downloadsCount: 1980
  },
  {
    id: 3,
    courseId: 2,
    subjectSlug: 'chemistry',
    subjectName: 'Chemistry',
    topicName: 'Inorganic Chemistry',
    title: 'Periodic Table Trends & Oxidation State Reference Chart',
    resourceType: 'study_guide',
    level: 'Secondary / College',
    year: 2025,
    fileUrl: '/resources/chemistry-periodic-chart.pdf',
    fileSize: '2.1 MB',
    isPremium: false,
    downloadsCount: 4210
  },
  {
    id: 4,
    courseId: 2,
    subjectSlug: 'chemistry',
    subjectName: 'Chemistry',
    topicName: 'Chemical Bonding',
    title: 'Lewis Structures & VSEPR Molecular Geometry Worksheet',
    resourceType: 'worksheet',
    level: 'College Prep',
    year: 2025,
    fileUrl: '/resources/vsepr-worksheet.pdf',
    fileSize: '2.9 MB',
    isPremium: true,
    downloadsCount: 1450
  },
  {
    id: 5,
    courseId: 3,
    subjectSlug: 'physics',
    subjectName: 'Physics',
    topicName: 'Mechanics',
    title: 'Classical Mechanics Problem Set: 100 Free-Body Diagram Challenges',
    resourceType: 'worksheet',
    level: 'Secondary Form 3',
    year: 2025,
    fileUrl: '/resources/physics-mechanics-problems.pdf',
    fileSize: '3.5 MB',
    isPremium: false,
    downloadsCount: 2890
  },
  {
    id: 6,
    courseId: 4,
    subjectSlug: 'biology',
    subjectName: 'Biology',
    topicName: 'Cell Biology',
    title: 'Cellular Organelle Ultrastructure & Electron Micrographs Atlas',
    resourceType: 'study_guide',
    level: 'College Biology I',
    year: 2025,
    fileUrl: '/resources/cell-biology-atlas.pdf',
    fileSize: '8.4 MB',
    isPremium: true,
    downloadsCount: 1870
  }
];

export const DEFAULT_LEARNER_PROGRESS: LearnerProgress = {
  userId: 1,
  currentCourse: {
    courseId: 1,
    courseTitle: 'Mastering Linear & Quadratic Equations',
    topicName: 'Algebra Basics',
    lessonNumber: 5,
    lessonTitle: 'Quadratic Equations & Roots',
    lessonId: 1,
    progressPercent: 65
  },
  totalCoursesEnrolled: 4,
  completedLessons: 19,
  totalStudyMinutes: 480,
  averageQuizScore: 84,
  streakDays: 7,
  recentLessons: [
    {
      lessonId: 1,
      lessonTitle: 'Quadratic Equations & Roots',
      subjectSlug: 'mathematics',
      subjectName: 'Mathematics',
      progressPercent: 65,
      lastAccessed: 'Today, 10:30 AM'
    },
    {
      lessonId: 2,
      lessonTitle: 'Chemical Bonding & Electronegativity',
      subjectSlug: 'chemistry',
      subjectName: 'Chemistry',
      progressPercent: 100,
      lastAccessed: 'Yesterday'
    },
    {
      lessonId: 3,
      lessonTitle: 'Newton’s Second Law & Momentum',
      subjectSlug: 'physics',
      subjectName: 'Physics',
      progressPercent: 40,
      lastAccessed: '3 days ago'
    }
  ]
};

interface HeaderProps {
  currentUser: User;
  onSelectRole: (role: UserRole) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSubscriptions: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onNavigate: (view: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onSelectRole,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  cartCount,
  onOpenCart,
  onOpenSubscriptions,
  mobileMenuOpen,
  onToggleMobileMenu,
  onNavigate
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  const notifications = [
    { id: 1, title: 'Quiz Score Recorded', time: '10m ago', text: 'You scored 80% on Quadratic Equations Diagnostic Quiz!' },
    { id: 2, title: 'New Lesson Uploaded', time: '2h ago', text: 'Dr. Kelvin added "VSEPR Geometry & Hybridization" in Chemistry.' },
    { id: 3, title: 'Exam Countdown', time: '1d ago', text: 'KCSE & College STEM Prep mock tests have been published.' }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200/80 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Mobile hamburger & Brand (Mobile only, sidebar has desktop brand) */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-2.5 cursor-pointer lg:hidden"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20">
              S
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                Learn<span className="text-blue-600">Sci</span>
              </span>
            </div>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <form onSubmit={onSearchSubmit} className="flex-1 max-w-xl mx-2">
          <div className="relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search lessons, topics, articles..."
              className="w-full bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-full pl-10 pr-4 py-2 border border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-full w-4 h-4 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>
        </form>

        {/* Right Action Icons & User Control */}
        <div className="flex items-center gap-2 lg:gap-3.5">
          
          {/* Role Switcher Pill (Great for evaluators to switch perspectives) */}
          <div className="relative hidden sm:block">
            <button 
              onClick={() => setShowRoleSelector(!showRoleSelector)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition"
              title="Switch demo persona"
            >
              {currentUser.role === 'learner' && <BookOpen className="w-3.5 h-3.5 text-blue-600" />}
              {currentUser.role === 'teacher' && <GraduationCap className="w-3.5 h-3.5 text-purple-600" />}
              {currentUser.role === 'admin' && <ShieldAlert className="w-3.5 h-3.5 text-emerald-600" />}
              <span className="capitalize">{currentUser.role} View</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleSelector && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-elevated border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Switch Persona
                </div>
                <button 
                  onClick={() => { onSelectRole('learner'); setShowRoleSelector(false); }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-medium"
                >
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Learner (David Mwangi)
                </button>
                <button 
                  onClick={() => { onSelectRole('teacher'); setShowRoleSelector(false); }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-purple-50 text-slate-700 hover:text-purple-700 font-medium"
                >
                  <GraduationCap className="w-4 h-4 text-purple-600" />
                  Teacher (Dr. Kelvin M.)
                </button>
                <button 
                  onClick={() => { onSelectRole('admin'); setShowRoleSelector(false); }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-medium"
                >
                  <ShieldAlert className="w-4 h-4 text-emerald-600" />
                  Administrator (Admin)
                </button>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <button 
            onClick={onOpenCart}
            className="relative p-2.5 rounded-full text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-colors"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-blue-600 text-white rounded-full text-[11px] font-bold flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Notifications Icon with Popup */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-full text-slate-600 hover:text-blue-600 hover:bg-blue-50/80 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-elevated border border-slate-100 p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Notifications</h4>
                  <span className="text-[11px] font-medium text-blue-600 cursor-pointer hover:underline">Mark read</span>
                </div>
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 hover:bg-blue-50/50 transition-colors text-left cursor-pointer">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-slate-800">{n.title}</span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-snug">{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Subscribe CTA Pill */}
          <button 
            onClick={onOpenSubscriptions}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold shadow-md shadow-blue-500/20 hover:opacity-95 transition active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Go Premium</span>
          </button>

          {/* User Profile Avatar with Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-slate-100 transition"
            >
              <img 
                src={currentUser.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250"}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/30"
              />
              <span className="hidden xl:inline text-xs font-semibold text-slate-700 max-w-[100px] truncate">
                {currentUser.name.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-elevated border border-slate-100 py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full capitalize">
                    {currentUser.role}
                  </span>
                </div>
                <div className="py-1">
                  <button 
                    onClick={() => { onNavigate('profile'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    My Profile
                  </button>
                  <button 
                    onClick={() => { onOpenSubscriptions(); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium flex items-center justify-between"
                  >
                    <span>My Subscriptions</span>
                    <span className="text-[10px] bg-purple-100 text-purple-700 font-bold px-1.5 py-0.5 rounded">Active</span>
                  </button>
                  <button 
                    onClick={() => { onNavigate('history'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    Purchase History
                  </button>
                  <button 
                    onClick={() => { onNavigate('settings'); setShowProfileMenu(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                  >
                    Account Settings
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string, payload?: any) => void;
  userRole: UserRole;
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  userRole,
  mobileMenuOpen,
  onCloseMobileMenu
}) => {
  const handleNav = (view: string, payload?: any) => {
    onNavigate(view, payload);
    onCloseMobileMenu();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={onCloseMobileMenu}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Main Sidebar Drawer / Fixed Desktop container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div 
            onClick={() => handleNav('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-500/25 group-hover:scale-105 transition">
              S
            </div>
            <div>
              <div className="font-extrabold text-2xl tracking-tight text-slate-900 leading-none">
                Learn<span className="text-blue-600">Sci</span>
              </div>
              <p className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase mt-1">
                Learn. Understand. Excel.
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          
          {/* SECTION: LEARN */}
          <div>
            <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Learn
            </div>
            <nav className="space-y-0.5 text-sm">
              <button 
                onClick={() => handleNav('home')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'home' 
                    ? 'bg-blue-50 text-blue-700 font-semibold shadow-xs' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Home className="w-4 h-4 text-blue-600" />
                <span>Home</span>
              </button>

              <button 
                onClick={() => handleNav('browse')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'browse' 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Compass className="w-4 h-4 text-indigo-500" />
                <span>Browse Topics</span>
              </button>

              {/* Subject Direct Shortcuts */}
              <div className="pl-3 py-1 space-y-0.5 border-l-2 border-slate-100 ml-4 my-1">
                <button 
                  onClick={() => handleNav('subject', { slug: 'mathematics' })}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0284C7]" />
                    <span>Mathematics</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                </button>

                <button 
                  onClick={() => handleNav('subject', { slug: 'chemistry' })}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-purple-600 hover:bg-purple-50/50 transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#9333EA]" />
                    <span>Chemistry</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                </button>

                <button 
                  onClick={() => handleNav('subject', { slug: 'physics' })}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-orange-600 hover:bg-orange-50/50 transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F97316]" />
                    <span>Physics</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                </button>

                <button 
                  onClick={() => handleNav('subject', { slug: 'biology' })}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50 transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    <span>Biology</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-300" />
                </button>
              </div>

              <button 
                onClick={() => handleNav('articles')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'articles' 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <FileText className="w-4 h-4 text-amber-500" />
                <span>Articles & Blog</span>
              </button>

              <button 
                onClick={() => handleNav('resources')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'resources' 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <FolderDown className="w-4 h-4 text-teal-500" />
                <span>Resources & Notes</span>
              </button>

              <button 
                onClick={() => handleNav('quizzes')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'quizzes' 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <CheckSquare className="w-4 h-4 text-emerald-500" />
                <span>Practice & Quizzes</span>
              </button>

              <button 
                onClick={() => handleNav('my-learning')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'my-learning' 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>My Learning</span>
              </button>
            </nav>
          </div>

          {/* SECTION: TEACH */}
          <div>
            <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Teach
            </div>
            <nav className="space-y-0.5 text-sm">
              <button 
                onClick={() => handleNav('teacher-landing')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'teacher-landing' 
                    ? 'bg-purple-50 text-purple-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-4 h-4 text-purple-600" />
                <span>Become a Teacher</span>
              </button>

              <button 
                onClick={() => handleNav('teacher-dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'teacher-dashboard' 
                    ? 'bg-purple-50 text-purple-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-purple-600" />
                <span>Teacher Dashboard</span>
              </button>

              {userRole === 'admin' && (
                <button 
                  onClick={() => handleNav('admin-dashboard')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                    currentView === 'admin-dashboard' 
                      ? 'bg-emerald-50 text-emerald-700 font-semibold' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Settings className="w-4 h-4 text-emerald-600" />
                  <span>Admin Dashboard</span>
                </button>
              )}
            </nav>
          </div>

          {/* SECTION: ACCOUNT */}
          <div>
            <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Account
            </div>
            <nav className="space-y-0.5 text-sm">
              <button 
                onClick={() => handleNav('profile')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'profile' 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <UserIcon className="w-4 h-4 text-slate-500" />
                <span>My Profile</span>
              </button>

              <button 
                onClick={() => handleNav('subscriptions')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'subscriptions' 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <CreditCard className="w-4 h-4 text-slate-500" />
                <span>My Subscriptions</span>
              </button>

              <button 
                onClick={() => handleNav('bookmarks')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'bookmarks' 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Bookmark className="w-4 h-4 text-slate-500" />
                <span>Bookmarks</span>
              </button>

              <button 
                onClick={() => handleNav('history')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'history' 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <History className="w-4 h-4 text-slate-500" />
                <span>Purchase History</span>
              </button>

              <button 
                onClick={() => handleNav('settings')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-medium transition ${
                  currentView === 'settings' 
                    ? 'bg-blue-50 text-blue-700 font-semibold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Settings className="w-4 h-4 text-slate-500" />
                <span>Settings</span>
              </button>
            </nav>
          </div>

        </div>

        {/* Bottom Support Banner */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60">
          <button 
            onClick={() => handleNav('support')}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/80 hover:border-blue-400 text-xs font-semibold text-slate-700 shadow-xs transition"
          >
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Help & Support</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>
        </div>

      </aside>
    </>
  );
};

interface HeroSectionProps {
  onBrowseLessons: () => void;
  onExploreArticles: () => void;
  onExploreSubject: (slug: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBrowseLessons,
  onExploreArticles,
  onExploreSubject
}) => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-10 lg:p-12 shadow-elevated border border-blue-500/20">
      
      {/* Background Decorative Science Orbs & Subtle Grids */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-purple-500/25 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        
        {/* Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-semibold text-blue-100 mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Accredited Secondary & College STEM Education</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5">
          Explore. Learn. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-200 via-white to-purple-200 bg-clip-text text-transparent">
            Master Science.
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-blue-100/90 font-normal leading-relaxed max-w-2xl mb-8">
          Structured lessons, simplified concepts, better understanding. Connect with expert educators, high-yield revision papers, and interactive problem sets across secondary and college curricula.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <button 
            onClick={onBrowseLessons}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-blue-800 font-bold text-sm shadow-lg shadow-black/15 hover:bg-blue-50 hover:shadow-xl transition-all active:scale-95 group"
          >
            <span>Browse Lessons</span>
            <ArrowRight className="w-4 h-4 text-blue-700 group-hover:translate-x-1 transition-transform" />
          </button>

          <button 
            onClick={onExploreArticles}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-sm transition-all active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-purple-200" />
            <span>Explore Articles</span>
          </button>
        </div>

        {/* Educational STEM Floating Pills */}
        <div className="mt-10 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          
          <div 
            onClick={() => onExploreSubject('mathematics')}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-sm cursor-pointer transition"
          >
            <div className="p-1.5 rounded-lg bg-blue-500/40 text-blue-200">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">Mathematics</div>
              <div className="text-[10px] text-blue-200/80">ax² + bx + c = 0</div>
            </div>
          </div>

          <div 
            onClick={() => onExploreSubject('chemistry')}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-sm cursor-pointer transition"
          >
            <div className="p-1.5 rounded-lg bg-purple-500/40 text-purple-200">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">Chemistry</div>
              <div className="text-[10px] text-purple-200/80">C₆H₁₂O₆ + 6O₂</div>
            </div>
          </div>

          <div 
            onClick={() => onExploreSubject('physics')}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-sm cursor-pointer transition"
          >
            <div className="p-1.5 rounded-lg bg-orange-500/40 text-orange-200">
              <Atom className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">Physics</div>
              <div className="text-[10px] text-orange-200/80">F = ma & E = mc²</div>
            </div>
          </div>

          <div 
            onClick={() => onExploreSubject('biology')}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-sm cursor-pointer transition"
          >
            <div className="p-1.5 rounded-lg bg-emerald-500/40 text-emerald-200">
              <Dna className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">Biology</div>
              <div className="text-[10px] text-emerald-200/80">Double Helix DNA</div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

interface SubjectSectionProps {
  subjects: Subject[];
  onSelectSubject: (slug: string) => void;
  onSelectTopic: (subjectSlug: string, topicSlug: string) => void;
}

export const SubjectSection: React.FC<SubjectSectionProps> = ({
  subjects,
  onSelectSubject,
  onSelectTopic
}) => {
  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator':
        return <Calculator className="w-6 h-6" />;
      case 'FlaskConical':
        return <FlaskConical className="w-6 h-6" />;
      case 'Atom':
        return <Atom className="w-6 h-6" />;
      case 'Dna':
        return <Dna className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
    }
  };

  const getStyleForSubject = (slug: string) => {
    switch (slug) {
      case 'mathematics':
        return {
          cardBorder: 'hover:border-sky-300',
          badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
          iconBg: 'bg-sky-600 text-white shadow-sky-500/20',
          tagHover: 'hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300',
          buttonClass: 'bg-sky-50 text-sky-700 hover:bg-sky-600 hover:text-white',
        };
      case 'chemistry':
        return {
          cardBorder: 'hover:border-purple-300',
          badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
          iconBg: 'bg-purple-600 text-white shadow-purple-500/20',
          tagHover: 'hover:bg-purple-50 hover:text-purple-700 hover:border-purple-300',
          buttonClass: 'bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white',
        };
      case 'physics':
        return {
          cardBorder: 'hover:border-orange-300',
          badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
          iconBg: 'bg-orange-500 text-white shadow-orange-500/20',
          tagHover: 'hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300',
          buttonClass: 'bg-orange-50 text-orange-700 hover:bg-orange-500 hover:text-white',
        };
      case 'biology':
        return {
          cardBorder: 'hover:border-emerald-300',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          iconBg: 'bg-emerald-600 text-white shadow-emerald-500/20',
          tagHover: 'hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300',
          buttonClass: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white',
        };
      default:
        return {
          cardBorder: 'hover:border-blue-300',
          badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
          iconBg: 'bg-blue-600 text-white shadow-blue-500/20',
          tagHover: 'hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300',
          buttonClass: 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white',
        };
    }
  };

  return (
    <section className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Core Disciplines</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore Subjects
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md">
          Secondary school syllabus (Form 1–4, KCSE, IGCSE) and college foundational STEM coursework.
        </p>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {subjects.map((subj) => {
          const style = getStyleForSubject(subj.slug);
          return (
            <div 
              key={subj.id}
              className={`bg-white rounded-2xl p-6 border border-slate-200/90 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between group ${style.cardBorder}`}
            >
              <div>
                {/* Subject Icon + Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${style.iconBg} transition-transform group-hover:scale-105`}>
                    {getSubjectIcon(subj.iconName)}
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${style.badgeBg}`}>
                    {subj.coursesCount} Courses
                  </span>
                </div>

                {/* Subject Name & Tagline */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {subj.name}
                </h3>
                <p className="text-xs font-semibold text-slate-400 mb-2">
                  {subj.tagline}
                </p>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                  {subj.description}
                </p>

                {/* Topics Tag Cloud */}
                <div className="mb-6">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Key Topics:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {subj.topics.slice(0, 5).map((t) => (
                      <button
                        key={t.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTopic(subj.slug, t.slug);
                        }}
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 border border-slate-200/70 transition ${style.tagHover}`}
                      >
                        {t.name}
                      </button>
                    ))}
                    {subj.topics.length > 5 && (
                      <span className="text-[11px] font-medium px-2 py-1 text-slate-400">
                        +{subj.topics.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Explore Button */}
              <button 
                onClick={() => onSelectSubject(subj.slug)}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${style.buttonClass}`}
              >
                <span>Explore {subj.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>
          );
        })}
      </div>

    </section>
  );
};

interface PopularLessonsProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
  onViewFlagshipLesson: () => void;
  onAddToCart: (course: Course) => void;
}

export const PopularLessons: React.FC<PopularLessonsProps> = ({
  courses,
  onSelectCourse,
  onViewFlagshipLesson,
  onAddToCart
}) => {
  const getSubjectBadge = (subjectSlug: string) => {
    switch (subjectSlug) {
      case 'mathematics':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'chemistry':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'physics':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'biology':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <section className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Featured Curriculum</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Popular Lessons & Courses
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Highly rated by over 12,000 secondary and college STEM learners.
        </p>
      </div>

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {courses.slice(0, 4).map((c) => (
          <div 
            key={c.id}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between group"
          >
            {/* Thumbnail Header */}
            <div>
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <img 
                  src={c.thumbnailUrl} 
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Subject Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border shadow-xs ${getSubjectBadge(c.subjectSlug)}`}>
                    {c.subjectSlug}
                  </span>
                </div>

                {/* Free vs Premium Tag */}
                <div className="absolute top-3 right-3">
                  {c.isPremium ? (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-900/80 text-amber-300 backdrop-blur-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Premium
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-xs">
                      Free Access
                    </span>
                  )}
                </div>

                {/* Play hover overlay */}
                <div 
                  onClick={() => {
                    if (c.id === 1) onViewFlagshipLesson();
                    else onSelectCourse(c);
                  }}
                  className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer backdrop-blur-[2px]"
                >
                  <div className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                    <PlayCircle className="w-6 h-6 fill-blue-600 text-white ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
                  <span className="text-slate-600 font-semibold">{c.topicName}</span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-slate-800">{c.rating}</span>
                    <span className="text-slate-400 text-[11px]">({c.reviewCount})</span>
                  </div>
                </div>

                <h3 
                  onClick={() => {
                    if (c.id === 1) onViewFlagshipLesson();
                    else onSelectCourse(c);
                  }}
                  className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer leading-snug mb-2"
                >
                  {c.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {c.description}
                </p>

                {/* Teacher Details */}
                <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100 mb-4">
                  <img 
                    src={c.teacherAvatar} 
                    alt={c.teacherName}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <div className="text-xs">
                    <p className="font-semibold text-slate-700 leading-none">{c.teacherName}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{c.level}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with Price and View Button */}
            <div className="px-5 pb-5 pt-0">
              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Tuition Price</div>
                  <div className="text-base font-extrabold text-slate-900">
                    {c.priceKsh > 0 ? `KSh ${c.priceKsh}` : 'Free'}
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (c.id === 1) onViewFlagshipLesson();
                    else onSelectCourse(c);
                  }}
                  className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition"
                >
                  <span>View Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};

interface ContinueLearningPanelProps {
  progress: LearnerProgress;
  onContinueCurrent: () => void;
  onSelectRecentLesson: (lessonId: number) => void;
  onGoPremium: () => void;
}

export const ContinueLearningPanel: React.FC<ContinueLearningPanelProps> = ({
  progress,
  onContinueCurrent,
  onSelectRecentLesson,
  onGoPremium
}) => {
  const current = progress.currentCourse;

  return (
    <div className="space-y-6">
      
      {/* 1. Continue Learning Main Card */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-2xl p-5 text-white shadow-elevated border border-blue-900/40 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="font-bold text-blue-300 uppercase tracking-wider text-[10px]">
              Continue Learning
            </span>
            <span className="bg-blue-600/60 text-blue-100 px-2 py-0.5 rounded-full text-[10px] font-bold">
              Lesson {current.lessonNumber}
            </span>
          </div>

          <h4 className="text-base font-bold text-white mb-1 leading-snug">
            {current.courseTitle}
          </h4>
          <p className="text-xs text-blue-200/80 mb-4 font-medium">
            {current.topicName} · {current.lessonTitle}
          </p>

          {/* Progress Bar */}
          <div className="space-y-1.5 mb-5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Progress</span>
              <span className="text-white font-bold">{current.progressPercent}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full transition-all duration-500"
                style={{ width: `${current.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={onContinueCurrent}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Resume Lesson</span>
          </button>
        </div>
      </div>

      {/* 2. Key Learner Metric Pills */}
      <div className="grid grid-cols-2 gap-3">
        
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-soft">
          <div className="flex items-center gap-2 text-amber-500 mb-1">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span className="text-[11px] font-bold uppercase text-slate-400">Streak</span>
          </div>
          <div className="text-xl font-black text-slate-900">
            {progress.streakDays} Days
          </div>
          <p className="text-[10px] text-emerald-600 font-medium mt-0.5">Top 5% learner</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-soft">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Award className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase text-slate-400">Avg Quiz</span>
          </div>
          <div className="text-xl font-black text-slate-900">
            {progress.averageQuizScore}%
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-0.5">Across 8 quizzes</p>
        </div>

      </div>

      {/* 3. Recent Lessons List */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Recently Viewed
          </h4>
          <span className="text-[10px] font-semibold text-slate-400">3 history</span>
        </div>

        <div className="space-y-2.5">
          {progress.recentLessons.map((l) => (
            <div 
              key={l.lessonId}
              onClick={() => onSelectRecentLesson(l.lessonId)}
              className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200/60 transition cursor-pointer flex items-center justify-between"
            >
              <div className="text-left pr-2">
                <p className="text-xs font-bold text-slate-800 line-clamp-1">
                  {l.lessonTitle}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                  <span className="font-semibold text-blue-600 capitalize">{l.subjectName}</span>
                  <span>•</span>
                  <span>{l.lastAccessed}</span>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="text-[11px] font-extrabold text-slate-700">
                  {l.progressPercent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Upgrade Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-blue-50 border border-purple-200/60 text-left">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-xs font-bold text-purple-900">Unlock Full Access</span>
        </div>
        <p className="text-xs text-slate-600 mb-3 leading-snug">
          Access all 2,000+ past exam papers, teacher Q&A, and advanced college modules.
        </p>
        <button 
          onClick={onGoPremium}
          className="w-full py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition"
        >
          View Plans (from KSh 499)
        </button>
      </div>

    </div>
  );
};

interface LessonViewProps {
  lesson: Lesson;
  onBack: () => void;
  onLaunchQuiz: (quizId: number) => void;
  onDownloadResource: (resource: Resource) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  onBack,
  onLaunchQuiz,
  onDownloadResource
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'video' | 'resources' | 'practice'>('content');

  // Interactive Quadratic Equation Solver Widget state
  const [coeffA, setCoeffA] = useState<number>(1);
  const [coeffB, setCoeffB] = useState<number>(-5);
  const [coeffC, setCoeffC] = useState<number>(6);

  // Compute roots and discriminant
  const discriminant = (coeffB * coeffB) - (4 * coeffA * coeffC);
  let rootsResult = '';
  if (coeffA === 0) {
    rootsResult = 'Coefficient "a" cannot be 0 in a quadratic equation!';
  } else if (discriminant > 0) {
    const r1 = ((-coeffB + Math.sqrt(discriminant)) / (2 * coeffA)).toFixed(2);
    const r2 = ((-coeffB - Math.sqrt(discriminant)) / (2 * coeffA)).toFixed(2);
    rootsResult = `Two real distinct roots: x₁ = ${r1},  x₂ = ${r2}`;
  } else if (discriminant === 0) {
    const r = (-coeffB / (2 * coeffA)).toFixed(2);
    rootsResult = `One repeated real root: x = ${r}`;
  } else {
    const realPart = (-coeffB / (2 * coeffA)).toFixed(2);
    const imagPart = (Math.sqrt(-discriminant) / (2 * coeffA)).toFixed(2);
    rootsResult = `Two complex roots: x = ${realPart} ± ${imagPart}i`;
  }

  // Interactive Practice Questions quick check
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, boolean>>({});
  const togglePracticeReveal = (idx: number) => {
    setPracticeAnswers(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* Top Breadcrumb & Action bar */}
      <div className="flex items-center justify-between gap-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Curriculum</span>
        </button>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition ${
              isBookmarked 
                ? 'bg-amber-50 text-amber-700 border-amber-300' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          <button 
            onClick={() => alert("Link copied to clipboard!")}
            className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-slate-50 text-xs"
            title="Share Lesson"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Lesson Banner Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-sky-100 text-sky-800">
            {lesson.subjectName}
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
            {lesson.topicName}
          </span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-600">
            Lesson {lesson.orderIndex} of 8
          </span>
          <span className="text-xs font-semibold text-slate-400 ml-auto">
            ⏱ {lesson.durationMinutes} mins study time
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          {lesson.title}
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mb-6">
          {lesson.introduction}
        </p>

        {/* Teacher Attribution Row */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <img 
              src={lesson.teacherAvatar} 
              alt={lesson.teacherName}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/20"
            />
            <div>
              <p className="text-sm font-bold text-slate-900">{lesson.teacherName}</p>
              <p className="text-xs text-slate-400">{lesson.teacherTitle}</p>
            </div>
          </div>

          <button 
            onClick={() => onLaunchQuiz(lesson.quizId || 1)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 active:scale-95 transition"
          >
            <CheckSquare className="w-4 h-4" />
            <span>Take Graded Quiz</span>
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-slate-200 space-x-6 text-sm font-bold">
        <button 
          onClick={() => setActiveTab('content')}
          className={`pb-3 px-1 border-b-2 transition ${
            activeTab === 'content' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Lesson Text & Concepts (9 Sections)
        </button>
        <button 
          onClick={() => setActiveTab('video')}
          className={`pb-3 px-1 border-b-2 transition ${
            activeTab === 'video' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Video Classroom ({lesson.videoDuration})
        </button>
        <button 
          onClick={() => setActiveTab('practice')}
          className={`pb-3 px-1 border-b-2 transition ${
            activeTab === 'practice' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Interactive Equation Solver
        </button>
        <button 
          onClick={() => setActiveTab('resources')}
          className={`pb-3 px-1 border-b-2 transition ${
            activeTab === 'resources' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Downloads ({lesson.resources.length})
        </button>
      </div>

      {/* TAB 1: Structured Content (9 Sections) */}
      {activeTab === 'content' && (
        <div className="space-y-8">
          
          {/* Objectives Card */}
          <div className="bg-blue-50/70 rounded-2xl p-6 border border-blue-200/60">
            <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Core Learning Objectives</span>
            </h3>
            <ul className="space-y-2.5">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Render 9 Content Sections */}
          <div className="space-y-6">
            {lesson.sections.map((section) => (
              <div 
                key={section.id} 
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4"
              >
                <h3 className="text-xl font-bold text-slate-900">
                  {section.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {section.content}
                </p>

                {/* Mathematical Formula Callout */}
                {section.formula && (
                  <div className="my-4 p-5 rounded-2xl bg-slate-900 text-white font-mono text-center shadow-inner">
                    <div className="text-lg sm:text-2xl font-bold text-sky-400">
                      {section.formula}
                    </div>
                    {section.formulaExplanation && (
                      <p className="text-xs text-slate-400 mt-2 font-sans">
                        {section.formulaExplanation}
                      </p>
                    )}
                  </div>
                )}

                {/* Callout box (Tip, Warning, Key Concept) */}
                {section.callout && (
                  <div className={`p-4 rounded-xl border flex items-start gap-3 ${
                    section.callout.type === 'warning' 
                      ? 'bg-amber-50 border-amber-200 text-amber-900' 
                      : 'bg-indigo-50 border-indigo-200 text-indigo-900'
                  }`}>
                    {section.callout.type === 'warning' ? (
                      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Lightbulb className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="text-xs leading-relaxed whitespace-pre-line font-medium">
                      {section.callout.text}
                    </div>
                  </div>
                )}

                {/* Worked Example */}
                {section.workedExample && (
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-purple-700">
                      Step-by-Step Worked Demonstration:
                    </div>
                    <div className="text-sm font-bold text-slate-800">
                      {section.workedExample.problem}
                    </div>
                    <div className="space-y-1.5 pl-2 border-l-2 border-purple-300">
                      {section.workedExample.steps.map((st, i) => (
                        <div key={i} className="text-xs text-slate-600">
                          <strong className="text-slate-800">Step {i + 1}:</strong> {st}
                        </div>
                      ))}
                    </div>
                    <div className="p-3 bg-purple-100/70 text-purple-900 rounded-xl text-xs font-bold">
                      Final Result: {section.workedExample.answer}
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>

          {/* Bottom Action Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-elevated">
            <div>
              <h4 className="text-lg font-bold">Ready to benchmark your knowledge?</h4>
              <p className="text-xs text-blue-100">Take the 5-question mastery quiz to update your student transcript.</p>
            </div>
            <button 
              onClick={() => onLaunchQuiz(lesson.quizId || 1)}
              className="px-6 py-3 rounded-xl bg-white text-blue-700 font-bold text-xs hover:bg-blue-50 transition shadow-md whitespace-nowrap"
            >
              Start Lesson Quiz
            </button>
          </div>

        </div>
      )}

      {/* TAB 2: Video Classroom */}
      {activeTab === 'video' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 shadow-elevated">
            <iframe 
              src={lesson.videoUrl} 
              title={lesson.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">Video Timestamps & Key Moments</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span className="font-semibold text-slate-700">00:00 — Introduction & Definition</span>
                <span className="font-bold text-blue-600">00:00</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span className="font-semibold text-slate-700">03:45 — Factoring Quadratics</span>
                <span className="font-bold text-blue-600">03:45</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span className="font-semibold text-slate-700">08:12 — Completing the Square</span>
                <span className="font-bold text-blue-600">08:12</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span className="font-semibold text-slate-700">13:30 — The Quadratic Formula & Discriminant</span>
                <span className="font-bold text-blue-600">13:30</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Interactive Equation Solver */}
      {activeTab === 'practice' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="p-2.5 rounded-2xl bg-blue-100 text-blue-600">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Interactive Quadratic Root Solver & Discriminant Visualizer
              </h3>
              <p className="text-xs text-slate-500">
                Adjust polynomial coefficients a, b, and c to compute roots and observe discriminant behavior in real time.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Coefficient a (ax²):</label>
              <input 
                type="number"
                value={coeffA}
                onChange={(e) => setCoeffA(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Coefficient b (bx):</label>
              <input 
                type="number"
                value={coeffB}
                onChange={(e) => setCoeffB(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Constant c:</label>
              <input 
                type="number"
                value={coeffC}
                onChange={(e) => setCoeffC(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Equation Display */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white text-center space-y-3">
            <div className="text-xs uppercase font-bold text-slate-400">Resulting Equation:</div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-blue-400">
              {coeffA}x² {coeffB >= 0 ? `+ ${coeffB}x` : `- ${Math.abs(coeffB)}x`} {coeffC >= 0 ? `+ ${coeffC}` : `- ${Math.abs(coeffC)}`} = 0
            </div>

            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
              <div>
                Discriminant Δ = b² - 4ac = <strong className="text-amber-400">{discriminant}</strong>
              </div>
              <div>
                Parabola orientation: <strong className="text-emerald-400">{coeffA > 0 ? 'Opens Upwards (Min)' : 'Opens Downwards (Max)'}</strong>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 text-sm font-bold text-white mt-2">
              {rootsResult}
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2 pt-2">
            <span className="text-xs font-bold text-slate-500">Test Preset Problems:</span>
            <button 
              onClick={() => { setCoeffA(1); setCoeffB(-5); setCoeffC(6); }}
              className="text-xs font-medium px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
            >
              x² - 5x + 6 = 0 (Roots 2, 3)
            </button>
            <button 
              onClick={() => { setCoeffA(1); setCoeffB(-4); setCoeffC(4); }}
              className="text-xs font-medium px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
            >
              x² - 4x + 4 = 0 (Double Root 2)
            </button>
            <button 
              onClick={() => { setCoeffA(1); setCoeffB(0); setCoeffC(9); }}
              className="text-xs font-medium px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 rounded-lg"
            >
              x² + 9 = 0 (Complex ±3i)
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: Downloadable Resources */}
      {activeTab === 'resources' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Lesson Files & Study Guides</h3>
          <div className="space-y-3">
            {lesson.resources.map((r) => (
              <div 
                key={r.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                    PDF
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{r.title}</h4>
                    <p className="text-xs text-slate-400">
                      {r.fileSize} · {r.downloadsCount} downloads · {r.level}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => onDownloadResource(r)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-blue-500 text-slate-700 hover:text-blue-600 font-bold text-xs shadow-xs transition"
                >
                  <FolderDown className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Prev / Next Lesson Navigation Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous: Linear Equations</span>
        </button>

        <button 
          onClick={() => onLaunchQuiz(lesson.quizId || 1)}
          className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition"
        >
          <span>Next: Complete Quiz & Advance</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};

interface QuizEngineProps {
  quiz: Quiz;
  onBackToLesson: () => void;
  onRecordAttempt?: (
    score: number,
    answers: Record<number, string>,
    timeTakenSeconds: number
  ) => void | Promise<void>;
}

export const QuizEngine: React.FC<QuizEngineProps> = ({
  quiz,
  onBackToLesson,
  onRecordAttempt
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimitMinutes * 60);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelectAnswer = (questionId: number, answer: string) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    // calculate score
    let correct = 0;
    quiz.questions.forEach(q => {
      if ((userAnswers[q.id] || '').trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
        correct++;
      }
    });
    const scorePercent = Math.round((correct / quiz.questions.length) * 100);
    if (onRecordAttempt) {
      await onRecordAttempt(scorePercent, userAnswers, quiz.timeLimitMinutes * 60 - timeLeft);
    }
  };

  const handleRetake = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    setTimeLeft(quiz.timeLimitMinutes * 60);
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const answeredCount = Object.keys(userAnswers).length;

  // Calculate score if submitted
  let correctCount = 0;
  if (isSubmitted) {
    quiz.questions.forEach(q => {
      if ((userAnswers[q.id] || '').trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
        correctCount++;
      }
    });
  }
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const passed = scorePercent >= quiz.passingScore;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Quiz Top Status Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-soft flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {quiz.title}
          </h2>
          <p className="text-xs text-slate-400">
            {answeredCount} of {totalQuestions} answered · Passing mark: {quiz.passingScore}%
          </p>
        </div>

        {/* Timer */}
        <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold ${
          timeLeft < 60 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-700'
        }`}>
          <Clock className="w-4 h-4" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress pill nav */}
      <div className="flex items-center gap-1.5">
        {quiz.questions.map((q, idx) => {
          const isAnswered = !!userAnswers[q.id];
          const isCurrent = idx === currentQuestionIndex;
          return (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(idx)}
              className={`flex-1 h-2 rounded-full transition-all ${
                isCurrent 
                  ? 'bg-blue-600 ring-2 ring-blue-300' 
                  : isAnswered 
                    ? 'bg-blue-300' 
                    : 'bg-slate-200'
              }`}
              title={`Question ${idx + 1}`}
            />
          );
        })}
      </div>

      {/* MAIN QUESTION CARD or RESULTS SUMMARY */}
      {!isSubmitted ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
            <span className="capitalize">{currentQuestion.questionType.replace('_', ' ')}</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {currentQuestion.prompt}
          </h3>

          {/* Options for Multiple Choice and True/False */}
          {(currentQuestion.questionType === 'multiple_choice' || currentQuestion.questionType === 'true_false') && (
            <div className="space-y-3">
              {currentQuestion.options?.map((option, optIdx) => {
                const isSelected = userAnswers[currentQuestion.id] === option;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectAnswer(currentQuestion.id, option)}
                    className={`w-full text-left p-4 rounded-2xl border text-sm font-semibold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-500 text-blue-900 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{option}</span>
                    <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                      isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                    }`}>
                      {isSelected ? '✓' : ''}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Numerical Input Question */}
          {currentQuestion.questionType === 'numerical' && (
            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-600">Enter your numeric answer:</label>
              <input 
                type="text"
                value={userAnswers[currentQuestion.id] || ''}
                onChange={(e) => handleSelectAnswer(currentQuestion.id, e.target.value)}
                placeholder="Type numeric answer (e.g. 0, -4, 2.5)"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          )}

          {/* Navigation Bottom Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button 
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 disabled:opacity-30 hover:bg-slate-100 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            {currentQuestionIndex < totalQuestions - 1 ? (
              <button 
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 active:scale-95 transition"
              >
                <span>Next Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 active:scale-95 transition"
              >
                <span>Submit Quiz</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      ) : (
        /* RESULTS BREAKDOWN VIEW */
        <div className="space-y-6">
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft text-center space-y-4">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto text-3xl font-black ${
              passed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
            }`}>
              {passed ? '🏆' : '📝'}
            </div>

            <h3 className="text-2xl font-black text-slate-900">
              {passed ? 'Congratulations! Quiz Passed' : 'Keep Practicing! Review Errors'}
            </h3>

            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You scored <strong className="text-slate-800">{correctCount} out of {totalQuestions}</strong> correct ({scorePercent}%).
              {passed ? ' Your mastery record has been stored in your learning progress.' : ' Review the explanations below and try again.'}
            </p>

            <div className="flex justify-center gap-3 pt-2">
              <button 
                onClick={handleRetake}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>

              <button 
                onClick={onBackToLesson}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20"
              >
                <span>Return to Lesson</span>
              </button>
            </div>
          </div>

          {/* Detailed Question Review Cards */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 px-1">
              Detailed Question Explanations
            </h4>

            {quiz.questions.map((q, idx) => {
              const userAns = userAnswers[q.id];
              const isCorrect = (userAns || '').trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

              return (
                <div 
                  key={q.id}
                  className={`bg-white rounded-2xl p-6 border shadow-soft space-y-3 ${
                    isCorrect ? 'border-emerald-200' : 'border-red-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-slate-400 uppercase">Question {idx + 1}</span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                      isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-slate-900">{q.prompt}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Your Submission:</span>
                      <span className={`font-semibold ${isCorrect ? 'text-emerald-700' : 'text-red-600'}`}>
                        {userAns || '(None entered)'}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100">
                      <span className="text-emerald-700 block text-[10px] uppercase font-bold">Official Correct Answer:</span>
                      <span className="font-bold text-emerald-900">{q.correctAnswer}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-600 leading-relaxed border border-slate-100">
                    <strong className="text-slate-800">Teacher's Explanation:</strong> {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
};

interface SearchViewProps {
  initialQuery: string;
  courses: Course[];
  articles: Article[];
  resources: Resource[];
  subjects: Subject[];
  onSelectCourse: (c: Course) => void;
  onSelectArticle: (a: Article) => void;
  onSelectResource: (r: Resource) => void;
  onViewLesson: () => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  initialQuery,
  courses,
  articles,
  resources,
  subjects,
  onSelectCourse,
  onSelectArticle,
  onSelectResource,
  onViewLesson
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedContentType, setSelectedContentType] = useState<string>('all'); // all | course | article | resource
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState<string>('all'); // all | free | premium

  // Multi-type search indexing
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    // 1. Filter Courses
    const matchedCourses = courses
      .filter((c) => {
        const matchesQuery = !q || 
          c.title.toLowerCase().includes(q) || 
          c.description.toLowerCase().includes(q) || 
          c.topicName.toLowerCase().includes(q) ||
          c.teacherName.toLowerCase().includes(q);
        const matchesSubj = selectedSubject === 'all' || c.subjectSlug === selectedSubject;
        const matchesDiff = selectedDifficulty === 'all' || c.difficulty === selectedDifficulty;
        const matchesPrice = selectedPriceFilter === 'all' || (selectedPriceFilter === 'free' ? !c.isPremium : c.isPremium);
        const matchesType = selectedContentType === 'all' || selectedContentType === 'course';
        return matchesQuery && matchesSubj && matchesDiff && matchesPrice && matchesType;
      })
      .map(c => ({ ...c, itemType: 'course' as const }));

    // 2. Filter Articles
    const matchedArticles = articles
      .filter((a) => {
        const matchesQuery = !q || 
          a.title.toLowerCase().includes(q) || 
          a.shortDescription.toLowerCase().includes(q) ||
          a.authorName.toLowerCase().includes(q) ||
          a.tags.some(t => t.toLowerCase().includes(q));
        const matchesSubj = selectedSubject === 'all' || a.subjectSlug === selectedSubject;
        const matchesPrice = selectedPriceFilter === 'all' || (selectedPriceFilter === 'free' ? !a.isPremium : a.isPremium);
        const matchesType = selectedContentType === 'all' || selectedContentType === 'article';
        return matchesQuery && matchesSubj && matchesPrice && matchesType;
      })
      .map(a => ({ ...a, itemType: 'article' as const }));

    // 3. Filter Resources
    const matchedResources = resources
      .filter((r) => {
        const matchesQuery = !q || 
          r.title.toLowerCase().includes(q) || 
          r.resourceType.toLowerCase().includes(q);
        const matchesSubj = selectedSubject === 'all' || r.subjectSlug === selectedSubject;
        const matchesPrice = selectedPriceFilter === 'all' || (selectedPriceFilter === 'free' ? !r.isPremium : r.isPremium);
        const matchesType = selectedContentType === 'all' || selectedContentType === 'resource';
        return matchesQuery && matchesSubj && matchesPrice && matchesType;
      })
      .map(r => ({ ...r, itemType: 'resource' as const }));

    return {
      courses: matchedCourses,
      articles: matchedArticles,
      resources: matchedResources,
      totalCount: matchedCourses.length + matchedArticles.length + matchedResources.length
    };
  }, [query, selectedSubject, selectedContentType, selectedDifficulty, selectedPriceFilter, courses, articles, resources]);

  return (
    <div className="space-y-6">
      
      {/* Search Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Global Knowledge Discovery</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 mb-4">
            Search Lessons, Topics & Articles
          </h1>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Quadratic equations, Organic reactions, Newton's laws, Cell division..."
              className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 rounded-2xl pl-12 pr-4 py-3.5 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-sm font-medium outline-none transition"
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs bg-slate-200 hover:bg-slate-300 rounded-full w-5 h-5 flex items-center justify-center text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Multi-facet Filter Pills */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs">
          
          <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase text-[10px] mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          {/* Subject Filter */}
          <select 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-slate-100 hover:bg-slate-200/70 text-slate-700 font-semibold rounded-xl px-3 py-1.5 border-none outline-none cursor-pointer"
          >
            <option value="all">All Subjects</option>
            <option value="mathematics">Mathematics</option>
            <option value="chemistry">Chemistry</option>
            <option value="physics">Physics</option>
            <option value="biology">Biology</option>
          </select>

          {/* Content Type Filter */}
          <select 
            value={selectedContentType} 
            onChange={(e) => setSelectedContentType(e.target.value)}
            className="bg-slate-100 hover:bg-slate-200/70 text-slate-700 font-semibold rounded-xl px-3 py-1.5 border-none outline-none cursor-pointer"
          >
            <option value="all">All Content Types</option>
            <option value="course">Lessons & Courses</option>
            <option value="article">Articles & Guides</option>
            <option value="resource">Downloadable Notes</option>
          </select>

          {/* Difficulty Filter */}
          <select 
            value={selectedDifficulty} 
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-slate-100 hover:bg-slate-200/70 text-slate-700 font-semibold rounded-xl px-3 py-1.5 border-none outline-none cursor-pointer"
          >
            <option value="all">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Free vs Premium */}
          <select 
            value={selectedPriceFilter} 
            onChange={(e) => setSelectedPriceFilter(e.target.value)}
            className="bg-slate-100 hover:bg-slate-200/70 text-slate-700 font-semibold rounded-xl px-3 py-1.5 border-none outline-none cursor-pointer"
          >
            <option value="all">Free & Premium</option>
            <option value="free">Free Only</option>
            <option value="premium">Premium Only</option>
          </select>

          {/* Reset Filters */}
          {(selectedSubject !== 'all' || selectedContentType !== 'all' || selectedDifficulty !== 'all' || selectedPriceFilter !== 'all') && (
            <button 
              onClick={() => {
                setSelectedSubject('all');
                setSelectedContentType('all');
                setSelectedDifficulty('all');
                setSelectedPriceFilter('all');
              }}
              className="text-blue-600 font-bold hover:underline ml-auto"
            >
              Reset Filters
            </button>
          )}

        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>Found <strong className="text-slate-800">{results.totalCount}</strong> results {query && `for "${query}"`}</span>
      </div>

      {/* Empty State */}
      {results.totalCount === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-soft">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">No matching results found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-5">
            Try searching for broader keywords like "algebra", "chemical bonds", "newton", or "mitochondria".
          </p>
          <button 
            onClick={() => { setQuery(''); setSelectedSubject('all'); }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Result Cards Grid */}
      <div className="space-y-6">
        
        {/* Matched Courses */}
        {results.courses.length > 0 && (
          <div>
            <div className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3 px-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Lessons & Courses ({results.courses.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.courses.map((c) => (
                <div 
                  key={c.id} 
                  onClick={() => {
                    if (c.id === 1) onViewLesson();
                    else onSelectCourse(c);
                  }}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft hover:shadow-elevated transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-blue-50 text-blue-700">
                        {c.subjectSlug}
                      </span>
                      <span className="text-xs font-extrabold text-slate-900">
                        {c.priceKsh > 0 ? `KSh ${c.priceKsh}` : 'Free'}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">
                      {c.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                      {c.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{c.teacherName}</span>
                    <span className="font-semibold text-blue-600 flex items-center gap-1">
                      Study Now <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Matched Articles */}
        {results.articles.length > 0 && (
          <div>
            <div className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3 px-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-500" />
              <span>Articles & Blog ({results.articles.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.articles.map((a) => (
                <div 
                  key={a.id} 
                  onClick={() => onSelectArticle(a)}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft hover:shadow-elevated transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-amber-50 text-amber-700">
                        {a.subjectSlug}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">{a.readingTimeMinutes} min read</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1 mb-1">
                      {a.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                      {a.shortDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>By {a.authorName}</span>
                    <span className="font-semibold text-amber-600 flex items-center gap-1">
                      Read Article <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Matched Resources */}
        {results.resources.length > 0 && (
          <div>
            <div className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-3 px-1 flex items-center gap-1.5">
              <FolderDown className="w-3.5 h-3.5 text-teal-600" />
              <span>Downloadable Resources ({results.resources.length})</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.resources.map((r) => (
                <div 
                  key={r.id} 
                  onClick={() => onSelectResource(r)}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft hover:shadow-elevated transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-teal-50 text-teal-700">
                        {r.resourceType.replace('_', ' ')}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">{r.fileSize}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2 mb-1">
                      {r.title}
                    </h4>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">{r.level}</span>
                    <span className="font-semibold text-teal-600 flex items-center gap-1">
                      Download PDF <FolderDown className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

interface ArticlesViewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  selectedArticle: Article | null;
  onBackToList: () => void;
}

export const ArticlesView: React.FC<ArticlesViewProps> = ({
  articles,
  onSelectArticle,
  selectedArticle,
  onBackToList
}) => {
  const [activeSubjectFilter, setActiveSubjectFilter] = useState<string>('all');

  const filteredArticles = activeSubjectFilter === 'all'
    ? articles
    : articles.filter(a => a.subjectSlug === activeSubjectFilter);

  // Single Article Reader View
  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-16">
        
        {/* Navigation & Controls */}
        <div className="flex items-center justify-between">
          <button 
            onClick={onBackToList}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => alert("Article bookmarked to your account profile!")}
              className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-amber-500 transition"
              title="Bookmark Article"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button 
              onClick={() => alert("Article share link copied to clipboard!")}
              className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-blue-600 transition"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Article Cover Card */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft">
          <div className="relative aspect-[21/9] bg-slate-900">
            <img 
              src={selectedArticle.featuredImage} 
              alt={selectedArticle.title}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-600/90 backdrop-blur-sm">
                {selectedArticle.subjectName}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-6">
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {selectedArticle.title}
            </h1>

            {/* Author Attribution Meta */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedArticle.authorAvatar} 
                  alt={selectedArticle.authorName}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                />
                <div>
                  <p className="text-sm font-bold text-slate-900">{selectedArticle.authorName}</p>
                  <p className="text-xs text-slate-400">{selectedArticle.authorTitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {selectedArticle.readingTimeMinutes} min read
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  August 2026
                </span>
              </div>
            </div>

            {/* Content Body formatted markdown simulation */}
            <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-serif">
              {selectedArticle.contentMarkdown}
            </div>

            {/* Tags */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase mr-1">Tags:</span>
              {selectedArticle.tags.map((t, idx) => (
                <span key={idx} className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 text-slate-600">
                  #{t}
                </span>
              ))}
            </div>

          </div>
        </div>

        {/* Related Articles Strip */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Related STEM Publications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {articles.filter(a => a.id !== selectedArticle.id).slice(0, 2).map((a) => (
              <div 
                key={a.id} 
                onClick={() => onSelectArticle(a)}
                className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft hover:shadow-elevated transition cursor-pointer flex gap-4 items-center"
              >
                <img 
                  src={a.featuredImage} 
                  alt={a.title} 
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                />
                <div className="text-left">
                  <span className="text-[10px] font-bold uppercase text-blue-600">{a.subjectName}</span>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2 mt-0.5">{a.title}</h4>
                  <span className="text-[10px] text-slate-400 mt-1 block">{a.readingTimeMinutes} min read</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    );
  }

  // Articles Hub Listing View
  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Editorial & Insights</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Latest STEM Articles & Notes
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Deep-dive conceptual breakdowns authored by certified educators and university fellows.
          </p>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex flex-wrap gap-1.5 text-xs">
          {['all', 'mathematics', 'chemistry', 'physics', 'biology'].map((s) => (
            <button
              key={s}
              onClick={() => setActiveSubjectFilter(s)}
              className={`px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider text-[11px] transition ${
                activeSubjectFilter === s
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map((article) => (
          <div 
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <img 
                  src={article.featuredImage} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-bold px-3 py-1 rounded-full uppercase bg-slate-900/80 text-white backdrop-blur-md shadow-xs">
                    {article.subjectName}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readingTimeMinutes} min read
                  </span>
                  <span>•</span>
                  <span>{article.viewsCount} reads</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
                  {article.shortDescription}
                </p>

                <div className="flex items-center gap-2.5 pt-4 border-t border-slate-100">
                  <img 
                    src={article.authorAvatar} 
                    alt={article.authorName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="text-xs">
                    <p className="font-bold text-slate-800 leading-none">{article.authorName}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{article.authorTitle}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-0">
              <div className="flex items-center justify-between text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                <span>Read Full Breakdown</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

interface ResourcesViewProps {
  resources: Resource[];
  onDownload: (resource: Resource) => void;
  onGoPremium: () => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  resources,
  onDownload,
  onGoPremium
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filtered = resources.filter(r => {
    const matchesSubj = selectedSubject === 'all' || r.subjectSlug === selectedSubject;
    const matchesType = selectedType === 'all' || r.resourceType === selectedType;
    const matchesSearch = !searchTerm || r.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubj && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Revision Library</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Downloadable Notes & Exam Past Papers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Curated KCSE revision packets, university STEM problem sets, and formula cheat sheets.
          </p>
        </div>

        <button 
          onClick={onGoPremium}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-blue-600 text-white font-bold text-xs shadow-md shadow-teal-500/20 active:scale-95 transition"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Unlock All Premium Packs</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          
          <div className="flex items-center gap-1 text-slate-400 font-bold uppercase text-[10px]">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          <select 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-slate-100 font-semibold text-slate-700 px-3 py-1.5 rounded-xl outline-none border-none cursor-pointer"
          >
            <option value="all">All Subjects</option>
            <option value="mathematics">Mathematics</option>
            <option value="chemistry">Chemistry</option>
            <option value="physics">Physics</option>
            <option value="biology">Biology</option>
          </select>

          <select 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-100 font-semibold text-slate-700 px-3 py-1.5 rounded-xl outline-none border-none cursor-pointer"
          >
            <option value="all">All Document Types</option>
            <option value="pdf">PDF Revision Notes</option>
            <option value="worksheet">Practice Worksheets</option>
            <option value="past_paper">KCSE / College Past Papers</option>
            <option value="study_guide">Comprehensive Study Guides</option>
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter files..."
            className="w-full bg-slate-50 text-xs text-slate-800 pl-9 pr-3 py-2 rounded-xl border border-slate-200 outline-none focus:bg-white focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Resources Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((resource) => (
          <div 
            key={resource.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full uppercase bg-slate-100 text-slate-700">
                  {resource.resourceType.replace('_', ' ')}
                </span>
                
                {resource.isPremium ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Premium
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Free
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2 leading-snug mb-2">
                {resource.title}
              </h4>

              <div className="text-xs text-slate-400 space-y-1 mb-4">
                <p>Level: <strong className="text-slate-700">{resource.level}</strong></p>
                <p>Curriculum Year: <strong className="text-slate-700">{resource.year}</strong></p>
                <p>File Size: <strong className="text-slate-700">{resource.fileSize}</strong></p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">
                {resource.downloadsCount.toLocaleString()} downloads
              </span>

              <button 
                onClick={() => onDownload(resource)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

interface TeacherDashboardProps {
  teacher: TeacherProfile;
  courses: Course[];
  onCreateCourse: (courseData: any) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  teacher,
  courses,
  onCreateCourse
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'create' | 'learners' | 'earnings'>('overview');
  
  // New Course Form state
  const [title, setTitle] = useState('');
  const [subjectSlug, setSubjectSlug] = useState('chemistry');
  const [topicName, setTopicName] = useState('Organic Chemistry');
  const [priceKsh, setPriceKsh] = useState(250);
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('Secondary');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmitCourse = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateCourse({
      title,
      subjectSlug,
      topicName,
      priceKsh: Number(priceKsh),
      description,
      level,
      isPremium: priceKsh > 0,
      thumbnailUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&q=80&w=600'
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setActiveTab('courses');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      
      {/* Teacher Profile Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-elevated border border-purple-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img 
            src={teacher.avatarUrl} 
            alt={teacher.title}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-purple-500/30 shadow-lg"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/40 text-purple-200">
                Teacher Dashboard
              </span>
              <span className="text-xs text-purple-300 font-semibold">{teacher.experienceYears} Years Exp</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{teacher.title}</h1>
            <p className="text-xs sm:text-sm text-purple-200/90">{teacher.qualifications}</p>
          </div>
        </div>

        <button 
          onClick={() => setActiveTab('create')}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs shadow-lg shadow-purple-500/25 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Course</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 text-sm font-bold overflow-x-auto">
        <button 
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-1 border-b-2 whitespace-nowrap transition ${
            activeTab === 'overview' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Overview & Metrics
        </button>
        <button 
          onClick={() => setActiveTab('courses')}
          className={`pb-3 px-1 border-b-2 whitespace-nowrap transition ${
            activeTab === 'courses' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          My Courses ({courses.length})
        </button>
        <button 
          onClick={() => setActiveTab('create')}
          className={`pb-3 px-1 border-b-2 whitespace-nowrap transition ${
            activeTab === 'create' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Publish Course / Lesson
        </button>
        <button 
          onClick={() => setActiveTab('learners')}
          className={`pb-3 px-1 border-b-2 whitespace-nowrap transition ${
            activeTab === 'learners' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Learner Progress Monitor
        </button>
        <button 
          onClick={() => setActiveTab('earnings')}
          className={`pb-3 px-1 border-b-2 whitespace-nowrap transition ${
            activeTab === 'earnings' ? 'border-purple-600 text-purple-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Earnings & Royalties
        </button>
      </div>

      {/* TAB 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase">Enrolled Students</span>
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">2,840</div>
              <span className="text-[11px] text-emerald-600 font-semibold">+14% this month</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase">Active Courses</span>
                <BookOpen className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">{courses.length}</div>
              <span className="text-[11px] text-slate-400">Published live</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase">Total Royalties</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">
                KSh {teacher.earningsKsh.toLocaleString()}
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold">Processed via M-Pesa</span>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold uppercase">Learner Rating</span>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-slate-900">{teacher.rating} / 5.0</div>
              <span className="text-[11px] text-slate-400">{teacher.reviewCount} reviews</span>
            </div>

          </div>

          {/* Teacher Bio & Subjects */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft">
            <h3 className="text-base font-bold text-slate-900 mb-2">Educator Profile Summary</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              {teacher.biography}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Teaching:</span>
              {teacher.subjectsTaught.map((s, idx) => (
                <span key={idx} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Courses */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-soft p-4 flex flex-col justify-between">
              <div>
                <img src={c.thumbnailUrl} alt={c.title} className="w-full aspect-video object-cover rounded-xl mb-3" />
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-bold text-purple-700 uppercase text-[10px]">{c.subjectSlug}</span>
                  <span className="font-bold text-slate-900">KSh {c.priceKsh}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{c.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">{c.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">{c.lessonsCount} lessons</span>
                <span className="text-emerald-600 font-bold">Published</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Create Course */}
      {activeTab === 'create' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft max-w-2xl mx-auto">
          <h3 className="text-xl font-black text-slate-900 mb-1">Create New STEM Course</h3>
          <p className="text-xs text-slate-500 mb-6">Publish high-yield curriculum lessons and revision questions.</p>

          {isSuccess && (
            <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-xs font-bold mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Course successfully published and enrolled into the LearnSci catalog!</span>
            </div>
          )}

          <form onSubmit={handleSubmitCourse} className="space-y-4 text-xs font-medium">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Course Title:</label>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Organic Reaction Mechanisms & Stereochemistry"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Subject:</label>
                <select 
                  value={subjectSlug}
                  onChange={(e) => setSubjectSlug(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 outline-none"
                >
                  <option value="mathematics">Mathematics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="physics">Physics</option>
                  <option value="biology">Biology</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Topic Name:</label>
                <input 
                  type="text"
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Tuition Price (KSh):</label>
                <input 
                  type="number"
                  value={priceKsh}
                  onChange={(e) => setPriceKsh(Number(e.target.value))}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Academic Level:</label>
                <select 
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 outline-none"
                >
                  <option value="Secondary">Secondary (Form 1–4)</option>
                  <option value="Advanced / College">Advanced / College</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Course Description:</label>
              <textarea 
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Breakdown of learning objectives, key formulas, and exam targets..."
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition active:scale-95"
            >
              Publish Course to LearnSci
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: Learners */}
      {activeTab === 'learners' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft">
          <h3 className="text-base font-bold text-slate-900 mb-4">Enrolled Learners Transcript Tracking</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 font-bold">Learner Name</th>
                  <th className="py-2.5 font-bold">Course</th>
                  <th className="py-2.5 font-bold">Completed</th>
                  <th className="py-2.5 font-bold">Average Quiz</th>
                  <th className="py-2.5 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                <tr>
                  <td className="py-3 font-bold text-slate-900">David Mwangi</td>
                  <td className="py-3">Mastering Linear & Quadratic Equations</td>
                  <td className="py-3">65%</td>
                  <td className="py-3 text-emerald-600 font-bold">84%</td>
                  <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">Active</span></td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-slate-900">Faith Njeri</td>
                  <td className="py-3">Chemical Bonding & VSEPR Geometry</td>
                  <td className="py-3">100%</td>
                  <td className="py-3 text-emerald-600 font-bold">92%</td>
                  <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold">Certified</span></td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-slate-900">Brian Kiprono</td>
                  <td className="py-3">Newtonian Mechanics & Laws of Motion</td>
                  <td className="py-3">40%</td>
                  <td className="py-3 text-amber-600 font-bold">75%</td>
                  <td className="py-3"><span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">Active</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: Earnings */}
      {activeTab === 'earnings' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">M-Pesa Royalty Disbursements</h3>
              <p className="text-xs text-slate-400">Monthly payout sent directly to your verified Safaricom line.</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Available Balance</span>
              <p className="text-2xl font-black text-slate-900">KSh 64,800</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div className="flex justify-between font-bold text-slate-800">
              <span>Next Automatic Payout:</span>
              <span className="text-purple-600">September 30, 2026</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Payout Method:</span>
              <span>Safaricom M-Pesa (0722•••412)</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-elevated border border-emerald-900/40">
        <div className="flex items-center gap-2 mb-1">
          <ShieldAlert className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
            System Administration
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Platform Oversight & Analytics</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Real-time metrics across 12,480 registered STEM learners and certified educators.
        </p>
      </div>

      {/* Top Analytics Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Total Users</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">12,480</div>
          <span className="text-[11px] text-emerald-600 font-semibold">+18% growth this term</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Registered Teachers</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">142</div>
          <span className="text-[11px] text-slate-400">Accredited STEM faculties</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Gross Platform Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">KSh 4,890,000</div>
          <span className="text-[11px] text-emerald-600 font-semibold">M-Pesa & Card Settlements</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase">Active Subscriptions</span>
            <CreditCard className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">2,840</div>
          <span className="text-[11px] text-purple-600 font-semibold">Recurring Monthly & Annual</span>
        </div>

      </div>

      {/* Two Column Layout: Subject Distribution & Top Viewed Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Popular Subjects */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Subject Enrollment Distribution</span>
          </h3>

          <div className="space-y-4 text-xs font-medium">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-bold text-slate-800">Mathematics (Pure & Applied)</span>
                <span className="text-slate-500">4,120 learners (33%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full" style={{ width: '33%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-bold text-slate-800">Chemistry (Organic, Physical, Inorganic)</span>
                <span className="text-slate-500">3,410 learners (27%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '27%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-bold text-slate-800">Physics (Mechanics, Electricity, Waves)</span>
                <span className="text-slate-500">2,980 learners (24%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: '24%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="font-bold text-slate-800">Biology (Cellular, Genetics, Anatomy)</span>
                <span className="text-slate-500">2,840 learners (22%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '22%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Most Viewed Lessons */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft">
          <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Highest Traffic Curricula</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Quadratic Equations & Roots (Mathematics)</p>
                <p className="text-[11px] text-slate-400">18,450 views · Rating 4.7 ⭐</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                High Yield
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Chemical Bonding & VSEPR (Chemistry)</p>
                <p className="text-[11px] text-slate-400">14,210 views · Rating 4.8 ⭐</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">
                Premium
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Newton’s Laws of Motion (Physics)</p>
                <p className="text-[11px] text-slate-400">12,890 views · Rating 4.6 ⭐</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-bold">
                Featured
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Cell Structure & Organelles (Biology)</p>
                <p className="text-[11px] text-slate-400">11,950 views · Rating 4.7 ⭐</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Free Core
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: 'monthly' | 'annual', amountKsh: number) => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-elevated border border-slate-100 relative overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Heading */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>LearnSci Membership</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Accelerate Your STEM Mastery
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Unlock complete access to past KCSE & college papers, step-by-step video libraries, teacher Q&A sessions, and certificate exams.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Monthly Plan */}
          <div className="rounded-2xl p-6 border-2 border-slate-200 hover:border-blue-500 transition-all flex flex-col justify-between bg-white relative">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-extrabold text-slate-900 text-lg">Monthly Plan</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  Cancel anytime
                </span>
              </div>

              <div className="mb-4">
                <span className="text-3xl font-black text-slate-900">KSh 499</span>
                <span className="text-xs text-slate-400 font-semibold"> / month</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>All secondary & college lessons</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Downloadable PDF revision notes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Full quiz engine & certificates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Student dashboard progress tracking</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => onSelectPlan('monthly', 499)}
              className="w-full py-3 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 font-bold text-xs transition active:scale-95"
            >
              Select Monthly Plan
            </button>
          </div>

          {/* Annual Plan (Featured) */}
          <div className="rounded-2xl p-6 border-2 border-purple-500 bg-gradient-to-b from-purple-50/50 to-white transition-all flex flex-col justify-between relative shadow-lg shadow-purple-500/10">
            <div className="absolute -top-3 right-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-xs">
              Save 20% + 2 Months Free
            </div>

            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-extrabold text-purple-900 text-lg">Annual Pass</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                  Most Popular
                </span>
              </div>

              <div className="mb-4">
                <span className="text-3xl font-black text-slate-900">KSh 4,999</span>
                <span className="text-xs text-slate-400 font-semibold"> / year</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-700 mb-6">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 flex-shrink-0 font-bold" />
                  <span className="font-semibold text-slate-900">Everything in Monthly, plus:</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span>Exclusive Teacher Q&A Priority Hotline</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span>10 Years of KCSE Past Papers + Marking Schemes</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  <span>Offline PDF & Formula Sheet Bundles</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => onSelectPlan('annual', 4999)}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/25 transition active:scale-95"
            >
              Get Annual Pass (KSh 4,999)
            </button>
          </div>

        </div>

        {/* Payment Methods Assurance */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Secure 256-bit encrypted checkout</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold text-slate-600 flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5 text-emerald-600" /> M-Pesa Kenya
            </span>
            <span className="font-semibold text-slate-600 flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5 text-blue-600" /> Visa / Mastercard / USD
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planType: 'monthly' | 'annual';
  amountKsh: number;
  onPaymentSuccess: (reference: string) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  planType,
  amountKsh,
  onPaymentSuccess
}) => {
  const [method, setMethod] = useState<'mpesa' | 'stripe_card'>('mpesa');
  const [phone, setPhone] = useState('0712345678');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('389');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isDone, setIsDone] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  if (!isOpen) return null;

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setStatusMessage(
      method === 'mpesa' 
        ? 'Sending STK Push prompt to your Safaricom mobile handset...' 
        : 'Verifying card authorization with Stripe Gateway...'
    );

    try {
      const response = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod: method,
          amountKsh,
          planType,
          phone,
          cardNumber
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Payment could not be completed.');
      }
      
      // Artificial delay to give realistic bank feedback
      setTimeout(() => {
        setIsProcessing(false);
        setIsDone(true);
        setReferenceCode(data.reference || `REF-${Date.now()}`);
        setStatusMessage(data.message || 'Payment confirmed successfully!');
        onPaymentSuccess(data.reference || 'PAY-SUCCESS');
      }, 1500);

    } catch (err) {
      setIsProcessing(false);
      setStatusMessage(err instanceof Error ? err.message : 'Payment could not be completed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-elevated border border-slate-100 relative">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!isDone ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Secure Checkout</span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Complete Your Subscription
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {planType === 'annual' ? 'LearnSci Annual Pass (12 Months)' : 'LearnSci Monthly Pass'}
              </p>
            </div>

            {/* Total Price Callout */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between mb-6">
              <span className="text-xs font-bold text-slate-600">Total Payable:</span>
              <span className="text-2xl font-black text-slate-900">
                KSh {amountKsh.toLocaleString()}
              </span>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button 
                type="button"
                onClick={() => setMethod('mpesa')}
                className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                  method === 'mpesa' 
                    ? 'border-emerald-500 bg-emerald-50/70 text-emerald-800 shadow-xs' 
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>M-Pesa (Kenya)</span>
              </button>

              <button 
                type="button"
                onClick={() => setMethod('stripe_card')}
                className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                  method === 'stripe_card' 
                    ? 'border-blue-500 bg-blue-50/70 text-blue-800 shadow-xs' 
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4 text-blue-600" />
                <span>Card / USD</span>
              </button>
            </div>

            {/* Dynamic Form */}
            <form onSubmit={handlePay} className="space-y-4">
              
              {method === 'mpesa' ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      M-Pesa Mobile Number:
                    </label>
                    <input 
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0712345678 or 254712345678"
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-[11px] text-emerald-800 leading-relaxed">
                    💡 An instant Safaricom STK prompt will appear on your phone asking you to enter your M-Pesa PIN.
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Card Number:
                    </label>
                    <input 
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 4242 4242 4242"
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Expiry:</label>
                      <input 
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">CVC / CVV:</label>
                      <input 
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="123"
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Status Message */}
              {statusMessage && (
                <div className="p-3 rounded-xl bg-blue-50 text-blue-800 text-xs font-medium flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600 flex-shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isProcessing}
                className={`w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                  method === 'mpesa' 
                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20' 
                    : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20'
                } disabled:opacity-50 active:scale-95`}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <span>Pay KSh {amountKsh.toLocaleString()}</span>
                )}
              </button>

            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-slate-900">
              Payment Confirmed!
            </h3>

            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Your {planType} subscription is now active. All premium past papers, video lessons, and teacher Q&A have been unlocked.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 text-left max-w-sm mx-auto space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Reference:</span>
                <span className="font-bold">{referenceCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Method:</span>
                <span className="capitalize">{method.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-600 font-bold">Completed</span>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
            >
              Start Learning with Premium Access
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export const App: React.FC = () => {
  // Navigation View State
  const [currentView, setCurrentView] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active User Persona (Allows seamless demonstration of Learner, Teacher, Admin)
  const [currentUser, setCurrentUser] = useState<User>({
    id: 1,
    name: 'David Mwangi',
    email: 'student@learnsci.edu',
    role: 'learner',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250'
  });

  // State entities
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [articles, setArticles] = useState<Article[]>(ARTICLES);
  const [resources, setResources] = useState<Resource[]>(ALL_RESOURCES);
  const [progress, setProgress] = useState(DEFAULT_LEARNER_PROGRESS);
  const [cartCount, setCartCount] = useState<number>(0);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected detail entities
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeQuizId, setActiveQuizId] = useState<number | null>(null);

  // Modals state
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlanType, setSelectedPlanType] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPlanAmount, setSelectedPlanAmount] = useState<number>(499);

  // Fetch initial data from Netlify API if available
  useEffect(() => {
    const loadRemoteData = async () => {
      const results = await Promise.allSettled([
        api.getCourses(),
        api.getArticles(),
        api.getResources(),
        api.getProgress()
      ]);

      const [coursesResult, articlesResult, resourcesResult, progressResult] = results;
      if (coursesResult.status === 'fulfilled') setCourses(coursesResult.value);
      if (articlesResult.status === 'fulfilled') setArticles(articlesResult.value);
      if (resourcesResult.status === 'fulfilled') setResources(resourcesResult.value);
      if (progressResult.status === 'fulfilled') setProgress(progressResult.value);

      results
        .filter((result): result is PromiseRejectedResult => result.status === 'rejected')
        .forEach(result => console.warn('LearnSci API unavailable; retaining local seed data.', result.reason));
    };

    void loadRemoteData();
  }, []);

  // Handlers
  const handleSelectRole = (role: UserRole) => {
    if (role === 'learner') {
      setCurrentUser({
        id: 1,
        name: 'David Mwangi',
        email: 'student@learnsci.edu',
        role: 'learner',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250'
      });
      setCurrentView('home');
    } else if (role === 'teacher') {
      setCurrentUser({
        id: 2,
        name: 'Dr. Kelvin M.',
        email: 'dr.kelvin@learnsci.edu',
        role: 'teacher',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
      });
      setCurrentView('teacher-dashboard');
    } else {
      setCurrentUser({
        id: 3,
        name: 'Admin Officer',
        email: 'admin@learnsci.edu',
        role: 'admin',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250'
      });
      setCurrentView('admin-dashboard');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView('search');
    }
  };

  const handleOpenCart = () => {
    setIsSubscriptionModalOpen(true);
  };

  const handleSelectPlan = (plan: 'monthly' | 'annual', amountKsh: number) => {
    setSelectedPlanType(plan);
    setSelectedPlanAmount(amountKsh);
    setIsSubscriptionModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (ref: string) => {
    // update learner status
  };

  const handleLaunchQuiz = (quizId: number) => {
    setActiveQuizId(quizId);
    setCurrentView('quiz');
  };

  const handleCreateCourse = async (courseData: Partial<Course>) => {
    try {
      const { course } = await api.createCourse({
        ...courseData,
        teacherId: currentUser.id,
        teacherName: currentUser.name,
        teacherAvatar: currentUser.avatarUrl || ''
      });
      setCourses(prev => [course, ...prev]);
    } catch (error) {
      console.error('Unable to create course.', error);
      alert(error instanceof Error ? error.message : 'Unable to create course. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col antialiased">
      
      {/* Fixed Left Desktop Sidebar & Mobile Drawer */}
      <Sidebar 
        currentView={currentView}
        onNavigate={(view, payload) => {
          setCurrentView(view);
          if (payload?.slug) {
            setSearchQuery(payload.slug);
            setCurrentView('search');
          }
        }}
        userRole={currentUser.role}
        mobileMenuOpen={mobileMenuOpen}
        onCloseMobileMenu={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Layout Shifted Right on Desktop for Fixed Sidebar */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        
        {/* Sticky Header with Global Search and Persona Switcher */}
        <Header 
          currentUser={currentUser}
          onSelectRole={handleSelectRole}
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            if (q && currentView !== 'search') setCurrentView('search');
            if (!q && currentView === 'search') setCurrentView('home');
          }}
          onSearchSubmit={handleSearchSubmit}
          cartCount={cartCount}
          onOpenCart={handleOpenCart}
          onOpenSubscriptions={() => setIsSubscriptionModalOpen(true)}
          mobileMenuOpen={mobileMenuOpen}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          onNavigate={(view) => setCurrentView(view)}
        />

        {/* Dynamic Route Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          
          {/* VIEW: HOME DASHBOARD (Refined 4:3 reference layout with main stage & side widgets) */}
          {currentView === 'home' && (
            <div className="space-y-10">
              
              {/* Hero Section */}
              <HeroSection 
                onBrowseLessons={() => {
                  const el = document.getElementById('popular-lessons-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                onExploreArticles={() => setCurrentView('articles')}
                onExploreSubject={(slug) => {
                  setSearchQuery(slug);
                  setCurrentView('search');
                }}
              />

              {/* 4:3 Main Layout Composition: 8 cols Main Stage + 4 cols Continue Learning widget */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Main Content Stage (8 columns) */}
                <div className="lg:col-span-8 space-y-10">
                  {/* Subject Grid Cards */}
                  <SubjectSection 
                    subjects={INITIAL_SUBJECTS}
                    onSelectSubject={(slug) => {
                      setSearchQuery(slug);
                      setCurrentView('search');
                    }}
                    onSelectTopic={(subj, topic) => {
                      setSearchQuery(topic);
                      setCurrentView('search');
                    }}
                  />

                  {/* Popular Lessons Section */}
                  <div id="popular-lessons-section">
                    <PopularLessons 
                      courses={courses}
                      onSelectCourse={(c) => {
                        setSelectedCourse(c);
                        setCurrentView('lesson');
                      }}
                      onViewFlagshipLesson={() => setCurrentView('lesson')}
                      onAddToCart={(c) => setCartCount(prev => prev + 1)}
                    />
                  </div>
                </div>

                {/* Right Dashboard Widget Panel (4 columns: Continue Learning, Streaks, Recent) */}
                <div className="lg:col-span-4 sticky top-24">
                  <ContinueLearningPanel 
                    progress={progress}
                    onContinueCurrent={() => setCurrentView('lesson')}
                    onSelectRecentLesson={() => setCurrentView('lesson')}
                    onGoPremium={() => setIsSubscriptionModalOpen(true)}
                  />
                </div>

              </div>

            </div>
          )}

          {/* VIEW: LESSON PAGE (Dedicated 9-part curriculum & Interactive Solver) */}
          {currentView === 'lesson' && (
            <LessonView 
              lesson={QUADRATIC_EQUATIONS_LESSON}
              onBack={() => setCurrentView('home')}
              onLaunchQuiz={(quizId) => handleLaunchQuiz(quizId)}
              onDownloadResource={(res) => {
                alert(`Downloaded ${res.title}`);
              }}
            />
          )}

          {/* VIEW: QUIZ ENGINE (Interactive 5-question test with timer & explanations) */}
          {currentView === 'quiz' && (
            <QuizEngine 
              quiz={QUIZZES[0]}
              onBackToLesson={() => setCurrentView('lesson')}
              onRecordAttempt={async (score, answers, timeTakenSeconds) => {
                try {
                  const result = await api.submitQuiz(QUIZZES[0].id, answers, timeTakenSeconds);
                  score = result.attempt.score;
                } catch (error) {
                  console.error('Unable to record quiz attempt.', error);
                }
                setProgress(prev => ({
                  ...prev,
                  averageQuizScore: Math.round((prev.averageQuizScore + score) / 2),
                  completedLessons: prev.completedLessons + 1
                }));
              }}
            />
          )}

          {/* VIEW: SEARCH SYSTEM (Global filter and multi-facet query index) */}
          {currentView === 'search' && (
            <SearchView 
              initialQuery={searchQuery}
              courses={courses}
              articles={articles}
              resources={resources}
              subjects={INITIAL_SUBJECTS}
              onSelectCourse={(c) => {
                setSelectedCourse(c);
                setCurrentView('lesson');
              }}
              onSelectArticle={(a) => {
                setSelectedArticle(a);
                setCurrentView('articles');
              }}
              onSelectResource={(r) => {
                alert(`Downloaded ${r.title}`);
              }}
              onViewLesson={() => setCurrentView('lesson')}
            />
          )}

          {/* VIEW: ARTICLES / BLOG */}
          {currentView === 'articles' && (
            <ArticlesView 
              articles={articles}
              onSelectArticle={(a) => setSelectedArticle(a)}
              selectedArticle={selectedArticle}
              onBackToList={() => setSelectedArticle(null)}
            />
          )}

          {/* VIEW: RESOURCES REPOSITORY */}
          {currentView === 'resources' && (
            <ResourcesView 
              resources={resources}
              onDownload={(res) => alert(`Downloading: ${res.title}`)}
              onGoPremium={() => setIsSubscriptionModalOpen(true)}
            />
          )}

          {/* VIEW: TEACHER DASHBOARD */}
          {(currentView === 'teacher-dashboard' || currentView === 'teacher-landing') && (
            <TeacherDashboard 
              teacher={TEACHER_PROFILES[0]}
              courses={courses}
              onCreateCourse={handleCreateCourse}
            />
          )}

          {/* VIEW: ADMIN DASHBOARD */}
          {currentView === 'admin-dashboard' && (
            <AdminDashboard />
          )}

          {/* VIEW: MY LEARNING */}
          {currentView === 'my-learning' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-black text-slate-900">My Learning Dashboard</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ContinueLearningPanel 
                  progress={progress}
                  onContinueCurrent={() => setCurrentView('lesson')}
                  onSelectRecentLesson={() => setCurrentView('lesson')}
                  onGoPremium={() => setIsSubscriptionModalOpen(true)}
                />
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-soft">
                  <h3 className="font-bold text-slate-900 mb-3">Enrolled STEM Courses</h3>
                  <div className="space-y-3">
                    {courses.slice(0, 3).map((c) => (
                      <div key={c.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-slate-800">{c.title}</p>
                          <p className="text-slate-400 capitalize">{c.subjectSlug}</p>
                        </div>
                        <button 
                          onClick={() => setCurrentView('lesson')}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold"
                        >
                          Resume
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* Global Footer */}
        <footer className="mt-auto border-t border-slate-200/80 bg-white py-8 px-4 sm:px-8 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs">
                S
              </div>
              <span className="font-bold text-slate-900">LearnSci</span>
              <span>— Learn. Understand. Excel.</span>
            </div>

            <div className="flex items-center gap-6">
              <button onClick={() => setCurrentView('home')} className="hover:text-blue-600">Home</button>
              <button onClick={() => setCurrentView('articles')} className="hover:text-blue-600">Articles</button>
              <button onClick={() => setCurrentView('resources')} className="hover:text-blue-600">Resources</button>
              <button onClick={() => setIsSubscriptionModalOpen(true)} className="hover:text-blue-600">Pricing</button>
              <button onClick={() => handleSelectRole('teacher')} className="hover:text-purple-600">Teacher Portal</button>
            </div>

            <p>© 2026 LearnSci EdTech Platform. All rights reserved.</p>
          </div>
        </footer>

      </div>

      {/* Subscription Plans Modal */}
      <SubscriptionModal 
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
        onSelectPlan={handleSelectPlan}
      />

      {/* Payment Processing Modal (M-Pesa & Card) */}
      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        planType={selectedPlanType}
        amountKsh={selectedPlanAmount}
        onPaymentSuccess={handlePaymentSuccess}
      />

    </div>
  );
};

export default App;
