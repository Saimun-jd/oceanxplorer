import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const OceanEnvironmentPage = () => {
	const navigate = useNavigate();

	const goToNextPage = () => {
		navigate("/exploreocean");
	};

	return (
		<div className="relative min-h-screen bg-blue-200">
			<div className="p-8 pb-20">
				{" "}
				{/* Added bottom padding to prevent content from being hidden behind the button */}
				<h1 className="text-4xl font-bold text-center text-blue-800 mb-12 font-newamsterdam">
					Understanding Ocean Environment
				</h1>
				<div className="container mx-auto flex flex-col md:flex-row items-start justify-between">
					<div className="md:w-1/2 mb-8 md:mb-0">
						<img
							src="/ocean.jpg"
							alt="Phytoplankton"
							className="rounded-lg shadow-lg w-full"
						/>
					</div>

					<div className="md:w-1/2 md:pl-8">
						<h2 className="text-2xl font-semibold text-blue-700 mb-4 font-nerkoone">
							What is Ocean Environment?
						</h2>
						<p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-nerkoone">
							The ocean environment, covering more than 70% of the
							Earth's surface, is a vast and dynamic ecosystem
							that supports an incredible diversity of life. It is
							characterized by its interconnected layers, from the
							sunlit surface waters teeming with plankton and fish
							to the deep, dark abyssal plains where strange and
							unique organisms thrive in extreme conditions.
							Oceans play a crucial role in regulating the
							planet's climate by absorbing heat and carbon
							dioxide, which helps to moderate global
							temperatures. They are also the primary drivers of
							the water cycle, with evaporation from the sea
							surface contributing significantly to precipitation
							around the world. The ocean environment is home to
							complex habitats, including coral reefs, kelp
							forests, seagrass meadows, and deep-sea hydrothermal
							vents, each supporting a unique community of
							organisms. These ecosystems provide essential
							services, such as supporting fisheries that millions
							of people rely on for food, maintaining
							biodiversity, and generating oxygen through
							photosynthesis by marine plants. However, the ocean
							environment faces numerous threats from human
							activities, including overfishing, pollution,
							habitat destruction, and climate change, which are
							causing ocean acidification, rising sea levels, and
							warming waters. Protecting and preserving the health
							of the ocean is critical not only for marine life
							but also for the well-being of the planet and future
							generations.
						</p>
					</div>
				</div>
			</div>
			<div className="fixed bottom-4 right-4 z-10">
				<button
					className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200"
					onClick={goToNextPage}
					aria-label="Go to next page"
				>
					<ArrowForwardIcon />
				</button>
			</div>
		</div>
	);
};

export default OceanEnvironmentPage;
