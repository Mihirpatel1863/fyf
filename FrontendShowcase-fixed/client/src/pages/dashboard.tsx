import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import MetricsCards from "@/components/dashboard/metrics-cards";
import WorkspacesTable from "@/components/dashboard/workspaces-table";
import CreateWorkspaceModal from "@/components/dashboard/create-workspace-modal";

export default function Dashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6"
          >
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Dashboard Overview</h1>
              <p className="text-gray-600">Welcome back! Here's an overview of your legal workspaces.</p>
            </div>
            
            <MetricsCards />
            <WorkspacesTable onCreateWorkspace={() => setIsCreateModalOpen(true)} />
          </motion.div>
        </main>
      </div>

      <CreateWorkspaceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
