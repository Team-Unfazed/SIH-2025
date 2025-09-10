// Mock data for the Marine AI Platform

export const oceanographicData = {
  temperature: [
    { date: '2024-01', bay_of_bengal: 28.5, arabian_sea: 27.2, indian_ocean: 26.8 },
    { date: '2024-02', bay_of_bengal: 29.1, arabian_sea: 27.8, indian_ocean: 27.3 },
    { date: '2024-03', bay_of_bengal: 30.2, arabian_sea: 28.5, indian_ocean: 28.1 },
    { date: '2024-04', bay_of_bengal: 31.0, arabian_sea: 29.2, indian_ocean: 28.9 },
    { date: '2024-05', bay_of_bengal: 30.8, arabian_sea: 28.9, indian_ocean: 28.7 },
    { date: '2024-06', bay_of_bengal: 29.5, arabian_sea: 28.1, indian_ocean: 27.8 }
  ],
  
  salinity: [
    { date: '2024-01', bay_of_bengal: 33.5, arabian_sea: 36.2, indian_ocean: 35.1 },
    { date: '2024-02', bay_of_bengal: 33.8, arabian_sea: 36.5, indian_ocean: 35.3 },
    { date: '2024-03', bay_of_bengal: 34.1, arabian_sea: 36.8, indian_ocean: 35.6 },
    { date: '2024-04', bay_of_bengal: 34.3, arabian_sea: 37.0, indian_ocean: 35.8 },
    { date: '2024-05', bay_of_bengal: 34.0, arabian_sea: 36.7, indian_ocean: 35.5 },
    { date: '2024-06', bay_of_bengal: 33.7, arabian_sea: 36.4, indian_ocean: 35.2 }
  ],

  chlorophyll: [
    { date: '2024-01', bay_of_bengal: 2.1, arabian_sea: 1.8, indian_ocean: 1.5 },
    { date: '2024-02', bay_of_bengal: 2.3, arabian_sea: 2.0, indian_ocean: 1.7 },
    { date: '2024-03', bay_of_bengal: 2.8, arabian_sea: 2.5, indian_ocean: 2.1 },
    { date: '2024-04', bay_of_bengal: 3.2, arabian_sea: 2.9, indian_ocean: 2.4 },
    { date: '2024-05', bay_of_bengal: 2.9, arabian_sea: 2.6, indian_ocean: 2.2 },
    { date: '2024-06', bay_of_bengal: 2.4, arabian_sea: 2.1, indian_ocean: 1.8 }
  ]
};

export const fishStockData = [
  { species: 'Tuna', current_stock: 85, predicted_2025: 78, predicted_2030: 72, status: 'declining' },
  { species: 'Sardine', current_stock: 92, predicted_2025: 95, predicted_2030: 98, status: 'stable' },
  { species: 'Mackerel', current_stock: 67, predicted_2025: 63, predicted_2030: 58, status: 'declining' },
  { species: 'Pomfret', current_stock: 78, predicted_2025: 82, predicted_2030: 85, status: 'improving' },
  { species: 'Hilsa', current_stock: 45, predicted_2025: 42, predicted_2030: 38, status: 'critical' },
  { species: 'Prawn', current_stock: 88, predicted_2025: 90, predicted_2030: 93, status: 'stable' }
];

export const biodiversityData = [
  { region: 'Bay of Bengal', species_count: 1250, endemic_species: 180, threatened_species: 95, biodiversity_index: 0.82 },
  { region: 'Arabian Sea', species_count: 980, endemic_species: 145, threatened_species: 78, biodiversity_index: 0.75 },
  { region: 'Lakshadweep Sea', species_count: 850, endemic_species: 120, threatened_species: 52, biodiversity_index: 0.88 },
  { region: 'Andaman Sea', species_count: 1150, endemic_species: 200, threatened_species: 85, biodiversity_index: 0.85 }
];

export const sustainabilityMetrics = {
  overall_index: 6.8,
  fishing_pressure: 7.2,
  habitat_quality: 6.5,
  pollution_levels: 6.9,
  climate_impact: 6.4,
  conservation_efforts: 7.5
};

