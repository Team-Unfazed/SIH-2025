import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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
      link: '/dashboard'
    },
    {
      icon: Search,
      title: 'DNA/eDNA Analysis',
      description: 'Advanced molecular biodiversity insights with species identification.',
      link: '/dna-search'
    },
    {
      icon: Bot,
      title: 'AI Assistant',
      description: 'Intelligent chatbot for natural language queries and insights.',
      link: '/ai-assistant'
    },
    {
      icon: Globe,
      title: 'Marine Digital Twin',
      description: '3D simulation for ocean changes and future scenario modeling.',
      link: '/digital-twin'
    }
  ];

  const stats = [
    { value: '50M+', label: 'Data Points' },
    { value: '1000+', label: 'Species Tracked' },
    { value: '99.5%', label: 'Accuracy' },
    { value: '24/7', label: 'Monitoring' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Wave Background */}
        <div 
          ref={waveRef}
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%236366f1' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-full">
                <Waves className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-300">SIH 2025 Project</span>
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-blue-800 bg-clip-text text-transparent mb-6">
              India's First AI-Driven Marine Knowledge Platform
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Unifying ocean, fisheries, and biodiversity data for sustainable marine ecosystem management and research.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                <Link to="/dashboard">
                  Explore Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link to="/dna-search">
                  DNA Search <Search className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link to="/ai-assistant">
                  AI Copilot <Bot className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Comprehensive Marine Intelligence Suite
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Advanced tools and insights for researchers, policymakers, and marine stakeholders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-600 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {feature.description}
                    </p>
                    <Button asChild variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                      <Link to={feature.link}>
                        Learn more <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Driving Sustainable Marine Future
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-xl font-semibold mb-2">For Researchers</h3>
                <p className="opacity-90">Advanced data analytics and biodiversity insights for cutting-edge marine research.</p>
              </div>
              
              <div className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-xl font-semibold mb-2">For Policymakers</h3>
                <p className="opacity-90">Evidence-based sustainability metrics and risk assessments for informed decision-making.</p>
              </div>
              
              <div className="text-center">
                <Shield className="h-12 w-12 mx-auto mb-4 opacity-90" />
                <h3 className="text-xl font-semibold mb-2">For Conservation</h3>
                <p className="opacity-90">Real-time monitoring and predictive analytics for marine ecosystem protection.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Explore Marine Intelligence?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join the future of marine science with AI-powered insights and comprehensive data analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700">
                <Link to="/dashboard">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/docs">
                  View Documentation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;