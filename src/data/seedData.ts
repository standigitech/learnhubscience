import { Subject, Course, Lesson, Article, Resource, TeacherProfile, Quiz, LearnerProgress } from '../types/index.js';

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
    topicId: 101,
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
