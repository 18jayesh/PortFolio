export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  metrics: string;
  tags: string[];
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: { name: string; level?: string; icon?: string }[];
}

export interface JourneyItem {
  period: string;
  degree: string;
  institution: string;
  location: string;
  description: string;
  highlights: string[];
  status?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
}

export const PERSONAL_INFO = {
  name: "Jayesh Mali",
  firstName: "Jayesh",
  lastName: "Mali",
  title: "Full Stack Developer",
  location: "Surat, Gujarat, India",
  city: "Surat",
  state: "Gujarat",
  country: "India",
  coordinates: "21.1702° N, 72.8311° E",
  timezone: "Asia/Kolkata",
  email: "jayeshmali245@gmail.com",
  phone: "+91 7863854896",
  phoneFormatted: "+91 78638 54896",
  github: "https://github.com/18jayesh",
  githubUsername: "18jayesh",
  linkedin: "https://linkedin.com/in/jayesh-mali-a88625343",
  linkedinUsername: "jayesh-mali-a88625343",
  avatar: "/images/jayesh.png",
  resumePath: "/Jayesh_Mali_Resume.pdf",
  status: "Available for freelance & full-time roles",
  rolesTicker: [
    "React.js & Next.js 15 Specialist",
    "Node.js & Express Architect",
    "MongoDB & Cloud Firestore Engineer",
    "Tailwind CSS & UI Craftsman",
    "Full-Stack JavaScript Developer"
  ],
  bioIntro:
    "Full Stack Developer from Surat, Gujarat, building high-impact digital experiences that unite surgical backend architecture with tactile, kinetic frontend design.",
  bioFull:
    "I craft responsive, scalable, and user-centric web applications using modern React, Next.js, Node.js, and cloud ecosystems. Deeply committed to developing end-to-end solutions, writing maintainable code, and turning complex workflows into intuitive, award-worthy web applications.",
  stats: [
    { value: "04", suffix: "+", label: "Shipped Projects", sublabel: "Live in production" },
    { value: "2025", suffix: "", label: "BCA Graduate", sublabel: "MKICS Bharuch" },
    { value: "100", suffix: "%", label: "MERN Stack Mastery", sublabel: "Frontend to Database" },
    { value: "04", suffix: "", label: "Spoken Languages", sublabel: "Gujarati, Hindi, English, Marathi" }
  ],
  languagesSpoken: [
    { name: "Gujarati", proficiency: "Native" },
    { name: "Hindi", proficiency: "Professional Working" },
    { name: "English", proficiency: "Professional Working" },
    { name: "Marathi", proficiency: "Professional" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "bim-billing",
    index: "01",
    title: "BIM Billing System",
    subtitle: "Enterprise Role-Based Billing & Payroll Platform",
    description:
      "A comprehensive industrial billing and attendance ecosystem designed for production facilities. Architected with discrete Admin, Contractor, and Karigar operational workflows, real-time salary calculation, attendance tracking, and dynamic billing generation.",
    tech: ["React.js", "Firebase Auth", "Cloud Firestore", "Tailwind CSS", "Role-Based Access"],
    liveUrl: "https://bimbillingsystem.vercel.app/",
    githubUrl: "https://github.com/18jayesh",
    image: "/projects/bim.png",
    metrics: "3 distinct role dashboards with automated payroll disbursal logic",
    tags: ["Enterprise SaaS", "Fintech / Cloud", "Firestore DB"],
    featured: true
  },
  {
    id: "payslip-generator",
    index: "02",
    title: "Payslip Generator",
    subtitle: "Full-Stack Payroll & Dynamic PDF Generation Platform",
    description:
      "A full-stack enterprise payroll suite enabling organizations to manage employee rosters, configure tiered salary breakdown structures, and generate branded high-resolution PDF payslips instantly. Features HTTP-only JWT security and Cloudinary image pipelines.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "Cloudinary", "Dynamic PDF"],
    liveUrl: "https://payslip-genrator-two.vercel.app/",
    githubUrl: "https://github.com/18jayesh",
    image: "/projects/payslip.png",
    metrics: "Instant PDF rendering with configurable multi-tier tax & salary templates",
    tags: ["Full Stack SaaS", "Dynamic PDF Engine", "JWT Cookie Auth"],
    featured: true
  },
  {
    id: "recipe-sharing",
    index: "03",
    title: "Recipe Sharing Platform",
    subtitle: "Real-Time Culinary Community & Content Hub",
    description:
      "A fast, modern recipe social platform engineered with Firebase real-time database synchronization. Features instant culinary search, user authentication, seamless recipe curation with image uploads, and an adaptive mobile-first reading view.",
    tech: ["React.js", "Firebase Auth", "Cloud Firestore", "Tailwind CSS", "Responsive UI"],
    liveUrl: "https://food-software.vercel.app/home",
    githubUrl: "https://github.com/18jayesh",
    image: "/projects/recipe.png",
    metrics: "Sub-second real-time sync with responsive culinary curation",
    tags: ["Real-Time Database", "Media Storage", "Community Web App"],
    featured: true
  },
  {
    id: "smart-home",
    index: "04",
    title: "Smart Home Manager",
    subtitle: "IoT Appliance Orchestration & Telemetry Dashboard",
    description:
      "A centralized smart home control system offering granular telemetry and state management for connected home appliances across multiple rooms. Engineered with a normalized relational database schema and administrative activity logging.",
    tech: ["PHP", "MySQL", "JavaScript ES6", "HTML5 / CSS3", "Bootstrap", "REST API"],
    liveUrl: "http://jayesh-smarthome.infinityfreeapp.com",
    githubUrl: "https://github.com/18jayesh",
    image: "/projects/smarthome.png",
    metrics: "Multi-room device state telemetry with administrative auditing",
    tags: ["IoT Management", "Relational Architecture", "Hardware Controller"],
    featured: false
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages",
    description: "Core expressive languages for type-safe and algorithmic development",
    skills: [
      { name: "JavaScript (ES6+)", level: "Advanced" },
      { name: "TypeScript", level: "Advanced" },
      { name: "HTML5 Semantic", level: "Expert" },
      { name: "CSS3 / Modern CSS", level: "Expert" }
    ]
  },
  {
    category: "Frontend",
    description: "Component-driven architectures, design systems, and rendering performance",
    skills: [
      { name: "React.js", level: "Advanced" },
      { name: "Next.js 15 (App Router)", level: "Advanced" },
      { name: "Tailwind CSS v4", level: "Expert" },
      { name: "Bootstrap 5", level: "Proficient" }
    ]
  },
  {
    category: "Backend",
    description: "Resilient server architectures, authentication strategies, and APIs",
    skills: [
      { name: "Node.js", level: "Advanced" },
      { name: "Express.js", level: "Advanced" },
      { name: "Firebase Auth", level: "Advanced" },
      { name: "PHP Core", level: "Proficient" }
    ]
  },
  {
    category: "Database",
    description: "NoSQL document stores, relational structures, and real-time synchronization",
    skills: [
      { name: "MongoDB", level: "Advanced" },
      { name: "Cloud Firestore", level: "Advanced" },
      { name: "Firebase Realtime DB", level: "Advanced" },
      { name: "MySQL", level: "Proficient" }
    ]
  },
  {
    category: "Tools & Ecosystem",
    description: "Version control, build bundlers, cloud pipelines, and developer tooling",
    skills: [
      { name: "Git & GitHub", level: "Advanced" },
      { name: "VS Code", level: "Expert" },
      { name: "Vite Bundler", level: "Advanced" },
      { name: "RESTful API Design", level: "Advanced" },
      { name: "Cloudinary Media", level: "Proficient" }
    ]
  }
];

export const MARQUEE_SKILLS_ROW1 = [
  "React.js",
  "Next.js 15",
  "TypeScript",
  "Node.js",
  "Tailwind CSS v4",
  "MongoDB",
  "Firebase Firestore",
  "Express.js",
  "JavaScript ES6+"
];

export const MARQUEE_SKILLS_ROW2 = [
  "Cloudinary",
  "REST APIs",
  "Git & GitHub",
  "Vite",
  "JWT Authentication",
  "MySQL",
  "Three.js & WebGL",
  "GSAP Animations",
  "Full Stack Architecture"
];

export const JOURNEY: JourneyItem[] = [
  {
    period: "2024 — Present",
    degree: "MERN Stack Full Stack Development",
    institution: "Red & White Multimedia Education",
    location: "Bharuch, Gujarat",
    description:
      "Rigorous hands-on engineering program mastering production-grade full stack architecture: MongoDB data modelling, Express API security, React component trees, state management, and modern cloud deployment patterns.",
    highlights: [
      "Built 4 full-stack real-world platforms with secure auth and dynamic databases",
      "Mastered server-side routing, JWT session architecture, and cloud asset workflows",
      "Architected role-based dashboards and payment/payroll calculating engines"
    ],
    status: "Ongoing Specialization"
  },
  {
    period: "2022 — 2025",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "MK Institute of Computer Studies",
    location: "Bharuch, Gujarat",
    description:
      "Comprehensive collegiate computer science education covering database management systems, algorithms, object-oriented programming, network architectures, and core software engineering life cycles.",
    highlights: [
      "Rigorous theoretical foundation in Relational Database Systems (RDBMS / MySQL)",
      "Object-Oriented Programming (OOP) design patterns and software testing",
      "Dean's list candidate with practical capstone development in PHP & MySQL"
    ],
    status: "Graduating 2025"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "full-stack",
    number: "01",
    title: "Full-Stack Web Applications",
    tagline: "End-to-end web apps crafted for speed, scale, and longevity.",
    description:
      "From database schema modeling to fluid frontend components, I engineer cohesive full-stack web applications that handle critical business workflows with zero friction.",
    deliverables: [
      "Next.js & React production architecture",
      "Secure Node/Express & Firebase backends",
      "Custom authentication & authorization",
      "Automated deployment & hosting configuration"
    ]
  },
  {
    id: "dashboards",
    number: "02",
    title: "Interactive Dashboards & Admin Portals",
    tagline: "Role-driven control rooms that make complex telemetry clear.",
    description:
      "Transforming messy data into actionable intelligence. I design high-density, lightning-fast administrative dashboards with real-time updates, custom filters, and granular role permissions.",
    deliverables: [
      "Role-based permission workflows (Admin/Employee/Client)",
      "Real-time Firestore and WebSocket updates",
      "Dynamic data tables with instant filtering & export",
      "Responsive layout optimized for tablet and desktop"
    ]
  },
  {
    id: "billing-fintech",
    number: "03",
    title: "E-Commerce & Billing Engines",
    tagline: "Precision calculation systems with automated document generation.",
    description:
      "Specialized in platforms that calculate salaries, manage invoices, track inventory, and generate tamper-proof PDF documentation for production teams and enterprises.",
    deliverables: [
      "Dynamic PDF generation (invoices, payslips, reports)",
      "Automated attendance & salary calculation logic",
      "Payment tracking & ledger record systems",
      "Cloudinary asset & logo storage integration"
    ]
  },
  {
    id: "api-backend",
    number: "04",
    title: "REST APIs & Cloud Backends",
    tagline: "Clean, documented, and resilient API contracts.",
    description:
      "Designing well-structured RESTful APIs with strict validation, HTTP-only cookie security, rate limiting, and seamless database indexing on MongoDB and MySQL.",
    deliverables: [
      "RESTful API design with clean resource routing",
      "JWT authentication with cookie security",
      "MongoDB schema design & indexing",
      "Cloud storage & third-party webhook integrations"
    ]
  }
];

export const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Work", href: "#projects" },
  { name: "Journey", href: "#journey" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" }
];
