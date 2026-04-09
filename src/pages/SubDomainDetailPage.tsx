import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "motion/react";
import {
  TrendingUp,
  DollarSign,
  Briefcase,
  Target,
  Calendar,
  BookOpen,
  ArrowRight,
  Sparkles,
  Award,
  Users,
} from "lucide-react";
import { getSubDomainById } from "@/data/careerData";
import { getMentorsBySubDomain } from "@/data/mentorData";
import { getAssessmentBySubDomain } from "@/data/assessmentData";
import { useUser } from "@/contexts/UserContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";

export function SubDomainDetailPage() {
  const { branchId, domainId, subDomainId } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useUser();

  useEffect(() => {
    if (!branchId || !domainId || !subDomainId) {
      navigate("/branches");
    }
  }, [branchId, domainId, subDomainId, navigate]);

  if (!branchId || !domainId || !subDomainId) {
    return null;
  }

  const subDomain = getSubDomainById(branchId, domainId, subDomainId);
  const mentors = getMentorsBySubDomain(subDomainId);
  const assessment = getAssessmentBySubDomain(subDomainId);

  useEffect(() => {
    if (!subDomain) {
      navigate("/branches");
    }
  }, [subDomain, navigate]);

  if (!subDomain) {
    return null;
  }

  const handleBookMentor = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate(`/branches/${branchId}/domains/${domainId}/subdomains/${subDomainId}/mentors`);
  };

  const handleTakeAssessment = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate(`/branches/${branchId}/domains/${domainId}/subdomains/${subDomainId}/assessment`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            {subDomain.trending && (
              <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending Career
              </Badge>
            )}
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {subDomain.name}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-3xl">
            {subDomain.description}
          </p>

          {/* Key Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="border-2 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Average Salary</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{subDomain.salary}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Job Growth</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{subDomain.jobGrowth}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 dark:border-purple-800">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Available Mentors</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{mentors.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-all hover:shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-2xl">Book a Mentor Session</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Connect with industry experts for personalized career guidance and mentorship
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Sparkles className="w-4 h-4" />
                    <span>{mentors.length} expert mentors available</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Award className="w-4 h-4" />
                    <span>Get real-world insights and advice</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Target className="w-4 h-4" />
                    <span>Flexible time slots available</span>
                  </div>
                </div>
                <Button
                  onClick={handleBookMentor}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  size="lg"
                >
                  Book Mentor Session
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="h-full border-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all hover:shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-2xl">Take Career Assessment</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Discover your strengths and get AI-powered career recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {assessment ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Sparkles className="w-4 h-4" />
                      <span>{assessment.totalQuestions} carefully curated questions</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Award className="w-4 h-4" />
                      <span>Get detailed AI-powered report card</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Target className="w-4 h-4" />
                      <span>Duration: {assessment.duration} minutes</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Assessment coming soon for this career path
                  </p>
                )}
                <Button
                  onClick={handleTakeAssessment}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  size="lg"
                  disabled={!assessment}
                >
                  {assessment ? "Take Assessment" : "Coming Soon"}
                  {assessment && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Skills Required */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <Card className="border-2 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                Skills You'll Need
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {subDomain.skillsRequired.map((skill, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="px-4 py-2 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Companies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                Top Hiring Companies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {subDomain.topCompanies.map((company, idx) => (
                  <div
                    key={idx}
                    className="px-5 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg font-medium text-gray-900 dark:text-white"
                  >
                    {company}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={() => navigate(`/branches/${branchId}/domains/${domainId}`)}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-medium transition-all inline-flex items-center gap-2"
          >
            ← Back to Career Paths
          </button>
        </div>
      </div>
    </div>
  );
}