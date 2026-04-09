import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  User,
  Mail,
  GraduationCap,
  Target,
  Calendar,
  Award,
  TrendingUp,
  BookOpen,
  Clock,
  CheckCircle2,
  Flame,
  Edit,
  Save,
  X,
  BarChart3,
  Users,
  Lightbulb,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Progress } from "@/app/components/ui/progress";
import { MentorDashboard } from "@/pages/MentorDashboard";

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, isLoggedIn, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: "",
    email: "",
    stream: "",
    careerGoals: "",
  });

  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate("/login");
    }
  }, [isLoggedIn, user, navigate]);

  useEffect(() => {
    if (user) {
      setEditedProfile({
        name: user.name || "",
        email: user.email || "",
        stream: user.stream || "",
        careerGoals: user.careerGoals || "",
      });
    }
  }, [user]);

  if (!isLoggedIn || !user) {
    return null;
  }

  // Route to mentor dashboard if user is a mentor
  if (user.role === "mentor") {
    return <MentorDashboard />;
  }

  // Student dashboard continues below
  const bookings = user.bookings || [];
  const assessmentResults = user.assessmentResults || [];
  const completedBookings = bookings.filter((b) => b.status === "completed").length;
  const upcomingBookings = bookings.filter((b) => b.status === "accepted" || b.status === "pending").length;

  // Calculate streak (mock data - in real app, this would be calculated from activity history)
  const currentStreak = user.streak || 7;
  const longestStreak = user.longestStreak || 14;

  // Calculate progress metrics
  const totalAssessments = assessmentResults.length;
  const averageScore =
    totalAssessments > 0
      ? Math.round(assessmentResults.reduce((sum, r) => sum + r.score, 0) / totalAssessments)
      : 0;

  const handleSaveProfile = () => {
    updateUser(editedProfile);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedProfile({
      name: user.name || "",
      email: user.email || "",
      stream: user.stream || "",
      careerGoals: user.careerGoals || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Dashboard</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Welcome back, {user.name}! Track your career journey here.
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border-2 border-purple-200 dark:border-purple-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Assessments</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalAssessments}</p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg. Score</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{averageScore}%</p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Sessions</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{completedBookings}</p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 dark:border-orange-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Day Streak</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{currentStreak}</p>
                  </div>
                  <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <Flame className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="assessments">Assessments</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {/* Profile Information */}
              <Card className="border-2 border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      Profile Information
                    </CardTitle>
                    {!isEditing ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCancelEdit}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSaveProfile}
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={editedProfile.name}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, name: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editedProfile.email}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, email: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stream">Stream</Label>
                        <Input
                          id="stream"
                          value={editedProfile.stream}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, stream: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="careerGoals">Career Goals</Label>
                        <Input
                          id="careerGoals"
                          value={editedProfile.careerGoals}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, careerGoals: e.target.value })
                          }
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Name</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <GraduationCap className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Stream</p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {user.stream || "Not specified"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <Target className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Career Goals</p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {user.careerGoals || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Career Path & Streak */}
              <div className="space-y-6">
                {/* Selected Career Path */}
                <Card className="border-2 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      Selected Career Path
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
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
                    {user.selectedSubDomain && (
                      <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Sub-Domain</span>
                        <Badge className="bg-blue-600 text-white">{user.selectedSubDomain}</Badge>
                      </div>
                    )}
                    {!user.selectedBranch && (
                      <div className="text-center py-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          You haven't selected a career path yet
                        </p>
                        <Button
                          onClick={() => navigate("/branches")}
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                        >
                          Explore Careers
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Streak Tracker */}
                <Card className="border-2 border-orange-200 dark:border-orange-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      Activity Streak
                    </CardTitle>
                    <CardDescription>Keep learning every day!</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-around">
                      <div className="text-center">
                        <div className="flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-2">
                          <Flame className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentStreak}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Current Streak</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-2">
                          <Award className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{longestStreak}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Longest Streak</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">This Week</p>
                      <div className="flex justify-between gap-1">
                        {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => (
                          <div
                            key={idx}
                            className={`flex-1 h-12 rounded flex items-center justify-center text-xs font-medium ${
                              idx < 5
                                ? "bg-orange-500 text-white"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                            }`}
                          >
                            {day}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Assessment Progress */}
              <Card className="border-2 border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    Assessment Performance
                  </CardTitle>
                  <CardDescription>Your learning progress over time</CardDescription>
                </CardHeader>
                <CardContent>
                  {assessmentResults.length > 0 ? (
                    <div className="space-y-6">
                      <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Overall Average Score</p>
                        <p className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                          {averageScore}%
                        </p>
                      </div>
                      <div className="space-y-4">
                        {assessmentResults.map((result, idx) => (
                          <div
                            key={result.id}
                            className="p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">{result.subDomain}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(result.completedAt).toLocaleDateString()}
                                </p>
                              </div>
                              <Badge
                                className={
                                  result.score >= 80
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                    : result.score >= 60
                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                                }
                              >
                                {result.score}%
                              </Badge>
                            </div>
                            <Progress value={result.score} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BookOpen className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400 mb-4">No assessments completed yet</p>
                      <Button
                        onClick={() => navigate("/branches")}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                      >
                        Take Your First Assessment
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    My Mentor Sessions
                  </CardTitle>
                  <CardDescription>Upcoming and past mentor sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  {bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings.slice(0, 5).map((booking) => (
                        <div
                          key={booking.id}
                          className="p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">{booking.mentorName}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{booking.subDomain}</p>
                              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                                <Calendar className="w-3 h-3" />
                                {new Date(booking.date).toLocaleDateString()}
                                <Clock className="w-3 h-3 ml-2" />
                                {booking.specificTime || booking.timeSlot}
                              </div>
                            </div>
                            <Badge
                              className={
                                booking.status === "completed"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                  : booking.status === "accepted"
                                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                              }
                            >
                              {booking.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => navigate("/bookings")}
                      >
                        View All Bookings
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Users className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400 mb-4">No mentor sessions booked yet</p>
                      <Button
                        onClick={() => navigate("/branches")}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                      >
                        Find a Mentor
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Assessments Tab */}
          <TabsContent value="assessments">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-2 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
                    Assessment History
                  </CardTitle>
                  <CardDescription>All your completed career assessments</CardDescription>
                </CardHeader>
                <CardContent>
                  {assessmentResults.length > 0 ? (
                    <div className="space-y-4">
                      {assessmentResults.map((result) => (
                        <div
                          key={result.id}
                          className="p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{result.subDomain}</h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Completed on {new Date(result.completedAt).toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{result.score}%</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Strengths:</p>
                              <div className="flex flex-wrap gap-1">
                                {result.strengths.map((strength, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="outline"
                                    className="text-xs border-green-300 text-green-700 dark:border-green-700 dark:text-green-300"
                                  >
                                    <CheckCircle2 className="w-3 h-3 mr-1" />
                                    {strength}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Award className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400 mb-4">No assessments taken yet</p>
                      <Button
                        onClick={() => navigate("/branches")}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                      >
                        Take Assessment
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}