export const fishingZones = [
  {
    id: 1,
    name: 'Zone A - Bay of Bengal North',
    coordinates: { lat: 20.5937, lng: 78.9629 },
    status: 'optimal',
    fish_density: 85,
    recommended_species: ['Hilsa', 'Pomfret', 'Mackerel'],
    weather_conditions: 'favorable',
    restrictions: 'none'
  },
  {
    id: 2,
    name: 'Zone B - Arabian Sea West',
    coordinates: { lat: 19.0760, lng: 72.8777 },
    status: 'moderate',
    fish_density: 65,
    recommended_species: ['Tuna', 'Sardine'],
    weather_conditions: 'moderate',
    restrictions: 'seasonal_limit'
  },
  {
    id: 3,
    name: 'Zone C - Tamil Nadu Coast',
    coordinates: { lat: 11.1271, lng: 78.6569 },
    status: 'restricted',
    fish_density: 35,
    recommended_species: ['Prawn'],
    weather_conditions: 'rough',
    restrictions: 'breeding_season'
  }
];

export const dnaSearchResults = [
  {
    id: 1,
    sequence_id: 'SEQ001',
    species_name: 'Thunnus albacares',
    common_name: 'Yellowfin Tuna',
    confidence: 95.8,
    taxonomy: {
      kingdom: 'Animalia',
      phylum: 'Chordata',
      class: 'Actinopterygii',
      order: 'Perciformes',
      family: 'Scombridae',
      genus: 'Thunnus',
      species: 'T. albacares'
    },
    legal_status: 'regulated',
    conservation_status: 'Near Threatened',
    biodiversity_role: 'Apex predator, important for marine ecosystem balance'
  },
  {
    id: 2,
    sequence_id: 'SEQ002',
    species_name: 'Sardinella longiceps',
    common_name: 'Indian Oil Sardine',
    confidence: 98.2,
    taxonomy: {
      kingdom: 'Animalia',
      phylum: 'Chordata',
      class: 'Actinopterygii',
      order: 'Clupeiformes',
      family: 'Clupeidae',
      genus: 'Sardinella',
      species: 'S. longiceps'
    },
    legal_status: 'open',
    conservation_status: 'Least Concern',
    biodiversity_role: 'Key forage fish, supports marine food web'
  }
];

export const taxonomyData = [
  {
    species: 'Thunnus albacares',
    common_name: 'Yellowfin Tuna',
    habitat: 'Pelagic, tropical and subtropical waters',
    distribution: 'Indo-Pacific, Atlantic Ocean',
    max_length: '2.4m',
    max_weight: '200kg',
    diet: 'Fish, squid, crustaceans',
    conservation_status: 'Near Threatened'
  },
  {
    species: 'Katsuwonus pelamis',
    common_name: 'Skipjack Tuna',
    habitat: 'Epipelagic waters',
    distribution: 'Worldwide in tropical waters',
    max_length: '1.0m',
    max_weight: '34kg',
    diet: 'Small fish, squid, crustaceans',
    conservation_status: 'Least Concern'
  }
];

export const aiConversations = [
  {
    id: 1,
    timestamp: '2024-07-15 10:30:00',
    user_query: 'Show biodiversity trends in Bay of Bengal since 2020',
    ai_response: 'Based on the latest data, the Bay of Bengal has shown a 12% decline in overall biodiversity since 2020. Key findings include:\n\n• Species count decreased from 1,420 to 1,250\n• Endemic species reduced by 8%\n• Threatened species increased by 15%\n• Main drivers: climate change, overfishing, and pollution\n\nI recommend focusing conservation efforts on critical habitats and implementing stronger fishing regulations.',
    follow_up_questions: [
      'What specific species are most at risk?',
      'Show me the pollution impact data',
      'What conservation measures are currently in place?'
    ]
  },
  {
    id: 2,
    timestamp: '2024-07-15 14:45:00',
    user_query: 'Predict tuna stocks in 2035 if ocean warms by 2°C',
    ai_response: 'Climate modeling indicates significant impacts on tuna populations with a 2°C warming scenario:\n\n• Yellowfin Tuna: 35-40% population decline\n• Skipjack Tuna: 25-30% range shift northward\n• Bluefin Tuna: 45-50% reduction in suitable habitat\n\nMitigating factors include:\n- Adaptive management strategies\n- Marine protected areas expansion\n- Sustainable fishing quotas\n\nImmediate action is crucial to prevent irreversible population collapse.',
    follow_up_questions: [
      'What about other fish species?',
      'Show me the temperature change maps',
      'What adaptation strategies work best?'
    ]
  }
];

