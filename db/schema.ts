import { pgTable, serial, text, timestamp, integer, boolean, numeric, jsonb } from "drizzle-orm/pg-core";

// 1. Users table (Learners, Teachers, Admins)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("learner"), // 'learner' | 'teacher' | 'admin'
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// 2. Learner Profiles
export const learnerProfiles = pgTable("learner_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  schoolOrCollege: text("school_or_college"),
  targetExams: text("target_exams"), // e.g. "KCSE, A-Levels, SAT STEM, College Physics I"
  totalStudyMinutes: integer("total_study_minutes").default(0),
  points: integer("points").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// 3. Teacher Profiles
export const teacherProfiles = pgTable("teacher_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(), // e.g. "Dr. Kelvin M."
  qualifications: text("qualifications").notNull(), // e.g. "PhD in Chemistry, University of Nairobi"
  experienceYears: integer("experience_years").notNull().default(5),
  biography: text("biography").notNull(),
  rating: numeric("rating", { precision: 3, scale: 2 }).default("4.80"),
  reviewCount: integer("review_count").default(0),
  subjectsTaught: text("subjects_taught"), // comma-separated or json
  earningsKsh: integer("earnings_ksh").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// 4. Subjects
export const subjects = pgTable("subjects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(), // 'mathematics', 'chemistry', 'physics', 'biology'
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  accentColor: text("accent_color").notNull(),
  iconName: text("icon_name").notNull(),
  description: text("description").notNull(),
  orderIndex: integer("order_index").default(0),
});

// 5. Topics
export const topics = pgTable("topics", {
  id: serial("id").primaryKey(),
  subjectId: integer("subject_id").notNull().references(() => subjects.id),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description").notNull(),
  orderIndex: integer("order_index").default(0),
});

// 6. Courses
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  subjectId: integer("subject_id").notNull().references(() => subjects.id),
  topicId: integer("topic_id").references(() => topics.id),
  teacherId: integer("teacher_id").references(() => teacherProfiles.id),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  priceKsh: integer("price_ksh").default(0), // 0 for free
  isPremium: boolean("is_premium").default(false),
  level: text("level").notNull().default("Secondary"), // 'Secondary' | 'Advanced / College'
  difficulty: text("difficulty").notNull().default("Beginner"), // 'Beginner' | 'Intermediate' | 'Advanced'
  rating: numeric("rating", { precision: 3, scale: 2 }).default("4.80"),
  reviewCount: integer("review_count").default(0),
  published: boolean("published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// 7. Lessons
export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull().references(() => courses.id),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  orderIndex: integer("order_index").notNull().default(1),
  durationMinutes: integer("duration_minutes").default(25),
  isFree: boolean("is_free").default(false),
  objectives: jsonb("objectives"), // array of strings
  introduction: text("introduction"),
  contentJson: jsonb("content_json"), // structured sections, formulas, diagrams, examples
  videoUrl: text("video_url"),
  videoDuration: text("video_duration"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 8. Lesson Resources
export const lessonResources = pgTable("lesson_resources", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessons.id),
  courseId: integer("course_id").references(() => courses.id),
  subjectId: integer("subject_id").references(() => subjects.id),
  title: text("title").notNull(),
  resourceType: text("resource_type").notNull(), // 'pdf' | 'worksheet' | 'past_paper' | 'study_guide'
  level: text("level").default("Secondary"),
  year: integer("year").default(2025),
  fileUrl: text("file_url").notNull(),
  fileSize: text("file_size").default("2.4 MB"),
  isPremium: boolean("is_premium").default(false),
  downloadsCount: integer("downloads_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// 9. Quizzes
export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessons.id),
  courseId: integer("course_id").references(() => courses.id),
  title: text("title").notNull(),
  description: text("description"),
  timeLimitMinutes: integer("time_limit_minutes").default(15),
  passingScore: integer("passing_score").default(70), // percentage
  createdAt: timestamp("created_at").defaultNow(),
});

// 10. Questions
export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  quizId: integer("quiz_id").notNull().references(() => quizzes.id),
  questionType: text("question_type").notNull(), // 'multiple_choice' | 'true_false' | 'numerical'
  prompt: text("prompt").notNull(),
  optionsJson: jsonb("options_json"), // array of strings or null for numerical
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  orderIndex: integer("order_index").notNull().default(1),
});

// 11. Quiz Attempts
export const quizAttempts = pgTable("quiz_attempts", {
  id: serial("id").primaryKey(),
  quizId: integer("quiz_id").notNull().references(() => quizzes.id),
  userId: integer("user_id").notNull().references(() => users.id),
  score: integer("score").notNull(),
  totalPoints: integer("total_points").notNull(),
  passed: boolean("passed").notNull(),
  timeTakenSeconds: integer("time_taken_seconds").default(0),
  answersJson: jsonb("answers_json"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 12. Articles
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  subjectId: integer("subject_id").notNull().references(() => subjects.id),
  authorId: integer("author_id").references(() => users.id),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  shortDescription: text("short_description").notNull(),
  contentMarkdown: text("content_markdown").notNull(),
  featuredImage: text("featured_image"),
  readingTimeMinutes: integer("reading_time_minutes").default(6),
  tagsJson: jsonb("tags_json"),
  isPremium: boolean("is_premium").default(false),
  viewsCount: integer("views_count").default(0),
  publishedAt: timestamp("published_at").defaultNow(),
});

// 13. Enrollments
export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  courseId: integer("course_id").notNull().references(() => courses.id),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
});

// 14. Progress
export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  courseId: integer("course_id").notNull().references(() => courses.id),
  lessonId: integer("lesson_id").notNull().references(() => lessons.id),
  completed: boolean("completed").default(false),
  progressPercent: integer("progress_percent").default(0),
  lastAccessedAt: timestamp("last_accessed_at").defaultNow(),
});

// 15. Subscriptions
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  planType: text("plan_type").notNull(), // 'monthly' | 'annual'
  amountKsh: integer("amount_ksh").notNull(), // 499 or 4999
  status: text("status").notNull().default("active"), // 'active' | 'cancelled' | 'expired'
  currentPeriodStart: timestamp("current_period_start").defaultNow(),
  currentPeriodEnd: timestamp("current_period_end"),
  paymentReference: text("payment_reference"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 16. Payments
export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  amountKsh: integer("amount_ksh").notNull(),
  currency: text("currency").notNull().default("KSh"), // 'KSh' | 'USD'
  paymentMethod: text("payment_method").notNull(), // 'mpesa' | 'stripe_card'
  referenceCode: text("reference_code").notNull().unique(),
  status: text("status").notNull().default("pending"), // 'pending' | 'success' | 'failed'
  itemType: text("item_type").notNull(), // 'subscription' | 'course' | 'lesson'
  itemId: integer("item_id"),
  metadataJson: jsonb("metadata_json"),
  createdAt: timestamp("created_at").defaultNow(),
});

// 17. Bookmarks
export const bookmarks = pgTable("bookmarks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  itemType: text("item_type").notNull(), // 'lesson' | 'article' | 'resource'
  itemId: integer("item_id").notNull(),
  title: text("title").notNull(),
  subject: text("subject"),
  createdAt: timestamp("created_at").defaultNow(),
});
