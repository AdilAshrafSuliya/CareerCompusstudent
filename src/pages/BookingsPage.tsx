import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Video,
  Briefcase,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";

export function BookingsPage() {
  const navigate = useNavigate();
  const { user, isLoggedIn, updateBooking } = useUser();

  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate("/login");
    }
  }, [isLoggedIn, user, navigate]);

  if (!isLoggedIn || !user) {
    return null;
  }

  const bookings = user.bookings || [];
  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const acceptedBookings = bookings.filter((b) => b.status === "accepted");
  const completedBookings = bookings.filter((b) => b.status === "completed");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "accepted":
        return <CheckCircle2 className="w-4 h-4" />;
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "accepted":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300";
      case "completed":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
    }
  };

  const simulateAcceptBooking = (bookingId: string) => {
    // Simulate mentor accepting the booking with a specific time
    const specificTime = "10:30 AM - 11:15 AM";
    updateBooking(bookingId, {
      status: "accepted",
      specificTime,
      meetingLink: "https://meet.careercampus.app/" + Math.random().toString(36).substring(7),
    });
  };

  const renderBookingCard = (booking: any) => (
    <Card
      key={booking.id}
      className="border-2 border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all"
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              {booking.mentorName}
            </CardTitle>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Briefcase className="w-4 h-4" />
                <span>{booking.subDomain}</span>
              </div>
            </div>
          </div>
          <Badge className={`${getStatusColor(booking.status)} flex items-center gap-1`}>
            {getStatusIcon(booking.status)}
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{new Date(booking.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>
              {booking.specificTime || booking.timeSlot}
              {!booking.specificTime && " (awaiting confirmation)"}
            </span>
          </div>
        </div>

        {booking.status === "pending" && (
          <div className="bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-lg">
            <p className="text-xs text-yellow-700 dark:text-yellow-300">
              Waiting for mentor to confirm the exact time within your selected slot
            </p>
            <Button
              size="sm"
              variant="outline"
              className="mt-2 w-full"
              onClick={() => simulateAcceptBooking(booking.id)}
            >
              Simulate Mentor Acceptance
            </Button>
          </div>
        )}

        {booking.status === "accepted" && booking.meetingLink && (
          <div className="space-y-2">
            <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-lg">
              <p className="text-xs text-green-700 dark:text-green-300 mb-2">
                Your session has been confirmed! Join using the meeting link.
              </p>
            </div>
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              onClick={() => window.open(booking.meetingLink, "_blank")}
            >
              <Video className="w-4 h-4 mr-2" />
              Join Meeting
            </Button>
          </div>
        )}

        {booking.status === "completed" && (
          <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-lg">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Session completed. We hope you had a great mentoring experience!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Bookings</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage your mentor sessions and upcoming meetings
          </p>
        </motion.div>

        {bookings.length === 0 ? (
          <Card className="max-w-2xl mx-auto border-2 border-purple-200 dark:border-purple-800">
            <CardHeader>
              <CardTitle>No Bookings Yet</CardTitle>
              <CardDescription>
                You haven't booked any mentor sessions yet. Explore career paths and connect with
                mentors!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => navigate("/branches")}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                Explore Career Paths
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
              <TabsTrigger value="all">
                All
                <Badge variant="secondary" className="ml-2">
                  {bookings.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending
                <Badge variant="secondary" className="ml-2">
                  {pendingBookings.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="accepted">
                Accepted
                <Badge variant="secondary" className="ml-2">
                  {acceptedBookings.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="completed">
                Done
                <Badge variant="secondary" className="ml-2">
                  {completedBookings.length}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {bookings.map((booking) => renderBookingCard(booking))}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="space-y-6">
              {pendingBookings.length === 0 ? (
                <Card className="max-w-md mx-auto">
                  <CardContent className="pt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400">No pending bookings</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {pendingBookings.map((booking) => renderBookingCard(booking))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="accepted" className="space-y-6">
              {acceptedBookings.length === 0 ? (
                <Card className="max-w-md mx-auto">
                  <CardContent className="pt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400">No accepted bookings</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {acceptedBookings.map((booking) => renderBookingCard(booking))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="space-y-6">
              {completedBookings.length === 0 ? (
                <Card className="max-w-md mx-auto">
                  <CardContent className="pt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-400">No completed bookings</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {completedBookings.map((booking) => renderBookingCard(booking))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/branches")}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-medium transition-all inline-flex items-center gap-2"
          >
            ← Explore More Careers
          </button>
        </div>
      </div>
    </div>
  );
}