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
const AerosolPage = () => {
	const navigate = useNavigate();
	const [activeSection, setActiveSection] = useState(0);

	const goToNextPage = () => navigate("/cloud");

	const backgroundImages = ["/phyto1.jpg", "/phyto2.jpg", "/phyto3.jpg"];

	const sectionContents = [
		<>
			<h1 className="text-3xl font-bold text-center text-blue-800 mb-8 font-serif">
				Aerosol
			</h1>
			<h2 className="text-3xl font-semibold text-blue-700 mb-6 font-sans">
				What Are Aerosols?
			</h2>
			<p className="text-lg md:text-xl text-gray-700 leading-relaxed font-sans">
				Aerosols are tiny particles or droplets suspended in the Earth's
				atmosphere. These particles can be natural, such as dust, sea
				salt, and pollen, or they can be human-made, like smoke from
				wildfires, industrial emissions, and vehicle exhaust. Despite
				their small size, aerosols have a significant impact on climate,
				weather, and human health.
			</p>
		</>,
		<>
			<h2 className="text-3xl font-semibold text-blue-700 mb-6 font-sans">
				Why Are They Important?
			</h2>
			<p className="text-lg md:text-xl text-gray-700 leading-relaxed font-sans">
				Aerosols play a critical role in several atmospheric processes.
				They can scatter or absorb sunlight, influencing the Earth’s
				radiation balance and, consequently, the climate. Some aerosols,
				like sulfate particles, reflect sunlight and cool the Earth,
				while others, like black carbon, absorb sunlight and contribute
				to warming. Additionally, aerosols affect cloud formation and
				precipitation patterns by acting as cloud condensation nuclei,
				impacting regional weather and water cycles. Aerosols also
				directly impact air quality. Particles like soot and dust can
				penetrate the respiratory system, causing various health
				problems, including respiratory and cardiovascular diseases.
				Understanding aerosol concentrations and types is crucial for
				addressing climate change and protecting public health.
			</p>
		</>,
		<>
			<h2 className="text-3xl font-semibold text-blue-700 mb-6 font-sans">
				How Does NASA's PACE Satellite Monitor Aerosols?
			</h2>
			<p className="text-lg md:text-xl text-gray-700 leading-relaxed font-sans">
				PACE is equipped with the Ocean Color Instrument (OCI), a state-of-the-art sensor capable of detecting and distinguishing between different types of aerosols. The OCI can measure light across a wide range of wavelengths, from ultraviolet to near-infrared, enabling it to capture detailed information about aerosols' optical properties. This allows scientists to identify different aerosol types, such as dust, smoke, or pollution, and determine their sizes and concentrations in the atmosphere.
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

export default AerosolPage;
