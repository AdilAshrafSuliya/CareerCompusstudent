import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  User,
  Mail,
  Calendar,
  Award,
  Clock,
  CheckCircle2,
  Star,
  Users,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Video,
  BookOpen,
  Edit,
  Save,
  X,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { getAllSubDomains } from "@/data/careerData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Progress } from "@/app/components/ui/progress";
import { Textarea } from "@/app/components/ui/textarea";
import { Checkbox } from "@/app/components/ui/checkbox";

// Mock data for mentor dashboard
const MOCK_MENTOR_BOOKINGS = [
  {
    id: "1",
    studentName: "Alex Student",
    studentEmail: "alex@student.com",
    subDomain: "Web Development",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    timeSlot: "10:00 AM - 11:00 AM",
    status: "pending" as const,
    studentGoals: "Learn React and modern web development"
  },
  {
    id: "2",
    studentName: "Jamie Lee",
    studentEmail: "jamie@student.com",
    subDomain: "Data Science",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    timeSlot: "2:00 PM - 3:00 PM",
    status: "accepted" as const,
    studentGoals: "Career transition into data science"
  },
  {
    id: "3",
    studentName: "Pat Wilson",
    studentEmail: "pat@student.com",
    subDomain: "Software Engineering",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    timeSlot: "11:00 AM - 12:00 PM",
    status: "completed" as const,
    studentGoals: "Interview preparation",
    rating: 5,
    feedback: "Excellent session! Very helpful with interview preparation."
  },
  {
    id: "4",
    studentName: "Sam Brown",
    studentEmail: "sam@student.com",
    subDomain: "Mobile Development",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    timeSlot: "3:00 PM - 4:00 PM",
    status: "completed" as const,
    studentGoals: "Flutter app development guidance",
    rating: 5,
    feedback: "Great insights on mobile app architecture!"
  },
];

