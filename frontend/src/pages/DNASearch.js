
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Upload, Search, FileText, Dna, AlertCircle, CheckCircle, Download, Microscope, ChevronRight } from 'lucide-react';
import { dnaSearchResults } from '../data/mockData';
import { toast } from '../hooks/use-toast';
import { motion } from 'framer-motion';

const DNASearch = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [sequenceText, setSequenceText] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: "File ready for analysis",
        description: `${file.name} has been uploaded.`,
      });
    }
  };

  const handleSequenceSearch = async () => {
    if (!sequenceText.trim() && !uploadedFile) {
      toast({
        title: "No input provided",
        description: "Please enter a DNA sequence or upload a file.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setSearchProgress(0);
    setSearchResults([]);

    const progressInterval = setInterval(() => {
      setSearchProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    setTimeout(() => {
      setSearchResults(dnaSearchResults);
      setIsSearching(false);
      setSearchProgress(100);
      toast({
        title: "Analysis Complete",
        description: `Found ${dnaSearchResults.length} potential species matches.`,
      });
    }, 2500);
  };

  const getConservationStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'least concern': return 'bg-green-500';
      case 'near threatened': return 'bg-yellow-500';
      case 'vulnerable': return 'bg-orange-500';
      case 'endangered': return 'bg-red-500';
      case 'critically endangered': return 'bg-red-700';
      default: return 'bg-gray-500';
    }
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
            DNA/eDNA Species Identification
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Analyze genetic data to uncover marine biodiversity insights.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-1 space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
                  <Dna className="h-5 w-5 text-blue-500" />
                  <span>Analysis Input</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2 bg-gray-200/50 dark:bg-gray-800/50 p-1 rounded-lg">
                    <TabsTrigger value="upload">File Upload</TabsTrigger>
                    <TabsTrigger value="text">Paste Sequence</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload" className="mt-4">
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer bg-gray-50/50 dark:bg-gray-800/40 hover:bg-gray-100/50 dark:hover:bg-gray-700/40 transition-colors"
                    >
                      <Upload className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload or drag & drop</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">FASTA, CSV, TXT (Max 10MB)</p>
                      <input id="file-upload" type="file" className="hidden" accept=".fasta,.fa,.csv,.txt" onChange={handleFileUpload} />
                    </label>
                    {uploadedFile && (
                      <div className="mt-3 p-2 bg-blue-100/50 dark:bg-blue-900/30 rounded-lg flex items-center space-x-2 text-sm text-blue-800 dark:text-blue-200">
                        <FileText className="h-4 w-4" />
                        <span>{uploadedFile.name}</span>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="text" className="mt-4">
                    <Textarea
                      id="sequence-input"
                      placeholder="Enter DNA sequence, e.g., ATCGATCG..."
                      value={sequenceText}
                      onChange={(e) => setSequenceText(e.target.value)}
                      className="min-h-[160px] bg-gray-50/50 dark:bg-gray-800/40 border-gray-300 dark:border-gray-600"
                    />
                  </TabsContent>
                </Tabs>

                <div className="mt-6">
                  <Button onClick={handleSequenceSearch} className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isSearching}>
                    {isSearching ? <><Microscope className="mr-2 h-4 w-4 animate-spin" />Analyzing...</> : <><Search className="mr-2 h-4 w-4" />Identify Species</>}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="min-h-[500px] bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-gray-800 dark:text-gray-200">
                  Analysis Results
                  {searchResults.length > 0 && <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" />Export</Button>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isSearching ? (
                  <div className="flex flex-col items-center justify-center h-full pt-16">
                    <Dna className="h-16 w-16 text-blue-500 animate-pulse mb-6" />
                    <Progress value={searchProgress} className="w-full max-w-sm mb-4" />
                    <p className="text-gray-600 dark:text-gray-300">Comparing against genetic database...</p>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="text-center py-16 flex flex-col items-center justify-center h-full">
                    <Dna className="h-20 w-20 mx-auto text-gray-400 dark:text-gray-500 mb-6" />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Awaiting Analysis</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm">Your species identification results will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {searchResults.map((result) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="bg-gray-50/50 dark:bg-gray-800/40 hover:bg-gray-100/50 dark:hover:bg-gray-800/60 transition-colors">
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg text-blue-700 dark:text-blue-400">
                                <em>{result.species_name}</em>
                              </CardTitle>
                              <Badge variant="secondary">{result.confidence}% Match</Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{result.common_name}</p>
                          </CardHeader>
                          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                            <div>
                              <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Taxonomy</h4>
                              <div className="space-y-1">
                                {Object.entries(result.taxonomy).map(([rank, name]) => (
                                  <div key={rank} className="flex justify-between text-xs">
                                    <span className="capitalize text-gray-500 dark:text-gray-400">{rank}</span>
                                    <span className="font-medium text-gray-800 dark:text-gray-200">{name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">Status</h4>
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500 dark:text-gray-400">Conservation</span>
                                  <Badge className={`${getConservationStatusColor(result.conservation_status)} text-white text-xs`}>{result.conservation_status}</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500 dark:text-gray-400">Legal Status</span>
                                  <Badge variant={result.legal_status === 'prohibited' ? 'destructive' : 'outline'}>{result.legal_status}</Badge>
                                </div>
                              </div>
                              {result.legal_status === 'prohibited' && (
                                <div className="mt-3 flex items-start space-x-2 p-2 bg-red-100/50 dark:bg-red-900/30 rounded-lg">
                                  <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                                  <p className="text-xs text-red-700 dark:text-red-300">Capture of this species is prohibited under conservation laws.</p>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DNASearch;
