export interface SubDomain {
  id: string;
  name: string;
  description: string;
  trending: boolean;
  salary: string;
  jobGrowth: string;
  topCompanies: string[];
  skillsRequired: string[];
}

export interface Domain {
  id: string;
  name: string;
  description: string;
  subDomains: SubDomain[];
}

export interface Branch {
  id: string;
  name: string;
  description: string;
  trending: boolean;
  domains: Domain[];
}

export const careerBranches: Branch[] = [
  {
    id: "science",
    name: "Science",
    description: "Explore scientific and technical career paths",
    trending: true,
    domains: [
      {
        id: "engineering",
        name: "Engineering",
        description: "Build the future with technology and innovation",
        subDomains: [
          {
            id: "cse",
            name: "Computer Science Engineering",
            description: "Master software development, AI, and cutting-edge technology",
            trending: true,
            salary: "₹6-25 LPA",
            jobGrowth: "+22%",
            topCompanies: ["Google", "Microsoft", "Amazon", "Meta", "Apple"],
            skillsRequired: ["Programming", "Data Structures", "Algorithms", "Problem Solving"],
          },
          {
            id: "software-eng",
            name: "Software Engineering",
            description: "Design, develop, and maintain software systems at scale",
            trending: true,
            salary: "₹7-30 LPA",
            jobGrowth: "+25%",
            topCompanies: ["Netflix", "Uber", "Airbnb", "Stripe", "Spotify"],
            skillsRequired: ["Full-Stack Development", "System Design", "DevOps", "Testing"],
          },
          {
            id: "data-science",
            name: "Data Science & Analytics",
            description: "Transform data into actionable insights using AI and ML",
            trending: true,
            salary: "₹8-35 LPA",
            jobGrowth: "+28%",
            topCompanies: ["IBM", "Accenture", "Deloitte", "Amazon", "Google"],
            skillsRequired: ["Python", "Statistics", "Machine Learning", "Data Visualization"],
          },
          {
            id: "it",
            name: "Information Technology",
            description: "Manage and optimize IT infrastructure and systems",
            trending: false,
            salary: "₹5-20 LPA",
            jobGrowth: "+15%",
            topCompanies: ["TCS", "Infosys", "Wipro", "HCL", "Cognizant"],
            skillsRequired: ["Networking", "Cloud Computing", "Cybersecurity", "System Administration"],
          },
          {
            id: "biotech",
            name: "Biotechnology Engineering",
            description: "Innovate in healthcare, agriculture, and environmental solutions",
            trending: false,
            salary: "₹4-18 LPA",
            jobGrowth: "+12%",
            topCompanies: ["Biocon", "Dr. Reddy's", "Cipla", "Sun Pharma", "Novartis"],
            skillsRequired: ["Molecular Biology", "Genetics", "Biochemistry", "Research Skills"],
          },
          {
            id: "civil",
            name: "Civil Engineering",
            description: "Design and build infrastructure that shapes our world",
            trending: false,
            salary: "₹3-15 LPA",
            jobGrowth: "+8%",
            topCompanies: ["L&T", "Tata Projects", "Shapoorji Pallonji", "DLF", "GMR"],
            skillsRequired: ["Structural Design", "AutoCAD", "Project Management", "Construction Planning"],
          },
        ],
      },
      {
        id: "medical",
        name: "Medical",
        description: "Heal and care for people's health and wellbeing",
        subDomains: [
          {
            id: "mbbs",
            name: "MBBS (Medicine)",
            description: "Become a doctor and save lives through medical practice",
            trending: true,
            salary: "₹6-50 LPA",
            jobGrowth: "+18%",
            topCompanies: ["AIIMS", "Apollo", "Fortis", "Max Healthcare", "Manipal"],
            skillsRequired: ["Medical Knowledge", "Patient Care", "Diagnosis", "Communication"],
          },
          {
            id: "nursing",
            name: "Nursing",
            description: "Provide compassionate care and support to patients",
            trending: true,
            salary: "₹3-12 LPA",
            jobGrowth: "+20%",
            topCompanies: ["Apollo", "Fortis", "Max Healthcare", "Medanta", "Narayana Health"],
            skillsRequired: ["Patient Care", "Medical Procedures", "Communication", "Empathy"],
          },
          {
            id: "bhms",
            name: "BHMS (Homeopathy)",
            description: "Practice holistic healing through homeopathic medicine",
            trending: false,
            salary: "₹2-10 LPA",
            jobGrowth: "+10%",
            topCompanies: ["SBL", "Schwabe India", "Dr. Reckeweg", "Hahnemann", "Bakson"],
            skillsRequired: ["Homeopathic Knowledge", "Patient Counseling", "Diagnosis", "Practice Management"],
          },
          {
            id: "pharma",
            name: "Pharmacy",
            description: "Develop and dispense medications for better health outcomes",
            trending: false,
            salary: "₹3-15 LPA",
            jobGrowth: "+14%",
            topCompanies: ["Sun Pharma", "Cipla", "Dr. Reddy's", "Lupin", "Biocon"],
            skillsRequired: ["Pharmaceutical Science", "Drug Knowledge", "Quality Control", "Research"],
          },
        ],
      },
    ],
  },
  {
    id: "commerce",
    name: "Commerce",
    description: "Master business, finance, and economic systems",
    trending: true,
    domains: [
      {
        id: "accounting",
        name: "Accounting & Finance",
        description: "Manage financial systems and help businesses grow",
        subDomains: [
          {
            id: "ca",
            name: "Chartered Accountancy (CA)",
            description: "Become a trusted financial advisor and auditor",
            trending: true,
            salary: "₹8-40 LPA",
            jobGrowth: "+15%",
            topCompanies: ["Deloitte", "PwC", "KPMG", "EY", "Grant Thornton"],
            skillsRequired: ["Accounting", "Taxation", "Auditing", "Financial Analysis"],
          },
          {
            id: "cma",
            name: "Cost & Management Accountancy",
            description: "Optimize costs and drive business efficiency",
            trending: false,
            salary: "₹6-25 LPA",
            jobGrowth: "+12%",
            topCompanies: ["Tata", "Reliance", "HDFC", "ICICI", "Mahindra"],
            skillsRequired: ["Cost Analysis", "Budgeting", "Strategic Planning", "Financial Management"],
          },
        ],
      },
      {
        id: "business",
        name: "Business Management",
        description: "Lead organizations and drive business success",
        subDomains: [
          {
            id: "mba",
            name: "MBA (Business Administration)",
            description: "Master business strategy and leadership skills",
            trending: true,
            salary: "₹10-50 LPA",
            jobGrowth: "+18%",
            topCompanies: ["McKinsey", "BCG", "Bain", "Goldman Sachs", "JP Morgan"],
            skillsRequired: ["Leadership", "Strategy", "Finance", "Marketing", "Operations"],
          },
          {
            id: "digital-marketing",
            name: "Digital Marketing",
            description: "Drive brand growth through digital channels and campaigns",
            trending: true,
            salary: "₹4-20 LPA",
            jobGrowth: "+22%",
            topCompanies: ["Google", "Facebook", "Amazon", "Flipkart", "Myntra"],
            skillsRequired: ["SEO", "Social Media", "Content Marketing", "Analytics", "Strategy"],
          },
        ],
      },
    ],
  },
  {
    id: "arts",
    name: "Arts & Humanities",
    description: "Express creativity and understand human culture",
    trending: false,
    domains: [
      {
        id: "design",
        name: "Design",
        description: "Create beautiful and functional user experiences",
        subDomains: [
          {
            id: "ux-ui",
            name: "UI/UX Design",
            description: "Design intuitive interfaces that users love",
            trending: true,
            salary: "₹5-25 LPA",
            jobGrowth: "+20%",
            topCompanies: ["Adobe", "Figma", "Google", "Amazon", "Microsoft"],
            skillsRequired: ["Figma", "User Research", "Prototyping", "Visual Design", "Interaction Design"],
          },
          {
            id: "graphic-design",
            name: "Graphic Design",
            description: "Create visual content that communicates and inspires",
            trending: false,
            salary: "₹3-15 LPA",
            jobGrowth: "+12%",
            topCompanies: ["Adobe", "Canva", "Ogilvy", "DDB Mudra", "Leo Burnett"],
            skillsRequired: ["Photoshop", "Illustrator", "Branding", "Typography", "Creativity"],
          },
        ],
      },
      {
        id: "media",
        name: "Media & Communication",
        description: "Tell stories and shape public discourse",
        subDomains: [
          {
            id: "journalism",
            name: "Journalism",
            description: "Report news and inform the public",
            trending: false,
            salary: "₹3-12 LPA",
            jobGrowth: "+8%",
            topCompanies: ["Times of India", "NDTV", "CNN", "BBC", "The Hindu"],
            skillsRequired: ["Writing", "Research", "Interviewing", "Critical Thinking", "Ethics"],
          },
          {
            id: "content-writing",
            name: "Content Writing",
            description: "Create engaging content for digital and print media",
            trending: true,
            salary: "₹3-18 LPA",
            jobGrowth: "+16%",
            topCompanies: ["Upwork", "Fiverr", "Medium", "HubSpot", "Content Hacker"],
            skillsRequired: ["Writing", "SEO", "Storytelling", "Research", "Creativity"],
          },
        ],
      },
    ],
  },
];

