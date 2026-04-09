import { motion } from "motion/react";
import { Sparkles, TrendingUp, Users, BookOpen, Award, ArrowRight, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { careerBranches, trendingDomains } from "@/data/careerData";

const trendingData = [
  { name: "AI/ML", value: 92 },
  { name: "Data Science", value: 88 },
  { name: "Cloud", value: 85 },
  { name: "Cybersecurity", value: 82 },
  { name: "Full Stack", value: 90 },
  { name: "UI/UX", value: 86 },
  { name: "Digital Marketing", value: 78 },
  { name: "CA", value: 80 },
  { name: "MBA", value: 84 },
  { name: "Pharma", value: 76 },
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered Career Guidance</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Find Your Perfect <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                  Career Path
                </span>
              </h1>

              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                Get personalized career recommendations, connect with expert mentors, and receive
                AI-powered assessments to guide your journey to success.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate("/login")}
                  className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 bg-white dark:bg-gray-800 border-2 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 rounded-xl font-medium hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                  Learn More
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <FeatureCard
                  icon={Users}
                  title="1,200+"
                  subtitle="Expert Mentors"
                  color="purple"
                />
                <FeatureCard
                  icon={BookOpen}
                  title="500+"
                  subtitle="Career Paths"
                  color="blue"
                />
                <FeatureCard
                  icon={Award}
                  title="50k+"
                  subtitle="Success Stories"
                  color="green"
                />
                <FeatureCard
                  icon={BarChart3}
                  title="98%"
                  subtitle="Accuracy Rate"
                  color="orange"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Services</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Everything you need to build your dream career
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={Sparkles}
              title="AI Career Assessment"
              description="Get personalized career recommendations based on your skills, interests, and goals"
              delay={0}
            />
            <ServiceCard
              icon={Users}
              title="Mentor Sessions"
              description="Connect one-on-one with industry experts and get guidance from experienced professionals"
              delay={0.1}
            />
            <ServiceCard
              icon={Award}
              title="Report Card Generation"
              description="Receive detailed analysis of your strengths, weaknesses, and skill compatibility"
              delay={0.2}
            />
            <ServiceCard
              icon={BookOpen}
              title="Learning Resources"
              description="Access curated free and paid courses to build skills for your chosen career"
              delay={0.3}
            />
            <ServiceCard
              icon={BarChart3}
              title="Industry Insights"
              description="Stay updated with latest trends, salary ranges, and job market demand"
              delay={0.4}
            />
            <ServiceCard
              icon={TrendingUp}
              title="Career Roadmap"
              description="Get step-by-step guidance on how to achieve your career goals"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Trending Domains Graph */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Top 10 Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Domains</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              High-demand career paths in 2026
            </p>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={trendingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    borderRadius: "12px",
                    color: "#F9FAFB",
                  }}
                />
                <Bar dataKey="value" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9333EA" stopOpacity={1} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={1} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </section>

      {/* Top 3 Branches */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Branches</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Choose your field of interest
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {careerBranches.map((branch, index) => (
              <BranchCard
                key={branch.id}
                branch={branch}
                delay={index * 0.1}
                onClick={() => navigate(`/branches/${branch.id}`)}
              />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium transition-all flex items-center gap-2 mx-auto"
            >
              Navigate All Domains
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: any;
  title: string;
  subtitle: string;
  color: string;
}

function FeatureCard({ icon: Icon, title, subtitle, color }: FeatureCardProps) {
  const colors = {
    purple: "from-purple-500 to-purple-600",
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600",
  }[color];

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`w-12 h-12 bg-gradient-to-br ${colors} rounded-xl flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
    </motion.div>
  );
}

interface ServiceCardProps {
  icon: any;
  title: string;
  description: string;
  delay: number;
}

function ServiceCard({ icon: Icon, title, description, delay }: ServiceCardProps) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
    >
      <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  );
}

interface BranchCardProps {
  branch: any;
  delay: number;
  onClick: () => void;
}

function BranchCard({ branch, delay, onClick }: BranchCardProps) {
  return (
    <motion.div
      className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg p-8 border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-all cursor-pointer group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -8 }}
      onClick={onClick}
    >
      {branch.trending && (
        <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-medium mb-4">
          <TrendingUp className="w-3 h-3" />
          Trending
        </div>
      )}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{branch.name}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">{branch.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
          {branch.domains.length} Domains
        </span>
        <ArrowRight className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:translate-x-2 transition-transform" />
      </div>
    </motion.div>
  );
}