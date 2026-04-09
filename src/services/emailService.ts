import { toast } from "sonner";

export interface EmailNotification {
  to: string;
  subject: string;
  body: string;
  type: "booking_confirmation" | "booking_request" | "booking_accepted" | "booking_reminder";
}

// Simulate email sending with toast notifications
export const sendEmail = (notification: EmailNotification): Promise<void> => {
  return new Promise((resolve) => {
    // Simulate email sending delay
    setTimeout(() => {
      console.log("📧 Email Sent:", notification);
      
      // Show a toast notification to simulate email sent
      toast.success("Email Notification Sent", {
        description: `Email sent to ${notification.to}: ${notification.subject}`,
        duration: 4000,
      });
      
      resolve();
    }, 500);
  });
};

// Helper function to send booking confirmation emails
export const sendBookingConfirmationEmails = async (
  studentEmail: string,
  studentName: string,
  mentorEmail: string,
  mentorName: string,
  bookingDetails: {
    subDomain: string;
    date: string;
    timeSlot: string;
    meetingLink?: string;
  }
) => {
  // Email to student
  const studentEmail_notification: EmailNotification = {
    to: studentEmail,
    subject: "Booking Confirmation - Career Compass",
    body: `Hi ${studentName},\n\nYour mentorship session has been confirmed!\n\nMentor: ${mentorName}\nTopic: ${bookingDetails.subDomain}\nDate: ${new Date(bookingDetails.date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}\nTime: ${bookingDetails.timeSlot}\n${
      bookingDetails.meetingLink ? `Meeting Link: ${bookingDetails.meetingLink}\n` : ""
    }\nWe're excited for your session!\n\nBest regards,\nCareer Compass Team`,
    type: "booking_confirmation",
  };

  // Email to mentor
  const mentorEmail_notification: EmailNotification = {
    to: mentorEmail,
    subject: "New Booking Request - Career Compass",
    body: `Hi ${mentorName},\n\nYou have a new booking request!\n\nStudent: ${studentName}\nTopic: ${bookingDetails.subDomain}\nDate: ${new Date(bookingDetails.date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}\nTime: ${bookingDetails.timeSlot}\n\nPlease log in to your dashboard to accept or decline this request.\n\nBest regards,\nCareer Compass Team`,
    type: "booking_request",
  };

  // Send both emails
  await Promise.all([
    sendEmail(studentEmail_notification),
    sendEmail(mentorEmail_notification),
  ]);
};

// Helper function to send booking accepted emails
export const sendBookingAcceptedEmails = async (
  studentEmail: string,
  studentName: string,
  mentorName: string,
  bookingDetails: {
    subDomain: string;
    date: string;
    timeSlot: string;
    meetingLink: string;
  }
) => {
  const notification: EmailNotification = {
    to: studentEmail,
    subject: "Booking Accepted - Career Compass",
    body: `Hi ${studentName},\n\nGreat news! ${mentorName} has accepted your booking request.\n\nTopic: ${bookingDetails.subDomain}\nDate: ${new Date(bookingDetails.date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}\nTime: ${bookingDetails.timeSlot}\nMeeting Link: ${bookingDetails.meetingLink}\n\nSee you in the session!\n\nBest regards,\nCareer Compass Team`,
    type: "booking_accepted",
  };

  await sendEmail(notification);
};
