import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, TrendingUp, Sparkles } from "lucide-react";
import { careerBranches, getBranchById } from "@/data/careerData";
import { useUser } from "@/contexts/UserContext";

export function BranchesPage() {
  const { branchId } = useParams();
  const navigate = useNavigate();
  const { updateUser } = useUser();
  
  const branch = branchId ? getBranchById(branchId) : null;
  const branches = branch ? [branch] : careerBranches;

  const handleDomainClick = (selectedBranch: string, domainId: string) => {
    updateUser({ selectedBranch, selectedDomain: domainId });
    navigate(`/branches/${selectedBranch}/domains/${domainId}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {branch ? branch.name : "Choose Your"} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">{branch ? "Domains" : "Branch"}</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {branch ? branch.description : "Select the field that interests you most"}
          </p>
        </motion.div>

        {branches.map((b, bIndex) => (
          <div key={b.id} className="mb-16">
            {!branch && (
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{b.name}</h2>
            )}
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {b.domains.map((domain, index) => (
                <motion.div
                  key={domain.id}
                  className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg p-8 border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-all cursor-pointer group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: bIndex * 0.1 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  onClick={() => handleDomainClick(b.id, domain.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{domain.name}</h3>
                    <ArrowRight className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:translate-x-2 transition-transform" />
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{domain.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                      {domain.subDomains.length} Career Paths
                    </span>
                    <div className="flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full text-xs font-medium text-purple-700 dark:text-purple-300">
                      <Sparkles className="w-3 h-3" />
                      Explore
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {!branch && (
          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/branches")}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium transition-all inline-flex items-center gap-2"
            >
              View All Branches
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}