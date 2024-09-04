import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const satelliteComponents = [
  {
    name: 'Ocean Health',
    image: '/2.png',
    description: 'PACE tracks tiny plants called phytoplankton, crucial for marine life. It also spots changes and potential dangers like harmful algae blooms.',
    color: "bg-green-600"
  },
  {
    name: 'Natural Disaster',
    image: '/3.png',
    description: 'PACE helps scientists predict natural disasters like hurricanes and coastal flooding by monitoring ocean and atmospheric conditions.',
    color: "bg-yellow-400"
  },
  {
    name: 'Air Quality',
    image: '/4.png',
    description: 'PACE measures aerosols that affect air quality, which can impact human health and cause respiratory issues.',
    color: "bg-[#b25be4]"
  },
  {
    name: 'Fisheries Management',
    image: '/5.png',
    description: 'This data helps to manage fisheries by tracking ocean productivity and finding areas with lots of fish.',
    color: "bg-cyan-400"
  },
  {
    name: 'Climate Change',
    image: '/6.png',
    description: 'This data helps study how tiny particles in the air affect clouds and temperatures. It also tracks how oceans absorb carbon dioxide, a gas that warms the planet.',
    color: "bg-[#d152b3]"
  }
];

const Modal = ({ isOpen, onClose, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", damping: 15 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg p-6 w-full max-w-md"
        >
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const TypewriterText = ({ text, fontSize }) => {
  const letters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={fontSize}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

const PACEInsights = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const navigate = useNavigate();
  const goToNextPage = () => {
    navigate("/choosescene")
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden bg-gradient-to-tr from-slate-700 to-slate-900">
      {/* Background elements fucking niggas floating */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-500 rounded-full opacity-10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-white mb-8 text-center"
      >
        PACE Satellite Insights
      </motion.h1>

      <motion.div 
        className="relative w-full max-w-[700px] aspect-square"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Central circle */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 to-blue-700 flex items-center justify-center">
          <div className="text-white font-bold text-center px-8 text-lg md:text-2xl">
            <div className="flex flex-col justify-center items-center">
                <TypewriterText text="INSIGHT OF PACE DATA" fontSize="text-lg md:text-3xl" />
                <TypewriterText text="Explore the impact" fontSize="text-base md:text-xl" />
            </div>
          </div>
        </div>
        
        {/* Satellite components */}
        {satelliteComponents.map((item, index) => {
          const angle = (index / satelliteComponents.length) * 2 * Math.PI;
          const radius = 42; // Percentage
          return (
            <motion.div
              key={item.name}
              className={`absolute w-1/4 md:w-1/5 aspect-square ${item.color} rounded-full shadow-lg cursor-pointer overflow-hidden`}
              style={{
                top: `${50 + Math.sin(angle) * radius - 12.5}%`,
                left: `${50 + Math.cos(angle) * radius - 12.5}%`,
              }}
              onClick={() => setSelectedComponent(item)}
              whileHover={{ scale: 1.2, rotate: 360, zIndex: 10 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: index * 0.1,
                rotate: { duration: 1, ease: "linear" }
              }}
            >
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Interactive Modal */}
      <Modal isOpen={!!selectedComponent} onClose={() => setSelectedComponent(null)}>
        {selectedComponent && (
          <div className="text-center">
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
            >
              {selectedComponent.name}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg leading-relaxed text-gray-700"
            >
              {selectedComponent.description}
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              onClick={() => setSelectedComponent(null)}
            >
              Close
            </motion.button>
          </div>
        )}
      </Modal>
      <button 
        className="absolute bottom-14 right-10 bg-blue-600 text-white p-3 rounded-full shadow-lg"
        onClick={goToNextPage}
      >
        <ArrowForward />
      </button>
    </div>
  );
};

export default PACEInsights;