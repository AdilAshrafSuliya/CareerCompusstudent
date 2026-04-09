import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Map, TrendingUp, BookOpen, Target, ArrowRight } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";

export function MyRoadmapPage() {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useUser();

  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate("/login");
    }
  }, [isLoggedIn, user, navigate]);

  if (!isLoggedIn || !user) {
    return null;
  }

  // If user has selected a full career path, redirect to the specific roadmap
  useEffect(() => {
    if (user.selectedBranch && user.selectedDomain && user.selectedSubDomain) {
      navigate(
        `/branches/${user.selectedBranch}/domains/${user.selectedDomain}/subdomains/${user.selectedSubDomain}/roadmap`
      );
    }
  }, [user.selectedBranch, user.selectedDomain, user.selectedSubDomain, navigate]);

  // Show saved roadmaps or prompt to select a career path
  const roadmaps = user.roadmaps || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            My Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Roadmap</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Track your personalized learning journey
          </p>
        </motion.div>

        {/* No Career Path Selected */}
        {!user.selectedBranch && roadmaps.length === 0 && (
          <Card className="max-w-2xl mx-auto border-2 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-full">
                  <Map className="w-12 h-12 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <CardTitle className="text-center text-2xl">Start Your Career Journey</CardTitle>
              <CardDescription className="text-center text-base">
                You haven't selected a career path yet. Explore our career paths and take assessments to get personalized roadmaps.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Explore Careers</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Browse career paths</p>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Take Assessment</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Discover your strengths</p>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Target className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Get Roadmap</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Personalized learning path</p>
                </div>
              </div>
              <Button
                onClick={() => navigate("/branches")}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                size="lg"
              >
                Explore Career Paths
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Saved Roadmaps */}
        {roadmaps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Saved Roadmaps</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {roadmaps.map((roadmap) => (
                <Card
                  key={roadmap.id}
                  className="border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-all hover:shadow-xl cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/branches/${user.selectedBranch}/domains/${roadmap.subDomain}/subdomains/${roadmap.subDomain}/roadmap`
                    )
                  }
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl">{roadmap.career}</CardTitle>
                        <CardDescription>{roadmap.subDomain}</CardDescription>
                      </div>
                      <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                        Active
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <BookOpen className="w-4 h-4" />
                        <span>{roadmap.resources.length} Resources</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Selected Career Path Info */}
        {user.selectedBranch && !user.selectedSubDomain && (
          <Card className="max-w-2xl mx-auto border-2 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <Map className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <CardTitle className="text-center text-2xl">Complete Your Career Selection</CardTitle>
              <CardDescription className="text-center text-base">
                You've selected {user.selectedBranch}. Choose a specific career path to get your personalized roadmap.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-6">
                {user.selectedBranch && (
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Branch</span>
                    <Badge className="bg-blue-600 text-white">{user.selectedBranch}</Badge>
                  </div>
                )}
                {user.selectedDomain && (
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Domain</span>
                    <Badge className="bg-blue-600 text-white">{user.selectedDomain}</Badge>
                  </div>
                )}
              </div>
              <Button
                onClick={() => navigate(`/branches/${user.selectedBranch}`)}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                size="lg"
              >
                Continue Selection
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Back to Dashboard */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-medium transition-all inline-flex items-center gap-2"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
