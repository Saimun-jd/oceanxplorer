import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { slideInFromLeft, slideInFromRight } from "../utils/motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const cards = [
	{
		id: 1,
		image: "/aisatellite.webp",
		backgroundImage: "/aisatellite.webp",
		link: "/paceguide",
		title: "Learn about pace internals",
		description: "NASA PACE satellite is an Earth-Observing satellite.",
	},
	{
		id: 2,
		image: "/green_phyto.webp",
		backgroundImage: "/green_phyto.webp",
		link: "/phytoplankton",
		title: "Learn about Phytoplankton",
		description: "Microscopic marine algae.",
	},
	{
		id: 3,
		image: "/aerosol.webp",
		backgroundImage: "/aerosol.webp",
		link: "/aerosol",
		title: "Learn about Aerosol",
		description: "Liquid drop in air",
	},
	{
		id: 4,
		image: "/nasa_cloud.webp",
		backgroundImage: "/nasa_cloud.webp",
		link: "/cloud",
		title: "Learn about Cloud",
		description: "Water droplets in the sky",
	},
	{
		id: 5,
		image: "/ocean_environment1.webp",
		backgroundImage: "/ocean_environment1.webp",
		link: "/ocean-environment",
		title: "Learn about Ocean Environment",
		description: "Vast body of saltwater",
	},
];

const HeroContent = () => {
	const [currentCard, setCurrentCard] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		// Preload the next image
		const nextCard = (currentCard + 1) % cards.length;
		const img = new Image();
		img.src = cards[nextCard].backgroundImage;

		const backgroundElement = document.getElementById("hero-background");
		if (backgroundElement) {
			// Use a low-res placeholder
			backgroundElement.style.backgroundImage = `
        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
        url(${cards[currentCard].backgroundImage})
      `;

			// Load the full image
			const fullImg = new Image();
			fullImg.onload = () => {
				backgroundElement.style.backgroundImage = `
          linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
          url(${cards[currentCard].backgroundImage})
        `;
			};
			fullImg.src = cards[currentCard].backgroundImage;
		}
	}, [currentCard]);

	const nextCard = () => {
		setCurrentCard((prev) => (prev + 1) % cards.length);
	};

	const prevCard = () => {
		setCurrentCard((prev) => (prev - 1 + cards.length) % cards.length);
	};

	const handleExplore = () => {
		navigate(cards[currentCard].link);
	};

	return (
		<motion.div
			initial="hidden"
			animate="visible"
			className="flex flex-col items-center justify-between min-h-screen pt-24 sm:pt-32 px-4 pb-8 md:p-8 lg:p-20 w-full z-[20] relative"
		>
			<motion.div
				variants={slideInFromLeft(0.6)}
				className="w-full text-white mb-8 md:mb-0"
			>
				<h1 className="heading text-3xl font-inter sm:text-4xl md:text-5xl lg:text-6xl mb-2 leading-tight drop-shadow-2xl">
					Learn about NASA{" "}
					<span className="ring-2 rounded-full p-2 ring-inset ring-green-500">
						P
					</span>
					<span className="ring-2 rounded-full p-2 ring-inset ring-blue-500">
						A
					</span>
					<span className="ring-2 rounded-full p-2 ring-inset ring-cyan-500">
						C
					</span>
					<span className="ring-2 rounded-full p-2 ring-inset ring-teal-500">
						E
					</span>{" "}
					SATELLITE
				</h1>
				<p className="text-lg sm:text-xl md:text-2xl">
					98.3 minutes at an altitude of 676.5 km
				</p>
			</motion.div>

			<div className="flex flex-col md:flex-row items-center justify-center w-full my-8 md:my-0">
				<motion.div
					variants={slideInFromLeft(0.8)}
					className="flex flex-col items-start mb-8 md:mb-0 md:mr-8 lg:mr-20 w-full md:w-auto"
				>
					<h2 className="tit1 text-xl sm:text-2xl md:text-3xl font-inter lg:text-4xl mb-2 text-white bg-black bg-opacity-60 rounded-full p-4">
						{cards[currentCard].title}
					</h2>
					<p className="text-base sm:text-lg md:text-xl lg:text-2xl font-inter text-white rounded-full p-4 mb-8">
						{cards[currentCard].description}
					</p>
					<motion.div
						variants={slideInFromLeft(1)}
						className="py-2 px-4 border-2 border-white text-center text-base sm:text-lg md:text-xl text-white cursor-pointer rounded-full flex items-center justify-center gap-2"
						onClick={handleExplore}
					>
						<span>E X P L O R E</span>
						<ArrowRight />
					</motion.div>
				</motion.div>

				<motion.div
					variants={slideInFromRight(0.6)}
					className="flex flex-col items-center justify-center relative"
				>
					<div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px]">
						{cards.map((card, index) => (
							<motion.div
								key={card.id}
								className="absolute top-0 left-0 w-full h-full cursor-pointer"
								initial={{ scale: 0, rotate: -10 }}
								animate={{
									scale: index === currentCard ? 1 : 0.9,
									rotate: index === currentCard ? 0 : -10,
									zIndex:
										index === currentCard
											? cards.length
											: cards.length - index,
								}}
								transition={{ duration: 0.3 }}
							>
								<div className="w-full h-full rounded-full overflow-hidden border-4 border-white">
									<img
										src={card.image}
										alt={card.title}
										loading="lazy"
										className="w-full h-full object-cover"
									/>
								</div>
							</motion.div>
						))}
					</div>
					<div className="flex justify-between w-full mt-4">
						<button
							onClick={prevCard}
							className="bg-white bg-opacity-50 p-2 rounded-full"
						>
							<ChevronLeft className="text-black" />
						</button>
						<button
							onClick={nextCard}
							className="bg-white bg-opacity-50 p-2 rounded-full"
						>
							<ChevronRight className="text-black" />
						</button>
					</div>
				</motion.div>
			</div>

			<motion.div
				variants={slideInFromLeft(1.2)}
				className="flex justify-center items-baseline space-x-4 sm:space-x-4 md:space-x-8 space-y-4 sm:space-y-0 text-white mt-8"
			>
				<NavLink
					to="https://pace.oceansciences.org/news.htm"
					className="text-base sm:text-lg md:text-xl"
				>
					News and updates
				</NavLink>
				<NavLink
					to="https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/blusentry/"
					className="text-base sm:text-lg md:text-xl"
				>
					About US
				</NavLink>
			</motion.div>
		</motion.div>
	);
};

export default HeroContent;
