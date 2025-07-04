import { motion } from "framer-motion";
import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Bell, Shield, Globe } from "lucide-react";

export default function Settings() {
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
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Settings</h1>
              <p className="text-gray-600">Manage your account settings and preferences.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {/* Profile Settings */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Profile Settings</h3>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" placeholder="Tell us about yourself..." rows={3} />
                  </div>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    Save Profile
                  </Button>
                </CardContent>
              </Card>

              {/* Notification Settings */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive email notifications for workspace updates</p>
                    </div>
                    <Switch id="emailNotifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pushNotifications">Push Notifications</Label>
                      <p className="text-sm text-gray-500">Receive push notifications in your browser</p>
                    </div>
                    <Switch id="pushNotifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weeklyDigest">Weekly Digest</Label>
                      <p className="text-sm text-gray-500">Get a weekly summary of your workspace activity</p>
                    </div>
                    <Switch id="weeklyDigest" />
                  </div>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" placeholder="Enter current password" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" placeholder="Enter new password" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Switch id="twoFactor" />
                  </div>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    Update Password
                  </Button>
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="est">Eastern Time</SelectItem>
                        <SelectItem value="pst">Pacific Time</SelectItem>
                        <SelectItem value="cet">Central European Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}