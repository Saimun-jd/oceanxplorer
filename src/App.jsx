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
import FishMascot from "./components/FishMascot"
import HealthyOcean from "./components/HealthyOcean";
import SceneSelector from "./components/SceneSelector";
import UnhealthyOcean from "./components/UnhealthyOcean";
import Game from "./components/Game";
import PaceInsight from "./components/InsightPage";
import ScrollToTop from "./components/ScrollToTop";
import DataAccess from "./components/DataAccess";
import ImageUpload from "./components/ImageUpload";

function App() {

  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/paceguide" element={<PACESatelliteGuide/>}/>
        <Route path="/exploreocean" element={<InteractiveOceanEcosystem/>}/>
        <Route path="/phytoplankton" element={<PhytoplanktonPage />} />
        <Route path="/aerosol" element={<AerosolPage />} />
        <Route path="/cloud" element={<CloudPage />} />
        <Route path="/ocean-environment" element={<OceanEnvironmentPage />} />
        <Route path="/globe" element={<ChlorophyllGlobe />} />
        <Route path="/facts" element={<FishMascot/>}/>
        <Route path="/healthyocean" element={<HealthyOcean/>}/>
        <Route path="/unhealthyocean" element={<UnhealthyOcean/>}/>
        <Route path="/choosescene" element={<SceneSelector/>}/>
        <Route path="/game" element={<Game/>}/>
        <Route path="/insight" element={<PaceInsight/>}/>
        <Route path="/access_data" element={<DataAccess/>}/>
        <Route path="/analyze" element={<ImageUpload/>} />
        <Route path="*" element={<div>Error this page was not found</div>}/>
      </Routes>
    </Router>
  );
}

export default App;
