
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, TrendingUp, Activity, AlertTriangle, Fish, Waves, Microscope, MapPin, Download, RefreshCw, ArrowUp, ArrowDown, Droplets, Wind, Thermometer } from 'lucide-react';
import { oceanographicData, fishStockData, biodiversityData, sustainabilityMetrics, fishingZones, researcherData, policymakerData } from '../data/mockData';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('researchers');
  const [selectedMetric, setSelectedMetric] = useState('temperature');

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'restricted': return 'bg-red-500';
      case 'critical': return 'bg-red-600';
      case 'declining': return 'text-red-500';
      case 'stable': return 'text-green-500';
      case 'improving': return 'text-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const renderMetricCard = (title, value, change, icon) => {
    const Icon = icon;
    const isPositive = change && change.startsWith('+');
    return (
      <Card className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</CardTitle>
          <Icon className="h-5 w-5 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
          {change && (
            <p className={`text-xs mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'} dark:${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {change}
            </p>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-blue-950 dark:via-black dark:to-blue-950 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Marine Intelligence Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Real-time insights into ocean health, fisheries, and biodiversity.
          </p>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 lg:w-fit mx-auto bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg p-2 rounded-full border-gray-200/50 dark:border-gray-700/50">
            <TabsTrigger value="researchers" className="flex items-center space-x-2 rounded-full">
              <Microscope className="h-5 w-5" />
              <span>Researchers</span>
            </TabsTrigger>
            <TabsTrigger value="policymakers" className="flex items-center space-x-2 rounded-full">
              <TrendingUp className="h-5 w-5" />
              <span>Policymakers</span>
            </TabsTrigger>
            <TabsTrigger value="fishermen" className="flex items-center space-x-2 rounded-full">
              <Fish className="h-5 w-5" />
              <span>Fishermen</span>
            </TabsTrigger>
          </TabsList>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Researchers Dashboard */}
            <TabsContent value="researchers" className="space-y-8 mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {renderMetricCard("Total Datasets", "3.6M", "+12% from last month", Activity)}
                {renderMetricCard("Species Tracked", "1,247", "+8% from last month", Fish)}
                {renderMetricCard("Biodiversity Index", "0.78", "Stable", Waves)}
                {renderMetricCard("Data Quality", "95.2%", "+2.1% improvement", TrendingUp)}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <Card className="lg:col-span-3 bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Oceanographic Variables</CardTitle>
                      <div className="flex space-x-1 bg-gray-200/50 dark:bg-gray-800/50 p-1 rounded-lg">
                        <Button variant={selectedMetric === 'temperature' ? 'default' : 'ghost'} size="sm" onClick={() => setSelectedMetric('temperature')} className="rounded-md">Temp</Button>
                        <Button variant={selectedMetric === 'salinity' ? 'default' : 'ghost'} size="sm" onClick={() => setSelectedMetric('salinity')} className="rounded-md">Salinity</Button>
                        <Button variant={selectedMetric === 'chlorophyll' ? 'default' : 'ghost'} size="sm" onClick={() => setSelectedMetric('chlorophyll')} className="rounded-md">Chlorophyll</Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={oceanographicData[selectedMetric]}>
                        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                        <XAxis dataKey="date" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="bay_of_bengal" stackId="1" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.3} />
                        <Area type="monotone" dataKey="arabian_sea" stackId="1" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.3} />
                        <Area type="monotone" dataKey="indian_ocean" stackId="1" stroke={COLORS[2]} fill={COLORS[2]} fillOpacity={0.3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2 bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle>Biodiversity Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie data={biodiversityData} dataKey="species_count" nameKey="region" cx="50%" cy="50%" outerRadius={100} label>
                          {biodiversityData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Policymakers Dashboard */}
            <TabsContent value="policymakers" className="space-y-8 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle>Overall Sustainability Index</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400">{sustainabilityMetrics.overall_index}/10</div>
                            <Progress value={sustainabilityMetrics.overall_index * 10} className="mt-4" />
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Moderate - Needs Improvement</p>
                        </CardContent>
                    </Card>
                    <Card className="md:col-span-2 bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle>Risk Zone Alerts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {policymakerData.risk_zones.map((zone, index) => (
                                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50">
                                    <div>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">{zone.region}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{zone.factors.join(', ')}</p>
                                    </div>
                                    <Badge variant={zone.risk_level === 'high' ? 'destructive' : 'secondary'}>{zone.risk_level}</Badge>
                                </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Card className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle>AI-Generated Policy Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                        {policymakerData.policy_recommendations.map((rec, index) => (
                            <div key={index} className="border-l-4 p-4 rounded-r-lg bg-gray-50/50 dark:bg-gray-800/40" style={{ borderLeftColor: rec.priority === 'high' ? '#EF4444' : '#3B82F6' }}>
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">{rec.title}</h4>
                                    <Badge variant={rec.priority === 'high' ? 'destructive' : 'secondary'}>{rec.priority} priority</Badge>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{rec.description}</p>
                                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Expected Impact: {rec.expected_impact}</p>
                            </div>
                        ))}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Fishermen Dashboard */}
            <TabsContent value="fishermen" className="space-y-8 mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Real-time Fishing Zone Recommendations</CardTitle>
                                <Button size="sm" variant="ghost"><RefreshCw className="h-4 w-4 mr-2" />Update</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-blue-100/50 dark:bg-blue-900/30 rounded-lg p-6 text-center mb-4">
                                <MapPin className="h-12 w-12 mx-auto text-blue-500 mb-3" />
                                <p className="font-semibold text-gray-800 dark:text-gray-200">Interactive Fishing Zones Map</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Live data feed from satellite and buoy sensors.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {fishingZones.map((zone) => (
                                <div key={zone.id} className="border rounded-lg p-3 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-medium text-gray-800 dark:text-gray-200">{zone.name}</h4>
                                        <div className={`w-3 h-3 rounded-full ${getStatusColor(zone.status)}`} />
                                    </div>
                                    <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                                        <p><strong>Fish Density:</strong> {zone.fish_density}%</p>
                                        <p><strong>Weather:</strong> {zone.weather_conditions}</p>
                                        <p><strong>Species:</strong> {zone.recommended_species.join(', ')}</p>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </CardContent>
                    </Card>
                    <div className="space-y-6">
                        <Card className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle>Today's Go/No-Go</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-green-100/50 dark:bg-green-900/30 border-l-4 border-green-500 p-3 rounded-r-lg mb-4">
                                    <h4 className="font-semibold text-green-800 dark:text-green-200">Go Zones</h4>
                                    <ul className="text-xs list-disc list-inside text-green-700 dark:text-green-300"><li>Bay of Bengal North</li><li>Tamil Nadu Coast</li></ul>
                                </div>
                                <div className="bg-red-100/50 dark:bg-red-900/30 border-l-4 border-red-500 p-3 rounded-r-lg">
                                    <h4 className="font-semibold text-red-800 dark:text-red-200">No-Go Zones</h4>
                                    <ul className="text-xs list-disc list-inside text-red-700 dark:text-red-300"><li>Arabian Sea West</li><li>Gujarat Coast</li></ul>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle>Fish Stock Predictions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart data={fishStockData.slice(0, 3)} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                        <XAxis type="number" hide />
                                        <YAxis type="category" dataKey="species" width={60} fontSize={12} />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="current_stock" stackId="a" fill={COLORS[0]} name="Current" />
                                        <Bar dataKey="predicted_2025" stackId="a" fill={COLORS[1]} name="2025" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
