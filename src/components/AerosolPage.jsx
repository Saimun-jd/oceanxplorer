import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const AerosolPage = () => {
  const navigate = useNavigate();

  const goToNextPage = () => {
    navigate("/cloud");
  };

  return (
    <div className="relative min-h-screen bg-blue-200">
      <div className="p-8 pb-20"> {/* Added bottom padding to prevent content from being hidden behind the button */}
        <h1 className="text-4xl font-bold text-center text-green-800 mb-12">
          Understanding Aerosol
        </h1>
        
        <div className="container mx-auto flex flex-col md:flex-row items-start justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="/aerosol.jpg"
              alt="Phytoplankton"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4 font-mono">
              What is Aerosol?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-mono">
              An aerosol is a suspension of tiny particles or droplets in a gas, typically the Earth's atmosphere. These particles can be either solid, such as dust, pollen, and soot, or liquid, like water droplets or chemical compounds. Aerosols come from both natural sources, such as volcanic eruptions, sea spray, and forest fires, and human activities, including vehicle emissions, industrial processes, and the burning of fossil fuels. They play a significant role in atmospheric chemistry and climate by influencing cloud formation, scattering and absorbing sunlight, and affecting air quality. Depending on their composition, aerosols can have both cooling and warming effects on the planet. While they reflect sunlight back into space, potentially cooling the Earth's surface, they can also absorb heat, contributing to atmospheric warming. In addition to their climatic impact, aerosols can pose health risks when inhaled, leading to respiratory and cardiovascular issues.
            </p>
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 right-4 z-10">
        <button 
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200"
          onClick={goToNextPage}
          aria-label="Go to next page"
        >
          <ArrowForwardIcon />
        </button>
      </div>
    </div>
  );
};

export default AerosolPage;