export function getBranchById(branchId: string): Branch | undefined {
  return careerBranches.find((branch) => branch.id === branchId);
}

export function getDomainById(branchId: string, domainId: string): Domain | undefined {
  const branch = getBranchById(branchId);
  return branch?.domains.find((domain) => domain.id === domainId);
}

export function getSubDomainById(
  branchId: string,
  domainId: string,
  subDomainId: string
): SubDomain | undefined {
  const domain = getDomainById(branchId, domainId);
  return domain?.subDomains.find((subDomain) => subDomain.id === subDomainId);
}

// Get all sub-domains across all branches for mentor selection
export function getAllSubDomains(): Array<SubDomain & { branchName: string; domainName: string }> {
  const allSubDomains: Array<SubDomain & { branchName: string; domainName: string }> = [];
  
  careerBranches.forEach((branch) => {
    branch.domains.forEach((domain) => {
      domain.subDomains.forEach((subDomain) => {
        allSubDomains.push({
          ...subDomain,
          branchName: branch.name,
          domainName: domain.name,
        });
      });
    });
  });
  
  return allSubDomains;
}

export const trendingDomains = [
  { id: "science", name: "Technology", growth: "+22%", color: "bg-blue-500" },
  { id: "commerce", name: "Business & Finance", growth: "+18%", color: "bg-green-500" },
  { id: "arts", name: "Design & Creative", growth: "+15%", color: "bg-pink-500" },
];