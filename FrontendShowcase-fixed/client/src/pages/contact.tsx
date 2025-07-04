import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Mail, Phone, MessageCircle, Clock, Users } from "lucide-react";

export default function ContactAdmin() {
  const supportOptions = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email within 24 hours",
      action: "Send Email",
      available: true
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      action: "Start Chat",
      available: true
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us for urgent matters",
      action: "Call Now",
      available: false
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
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Contact Admin</h1>
              <p className="text-gray-600">Get help from our support team or submit a support request.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Support Options */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Support Options</h3>
                {supportOptions.map((option, index) => (
                  <motion.div
                    key={option.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`border-0 shadow-sm ${option.available ? 'hover:shadow-md transition-shadow' : 'opacity-60'}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            option.available ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-gray-400'
                          }`}>
                            <option.icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{option.title}</h4>
                            <p className="text-sm text-gray-500">{option.description}</p>
                          </div>
                          <Button 
                            variant={option.available ? "default" : "outline"}
                            size="sm"
                            disabled={!option.available}
                            className={option.available ? "bg-teal-600 hover:bg-teal-700 text-white" : ""}
                          >
                            {option.action}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Contact Form */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Submit Support Request</h3>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Brief description of your issue" />
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="account">Account Issue</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Describe your issue in detail..." 
                      rows={6}
                    />
                  </div>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                    Submit Request
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Frequently Asked Questions</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-medium text-gray-900 mb-2">How do I create a new workspace?</h4>
                    <p className="text-sm text-gray-600">Click the "Create New Workspace" button on the dashboard and follow the 4-step process to set up your legal case workspace.</p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-medium text-gray-900 mb-2">How do I invite team members?</h4>
                    <p className="text-sm text-gray-600">Go to Team Management and click "Add Member" to send invitations to your colleagues.</p>
                  </div>
                  <div className="border-b border-gray-200 pb-4">
                    <h4 className="font-medium text-gray-900 mb-2">What file formats are supported for uploads?</h4>
                    <p className="text-sm text-gray-600">We support PDF, DOC, DOCX, TXT, and image files (JPG, PNG) up to 10MB each.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">How do I upgrade my plan?</h4>
                    <p className="text-sm text-gray-600">Visit the Billing & Plans section to view available plans and upgrade your subscription.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
}