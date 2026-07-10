import { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: 'Fakhri Zain',
    title: 'Software Developer',
    location: 'Jakarta, Indonesia',
    email: 'fakhrizain9@gmail.com',
    phone: '+62 851-7690-1068',
    bio: 'Enthusiastic programmer specializing in application development, with strong analytical thinking and problem-solving skills. Experienced in both individual and collaborative environments, with proven ability to adapt, learn quickly, and deliver innovative solutions. I am continuously eager to learn, contribute to innovative projects, and expand my knowledge and skills in the ever-evolving tech landscape.',
    profilePhoto: {
      path: '/assets/images/profile.png',
      alt: 'Fakhri Zain',
    },
  },

  socialLinks: {
    github: 'https://github.com/ffaakkhhrrii',
    linkedin: 'https://www.linkedin.com/in/fakhri-zain-8286a1226/',
    instagram: 'https://www.instagram.com/fkhri.zain',
  },

  skills: {
    programmingLanguages: [
      'Kotlin',
      'Flutter',
      'Java',
      'JavaScript',
      'PHP',
      'Python',
      'C#'
    ],
    versionControl: ['Bitbucket', 'GIT'],
    databases: ['PostgreSQL', 'MySQL', 'SQL Server Database', 'Firebase'],
    frameworks: ['CodeIgniter', 'Laravel', 'Tailwind', 'Jetpack Compose'],
    other: ['Langchain for LLM Application'],
  },

  experience: [
    {
      position: 'Software Developer',
      company: 'ADW Consulting',
      location: 'Jakarta, Indonesia / Hybrid',
      duration: 'June 2025 - Present',
      description:
        'Developed and maintained procurement platforms across Android and web, delivering end-to-end features from backend architecture to deployment. Collaborated cross-functionally with developers and implementors to ensure smooth delivery and issue resolution.\n• Feature Development – Designed and implemented new features across platforms, including backend logic and AI-assisted capabilities to support business insight generation.\n• API Integration – Built and integrated backend APIs to support seamless communication between the Android application and backend services.\n• System Design – Architected scalable, database-driven systems to replace hardcoded logic and improve maintainability.\n• Feature Development – Building and implementing new features based on business requirements.\n• Documentation – Produced technical documentation covering system architecture and feature logic to support long-term maintainability and team onboarding.\n• Team Collaboration – Worked closely with developers and implementors to troubleshoot issues, align on requirements, and ship features across platforms.',
      technologies: [
        'Python',
        'PHP',
        'Kotlin',
        'JavaScript',
        'Tailwind CSS',
        'PostgreSQL',
        'LangChain',
        'CodeIgniter 4',
        'Laravel',
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
        'Developed and maintained procurement platforms across Android and web, delivering end-to-end features from backend architecture to deployment. Collaborated cross-functionally with developers and implementors to ensure smooth delivery and issue resolution.',
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
      gpa: '4.00',
      relevantCoursework: 'Data Structures, Algorithms, Software Design, etc.',
    },
    {
      degree: 'Network and Application Information Systems',
      institution: 'Vocational Highschool 26 Jakarta',
      location: 'Jakarta, Indonesia',
      duration: '2021 - 2024',
    },
  ],

  projects: [
    {
      name: 'EDEAF',
      description:
        'EDEAF is an application that designed to assist the deaf students in their learning process, incorporating various engaging features to make the application smart, easy, and fun to use. This application idea is used for the Hackathon Competition by Pijar Camp ID',
      role: 'Developer',
      technologies: ['Kotlin', 'Firebase'],
      links: {
        github: 'https://github.com/ffaakkhhrrii/edeaf',
      },
      images: ['/assets/images/edeaf.png'],
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
      images: ['/assets/images/quick_notes.png'],
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
      images: ['/assets/images/code_path.png'],
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
      date: 'Mar 2024',
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
    openGraphImage: '/assets/images/profile.png',
  },

  theme: {
    defaultTheme: 'dark',
    enableThemeToggle: false,
  },
};
