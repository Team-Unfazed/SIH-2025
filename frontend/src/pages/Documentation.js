import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Separator } from '../components/ui/separator';
import { 
  BookOpen, Download, Search, ExternalLink, Code, Database, Globe, 
  Users, Mail, Phone, MapPin, Github, FileText, Play, Settings, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const apiEndpoints = [
    { method: 'GET', endpoint: '/api/ocean-data', description: 'Retrieve oceanographic data.' },
    { method: 'POST', endpoint: '/api/dna-search', description: 'Identify species from DNA sequences.' },
    { method: 'GET', endpoint: '/api/fish-prediction', description: 'Get fish stock predictions.' },
    { method: 'POST', endpoint: '/api/fishing-zones', description: 'Recommend best fishing zones.' },
  ];

  const userGuides = [
    { title: 'Getting Started Guide', description: 'Complete walkthrough for new users.', size: '2.3 MB' },
    { title: 'Researcher\'s Data Manual', description: 'Advanced features for marine researchers.', size: '4.1 MB' },
    { title: 'DNA/eDNA Analysis Guide', description: 'Step-by-step for species identification.', size: '3.7 MB' },
    { title: 'Policymaker Dashboard Manual', description: 'Using sustainability metrics for decisions.', size: '1.9 MB' },
  ];

  const quickStartSteps = [
    { icon: Users, title: 'Create Account & Login', description: 'Sign up for free access.' },
    { icon: Settings, title: 'Choose Your Role', description: 'Select a dashboard view.' },
    { icon: Database, title: 'Explore Data', description: 'Browse datasets and trends.' },
    { icon: Zap, title: 'Run Analysis', description: 'Use AI tools for insights.' },
  ];

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'POST': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-blue-950 dark:via-black dark:to-blue-950 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Documentation & Resources</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Your complete guide to the Marine AI Intelligence Platform.</p>
        </motion.div>

        <Tabs defaultValue="quickstart" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:w-fit mx-auto bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg p-2 rounded-full border-gray-200/50 dark:border-gray-700/50">
            <TabsTrigger value="quickstart" className="rounded-full">Quick Start</TabsTrigger>
            <TabsTrigger value="guides" className="rounded-full">User Guides</TabsTrigger>
            <TabsTrigger value="api" className="rounded-full">API Docs</TabsTrigger>
            <TabsTrigger value="contact" className="rounded-full">Contact</TabsTrigger>
          </TabsList>

          <motion.div key={name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <TabsContent value="quickstart">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  {quickStartSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100/80 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-lg flex items-center justify-center">
                        <step.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{step.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Card className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                  <CardHeader><CardTitle>Interactive Tutorial</CardTitle></CardHeader>
                  <CardContent className="text-center">
                    <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-6 mb-4">
                      <Play className="h-16 w-16 text-blue-500 mx-auto"/>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">Launch an interactive walkthrough of the platform's key features.</p>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">Start Tutorial</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="guides">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userGuides.map((guide, index) => (
                  <Card key={index} className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-lg">{guide.title}</CardTitle>
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex-grow">{guide.description}</p>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{guide.size}</Badge>
                        <Button size="sm"><Download className="h-4 w-4 mr-2" />Download</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="api">
              <Card className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>API Reference</CardTitle>
                    <Button variant="outline" size="sm"><ExternalLink className="h-4 w-4 mr-2" />Swagger Docs</Button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">RESTful API for programmatic data access and analysis.</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {apiEndpoints.map((endpoint, index) => (
                      <div key={index} className="p-4 rounded-lg border bg-gray-50/50 dark:bg-gray-800/40 border-gray-200/80 dark:border-gray-700/60">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge className={getMethodColor(endpoint.method)}>{endpoint.method}</Badge>
                          <code className="text-sm font-mono text-gray-800 dark:text-gray-200">{endpoint.endpoint}</code>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{endpoint.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                  <CardHeader><CardTitle>Contact Information</CardTitle></CardHeader>
                  <CardContent className="space-y-4">
                    <ContactInfo icon={Mail} title="Email Support" value="support@marineai.platform" />
                    <ContactInfo icon={Phone} title="Phone Support" value="+91-11-2345-6789" />
                    <ContactInfo icon={MapPin} title="Office Address" value="Marine Research Institute, New Delhi" />
                    <ContactInfo icon={Github} title="Open Source" value="github.com/sih2025/marine-ai" />
                  </CardContent>
                </Card>
                <Card className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                  <CardHeader><CardTitle>SIH 2025 Team</CardTitle></CardHeader>
                  <CardContent className="text-center">
                     <div className="bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/50 dark:to-teal-900/50 rounded-lg p-6">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Team MarineAI</h3>
                        <p className="text-gray-600 dark:text-gray-300">Smart India Hackathon 2025</p>
                     </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
};

const ContactInfo = ({ icon, title, value }) => {
  const Icon = icon;
  return (
    <div className="flex items-start space-x-3">
      <Icon className="h-5 w-5 text-blue-500 mt-1" />
      <div>
        <h4 className="font-semibold text-gray-800 dark:text-gray-200">{title}</h4>
        <p className="text-gray-600 dark:text-gray-400">{value}</p>
      </div>
    </div>
  );
};

export default Documentation;