export const digitalTwinScenarios = [
  {
    id: 'current',
    name: 'Current State (2024)',
    year: 2024,
    temperature_change: 0,
    sea_level_rise: 0,
    fish_stock_health: 72,
    biodiversity_index: 0.78,
    coral_cover: 65,
    pollution_level: 45
  },
  {
    id: 'scenario_1',
    name: 'Conservative Climate (2035)',
    year: 2035,
    temperature_change: 1.2,
    sea_level_rise: 15,
    fish_stock_health: 68,
    biodiversity_index: 0.74,
    coral_cover: 58,
    pollution_level: 42
  },
  {
    id: 'scenario_2',
    name: 'Moderate Impact (2035)',
    year: 2035,
    temperature_change: 2.0,
    sea_level_rise: 25,
    fish_stock_health: 55,
    biodiversity_index: 0.65,
    coral_cover: 45,
    pollution_level: 48
  },
  {
    id: 'scenario_3',
    name: 'High Impact (2035)',
    year: 2035,
    temperature_change: 3.2,
    sea_level_rise: 40,
    fish_stock_health: 38,
    biodiversity_index: 0.52,
    coral_cover: 28,
    pollution_level: 62
  }
];

export const researcherData = {
  datasets: [
    { name: 'Oceanographic Time Series', records: 2500000, last_updated: '2024-07-15' },
    { name: 'Fish Stock Assessments', records: 45000, last_updated: '2024-07-14' },
    { name: 'Biodiversity Surveys', records: 180000, last_updated: '2024-07-13' },
    { name: 'Water Quality Measurements', records: 890000, last_updated: '2024-07-15' },
    { name: 'Genetic Sequences', records: 125000, last_updated: '2024-07-12' }
  ],
  recent_publications: [
    { title: 'Climate Impact on Marine Biodiversity in the Indian Ocean', journal: 'Marine Biology', date: '2024-06-15' },
    { title: 'Sustainable Fisheries Management Using AI', journal: 'Fisheries Research', date: '2024-05-20' },
    { title: 'Molecular Markers for Species Identification', journal: 'Marine Genomics', date: '2024-04-10' }
  ]
};

export const policymakerData = {
  sustainability_scores: {
    'Tamil Nadu': 7.2,
    'Kerala': 8.1,
    'Karnataka': 6.8,
    'Goa': 7.5,
    'Maharashtra': 6.9,
    'Gujarat': 6.5,
    'Odisha': 7.0,
    'West Bengal': 6.2,
    'Andhra Pradesh': 6.7
  },
  risk_zones: [
    { region: 'Sundarbans', risk_level: 'high', factors: ['sea level rise', 'cyclones', 'pollution'] },
    { region: 'Kerala Coast', risk_level: 'medium', factors: ['erosion', 'overfishing'] },
    { region: 'Gujarat Coast', risk_level: 'high', factors: ['pollution', 'industrial waste'] }
  ],
  policy_recommendations: [
    {
      priority: 'high',
      title: 'Expand Marine Protected Areas',
      description: 'Increase protected area coverage by 30% by 2030',
      expected_impact: 'Biodiversity recovery, fish stock improvement'
    },
    {
      priority: 'medium',
      title: 'Implement Smart Fishing Quotas',
      description: 'AI-driven dynamic quota system based on real-time stock assessments',
      expected_impact: 'Sustainable fishing, reduced overfishing'
    }
  ]
};