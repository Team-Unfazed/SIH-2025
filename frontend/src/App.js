import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import DNASearch from "./pages/DNASearch";
import TaxonomySearch from "./pages/TaxonomySearch";
import AIAssistant from "./pages/AIAssistant";
import MarineDigitalTwin from "./pages/MarineDigitalTwin";
import Documentation from "./pages/Documentation";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dna-search" element={<DNASearch />} />
            <Route path="/taxonomy" element={<TaxonomySearch />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/digital-twin" element={<MarineDigitalTwin />} />
            <Route path="/docs" element={<Documentation />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;