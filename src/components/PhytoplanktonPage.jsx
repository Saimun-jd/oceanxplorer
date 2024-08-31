import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PhytoplanktonPage = () => {
  const navigate = useNavigate();

  const goToNextPage = () => {
    navigate("/aerosol");
  };

  return (
    <div className="relative min-h-screen bg-green-200">
      <div className="p-8 pb-20"> {/* Added bottom padding to prevent content from being hidden behind the button */}
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-12 font-newamsterdam">
          Understanding Phytoplankton
        </h1>
        
        <div className="container mx-auto flex flex-col md:flex-row items-start justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="/phytoplankton.jpg"
              alt="Phytoplankton"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4 font-nerkoone">
              What are Phytoplankton?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-nerkoone">
              Phytoplankton are microscopic marine algae that form the foundation of aquatic food webs. These tiny organisms are capable of photosynthesis, which means they use sunlight to convert carbon dioxide and water into energy, just like plants on land. Phytoplankton are responsible for producing about half of the world's oxygen and serve as a crucial food source for many aquatic creatures, from tiny zooplankton to large whales. Their presence and abundance can indicate the health of an ecosystem and play a significant role in global carbon cycles and climate regulation. Phytoplankton are microscopic marine algae that form the foundation of aquatic food webs. These tiny organisms are capable of photosynthesis, which means they use sunlight to convert carbon dioxide and water into energy, just like plants on land. Phytoplankton are responsible for producing about half of the world's oxygen and serve as a crucial food source for many aquatic creatures, from tiny zooplankton to large whales. Their presence and abundance can indicate the health of an ecosystem and play a significant role in global carbon cycles and climate regulation.
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

export default PhytoplanktonPage;
