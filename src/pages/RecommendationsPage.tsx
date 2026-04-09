import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  Award,
  TrendingUp,
  Briefcase,
  DollarSign,
  Target,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Users,
} from "lucide-react";
import { getSubDomainById } from "@/data/careerData";
import { getCareerRecommendations, CareerOption } from "@/data/aiRecommendations";
import { useUser } from "@/contexts/UserContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Progress } from "@/app/components/ui/progress";

export function RecommendationsPage() {
  const { branchId, domainId, subDomainId } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useUser();

  if (!isLoggedIn || !user) {
    navigate("/login");
    return null;
  }

  if (!branchId || !domainId || !subDomainId) {
    navigate("/branches");
    return null;
  }

  const subDomain = getSubDomainById(branchId, domainId, subDomainId);
  const careerRecommendations = getCareerRecommendations(subDomainId);

  if (!subDomain) {
    navigate("/branches");
    return null;
  }

  const handleViewRoadmap = () => {
    navigate(`/branches/${branchId}/domains/${domainId}/subdomains/${subDomainId}/roadmap`);
  };

  const handleBookMentor = () => {
    navigate(`/branches/${branchId}/domains/${domainId}/subdomains/${subDomainId}/mentors`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full">
              <Award className="w-12 h-12 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Recommendations</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            AI-powered career paths tailored for {subDomain.name}
          </p>
          <p className="text-sm text-purple-600 dark:text-purple-400 mt-2">
            Based on your assessment results and interests
          </p>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                    How We Generate Recommendations
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Our AI analyzes your assessment performance, interests, strengths, and career preferences to suggest the most suitable career paths. Each recommendation includes detailed information about required skills, salary ranges, job demand, and future growth prospects.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Career Recommendations */}
        <div className="grid gap-6 mb-8">
          {careerRecommendations.map((career, idx) => (
            <CareerCard key={career.id} career={career} index={idx} />
          ))}
        </div>

        {/* No Recommendations Fallback */}
        {careerRecommendations.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center py-20"
          >
            <Target className="w-20 h-20 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              No Recommendations Available
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Complete an assessment to get personalized career recommendations
            </p>
            <Button
              onClick={() => navigate(`/branches/${branchId}/domains/${domainId}/subdomains/${subDomainId}/assessment`)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              Take Assessment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}

        {/* Action Cards */}
        {careerRecommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid md:grid-cols-2 gap-6"
          >
            <Card className="border-2 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow cursor-pointer" onClick={handleViewRoadmap}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  Learning Roadmap
                </CardTitle>
                <CardDescription>
                  Get a step-by-step learning path to achieve your career goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewRoadmap();
                  }}
                >
                  View Roadmap
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow cursor-pointer" onClick={handleBookMentor}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  Connect with Mentors
                </CardTitle>
                <CardDescription>
                  Book one-on-one sessions with industry experts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookMentor();
                  }}
                >
                  Find Mentors
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}

interface CareerCardProps {
  career: CareerOption;
  index: number;
}

function CareerCard({ career, index }: CareerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
    >
      <Card className="border-2 border-purple-200 dark:border-purple-800 hover:shadow-xl transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <CardTitle className="text-2xl">{career.title}</CardTitle>
                <Badge 
                  variant="secondary" 
                  className={`px-3 py-1 text-sm ${
                    career.matchPercentage >= 90
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      : career.matchPercentage >= 80
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                  }`}
                >
                  {career.matchPercentage}% Match
                </Badge>
              </div>
              <CardDescription className="text-base">
                {career.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Match Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                Compatibility Score
              </span>
              <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                {career.matchPercentage}%
              </span>
            </div>
            <Progress value={career.matchPercentage} className="h-2" />
          </div>

          {/* Key Info Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Salary Range</p>
                <p className="font-semibold text-gray-900 dark:text-white">{career.salaryRange}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Job Demand</p>
                <p className="font-semibold text-gray-900 dark:text-white">{career.demandLevel}</p>
              </div>
            </div>
          </div>

          {/* Required Skills */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              Required Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {career.requiredSkills.map((skill, idx) => (
                <Badge key={idx} variant="outline" className="px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Future Scope */}
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              Future Scope
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {career.futureScope}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}