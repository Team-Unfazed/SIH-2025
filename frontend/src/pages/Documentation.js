import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Separator } from '../components/ui/separator';
import { 
  BookOpen, 
  Download, 
  Search, 
  ExternalLink, 
  Code, 
  Database, 
  Globe, 
  Users, 
  Mail, 
  Phone,
  MapPin,
  Github,
  FileText,
  Play,
  Settings,
  Zap
} from 'lucide-react';

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const apiEndpoints = [
    {
      method: 'GET',
      endpoint: '/api/ocean-data',
      description: 'Retrieve oceanographic data (temperature, salinity, chlorophyll)',
      parameters: ['region', 'date_range', 'depth'],
      response: 'Ocean measurements with spatial and temporal data'
    },
    {
      method: 'POST',
      endpoint: '/api/dna-search',
      description: 'Species identification from DNA/eDNA sequences',
      parameters: ['sequence_data', 'file_upload', 'analysis_type'],
      response: 'Species identification with confidence scores and taxonomy'
    },
    {
      method: 'GET',
      endpoint: '/api/fish-prediction',
      description: 'Fish stock predictions and sustainability metrics',
      parameters: ['species', 'region', 'time_horizon'],
      response: 'Stock assessment data and future projections'
    },
    {
      method: 'POST',
      endpoint: '/api/fishing-zones',
      description: 'AI-powered best fishing zone recommendations',
      parameters: ['coordinates', 'target_species', 'weather_conditions'],
      response: 'Optimal fishing locations with probability scores'
    },
    {
      method: 'GET',
      endpoint: '/api/sustainability-index',
      description: 'Regional sustainability scores and policy metrics',
      parameters: ['region', 'metrics', 'time_period'],
      response: 'Sustainability indicators and trend analysis'
    },
    {
      method: 'POST',
      endpoint: '/api/assistant',
      description: 'Natural language queries to AI marine assistant',
      parameters: ['query', 'context', 'user_role'],
      response: 'AI-generated insights and follow-up questions'
    }
  ];

  const userGuides = [
    {
      title: 'Getting Started with Marine AI Platform',
      description: 'Complete walkthrough for new users',
      sections: ['Account Setup', 'Dashboard Overview', 'Basic Navigation'],
      downloadSize: '2.3 MB'
    },
    {
      title: 'Researcher\'s Guide to Data Analysis',
      description: 'Advanced features for marine researchers',
      sections: ['Data Export', 'Statistical Analysis', 'Visualization Tools'],
      downloadSize: '4.1 MB'
    },
    {
      title: 'DNA/eDNA Analysis Manual',
      description: 'Step-by-step guide for species identification',
      sections: ['File Formats', 'Analysis Parameters', 'Result Interpretation'],
      downloadSize: '3.7 MB'
    },
    {
      title: 'Policymaker Dashboard Manual',
      description: 'Using sustainability metrics for decision making',
      sections: ['Risk Assessment', 'Policy Recommendations', 'Report Generation'],
      downloadSize: '1.9 MB'
    },
    {
      title: 'Fishing Zone Optimization Guide',
      description: 'Maximizing fishing efficiency with AI recommendations',
      sections: ['Zone Analysis', 'Weather Integration', 'Species Targeting'],
      downloadSize: '2.8 MB'
    }
  ];

  const quickStartSteps = [
    {
      step: 1,
      title: 'Create Account & Login',
      description: 'Sign up for free access to marine intelligence platform',
      icon: Users
    },
    {
      step: 2,
      title: 'Choose Your Role',
      description: 'Select Researcher, Policymaker, or Fisherman dashboard',
      icon: Settings
    },
    {
      step: 3,
      title: 'Explore Data',
      description: 'Browse oceanographic data, species information, and trends',
      icon: Database
    },
    {
      step: 4,
      title: 'Run Analysis',
      description: 'Use DNA search, AI assistant, or digital twin simulation',
      icon: Zap
    }
  ];

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800';
      case 'POST': return 'bg-blue-100 text-blue-800';
      case 'PUT': return 'bg-yellow-100 text-yellow-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Documentation & User Manual
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Complete guide to using the Marine AI Intelligence Platform
          </p>
        </div>

        <Tabs defaultValue="guides" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit">
            <TabsTrigger value="guides">User Guides</TabsTrigger>
            <TabsTrigger value="api">API Docs</TabsTrigger>
            <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* User Guides Tab */}
          <TabsContent value="guides">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Search and Filter */}
              <Card>
                <CardHeader>
                  <CardTitle>Search Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search guides..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium">Categories</h4>
                    <div className="space-y-1">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        User Guides
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Code className="h-4 w-4 mr-2" />
                        API Reference
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Settings className="h-4 w-4 mr-2" />
                        Configuration
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Zap className="h-4 w-4 mr-2" />
                        Tutorials
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Available Manuals */}
              <div className="lg:col-span-2 space-y-4">
                {userGuides.map((guide, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{guide.title}</CardTitle>
                        <Badge variant="secondary">{guide.downloadSize}</Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{guide.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Sections included:</p>
                          <div className="flex flex-wrap gap-2">
                            {guide.sections.map((section, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {section}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Play className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download PDF
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* API Documentation Tab */}
          <TabsContent value="api">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>API Reference</CardTitle>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in Swagger
                    </Button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    RESTful API endpoints for marine data access and analysis
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
                    <h4 className="font-medium mb-2">Base URL</h4>
                    <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                      https://api.marineai.platform.com/v1
                    </code>
                  </div>

                  <div className="space-y-4">
                    {apiEndpoints.map((endpoint, index) => (
                      <Card key={index} className="border">
                        <CardContent className="pt-6">
                          <div className="flex items-center space-x-3 mb-3">
                            <Badge className={getMethodColor(endpoint.method)}>
                              {endpoint.method}
                            </Badge>
                            <code className="text-sm font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                              {endpoint.endpoint}
                            </code>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-400 mb-3">
                            {endpoint.description}
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-medium text-sm mb-2">Parameters</h5>
                              <div className="space-y-1">
                                {endpoint.parameters.map((param, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs mr-1 mb-1">
                                    {param}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="font-medium text-sm mb-2">Response</h5>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {endpoint.response}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Quick Start Tab */}
          <TabsContent value="quickstart">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Start Guide</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">
                    Get up and running in minutes
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {quickStartSteps.map((step, index) => {
                      const Icon = step.icon;
                      return (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {step.step}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <Icon className="h-4 w-4 text-blue-600" />
                              <h4 className="font-medium">{step.title}</h4>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="text-center">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-teal-600">
                      <Play className="h-4 w-4 mr-2" />
                      Start Interactive Tutorial
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Video Tutorials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <Play className="h-8 w-8 text-blue-600" />
                          <div>
                            <h4 className="font-medium">Platform Overview</h4>
                            <p className="text-sm text-gray-600">5:30 minutes</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <Play className="h-8 w-8 text-blue-600" />
                          <div>
                            <h4 className="font-medium">DNA Analysis Tutorial</h4>
                            <p className="text-sm text-gray-600">8:15 minutes</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <Play className="h-8 w-8 text-blue-600" />
                          <div>
                            <h4 className="font-medium">Digital Twin Simulation</h4>
                            <p className="text-sm text-gray-600">12:45 minutes</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sample Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Sample DNA Sequences (FASTA)
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Database className="h-4 w-4 mr-2" />
                        Ocean Data Sample (CSV)
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Globe className="h-4 w-4 mr-2" />
                        API Request Examples
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">
                    Get in touch with our support team
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Email Support</h4>
                        <p className="text-gray-600 dark:text-gray-400">support@marineai.platform.com</p>
                        <p className="text-sm text-gray-500">Response within 24 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Phone Support</h4>
                        <p className="text-gray-600 dark:text-gray-400">+91-11-2345-6789</p>
                        <p className="text-sm text-gray-500">Mon-Fri, 9:00 AM - 6:00 PM IST</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Office Address</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          Marine Research Institute<br />
                          Ocean Technology Campus<br />
                          New Delhi, India - 110001
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Github className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Open Source</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          github.com/sih2025/marine-ai-platform
                        </p>
                        <p className="text-sm text-gray-500">Contribute to our project</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SIH 2025 Team</CardTitle>
                  <p className="text-gray-600 dark:text-gray-400">
                    Meet the team behind this innovation
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900 dark:to-teal-900 rounded-lg p-6 text-center">
                    <h3 className="text-xl font-bold mb-2">Team MarineAI</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Smart India Hackathon 2025<br />
                      Problem Statement: SIH25041
                    </p>
                    <Badge className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
                      AI-Driven Marine Intelligence Platform
                    </Badge>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <h4 className="font-medium">Team Members</h4>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <p>• Lead Developer & AI Specialist</p>
                      <p>• Marine Biology Expert</p>
                      <p>• Full-Stack Developer</p>
                      <p>• Data Science Specialist</p>
                      <p>• UI/UX Designer</p>
                      <p>• Project Manager</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button variant="outline">
                      <Users className="h-4 w-4 mr-2" />
                      Meet the Team
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documentation;