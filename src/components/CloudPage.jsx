import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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


const useTypingEffect = (text, speed = 50) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(prev => text.substring(0, i+1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return displayedText;
};

const CloudPage = () => {
  const navigate = useNavigate();
  const text = useTypingEffect("my name is saimun. Welcome to a journey of ocean", 100);

  const goToNextPage = () => {
    navigate("/ocean-environment");
  };

  return (
    <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="bg-gradient-to-b from-green-100 to-green-300 min-h-screen flex flex-col items-center justify-center text-center p-4"
    >
    {/* <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center"> */}
      <h1 className="text-4xl font-bold text-blue-600">Clouds</h1>
      <p className="mt-4 text-lg text-gray-700 text-center">
        {text}
        <span className="animate-ping font-extrabold">|</span>
      </p>
      <button 
        className="absolute bottom-10 right-10 bg-blue-600 text-white p-3 rounded-full shadow-lg"
        onClick={goToNextPage}
      >
        <ArrowForwardIcon />
      </button>
    {/* </div> */}
    </motion.div>
  );
};

export default CloudPage;
