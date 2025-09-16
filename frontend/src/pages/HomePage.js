import React, { useEffect, useRef } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowRight, Database, Search, Bot, Globe, Users, TrendingUp, Shield, Waves } from 'lucide-react';
import LightRays from '../components/LightRays';

const HomePage = () => {
  

  

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
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 relative">
      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-4">
          <div className="absolute inset-0 z-0" style={{ pointerEvents: 'none' }}>
            <LightRays raysOrigin="top-center" raysColor="#ffffff" raysSpeed={1} lightSpread={1} rayLength={2} pulsating={false} fadeDistance={1.0} saturation={1.0} followMouse={true} mouseInfluence={0.1} noiseAmount={0.0} distortion={0.0} />
          </div>
        
        
        <div className="relative z-10 container mx-auto px-4 py-2 lg:py-4">
          <div className="grid lg:grid-cols-2 gap-8 items-start max-w-7xl mx-auto min-h-[70vh]">
            {/* Left Content */}
            <motion.div 
              className="text-left space-y-6 pt-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="flex justify-start mb-8"
                variants={itemVariants}
              >
                <br></br>
                <br></br>
              </motion.div>
              
              <motion.h1 
                className="text-4xl lg:text-6xl font-bold text-white leading-tight"
                variants={itemVariants}
              >
                India's First AI-Driven Marine Knowledge Platform
              </motion.h1>
              
              <motion.p 
                className="text-base lg:text-lg text-blue-100/90 leading-relaxed max-w-xl"
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
                  <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg">
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
                  <Button asChild variant="ghost" size="lg" className="text-cyan-200 hover:bg-blue-900/30 px-6 py-3">
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
                  <Button asChild variant="ghost" size="lg" className="text-cyan-200 hover:bg-blue-900/30 px-6 py-3">
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
                    <div className="text-2xl lg:text-3xl font-bold text-cyan-200 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-blue-300">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Lottie Animation */}
            <motion.div 
              className="flex justify-center lg:justify-end items-center"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="w-full max-w-3xl lg:max-w-4xl relative flex justify-center items-center">
                <dotlottie-wc 
                  src="https://lottie.host/62e8ef64-27e1-486f-88a2-becedb1ffaa4/hvHk7Od3lo.lottie" 
                  style={{ width: '750px', height: '750px' }}
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
                        className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg mb-4 shadow-md"
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 5,
                          boxShadow: "0 8px 25px rgba(59, 130, 246, 0.35)"
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
                        <Button asChild variant="ghost" className="p-0 h-auto text-cyan-300 hover:text-cyan-200">
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
        <section className="py-20 bg-gradient-to-r from-blue-700/80 to-cyan-700/80 backdrop-blur-md">
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
              className="max-w-6xl mx-auto p-8 bg-blue-900/50 rounded-2xl backdrop-blur-md shadow-xl border border-blue-300/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <DotLottieReact
                    src="https://lottie.host/8c3bd87c-c376-4716-a67a-94768473348a/Xe3YB71vWK.lottie"
                    loop
                    autoplay
                  />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 drop-shadow-sm">
                    Ready to Explore Marine Intelligence?
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-200 mb-8 font-medium">
                    Join the future of marine science with AI-powered insights and comprehensive data analysis.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg transition-all duration-300">
                        <Link to="/dashboard">
                          Get Started <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button asChild variant="outline" size="lg" className="hover:bg-blue-900/30 transition-all duration-300 text-cyan-200 border-blue-300/30">
                        <Link to="/docs">
                          View Documentation
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-blue-950/95 text-white py-12 backdrop-blur-md border-t border-blue-800/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <p className="text-gray-300 text-sm">
                India's first AI-driven marine knowledge platform for sustainable ocean management.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/dashboard" className="hover:text-cyan-200 transition-colors">Dashboard</Link></li>
                <li><Link to="/dna-search" className="hover:text-cyan-200 transition-colors">DNA Analysis</Link></li>
                <li><Link to="/ai-assistant" className="hover:text-cyan-200 transition-colors">AI Assistant</Link></li>
                <li><Link to="/digital-twin" className="hover:text-cyan-200 transition-colors">Digital Twin</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link to="/docs" className="hover:text-cyan-200 transition-colors">Documentation</Link></li>
                <li><Link to="/taxonomy" className="hover:text-cyan-200 transition-colors">Taxonomy</Link></li>
                <li><a href="#" className="hover:text-cyan-200 transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-cyan-200 transition-colors">Research Papers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-cyan-200 transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-cyan-200 transition-colors">Partnerships</a></li>
                <li><a href="#" className="hover:text-cyan-200 transition-colors">Research Collaboration</a></li>
                <li><a href="#" className="hover:text-cyan-200 transition-colors">Media Kit</a></li>
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
