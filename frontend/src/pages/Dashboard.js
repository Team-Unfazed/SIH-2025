import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, TrendingUp, Activity, AlertTriangle, Fish, Waves, Microscope, MapPin, Download, RefreshCw } from 'lucide-react';
import { oceanographicData, fishStockData, biodiversityData, sustainabilityMetrics, fishingZones, researcherData, policymakerData } from '../data/mockData';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('researchers');
  const [selectedMetric, setSelectedMetric] = useState('temperature');

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'restricted': return 'bg-red-500';
      case 'critical': return 'bg-red-600';
      case 'declining': return 'text-red-600';
      case 'stable': return 'text-green-600';
      case 'improving': return 'text-blue-600';
      default: return 'bg-gray-500';
    }
  };

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Marine Intelligence Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Real-time insights into ocean health, fisheries, and biodiversity
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-fit">
            <TabsTrigger value="researchers" className="flex items-center space-x-2">
              <Microscope className="h-4 w-4" />
              <span>Researchers</span>
            </TabsTrigger>
            <TabsTrigger value="policymakers" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Policymakers</span>
            </TabsTrigger>
            <TabsTrigger value="fishermen" className="flex items-center space-x-2">
              <Fish className="h-4 w-4" />
              <span>Fishermen</span>
            </TabsTrigger>
          </TabsList>

          {/* Researchers Dashboard */}
          <TabsContent value="researchers" className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Datasets</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.6M</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Species Tracked</CardTitle>
                  <Fish className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Biodiversity Index</CardTitle>
                  <Waves className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0.78</div>
                  <p className="text-xs text-muted-foreground">Stable over 6 months</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Data Quality</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">95.2%</div>
                  <p className="text-xs text-muted-foreground">+2.1% improvement</p>
                </CardContent>
              </Card>
            </div>

            {/* Oceanographic Data Visualization */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Oceanographic Variables</CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        variant={selectedMetric === 'temperature' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedMetric('temperature')}
                      >
                        Temperature
                      </Button>
                      <Button
                        variant={selectedMetric === 'salinity' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedMetric('salinity')}
                      >
                        Salinity
                      </Button>
                      <Button
                        variant={selectedMetric === 'chlorophyll' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedMetric('chlorophyll')}
                      >
                        Chlorophyll
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={oceanographicData[selectedMetric]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="bay_of_bengal" stroke="#3B82F6" strokeWidth={2} />
                      <Line type="monotone" dataKey="arabian_sea" stroke="#10B981" strokeWidth={2} />
                      <Line type="monotone" dataKey="indian_ocean" stroke="#F59E0B" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Biodiversity Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={biodiversityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="species_count" fill="#3B82F6" />
                      <Bar dataKey="endemic_species" fill="#10B981" />
                      <Bar dataKey="threatened_species" fill="#EF4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Research Datasets */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Available Datasets</CardTitle>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {researcherData.datasets.map((dataset, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{dataset.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {dataset.records.toLocaleString()} records • Last updated: {dataset.last_updated}
                        </p>
                      </div>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Policymakers Dashboard */}
          <TabsContent value="policymakers" className="space-y-6">
            {/* Sustainability Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Overall Sustainability Index</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-center mb-4">
                    {sustainabilityMetrics.overall_index}/10
                  </div>
                  <Progress value={sustainabilityMetrics.overall_index * 10} className="mb-2" />
                  <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                    Moderate - Needs Improvement
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Zones Alert</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {policymakerData.risk_zones.map((zone, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{zone.region}</p>
                          <p className="text-sm text-gray-600">{zone.factors.join(', ')}</p>
                        </div>
                        <Badge variant={zone.risk_level === 'high' ? 'destructive' : 'secondary'}>
                          {zone.risk_level}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Fishing Pressure</span>
                      <span className="font-medium">{sustainabilityMetrics.fishing_pressure}/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Habitat Quality</span>
                      <span className="font-medium">{sustainabilityMetrics.habitat_quality}/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pollution Levels</span>
                      <span className="font-medium">{sustainabilityMetrics.pollution_levels}/10</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Climate Impact</span>
                      <span className="font-medium">{sustainabilityMetrics.climate_impact}/10</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* State-wise Sustainability Scores */}
            <Card>
              <CardHeader>
                <CardTitle>State-wise Sustainability Scores</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={Object.entries(policymakerData.sustainability_scores).map(([state, score]) => ({ state, score }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="state" angle={-45} textAnchor="end" height={100} />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Policy Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Policy Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {policymakerData.policy_recommendations.map((rec, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{rec.title}</h4>
                        <Badge variant={rec.priority === 'high' ? 'destructive' : 'secondary'}>
                          {rec.priority} priority
                        </Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">{rec.description}</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        Expected Impact: {rec.expected_impact}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fishermen Dashboard */}
          <TabsContent value="fishermen" className="space-y-6">
            {/* Fishing Zones Map */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Best Fishing Zones (AI-Powered)</CardTitle>
                  <Button size="sm" variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Update Zones
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-8 text-center mb-4">
                  <MapPin className="h-16 w-16 mx-auto text-blue-600 mb-4" />
                  <p className="text-lg font-medium mb-2">Interactive Fishing Zones Map</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your trained .pt model integration will be displayed here
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {fishingZones.map((zone) => (
                    <div key={zone.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{zone.name}</h4>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(zone.status)}`} />
                      </div>
                      <div className="space-y-2 text-sm">
                        <p><strong>Fish Density:</strong> {zone.fish_density}%</p>
                        <p><strong>Weather:</strong> {zone.weather_conditions}</p>
                        <p><strong>Species:</strong> {zone.recommended_species.join(', ')}</p>
                        {zone.restrictions !== 'none' && (
                          <Badge variant="secondary">{zone.restrictions}</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Fish Stock Status */}
            <Card>
              <CardHeader>
                <CardTitle>Fish Stock Status & Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={fishStockData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="species" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current_stock" fill="#3B82F6" name="Current Stock %" />
                    <Bar dataKey="predicted_2025" fill="#10B981" name="2025 Prediction %" />
                    <Bar dataKey="predicted_2030" fill="#F59E0B" name="2030 Prediction %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Go/No-Go Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Fishing Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                      ✅ Recommended Zones
                    </h4>
                    <ul className="text-sm space-y-1 text-green-700 dark:text-green-300">
                      <li>• Bay of Bengal North - Optimal conditions</li>
                      <li>• Tamil Nadu Coast - Good for prawns</li>
                      <li>• Kerala Backwaters - Moderate activity</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
                    <h4 className="font-medium text-red-800 dark:text-red-200 mb-2">
                      ❌ Avoid These Zones
                    </h4>
                    <ul className="text-sm space-y-1 text-red-700 dark:text-red-300">
                      <li>• Arabian Sea West - Rough weather</li>
                      <li>• Gujarat Coast - Breeding season restrictions</li>
                      <li>• Cyclone warning areas - Safety alert</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;