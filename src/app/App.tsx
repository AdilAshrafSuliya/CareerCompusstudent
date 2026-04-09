import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import { MentorsProvider } from "@/contexts/MentorsContext";
import { Toaster } from "@/app/components/ui/sonner";
import { Header } from "@/app/components/Header";
import { LandingPage } from "@/pages/LandingPage";
import { LoginPage } from "@/pages/LoginPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { BranchesPage } from "@/pages/BranchesPage";
import { DomainsPage } from "@/pages/DomainsPage";
import { SubDomainDetailPage } from "@/pages/SubDomainDetailPage";
import { MentorsPage } from "@/pages/MentorsPage";
import { BookingsPage } from "@/pages/BookingsPage";
import { AssessmentPage } from "@/pages/AssessmentPage";
import { ResultsPage } from "@/pages/ResultsPage";
import { RecommendationsPage } from "@/pages/RecommendationsPage";
import { RoadmapPage } from "@/pages/RoadmapPage";
import { MyRoadmapPage } from "@/pages/MyRoadmapPage";

export default function App() {
  return (
    <UserProvider>
      <MentorsProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <Header />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/roadmap" element={<MyRoadmapPage />} />
              <Route path="/branches" element={<BranchesPage />} />
              <Route path="/branches/:branchId" element={<BranchesPage />} />
              <Route path="/branches/:branchId/domains/:domainId" element={<DomainsPage />} />
              <Route path="/branches/:branchId/domains/:domainId/subdomains/:subDomainId" element={<SubDomainDetailPage />} />
              <Route path="/branches/:branchId/domains/:domainId/subdomains/:subDomainId/mentors" element={<MentorsPage />} />
              <Route path="/branches/:branchId/domains/:domainId/subdomains/:subDomainId/assessment" element={<AssessmentPage />} />
              <Route path="/branches/:branchId/domains/:domainId/subdomains/:subDomainId/results/:resultId" element={<ResultsPage />} />
              <Route path="/branches/:branchId/domains/:domainId/subdomains/:subDomainId/recommendations" element={<RecommendationsPage />} />
              <Route path="/branches/:branchId/domains/:domainId/subdomains/:subDomainId/roadmap" element={<RoadmapPage />} />
              <Route path="/bookings" element={<BookingsPage />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </MentorsProvider>
    </UserProvider>
  );
}