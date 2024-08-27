// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import InteractiveOceanEcosystem from "./InteractiveOceanEcosystem";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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


const HomePage = () => {
    
  const navigate = useNavigate();

  const goToNextPage = () => {
    navigate("/phytoplankton");
  };

  return (
    <>
    <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="bg-gradient-to-b from-green-100 to-green-300 min-h-screen flex flex-col items-center justify-center text-center p-4"
    >
      <InteractiveOceanEcosystem />
       <button 
        className="absolute bottom-10 right-10 bg-blue-600 text-white p-3 rounded-full shadow-lg"
        onClick={goToNextPage}
      >
        <ArrowForwardIcon />
      </button>
    </motion.div>
    </>
  );
};

export default HomePage;
