import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Upload, Search, FileText, Dna, AlertCircle, CheckCircle, Download, Microscope } from 'lucide-react';
import { dnaSearchResults } from '../data/mockData';
import { toast } from '../hooks/use-toast';

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
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded and is ready for analysis.`,
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

    // Simulate search progress
    const progressInterval = setInterval(() => {
      setSearchProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call delay
    setTimeout(() => {
      setSearchResults(dnaSearchResults);
      setIsSearching(false);
      setSearchProgress(100);
      toast({
        title: "Search completed",
        description: `Found ${dnaSearchResults.length} matching species.`,
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

  const getLegalStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open': return 'text-green-600 bg-green-100';
      case 'regulated': return 'text-yellow-600 bg-yellow-100';
      case 'prohibited': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            DNA/eDNA Species Identification
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Upload FASTA sequences or raw DNA data for species identification and biodiversity analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Search Input Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Dna className="h-5 w-5" />
                  <span>DNA Analysis Input</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upload">File Upload</TabsTrigger>
                    <TabsTrigger value="text">Text Input</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload" className="space-y-4">
                    <div>
                      <Label htmlFor="file-upload">Upload FASTA/CSV File</Label>
                      <div className="mt-2">
                        <label
                          htmlFor="file-upload"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-gray-500" />
                            <p className="text-sm text-gray-500">
                              Click to upload or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">
                              FASTA, CSV, TXT (MAX. 10MB)
                            </p>
                          </div>
                          <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            accept=".fasta,.fa,.csv,.txt"
                            onChange={handleFileUpload}
                          />
                        </label>
                      </div>
                      {uploadedFile && (
                        <div className="mt-2 p-2 bg-blue-50 rounded-lg flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="text-sm text-blue-700">{uploadedFile.name}</span>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="text" className="space-y-4">
                    <div>
                      <Label htmlFor="sequence-input">DNA Sequence</Label>
                      <Textarea
                        id="sequence-input"
                        placeholder="Enter DNA sequence (ATCG format)&#10;Example: ATCGATCGATCGATCG..."
                        value={sequenceText}
                        onChange={(e) => setSequenceText(e.target.value)}
                        className="mt-1 min-h-[120px]"
                      />
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-6 space-y-4">
                  <Button 
                    onClick={handleSequenceSearch} 
                    className="w-full"
                    disabled={isSearching}
                  >
                    {isSearching ? (
                      <>
                        <Microscope className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Identify Species
                      </>
                    )}
                  </Button>

                  {isSearching && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Analysis Progress</span>
                        <span>{searchProgress}%</span>
                      </div>
                      <Progress value={searchProgress} />
                      <p className="text-xs text-gray-500 text-center">
                        Processing genetic sequences...
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Analysis Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Analysis Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Species identification with confidence scores</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Complete taxonomic classification</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Legal capture status verification</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Conservation status assessment</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span>Biodiversity impact analysis</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {searchResults.length === 0 && !isSearching ? (
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <Dna className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No Analysis Results Yet
                  </h3>
                  <p className="text-gray-500">
                    Upload a DNA sequence file or enter sequence data to begin species identification
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Analysis Results ({searchResults.length} matches)
                  </h2>
                  {searchResults.length > 0 && (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Results
                    </Button>
                  )}
                </div>

                {searchResults.map((result) => (
                  <Card key={result.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          <em>{result.species_name}</em>
                        </CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">
                            {result.confidence}% confidence
                          </Badge>
                          <Badge className={getLegalStatusColor(result.legal_status)}>
                            {result.legal_status}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {result.common_name}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Taxonomic Classification */}
                        <div>
                          <h4 className="font-medium mb-3">Taxonomic Classification</h4>
                          <div className="space-y-2 text-sm">
                            {Object.entries(result.taxonomy).map(([rank, name]) => (
                              <div key={rank} className="flex justify-between">
                                <span className="capitalize text-gray-600 dark:text-gray-400">
                                  {rank}:
                                </span>
                                <span className="font-medium">{name}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Conservation & Legal Status */}
                        <div>
                          <h4 className="font-medium mb-3">Status Information</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm text-gray-600">Conservation Status</span>
                                <Badge className={getConservationStatusColor(result.conservation_status) + ' text-white'}>
                                  {result.conservation_status}
                                </Badge>
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-sm font-medium mb-1">Biodiversity Role</h5>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {result.biodiversity_role}
                              </p>
                            </div>

                            {result.legal_status === 'prohibited' && (
                              <div className="flex items-start space-x-2 p-2 bg-red-50 rounded-lg">
                                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                                <div className="text-sm text-red-700">
                                  <strong>Protected Species:</strong> Capture prohibited under marine conservation laws
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DNASearch;