import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Progress } from '../components/ui/progress';
import { 
  Globe, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Thermometer, 
  Droplets, 
  Fish,
  TreePine,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  Info,
  Maximize
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { digitalTwinScenarios } from '../data/mockData';
import { toast } from '../hooks/use-toast';

const MarineDigitalTwin = () => {
  const [currentScenario, setCurrentScenario] = useState('current');
  const [selectedYear, setSelectedYear] = useState(2024);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedMetric, setSelectedMetric] = useState('temperature');
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [isRunningSimulation, setIsRunningSimulation] = useState(false);
  const canvasRef = useRef(null);

  const scenarios = digitalTwinScenarios;
  const currentData = scenarios.find(s => s.id === currentScenario) || scenarios[0];

  const timelineData = [
    { year: 2020, temperature: 26.8, fish_stock: 78, biodiversity: 0.82, coral_cover: 72 },
    { year: 2022, temperature: 27.2, fish_stock: 75, biodiversity: 0.80, coral_cover: 68 },
    { year: 2024, temperature: 27.8, fish_stock: 72, biodiversity: 0.78, coral_cover: 65 },
    { year: 2026, temperature: 28.5, fish_stock: 68, biodiversity: 0.75, coral_cover: 60 },
    { year: 2028, temperature: 29.2, fish_stock: 63, biodiversity: 0.71, coral_cover: 55 },
    { year: 2030, temperature: 30.0, fish_stock: 58, biodiversity: 0.67, coral_cover: 48 },
    { year: 2035, temperature: 31.5, fish_stock: 45, biodiversity: 0.58, coral_cover: 35 }
  ];

  // Simple 3D visualization simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw ocean background with gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#87ceeb');
      gradient.addColorStop(0.5, '#4682b4');
      gradient.addColorStop(1, '#191970');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Draw temperature visualization
      const tempOpacity = Math.min(currentData.temperature_change / 3, 1);
      ctx.fillStyle = `rgba(255, 100, 100, ${tempOpacity * 0.3})`;
      ctx.fillRect(0, 0, width, height);
      
      // Draw fish representation
      const fishCount = Math.floor(currentData.fish_stock_health / 10);
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < fishCount; i++) {
        const x = (i * 50 + Date.now() * 0.001 * 20) % width;
        const y = 100 + Math.sin(Date.now() * 0.001 + i) * 20;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw coral coverage
      const coralHeight = (currentData.coral_cover / 100) * 80;
      ctx.fillStyle = '#ff7f50';
      ctx.fillRect(0, height - coralHeight, width, coralHeight);
      
      // Add labels
      ctx.fillStyle = '#ffffff';
      ctx.font = '14px Arial';
      ctx.fillText(`Year: ${currentData.year}`, 10, 30);
      ctx.fillText(`Temperature: +${currentData.temperature_change.toFixed(1)}°C`, 10, 50);
      ctx.fillText(`Fish Health: ${currentData.fish_stock_health}%`, 10, 70);
      ctx.fillText(`Coral Cover: ${currentData.coral_cover}%`, 10, 90);
      
      if (isPlaying) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }, [currentData, isPlaying]);

  const runSimulation = async () => {
    setIsRunningSimulation(true);
    setSimulationProgress(0);
    
    // Simulate running complex marine simulation
    const progressInterval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsRunningSimulation(false);
          toast({
            title: "Simulation Complete",
            description: "Marine ecosystem modeling has finished processing",
          });
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const getHealthColor = (value, reverse = false) => {
    if (reverse) {
      if (value > 70) return 'text-red-600';
      if (value > 40) return 'text-yellow-600';
      return 'text-green-600';
    } else {
      if (value > 70) return 'text-green-600';
      if (value > 40) return 'text-yellow-600';
      return 'text-red-600';
    }
  };

  const getHealthIcon = (value, reverse = false) => {
    if (reverse) {
      if (value > 70) return TrendingUp;
      if (value > 40) return Activity;
      return TrendingDown;
    } else {
      if (value > 70) return TrendingUp;
      if (value > 40) return Activity;
      return TrendingDown;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Marine Digital Twin Simulation
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Interactive 3D simulation for visualizing ocean changes and future scenarios
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* 3D Visualization */}
          <div className="xl:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span>3D Ocean Simulation</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Maximize className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* 3D Canvas Placeholder */}
                <div className="relative bg-blue-900 rounded-lg overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={400}
                    className="w-full h-96"
                  />
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded">
                    <p className="text-sm">Three.js Integration Ready</p>
                  </div>
                </div>

                {/* Timeline Controls */}
                <div className="mt-4 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Timeline: {selectedYear}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs">2020</span>
                        <span className="text-xs">2035</span>
                      </div>
                    </div>
                    <Slider
                      value={[selectedYear]}
                      onValueChange={(value) => setSelectedYear(value[0])}
                      min={2020}
                      max={2035}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedYear(2020)}
                      >
                        <RotateCcw className="h-4 w-4 mr-1" />
                        Reset
                      </Button>
                      <span className="text-sm text-gray-600">Speed: {playbackSpeed}x</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={runSimulation}
                        disabled={isRunningSimulation}
                      >
                        <Settings className="h-4 w-4 mr-1" />
                        Run Simulation
                      </Button>
                    </div>
                  </div>

                  {isRunningSimulation && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Processing Marine Model...</span>
                        <span>{simulationProgress}%</span>
                      </div>
                      <Progress value={simulationProgress} />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Scenario Comparison */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Scenario Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temperature" stroke="#EF4444" strokeWidth={2} name="Temperature (°C)" />
                    <Line type="monotone" dataKey="fish_stock" stroke="#3B82F6" strokeWidth={2} name="Fish Stock %" />
                    <Line type="monotone" dataKey="coral_cover" stroke="#F59E0B" strokeWidth={2} name="Coral Cover %" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            {/* Scenario Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Scenario Selection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Choose Scenario</label>
                  <Select value={currentScenario} onValueChange={setCurrentScenario}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {scenarios.map((scenario) => (
                        <SelectItem key={scenario.id} value={scenario.id}>
                          {scenario.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Current Scenario</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {currentData.name} - Simulating marine ecosystem changes through {currentData.year}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Real-time Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <Thermometer className="h-8 w-8 mx-auto text-red-500 mb-2" />
                    <p className="text-2xl font-bold">+{currentData.temperature_change}°C</p>
                    <p className="text-xs text-gray-600">Temperature Change</p>
                  </div>
                  <div className="text-center">
                    <Droplets className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                    <p className="text-2xl font-bold">{currentData.sea_level_rise}cm</p>
                    <p className="text-xs text-gray-600">Sea Level Rise</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Fish className="h-4 w-4" />
                      <span className="text-sm">Fish Stock Health</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${getHealthColor(currentData.fish_stock_health)}`}>
                        {currentData.fish_stock_health}%
                      </span>
                      {React.createElement(getHealthIcon(currentData.fish_stock_health), {
                        className: `h-4 w-4 ${getHealthColor(currentData.fish_stock_health)}`
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TreePine className="h-4 w-4" />
                      <span className="text-sm">Biodiversity Index</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${getHealthColor(currentData.biodiversity_index * 100)}`}>
                        {currentData.biodiversity_index.toFixed(2)}
                      </span>
                      {React.createElement(getHealthIcon(currentData.biodiversity_index * 100), {
                        className: `h-4 w-4 ${getHealthColor(currentData.biodiversity_index * 100)}`
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4" />
                      <span className="text-sm">Coral Coverage</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${getHealthColor(currentData.coral_cover)}`}>
                        {currentData.coral_cover}%
                      </span>
                      {React.createElement(getHealthIcon(currentData.coral_cover), {
                        className: `h-4 w-4 ${getHealthColor(currentData.coral_cover)}`
                      })}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm">Pollution Level</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${getHealthColor(currentData.pollution_level, true)}`}>
                        {currentData.pollution_level}%
                      </span>
                      {React.createElement(getHealthIcon(currentData.pollution_level, true), {
                        className: `h-4 w-4 ${getHealthColor(currentData.pollution_level, true)}`
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What-if Scenarios */}
            <Card>
              <CardHeader>
                <CardTitle>What-if Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Increase Marine Protected Areas
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Fish className="h-4 w-4 mr-2" />
                    Reduce Fishing Quotas by 30%
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Droplets className="h-4 w-4 mr-2" />
                    Implement Pollution Controls
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Thermometer className="h-4 w-4 mr-2" />
                    Climate Adaptation Measures
                  </Button>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <Info className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Interactive Feature:</strong> Click scenarios to see real-time impact predictions on the 3D visualization
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarineDigitalTwin;