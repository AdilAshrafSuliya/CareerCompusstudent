import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { mentors as initialMentors, Mentor } from "@/data/mentorData";

interface MentorsContextType {
  mentors: Mentor[];
  addMentor: (mentor: Mentor) => void;
  getMentorsBySubDomain: (subDomainId: string) => Mentor[];
  getMentorById: (mentorId: string) => Mentor | undefined;
}

const MentorsContext = createContext<MentorsContextType | undefined>(undefined);

export function MentorsProvider({ children }: { children: ReactNode }) {
  const [mentors, setMentors] = useState<Mentor[]>(initialMentors);

  const addMentor = (mentor: Mentor) => {
    setMentors((prev) => [...prev, mentor]);
  };

  const getMentorsBySubDomain = (subDomainId: string) => {
    return mentors.filter((mentor) => {
      // Support both single subDomainId and multiple subDomainIds
      if (mentor.subDomainIds && mentor.subDomainIds.length > 0) {
        return mentor.subDomainIds.includes(subDomainId);
      }
      return mentor.subDomainId === subDomainId;
    });
  };

  const getMentorById = (mentorId: string) => {
    return mentors.find((mentor) => mentor.id === mentorId);
  };

  return (
    <MentorsContext.Provider
      value={{
        mentors,
        addMentor,
        getMentorsBySubDomain,
        getMentorById,
      }}
    >
      {children}
    </MentorsContext.Provider>
  );
}

export function useMentors() {
  const context = useContext(MentorsContext);
  if (context === undefined) {
    throw new Error("useMentors must be used within a MentorsProvider");
  }
  return context;
}