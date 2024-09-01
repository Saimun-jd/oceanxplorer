import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CloudPage = () => {
  const navigate = useNavigate();

  const goToNextPage = () => {
    navigate("/ocean-environment");
  };

  return (
    <div className="relative min-h-screen bg-blue-200">
      <div className="p-8 pb-20"> {/* Added bottom padding to prevent content from being hidden behind the button */}
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-12 font-newamsterdam">
          Understanding Cloud
        </h1>
        
        <div className="container mx-auto flex flex-col md:flex-row items-start justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="/cloud.jpg"
              alt="Phytoplankton"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-blue-700 mb-4 font-mono">
              What is Cloud?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-mono">
              A cloud is a visible mass of tiny water droplets or ice crystals suspended in the Earth's atmosphere. Formed when moist, warm air rises and cools, clouds play a crucial role in regulating the Earth's climate and weather patterns. They come in various shapes and sizes, ranging from fluffy cumulus clouds to high-altitude cirrus clouds that resemble delicate wisps. Clouds are not only beautiful natural phenomena but also vital components of the water cycle, providing precipitation that sustains life on the planet. Moreover, they reflect and absorb sunlight, influencing the Earth's energy balance and helping maintain a habitable environment.
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

export default CloudPage;
