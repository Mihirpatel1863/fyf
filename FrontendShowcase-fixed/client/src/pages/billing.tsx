import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, Calendar } from "lucide-react";

export default function BillingPlans() {
  const currentPlan = {
    name: "Professional Plan",
    price: "$99/month",
    features: ["Unlimited Workspaces", "Team Collaboration", "Advanced Analytics", "Priority Support"],
    status: "Active"
  };

  const invoices = [
    { id: 1, date: "2025-01-01", amount: "$99.00", status: "Paid" },
    { id: 2, date: "2024-12-01", amount: "$99.00", status: "Paid" },
    { id: 3, date: "2024-11-01", amount: "$99.00", status: "Paid" }
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
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Billing & Plans</h1>
              <p className="text-gray-600">Manage your subscription and billing information.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Current Plan */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{currentPlan.name}</h4>
                        <p className="text-2xl font-bold text-teal-600">{currentPlan.price}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {currentPlan.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      {currentPlan.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-teal-500 rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4 space-y-2">
                      <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                        Upgrade Plan
                      </Button>
                      <Button variant="outline" className="w-full">
                        Change Plan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Payment Method</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                      <CreditCard className="w-8 h-8 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900">•••• •••• •••• 4242</div>
                        <div className="text-sm text-gray-500">Expires 12/2027</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full">
                        Update Payment Method
                      </Button>
                      <Button variant="outline" className="w-full">
                        Add Payment Method
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Billing History */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Invoice</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.map((invoice, index) => (
                        <motion.tr
                          key={invoice.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">#{invoice.id.toString().padStart(4, '0')}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-gray-900">{invoice.date}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-medium text-gray-900">{invoice.amount}</div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge className="bg-green-100 text-green-800">
                              {invoice.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4">
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download
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