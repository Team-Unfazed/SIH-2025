
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Progress } from '../components/ui/progress';
import { Label } from '../components/ui/label';
import { 
  Globe, Play, Pause, RotateCcw, Settings, Thermometer, Droplets, Fish,
  TreePine, TrendingUp, TrendingDown, Activity, AlertTriangle, Info, Maximize
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { digitalTwinScenarios } from '../data/mockData';
import { toast } from '../hooks/use-toast';
import { motion } from 'framer-motion';

const MarineDigitalTwin = () => {
  const [currentScenario, setCurrentScenario] = useState('current');
  const [selectedYear, setSelectedYear] = useState(2024);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [isRunningSimulation, setIsRunningSimulation] = useState(false);
  const canvasRef = useRef(null);

  const scenarios = digitalTwinScenarios;
  const currentData = scenarios.find(s => s.id === currentScenario) || scenarios[0];

  const timelineData = [
    { year: 2020, temp: 26.8, fish: 78, coral: 72 },
    { year: 2024, temp: 27.8, fish: 72, coral: 65 },
    { year: 2030, temp: 30.0, fish: 58, coral: 48 },
    { year: 2035, temp: 31.5, fish: 45, coral: 35 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    // Initial resize
    resizeCanvas();
    
    // Add resize listener
    window.addEventListener('resize', resizeCanvas);
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const animate = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#1e3a8a');
      gradient.addColorStop(1, '#0c1e3e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Add temperature effect overlay
      const tempOpacity = Math.min(currentData.temperature_change / 3, 1);
      ctx.fillStyle = `rgba(255, 100, 100, ${tempOpacity * 0.2})`;
      ctx.fillRect(0, 0, width, height);

      // Add floating particles
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      if (isPlaying) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [currentData, isPlaying]);

  const runSimulation = async () => {
    setIsRunningSimulation(true);
    setSimulationProgress(0);
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunningSimulation(false);
          toast({ title: "Simulation Complete", description: "Ecosystem model has been updated." });
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-blue-950 dark:via-black dark:to-blue-950 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Marine Digital Twin</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Visualize and predict ocean changes with AI-powered simulations.</p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <motion.div className="xl:col-span-2" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Card className="h-full flex flex-col bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center"><Globe className="h-5 w-5 mr-2 text-blue-500" />3D Ocean Simulation</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}</Button>
                  <Button variant="outline" size="icon"><Maximize className="h-4 w-4" /></Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 relative bg-blue-900 rounded-lg overflow-hidden min-h-[400px]">
                  <canvas ref={canvasRef} className="w-full h-full" />
                  <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs">Three.js Model Placeholder</div>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Timeline: {selectedYear}</span>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>2020</span><Slider value={[selectedYear]} onValueChange={(v) => setSelectedYear(v[0])} min={2020} max={2035} step={1} className="w-48" /><span>2035</span>
                    </div>
                  </div>
                  {isRunningSimulation && <Progress value={simulationProgress} />}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div className="space-y-8" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <Card className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              <CardHeader><CardTitle>Simulation Controls</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Climate Scenario</Label>
                  <Select value={currentScenario} onValueChange={setCurrentScenario}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{scenarios.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 bg-blue-50/50 dark:bg-blue-900/30 p-3 rounded-lg">{currentData.name}: {currentData.description}</p>
                <Button onClick={runSimulation} disabled={isRunningSimulation} className="w-full bg-blue-600 hover:bg-blue-700 text-white"><Settings className="h-4 w-4 mr-2" />Run New Simulation</Button>
              </CardContent>
            </Card>

            <Card className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              <CardHeader><CardTitle>Key Metrics</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <MetricDisplay icon={Thermometer} label="Temp. Change" value={`+${currentData.temperature_change}°C`} color="text-red-500" />
                <MetricDisplay icon={Droplets} label="Sea Level Rise" value={`${currentData.sea_level_rise}cm`} color="text-blue-500" />
                <MetricDisplay icon={Fish} label="Fish Stock" value={`${currentData.fish_stock_health}%`} health={currentData.fish_stock_health} />
                <MetricDisplay icon={TreePine} label="Biodiversity" value={currentData.biodiversity_index.toFixed(2)} health={currentData.biodiversity_index * 100} />
                <MetricDisplay icon={Activity} label="Coral Cover" value={`${currentData.coral_cover}%`} health={currentData.coral_cover} />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div className="mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <Card className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-lg">
            <CardHeader><CardTitle>Future Projections</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                  <XAxis dataKey="year" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="temp" name="Temperature (°C)" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="fish" name="Fish Stock (%)" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="coral" name="Coral Cover (%)" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

const MetricDisplay = ({ icon, label, value, health, color }) => {
  const Icon = icon;
  const healthColor = health > 70 ? 'text-green-500' : health > 40 ? 'text-yellow-500' : 'text-red-500';
  const HealthIcon = health > 70 ? TrendingUp : health > 40 ? Activity : TrendingDown;

  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center space-x-2">
        <Icon className={`h-4 w-4 ${color || 'text-gray-500'}`} />
        <span>{label}</span>
      </div>
      <div className="flex items-center space-x-2 font-medium">
        <span className={health ? healthColor : color}>{value}</span>
        {health && <HealthIcon className={`h-4 w-4 ${healthColor}`} />}
      </div>
    </div>
  );
};

export default MarineDigitalTwin;
