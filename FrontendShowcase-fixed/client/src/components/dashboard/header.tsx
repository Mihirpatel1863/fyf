import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Search, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const notifications = [
    { id: 1, title: "New workspace created", message: "Johnson vs Partners case has been created", time: "2 min ago", unread: true },
    { id: 2, title: "Team member invited", message: "Sarah Johnson has been added to your team", time: "1 hour ago", unread: true },
    { id: 3, title: "Payment processed", message: "Your monthly subscription has been renewed", time: "2 hours ago", unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 relative z-50"
    >
      <div className="flex items-center justify-between">
        <div>
          <motion.h2 
            className="text-2xl font-bold gradient-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Dashboard Overview
          </motion.h2>
          <motion.p 
            className="text-sm text-gray-500 mt-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Manage your legal workspaces and cases
          </motion.p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Enhanced Search */}
          <motion.div 
            className={`relative transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors duration-200 ${
              searchFocused ? 'text-teal-500' : 'text-gray-400'
            }`} />
            <Input
              placeholder="Search workspaces, clients..."
              className={`pl-10 w-80 transition-all duration-300 border-2 ${
                searchFocused 
                  ? 'border-teal-500 shadow-lg shadow-teal-500/20' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </motion.div>

          {/* Notifications */}
          <div className="relative">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className={`relative hover:bg-teal-50 hover:text-teal-600 transition-all duration-200 ${
                  unreadCount > 0 ? 'notification-badge' : ''
                }`}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 px-1 min-w-[1.25rem] h-5 text-xs bg-red-500 hover:bg-red-600 pulse-glow">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </motion.div>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-80 glass-effect rounded-xl premium-shadow border border-white/20"
                  style={{ zIndex: 1000 }}
                >
                  <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-2xl">
                    <CardContent className="p-0">
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">Notifications</h3>
                          <Button variant="ghost" size="sm" className="text-teal-600 hover:text-teal-700 hover:bg-teal-50">
                            Mark all read
                          </Button>
                        </div>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notification, index) => (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-4 border-b border-gray-100 hover:bg-teal-50/50 transition-all duration-200 cursor-pointer hover-lift ${
                              notification.unread ? 'bg-teal-50/30' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                notification.unread ? 'bg-teal-500 pulse-glow' : 'bg-gray-300'
                              }`}></div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                                <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                                <p className="text-gray-400 text-xs mt-2">{notification.time}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* User Menu */}
          <div className="relative">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                variant="ghost"
                className="flex items-center space-x-2 hover:bg-teal-50 hover:text-teal-600 transition-all duration-200 premium-shadow hover-lift"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-gradient-to-br from-teal-500 to-teal-600 text-white text-sm font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700">John Doe</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </motion.div>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 glass-effect rounded-xl premium-shadow border border-white/20"
                  style={{ zIndex: 1000 }}
                >
                  <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-2xl">
                    <CardContent className="p-0">
                      <div className="p-4 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-gradient-to-br from-teal-500 to-teal-600 text-white font-semibold">
                              JD
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-gray-900">John Doe</h4>
                            <p className="text-sm text-gray-500">john@example.com</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <motion.button
                          whileHover={{ backgroundColor: '#f0fdfa', x: 4 }}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg text-gray-700 hover:text-teal-600 transition-all duration-200"
                        >
                          <User className="w-4 h-4" />
                          <span>Profile</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ backgroundColor: '#f0fdfa', x: 4 }}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg text-gray-700 hover:text-teal-600 transition-all duration-200"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </motion.button>
                        <div className="border-t border-gray-100 my-2"></div>
                        <motion.button
                          whileHover={{ backgroundColor: '#fef2f2', x: 4 }}
                          className="w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg text-gray-700 hover:text-red-600 transition-all duration-200"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign out</span>
                        </motion.button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
