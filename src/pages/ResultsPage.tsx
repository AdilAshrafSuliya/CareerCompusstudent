import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  Award,
  Target,
  TrendingUp,
  Lightbulb,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Download,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { getSubDomainById } from "@/data/careerData";
import { getCareerRecommendations } from "@/data/aiRecommendations";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Progress } from "@/app/components/ui/progress";

export function ResultsPage() {
  const { branchId, domainId, subDomainId, resultId } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useUser();

  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate("/login");
    }
  }, [isLoggedIn, user, navigate]);

  useEffect(() => {
    if (!branchId || !domainId || !subDomainId || !resultId) {
      navigate("/branches");
    }
  }, [branchId, domainId, subDomainId, resultId, navigate]);

  if (!isLoggedIn || !user) {
    return null;
  }

  if (!branchId || !domainId || !subDomainId || !resultId) {
    return null;
  }

  const subDomain = getSubDomainById(branchId, domainId, subDomainId);
  const result = user.assessmentResults?.find((r) => r.id === resultId);
  const careerRecommendations = getCareerRecommendations(subDomainId);

  useEffect(() => {
    if (!subDomain || !result) {
      navigate("/branches");
    }
  }, [subDomain, result, navigate]);

  if (!subDomain || !result) {
    return null;
  }

  const handleViewRecommendations = () => {
    navigate(
      `/branches/${branchId}/domains/${domainId}/subdomains/${subDomainId}/recommendations`
    );
  };

  const handleViewRoadmap = () => {
    navigate(`/branches/${branchId}/domains/${domainId}/subdomains/${subDomainId}/roadmap`);
  };

  // AI-generated summary based on score
  const getAISummary = (score: number) => {
    if (score >= 80) {
      return `Outstanding performance! You demonstrate strong aptitude for ${subDomain.name}. Your solid understanding of core concepts positions you well for success in this field. Focus on practical projects to strengthen your skills further.`;
    } else if (score >= 60) {
      return `Good foundation in ${subDomain.name}! You show promising potential with room for growth. Strengthen your weak areas through targeted learning and hands-on practice to reach expert level.`;
    } else if (score >= 40) {
      return `You're on the right path! While there's significant room for improvement, your assessment reveals areas of interest. Focus on building fundamentals through structured learning and consistent practice.`;
    } else {
      return `This field requires more foundation building. Don't be discouraged - everyone starts somewhere! Consider exploring introductory resources and taking time to build core competencies step by step.`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
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
            Assessment <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Report Card</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            AI-Powered Career Analysis for {subDomain.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Completed on {new Date(result.completedAt).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
            <CardHeader>
              <CardTitle className="text-center text-3xl">Your Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="16"
                      fill="none"
                      className="text-gray-200 dark:text-gray-700"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${result.score * 5.53} 553`}
                      className="text-purple-600 dark:text-purple-400"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-900 dark:text-white">
                        {result.score}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">out of 100</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Compatibility Score
                  </span>
                  <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                    {result.score}%
                  </span>
                </div>
                <Progress value={result.score} className="h-2" />
              </div>

              <div className="text-center">
                <Badge
                  variant="secondary"
                  className={`px-4 py-2 text-base ${
                    result.score >= 80
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                      : result.score >= 60
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      : result.score >= 40
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                  }`}
                >
                  {result.score >= 80
                    ? "Excellent"
                    : result.score >= 60
                    ? "Good"
                    : result.score >= 40
                    ? "Fair"
                    : "Needs Improvement"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* AI Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Card className="border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                AI-Generated Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {getAISummary(result.score)}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Strengths & Weaknesses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-8 mb-8"
        >
          {/* Strengths */}
          <Card className="border-2 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle2 className="w-6 h-6" />
                Strengths
              </CardTitle>
              <CardDescription>Areas where you excel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.strengths.map((strength, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                    <span className="text-gray-800 dark:text-gray-200">{strength}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weaknesses */}
          <Card className="border-2 border-orange-200 dark:border-orange-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                <Target className="w-6 h-6" />
                Areas for Improvement
              </CardTitle>
              <CardDescription>Focus on these to grow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.weaknesses.map((weakness, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg"
                  >
                    <Target className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                    <span className="text-gray-800 dark:text-gray-200">{weakness}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Interest Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <Card className="border-2 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                Your Interest Areas
              </CardTitle>
              <CardDescription>Topics that align with your preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {result.interests.map((interest, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="px-4 py-2 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Career Recommendations Preview */}
        {careerRecommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8"
          >
            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  Top Career Recommendations
                </CardTitle>
                <CardDescription>
                  AI-powered careers that match your profile
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {careerRecommendations.slice(0, 3).map((career, idx) => (
                  <div
                    key={career.id}
                    className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {career.title}
                      </h4>
                      <Badge className="bg-blue-600 text-white">
                        {career.matchPercentage}% Match
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      {career.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{career.salaryRange}</span>
                      <Badge variant="outline" className="text-xs">
                        {career.demandLevel} Demand
                      </Badge>
                    </div>
                  </div>
                ))}
                <Button
                  onClick={handleViewRecommendations}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  size="lg"
                >
                  View All Career Recommendations
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid md:grid-cols-2 gap-4"
        >
          <Button
            onClick={handleViewRoadmap}
            variant="outline"
            size="lg"
            className="w-full border-2 border-purple-300 dark:border-purple-700"
          >
            View Learning Roadmap
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full border-2 border-gray-300 dark:border-gray-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report (PDF)
          </Button>
        </motion.div>
      </div>
    </div>
  );
}