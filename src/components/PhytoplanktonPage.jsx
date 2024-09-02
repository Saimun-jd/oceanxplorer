import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Custom hook for intersection observer
const useIntersectionObserver = (callback, threshold = 0.5) => {
  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              callback(entry);
            }
          });
        },
        { threshold }
      ),
    [callback, threshold]
  );

  const observe = useCallback(
    (element) => {
      if (element) observer.observe(element);
    },
    [observer]
  );

  return observe;
};

// Background component
const Background = ({ imageUrl }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 2, ease: "easeInOut" }}
    className="fixed inset-0 bg-cover bg-center z-0"
    style={{ backgroundImage: `url(${imageUrl})` }}
  />
);

// Section component
const Section = ({ id, content, setActiveSection }) => {
  const observe = useIntersectionObserver(
    (entry) => setActiveSection(parseInt(entry.target.id.split('section')[1]) - 1)
  );

  return (
    <motion.section
      ref={observe}
      id={`section${id}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="h-screen flex items-center justify-center p-8 relative z-10"
    >
      <div className="max-w-4xl mx-auto bg-white bg-opacity-80 p-8 rounded-lg">
        {content}
      </div>
    </motion.section>
  );
};

// Main component
const PhytoplanktonPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);

  const goToNextPage = () => navigate("/aerosol");

  const backgroundImages = [
    "/phyto1.jpg",
    "/phyto2.jpg",
    "/phyto3.jpg"
  ];

  const sectionContents = [
    (
      <>
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8 font-serif">
          The Wonderful World of Phytoplankton
        </h1>
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 font-sans">
          What are Phytoplankton?
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed font-sans">
          Phytoplankton are microscopic marine algae that form the foundation of aquatic food webs. These tiny organisms are capable of photosynthesis, which means they use sunlight to convert carbon dioxide and water into energy, just like plants on land.
        </p>
      </>
    ),
    (
      <>
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 font-sans">
          The Importance of Phytoplankton
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed font-sans">
          Phytoplankton play a crucial role in our planet's ecosystem. They are responsible for producing about half of the world's oxygen, making them as important as all land plants combined in maintaining the Earth's atmosphere. Additionally, they serve as the primary food source for many aquatic creatures, from microscopic zooplankton to massive whales.
        </p>
      </>
    ),
    (
      <>
        <h2 className="text-3xl font-semibold text-blue-700 mb-6 font-sans">
          Phytoplankton and Climate
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed font-sans">
          Beyond their role in oxygen production and the food chain, phytoplankton are key players in global climate regulation. They absorb enormous amounts of carbon dioxide from the atmosphere, helping to mitigate the effects of climate change. The health and distribution of phytoplankton populations can serve as indicators of broader changes in our oceans and climate.
        </p>
      </>
    )
  ];

  return (
    <div className="relative">
      <AnimatePresence>
        <Background key={activeSection} imageUrl={backgroundImages[activeSection]} />
      </AnimatePresence>

      {sectionContents.map((content, index) => (
        <Section
          key={index}
          id={index + 1}
          content={content}
          setActiveSection={setActiveSection}
        />
      ))}

      <motion.div
        className="fixed bottom-4 right-4 z-20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button 
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
          onClick={goToNextPage}
          aria-label="Go to next page"
        >
          <span className="mr-2">Next</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </motion.div>

      <div className="fixed top-4 right-4 z-20">
        <p className="text-white bg-black bg-opacity-50 px-3 py-1 rounded">
          Section {activeSection + 1} of {sectionContents.length}
        </p>
      </div>
    </div>
  );
};

export default PhytoplanktonPage;