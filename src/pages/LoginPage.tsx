import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Mail, Lock, User, GraduationCap, Target, LogIn, Briefcase } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useMentors } from "@/contexts/MentorsContext";
import { getAllSubDomains } from "@/data/careerData";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { Checkbox } from "@/app/components/ui/checkbox";

// Mock users for authentication
const MOCK_USERS = {
  student: {
    email: "student@demo.com",
    password: "student123",
    name: "Alex Student",
    role: "student" as const,
    educationLevel: "college",
    stream: "science",
    careerGoals: "Software Engineer"
  },
  mentor: {
    email: "mentor@demo.com",
    password: "mentor123",
    name: "Dr. Sarah Mentor",
    role: "mentor" as const,
    expertise: "Software Engineering",
    experience: "15 years"
  }
};

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<"student" | "mentor">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [stream, setStream] = useState("");
  const [careerGoals, setCareerGoals] = useState("");
  const [mentorExpertise, setMentorExpertise] = useState("");
  const [mentorBio, setMentorBio] = useState("");
  const [mentorSubDomainIds, setMentorSubDomainIds] = useState<string[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();

  const allSubDomains = getAllSubDomains();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (isLogin) {
      // Validate login credentials
      const mockUser = MOCK_USERS[role];
      
      if (email === mockUser.email && password === mockUser.password) {
        // Successful login for mentor - set default sub-domains
        const loginData: any = {
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role,
        };

        if (role === "student") {
          loginData.educationLevel = mockUser.educationLevel;
          loginData.stream = mockUser.stream;
          loginData.careerGoals = mockUser.careerGoals;
        } else if (role === "mentor") {
          // Default sub-domains for demo mentor
          loginData.mentorSubDomainIds = ["cse", "software-eng", "data-science"];
          loginData.mentorExpertise = "Software Engineering & Data Science";
          loginData.mentorBio = "15+ years of experience in software development and mentoring";
        }

        login(loginData);
        navigate("/dashboard");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } else {
      // Registration
      if (role === "mentor" && mentorSubDomainIds.length === 0) {
        setError("Please select at least one career domain you can mentor in.");
        return;
      }

      const registrationData: any = {
        name,
        email,
        role,
      };

      if (role === "student") {
        registrationData.educationLevel = educationLevel;
        registrationData.stream = stream;
        registrationData.careerGoals = careerGoals;
      } else if (role === "mentor") {
        registrationData.mentorSubDomainIds = mentorSubDomainIds;
        registrationData.mentorExpertise = mentorExpertise;
        registrationData.mentorBio = mentorBio;
      }

      login(registrationData);
      navigate("/branches");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-6 py-12">
      <motion.div
        className="w-full max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isLogin ? "Welcome Back!" : "Join Career Compass"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {isLogin ? "Sign in to continue your journey" : "Start your career journey today"}
            </p>
          </div>

          {/* Demo Credentials Info for Login */}
          {isLogin && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">Demo Credentials:</p>
              <div className="text-xs text-blue-800 dark:text-blue-300 space-y-1">
                <p><strong>Student:</strong> student@demo.com / student123</p>
                <p><strong>Mentor:</strong> mentor@demo.com / mentor123</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <Label className="text-gray-700 dark:text-gray-300 mb-3 block">I am a:</Label>
              <RadioGroup value={role} onValueChange={(value: any) => setRole(value)} className="flex gap-4">
                <div className="flex items-center space-x-2 flex-1">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="cursor-pointer">Student</Label>
                </div>
                <div className="flex items-center space-x-2 flex-1">
                  <RadioGroupItem value="mentor" id="mentor" />
                  <Label htmlFor="mentor" className="cursor-pointer">Mentor</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Name (Registration only) */}
            {!isLogin && (
              <div>
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 mb-2 block">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </div>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 mb-2 block">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 mb-2 block">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </div>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Registration Additional Fields */}
            {!isLogin && role === "student" && (
              <>
                <div>
                  <Label htmlFor="education" className="text-gray-700 dark:text-gray-300 mb-2 block">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Education Level
                    </div>
                  </Label>
                  <Select value={educationLevel} onValueChange={setEducationLevel} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="school">School</SelectItem>
                      <SelectItem value="college">College</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                      <SelectItem value="postgraduate">Post-Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="stream" className="text-gray-700 dark:text-gray-300 mb-2 block">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" />
                      Stream
                    </div>
                  </Label>
                  <Select value={stream} onValueChange={setStream}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your stream" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="commerce">Commerce</SelectItem>
                      <SelectItem value="arts">Arts</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="goals" className="text-gray-700 dark:text-gray-300 mb-2 block">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Career Goals (Optional)
                    </div>
                  </Label>
                  <Input
                    id="goals"
                    type="text"
                    placeholder="What do you want to achieve?"
                    value={careerGoals}
                    onChange={(e) => setCareerGoals(e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Mentor Registration Fields */}
            {!isLogin && role === "mentor" && (
              <>
                <div>
                  <Label htmlFor="expertise" className="text-gray-700 dark:text-gray-300 mb-2 block">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      Expertise / Area of Specialization
                    </div>
                  </Label>
                  <Input
                    id="expertise"
                    type="text"
                    placeholder="e.g., Software Engineering, Data Science"
                    value={mentorExpertise}
                    onChange={(e) => setMentorExpertise(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="bio" className="text-gray-700 dark:text-gray-300 mb-2 block">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Bio / Professional Summary
                    </div>
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about your experience and what you can help students with..."
                    value={mentorBio}
                    onChange={(e) => setMentorBio(e.target.value)}
                    className="min-h-[80px]"
                    required
                  />
                </div>

                <div>
                  <Label className="text-gray-700 dark:text-gray-300 mb-3 block">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Select Career Domains You Can Mentor In
                    </div>
                  </Label>
                  <div className="max-h-64 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-4 space-y-3">
                    {allSubDomains.map((subDomain) => (
                      <div key={subDomain.id} className="flex items-start space-x-3">
                        <Checkbox
                          id={subDomain.id}
                          checked={mentorSubDomainIds.includes(subDomain.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setMentorSubDomainIds([...mentorSubDomainIds, subDomain.id]);
                            } else {
                              setMentorSubDomainIds(mentorSubDomainIds.filter((id) => id !== subDomain.id));
                            }
                          }}
                        />
                        <Label
                          htmlFor={subDomain.id}
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
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Select at least one domain where you can provide mentorship
                  </p>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              {isLogin ? "Sign In" : "Create Account"}
            </button>

            {/* Toggle Login/Register */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
              </button>
            </div>
          </form>

          {/* Social Login (Optional) */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button className="py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}