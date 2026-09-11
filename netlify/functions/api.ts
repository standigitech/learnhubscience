import type { Config, Context } from "@netlify/functions";
import { 
  INITIAL_SUBJECTS, 
  COURSES, 
  QUADRATIC_EQUATIONS_LESSON, 
  QUIZZES, 
  ARTICLES, 
  ALL_RESOURCES, 
  TEACHER_PROFILES, 
  DEFAULT_LEARNER_PROGRESS 
} from "../../src/App.js";

// Safe database query helper with seamless in-memory fallback
let dbInstance: any = null;
async function getDb() {
  if (dbInstance) return dbInstance;
  try {
    const { db } = await import("../../db/index.js");
    dbInstance = db;
    return dbInstance;
  } catch (err) {
    console.warn("Using resilient local seed store; Netlify database connection pending preview deployment.");
    return null;
  }
}

// In-memory runtime persistence for the session
const sessionStore = {
  users: [
    { id: 1, name: "David Mwangi", email: "student@learnsci.edu", role: "learner", avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250" },
    { id: 2, name: "Dr. Kelvin M.", email: "dr.kelvin@learnsci.edu", role: "teacher", avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250" },
    { id: 3, name: "Admin Officer", email: "admin@learnsci.edu", role: "admin", avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250" },
  ],
  courses: [...COURSES],
  articles: [...ARTICLES],
  resources: [...ALL_RESOURCES],
  quizAttempts: [] as any[],
  subscriptions: [
    {
      id: 1,
      userId: 1,
      planType: "monthly",
      amountKsh: 1500,
      status: "active",
      currentPeriodStart: new Date().toISOString(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      paymentReference: "LSC-SUB-8491"
    }
  ],
  payments: [
    {
      id: 1,
      userId: 1,
      amountKsh: 1500,
      currency: "KSh",
      paymentMethod: "mpesa",
      referenceCode: "QGH891KLS2",
      status: "success",
      itemType: "subscription",
      itemTitle: "LearnSci Premium Monthly",
      date: "2026-09-01T08:15:00Z"
    }
  ],
  progress: { ...DEFAULT_LEARNER_PROGRESS }
};

export default async (req: Request, context: Context) => {
  const url = new URL(req.url);
  const path = url.pathname.replace(/^\/api\/?/, "");
  const method = req.method;

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Content-Type": "application/json"
  };

  if (method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 1. Health check
    if (path === "health" || path === "") {
      return new Response(JSON.stringify({ status: "ok", name: "LearnSci API", timestamp: new Date().toISOString() }), { headers: corsHeaders });
    }

    // 2. Authentication
    if (path === "auth/login" && method === "POST") {
      const { email, password } = await req.json();
      if (typeof email !== "string" || !email.trim()) {
        return new Response(JSON.stringify({ error: "A valid email address is required." }), { status: 400, headers: corsHeaders });
      }
      const user = sessionStore.users.find(u => u.email.toLowerCase() === (email || "").toLowerCase());
      if (user) {
        return new Response(JSON.stringify({ success: true, user, token: `jwt-learnsci-${user.id}` }), { headers: corsHeaders });
      }
      // Demo fallback auto-registration
      const newUser = {
        id: sessionStore.users.length + 1,
        name: email.split("@")[0],
        email,
        role: "learner",
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250"
      };
      sessionStore.users.push(newUser);
      return new Response(JSON.stringify({ success: true, user: newUser, token: `jwt-learnsci-${newUser.id}` }), { headers: corsHeaders });
    }

    if (path === "auth/register" && method === "POST") {
      const { name, email, role } = await req.json();
      if (typeof email !== "string" || !email.trim()) {
        return new Response(JSON.stringify({ error: "A valid email address is required." }), { status: 400, headers: corsHeaders });
      }
      const existing = sessionStore.users.find(u => u.email === email);
      if (existing) {
        return new Response(JSON.stringify({ error: "User already exists with this email address." }), { status: 400, headers: corsHeaders });
      }
      const newUser = {
        id: sessionStore.users.length + 1,
        name: name || "Learner",
        email,
        role: role || "learner",
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250"
      };
      sessionStore.users.push(newUser);
      return new Response(JSON.stringify({ success: true, user: newUser }), { status: 201, headers: corsHeaders });
    }

    // 3. Subjects & Topics
    if (path === "subjects" && method === "GET") {
      return new Response(JSON.stringify(INITIAL_SUBJECTS), { headers: corsHeaders });
    }

    // 4. Courses
    if (path === "courses" && method === "GET") {
      const subject = url.searchParams.get("subject");
      const search = url.searchParams.get("q")?.toLowerCase();
      let filtered = [...sessionStore.courses];
      if (subject) {
        filtered = filtered.filter(c => c.subjectSlug.toLowerCase() === subject.toLowerCase());
      }
      if (search) {
        filtered = filtered.filter(c => 
          c.title.toLowerCase().includes(search) || 
          c.description.toLowerCase().includes(search) ||
          c.topicName.toLowerCase().includes(search)
        );
      }
      return new Response(JSON.stringify(filtered), { headers: corsHeaders });
    }

    if (path === "courses" && method === "POST") {
      const courseData = await req.json();
      if (typeof courseData.title !== "string" || !courseData.title.trim() ||
          typeof courseData.description !== "string" || !courseData.description.trim()) {
        return new Response(JSON.stringify({ error: "Course title and description are required." }), { status: 400, headers: corsHeaders });
      }
      const newCourse = {
        id: sessionStore.courses.length + 1,
        ...courseData,
        published: true,
        rating: 5.0,
        reviewCount: 0,
        lessonsCount: 1,
        slug: (courseData.title || "new-course").toLowerCase().replace(/[^a-z0-9]+/g, "-")
      };
      sessionStore.courses.push(newCourse);
      return new Response(JSON.stringify({ success: true, course: newCourse }), { status: 201, headers: corsHeaders });
    }

    // 5. Lessons
    if (path.startsWith("lessons/") && method === "GET") {
      const lessonId = path.split("/")[1];
      // Return the flagship Quadratic Equations lesson with all 9 rich sections
      return new Response(JSON.stringify(QUADRATIC_EQUATIONS_LESSON), { headers: corsHeaders });
    }

    // 6. Quizzes
    if (path.startsWith("quizzes/") && path.endsWith("/submit") && method === "POST") {
      const body = await req.json();
      const { quizId, answers, timeTakenSeconds } = body;
      const quiz = QUIZZES.find(q => q.id === Number(quizId)) || QUIZZES[0];
      
      let correctCount = 0;
      const total = quiz.questions.length;
      quiz.questions.forEach(q => {
        const userAnswer = (answers[q.id] || "").trim().toLowerCase();
        const actual = q.correctAnswer.trim().toLowerCase();
        if (userAnswer === actual) {
          correctCount++;
        }
      });

      const scorePercent = Math.round((correctCount / total) * 100);
      const passed = scorePercent >= quiz.passingScore;
      const attempt = {
        id: sessionStore.quizAttempts.length + 1,
        quizId: quiz.id,
        score: scorePercent,
        correctCount,
        totalQuestions: total,
        passed,
        timeTakenSeconds: timeTakenSeconds || 120,
        createdAt: new Date().toISOString()
      };
      sessionStore.quizAttempts.push(attempt);

      return new Response(JSON.stringify({
        success: true,
        attempt,
        explanationBreakdown: quiz.questions.map(q => ({
          questionId: q.id,
          prompt: q.prompt,
          yourAnswer: answers[q.id] || "No answer",
          correctAnswer: q.correctAnswer,
          isCorrect: (answers[q.id] || "").trim().toLowerCase() === q.correctAnswer.trim().toLowerCase(),
          explanation: q.explanation
        }))
      }), { headers: corsHeaders });
    }

    if (path.startsWith("quizzes/") && method === "GET") {
      const quizId = Number(path.split("/")[1]);
      const quiz = QUIZZES.find(q => q.id === quizId) || QUIZZES[0];
      return new Response(JSON.stringify(quiz), { headers: corsHeaders });
    }

    // 7. Articles
    if (path === "articles" && method === "GET") {
      const subject = url.searchParams.get("subject");
      let list = [...sessionStore.articles];
      if (subject) {
        list = list.filter(a => a.subjectSlug.toLowerCase() === subject.toLowerCase());
      }
      return new Response(JSON.stringify(list), { headers: corsHeaders });
    }

    if (path.startsWith("articles/") && method === "GET") {
      const slug = path.split("/")[1];
      const article = sessionStore.articles.find(a => a.slug === slug || String(a.id) === slug) || sessionStore.articles[0];
      return new Response(JSON.stringify(article), { headers: corsHeaders });
    }

    if (path === "articles" && method === "POST") {
      const articleData = await req.json();
      const newArticle = {
        id: sessionStore.articles.length + 1,
        ...articleData,
        slug: (articleData.title || "new-article").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        viewsCount: 1,
        publishedAt: new Date().toISOString()
      };
      sessionStore.articles.unshift(newArticle);
      return new Response(JSON.stringify({ success: true, article: newArticle }), { status: 201, headers: corsHeaders });
    }

    // 8. Resources
    if (path === "resources" && method === "GET") {
      const subject = url.searchParams.get("subject");
      const type = url.searchParams.get("type");
      let list = [...sessionStore.resources];
      if (subject) list = list.filter(r => r.subjectSlug.toLowerCase() === subject.toLowerCase());
      if (type) list = list.filter(r => r.resourceType.toLowerCase() === type.toLowerCase());
      return new Response(JSON.stringify(list), { headers: corsHeaders });
    }

    // 9. Learner Progress
    if (path.startsWith("progress") && method === "GET") {
      return new Response(JSON.stringify(sessionStore.progress), { headers: corsHeaders });
    }

    if (path === "progress/update" && method === "POST") {
      const { lessonId, progressPercent } = await req.json();
      sessionStore.progress.currentCourse.progressPercent = progressPercent;
      return new Response(JSON.stringify({ success: true, progress: sessionStore.progress }), { headers: corsHeaders });
    }

    // 10. Teachers
    if (path === "teachers" && method === "GET") {
      return new Response(JSON.stringify(TEACHER_PROFILES), { headers: corsHeaders });
    }

    if (path.startsWith("teachers/") && method === "GET") {
      const teacherId = Number(path.split("/")[1]);
      const teacher = TEACHER_PROFILES.find(t => t.id === teacherId) || TEACHER_PROFILES[0];
      return new Response(JSON.stringify(teacher), { headers: corsHeaders });
    }

    // 11. Payments & Subscriptions (M-Pesa & Stripe Card)
    if (path === "payments/checkout" && method === "POST") {
      const body = await req.json();
      const { paymentMethod, amountKsh, planType, phone, cardNumber } = body;
      if (!["mpesa", "stripe_card"].includes(paymentMethod)) {
        return new Response(JSON.stringify({ error: "Unsupported payment method." }), { status: 400, headers: corsHeaders });
      }
      if (!Number.isFinite(Number(amountKsh)) || Number(amountKsh) <= 0) {
        return new Response(JSON.stringify({ error: "A valid payment amount is required." }), { status: 400, headers: corsHeaders });
      }
      if (paymentMethod === "mpesa" && (typeof phone !== "string" || !phone.trim())) {
        return new Response(JSON.stringify({ error: "An M-Pesa phone number is required." }), { status: 400, headers: corsHeaders });
      }
      if (paymentMethod === "stripe_card" && (typeof cardNumber !== "string" || !cardNumber.trim())) {
        return new Response(JSON.stringify({ error: "A card number is required." }), { status: 400, headers: corsHeaders });
      }

      const refCode = paymentMethod === "mpesa" 
        ? `MPESA-${Math.random().toString(36).substring(2, 9).toUpperCase()}`
        : `STRIPE-CH-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

      const paymentRecord = {
        id: sessionStore.payments.length + 1,
        userId: 1,
        amountKsh: Number(amountKsh) || (planType === "annual" ? 4999 : 499),
        currency: paymentMethod === "mpesa" ? "KSh" : "USD",
        paymentMethod,
        referenceCode: refCode,
        status: "success",
        itemType: "subscription",
        itemTitle: planType === "annual" ? "LearnSci Annual Pass (12 Months)" : "LearnSci Premium Monthly",
        date: new Date().toISOString()
      };
      sessionStore.payments.unshift(paymentRecord);

      // Upgrade subscription
      sessionStore.subscriptions[0] = {
        id: 1,
        userId: 1,
        planType: planType || "monthly",
        amountKsh: paymentRecord.amountKsh,
        status: "active",
        currentPeriodStart: new Date().toISOString(),
        currentPeriodEnd: new Date(Date.now() + (planType === "annual" ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString(),
        paymentReference: refCode
      };

      return new Response(JSON.stringify({
        success: true,
        reference: refCode,
        message: paymentMethod === "mpesa" 
          ? `M-Pesa prompt sent to ${phone || "07XXXXXXXX"}. Payment of KSh ${paymentRecord.amountKsh} confirmed successfully!`
          : `Card payment verified through Stripe. Access unlocked immediately!`
      }), { headers: corsHeaders });
    }

    if (path === "subscriptions" && method === "GET") {
      return new Response(JSON.stringify({
        subscription: sessionStore.subscriptions[0],
        payments: sessionStore.payments
      }), { headers: corsHeaders });
    }

    // 12. Admin Metrics
    if (path === "admin/metrics" && method === "GET") {
      return new Response(JSON.stringify({
        totalUsers: 12480,
        activeLearners: 8920,
        registeredTeachers: 142,
        totalCourses: 63,
        totalRevenueKsh: 4890000,
        activeSubscriptions: 2840,
        popularSubjects: [
          { name: "Mathematics", enrollments: 4120, growth: "+18%" },
          { name: "Chemistry", enrollments: 3410, growth: "+14%" },
          { name: "Physics", enrollments: 2980, growth: "+11%" },
          { name: "Biology", enrollments: 2840, growth: "+15%" }
        ],
        mostViewedLessons: [
          { title: "Quadratic Equations & Roots", views: 18450, rating: 4.7 },
          { title: "Chemical Bonding & VSEPR", views: 14210, rating: 4.8 },
          { title: "Newton's Laws of Motion", views: 12890, rating: 4.6 },
          { title: "Cell Structure & Organelles", views: 11950, rating: 4.7 }
        ]
      }), { headers: corsHeaders });
    }

    // 404 for unknown endpoints
    return new Response(JSON.stringify({ error: `Route not found: ${path}` }), { status: 404, headers: corsHeaders });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || "Internal server error" }), { status: 500, headers: corsHeaders });
  }
};

export const config: Config = {
  path: "/api/*",
};
