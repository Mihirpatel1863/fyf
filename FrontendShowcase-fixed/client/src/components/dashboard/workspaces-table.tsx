import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MoreVertical, FolderOpen, Grid, List, Filter, Calendar, FileText, Scale } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { Workspace } from "@shared/schema";

interface WorkspacesTableProps {
  onCreateWorkspace: () => void;
}

export default function WorkspacesTable({ onCreateWorkspace }: WorkspacesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("contents");
  const [viewMode, setViewMode] = useState("grid");

  const { data: workspaces, isLoading } = useQuery<Workspace[]>({
    queryKey: ["/api/workspaces"],
  });

  const filteredWorkspaces = workspaces?.filter(workspace => {
    const matchesSearch = workspace.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workspace.client?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || workspace.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4 bg-gradient-to-r from-white to-gray-50/50">
          <div className="flex items-center justify-between">
            <motion.h3 
              className="text-lg font-semibold gradient-text"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Workspaces
            </motion.h3>
            <div className="flex items-center space-x-3">
              {/* Premium Tab Switcher */}
              <motion.div 
                className="flex bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-1 shadow-inner"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.button
                  onClick={() => setActiveTab("contents")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === "contents"
                      ? "bg-white text-teal-600 shadow-lg premium-shadow"
                      : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FileText className="w-4 h-4" />
                  <span>Contents</span>
                </motion.button>
                <motion.button
                  onClick={() => setActiveTab("litigation")}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === "litigation"
                      ? "bg-white text-teal-600 shadow-lg premium-shadow"
                      : "text-gray-600 hover:text-gray-800 hover:bg-white/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Scale className="w-4 h-4" />
                  <span>Litigation</span>
                </motion.button>
              </motion.div>

              {/* View Mode Toggle */}
              <motion.div 
                className="flex bg-gray-100 rounded-lg p-1"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded text-xs transition-all duration-200 ${
                    viewMode === "grid" ? "bg-white text-teal-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Grid className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded text-xs transition-all duration-200 ${
                    viewMode === "list" ? "bg-white text-teal-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <List className="w-4 h-4" />
                </motion.button>
              </motion.div>

              {/* Create Button with Premium Effects */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={onCreateWorkspace}
                  className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 premium-shadow hover-lift"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Workspace
                </Button>
              </motion.div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by Workspace Name / Client Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <Select value="all">
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Pages" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pages</SelectItem>
                  <SelectItem value="1">Page 1</SelectItem>
                  <SelectItem value="2">Page 2</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Workspace Name
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Client
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Opponent
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Case
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Area of Law
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Timeline
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse"></div>
                      </div>
                    </td>
                  </tr>
                ) : filteredWorkspaces && filteredWorkspaces.length > 0 ? (
                  filteredWorkspaces.map((workspace, index) => (
                    <motion.tr
                      key={workspace.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-900">
                          {workspace.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          Created {formatDate(workspace.createdAt!)}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-gray-900">{workspace.client}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-gray-900">{workspace.opponent}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-gray-900">{workspace.caseType}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-gray-900">{workspace.areaOfLaw}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">
                            {workspace.timeline}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <FolderOpen className="w-12 h-12 text-gray-300" />
                        <div className="text-gray-500">
                          <p className="font-medium">
                            {searchTerm ? "No workspaces found" : "Upgrade to add more litigation"}
                          </p>
                          <p className="text-sm">
                            {searchTerm ? "Try adjusting your search terms" : "cases to this workspace"}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
