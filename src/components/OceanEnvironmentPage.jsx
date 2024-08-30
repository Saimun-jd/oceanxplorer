// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FishMascot from "./FishMascot";

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

const OceanEnvironmentPage = () => {
  const navigate = useNavigate();

  const goToNextPage = () => {
    navigate("/");
  };

  return (
    <>
    <FishMascot/>
      <button 
        className="absolute bottom-14 right-10 from-indigo-500 via-pink-400 to-purple-500 bg-gradient-to-r text-white p-3 rounded-full shadow-lg"
        onClick={goToNextPage}
      >
        <ArrowForwardIcon className="transition-transform duration-300 ease-in-out hover:scale-110" />
      </button>
    {/* // </div> */}
    </>
  );
};

export default OceanEnvironmentPage;
