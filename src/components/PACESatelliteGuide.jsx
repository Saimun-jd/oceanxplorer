import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';

const satelliteSteps = [
  {
    title: "Launch",
    content: "The Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum expedita veniam quidem illum dolor tempora facilis assumenda repellendus porro, vel corrupti reprehenderit consequuntur asperiores, maxime, harum perferendis sit recusandae autem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas libero assumenda, in obcaecati quaerat ducimus expedita nihil optio minus aliquam aliquid neque, nobis fuga. Perspiciatis architecto odio aspernatur repellat necessitatibus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem aliquam fuga hic dolores laudantium repellat unde a molestias, fugiat itaque incidunt vel blanditiis cupiditate sunt numquam distinctio quasi earum tempora.",
    image: "src/assets/spaceship.jpg"
  },
  {
    title: "Orbit",
    content: "PACE enters a Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum expedita veniam quidem illum dolor tempora facilis assumenda repellendus porro, vel corrupti reprehenderit consequuntur asperiores, maxime, harum perferendis sit recusandae autem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas libero assumenda, in obcaecati quaerat ducimus expedita nihil optio minus aliquam aliquid neque, nobis fuga. Perspiciatis architecto odio aspernatur repellat necessitatibus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem aliquam fuga hic dolores laudantium repellat unde a molestias, fugiat itaque incidunt vel blanditiis cupiditate sunt numquam distinctio quasi earum tempora.",
    image: "src/assets/spaceship.jpg"
  },
  {
    title: "Solar Panels",
    content: "The satellite deploys its solar panels to gather energy from the sun. nters a Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum expedita veniam quidem illum dolor tempora facilis assumenda repellendus porro, vel corrupti reprehenderit consequuntur asperiores, maxime, harum perferendis sit recusandae autem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas libero assumenda, in obcaecati quaerat ducimus expedita nihil optio minus aliquam aliquid neque, nobis fuga. Perspiciatis architecto odio aspernatur repellat necessitatibus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem aliquam fuga hic dolores laudantium repellat unde a molestias, fugiat itaque incidunt vel blanditiis cupiditate sunt numquam distinctio quasi earum tempor",
    image: "src/assets/spaceship.jpg"
  },
  {
    title: "Data Collection",
    content: "PACE uses Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum expedita veniam quidem illum dolor tempora facilis assumenda repellendus porro, vel corrupti reprehenderit consequuntur asperiores, maxime, harum perferendis sit recusandae autem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas libero assumenda, in obcaecati quaerat ducimus expedita nihil optio minus aliquam aliquid neque, nobis fuga. Perspiciatis architecto odio aspernatur repellat necessitatibus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem aliquam fuga hic dolores laudantium repellat unde a molestias, fugiat itaque incidunt vel blanditiis cupiditate sunt numquam distinctio quasi earum tempora.",
    image: "src/assets/spaceship.jpg"
  },
  {
    title: "Data Transmission",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum expedita veniam quidem illum dolor tempora facilis assumenda repellendus porro, vel corrupti reprehenderit consequuntur asperiores, maxime, harum perferendis sit recusandae autem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas libero assumenda, in obcaecati quaerat ducimus expedita nihil optio minus aliquam aliquid neque, nobis fuga. Perspiciatis architecto odio aspernatur repellat necessitatibus. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem aliquam fuga hic dolores laudantium repellat unde a molestias, fugiat itaque incidunt vel blanditiis cupiditate sunt numquam distinctio quasi earum tempora.",
    image: "src/assets/spaceship.jpg"
  },
];

const PACESatelliteGuide = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = useNavigate();

  const goToNextPage = () => {
    navigate("/exploreocean");
  };

  const nextCard = () => {
    setDirection(1);
    setCurrentCard((prev) => (prev + 1) % satelliteSteps.length);
  };

  const prevCard = () => {
    setDirection(-1);
    setCurrentCard((prev) => (prev - 1 + satelliteSteps.length) % satelliteSteps.length);
  };

  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      rotateY: direction > 0 ? -15 : 15,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      rotateY: direction < 0 ? -15 : 15,
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black text-white p-8 overflow-hidden">
      <h1 className="text-4xl font-bold text-center mb-12 text-yellow-300">
        Journey of NASA's PACE Satellite
      </h1>
      <div className="relative max-w-3xl mx-auto h-[768px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentCard}
            custom={direction}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              rotateY: { duration: 0.2 },
            }}
            className="absolute w-full h-full"
          >
            <div className="bg-gray-800 bg-opacity-70 rounded-lg shadow-lg overflow-hidden
                            border-2 border-blue-400 animate-pulse">
              <img
                src={satelliteSteps[currentCard].image}
                alt={satelliteSteps[currentCard].title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-blue-300">
                  {satelliteSteps[currentCard].title}
                </h2>
                <p className="text-gray-300">
                  {satelliteSteps[currentCard].content}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevCard}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-full
                     bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors"
        >
          <ChevronRight className="w-6 h-6 transform rotate-180" />
        </button>
        <button
          onClick={nextCard}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-full
                     bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {satelliteSteps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentCard ? 'bg-blue-500' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
      <button 
        className="absolute bottom-10 right-10 bg-blue-600 text-white p-3 rounded-full shadow-lg"
        onClick={goToNextPage}
      >
        <ArrowForward />
      </button>
    </div>
  );
};

export default PACESatelliteGuide;