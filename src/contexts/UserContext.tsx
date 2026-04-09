import { createContext, useContext, useState, ReactNode } from "react";

export interface UserData {
  name?: string;
  email?: string;
  role?: "student" | "mentor";
  educationLevel?: string;
  stream?: string;
  careerGoals?: string;
  selectedBranch?: string;
  selectedDomain?: string;
  selectedSubDomain?: string;
  bookings?: Booking[];
  assessmentResults?: AssessmentResult[];
  roadmaps?: CareerRoadmap[];
  streak?: number;
  longestStreak?: number;
  // Mentor-specific fields
  mentorSubDomainIds?: string[]; // Sub-domains the mentor teaches
  mentorExpertise?: string;
  mentorBio?: string;
}

export interface Booking {
  id: string;
  mentorName: string;
  mentorEmail?: string;
  domain: string;
  subDomain: string;
  timeSlot: string;
  specificTime?: string;
  status: "pending" | "accepted" | "completed";
  meetingLink?: string;
  date: string;
}

export interface AssessmentResult {
  id: string;
  domain: string;
  subDomain: string;
  score: number;
  strengths: string[];
  weaknesses: string[];
  interests: string[];
  completedAt: string;
}

export interface CareerRoadmap {
  id: string;
  subDomain: string;
  career: string;
  learningPath: any;
  resources: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  type: "free" | "paid";
  platform: string;
  url: string;
  description: string;
}

interface UserContextType {
  user: UserData | null;
  isLoggedIn: boolean;
  login: (userData: UserData) => void;
  logout: () => void;
  updateUser: (updates: Partial<UserData>) => void;
  addBooking: (booking: Booking) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  addAssessmentResult: (result: AssessmentResult) => void;
  addRoadmap: (roadmap: CareerRoadmap) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (userData: UserData) => {
    setUser({
      ...userData,
      bookings: [],
      assessmentResults: [],
      roadmaps: [],
      streak: 7,
      longestStreak: 14,
    });
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const updateUser = (updates: Partial<UserData>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const addBooking = (booking: Booking) => {
    if (user) {
      setUser({
        ...user,
        bookings: [...(user.bookings || []), booking],
      });
    }
  };

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    if (user && user.bookings) {
      setUser({
        ...user,
        bookings: user.bookings.map((b) => (b.id === id ? { ...b, ...updates } : b)),
      });
    }
  };

  const addAssessmentResult = (result: AssessmentResult) => {
    if (user) {
      setUser({
        ...user,
        assessmentResults: [...(user.assessmentResults || []), result],
      });
    }
  };

  const addRoadmap = (roadmap: CareerRoadmap) => {
    if (user) {
      setUser({
        ...user,
        roadmaps: [...(user.roadmaps || []), roadmap],
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        updateUser,
        addBooking,
        updateBooking,
        addAssessmentResult,
        addRoadmap,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}