export function MentorDashboard() {
  const navigate = useNavigate();
  const { user, isLoggedIn, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [bookings, setBookings] = useState(MOCK_MENTOR_BOOKINGS);
  const [editedProfile, setEditedProfile] = useState({
    name: "",
    email: "",
    expertise: "",
    bio: "",
    mentorSubDomainIds: [] as string[],
  });

  const allSubDomains = getAllSubDomains();

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
        expertise: "Software Engineering & Web Development",
        bio: "15+ years of experience in software development and mentoring",
        mentorSubDomainIds: user.mentorSubDomainIds || [],
      });
    }
  }, [user]);

  if (!isLoggedIn || !user) {
    return null;
  }

  const completedSessions = bookings.filter((b) => b.status === "completed").length;
  const upcomingSessions = bookings.filter((b) => b.status === "accepted").length;
  const pendingRequests = bookings.filter((b) => b.status === "pending").length;
  
  const completedBookings = bookings.filter((b) => b.status === "completed" && b.rating);
  const averageRating = completedBookings.length > 0
    ? (completedBookings.reduce((sum, b) => sum + (b.rating || 0), 0) / completedBookings.length).toFixed(1)
    : "5.0";

  const handleSaveProfile = () => {
    updateUser(editedProfile);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedProfile({
      name: user.name || "",
      email: user.email || "",
      expertise: "Software Engineering & Web Development",
      bio: "15+ years of experience in software development and mentoring",
      mentorSubDomainIds: user.mentorSubDomainIds || [],
    });
    setIsEditing(false);
  };

  const handleBookingAction = (bookingId: string, action: "accept" | "reject") => {
    setBookings(bookings.map(b => 
      b.id === bookingId 
        ? { ...b, status: action === "accept" ? "accepted" as const : "completed" as const }
        : b
    ));
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
                Mentor <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Dashboard</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Welcome back, {user.name}! Manage your mentorship sessions here.
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border-2 border-purple-200 dark:border-purple-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Sessions</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{completedSessions}</p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending Requests</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{pendingRequests}</p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Upcoming</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{upcomingSessions}</p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-200 dark:border-yellow-800">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg. Rating</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{averageRating}</p>
                  </div>
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4">
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Pending Requests Tab */}
          <TabsContent value="requests">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Pending Session Requests
                  </CardTitle>
                  <CardDescription>Review and respond to student requests</CardDescription>
                </CardHeader>
                <CardContent>
                  {bookings.filter(b => b.status === "pending").length > 0 ? (
                    <div className="space-y-4">
                      {bookings.filter(b => b.status === "pending").map((booking) => (
                        <div
                          key={booking.id}
                          className="p-5 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                                {booking.studentName}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {booking.studentEmail}
                              </p>
                              <div className="mt-3 space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                  <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                                  <span className="text-gray-700 dark:text-gray-300">{booking.subDomain}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {new Date(booking.date).toLocaleDateString("en-US", {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
                                  <span className="text-gray-700 dark:text-gray-300">{booking.timeSlot}</span>
                                </div>
                              </div>
                              <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Student Goals:</p>
                                <p className="text-sm text-gray-900 dark:text-white">{booking.studentGoals}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <Button
                              onClick={() => handleBookingAction(booking.id, "accept")}
                              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Accept Request
                            </Button>
                            <Button
                              onClick={() => handleBookingAction(booking.id, "reject")}
                              variant="outline"
                              className="flex-1"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Decline
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Clock className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">No pending requests at the moment</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Upcoming & Past Sessions Tab */}
          <TabsContent value="sessions">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Upcoming Sessions */}
              <Card className="border-2 border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
                    Upcoming Sessions
                  </CardTitle>
                  <CardDescription>Your scheduled mentorship sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  {bookings.filter(b => b.status === "accepted").length > 0 ? (
                    <div className="space-y-4">
                      {bookings.filter(b => b.status === "accepted").map((booking) => (
                        <div
                          key={booking.id}
                          className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-800 rounded-lg"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white">{booking.studentName}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{booking.subDomain}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(booking.date).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {booking.timeSlot}
                                </span>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => window.open(`https://meet.careercompass.com/session-${booking.id}`, '_blank')}
                              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                            >
                              <Video className="w-4 h-4 mr-2" />
                              Join Session
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-600 dark:text-gray-400 text-sm">No upcoming sessions</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Past Sessions */}
              <Card className="border-2 border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    Past Sessions
                  </CardTitle>
                  <CardDescription>Your completed mentorship sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bookings.filter(b => b.status === "completed").map((booking) => (
                      <div
                        key={booking.id}
                        className="p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{booking.studentName}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{booking.subDomain}</p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                              <Calendar className="w-3 h-3" />
                              {new Date(booking.date).toLocaleDateString()}
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                            Completed
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-2 border-yellow-200 dark:border-yellow-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    Student Reviews & Ratings
                  </CardTitle>
                  <CardDescription>Feedback from your mentorship sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Overall Rating</p>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <p className="text-5xl font-bold text-gray-900 dark:text-white">{averageRating}</p>
                      <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Based on {completedBookings.length} reviews
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {bookings.filter(b => b.feedback).map((booking) => (
                      <div
                        key={booking.id}
                        className="p-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{booking.studentName}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(booking.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(booking.rating || 0)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{booking.feedback}</p>
                        <Badge className="mt-2 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                          {booking.subDomain}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

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
                      Mentor Profile
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
                        <Label htmlFor="expertise">Expertise</Label>
                        <Input
                          id="expertise"
                          value={editedProfile.expertise}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, expertise: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={editedProfile.bio}
                          onChange={(e) =>
                            setEditedProfile({ ...editedProfile, bio: e.target.value })
                          }
                          className="min-h-[80px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Career Domains You Can Mentor In</Label>
                        <div className="max-h-48 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-3 space-y-2">
                          {allSubDomains.map((subDomain) => (
                            <div key={subDomain.id} className="flex items-start space-x-3">
                              <Checkbox
                                id={`edit-${subDomain.id}`}
                                checked={editedProfile.mentorSubDomainIds.includes(subDomain.id)}
                                onCheckedChange={(checked) => {
                                  setEditedProfile((prev) => ({
                                    ...prev,
                                    mentorSubDomainIds: checked
                                      ? [...prev.mentorSubDomainIds, subDomain.id]
                                      : prev.mentorSubDomainIds.filter((id) => id !== subDomain.id),
                                  }));
                                }}
                              />
                              <Label
                                htmlFor={`edit-${subDomain.id}`}
                                className="text-sm font-normal cursor-pointer flex-1"
                              >
                                <div>
                                  <div className="font-medium text-gray-900 dark:text-white">{subDomain.name}</div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {subDomain.branchName} • {subDomain.domainName}
                                  </div>
                                </div>
                              </Label>
                            </div>
                          ))}
                        </div>
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
                        <Award className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Expertise</p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {editedProfile.expertise}
                          </p>
                        </div>
                      </div>
                      <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Bio</p>
                        <p className="text-sm text-gray-900 dark:text-white">
                          {editedProfile.bio}
                        </p>
                      </div>
                      <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Mentoring Domains</p>
                        <div className="flex flex-wrap gap-2">
                          {editedProfile.mentorSubDomainIds && editedProfile.mentorSubDomainIds.length > 0 ? (
                            editedProfile.mentorSubDomainIds.map((subDomainId) => {
                              const subDomain = allSubDomains.find((sd) => sd.id === subDomainId);
                              return subDomain ? (
                                <Badge key={subDomainId} className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                                  {subDomain.name}
                                </Badge>
                              ) : null;
                            })
                          ) : (
                            <span className="text-sm text-gray-500 dark:text-gray-400">No domains selected</span>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Performance Stats */}
              <Card className="border-2 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Session Completion Rate</span>
                        <span className="font-semibold text-gray-900 dark:text-white">100%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Student Satisfaction</span>
                        <span className="font-semibold text-gray-900 dark:text-white">98%</span>
                      </div>
                      <Progress value={98} className="h-2" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Response Time</span>
                        <span className="font-semibold text-gray-900 dark:text-white">95%</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Achievements</h4>
                    <div className="space-y-2">
                      <Badge className="mr-2 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
                        <Star className="w-3 h-3 mr-1" />
                        Top Mentor
                      </Badge>
                      <Badge className="mr-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        100+ Sessions
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        <Users className="w-3 h-3 mr-1" />
                        50+ Students
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}