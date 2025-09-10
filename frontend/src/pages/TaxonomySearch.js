import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Search, Upload, Image, Fish, TreePine, MapPin, Ruler, Weight, Camera, CheckCircle } from 'lucide-react';
import { taxonomyData } from '../data/mockData';
import { toast } from '../hooks/use-toast';

const TaxonomySearch = () => {
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [otolithImage, setOtolithImage] = useState(null);
  const [otolithResult, setOtolithResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [open, setOpen] = useState(false);

  const allSpecies = [
    ...taxonomyData,
    { species: 'Rastrelliger kanagurta', common_name: 'Indian Mackerel' },
    { species: 'Decapterus russelli', common_name: 'Indian Scad' },
    { species: 'Stolephorus commersonnii', common_name: 'Commerson\'s Anchovy' },
    { species: 'Auxis thazard', common_name: 'Frigate Tuna' },
    { species: 'Selar crumenophthalmus', common_name: 'Bigeye Scad' }
  ];

  const handleSpeciesSelect = (species) => {
    const selectedData = taxonomyData.find(s => s.species === species) || {
      species: species,
      common_name: allSpecies.find(s => s.species === species)?.common_name || 'Unknown',
      habitat: 'Marine waters',
      distribution: 'Indo-Pacific region',
      max_length: 'Variable',
      max_weight: 'Variable',
      diet: 'Omnivorous',
      conservation_status: 'Data Deficient'
    };
    
    setSelectedSpecies(selectedData);
    setOpen(false);
    
    toast({
      title: "Species selected",
      description: `Information loaded for ${selectedData.common_name}`,
    });
  };

  const handleOtolithUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setOtolithImage(file);
      toast({
        title: "Image uploaded",
        description: "Otolith image ready for analysis",
      });
    }
  };

  const analyzeOtolith = async () => {
    if (!otolithImage) {
      toast({
        title: "No image selected",
        description: "Please upload an otolith image first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setOtolithResult({
        species: 'Thunnus albacares',
        common_name: 'Yellowfin Tuna',
        confidence: 87.3,
        age_estimate: '3-4 years',
        growth_pattern: 'Normal',
        additional_info: 'Healthy specimen with clear growth rings indicating good environmental conditions'
      });
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete",
        description: "Otolith classification results are ready",
      });
    }, 3000);
  };

  const getConservationColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'least concern': return 'bg-green-100 text-green-800';
      case 'near threatened': return 'bg-yellow-100 text-yellow-800';
      case 'vulnerable': return 'bg-orange-100 text-orange-800';
      case 'endangered': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Taxonomy & Otolith Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Search marine species information and analyze otolith images for species identification
          </p>
        </div>

        <Tabs defaultValue="taxonomy" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-fit">
            <TabsTrigger value="taxonomy" className="flex items-center space-x-2">
              <TreePine className="h-4 w-4" />
              <span>Taxonomy Search</span>
            </TabsTrigger>
            <TabsTrigger value="otolith" className="flex items-center space-x-2">
              <Camera className="h-4 w-4" />
              <span>Otolith Analysis</span>
            </TabsTrigger>
          </TabsList>

          {/* Taxonomy Search Tab */}
          <TabsContent value="taxonomy">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Search Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Species Search</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Search Species</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <Search className="mr-2 h-4 w-4" />
                          {selectedSpecies ? selectedSpecies.species : "Select species..."}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-0">
                        <Command>
                          <CommandInput placeholder="Search species..." />
                          <CommandEmpty>No species found.</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {allSpecies.map((species) => (
                                <CommandItem
                                  key={species.species}
                                  value={species.species}
                                  onSelect={() => handleSpeciesSelect(species.species)}
                                >
                                  <div>
                                    <div className="font-medium">{species.common_name}</div>
                                    <div className="text-sm text-gray-500 italic">{species.species}</div>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Popular Searches</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Thunnus albacares', 'Katsuwonus pelamis', 'Rastrelliger kanagurta'].map((species) => (
                        <Button
                          key={species}
                          variant="outline"
                          size="sm"
                          onClick={() => handleSpeciesSelect(species)}
                        >
                          {species.split(' ')[0]}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Species Information */}
              <div className="lg:col-span-2">
                {selectedSpecies ? (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-2xl">
                            <em>{selectedSpecies.species}</em>
                          </CardTitle>
                          <p className="text-lg text-gray-600 dark:text-gray-400">
                            {selectedSpecies.common_name}
                          </p>
                        </div>
                        <Badge className={getConservationColor(selectedSpecies.conservation_status)}>
                          {selectedSpecies.conservation_status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Information */}
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2 flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              Habitat & Distribution
                            </h4>
                            <div className="space-y-2 text-sm">
                              <p><strong>Habitat:</strong> {selectedSpecies.habitat}</p>
                              <p><strong>Distribution:</strong> {selectedSpecies.distribution}</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2 flex items-center">
                              <Ruler className="h-4 w-4 mr-2" />
                              Physical Characteristics
                            </h4>
                            <div className="space-y-2 text-sm">
                              <p><strong>Max Length:</strong> {selectedSpecies.max_length}</p>
                              <p><strong>Max Weight:</strong> {selectedSpecies.max_weight}</p>
                            </div>
                          </div>
                        </div>

                        {/* Ecological Information */}
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2 flex items-center">
                              <Fish className="h-4 w-4 mr-2" />
                              Ecological Role
                            </h4>
                            <div className="space-y-2 text-sm">
                              <p><strong>Diet:</strong> {selectedSpecies.diet}</p>
                              <p><strong>Trophic Level:</strong> Secondary/Tertiary Consumer</p>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Additional Information</h4>
                            <div className="text-sm space-y-1">
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>Commercial fishing importance: High</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>Recreational fishing target: Yes</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>Migratory species: Yes</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Image Placeholder */}
                      <div className="mt-6 bg-blue-50 dark:bg-blue-900 rounded-lg p-8 text-center">
                        <Image className="h-16 w-16 mx-auto text-blue-600 mb-4" />
                        <p className="text-lg font-medium mb-2">Species Image Gallery</p>
                        <p className="text-gray-600 dark:text-gray-400">
                          High-resolution images and identification guides will be displayed here
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="h-96 flex items-center justify-center">
                    <CardContent className="text-center">
                      <Fish className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        Select a Species
                      </h3>
                      <p className="text-gray-500">
                        Use the search box to find detailed taxonomic and ecological information
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Otolith Analysis Tab */}
          <TabsContent value="otolith">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Upload Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Otolith Image Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Upload Otolith Image</Label>
                    <div className="mt-2">
                      <label
                        htmlFor="otolith-upload"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-gray-500" />
                          <p className="text-sm text-gray-500">
                            Click to upload otolith image
                          </p>
                          <p className="text-xs text-gray-500">
                            JPG, PNG, TIFF (MAX. 5MB)
                          </p>
                        </div>
                        <input
                          id="otolith-upload"
                          type="file"
                          className="hidden"
                          accept=".jpg,.jpeg,.png,.tiff"
                          onChange={handleOtolithUpload}
                        />
                      </label>
                    </div>
                    {otolithImage && (
                      <div className="mt-2 p-2 bg-blue-50 rounded-lg flex items-center space-x-2">
                        <Image className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-700">{otolithImage.name}</span>
                      </div>
                    )}
                  </div>

                  <Button 
                    onClick={analyzeOtolith} 
                    className="w-full"
                    disabled={isAnalyzing || !otolithImage}
                  >
                    {isAnalyzing ? (
                      <>
                        <Camera className="mr-2 h-4 w-4 animate-pulse" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Camera className="mr-2 h-4 w-4" />
                        Analyze Otolith
                      </>
                    )}
                  </Button>

                  <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                    <h4 className="font-medium mb-2">What is Otolith Analysis?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Otoliths are calcium carbonate structures in fish ears that grow throughout their lives. 
                      They contain valuable information about species identification, age, and growth patterns.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Results Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Analysis Results</CardTitle>
                </CardHeader>
                <CardContent>
                  {otolithResult ? (
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                        <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
                        <h3 className="text-lg font-medium text-green-800 dark:text-green-200">
                          Analysis Complete
                        </h3>
                        <Badge variant="secondary" className="mt-2">
                          {otolithResult.confidence}% confidence
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium">Identified Species</h4>
                          <p className="text-lg">
                            <em>{otolithResult.species}</em>
                          </p>
                          <p className="text-gray-600">{otolithResult.common_name}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-sm">Age Estimate</h5>
                            <p className="text-lg">{otolithResult.age_estimate}</p>
                          </div>
                          <div>
                            <h5 className="font-medium text-sm">Growth Pattern</h5>
                            <p className="text-lg">{otolithResult.growth_pattern}</p>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-sm mb-1">Additional Information</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {otolithResult.additional_info}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Camera className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                        No Analysis Yet
                      </h3>
                      <p className="text-gray-500">
                        Upload an otolith image to begin AI-powered species identification
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TaxonomySearch;