import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Moon, Sun, Menu, Waves, Brain, Search, Database, Bot, Globe, BookOpen } from 'lucide-react';

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: Waves },
    { name: 'Dashboard', href: '/dashboard', icon: Database },
    { name: 'DNA Search', href: '/dna-search', icon: Search },
    { name: 'Taxonomy', href: '/taxonomy', icon: Brain },
    { name: 'AI Assistant', href: '/ai-assistant', icon: Bot },
    { name: 'Digital Twin', href: '/digital-twin', icon: Globe },
    { name: 'Docs', href: '/docs', icon: BookOpen },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav 
      className="sticky top-0 z-50 w-full bg-blue-50/30 dark:bg-blue-900/20 backdrop-blur-xl border border-blue-200/30 dark:border-blue-400/20 shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo removed */}
          <div className="w-8" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      isActive(item.href)
                        ? 'bg-blue-100/60 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200 shadow-md'
                        : 'text-blue-900 hover:text-blue-800 hover:bg-blue-50/60 dark:text-blue-200 dark:hover:text-white dark:hover:bg-blue-900/30'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="h-9 w-9 px-0 bg-blue-100/20 hover:bg-blue-100/30 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 backdrop-blur-sm transition-all duration-300"
              >
                {isDark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            </motion.div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="sm" className="h-9 w-9 px-0 bg-blue-100/20 hover:bg-blue-100/30 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 backdrop-blur-sm transition-all duration-300">
                    <Menu className="h-4 w-4" />
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col space-y-2 mt-8">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          isActive(item.href)
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200'
                            : 'text-blue-900 hover:text-blue-800 hover:bg-blue-50/60 dark:text-blue-200 dark:hover:text-white dark:hover:bg-blue-900/30'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;