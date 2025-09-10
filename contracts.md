# Marine AI Platform - Backend Integration Contracts

## Overview
This document outlines the API contracts, data integration points, and backend implementation requirements for the Marine AI Intelligence Platform built for SIH 2025.

## 🎯 Core Backend APIs Required

### 1. Ocean Data API
**Endpoint:** `/api/ocean-data`
**Methods:** GET
**Purpose:** Retrieve oceanographic measurements (temperature, salinity, chlorophyll)

**Request Parameters:**
- `region` (string): Bay of Bengal, Arabian Sea, Indian Ocean
- `date_range` (string): Start and end dates
- `metric` (string): temperature, salinity, chlorophyll

**Mock Data Location:** `mockData.js -> oceanographicData`
**Frontend Integration:** Dashboard.js - Oceanographic Variables chart
**Response Format:**
```json
{
  "data": [
    {
      "date": "2024-01",
      "bay_of_bengal": 28.5,
      "arabian_sea": 27.2,
      "indian_ocean": 26.8
    }
  ]
}
```

### 2. DNA/eDNA Analysis API
**Endpoint:** `/api/dna-search`
**Methods:** POST
**Purpose:** Species identification from genetic sequences

**Request Body:**
- `sequence_data` (string): Raw DNA sequence or file content
- `analysis_type` (string): species_identification, biodiversity_analysis

**Mock Data Location:** `mockData.js -> dnaSearchResults`
**Frontend Integration:** DNASearch.js - File upload and text input processing
**Response Format:**
```json
{
  "results": [
    {
      "species_name": "Thunnus albacares",
      "common_name": "Yellowfin Tuna",
      "confidence": 95.8,
      "taxonomy": {...},
      "legal_status": "regulated",
      "conservation_status": "Near Threatened"
    }
  ]
}
```

### 3. Fish Stock Prediction API
**Endpoint:** `/api/fish-prediction`
**Methods:** GET
**Purpose:** Fish stock assessments and future predictions

**Mock Data Location:** `mockData.js -> fishStockData`
**Frontend Integration:** Dashboard.js - Fish stock charts and predictions
**Response Format:**
```json
{
  "predictions": [
    {
      "species": "Tuna",
      "current_stock": 85,
      "predicted_2025": 78,
      "predicted_2030": 72,
      "status": "declining"
    }
  ]
}
```

### 4. **CRITICAL: Fishing Zones API (Your .pt Model Integration)**
**Endpoint:** `/api/fishing-zones`
**Methods:** POST
**Purpose:** AI-powered best fishing zone recommendations using your trained model

**Request Body:**
- `coordinates` (object): {lat, lng}
- `target_species` (array): List of desired fish species
- `weather_data` (object): Current weather conditions
- `date` (string): Target fishing date

**Mock Data Location:** `mockData.js -> fishingZones`
**Frontend Integration:** Dashboard.js - Fishermen tab, Best Fishing Zones map
**Your Model Integration:** Load and run your .pt file here for actual predictions
**Response Format:**
```json
{
  "zones": [
    {
      "id": 1,
      "name": "Zone A - Bay of Bengal North",
      "coordinates": {"lat": 20.5937, "lng": 78.9629},
      "status": "optimal",
      "fish_density": 85,
      "confidence_score": 0.92,
      "recommended_species": ["Hilsa", "Pomfret"]
    }
  ]
}
```

### 5. AI Assistant API
**Endpoint:** `/api/assistant`
**Methods:** POST
**Purpose:** Natural language query processing for marine insights

**Request Body:**
- `query` (string): User's natural language question
- `context` (string): Current user role (researcher, policymaker, fisherman)
- `session_id` (string): Conversation tracking

**Mock Data Location:** `mockData.js -> aiConversations`
**Frontend Integration:** AIAssistant.js - Chat interface with follow-up questions
**Response Format:**
```json
{
  "response": "Based on the latest data, the Bay of Bengal has shown...",
  "follow_up_questions": [
    "What specific species are most at risk?",
    "Show me the pollution impact data"
  ],
  "data_sources": ["ocean_temp_2024", "biodiversity_survey_2023"]
}
```

### 6. Sustainability Metrics API
**Endpoint:** `/api/sustainability-index`
**Methods:** GET
**Purpose:** Regional sustainability scores and policy recommendations

**Mock Data Location:** `mockData.js -> sustainabilityMetrics, policymakerData`
**Frontend Integration:** Dashboard.js - Policymakers tab
**Response Format:**
```json
{
  "overall_index": 6.8,
  "regional_scores": {...},
  "risk_zones": [...],
  "policy_recommendations": [...]
}
```

### 7. Taxonomy Search API
**Endpoint:** `/api/taxonomy`
**Methods:** GET
**Purpose:** Species information lookup and taxonomy data

**Mock Data Location:** `mockData.js -> taxonomyData`
**Frontend Integration:** TaxonomySearch.js - Species search and information display

### 8. Otolith Analysis API
**Endpoint:** `/api/otolith`
**Methods:** POST
**Purpose:** AI-powered otolith image classification

**Frontend Integration:** TaxonomySearch.js - Image upload and analysis

## 🔄 Frontend-Backend Integration Plan

### Phase 1: Replace Mock Data Calls
1. **Update API service file:** Create `/frontend/src/services/api.js`
2. **Replace mock imports** in all page components
3. **Add loading states** and error handling
4. **Implement data caching** for better performance

### Phase 2: Authentication & User Management
1. **Add user roles** (researcher, policymaker, fisherman)
2. **Session management** for AI assistant conversations
3. **API key management** for external integrations

### Phase 3: Real-time Features
1. **WebSocket integration** for live ocean data updates
2. **Push notifications** for fishing zone alerts
3. **Real-time collaboration** features

## 🚀 Your .pt Model Integration Priority

**HIGHEST PRIORITY:** The fishing zones API is critical for winning SIH 2025. Your trained model should be integrated at `/api/fishing-zones` to provide:

1. **Real-time fishing zone recommendations**
2. **Confidence scores for each zone**
3. **Species-specific predictions**
4. **Weather-adjusted recommendations**
5. **Historical performance data**

**Implementation Steps:**
1. Load your .pt model in the FastAPI backend
2. Create preprocessing pipeline for input data
3. Implement prediction endpoint with proper error handling
4. Add model performance metrics and logging
5. Connect to the frontend fishing zones interface

## 📊 Database Schema Requirements

### Tables Needed:
- `ocean_measurements` - Time-series oceanographic data
- `species_data` - Taxonomy and species information  
- `dna_sequences` - Genetic sequence database
- `fishing_zones` - Historical zone performance data
- `user_sessions` - AI assistant conversations
- `sustainability_metrics` - Policy and environmental indicators

## 🎯 Success Metrics for SIH 2025

1. **Functional completeness** - All 7 APIs working
2. **Real-time performance** - < 2s response times
3. **Model accuracy** - Your .pt model integration working
4. **User experience** - Smooth frontend-backend flow
5. **Demo readiness** - Comprehensive data and features

## 🔧 Implementation Priority Order

1. **Ocean Data API** (Dashboard foundation)
2. **Fishing Zones API** (Your unique advantage)
3. **DNA Search API** (Core feature)
4. **AI Assistant API** (Wow factor)
5. **Sustainability API** (Policymaker needs)
6. **Taxonomy API** (Research tools)
7. **Otolith API** (Advanced feature)

---

**Next Steps:** Start with Ocean Data API and Fishing Zones API to get the dashboard fully functional, then implement the DNA search and AI assistant for the complete experience!