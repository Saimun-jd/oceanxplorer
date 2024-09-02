import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ReactHowler from 'react-howler';
import Quiz from "./Quiz";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    background: "radial-gradient(circle, rgba(135,206,235,1) 0%, rgba(240,248,255,1) 100%)",
    color: "#003366",
    minWidth: 120,
    maxWidth: 300,
    padding: theme.spacing(2),
    fontSize: theme.typography.pxToRem(14),
    borderRadius: "20%",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    border: "2px solid rgba(0, 191, 255, 0.6)",
    textAlign: "center",
    transition: "all 0.3s ease-in-out",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "rgba(135,206,235,1)",
  },
}));

const InteractiveImage = ({elements, image, title}) => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

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

        let width, height;
        if (containerWidth / containerHeight > imgAspectRatio) {
          width = containerWidth;
          height = containerWidth / imgAspectRatio;
        } else {
          height = containerHeight;
          width = containerHeight * imgAspectRatio;
        }

        imageRef.current.style.width = `${width}px`;
        imageRef.current.style.height = `${height}px`;

        const newIsMobile = window.innerWidth <= 768;
        setIsDraggable(newIsMobile);
        setIsMobile(newIsMobile);
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
  }, []);

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

  const handleTouchStart = (element) => {
    if(isMobile)
        setHoveredElement(element);
  };

  const handleTouchEnd = () => {
    if(isMobile)
        setHoveredElement(null);
  };

  const closeModal = () => {
    setSelectedElement(null);
  };

  const goToNextPage = () => {
    navigate("/");
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div ref={containerRef} className="image-container">
      <ReactHowler
        src="/background.mp3"
        playing={isMusicPlaying}
        loop={true}
        volume={0.3}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
        style={{
          touchAction: "none",
          cursor: isDraggable ? "grab" : "default",
          x,
          y,
        }}
        drag={isDraggable}
        dragConstraints={containerRef}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        dragElastic={0}
      >
        <img
          ref={imageRef}
          src={image}
          alt="Ocean Ecosystem"
          className="object-cover"
        />
        <div className="absolute inset-0">
          {elements?.map((element) => (
            <HtmlTooltip
              key={element.id}
              title={
                <React.Fragment>
                  <Typography color="inherit">{element.name}</Typography>
                  {element.description}
                </React.Fragment>
              }
              enterTouchDelay={isMobile? 0: 500}
              leaveTouchDelay={isMobile? 500: 100}
            >
              <motion.button
                className="interactive-area bg-transparent hover:bg-blue-300 hover:bg-opacity-50 transition-all duration-300 rounded-full"
                style={{
                  left: `${element.x}%`,
                  top: `${element.y}%`,
                  width: `${element.width}%`,
                  height: `${element.height}%`,
                  boxShadow: '0 00 8px px rgba(30, 144, 255, 0.5)',
                  border: '2px solid rgba(30, 144, 255, 0.5)'
                }}
                onClick={() => handleElementClick(element)}
                onMouseEnter={() => handleMouseEnter(element)}
                onMouseLeave={handleMouseLeave}
                onTouchStart={() => handleTouchStart(element)}
                onTouchEnd={handleTouchEnd}
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
        className="absolute bottom-14 right-10 bg-blue-600 text-white p-3 rounded-full shadow-lg"
        onClick={goToNextPage}
      >
        <ArrowForward />
      </button>
    </div>
  );
};

export default InteractiveImage;