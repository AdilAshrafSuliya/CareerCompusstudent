import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  MapPin,
  Clock,
  CheckCircle2,
  BookOpen,
  ExternalLink,
  TrendingUp,
  Award,
  Target,
  Lightbulb,
  DollarSign,
} from "lucide-react";
import { getSubDomainById } from "@/data/careerData";
import { getRoadmap, getResources, Milestone, Resource } from "@/data/aiRecommendations";
import { useUser } from "@/contexts/UserContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Progress } from "@/app/components/ui/progress";

export function RoadmapPage() {
  const { branchId, domainId, subDomainId } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useUser();
  const [completedMilestones, setCompletedMilestones] = useState<Set<number>>(new Set());

  if (!isLoggedIn || !user) {
    navigate("/login");
    return null;
  }

  if (!branchId || !domainId || !subDomainId) {
    navigate("/branches");
    return null;
  }

  const subDomain = getSubDomainById(branchId, domainId, subDomainId);
  const roadmap = getRoadmap(subDomainId);
  const resources = getResources(subDomainId);

  if (!subDomain) {
    navigate("/branches");
    return null;
  }

  const toggleMilestone = (index: number) => {
    setCompletedMilestones((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const progressPercentage = roadmap
    ? (completedMilestones.size / roadmap.milestones.length) * 100
    : 0;

  const freeResources = resources.filter((r) => r.type === "free");
  const paidResources = resources.filter((r) => r.type === "paid");

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
              <MapPin className="w-12 h-12 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Roadmap</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Your personalized path to mastering {subDomain.name}
          </p>
          {roadmap && (
            <p className="text-sm text-purple-600 dark:text-purple-400 mt-2">
              Estimated Duration: {roadmap.estimatedDuration}
            </p>
          )}
        </motion.div>

        {/* Progress Card */}
        {roadmap && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Milestones Completed
                      </span>
                      <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                        {completedMilestones.size} / {roadmap.milestones.length}
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Keep going! You're making great progress
                    </span>
                    <Badge variant="secondary" className="px-3 py-1">
                      {Math.round(progressPercentage)}% Complete
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Roadmap or Resources Tabs */}
        <Tabs defaultValue="roadmap" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="roadmap" className="text-base">
              <MapPin className="w-4 h-4 mr-2" />
              Roadmap
            </TabsTrigger>
            <TabsTrigger value="resources" className="text-base">
              <BookOpen className="w-4 h-4 mr-2" />
              Resources
            </TabsTrigger>
          </TabsList>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap">
            {roadmap ? (
              <div className="space-y-6">
                {roadmap.milestones.map((milestone, index) => (
                  <MilestoneCard
                    key={index}
                    milestone={milestone}
                    index={index}
                    isCompleted={completedMilestones.has(index)}
                    onToggle={() => toggleMilestone(index)}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-20"
              >
                <Target className="w-20 h-20 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  No Roadmap Available
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Complete an assessment to get a personalized learning roadmap
                </p>
              </motion.div>
            )}
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            {resources.length > 0 ? (
              <div className="space-y-8">
                {/* Free Resources */}
                {freeResources.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Free Resources
                      </h2>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                        {freeResources.length} Available
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {freeResources.map((resource) => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Paid Resources */}
                {paidResources.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Premium Resources
                      </h2>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                        {paidResources.length} Available
                      </Badge>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {paidResources.map((resource) => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-20"
              >
                <BookOpen className="w-20 h-20 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  No Resources Available
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Check back later for curated learning resources
                </p>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                    Pro Tips for Success
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                      <span>Follow the roadmap sequentially for best results</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                      <span>Build projects alongside learning to reinforce concepts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                      <span>Connect with mentors for personalized guidance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                      <span>Consistency matters more than speed - take your time to master each milestone</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

interface MilestoneCardProps {
  milestone: Milestone;
  index: number;
  isCompleted: boolean;
  onToggle: () => void;
}

function MilestoneCard({ milestone, index, isCompleted, onToggle }: MilestoneCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card 
        className={`border-2 transition-all ${
          isCompleted
            ? "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20"
            : "border-purple-200 dark:border-purple-800 hover:shadow-lg"
        }`}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className={`flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0 ${
                isCompleted
                  ? "bg-green-100 dark:bg-green-900/30"
                  : "bg-purple-100 dark:bg-purple-900/30"
              }`}>
                {isCompleted ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                ) : (
                  <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {index + 1}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl mb-2">{milestone.title}</CardTitle>
                <CardDescription className="text-base mb-3">
                  {milestone.description}
                </CardDescription>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {milestone.duration}
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant={isCompleted ? "secondary" : "outline"}
              size="sm"
              onClick={onToggle}
              className={isCompleted ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" : ""}
            >
              {isCompleted ? "Completed" : "Mark Complete"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              Recommended Resources
            </h4>
            <ul className="space-y-2">
              {milestone.resources.map((resource, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700"
                >
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span>{resource}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface ResourceCardProps {
  resource: Resource;
}

function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Card className="border-2 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-lg flex-1">{resource.title}</CardTitle>
          <Badge 
            variant="secondary"
            className={resource.type === "free" 
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
              : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
            }
          >
            {resource.type === "free" ? "Free" : "Paid"}
          </Badge>
        </div>
        <CardDescription>{resource.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <BookOpen className="w-4 h-4" />
            <span>{resource.platform}</span>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.open(resource.url, "_blank")}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Visit Resource
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}