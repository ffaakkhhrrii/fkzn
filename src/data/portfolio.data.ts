import { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: 'Fakhri Zain',
    title: 'Software Developer',
    location: 'East Jakarta, Indonesia',
    email: 'fakhrizain9@gmail.com',
    phone: '+62 851-7690-1068',
    shortBio: 'Software Developer focused on creating clean, efficient, and impactful software solutions.',
    bio: "I'm a Software Developer with 2+ years of experience building applications that solve real problems. I enjoy the process of breaking down complex challenges whether it's designing a feature from scratch or debugging something no one else wants to touch. I've worked both independently and in collaborative team settings, and I pick up new tools and technologies quickly whenever a project calls for it. Outside of writing code, I'm always looking for ways to sharpen my skills and take on projects that push me to learn something new.",
    profilePhoto: {
      path: '/assets/images/opt/profile-800.jpg',
      alt: 'Fakhri Zain',
    },
  },

  socialLinks: {
    github: 'https://github.com/ffaakkhhrrii',
    linkedin: 'https://linkedin.com/in/fakhrizain/',
    instagram: 'https://www.instagram.com/fkhri.zain',
  },

  skills: {
    programmingLanguages: [
      'Kotlin',
      'Dart',
      'Java',
      'JavaScript',
      'PHP',
      'Python',
      'C#',
      'TypeScript'
    ],
    versionControl: ['Bitbucket', 'Git', 'GitLab'],
    databases: ['PostgreSQL', 'MySQL', 'SQL Server', 'Firebase'],
    frameworks: ['CodeIgniter', 'Laravel', 'Tailwind CSS', 'Jetpack Compose', 'Room', 'Flutter', 'React', 'FastAPI', 'GraphQL'],
    llmTooling: ['LangChain (LLM application development)'],
    testing: ['Playwright'],
  },

  experience: [
    {
      position: 'Software Developer',
      company: 'ADW Consulting',
      location: 'Jakarta, Indonesia / Hybrid',
      duration: 'June 2025 - Present',
      description:
        'Developed and maintained procurement platforms across Android and web, delivering end-to-end features from backend architecture to deployment. Collaborated cross-functionally with developers and implementors to ensure smooth delivery and issue resolution.\n• LLM Integrations – Designed and implemented LLM-powered features across platforms, including backend logic and AI-assisted pipelines, to support business insight generation.\n• Test Automation – Contributed to a Playwright + TypeScript test automation website with AI that generates test scenarios from prompts.\n• API Integration – Built and integrated backend APIs to support seamless communication between the Android application and backend services.\n• System Design – Architected scalable, database-driven systems to replace hardcoded logic and improve maintainability.\n• Feature Development – Building and implementing new features based on business requirements.\n• Documentation – Produced technical documentation covering system architecture and feature logic to support long-term maintainability and team onboarding.\n• Team Collaboration – Worked closely with developers and implementors to troubleshoot issues, align on requirements, and ship features across platforms.',
      technologies: [
        'Python',
        'PHP',
        'Kotlin',
        'JavaScript',
        'TypeScript',
        'Tailwind CSS',
        'PostgreSQL',
        'LangChain',
        'CodeIgniter 4',
        'Laravel',
        'FastAPI',
        'Playwright',
        'Room',
        'GraphQL',
      ],
    },
    {
      position: 'Software Developer Intern',
      company: 'ADW Consulting',
      location: 'Jakarta, Indonesia / Hybrid',
      duration: 'May 2024 - March 2025',
      description:
        'Assisted in the development and maintenance of procurement platforms across Android and web, with a focus on bug fixing and testing. Collaborated with senior developers to ensure application stability and improve testing efficiency.',
      technologies: [
        'PHP',
        'Kotlin',
        'JavaScript',
        'Tailwind CSS',
        'PostgreSQL',
        'CodeIgniter 4',
        'Room',
      ],
    },
  ],

  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Binus Online University',
      location: 'Indonesia',
      duration: '2025 - 2029',
      gpa: '3.95',
      relevantCoursework: 'Data Structures, Algorithms, Software Design, etc.',
    },
    {
      degree: 'Computer and Network Engineering',
      institution: 'Vocational Highschool 26 Jakarta',
      location: 'Jakarta, Indonesia',
      duration: '2021 - 2025',
    },
  ],

  communities: [
    {
      role: 'Student Skills Competition Selection Jury & Mentor',
      duration: '2025 - 2026',
      description:
        "Served as Selection Jury and Mentor for students of SMKN 26 Jakarta competing in the Lomba Kompetensi Siswa (LKS) IT Software Solution for Business, Indonesia's national student skills competition.",
    },
    {
      role: 'Software Application Mentor - IT Club',
      organization: 'Vocational High School 26 Jakarta',
      duration: '2023 - 2024',
      description:
        'Teaching junior members, in learning the basic fundamentals of android application development.',
    },
    {
      role: 'Religious Affairs Division Leader - Student Council',
      organization: 'Vocational High School 26 Jakarta',
      duration: '2022 - 2023',
      description:
        'Led the division in planning, supervising, and running religious activities at school.',
    },
  ],

  projects: [
    {
      name: 'EDEAF',
      description:
        'EDEAF is an application that designed to assist the deaf students in their learning process, incorporating various engaging features to make the application smart, easy, and fun to use. This application idea is used for the Hackathon Competition by Pijar Camp ID',
      featured: true,
      role: 'Developer',
      technologies: ['Kotlin', 'Firebase'],
      links: {
        github: 'https://github.com/ffaakkhhrrii/edeaf',
      },
      image: { src: '/assets/images/opt/edeaf-1280.jpg', srcSet: '/assets/images/opt/edeaf-640.jpg 640w, /assets/images/opt/edeaf-1280.jpg 911w', width: 911, height: 952 },
    },
    {
      name: 'Quick Notes',
      description:
        "A clean and minimal notes app built with Jetpack Compose — type, scan, or speak your notes and keep them organized.",
      role: 'Developer',
      technologies: ['Kotlin', 'Jetpack Compose', 'Dagger Hilt', 'Room'],
      links: {
        github: 'https://github.com/ffaakkhhrrii/quick_notes',
      },
      image: { src: '/assets/images/opt/quick_notes-1280.jpg', srcSet: '/assets/images/opt/quick_notes-640.jpg 640w, /assets/images/opt/quick_notes-1280.jpg 1280w', width: 1280, height: 720 },
    },
    {
      name: 'Code Path',
      description:
        'Code Path is a simple application I created with the aim of helping users find references, knowledge, materials, news, and roadmaps in the IT field, tailored to their specific areas of expertise.',
      role: 'Developer',
      technologies: ['Flutter', 'Firebase', 'BLoc'],
      links: {
        github: 'https://github.com/ffaakkhhrrii/code_path',
      },
      image: { src: '/assets/images/opt/code_path-1280.jpg', srcSet: '/assets/images/opt/code_path-640.jpg 640w, /assets/images/opt/code_path-1280.jpg 1280w', width: 1280, height: 720 },
    },
    {
      name: 'Faith App',
      description: "Faith is an Android app that helps Muslims in Indonesia with daily worship — prayer times, reading the Quran, and prayer reminders. It's the mobile version of the <a href='https://faith.fkzn.my.id/' target='_blank' rel='noopener noreferrer'>Faith Web</a>",
      role: 'Developer',
      technologies: ['Kotlin', 'Jetpack Compose', 'Dagger Hilt', 'Room', 'DataStore', 'Glance'],
      links: {
        github: 'https://github.com/ffaakkhhrrii/faith-app',
      },
      image: { src: '/assets/images/opt/faith-1280.jpg', srcSet: '/assets/images/opt/faith-640.jpg 640w, /assets/images/opt/faith-1280.jpg 1280w', width: 1280, height: 720 },
    },
    {
      name: 'Faith Web',
      description:
        "A web app for daily worship: today's prayer times for any city in Indonesia, one verse a day, and all 114 Surahs with Indonesian translation and tafsir. It's the web version of the Faith App.",
      role: 'Developer',
      technologies: ['Next.js', 'TypeScript', 'TanStack Query', 'Tailwind CSS'],
      links: {
        github: 'https://github.com/ffaakkhhrrii/faith',
        live: 'https://faith.fkzn.my.id/',
      },
      image: { src: '/assets/images/opt/faith_web-1280.jpg', srcSet: '/assets/images/opt/faith_web-640.jpg 640w, /assets/images/opt/faith_web-1280.jpg 1280w', width: 1280, height: 720 },
    },
    {
      name: 'CNN Prediction',
      description:
        'A web app that classifies images into the 10 CIFAR-10 categories (airplane, car, bird, cat, deer, dog, frog, horse, ship, truck). Upload an image and a tuned CNN model with BatchNorm and Dropout (80% test accuracy) returns the predicted class along with the probability for each class.',
      role: 'Developer',
      technologies: ['Python', 'TensorFlow', 'Keras', 'Flask'],
      links: {
        live: 'https://cnn-prediction.fkzn.my.id/',
      },
      image: { src: '/assets/images/opt/cnn_prediction-1280.jpg', srcSet: '/assets/images/opt/cnn_prediction-640.jpg 640w, /assets/images/opt/cnn_prediction-1280.jpg 1280w', width: 1280, height: 1041 },
    },

  ],

  achievements: [
    {
      title: '3rd Place LKS IT Software Solution For Business DKI Jakarta Province',
      organization:
        'Kementerian Pendidikan dan Kebudayaan (Ministry of Education and Culture Republic of Indonesia)',
      date: 'Jun 2024',
      description: 'Secured 3rd place in the provincial-level IT Software Solution competition',
      featured: true,
    },
    {
      title: '1st Place LKS IT Software Solution For Business East Jakarta Region 2024',
      organization:
        'Kementerian Pendidikan dan Kebudayaan (Ministry of Education and Culture Republic of Indonesia)',
      date: 'May 2024',
      description:
        'Won 1st place in the regional-level IT Software Solution competition for East Jakarta',
      featured: true,
    },
    {
      title: '1st Place in the Pijar Camp by Telkom Indonesia Hackathon Competition',
      organization: 'Pijar Camp',
      date: 'Nov 2023',
      description: 'Won 1st place in the Telkom Indonesia Hackathon competition',
      featured: true,
    },
    {
      title: '4th Place Cloud Computing Club (Web Design Competition) DKI Jakarta Province 2024',
      organization: 'Yayasan Sagasitas Indonesia',
      date: 'Feb 2024',
      description: 'Achieved 4th place in the Cloud Computing Club (Web Design Competition) at provincial level',
      featured: false,
    },
    {
      title: 'Finalist Software Engineering Development And Logical Competition',
      organization: 'BINUS University',
      date: 'Sep 2023',
      description:
        'Selected as finalist in the Software Engineering Development and Logical Competition',
      featured: false,
    },
    {
      title: '2nd Place LKS IT Software Solution For Business East Jakarta Region 2023',
      organization:
        'Kementerian Pendidikan dan Kebudayaan (Ministry of Education and Culture Republic of Indonesia)',
      date: 'Aug 2023',
      description:
        'Secured 2nd place in the regional-level IT Software Solution competition for East Jakarta',
      featured: false,
    },
    {
      title: '3rd Place Kompetisi Periksa Fakta Bagi Pelajar dan Mahasiswa',
      organization: 'Mafindo',
      date: 'Aug 2023',
      description: 'Achieved 3rd place in the Fact-Checking Competition for Students',
      featured: false,
    },
  ],

  seo: {
    metaTitle: 'Fakhri Zain - Software Developer',
    metaDescription:
      'Personal website of Fakhri Zain, a Software Developer specializing in Application Development. View my portfolio, projects, and get in touch.',
    keywords: 'software developer',
    openGraphImage: '/assets/images/og.jpg',
  },

  theme: {
    defaultTheme: 'light',
    enableThemeToggle: false,
  },
};
