import React, { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Custom hook for intersection observer
const useIntersectionObserver = (callback, threshold = 0.5) => {
	const observer = useMemo(
		() =>
			new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							callback(entry);
						}
					});
				},
				{ threshold }
			),
		[callback, threshold]
	);

	const observe = useCallback(
		(element) => {
			if (element) observer.observe(element);
		},
		[observer]
	);

	return observe;
};

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
const Section = ({ id, content, setActiveSection }) => {
	const observe = useIntersectionObserver((entry) =>
		setActiveSection(parseInt(entry.target.id.split("section")[1]) - 1)
	);

	return (
		<motion.section
			ref={observe}
			id={`section${id}`}
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 1, ease: "easeOut" }}
			className="h-screen flex items-center justify-center p-8 relative z-10"
		>
			<div className="max-w-4xl mx-auto bg-white bg-opacity-80 p-8 rounded-lg">
				{content}
			</div>
		</motion.section>
	);
};

// Main component
const PhytoplanktonPage = () => {
	const navigate = useNavigate();
	const [activeSection, setActiveSection] = useState(0);

	const goToNextPage = () => navigate("/aerosol");

	const backgroundImages = ["/phyto1.jpg", "/phyto2.jpg", "/phyto3.jpg"];

	const sectionContents = [
		<>
			<h1 className="text-3xl font-bold text-center text-blue-800 mb-8 font-serif">
				The Wonderful World of Phytoplankton
			</h1>
			<h2 className="text-3xl font-semibold text-blue-700 mb-6 font-sans">
				What are Phytoplankton?
			</h2>
			<p className="text-lg md:text-xl text-gray-700 leading-relaxed font-sans">
				Phytoplankton are microscopic marine algae that form the
				foundation of aquatic food webs. These tiny organisms are
				capable of photosynthesis, which means they use sunlight to
				convert carbon dioxide and water into energy, just like plants
				on land.
			</p>
		</>,
		<>
			<h2 className="text-3xl font-semibold text-blue-700 mb-6 font-sans">
				Why Are They Important?
			</h2>
			<p className="text-lg md:text-xl text-gray-700 leading-relaxed font-sans">
        <span className="font-bold">
          Produce Oxygen:
        </span>
				Like trees on land, they make oxygen which is
				essential for fish and other sea creatures. <br/>
        <span className="font-bold">
          Food Source:
        </span>
        They are the first link in the ocean food chain, feeding small
				animals called zooplankton. These small animals are then eaten
				by bigger sea animals. <br/>
        <span className="font-bold">
          Climate Helpers:
        </span>
        They help take carbon
				dioxide (a greenhouse gas) out of the atmosphere and keep our
				planet cooler.
			</p>
		</>,
		<>
			<h2 className="text-3xl font-semibold text-blue-700 mb-6 font-sans">
				Phytoplankton Bloom
			</h2>
			<p className="text-lg md:text-xl text-gray-700 leading-relaxed font-sans">
				occur when there is a sudden and rapid increase in the number of phytoplankton in a particular area of the ocean <br/>
        <span className="font-bold">
          Rapid Growth:
        </span>
          When conditions are just like the right amount of sunlight, nutrients, and warm temperatures, phytoplankton multiply quickly. <br/>
          <span className="font-bold">
            Color Change
          </span>
          A bloom can sometimes change the color of the water. For example, it might turn green, red, or brown depending on the type of phytoplankton. <br/>
          <span className="font-bold">
            Impact on marine life:
          </span>
          <br/>
          <span className="text-green-500 font-bold">Good Effect: </span>Phytoplankton blooms can be good because they provide a lot of food for tiny ocean creatures called zooplankton, which are eaten by bigger animals like fish.<br/>
          <span className="text-red-500 font-bold">Bad Effect: </span>Sometimes, blooms can be harmful. If the bloom is made up of toxic phytoplankton, it can make the water unsafe for marine life and even affect humans.
			</p>
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
					setActiveSection={setActiveSection}
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
		</div>
	);
};

export default PhytoplanktonPage;
