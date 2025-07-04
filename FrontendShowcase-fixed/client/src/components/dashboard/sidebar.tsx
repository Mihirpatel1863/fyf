import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "wouter";
import { 
  Layers, 
  Users, 
  CreditCard, 
  Settings, 
  Shield,
  User
} from "lucide-react";

const navigationItems = [
  { name: "Workspaces", icon: Layers, href: "/" },
  { name: "Team Management", icon: Users, href: "/team" },
  { name: "Billing & Plans", icon: CreditCard, href: "/billing" },
  { name: "Settings", icon: Settings, href: "/settings" },
  { name: "Contact Admin", icon: Shield, href: "/contact" },
];

export default function Sidebar() {
  const [location] = useLocation();
  
  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-64 sidebar-bg text-white flex-shrink-0 flex flex-col relative overflow-hidden"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600/10 via-transparent to-teal-800/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.05)_0%,transparent_70%)]"></div>
      
      {/* Logo */}
      <div className="p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex items-center space-x-3"
        >
          <motion.div 
            className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span className="text-white font-bold text-lg">L</span>
          </motion.div>
          <h1 className="text-2xl font-bold gradient-text bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            LexI AI
          </h1>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="mt-8 flex-1 relative z-10">
        <div className="px-6 py-2">
          <motion.div 
            className="text-xs font-semibold text-white/60 uppercase tracking-wide mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Menu
          </motion.div>
          <ul className="space-y-2">
            {navigationItems.map((item, index) => {
              const isActive = location === item.href;
              return (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index + 0.5 }}
                >
                  <Link href={item.href}>
                    <motion.div
                      className={cn(
                        "flex items-center px-4 py-3 rounded-xl transition-all duration-300 group cursor-pointer relative overflow-hidden",
                        isActive
                          ? "bg-white/20 backdrop-blur-sm text-white shadow-lg premium-shadow"
                          : "text-white/70 hover:bg-white/10 hover:text-white hover:backdrop-blur-sm"
                      )}
                      whileHover={{ 
                        x: 4,
                        transition: { type: "spring", stiffness: 300 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full"
                          layoutId="activeIndicator"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      
                      {/* Icon with animation */}
                      <motion.div
                        className="relative"
                        whileHover={{ 
                          scale: 1.1,
                          transition: { type: "spring", stiffness: 400 }
                        }}
                      >
                        <item.icon className="w-5 h-5 mr-4" />
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 bg-white/20 rounded-lg blur-sm"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                      </motion.div>
                      
                      <span className="font-medium">{item.name}</span>
                      
                      {/* Hover effect overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl"
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* User Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="p-4 border-t border-white/10 relative z-10"
      >
        <motion.div 
          className="flex items-center space-x-3 text-sm p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 cursor-pointer group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div 
            className="w-10 h-10 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <User className="w-5 h-5 text-white" />
          </motion.div>
          <div className="flex-1">
            <motion.div 
              className="font-medium text-white group-hover:text-white transition-colors"
              initial={{ opacity: 0.9 }}
              whileHover={{ opacity: 1 }}
            >
              John Doe
            </motion.div>
            <motion.div 
              className="text-white/60 text-xs group-hover:text-white/80 transition-colors"
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
            >
              Admin
            </motion.div>
          </div>
          <motion.div
            className="w-2 h-2 bg-green-400 rounded-full pulse-glow"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
