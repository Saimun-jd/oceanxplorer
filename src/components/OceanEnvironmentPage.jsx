import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft } from "lucide-react";
import useInView from "../hooks/useInView";

// Background component
const Background = ({ imageUrl }) => (
	<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
		transition={{ duration: 2, ease: "easeInOut" }}
		className="fixed inset-0 bg-cover bg-center z-0"
		style={{
			backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${imageUrl})`,
		}}
	/>
);

// Section component
const Section = ({ id, content, onInView }) => {
	const sectionRef = useRef(null);
	useInView(sectionRef, onInView);

	return (
		<motion.section
			ref={sectionRef}
			id={`section${id}`}
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 1, ease: "easeOut" }}
			className="min-h-screen flex items-center justify-center p-4 sm:p-8 relative z-10"
		>
			<div className="w-full max-w-4xl overflow-y-auto mx-auto bg-white bg-opacity-80 p-4 sm:p-8 rounded-lg">
				{content}
			</div>
		</motion.section>
	);
};

// Main component
const OceanEnvironmentPage = () => {
	const navigate = useNavigate();
	const [activeSection, setActiveSection] = useState(0);

	const goBack = () => {
		navigate("/");
	};

	const goToNextPage = () => navigate("/insight");

	const backgroundImages = ["/phyto1.jpg", "/phyto2.jpg", "/phyto3.jpg"];

	const sectionContents = [
		<>
			<h1 className="text-3xl font-bold text-center text-blue-800 mb-8 font-serif">
				Diving in the depth of Ocean
			</h1>
			<h2 className="text-3xl font-semibold text-blue-700 mb-6 font-sans">
				Why is the Ocean Environment Important?
			</h2>
			<p className="text-lg md:text-xl text-gray-700 leading-relaxed font-sans">
				The ocean covers more than 70% of Earth's surface and is a
				cornerstone of our planet's climate, weather, and life-support
				systems. It absorbs about 30% of the carbon dioxide produced by
				human activities, regulates global temperature, drives weather
				patterns, and provides a habitat for millions of species.
				Additionally, the ocean plays a crucial role in supporting
				economies, providing food, and sustaining the livelihoods of
				billions of people.
			</p>
		</>,
		<>
			<h2 className="text-3xl font-semibold text-blue-700 mb-6 font-sans">
				What Kind of Ocean Data is PACE Collecting?
			</h2>
			<p className="text-lg md:text-xl text-gray-700 leading-relaxed font-sans">
				<span className="font-bold text-blue-500">
					Phytoplankton and Ocean Productivity:
				</span>{" "}
				<br />
				PACE measures phytoplankton concentration to assess ocean health
				and marine life impacts.
				<br />
				<span className="font-bold text-blue-500">
					Harmful Algal Blooms(HABs):
				</span>{" "}
				<br />
				PACE detects harmful algal blooms early, protecting coastal
				communities and ecosystems.
				<br />
				<span className="font-bold text-blue-500">
					Ocean Carbon Cycle:
				</span>{" "}
				<br />
				PACE tracks carbon absorption in oceans, helping predict and
				mitigate climate change effects.
				<br />
				<span className="font-bold text-blue-500">
					Sediment and Pollution Monitoring:
				</span>{" "}
				<br />
				PACE identifies suspended sediments and pollutants to monitor
				and protect marine environments.
				<br />
				<span className="font-bold text-blue-500">
					Sea Surface Temperature and Ocean-Atmosphere Interaction:
				</span>{" "}
				<br />
				PACE analyzes ocean color and temperature to understand climate
				patterns and ocean-atmosphere dynamics.
			</p>
		</>,
		<>
			<h2 className="text-3xl font-semibold text-blue-700 mb-6 font-sans">
				The Impact of Ocean Data from PACE
			</h2>
			<ul className="font-semibold font-martian">
				<li>1. Protecting Marine Ecosystems</li>
				<li>2. Combating Climate Change</li>
				<li>3. Improving Disaster Preparedness</li>
				<li>4. Enhancing Global Climate Models</li>
				<li>5. Supporting Sustainable Fisheries Management</li>
			</ul>
		</>,
	];

	return (
		<div className="relative">
			<AnimatePresence>
				<Background
					key={activeSection}
					imageUrl={backgroundImages[activeSection]}
				/>
			</AnimatePresence>

			{sectionContents.map((content, index) => (
				<Section
					key={index}
					id={index + 1}
					content={content}
					onInView={() => setActiveSection(index)}
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
			<div className="fixed bottom-4 left-4 z-10">
				<button
					onClick={goBack}
					className="px-4 py-2 bg-green-500 text-white rounded"
				>
					<ChevronLeft />
					<span>Back</span>
				</button>
			</div>
		</div>
	);
};

export default OceanEnvironmentPage;
