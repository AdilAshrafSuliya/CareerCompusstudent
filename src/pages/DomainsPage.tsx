import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, TrendingUp, DollarSign, Briefcase, Star } from "lucide-react";
import { getDomainById } from "@/data/careerData";
import { useUser } from "@/contexts/UserContext";
import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";

export function DomainsPage() {
  const { branchId, domainId } = useParams();
  const navigate = useNavigate();
  const { updateUser, isLoggedIn } = useUser();

  useEffect(() => {
    if (!branchId || !domainId) {
      navigate("/branches");
    }
  }, [branchId, domainId, navigate]);

  if (!branchId || !domainId) {
    return null;
  }

  const domain = getDomainById(branchId, domainId);

  useEffect(() => {
    if (!domain) {
      navigate("/branches");
    }
  }, [domain, navigate]);

  if (!domain) {
    return null;
  }

  const handleSubDomainClick = (subDomainId: string) => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    updateUser({ selectedSubDomain: subDomainId });
    navigate(`/branches/${branchId}/domains/${domainId}/subdomains/${subDomainId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {domain.name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Career Paths</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {domain.description}
          </p>
          <p className="text-sm text-purple-600 dark:text-purple-400 mt-4">
            {domain.subDomains.length} specialized career paths available
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {domain.subDomains.map((subDomain, index) => (
            <motion.div
              key={subDomain.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="cursor-pointer"
              onClick={() => handleSubDomainClick(subDomain.id)}
            >
              <Card className="h-full border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-all hover:shadow-2xl bg-white dark:bg-gray-800">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                      {subDomain.name}
                    </CardTitle>
                    {subDomain.trending && (
                      <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="text-gray-600 dark:text-gray-400 line-clamp-2">
                    {subDomain.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">{subDomain.salary}</span>
                    <span className="text-gray-500 dark:text-gray-400">avg. salary</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">{subDomain.jobGrowth}</span>
                    <span className="text-gray-500 dark:text-gray-400">job growth</span>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Top Companies:</p>
                    <div className="flex flex-wrap gap-1">
                      {subDomain.topCompanies.slice(0, 3).map((company, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {company}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center justify-between text-purple-600 dark:text-purple-400 font-medium group">
                      <span className="text-sm">Explore Career Path</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/branches")}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-medium transition-all inline-flex items-center gap-2"
          >
            ← Back to All Branches
          </button>
        </div>
      </div>
    </div>
  );
}