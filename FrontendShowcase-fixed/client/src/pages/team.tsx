import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, MoreVertical, Users } from "lucide-react";

export default function TeamManagement() {
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
      avatar: "JD"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Lawyer",
      status: "Active",
      avatar: "JS"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Paralegal",
      status: "Inactive",
      avatar: "MJ"
    }
  ];

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
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Team Management</h1>
              <p className="text-gray-600">Manage your team members and their access permissions.</p>
            </div>
            
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Member
                  </Button>
                </div>
                
                <div className="flex items-center space-x-4 mt-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search team members..."
                      className="pl-10 w-80"
                    />
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Member</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamMembers.map((member, index) => (
                        <motion.tr
                          key={member.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                                <span className="text-teal-600 font-medium text-sm">{member.avatar}</span>
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{member.name}</div>
                                <div className="text-sm text-gray-500">{member.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant={member.role === 'Admin' ? 'default' : 'secondary'}>
                              {member.role}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${member.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                              <span className="text-sm text-gray-600">{member.status}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
}