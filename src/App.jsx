// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import PhytoplanktonPage from "./components/PhytoplanktonPage";
import AerosolPage from "./components/AerosolPage";
import CloudPage from "./components/CloudPage";
import OceanEnvironmentPage from "./components/OceanEnvironmentPage";
import PACESatelliteGuide from "./components/PACESatelliteGuide";
import InteractiveOceanEcosystem from "./components/InteractiveOceanEcosystem";
import ChlorophyllGlobe from "./components/ChlorophyllGlobe";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/paceguide" element={<PACESatelliteGuide/>}/>
        <Route path="/exploreocean" element={<InteractiveOceanEcosystem/>}/>
        <Route path="/phytoplankton" element={<PhytoplanktonPage />} />
        <Route path="/aerosol" element={<AerosolPage />} />
        <Route path="/cloud" element={<CloudPage />} />
        <Route path="/ocean-environment" element={<OceanEnvironmentPage />} />
        <Route path="/globe" element={<ChlorophyllGlobe />} />
      </Routes>
    </Router>
  );
}

export default App;
