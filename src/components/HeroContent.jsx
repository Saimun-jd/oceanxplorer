import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { slideInFromLeft, slideInFromRight } from "../utils/motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const cards = [
  { id: 1, image: "/phytoplankton.jpg", backgroundImage: "/phytoplankton.jpg", link: "/phytoplankton", title: "Phytoplankton", description: "Microscopic marine algae." },
  { id: 2, image: "/aerosol.png", backgroundImage: "/aerosol.png", link: "/aerosol", title: "Aerosol", description: "Liquid drop in air" },
  { id: 3, image: "/cloud.jpg", backgroundImage: "/cloud.jpg", link: "/cloud", title: "Cloud", description: "Water droplets in the sky" },
  { id: 4, image: "/ocean.jpg", backgroundImage: "/ocean.jpg", link: "/ocean-environment", title: "Ocean Environment", description: "Vast body of saltwater" },
];

const HeroContent = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const navigate = useNavigate();
  

  useEffect(() => {
    const backgroundElement = document.getElementById("hero-background");
    if (backgroundElement) {
      backgroundElement.style.backgroundImage = `url(${cards[currentCard].backgroundImage})`;
    }
  }, [currentCard]);

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const handleExplore = () => {
    navigate(cards[currentCard].link);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-between min-h-screen pt-24 sm:pt-32 px-4 pb-8 md:p-8 lg:p-20 w-full z-[20] relative"
    >
      <motion.div
        variants={slideInFromLeft(0.6)}
        className="w-full text-white mb-8 md:mb-0"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight">
          Learn about NASA PACE SATELLITE
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl">
          98.3 minutes at an altitude of 676.5 km
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row items-center justify-center w-full my-8 md:my-0">
        <motion.div
          variants={slideInFromLeft(0.8)}
          className="flex flex-col items-start mb-8 md:mb-0 md:mr-8 lg:mr-20 w-full md:w-auto"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {cards[currentCard].title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-8">
            {cards[currentCard].description}
          </p>
          <motion.div
            variants={slideInFromLeft(1)}
            className="py-2 px-4 border-2 border-white text-center text-base sm:text-lg md:text-xl text-white cursor-pointer rounded-full flex items-center justify-center gap-2"
            onClick={handleExplore}
          >
            <span>E X P L O R E</span>
            <ArrowRight />
          </motion.div>
        </motion.div>

        <motion.div
          variants={slideInFromRight(0.6)}
          className="flex flex-col items-center justify-center relative"
        >
          <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px]">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                className="absolute top-0 left-0 w-full h-full cursor-pointer"
                initial={{ scale: 0, rotate: -10 }}
                animate={{
                  scale: index === currentCard ? 1 : 0.9,
                  rotate: index === currentCard ? 0 : -10,
                  zIndex: index === currentCard ? cards.length : cards.length - index
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between w-full mt-4">
            <button
              onClick={prevCard}
              className="bg-white bg-opacity-50 p-2 rounded-full"
            >
              <ChevronLeft className="text-black" />
            </button>
            <button
              onClick={nextCard}
              className="bg-white bg-opacity-50 p-2 rounded-full"
            >
              <ChevronRight className="text-black" />
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={slideInFromLeft(1.2)}
        className="flex flex-row justify-center items-start sm:space-x-4 md:space-x-8 space-y-4 sm:space-y-0 text-white mt-8 md:mt-0"
      >
        <NavLink to="https://pace.oceansciences.org/data.htm" className="text-base sm:text-lg md:text-xl">Access pace data</NavLink>
        <NavLink to="/aboutus" className="text-base sm:text-lg md:text-xl">About US</NavLink>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
