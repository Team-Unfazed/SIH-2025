import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import DNASearch from "./pages/DNASearch";
import TaxonomySearch from "./pages/TaxonomySearch";
import AIAssistant from "./pages/AIAssistant";
import MarineDigitalTwin from "./pages/MarineDigitalTwin";
import Documentation from "./pages/Documentation";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "./components/ui/toaster";

const AppContent = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/login';

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dna-search" element={<DNASearch />} />
        <Route path="/taxonomy" element={<TaxonomySearch />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/digital-twin" element={<MarineDigitalTwin />} />
        <Route path="/docs" element={<Documentation />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
