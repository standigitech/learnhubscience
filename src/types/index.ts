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
