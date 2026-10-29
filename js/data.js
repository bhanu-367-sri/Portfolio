/**
 * =========================================================================
 * BHANU SRI DAMISETTY - PORTFOLIO DATA CONFIGURATION
 * =========================================================================
 * 
 * Welcome! This file is the single source of truth for your entire portfolio.
 * To update your portfolio:
 * 1. Edit the information in this file (projects, certificates, skills, bio).
 * 2. Save this file.
 * 3. Refresh your portfolio in the browser. That's it! No HTML editing needed!
 * 
 * Tip: You can also use the included "update-helper.html" tool in your browser
 * to generate new project or certificate entries visually!
 * =========================================================================
 */

window.PORTFOLIO_DATA = {
  // -----------------------------------------------------------------------
  // 1. PERSONAL INFORMATION
  // -----------------------------------------------------------------------
  personal: {
    name: "Bhanu Sri Damisetty",
    shortName: "Bhanu",
    title: "Aspiring Software Engineer & AI Developer",
    location: "India",
    email: "bhanusridamisetty@gmail.com",
    avatar: "my-photo.jpg", // Path to your photo
    status: {
      available: true,
      text: "Available for Internships & Projects"
    },
    // Rotating roles displayed in the hero section (typewriter effect)
    rotatingRoles: [
      "Full-Stack Developer",
      "AI & Machine Learning Explorer",
      "Python Programmer",
      "Creative Problem Solver"
    ],
    // Hero short intro paragraph
    heroBio: "I build intuitive web experiences and intelligent AI-powered solutions. Passionate about transforming complex engineering challenges into clean, accessible, and high-impact digital products.",
    // Social & Profile links
    socials: {
      github: "https://github.com/bhanu-367-sri",
      linkedin: "https://www.linkedin.com/in/bhanu-sri-damisetty-4890553a2",
      email: "mailto:bhanusridamisetty@gmail.com",
      resumePdf: "resume.pdf" // Drop your resume.pdf into the portfolio folder!
    },
    // Key metric highlights
    stats: [
      { value: "4+", label: "Key Projects" },
      { value: "10+", label: "Tech Stack Tools" },
      { value: "100%", label: "Curiosity Driven" },
      { value: "AI+Web", label: "Core Focus" }
    ]
  },

  // -----------------------------------------------------------------------
  // 2. ABOUT ME SECTION
  // -----------------------------------------------------------------------
  about: {
    heading: "Bridging curiosity, clean code, and intelligent systems.",
    paragraphs: [
      "Hello! I'm Bhanu Sri Damisetty, an aspiring software developer with an enthusiastic drive for building practical software solutions. My journey spans full-stack web engineering, Python development, and applied artificial intelligence.",
      "I thrive at the intersection of logical problem solving and human-centered design—whether crafting assistive AI applications for education and healthcare, designing performant backend workflows, or building responsive web interfaces.",
      "I believe the best way to master technology is through deliberate, hands-on creation. When I'm not coding, you'll find me exploring emerging AI models, competing in hackathons, and expanding my computer science fundamentals."
    ],
    keyPillars: [
      {
        icon: "⚡",
        title: "Practical Problem Solving",
        description: "Transforming real-world requirements into scalable, clean, and maintainable software implementations."
      },
      {
        icon: "🧠",
        title: "AI-Augmented Applications",
        description: "Leveraging Large Language Models, prompt engineering, and multimodal APIs to build intelligent assistants."
      },
      {
        icon: "🛠️",
        title: "Full-Stack Foundations",
        description: "Creating responsive user interfaces backed by structured databases, REST APIs, and clean architecture."
      },
      {
        icon: "🌱",
        title: "Continuous Learning",
        description: "Consistently sharpening data structures, algorithms, modern frameworks, and engineering best practices."
      }
    ],
    education: [
      {
        degree: "Bachelor of Technology in Computer Science & Engineering",
        institution: "Undergraduate Program",
        period: "2022 — Present",
        details: "Focusing on Software Engineering, Data Structures & Algorithms, Object-Oriented Programming, Database Systems, and Artificial Intelligence."
      }
    ]
  },

  // -----------------------------------------------------------------------
  // 3. SKILLS & TECHNOLOGIES
  // -----------------------------------------------------------------------
  skills: {
    categories: [
      {
        id: "languages",
        name: "Languages",
        icon: "💻",
        skills: [
          { name: "Python", level: "Advanced", icon: "Py" },
          { name: "JavaScript (ES6+)", level: "Proficient", icon: "JS" },
          { name: "Java", level: "Intermediate", icon: "J" },
          { name: "SQL", level: "Proficient", icon: "SQL" },
          { name: "HTML5 & CSS3", level: "Advanced", icon: "H5" }
        ]
      },
      {
        id: "ai-data",
        name: "AI & Data Science",
        icon: "🤖",
        skills: [
          { name: "Gemini API & Multimodal AI", level: "Advanced", icon: "AI" },
          { name: "Prompt Engineering", level: "Advanced", icon: "PE" },
          { name: "LLM App Integration", level: "Proficient", icon: "LLM" },
          { name: "Data Handling & Processing", level: "Intermediate", icon: "DH" },
          { name: "Computer Vision Basics (YOLO)", level: "Familiar", icon: "CV" }
        ]
      },
      {
        id: "web-backend",
        name: "Web & Frameworks",
        icon: "🌐",
        skills: [
          { name: "FastAPI", level: "Proficient", icon: "FA" },
          { name: "Flask", level: "Proficient", icon: "Fl" },
          { name: "RESTful API Design", level: "Proficient", icon: "API" },
          { name: "Responsive UI & Tailwind CSS", level: "Advanced", icon: "UI" },
          { name: "DOM Manipulation & Async JS", level: "Advanced", icon: "DOM" }
        ]
      },
      {
        id: "tools",
        name: "Developer Tools & Practices",
        icon: "⚙️",
        skills: [
          { name: "Git & GitHub", level: "Proficient", icon: "Git" },
          { name: "VS Code", level: "Advanced", icon: "VSC" },
          { name: "Postman API Testing", level: "Proficient", icon: "PM" },
          { name: "Object-Oriented Design (OOP)", level: "Proficient", icon: "OOP" },
          { name: "PWA & Offline Web Apps", level: "Intermediate", icon: "PWA" }
        ]
      }
    ]
  },

  // -----------------------------------------------------------------------
  // 4. PROJECTS
  // -----------------------------------------------------------------------
  // Each project can have categories: 'all', 'ai', 'web', 'tools'
  // -----------------------------------------------------------------------
  projects: [
    {
      id: "medvision-ai",
      title: "MedVision AI — Multimodal Learning Companion",
      category: "ai",
      featured: true,
      tagline: "AI-powered STEM learning companion with Gemini multimodal vision, speech synthesis, and offline-first PWA caching.",
      description: "An advanced, child-friendly learning and diagnostic education companion built for students. Features an interactive AI tutor backed by Google Gemini 2.5 Flash, image upload/drag-and-drop for STEM problem solving, speech recognition, read-aloud controls, and multilingual explanations (English, Hindi, Telugu, Spanish, French). Includes full offline capability with Service Worker caching for subject modules and practice quizzes.",
      tags: ["Python", "FastAPI", "Gemini 2.5 Flash", "Multimodal AI", "PWA", "Speech Synthesis"],
      github: "https://github.com/bhanu-367-sri/MedVision_AI",
      demo: "https://github.com/bhanu-367-sri/MedVision_AI",
      icon: "🧠",
      badge: "Hackathon Feature",
      highlights: [
        "Multimodal homework problem solving via image upload and vision analysis",
        "Multilingual explanations tailored for Grades 6–12 in English, Hindi, and Telugu",
        "Browser speech recognition and text-to-speech audio for accessible learning",
        "Service worker integration enabling offline quizzes and subject revision"
      ]
    },
    {
      id: "medical-assistant",
      title: "Medical Assistant AI",
      category: "ai",
      featured: true,
      tagline: "Intelligent clinical symptom inquiry and health advisory assistant with robust safety protocols.",
      description: "A Python-based healthcare advisory application providing structured, symptom-based preliminary insights, medical reference guidance, and clinical triage recommendations. Emphasizes responsible AI workflows with automatic disclaimers, clear triage classifications, and structured query parsing.",
      tags: ["Python", "NLP", "Healthcare AI", "Prompt Engineering", "Data Processing"],
      github: "https://github.com/bhanu-367-sri/MEDICAL_ASSISTANT",
      demo: "https://github.com/bhanu-367-sri/MEDICAL_ASSISTANT",
      icon: "🩺",
      badge: "Core Project",
      highlights: [
        "Structured symptom assessment workflows with clinical categorization",
        "Embedded safety checks and professional medical consultation disclaimers",
        "Clean, conversational interface for intuitive query interaction",
        "Modular Python architecture for easy expansion to new diagnostic categories"
      ]
    },
    {
      id: "career-companion",
      title: "Career Companion Platform",
      category: "web",
      featured: true,
      tagline: "Comprehensive career preparation, mock interview practice, and resume readiness platform.",
      description: "An all-in-one web platform designed to empower students and early-career software developers. Offers curated technical interview question banks, interactive career readiness checklists, resume optimization tips, and structured interview rubrics.",
      tags: ["JavaScript", "HTML5", "CSS3", "Career Tools", "Responsive Design"],
      github: "https://github.com/bhanu-367-sri/CAREER_COMPANION",
      demo: "https://github.com/bhanu-367-sri/CAREER_COMPANION",
      icon: "💼",
      badge: "Web Platform",
      highlights: [
        "Curated technical interview question repositories across core CS topics",
        "Interactive readiness checklist with progress tracking",
        "Lightweight, responsive interface optimized for desktop and mobile devices",
        "Built-in cheat sheets for algorithms, system design, and behavioral questions"
      ]
    },
    {
      id: "modern-portfolio",
      title: "Scalable Data-Driven Developer Portfolio",
      category: "web",
      featured: false,
      tagline: "Modular, high-performance personal portfolio architecture with zero backend dependency.",
      description: "A fast, accessible, and easily maintainable personal portfolio engineered with vanilla web technologies. Features a centralized data configuration architecture, client-side search and filtering, dark/light theme switching, and an interactive update companion tool.",
      tags: ["JavaScript (ES6+)", "CSS Custom Properties", "Glassmorphism", "Responsive UX"],
      github: "https://github.com/bhanu-367-sri",
      demo: "#",
      icon: "✨",
      badge: "Open Source",
      highlights: [
        "Single configuration file for 1-minute updates to all portfolio sections",
        "Zero build tools or node modules needed—runs instantly in any browser",
        "Full client-side search across all projects, tags, and certificates",
        "Accessible, high-contrast dark and light themes with smooth transitions"
      ]
    }
  ],

  // -----------------------------------------------------------------------
  // 5. CERTIFICATES & CREDENTIALS
  // -----------------------------------------------------------------------
  // Categories: 'all', 'ai', 'web', 'data', 'achievement'
  // -----------------------------------------------------------------------
  certificates: [
    {
      id: "cert-python-ai",
      title: "Python for AI & Modern Application Development",
      issuer: "Professional Learning / DeepLearning.AI",
      date: "2024",
      category: "ai",
      credentialUrl: "https://www.linkedin.com/in/bhanu-sri-damisetty-4890553a2",
      icon: "🐍",
      skills: ["Python", "REST APIs", "AI Prompt Engineering", "FastAPI"],
      description: "Comprehensive coursework covering clean Python architecture, API integrations, asynchronous programming, and building generative AI workflows."
    },
    {
      id: "cert-fullstack-web",
      title: "Responsive Web Design & Modern JavaScript",
      issuer: "freeCodeCamp / Developer Certification",
      date: "2024",
      category: "web",
      credentialUrl: "https://www.linkedin.com/in/bhanu-sri-damisetty-4890553a2",
      icon: "🌐",
      skills: ["HTML5", "CSS3 Flexbox/Grid", "JavaScript ES6+", "DOM API"],
      description: "Rigorous certification covering semantic HTML, accessible CSS styling, responsive layout design, and modern asynchronous JavaScript programming."
    },
    {
      id: "cert-sql-databases",
      title: "SQL & Relational Database Management",
      issuer: "HackerRank / Standardized Assessment",
      date: "2024",
      category: "data",
      credentialUrl: "https://www.linkedin.com/in/bhanu-sri-damisetty-4890553a2",
      icon: "💾",
      skills: ["SQL Queries", "Schema Design", "Joins & Aggregations", "Data Integrity"],
      description: "Demonstrated proficiency in writing advanced SQL queries, subqueries, relational modeling, data integrity constraints, and query optimization."
    },
    {
      id: "cert-hackathon-medvision",
      title: "MedVision AI Hackathon — Project Builder",
      issuer: "AI Hackathon Consortium",
      date: "2024",
      category: "achievement",
      credentialUrl: "https://github.com/bhanu-367-sri/MedVision_AI",
      icon: "🏆",
      skills: ["Multimodal AI", "FastAPI", "Full-Stack AI Prototyping"],
      description: "Designed, integrated, and presented an AI multimodal learning and health education system leveraging Google Gemini Vision models and FastAPI."
    }
  ],

  // -----------------------------------------------------------------------
  // 6. CONTACT & FOOTER CONFIGURATION
  // -----------------------------------------------------------------------
  contact: {
    heading: "Let's build something remarkable together.",
    subheading: "Whether you have an internship opportunity, an interesting project collaboration, or simply want to chat about AI and software development, my inbox is always open!",
    directEmail: "bhanusridamisetty@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/bhanu-sri-damisetty-4890553a2",
    githubUrl: "https://github.com/bhanu-367-sri",
    location: "India (Open to Remote & On-Site Opportunities)"
  }
};
