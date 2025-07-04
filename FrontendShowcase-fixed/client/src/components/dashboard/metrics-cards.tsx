import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Layers, FileText, CheckCircle, Languages } from "lucide-react";

const iconMap = {
  workspaces: Layers,
  contracts: FileText,
  projects: CheckCircle,
  translations: Languages,
};

const colorMap = {
  workspaces: "bg-blue-50 text-blue-600",
  contracts: "bg-purple-50 text-purple-600",
  projects: "bg-orange-50 text-orange-600",
  translations: "bg-green-50 text-green-600",
};

interface DashboardMetrics {
  totalWorkspaces: number;
  totalSignedContracts: number;
  completedProjects: number;
  completedTranslations: number;
}

export default function MetricsCards() {
  const { data: metrics, isLoading } = useQuery<DashboardMetrics>({
    queryKey: ["/api/dashboard/metrics"],
  });

  const cards = [
    {
      title: "Total Workspaces",
      value: metrics?.totalWorkspaces || 0,
      change: "+2 from last month",
      type: "workspaces" as const,
    },
    {
      title: "Total Signed Contracts",
      value: metrics?.totalSignedContracts || 0,
      change: "+5 from last month",
      type: "contracts" as const,
    },
    {
      title: "Completed Projects",
      value: metrics?.completedProjects || 0,
      change: "+1 from last month",
      type: "projects" as const,
    },
    {
      title: "Completed Translations",
      value: metrics?.completedTranslations || 0,
      change: "+3 from last month",
      type: "translations" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = iconMap[card.type];
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="transform transition-all duration-200"
          >
            <Card className="hover:shadow-2xl transition-all duration-300 hover-lift premium-shadow border-0 bg-gradient-to-br from-white to-gray-50/50 group">
              <CardContent className="p-6 relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-teal-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <motion.p 
                      className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors duration-200"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {card.title}
                    </motion.p>
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                    >
                      <p className="text-3xl font-bold gradient-text mt-2">
                        {isLoading ? (
                          <div className="w-16 h-8 shimmer rounded" />
                        ) : (
                          <motion.span
                            key={card.value}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            {card.value}
                          </motion.span>
                        )}
                      </p>
                    </motion.div>
                    <motion.p 
                      className="text-xs text-green-600 mt-1 flex items-center space-x-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <span className="w-1 h-1 bg-green-500 rounded-full pulse-glow"></span>
                      <span>{card.change}</span>
                    </motion.p>
                  </div>
                  <motion.div 
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorMap[card.type]} group-hover:scale-110 transition-all duration-300 shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.div>
                </div>

                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
