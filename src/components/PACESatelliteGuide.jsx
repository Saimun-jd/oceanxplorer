import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ArrowForward } from "@mui/icons-material";
import { useSwipeable } from "react-swipeable";
import useCheckMobileScreen from "../hooks/useCheckMobileScreen";

const satelliteSteps = [
	{
		title: "Launch",
		content:
			"PACE (Plankton, Aerosol, Cloud, Ocean Ecosystem) is a NASA mission launched on 8 February, 2024. PACE aims to take measurements providing data records on ocean ecology and global biogeochemistry. This information can be used to benefit any economic or societal sector that relies on water quality, fisheries and food security.",
		image: "/launch.jpg",
		isVideo: false,
	},
	{
		title: "Orbit",
		content:
			"This visualization starts with a close view of the PACE spacecraft. A representative data swath is shown, depicting ocean color (i.e., biological) data. The camera then pulls out to show the spacecraft's polar orbit. Complete global coverage is achieved after approximately two days of orbits. Over time, the data swath cycles between biological, aerosol, and cloud data, representing PACE's collective mission to study Earth's ocean and atmosphere. This version ends with animated ocean color data.",
		image: "/pace_in_orbit.mp4",
		isVideo: true,
	},
	{
		title: "Monitoring",
		content:
			"By monitoring the color of reflected light via satellite, scientists can determine how successfully plants and algae are photosynthesizing on the land and in the ocean. This data visualization represents twenty years' worth of data taken primarily by SeaStar/SeaWiFS, Aqua/MODIS, and Suomi NPP/VIIRS satellite sensors. In the ocean, dark blue to violet represents areas where there is little life due to lack of nutrients. Greens and reds represent productive areas such as coastal regions where nutrients are upwelled from the seafloor and the mouths of rivers where nutrients are transported into the ocean from land.",
		image: "/20_years_color_converted.mp4",
		isVideo: true,
	},
	{
		title: "Global Observation",
		content:
			"Tiny solid and liquid particles suspended in the atmosphere are called aerosols. Depending upon their size, type, and location, aerosols can either cool Earth's surface, or warm it. Aerosols can help clouds to form, or they can inhibit cloud formation. Researchers from NASA's Global Modeling and Assimilation Office ran a simulation that shows clouds (white), dust (brown), sulfates (purple), and organic black carbon (green) from September 1 to December 31, 2005. Simulations such as this allow scientists to better understand how different types of aerosols travel in the atmosphere, impact cloud formation, and influence weather and climate.",
		image: "/data_collection.anim.gif",
		isVideo: false,
	},
];

const PACESatelliteGuide = () => {
	const [currentCard, setCurrentCard] = useState(0);
	const [direction, setDirection] = useState(0);
	
	const videoRef = useRef(null);

	const navigate = useNavigate();

	

	const isMobile = useCheckMobileScreen();

	const handleOnloadMetaData = () => {
		if (videoRef.current) {
			videoRef.current.playbackRate = 2;
		}
	};

	const goToNextPage = () => {
		navigate("/phytoplankton");
	};

	const nextCard = () => {
		setDirection(1);
		setCurrentCard((prev) => (prev + 1) % satelliteSteps.length);
	};

	const prevCard = () => {
		setDirection(-1);
		setCurrentCard(
			(prev) => (prev - 1 + satelliteSteps.length) % satelliteSteps.length
		);
	};

	const swipHandlers = useSwipeable({
		onSwipedLeft: () => nextCard(),
		onSwipedRight: () => prevCard(),
		preventDefaultTouchmoveEvent: true,
		trackMouse: true,
	});

	const cardVariants = {
		enter: (direction) => ({
			x: direction > 0 ? "100%" : "-100%",
			opacity: 0,
			rotateY: direction > 0 ? -15 : 15,
		}),
		center: {
			x: 0,
			opacity: 1,
			rotateY: 0,
		},
		exit: (direction) => ({
			x: direction < 0 ? "100%" : "-100%",
			opacity: 0,
			rotateY: direction < 0 ? -15 : 15,
		}),
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-800 to-black text-white p-4 sm:p-6 overflow-hidden">
			<div className="flex justify-center">
				<h1 className="text-2xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
					Journey of NASA's PACE Satellite
				</h1>
			</div>
			<div className="relative max-w-6xl mx-auto h-[600px] sm:h-[700px] md:h-[800px]" {...swipHandlers}>
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
						<div className="bg-gray-800 bg-opacity-70 rounded-lg shadow-lg overflow-hidden border-2 border-blue-400 h-full flex flex-col">
							{satelliteSteps[currentCard].isVideo === true ? (
								<video
									ref={videoRef}
									onLoadedMetadata={handleOnloadMetaData}
									loop
									autoPlay
									muted
									className="w-full h-40 sm:h-3/6 object-fill"
								>
									<source
										src={satelliteSteps[currentCard].image}
										type="video/mp4"
									/>
								</video>
							) : (
								<img
									src={satelliteSteps[currentCard].image}
									alt={satelliteSteps[currentCard].title}
									className="w-full h-40 sm:h-3/6 object-fill"
								/>
							)}
							<div className="p-4 sm:p-6 flex-grow overflow-y-auto">
								<h2 className="text-2xl sm:text-3xl font-semibold mb-2 sm:mb-4 text-blue-300">
									{satelliteSteps[currentCard].title}
								</h2>
								<p className="text-base sm:text-xl text-white">
									{satelliteSteps[currentCard].content}
								</p>
							</div>
						</div>
					</motion.div>
				</AnimatePresence>

				{/* Previous Button */}
				{!isMobile && <button
					onClick={prevCard}
					className="absolute bottom-4 left-4 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors z-10"
				>
					<ChevronRight className="w-4 h-4 transform rotate-180" />
				</button>}

				{/* Next Button */}
				{!isMobile && <button
					onClick={nextCard}
					className="absolute bottom-4 right-4 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors z-10"
				>
					<ChevronRight className="w-4 h-4" />
				</button>}

				{/* Indicators */}
				<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
					{satelliteSteps.map((_, index) => (
						<div
							key={index}
							className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
								index === currentCard
									? "bg-blue-500"
									: "bg-gray-400"
							}`}
						/>
					))}
				</div>
			</div>

			<button
				className="fixed bottom-4 right-4 sm:bottom-10 sm:right-10 bg-blue-600 text-white p-2 sm:p-3 rounded-full shadow-lg z-20 flex items-center justify-center"
				onClick={goToNextPage}
			>
				<ArrowForward className="w-5 h-5 sm:w-6 sm:h-6" />
				<span className={`ml-2 text-sm sm:text-base hidden sm:inline`}>
					Explore
				</span>
			</button>
		</div>
	);
};

export default PACESatelliteGuide;
