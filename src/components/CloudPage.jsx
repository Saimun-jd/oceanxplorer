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
const CloudPage = () => {
	const navigate = useNavigate();
	const [activeSection, setActiveSection] = useState(0);

	const goToNextPage = () => navigate("/ocean-environment");

	const backgroundImages = ["/phyto1.jpg", "/phyto2.jpg", "/phyto3.jpg"];

	const sectionContents = [
		<>
			<h1 className="text-3xl font-bold text-center text-blue-800 mb-8 font-serif">
				Unlocking the Mysteries of Clouds
			</h1>
			<h2 className="text-3xl font-semibold text-blue-700 mb-6 font-sans">
				What Are Clouds and Why Are They Important?
			</h2>
			<p className="text-lg md:text-xl text-gray-700 leading-relaxed font-sans">
				Clouds are visible masses of tiny water droplets or ice crystals
				suspended in the Earth's atmosphere. Beyond their picturesque
				beauty, clouds play a critical role in Earth's climate system.
				They regulate the planet's energy balance by reflecting sunlight
				back into space, trapping heat in the atmosphere, and
				influencing global weather patterns. Understanding clouds is
				vital for accurate climate modeling, weather forecasting, and
				water resource management.
			</p>
		</>,
		<>
			<h2 className="text-3xl font-semibold text-blue-700 mb-6 font-sans">
				How Does NASA's PACE Satellite Monitor Clouds?
			</h2>
			<p className="text-lg md:text-xl text-gray-700 leading-relaxed font-sans">
				<span className="font-bold">
					Advances Tools for cloud observation
				</span>{" "}
				<br />
				<span className="font-bold text-blue-500">
					1. Ocean Color Instrument(OCI):
				</span>{" "}
				<br />
				The PACE satellite is equipped with the Ocean Color Instrument,
				which can measure light across a wide range of wavelengths—from
				ultraviolet to near-infrared. This allows OCI to capture
				detailed information about cloud optical properties, such as
				reflectivity and cloud-top height. By analyzing how clouds
				scatter and absorb sunlight at different wavelengths, scientists
				can determine their composition, thickness, and water content.{" "}
				<br />
				<span className="font-bold text-blue-500">
					2. Polarimeters:
				</span>{" "}
				<br />
				PACE's polarimeters are specialized sensors that measure the
				polarization of light reflected by clouds. This data is
				essential for determining cloud microphysical properties, such
				as droplet size distribution and ice crystal shapes.
				Understanding these properties helps scientists assess how
				clouds interact with sunlight and infrared radiation, which
				directly impacts Earth’s radiation budget and, ultimately,
				global climate.
			</p>
		</>,
		<>
			<h2 className="text-3xl font-semibold text-blue-700 mb-6 font-sans">
				The Impact of Cloud Data from PACE
			</h2>
			<ul className="font-semibold font-martian">
        <li>1. Enhancing Climate Models</li>
        <li>2. Improving Weather Forecasts</li>
        <li>3. Understanding Water Cycle</li>
        <li>4. Study Aerosol-Could Interections</li>
        <li>5. Monitoring Natural Disasters</li>
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

export default CloudPage;