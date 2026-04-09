// AI-generated career recommendations based on sub-domains
export interface CareerOption {
  id: string;
  title: string;
  matchPercentage: number;
  description: string;
  requiredSkills: string[];
  salaryRange: string;
  demandLevel: "High" | "Medium" | "Low";
  futureScope: string;
}

export interface Roadmap {
  id: string;
  title: string;
  milestones: Milestone[];
  estimatedDuration: string;
}

export interface Milestone {
  title: string;
  duration: string;
  description: string;
  resources: string[];
}

export interface Resource {
  id: string;
  title: string;
  type: "free" | "paid";
  platform: string;
  url: string;
  description: string;
}

// Career recommendations database (AI-generated)
export const careerRecommendations: { [key: string]: CareerOption[] } = {
  cse: [
    {
      id: "career-1",
      title: "Full-Stack Software Developer",
      matchPercentage: 92,
      description:
        "Design and develop complete web applications from frontend to backend, working with modern frameworks and cloud technologies",
      requiredSkills: ["React", "Node.js", "Databases", "APIs", "Cloud Services"],
      salaryRange: "₹8-30 LPA",
      demandLevel: "High",
      futureScope:
        "Excellent growth opportunities with increasing demand for full-stack developers in startups and enterprises. Strong potential for remote work and freelancing.",
    },
    {
      id: "career-2",
      title: "AI/ML Engineer",
      matchPercentage: 85,
      description:
        "Build intelligent systems using machine learning algorithms and neural networks to solve complex problems",
      requiredSkills: ["Python", "TensorFlow", "Data Science", "Mathematics", "Deep Learning"],
      salaryRange: "₹10-40 LPA",
      demandLevel: "High",
      futureScope:
        "One of the fastest-growing fields with applications in every industry. High demand for specialized AI engineers in healthcare, finance, and tech companies.",
    },
    {
      id: "career-3",
      title: "DevOps Engineer",
      matchPercentage: 78,
      description:
        "Streamline software development and deployment processes using automation, CI/CD pipelines, and cloud infrastructure",
      requiredSkills: ["Docker", "Kubernetes", "AWS/Azure", "Linux", "Automation Tools"],
      salaryRange: "₹9-35 LPA",
      demandLevel: "High",
      futureScope:
        "Critical role in modern software companies. Growing demand as companies adopt cloud-native architectures and microservices.",
    },
  ],
  "software-eng": [
    {
      id: "career-4",
      title: "Backend Software Engineer",
      matchPercentage: 90,
      description:
        "Build scalable server-side applications and APIs that power modern web and mobile applications",
      requiredSkills: ["Node.js/Python/Java", "Databases", "System Design", "APIs", "Security"],
      salaryRange: "₹9-32 LPA",
      demandLevel: "High",
      futureScope:
        "Strong demand in tech companies for building robust backend systems. Opportunities to work on high-scale distributed systems.",
    },
    {
      id: "career-5",
      title: "Frontend Engineer",
      matchPercentage: 88,
      description:
        "Create beautiful, responsive user interfaces using modern JavaScript frameworks and design principles",
      requiredSkills: ["React/Vue", "TypeScript", "CSS", "UI/UX", "Performance Optimization"],
      salaryRange: "₹7-28 LPA",
      demandLevel: "High",
      futureScope:
        "Growing importance of user experience drives demand for skilled frontend engineers. Remote work opportunities abundant.",
    },
    {
      id: "career-6",
      title: "Mobile App Developer",
      matchPercentage: 82,
      description:
        "Develop native or cross-platform mobile applications for iOS and Android platforms",
      requiredSkills: ["React Native/Flutter", "Mobile APIs", "App Store Guidelines", "UI/UX"],
      salaryRange: "₹7-30 LPA",
      demandLevel: "High",
      futureScope:
        "Mobile-first world ensures continuous demand. Opportunities in startups, enterprises, and freelancing.",
    },
  ],
  "data-science": [
    {
      id: "career-7",
      title: "Data Scientist",
      matchPercentage: 94,
      description:
        "Extract insights from data using statistical analysis, machine learning, and data visualization",
      requiredSkills: ["Python", "Statistics", "ML Algorithms", "Data Visualization", "SQL"],
      salaryRange: "₹10-38 LPA",
      demandLevel: "High",
      futureScope:
        "Explosive growth across all industries. Companies increasingly rely on data-driven decision making.",
    },
    {
      id: "career-8",
      title: "Business Intelligence Analyst",
      matchPercentage: 86,
      description:
        "Transform business data into actionable insights using analytics tools and visualization",
      requiredSkills: ["SQL", "Tableau/PowerBI", "Excel", "Data Modeling", "Business Acumen"],
      salaryRange: "₹6-25 LPA",
      demandLevel: "High",
      futureScope:
        "Essential role in modern businesses. Strong career progression to leadership positions.",
    },
    {
      id: "career-9",
      title: "Data Engineer",
      matchPercentage: 83,
      description:
        "Build and maintain data pipelines and infrastructure that enable data analysis at scale",
      requiredSkills: ["Python", "SQL", "ETL Tools", "Big Data", "Cloud Platforms"],
      salaryRange: "₹9-35 LPA",
      demandLevel: "High",
      futureScope:
        "Critical role as data volumes grow exponentially. High demand in tech companies and enterprises.",
    },
  ],
  mba: [
    {
      id: "career-10",
      title: "Product Manager",
      matchPercentage: 91,
      description:
        "Define product strategy and roadmap, working with engineering and design teams to build successful products",
      requiredSkills: ["Strategy", "Communication", "Data Analysis", "User Research", "Leadership"],
      salaryRange: "₹12-50 LPA",
      demandLevel: "High",
      futureScope:
        "One of the most sought-after roles in tech. Strong career growth potential with leadership opportunities.",
    },
    {
      id: "career-11",
      title: "Management Consultant",
      matchPercentage: 87,
      description:
        "Advise organizations on business strategy, operations, and transformation initiatives",
      requiredSkills: ["Problem Solving", "Business Analysis", "Presentation", "Strategy", "Excel"],
      salaryRange: "₹15-60 LPA",
      demandLevel: "High",
      futureScope:
        "Lucrative career with exposure to multiple industries. Exit opportunities to C-suite positions.",
    },
    {
      id: "career-12",
      title: "Business Development Manager",
      matchPercentage: 84,
      description:
        "Identify growth opportunities, build partnerships, and drive revenue for organizations",
      requiredSkills: ["Sales", "Networking", "Negotiation", "Market Analysis", "Communication"],
      salaryRange: "₹10-40 LPA",
      demandLevel: "High",
      futureScope:
        "Essential role in growing companies. Performance-based incentives can significantly increase earnings.",
    },
  ],
  "ux-ui": [
    {
      id: "career-13",
      title: "UX Designer",
      matchPercentage: 93,
      description:
        "Research user needs and design intuitive experiences that solve real problems",
      requiredSkills: ["User Research", "Wireframing", "Prototyping", "Usability Testing", "Figma"],
      salaryRange: "₹6-28 LPA",
      demandLevel: "High",
      futureScope:
        "Growing recognition of UX importance drives demand. Opportunities in tech companies and design agencies.",
    },
    {
      id: "career-14",
      title: "Product Designer",
      matchPercentage: 89,
      description:
        "Design end-to-end product experiences combining UX research, UI design, and business strategy",
      requiredSkills: ["UX/UI Design", "Product Thinking", "Prototyping", "Visual Design", "Strategy"],
      salaryRange: "₹8-35 LPA",
      demandLevel: "High",
      futureScope:
        "Hybrid role with strong demand in startups and tech companies. Path to design leadership positions.",
    },
    {
      id: "career-15",
      title: "Interaction Designer",
      matchPercentage: 82,
      description:
        "Create engaging and intuitive interactions between users and digital products",
      requiredSkills: ["Interaction Design", "Animation", "Prototyping", "User Flows", "Microinteractions"],
      salaryRange: "₹7-30 LPA",
      demandLevel: "Medium",
      futureScope:
        "Specialized role with growing importance in creating delightful user experiences.",
    },
  ],
  "digital-marketing": [
    {
      id: "career-16",
      title: "Performance Marketing Manager",
      matchPercentage: 90,
      description:
        "Drive measurable results through data-driven digital marketing campaigns across multiple channels",
      requiredSkills: ["Google Ads", "Facebook Ads", "Analytics", "A/B Testing", "ROI Optimization"],
      salaryRange: "₹6-28 LPA",
      demandLevel: "High",
      futureScope:
        "High demand as companies shift to digital-first marketing. Strong performance bonuses based on results.",
    },
    {
      id: "career-17",
      title: "SEO Specialist",
      matchPercentage: 85,
      description:
        "Optimize websites and content to rank higher in search engines and drive organic traffic",
      requiredSkills: ["SEO", "Content Strategy", "Technical SEO", "Analytics", "Link Building"],
      salaryRange: "₹4-20 LPA",
      demandLevel: "High",
      futureScope:
        "Essential skill for digital presence. Opportunities in agencies, in-house teams, and freelancing.",
    },
    {
      id: "career-18",
      title: "Social Media Manager",
      matchPercentage: 81,
      description:
        "Build brand presence and engage audiences across social media platforms",
      requiredSkills: ["Social Media", "Content Creation", "Community Management", "Analytics", "Creativity"],
      salaryRange: "₹4-18 LPA",
      demandLevel: "Medium",
      futureScope:
        "Growing importance of social media for brands. Creative and strategic role with good work-life balance.",
    },
  ],
};

