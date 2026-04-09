import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { Star, Briefcase, DollarSign, Clock, Calendar, CheckCircle2 } from "lucide-react";
import { Mentor } from "@/data/mentorData";
import { getSubDomainById } from "@/data/careerData";
import { useUser } from "@/contexts/UserContext";
import { useMentors } from "@/contexts/MentorsContext";
import { sendBookingConfirmationEmails } from "@/services/emailService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Label } from "@/app/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/components/ui/dialog";
import { toast } from "sonner";

export function MentorsPage() {
  const { branchId, domainId, subDomainId } = useParams();
  const navigate = useNavigate();
  const { addBooking, isLoggedIn, user } = useUser();
  const { getMentorsBySubDomain } = useMentors();
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (!branchId || !domainId || !subDomainId) {
      navigate("/branches");
    }
  }, [branchId, domainId, subDomainId, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  if (!branchId || !domainId || !subDomainId) {
    return null;
  }

  const subDomain = getSubDomainById(branchId, domainId, subDomainId);
  const mentors = getMentorsBySubDomain(subDomainId);

  useEffect(() => {
    if (!subDomain) {
      navigate("/branches");
    }
  }, [subDomain, navigate]);

  if (!subDomain) {
    return null;
  }

  const handleBookMentor = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setSelectedSlot("");
    setIsBookingDialogOpen(true);
  };

  const confirmBooking = async () => {
    if (!selectedMentor || !selectedSlot || !user) {
      toast.error("Please select a time slot");
      return;
    }

    // Generate meeting link
    const meetingLink = `https://meet.careercompass.com/${Date.now()}`;
    const bookingDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    const booking = {
      id: `booking-${Date.now()}`,
      mentorName: selectedMentor.name,
      mentorEmail: `${selectedMentor.name.toLowerCase().replace(/\s+/g, ".")}@mentor.com`,
      domain: domainId,
      subDomain: subDomain.name,
      timeSlot: selectedSlot,
      status: "pending" as const,
      meetingLink: meetingLink,
      date: bookingDate,
    };

    addBooking(booking);
    setIsBookingDialogOpen(false);
    
    toast.success("Booking request sent!", {
      description: `Your session request with ${selectedMentor.name} has been sent. You'll be notified once confirmed.`,
    });

    // Send email notifications to both student and mentor
    await sendBookingConfirmationEmails(
      user.email || "student@example.com",
      user.name || "Student",
      booking.mentorEmail,
      selectedMentor.name,
      {
        subDomain: subDomain.name,
        date: bookingDate,
        timeSlot: selectedSlot,
        meetingLink: meetingLink,
      }
    );

    // Navigate to bookings page after a short delay
    setTimeout(() => {
      navigate("/bookings");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Mentor</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Book a session with expert mentors in {subDomain.name}
          </p>
        </motion.div>

        {mentors.length === 0 ? (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>No Mentors Available</CardTitle>
              <CardDescription>
                We're currently onboarding mentors for this career path. Check back soon!
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map((mentor, index) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-all hover:shadow-xl">
                  <CardHeader className="space-y-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={mentor.profileImage}
                        alt={mentor.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-purple-300 dark:border-purple-700"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {mentor.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {mentor.title}
                        </p>
                        <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                          {mentor.company}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {mentor.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <Briefcase className="w-4 h-4" />
                        <span>{mentor.experience} years</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{mentor.sessionsCompleted}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {mentor.bio}
                    </p>

                    <div>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                        Expertise:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {mentor.expertise.slice(0, 3).map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {mentor.expertise.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{mentor.expertise.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            ₹{mentor.sessionPrice}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">/session</span>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleBookMentor(mentor)}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <button
            onClick={() =>
              navigate(`/branches/${branchId}/domains/${domainId}/subdomains/${subDomainId}`)
            }
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-medium transition-all inline-flex items-center gap-2"
          >
            ← Back to Career Details
          </button>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book Session with {selectedMentor?.name}</DialogTitle>
            <DialogDescription>
              Select your preferred time slot. The mentor will confirm the exact time within your
              selected slot.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center gap-3">
              <img
                src={selectedMentor?.profileImage}
                alt={selectedMentor?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {selectedMentor?.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedMentor?.title} at {selectedMentor?.company}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Select Time Slot:</Label>
              <RadioGroup value={selectedSlot} onValueChange={setSelectedSlot}>
                {selectedMentor?.availableSlots.map((slot) => (
                  <div key={slot} className="flex items-center space-x-2">
                    <RadioGroupItem value={slot} id={slot} />
                    <Label
                      htmlFor={slot}
                      className="flex items-center gap-2 cursor-pointer flex-1 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span>{slot}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <p className="text-xs text-blue-700 dark:text-blue-300">
                <strong>Note:</strong> Your booking request will be sent to the mentor. They will
                confirm the exact meeting time within your selected slot via email.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={confirmBooking}
              disabled={!selectedSlot}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}