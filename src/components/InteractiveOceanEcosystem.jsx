import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ReactHowler from 'react-howler';
import Quiz from "./Quiz";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const elements = [
	{
		id: 1,
		name: "Cloud",
		x: 20,
		y: 4,
		width: 15,
		height: 11,
		description:
			"Clouds play a crucial role in regulating Earth's temperature and water cycle.",
        sound: '/src/assets/sounds/pick.mp3',
        quiz: {
            question: "How does cloud change ocean temperature?",
            options: ["increases", "decreases", "no effect", "small effect"],
            correctAnswer: "decreases"
        }
	},
	{
		id: 2,
		name: "O₂",
		x: 16.5,
		y: 43,
		width: 8,
		height: 8,
		description:
			"Oxygen is vital for life on Earth, produced by photosynthesis in marine organisms like phytoplankton.",
        sound: '/src/assets/sounds/pick.mp3',
        quiz: {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
        }
	},
	{
		id: 3,
		name: "Phytoplankton",
		x: 62.2,
		y: 63.2,
		width: 10,
		height: 19,
		description:
			"Phytoplankton are microscopic marine algae that form the base of the ocean's food chain.",
        sound: '/src/assets/sounds/pick.mp3',
        quiz: {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
        }
	},
	{
		id: 4,
		name: "Zooplankton",
		x: 41,
		y: 51,
		width: 10,
		height: 18,
		description:
			"Zooplankton are tiny organisms that drift in water and feed on phytoplankton.",
        sound: '/src/assets/sounds/pick.mp3',
        quiz: {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
        }
	},
	{
		id: 5,
		name: "CO₂",
		x: 49,
		y: 77,
		width: 9,
		height: 10,
		description:
			"Carbon dioxide is a greenhouse gas that contributes to global warming and ocean acidification.",
        sound: '/src/assets/sounds/pick.mp3',
        quiz: {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
        }
	},
	{
		id: 6,
		name: "Algal Bloom",
		x: 25.4,
		y: 54.6,
		width: 10,
		height: 18,
		description:
			"Algal blooms are rapid increases in algae populations, often harmful to marine ecosystems.",
        sound: '/src/assets/sounds/pick.mp3',
        quiz: {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
        }
	},
	{
		id: 7,
		name: "Pollution",
		x: 8.5,
		y: 23.4,
		width: 8,
		height: 8,
		description:
			"Pollution in the oceans comes from various sources, including plastic waste, chemicals, and oil spills.",
        sound: '/src/assets/sounds/pick.mp3',
        quiz: {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
        }
	},
	{
		id: 8,
		name: "Phytoplankton Bloom",
		x: 71,
		y: 40.5,
		width: 13,
		height: 24,
		description:
			"Phytoplankton blooms are large-scale growths of phytoplankton that can alter marine environments.",
        sound: '/src/assets/sounds/pick.mp3',
        quiz: {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
        }
	},
	{
		id: 9,
		name: "Aerosol",
		x: 21.3,
		y: 19,
		width: 8,
		height: 14,
		description:
			"Aerosols are tiny particles or droplets in the atmosphere that can affect climate and air quality.",
        sound: '/src/assets/sounds/pick.mp3',
        quiz: {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
        }
	},
	{
		id: 10,
		name: "Toxin",
		x: 13.2,
		y: 57.2,
		width: 6,
		height: 10,
		description:
			"Toxins in the ocean often come from harmful algal blooms or pollution, affecting marine life and humans.",
        sound: '/src/assets/sounds/pick.mp3',
        quiz: {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
        }
	},
	{
		id: 11,
		name: "Cycle O2",
		x: 52.6,
		y: 43.7,
		width: 8,
		height: 12.5,
		description:
			"The oxygen cycle involves the production and consumption of oxygen in marine ecosystems.",
        sound: '/src/assets/sounds/pick.mp3',
        quiz: {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
        }
	},
	{
		id: 12,
		name: "Increased CO2",
		x: 90,
		y: 35.5,
		width: 9,
		height: 10,
		description:
			"Increased CO2 levels in the atmosphere lead to global warming and affect oceanic carbon balance.",
        sound: '/src/assets/sounds/pick.mp3',
        quiz: {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
        }
	},
];


