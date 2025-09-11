import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight, Database, Search, Bot, Globe, Users, TrendingUp, Shield, Waves } from 'lucide-react';

const HomePage = () => {
  const waveRef = useRef(null);

  useEffect(() => {
    // Simple wave animation
    const wave = waveRef.current;
    if (wave) {
      let start = 0;
      const animate = () => {
        start += 0.01;
        wave.style.transform = `translateX(${Math.sin(start) * 10}px)`;
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, []);

  const features = [
    {
      icon: Database,
      title: 'Unified Data Platform',
      description: 'Comprehensive oceanographic, fisheries, and biodiversity data in one place.',
      link: '/dashboard',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      icon: Search,
      title: 'DNA/eDNA Analysis',
      description: 'Advanced molecular biodiversity insights with species identification.',
      link: '/dna-search',
      image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      icon: Bot,
      title: 'AI Assistant',
      description: 'Intelligent chatbot for natural language queries and insights.',
      link: '/ai-assistant',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      icon: Globe,
      title: 'Marine Digital Twin',
      description: '3D simulation for ocean changes and future scenario modeling.',
      link: '/digital-twin',
      image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  const stats = [
    { value: '50M+', label: 'Data Points' },
    { value: '1000+', label: 'Species Tracked' },
    { value: '99.5%', label: 'Accuracy' },
    { value: '24/7', label: 'Monitoring' }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      {/* Spline 3D Background */}
      <div className="fixed inset-0 z-0" style={{ pointerEvents: 'none' }}>
        <spline-viewer 
          url="https://prod.spline.design/nWSlLtgjG3aDxL-P/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        ></spline-viewer>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 bg-white/10 dark:bg-black/20 backdrop-blur-sm">
        {/* Hero Section */}
        <section className="relative overflow-hidden -mt-16 pt-20">
        {/* Animated Wave Background */}
        <div 
          ref={waveRef}
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%236366f1' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="container mx-auto px-4 py-8 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto min-h-[80vh]">
            {/* Left Content */}
            <motion.div 
              className="text-left space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="flex justify-start mb-8"
                variants={itemVariants}
              >
                <div className="flex items-center space-x-2 bg-blue-600/20 dark:bg-blue-500/20 px-4 py-2 rounded-full backdrop-blur-md border border-blue-400/30">
                  <Waves className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-300">SIH 2025 Project</span>
                </div>
              </motion.div>
              
              <motion.h1 
                className="text-5xl lg:text-7xl font-bold text-blue-400 leading-tight"
                variants={itemVariants}
              >
                India's First AI-Driven Marine Knowledge Platform
              </motion.h1>
              
              <motion.p 
                className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-xl"
                variants={itemVariants}
              >
                Unifying ocean, fisheries, and biodiversity data for sustainable marine ecosystem management and research.
              </motion.p>
              
              <motion.div 
                className="flex gap-4 items-center"
                variants={itemVariants}
              >
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-medium">
                    <Link to="/dashboard">
                      Explore Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
                
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button asChild variant="ghost" size="lg" className="text-white hover:bg-white/10 px-6 py-3">
                    <Link to="/dna-search">
                      DNA Search <Search className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
                
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Button asChild variant="ghost" size="lg" className="text-white hover:bg-white/10 px-6 py-3">
                    <Link to="/ai-assistant">
                      AI Copilot <Bot className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="grid grid-cols-4 gap-8 pt-8"
                variants={itemVariants}
              >
                {stats.map((stat, index) => (
                  <motion.div 
                    key={index} 
                    className="text-left"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-2xl lg:text-3xl font-bold text-blue-400 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Diver Animation */}
            <motion.div 
              className="flex justify-center lg:justify-end items-center"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="w-full max-w-lg lg:max-w-xl relative">
                <dotlottie-wc 
                  src="https://lottie.host/329f99fa-9626-4868-aae8-206fb67f7a7f/9E2ZCWV9ib.lottie" 
                  style={{ width: '100%', height: '500px' }}
                  speed="1" 
                  autoplay 
                  loop
                  className="drop-shadow-2xl"
                ></dotlottie-wc>
              </div>
            </motion.div>
          </div>
        </div>
        </section>

        {/* Features Section */}
        <section className="py-20 lg:py-32 bg-white/5 dark:bg-black/10 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-16 p-8 bg-white/80 dark:bg-gray-800/80 rounded-2xl backdrop-blur-md shadow-xl border border-white/20 dark:border-gray-700/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Comprehensive Marine Intelligence Suite
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Advanced tools and insights for researchers, policymakers, and marine stakeholders.
              </p>
            </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateX: 5,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="perspective-1000"
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 border border-white/20 dark:border-gray-700/20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl h-full shadow-lg">
                    <CardContent className="p-6 h-full flex flex-col">
                      <motion.div 
                        className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-600 rounded-lg mb-4 shadow-md"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 5,
                          boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                        {feature.description}
                      </p>
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Button asChild variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                          <Link to={feature.link}>
                            Learn more <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>


        {/* Impact Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600/90 to-teal-600/90 backdrop-blur-md">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white bg-black/10 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
            <motion.h2 
              className="text-3xl lg:text-4xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Driving Sustainable Marine Future
            </motion.h2>
            
            <motion.div 
              className="grid md:grid-cols-3 gap-8 mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Users className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-xl font-semibold mb-2">For Researchers</h3>
                <p className="opacity-90">Advanced data analytics and biodiversity insights for cutting-edge marine research.</p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-xl font-semibold mb-2">For Policymakers</h3>
                <p className="opacity-90">Evidence-based sustainability metrics and risk assessments for informed decision-making.</p>
              </motion.div>
              
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Shield className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-xl font-semibold mb-2">For Conservation</h3>
                <p className="opacity-90">Real-time monitoring and predictive analytics for marine ecosystem protection.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

        {/* CTA Section */}
        <section className="py-20 bg-white/5 dark:bg-black/10 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-3xl mx-auto text-center p-8 bg-white/80 dark:bg-gray-800/80 rounded-2xl backdrop-blur-md shadow-xl border border-white/20 dark:border-gray-700/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 drop-shadow-sm">
              Ready to Explore Marine Intelligence?
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-200 mb-8 font-medium">
              Join the future of marine science with AI-powered insights and comprehensive data analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 shadow-lg transition-all duration-300">
                  <Link to="/dashboard">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild variant="outline" size="lg" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300">
                  <Link to="/docs">
                    View Documentation
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-gray-900/95 text-white py-12 backdrop-blur-md border-t border-gray-700/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-teal-600">
                  <Waves className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl">MarineAI</span>
              </div>
              <p className="text-gray-300 text-sm">
                India's first AI-driven marine knowledge platform for sustainable ocean management.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link></li>
                <li><Link to="/dna-search" className="hover:text-blue-400 transition-colors">DNA Analysis</Link></li>
                <li><Link to="/ai-assistant" className="hover:text-blue-400 transition-colors">AI Assistant</Link></li>
                <li><Link to="/digital-twin" className="hover:text-blue-400 transition-colors">Digital Twin</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/docs" className="hover:text-blue-400 transition-colors">Documentation</Link></li>
                <li><Link to="/taxonomy" className="hover:text-blue-400 transition-colors">Taxonomy</Link></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Research Papers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Partnerships</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Research Collaboration</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Media Kit</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 MarineAI. Built for SIH 2025. Advancing marine science through AI.
            </p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default HomePage;
