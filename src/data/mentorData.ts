export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  experience: number;
  bio: string;
  expertise: string[];
  sessionPrice: number;
  rating: number;
  sessionsCompleted: number;
  profileImage: string;
  availableSlots: string[];
  subDomainId: string; // Keep for backwards compatibility
  subDomainIds?: string[]; // Support multiple sub-domains
}

// AI-generated mentor profiles for each sub-domain
export const mentors: Mentor[] = [
  // Computer Science Engineering mentors
  {
    id: "m1",
    name: "Priya Sharma",
    title: "Senior Software Engineer",
    company: "Google",
    experience: 8,
    bio: "Passionate about teaching algorithms and helping students crack FAANG interviews",
    expertise: ["Data Structures", "Algorithms", "System Design", "Interview Prep", "Competitive Programming"],
    sessionPrice: 1500,
    rating: 4.9,
    sessionsCompleted: 245,
    profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    availableSlots: ["9:00-12:00", "2:00-6:00", "8:00-11:00"],
    subDomainId: "cse",
  },
  {
    id: "m2",
    name: "Rahul Verma",
    title: "Tech Lead",
    company: "Microsoft",
    experience: 10,
    bio: "Specialized in C++ and competitive programming, mentored 500+ students",
    expertise: ["C++", "Problem Solving", "DSA", "Career Guidance", "Code Reviews"],
    sessionPrice: 2000,
    rating: 4.8,
    sessionsCompleted: 512,
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    availableSlots: ["2:00-6:00", "8:00-11:00"],
    subDomainId: "cse",
  },
  {
    id: "m3",
    name: "Ananya Reddy",
    title: "Principal Engineer",
    company: "Amazon",
    experience: 12,
    bio: "Expert in full-stack development with focus on AI/ML integration",
    expertise: ["Python", "Machine Learning", "Cloud Computing", "System Architecture", "Mentoring"],
    sessionPrice: 2500,
    rating: 5.0,
    sessionsCompleted: 183,
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    availableSlots: ["9:00-12:00", "8:00-11:00"],
    subDomainId: "cse",
  },
  
  // Software Engineering mentors
  {
    id: "m4",
    name: "Vikram Singh",
    title: "Staff Engineer",
    company: "Netflix",
    experience: 11,
    bio: "Building scalable systems and mentoring engineers on microservices architecture",
    expertise: ["Microservices", "Docker", "Kubernetes", "System Design", "DevOps"],
    sessionPrice: 2200,
    rating: 4.9,
    sessionsCompleted: 298,
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    availableSlots: ["9:00-12:00", "2:00-6:00"],
    subDomainId: "software-eng",
  },
  {
    id: "m5",
    name: "Sneha Patel",
    title: "Senior Full-Stack Developer",
    company: "Uber",
    experience: 7,
    bio: "Frontend specialist helping students master React and modern web development",
    expertise: ["React", "TypeScript", "Node.js", "GraphQL", "Testing"],
    sessionPrice: 1800,
    rating: 4.7,
    sessionsCompleted: 421,
    profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400",
    availableSlots: ["2:00-6:00", "8:00-11:00"],
    subDomainId: "software-eng",
  },
  {
    id: "m6",
    name: "Arjun Mehta",
    title: "Engineering Manager",
    company: "Stripe",
    experience: 13,
    bio: "Guiding engineers on career growth, leadership, and technical excellence",
    expertise: ["Leadership", "System Design", "APIs", "Code Quality", "Career Growth"],
    sessionPrice: 3000,
    rating: 4.9,
    sessionsCompleted: 167,
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    availableSlots: ["9:00-12:00", "8:00-11:00"],
    subDomainId: "software-eng",
  },

  // Data Science mentors
  {
    id: "m7",
    name: "Dr. Meera Krishnan",
    title: "Lead Data Scientist",
    company: "IBM",
    experience: 9,
    bio: "PhD in ML, helping students master data science and land top roles",
    expertise: ["Machine Learning", "Deep Learning", "Python", "Statistics", "NLP"],
    sessionPrice: 2400,
    rating: 5.0,
    sessionsCompleted: 215,
    profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    availableSlots: ["9:00-12:00", "2:00-6:00", "8:00-11:00"],
    subDomainId: "data-science",
  },
  {
    id: "m8",
    name: "Karan Joshi",
    title: "Senior ML Engineer",
    company: "Google",
    experience: 8,
    bio: "Specialized in deep learning and computer vision applications",
    expertise: ["TensorFlow", "PyTorch", "Computer Vision", "Model Deployment", "MLOps"],
    sessionPrice: 2100,
    rating: 4.8,
    sessionsCompleted: 342,
    profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400",
    availableSlots: ["2:00-6:00", "8:00-11:00"],
    subDomainId: "data-science",
  },
  {
    id: "m9",
    name: "Divya Iyer",
    title: "Data Science Manager",
    company: "Amazon",
    experience: 10,
    bio: "Building ML products and mentoring aspiring data scientists",
    expertise: ["Data Analysis", "Business Intelligence", "SQL", "Tableau", "A/B Testing"],
    sessionPrice: 1900,
    rating: 4.9,
    sessionsCompleted: 389,
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    availableSlots: ["9:00-12:00", "2:00-6:00"],
    subDomainId: "data-science",
  },

  // MBA mentors
  {
    id: "m10",
    name: "Rajesh Khanna",
    title: "Management Consultant",
    company: "McKinsey & Company",
    experience: 12,
    bio: "IIM graduate helping students with MBA prep and case interviews",
    expertise: ["Strategy", "Case Studies", "Business Analysis", "MBA Prep", "Leadership"],
    sessionPrice: 3500,
    rating: 4.9,
    sessionsCompleted: 156,
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    availableSlots: ["9:00-12:00", "8:00-11:00"],
    subDomainId: "mba",
  },
  {
    id: "m11",
    name: "Nisha Gupta",
    title: "Senior Product Manager",
    company: "Google",
    experience: 9,
    bio: "MBA from ISB, guiding students on product management and business strategy",
    expertise: ["Product Management", "Marketing", "Finance", "Operations", "Analytics"],
    sessionPrice: 2800,
    rating: 5.0,
    sessionsCompleted: 203,
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    availableSlots: ["2:00-6:00", "8:00-11:00"],
    subDomainId: "mba",
  },

  // UI/UX Design mentors
  {
    id: "m12",
    name: "Aditya Kapoor",
    title: "Lead Product Designer",
    company: "Figma",
    experience: 7,
    bio: "Teaching design thinking and helping designers build amazing portfolios",
    expertise: ["UI Design", "UX Research", "Figma", "Prototyping", "Design Systems"],
    sessionPrice: 2000,
    rating: 4.8,
    sessionsCompleted: 287,
    profileImage: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400",
    availableSlots: ["9:00-12:00", "2:00-6:00", "8:00-11:00"],
    subDomainId: "ux-ui",
  },
  {
    id: "m13",
    name: "Pooja Malhotra",
    title: "Senior UX Designer",
    company: "Adobe",
    experience: 8,
    bio: "User-centered design advocate with expertise in design research",
    expertise: ["User Research", "Usability Testing", "Wireframing", "Visual Design", "Adobe XD"],
    sessionPrice: 1700,
    rating: 4.9,
    sessionsCompleted: 412,
    profileImage: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400",
    availableSlots: ["2:00-6:00", "8:00-11:00"],
    subDomainId: "ux-ui",
  },

  // Digital Marketing mentors
  {
    id: "m14",
    name: "Amit Sharma",
    title: "Digital Marketing Head",
    company: "Flipkart",
    experience: 10,
    bio: "Performance marketing expert helping brands grow through digital channels",
    expertise: ["SEO", "Google Ads", "Social Media Marketing", "Analytics", "Content Strategy"],
    sessionPrice: 1600,
    rating: 4.7,
    sessionsCompleted: 523,
    profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    availableSlots: ["9:00-12:00", "2:00-6:00"],
    subDomainId: "digital-marketing",
  },
  {
    id: "m15",
    name: "Kavita Desai",
    title: "Growth Marketing Lead",
    company: "Amazon",
    experience: 8,
    bio: "Specializing in performance marketing and data-driven growth strategies",
    expertise: ["Growth Hacking", "Email Marketing", "Conversion Optimization", "Facebook Ads", "Marketing Automation"],
    sessionPrice: 1800,
    rating: 4.8,
    sessionsCompleted: 367,
    profileImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400",
    availableSlots: ["2:00-6:00", "8:00-11:00"],
    subDomainId: "digital-marketing",
  },

  // CA mentors
  {
    id: "m16",
    name: "CA Suresh Kumar",
    title: "Chartered Accountant",
    company: "Deloitte",
    experience: 15,
    bio: "CA All India Rank holder, guiding students through CA journey",
    expertise: ["Accounting", "Taxation", "Auditing", "Financial Reporting", "CA Exam Prep"],
    sessionPrice: 2500,
    rating: 5.0,
    sessionsCompleted: 289,
    profileImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400",
    availableSlots: ["9:00-12:00", "2:00-6:00", "8:00-11:00"],
    subDomainId: "ca",
  },

  // MBBS mentors
  {
    id: "m17",
    name: "Dr. Sanjay Reddy",
    title: "Senior Physician",
    company: "AIIMS",
    experience: 14,
    bio: "NEET topper helping medical students with career guidance and exam prep",
    expertise: ["Medicine", "NEET Preparation", "Clinical Skills", "Medical Career Guidance", "Research"],
    sessionPrice: 2200,
    rating: 4.9,
    sessionsCompleted: 198,
    profileImage: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400",
    availableSlots: ["9:00-12:00", "8:00-11:00"],
    subDomainId: "mbbs",
  },
];

export function getMentorsBySubDomain(subDomainId: string): Mentor[] {
  return mentors.filter((mentor) => mentor.subDomainId === subDomainId);
}

export function getMentorById(mentorId: string): Mentor | undefined {
  return mentors.find((mentor) => mentor.id === mentorId);
}