// Learning roadmaps (AI-generated)
export const learningRoadmaps: { [key: string]: Roadmap } = {
  cse: {
    id: "roadmap-cse",
    title: "Full-Stack Developer Roadmap",
    estimatedDuration: "12-18 months",
    milestones: [
      {
        title: "Programming Fundamentals",
        duration: "2-3 months",
        description: "Master programming basics with Python or JavaScript",
        resources: [
          "CS50 by Harvard (Free on edX)",
          "The Odin Project - Foundations",
          "freeCodeCamp JavaScript Course",
        ],
      },
      {
        title: "Data Structures & Algorithms",
        duration: "3-4 months",
        description: "Learn essential DSA for problem-solving and interviews",
        resources: [
          "Algorithms Part I & II (Coursera)",
          "LeetCode Practice (75 Essential Problems)",
          "Cracking the Coding Interview Book",
        ],
      },
      {
        title: "Frontend Development",
        duration: "2-3 months",
        description: "Build responsive web interfaces with React",
        resources: [
          "React Official Documentation",
          "Frontend Masters - Complete Intro to React",
          "Build 5 Real Projects (Portfolio)",
        ],
      },
      {
        title: "Backend Development",
        duration: "3-4 months",
        description: "Create APIs and work with databases",
        resources: [
          "Node.js & Express Course (Udemy)",
          "PostgreSQL for Developers",
          "Build REST APIs from Scratch",
        ],
      },
      {
        title: "System Design & DevOps",
        duration: "2-3 months",
        description: "Learn to design scalable systems and deploy applications",
        resources: [
          "System Design Primer (GitHub)",
          "Docker & Kubernetes Course",
          "Deploy Full-Stack Apps to AWS/Vercel",
        ],
      },
    ],
  },
  "data-science": {
    id: "roadmap-ds",
    title: "Data Science Career Roadmap",
    estimatedDuration: "10-14 months",
    milestones: [
      {
        title: "Python Programming & Math",
        duration: "2 months",
        description: "Build strong foundation in Python and statistics",
        resources: [
          "Python for Everybody (Coursera)",
          "Khan Academy - Statistics & Probability",
          "NumPy & Pandas Tutorials",
        ],
      },
      {
        title: "Data Analysis & Visualization",
        duration: "2-3 months",
        description: "Learn to analyze and visualize data effectively",
        resources: [
          "Google Data Analytics Certificate",
          "Tableau/PowerBI Tutorials",
          "5 Data Analysis Projects",
        ],
      },
      {
        title: "Machine Learning Fundamentals",
        duration: "3-4 months",
        description: "Understand ML algorithms and build models",
        resources: [
          "Andrew Ng's Machine Learning (Coursera)",
          "Scikit-learn Documentation",
          "Kaggle Competitions (Beginner)",
        ],
      },
      {
        title: "Deep Learning & NLP",
        duration: "3-4 months",
        description: "Advanced ML with neural networks",
        resources: [
          "Deep Learning Specialization (Coursera)",
          "Fast.ai Practical Deep Learning",
          "TensorFlow & PyTorch Tutorials",
        ],
      },
    ],
  },
  mba: {
    id: "roadmap-mba",
    title: "Product Management Roadmap",
    estimatedDuration: "8-12 months",
    milestones: [
      {
        title: "Business Fundamentals",
        duration: "2 months",
        description: "Understand business strategy and frameworks",
        resources: [
          "Business Strategy from UVA (Coursera)",
          "Case Interview Practice",
          "Read: The Lean Startup, Zero to One",
        ],
      },
      {
        title: "Product Management Basics",
        duration: "2-3 months",
        description: "Learn PM frameworks and methodologies",
        resources: [
          "Product Management Certificate (Coursera)",
          "Cracking the PM Interview Book",
          "Product School Free Resources",
        ],
      },
      {
        title: "User Research & Design",
        duration: "2 months",
        description: "Understand users and design thinking",
        resources: [
          "Design Thinking Course (IDEO)",
          "User Research Methods",
          "Conduct 3 User Interviews",
        ],
      },
      {
        title: "Analytics & Metrics",
        duration: "2-3 months",
        description: "Data-driven decision making",
        resources: [
          "SQL for Product Managers",
          "Google Analytics Certification",
          "A/B Testing Fundamentals",
        ],
      },
    ],
  },
  "ux-ui": {
    id: "roadmap-ux",
    title: "UX/UI Designer Roadmap",
    estimatedDuration: "8-12 months",
    milestones: [
      {
        title: "Design Fundamentals",
        duration: "2 months",
        description: "Learn visual design principles and theory",
        resources: [
          "Google UX Design Certificate",
          "Design Principles Course",
          "Study Great Designs (Dribbble/Behance)",
        ],
      },
      {
        title: "UX Research Methods",
        duration: "2 months",
        description: "Understand users through research",
        resources: [
          "UX Research Methods Course",
          "Nielsen Norman Group Articles",
          "Conduct 5 User Interviews",
        ],
      },
      {
        title: "UI Design & Tools",
        duration: "2-3 months",
        description: "Master Figma and create beautiful interfaces",
        resources: [
          "Figma Official Tutorials",
          "Refactoring UI Book",
          "Recreate 10 Popular App Designs",
        ],
      },
      {
        title: "Portfolio Projects",
        duration: "2-3 months",
        description: "Build 3-4 end-to-end case studies",
        resources: [
          "Design 3 Real Projects",
          "Write Detailed Case Studies",
          "Get Feedback from Community",
        ],
      },
    ],
  },
  "digital-marketing": {
    id: "roadmap-dm",
    title: "Digital Marketing Roadmap",
    estimatedDuration: "6-9 months",
    milestones: [
      {
        title: "Marketing Fundamentals",
        duration: "1-2 months",
        description: "Understand core marketing concepts",
        resources: [
          "Marketing in a Digital World (Coursera)",
          "HubSpot Content Marketing Course",
          "Read: Contagious by Jonah Berger",
        ],
      },
      {
        title: "SEO & Content Marketing",
        duration: "2 months",
        description: "Master organic traffic generation",
        resources: [
          "Moz SEO Learning Center",
          "Ahrefs SEO Course",
          "Write & Optimize 10 Blog Posts",
        ],
      },
      {
        title: "Paid Advertising",
        duration: "2-3 months",
        description: "Run effective ad campaigns",
        resources: [
          "Google Ads Certification",
          "Facebook Blueprint Certification",
          "Manage $500 Ad Budget Practice",
        ],
      },
      {
        title: "Analytics & Optimization",
        duration: "1-2 months",
        description: "Measure and improve campaigns",
        resources: [
          "Google Analytics Certification",
          "CRO Course (ConversionXL)",
          "Run 5 A/B Tests",
        ],
      },
    ],
  },
};