const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background: "radial-gradient(circle, rgba(135,206,235,1) 0%, rgba(240,248,255,1) 100%)",
    color: "#003366",
    maxWidth: 240,
    padding: theme.spacing(1.5),
    fontSize: theme.typography.pxToRem(14),
    borderRadius: "50%",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    border: "2px solid rgba(0, 191, 255, 0.6)",
    textAlign: "center",
    transition: "all 0.3s ease-in-out",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "rgba(135,206,235,1)",
  },
}));

const InteractiveOceanEcosystem = () => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateImageSize = () => {
      if (imageRef.current && containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;
        const imgNaturalWidth = imageRef.current.naturalWidth;
        const imgNaturalHeight = imageRef.current.naturalHeight;

        if (imgNaturalWidth === 0 || imgNaturalHeight === 0) {
          console.error("Image natural dimensions are not available yet");
          return;
        }

        const imgAspectRatio = imgNaturalWidth / imgNaturalHeight;
        
        setIsLargeScreen(containerWidth >= 1024);

        let width, height;
        if (isLargeScreen) {
          if (containerWidth / containerHeight > imgAspectRatio) {
            width = containerWidth;
            height = containerWidth / imgAspectRatio;
          } else {
            height = containerHeight;
            width = containerHeight * imgAspectRatio;
          }
        } else {
          if (containerWidth / containerHeight > imgAspectRatio) {
            height = containerHeight;
            width = containerHeight * imgAspectRatio;
          } else {
            width = containerWidth;
            height = containerWidth / imgAspectRatio;
          }
        }

        setImageSize({ 
          width: Math.round(width), 
          height: Math.round(height) 
        });
      }
    };

    const img = imageRef.current;
    if (img) {
      if (img.complete) {
        updateImageSize();
      } else {
        img.onload = updateImageSize;
      }
    }

    window.addEventListener("resize", updateImageSize);
    return () => {
      window.removeEventListener("resize", updateImageSize);
      if (img) img.onload = null;
    };
  }, [isLargeScreen]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsMusicPlaying(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const handleElementClick = (element) => {
    if (!isDragging) {
      setSelectedElement(element);
    }
  };

  const handleMouseEnter = (element) => {
    setHoveredElement(element);
  };

  const handleMouseLeave = () => {
    setHoveredElement(null);
  };

  const closeModal = () => {
    setSelectedElement(null);
  };

  const goToNextPage = () => {
    navigate("/aerosol");
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center overflow-hidden">
      <ReactHowler
        src="src/assets/sounds/background.mp3"
        playing={isMusicPlaying}
        loop={true}
        volume={0.3}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-full flex items-center justify-center"
        style={{
          touchAction: "none",
          cursor: isLargeScreen ? "default" : "grab",
          overflow: "hidden",
        }}
        drag={!isLargeScreen}
        dragConstraints={containerRef}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <img
          ref={imageRef}
          src="/src/assets/pace2.png"
          alt="Ocean Ecosystem"
          className="max-w-none max-h-none object-cover"
          style={{
            width: imageSize.width || '100%',
            height: imageSize.height || '100%',
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            width: imageSize.width || '100%',
            height: imageSize.height || '100%',
          }}
        >
          {elements.map((element) => (
            <HtmlTooltip
              key={element.id}
              title={
                <React.Fragment>
                  <Typography color="inherit">{element.name}</Typography>
                  {element.description}
                </React.Fragment>
              }
            >
              <motion.button
                className="absolute bg-transparent hover:bg-blue-500 hover:bg-opacity-25 transition-colors duration-200 rounded-full"
                style={{
                  left: `${element.x}%`,
                  top: `${element.y}%`,
                  width: `${element.width}%`,
                  height: `${element.height}%`,
                }}
                onClick={() => handleElementClick(element)}
                onMouseEnter={() => handleMouseEnter(element)}
                onMouseLeave={handleMouseLeave}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              ></motion.button>
            </HtmlTooltip>
          ))}
        </div>
      </motion.div>

      {hoveredElement && (
        <ReactHowler
          src={hoveredElement.sound}
          playing={true}
          volume={0.5}
          onEnd={() => setHoveredElement(null)}
        />
      )}

      <AnimatePresence>
        {selectedElement && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <Quiz
              question={selectedElement.quiz.question}
              options={selectedElement.quiz.options}
              correctAnswer={selectedElement.quiz.correctAnswer}
              onClose={closeModal}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <button 
        className="absolute bottom-10 right-10 bg-blue-600 text-white p-3 rounded-full shadow-lg"
        onClick={goToNextPage}
      >
        <ArrowForward />
      </button>
    </div>
  );
};

export default InteractiveOceanEcosystem;