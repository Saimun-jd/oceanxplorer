import React from 'react';
import { Radar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

// Import chart.js components
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const data = {
  labels: ['Phytoplankton', 'Aerosol', 'Clouds', 'Ocean Environment'],
  datasets: [
    {
      label: 'Interaction Strength',
      data: [80, 60, 70, 90],
      backgroundColor: 'rgba(34, 202, 236, 0.2)',
      borderColor: 'rgba(34, 202, 236, 1)',
      borderWidth: 2,
    },
  ],
};

const options = {
  scales: {
    r: {
      suggestedMin: 0,
      suggestedMax: 100,
    },
  },
};

const pageVariants = {
  initial: { opacity: 0, x: "-100vw" },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: "100vw" }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.6
};

const RelationshipPage = () => {
  const navigate = useNavigate();

  const goToNextPage = () => {
    navigate("/");
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="bg-gradient-to-b from-purple-100 to-purple-300 min-h-screen flex flex-col items-center justify-center text-center p-4"
    >
      <h1 className="text-4xl font-bold text-purple-700 mb-6">
        Relationship Between Phytoplankton, Aerosol, Clouds, and Ocean Environment
      </h1>
      <p className="text-lg text-gray-800 max-w-3xl mb-10">
        Explore how these components interact with each other in the Earth's atmosphere and oceans. The relationship between them affects climate, weather patterns, and marine ecosystems.
      </p>
      <div className="w-80 h-80 mb-10">
        <Radar data={data} options={options} />
      </div>
      <button
        className="absolute bottom-10 right-10 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-all"
        onClick={goToNextPage}
      >
        <ArrowForwardIcon fontSize="large" />
      </button>
    </motion.div>
  );
};

export default RelationshipPage;
