import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { Search, Upload, Image, Fish, TreePine, MapPin, Ruler, Weight, Camera, CheckCircle, ChevronsUpDown } from 'lucide-react';
import { taxonomyData } from '../data/mockData';
import { toast } from '../hooks/use-toast';
import { motion } from 'framer-motion';

const TaxonomySearch = () => {
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [otolithImage, setOtolithImage] = useState(null);
  const [otolithResult, setOtolithResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [open, setOpen] = useState(false);

  const allSpecies = [
    ...taxonomyData,
    { species: 'Rastrelliger kanagurta', common_name: 'Indian Mackerel' },
    { species: 'Decapterus russelli', common_name: 'Indian Scad' },
    { species: 'Stolephorus commersonnii', common_name: "Commerson's Anchovy" },
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
      title: "Species Selected",
      description: `Displaying information for ${selectedData.common_name}`,
    });
  };

  const handleOtolithUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setOtolithImage(file);
      toast({
        title: "Image Ready",
        description: "Otolith image uploaded and ready for analysis.",
      });
    }
  };

  const analyzeOtolith = async () => {
    if (!otolithImage) {
      toast({ title: "No Image", description: "Please upload an otolith image.", variant: "destructive" });
      return;
    }

    setIsAnalyzing(true);
    setOtolithResult(null);
    
    setTimeout(() => {
      setOtolithResult({
        species: 'Thunnus albacares',
        common_name: 'Yellowfin Tuna',
        confidence: 87.3,
        age_estimate: '3-4 years',
        growth_pattern: 'Normal',
        additional_info: 'Specimen shows clear growth rings, indicating stable environmental conditions.'
      });
      setIsAnalyzing(false);
      toast({ title: "Analysis Complete", description: "Otolith classification results are available." });
    }, 3000);
  };

  const getConservationColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'least concern': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'near threatened': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'vulnerable': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300';
      case 'endangered': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-blue-950 dark:via-black dark:to-blue-950 pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Taxonomy & Otolith Analysis</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Explore species data and leverage AI for otolith-based identification.</p>
        </motion.div>

        <Tabs defaultValue="taxonomy" className="space-y-8">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 lg:w-fit mx-auto bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg p-2 rounded-full border-gray-200/50 dark:border-gray-700/50">
            <TabsTrigger value="taxonomy" className="flex items-center space-x-2 rounded-full"><TreePine className="h-5 w-5" /><span>Taxonomy Search</span></TabsTrigger>
            <TabsTrigger value="otolith" className="flex items-center space-x-2 rounded-full"><Camera className="h-5 w-5" /><span>Otolith Analysis</span></TabsTrigger>
          </TabsList>

          <TabsContent value="taxonomy">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <Card className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <CardHeader><CardTitle>Species Database Search</CardTitle></CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Find a Species</Label>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                            {selectedSpecies ? selectedSpecies.common_name : "Select a species..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0">
                          <Command>
                            <CommandInput placeholder="Search species..." />
                            <CommandList>
                              <CommandEmpty>No species found.</CommandEmpty>
                              <CommandGroup>
                                {allSpecies.map((s) => (
                                  <CommandItem key={s.species} value={s.species} onSelect={() => handleSpeciesSelect(s.species)}>
                                    {s.common_name} <em className="ml-2 text-gray-500 text-xs">({s.species})</em>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-2">Popular Searches</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Thunnus albacares', 'Katsuwonus pelamis', 'Rastrelliger kanagurta'].map((s) => (
                          <Button key={s} variant="outline" size="sm" onClick={() => handleSpeciesSelect(s)}>{allSpecies.find(sp=>sp.species===s)?.common_name}</Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div className="lg:col-span-2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                {selectedSpecies ? (
                  <Card className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-2xl text-blue-700 dark:text-blue-400"><em>{selectedSpecies.species}</em></CardTitle>
                          <p className="text-lg text-gray-700 dark:text-gray-300">{selectedSpecies.common_name}</p>
                        </div>
                        <Badge className={`${getConservationColor(selectedSpecies.conservation_status)} text-sm`}>{selectedSpecies.conservation_status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <InfoCard icon={MapPin} title="Habitat & Distribution" data={{ Habitat: selectedSpecies.habitat, Distribution: selectedSpecies.distribution }} />
                          <InfoCard icon={Ruler} title="Physical Characteristics" data={{ "Max Length": selectedSpecies.max_length, "Max Weight": selectedSpecies.max_weight }} />
                        </div>
                        <div className="space-y-4">
                          <InfoCard icon={Fish} title="Ecological Role" data={{ Diet: selectedSpecies.diet, "Trophic Level": "Varies" }} />
                          <div className="bg-blue-50/50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200/50 dark:border-blue-800/50">
                            <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Key Facts</h4>
                            <ul className="space-y-1 text-sm">
                              <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500"/>High commercial importance</li>
                              <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500"/>Popular recreational fish</li>
                              <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500"/>Migratory species</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center py-16">
                      <TreePine className="h-20 w-20 mx-auto text-gray-400 dark:text-gray-500 mb-6" />
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Select a Species</h3>
                      <p className="text-gray-500 dark:text-gray-400 max-w-sm">Use the search to access detailed taxonomic and ecological information.</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="otolith">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <Card className="bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <CardHeader><CardTitle>AI Otolith Analysis</CardTitle></CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Upload Otolith Image</Label>
                      <label htmlFor="otolith-upload" className="mt-2 flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50/50 dark:bg-gray-800/40 hover:bg-gray-100/50 dark:hover:bg-gray-700/40 transition-colors">
                        {otolithImage ? <img src={URL.createObjectURL(otolithImage)} alt="Otolith preview" className="h-full w-full object-cover rounded-lg"/> : <><Upload className="w-8 h-8 mb-2 text-gray-500" /><p className="text-sm text-gray-500">Click to upload</p><p className="text-xs text-gray-500">JPG, PNG, TIFF</p></>}
                        <input id="otolith-upload" type="file" className="hidden" accept=".jpg,.jpeg,.png,.tiff" onChange={handleOtolithUpload} />
                      </label>
                    </div>
                    <Button onClick={analyzeOtolith} className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isAnalyzing || !otolithImage}>{isAnalyzing ? "Analyzing..." : "Analyze Otolith Image"}</Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
                <Card className="h-full bg-white/60 dark:bg-gray-900/40 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                  <CardHeader><CardTitle>Analysis Results</CardTitle></CardHeader>
                  <CardContent>
                    {isAnalyzing ? (
                      <div className="flex items-center justify-center h-full"><p>Analyzing image...</p></div>
                    ) : otolithResult ? (
                      <div className="space-y-4">
                        <div className="text-center p-4 bg-green-100/50 dark:bg-green-900/30 rounded-lg border border-green-200/50 dark:border-green-800/50">
                          <CheckCircle className="h-8 w-8 mx-auto text-green-600 mb-2" />
                          <h3 className="text-lg font-medium text-green-800 dark:text-green-200">Analysis Complete</h3>
                          <Badge variant="secondary" className="mt-2">{otolithResult.confidence}% confidence</Badge>
                        </div>
                        <InfoCard icon={Fish} title="Identified Species" data={{ Species: <em>{otolithResult.species}</em>, "Common Name": otolithResult.common_name }} />
                        <InfoCard icon={Ruler} title="Growth & Age" data={{ "Age Estimate": otolithResult.age_estimate, "Growth Pattern": otolithResult.growth_pattern }} />
                        <div>
                          <h4 className="font-semibold mb-1 text-gray-800 dark:text-gray-200">AI Notes</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{otolithResult.additional_info}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-16 h-full flex flex-col items-center justify-center">
                        <Camera className="h-20 w-20 mx-auto text-gray-400 dark:text-gray-500 mb-6" />
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Awaiting Image</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm">Upload an otolith image to begin AI-powered analysis.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, title, data }) => {
  const Icon = icon;
  return (
    <div className="bg-gray-50/50 dark:bg-gray-800/40 p-4 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
      <h4 className="font-semibold mb-2 flex items-center text-gray-800 dark:text-gray-200"><Icon className="h-4 w-4 mr-2 text-blue-500" />{title}</h4>
      <div className="space-y-1 text-sm">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">{key}:</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaxonomySearch;