// Resources database (AI-generated)
export const resources: { [key: string]: Resource[] } = {
  cse: [
    {
      id: "res-1",
      title: "CS50: Introduction to Computer Science",
      type: "free",
      platform: "edX",
      url: "https://www.edx.org/course/introduction-computer-science-harvardx-cs50x",
      description: "Harvard's comprehensive intro to CS and programming",
    },
    {
      id: "res-2",
      title: "The Complete 2024 Web Development Bootcamp",
      type: "paid",
      platform: "Udemy",
      url: "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
      description: "Comprehensive full-stack web development course",
    },
    {
      id: "res-3",
      title: "LeetCode Premium",
      type: "paid",
      platform: "LeetCode",
      url: "https://leetcode.com/",
      description: "Practice DSA problems for interviews with premium content",
    },
    {
      id: "res-4",
      title: "freeCodeCamp Full Curriculum",
      type: "free",
      platform: "freeCodeCamp",
      url: "https://www.freecodecamp.org/",
      description: "Learn web development with hands-on projects",
    },
    {
      id: "res-5",
      title: "System Design Interview Course",
      type: "paid",
      platform: "Educative",
      url: "https://www.educative.io/courses/grokking-the-system-design-interview",
      description: "Master system design for tech interviews",
    },
    {
      id: "res-6",
      title: "React Documentation",
      type: "free",
      platform: "React.dev",
      url: "https://react.dev/",
      description: "Official React documentation and tutorials",
    },
  ],
  "data-science": [
    {
      id: "res-7",
      title: "Machine Learning by Andrew Ng",
      type: "free",
      platform: "Coursera",
      url: "https://www.coursera.org/learn/machine-learning",
      description: "Most popular ML course taught by AI pioneer",
    },
    {
      id: "res-8",
      title: "Python for Data Science and Machine Learning",
      type: "paid",
      platform: "Udemy",
      url: "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/",
      description: "Comprehensive Python data science bootcamp",
    },
    {
      id: "res-9",
      title: "Kaggle Learn",
      type: "free",
      platform: "Kaggle",
      url: "https://www.kaggle.com/learn",
      description: "Free micro-courses on DS and ML with hands-on practice",
    },
    {
      id: "res-10",
      title: "Deep Learning Specialization",
      type: "paid",
      platform: "Coursera",
      url: "https://www.coursera.org/specializations/deep-learning",
      description: "5-course series on deep learning by Andrew Ng",
    },
    {
      id: "res-11",
      title: "Fast.ai Practical Deep Learning",
      type: "free",
      platform: "Fast.ai",
      url: "https://course.fast.ai/",
      description: "Top-down practical approach to deep learning",
    },
    {
      id: "res-12",
      title: "DataCamp Career Track",
      type: "paid",
      platform: "DataCamp",
      url: "https://www.datacamp.com/",
      description: "Interactive learning platform for data science",
    },
  ],
  mba: [
    {
      id: "res-13",
      title: "Product Management Certificate",
      type: "paid",
      platform: "Coursera",
      url: "https://www.coursera.org/specializations/product-management",
      description: "Comprehensive PM certification from UVA",
    },
    {
      id: "res-14",
      title: "Y Combinator Startup School",
      type: "free",
      platform: "Y Combinator",
      url: "https://www.startupschool.org/",
      description: "Free startup and business fundamentals course",
    },
    {
      id: "res-15",
      title: "Cracking the PM Interview",
      type: "paid",
      platform: "Book",
      url: "https://www.amazon.com/Cracking-PM-Interview-Product-Technology/dp/0984782818",
      description: "Essential guide for PM interviews and career",
    },
    {
      id: "res-16",
      title: "Product School Resources",
      type: "free",
      platform: "Product School",
      url: "https://productschool.com/blog/",
      description: "Free PM articles, templates, and resources",
    },
    {
      id: "res-17",
      title: "MBA Case Interview Practice",
      type: "paid",
      platform: "CaseInterview.com",
      url: "https://www.caseinterview.com/",
      description: "Practice cases for consulting interviews",
    },
    {
      id: "res-18",
      title: "Google Analytics Certification",
      type: "free",
      platform: "Google",
      url: "https://skillshop.withgoogle.com/",
      description: "Free certification in Google Analytics",
    },
  ],
  "ux-ui": [
    {
      id: "res-19",
      title: "Google UX Design Certificate",
      type: "paid",
      platform: "Coursera",
      url: "https://www.coursera.org/professional-certificates/google-ux-design",
      description: "Industry-recognized UX design certification",
    },
    {
      id: "res-20",
      title: "Figma Official Tutorials",
      type: "free",
      platform: "Figma",
      url: "https://www.figma.com/resources/learn-design/",
      description: "Learn Figma from official resources",
    },
    {
      id: "res-21",
      title: "Refactoring UI",
      type: "paid",
      platform: "Book + Videos",
      url: "https://www.refactoringui.com/",
      description: "Learn to design beautiful user interfaces",
    },
    {
      id: "res-22",
      title: "Nielsen Norman Group Articles",
      type: "free",
      platform: "NN/g",
      url: "https://www.nngroup.com/articles/",
      description: "World-leading UX research and articles",
    },
    {
      id: "res-23",
      title: "Design+Code UI Design Course",
      type: "paid",
      platform: "Design+Code",
      url: "https://designcode.io/",
      description: "Learn UI design and prototyping",
    },
    {
      id: "res-24",
      title: "Dribbble & Behance Inspiration",
      type: "free",
      platform: "Dribbble/Behance",
      url: "https://dribbble.com/",
      description: "Study designs from top designers worldwide",
    },
  ],
  "digital-marketing": [
    {
      id: "res-25",
      title: "Google Ads Certification",
      type: "free",
      platform: "Google Skillshop",
      url: "https://skillshop.withgoogle.com/",
      description: "Official Google Ads certification program",
    },
    {
      id: "res-26",
      title: "HubSpot Academy Certifications",
      type: "free",
      platform: "HubSpot",
      url: "https://academy.hubspot.com/",
      description: "Free certifications in inbound marketing and more",
    },
    {
      id: "res-27",
      title: "Complete Digital Marketing Course",
      type: "paid",
      platform: "Udemy",
      url: "https://www.udemy.com/course/learn-digital-marketing-course/",
      description: "12-in-1 digital marketing masterclass",
    },
    {
      id: "res-28",
      title: "Moz SEO Learning Center",
      type: "free",
      platform: "Moz",
      url: "https://moz.com/learn/seo",
      description: "Comprehensive free SEO guides and tutorials",
    },
    {
      id: "res-29",
      title: "Facebook Blueprint Certification",
      type: "free",
      platform: "Meta",
      url: "https://www.facebook.com/business/learn",
      description: "Official Facebook and Instagram advertising certification",
    },
    {
      id: "res-30",
      title: "ConversionXL CRO Course",
      type: "paid",
      platform: "ConversionXL",
      url: "https://conversionxl.com/",
      description: "Advanced conversion rate optimization training",
    },
  ],
};

export function getCareerRecommendations(subDomainId: string): CareerOption[] {
  return careerRecommendations[subDomainId] || [];
}

export function getRoadmap(subDomainId: string): Roadmap | null {
  return learningRoadmaps[subDomainId] || null;
}

export function getResources(subDomainId: string): Resource[] {
  return resources[subDomainId] || [];
}
