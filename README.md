# LearnSci — Digital Learning Platform for STEM

> **Tagline:** *Learn. Understand. Excel.*

LearnSci is a modern, responsive full-stack EdTech platform engineered for secondary-school (Form 1–4, KCSE, IGCSE) and college-level STEM learners specializing in **Mathematics**, **Chemistry**, **Physics**, and **Biology**.

---

## 🌟 Key Features

1. **4:3 Reference Ratio Dashboard & Fluid Responsive Design**
   - Fixed desktop left sidebar with smooth drawer collapse on mobile.
   - Large gradient hero section with science motifs (calculator, formulas, chemical flask, physics forces, and DNA models).
   - Right-side "Continue Learning" widget panel displaying active course progress, study streak days, and recent lessons.

2. **Core STEM Curriculum & Disciplines**
   - **Mathematics** (Blue accent `#0284C7`): Algebra, Calculus, Geometry, Trigonometry, Statistics, Probability.
   - **Chemistry** (Purple accent `#9333EA`): Organic Chemistry, Inorganic Chemistry, Physical Chemistry, Analytical Chemistry, Atomic Structure, Chemical Bonding.
   - **Physics** (Orange accent `#F97316`): Mechanics, Waves, Electricity, Magnetism, Thermodynamics, Modern Physics.
   - **Biology** (Green accent `#10B981`): Cell Biology, Genetics, Ecology, Human Biology, Evolution, Anatomy.

3. **Flagship Interactive Lesson Experience: Quadratic Equations**
   - 9 structured educational sections: Introduction, Objectives, Standard Form, Factorization, Completing the Square, Quadratic Formula & Discriminant, Worked Examples, Practice Questions, and Mastery Quiz.
   - Embedded interactive **Quadratic Equation Solver & Discriminant Visualizer** widget allowing learners to modify coefficients $a$, $b$, and $c$ to compute roots and observe parabola concavity in real time.
   - Video classroom player with timestamps.
   - Downloadable PDF revision notes and worked worksheets.

4. **Interactive Quiz Engine**
   - Supports Multiple Choice, True/False, and Numerical answer inputs.
   - Timed countdown clock, question jumper navigation, and automatic instant grading.
   - Detailed per-question answer explanations and score recording into the student transcript.

5. **Multi-Faceted Global Search**
   - Unified search querying across courses, lessons, topics, articles, teachers, and downloadable resources.
   - Instant filtering by Subject, Content Type, Academic Level, Difficulty, and Free/Premium status.

6. **Payment & Subscriptions (Kenya M-Pesa & Stripe USD Card)**
   - Monthly (KSh 499) and Annual (KSh 4,999) membership tiers.
   - Simulated Safaricom M-Pesa STK push prompt flow with receipt codes.
   - Simulated Stripe credit/debit card gateway.

7. **Multi-Persona Portals**
   - **Learner:** Track course completion percentages, study streak metrics, and bookmarks.
   - **Teacher Dashboard:** Course authoring suite, syllabus builder, enrolled learners monitoring, and M-Pesa royalties breakdown.
   - **Admin Dashboard:** Platform KPIs (total users, active learners, revenue, popular subjects, and highest traffic curricula).

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons.
- **Backend / APIs:** Netlify Functions (`netlify/functions/api.ts`) serving clean REST endpoints.
- **Database & ORM:** Netlify Database (managed PostgreSQL) with Drizzle ORM (`drizzle-orm@beta` + `drizzle-kit@beta`).
- **Migrations:** Automated migration scripts in `netlify/database/migrations/`.

---

## 🚀 Local Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Netlify Dev Server:**
   ```bash
   /opt/buildhome/node-deps/node_modules/.bin/netlify dev --port 8889
   ```

3. **Database Migrations:**
   To generate new schema migrations after editing `db/schema.ts`:
   ```bash
   npx drizzle-kit generate --name <migration_name>
   ```
