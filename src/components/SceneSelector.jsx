import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowForward } from "@mui/icons-material";

const scenes = [
	{
		id: 1,
		title: "Dive in the Ocean Ecosystem",
		image: "/pace2.png",
		path: "/exploreocean",
	},
	{
		id: 2,
		title: "Learn about Healthy Ocean Condition",
		image: "/ocean-1.png",
		path: "/healthyocean",
	},
	{
		id: 3,
		title: "Learn about polluted Ocean Condition",
		image: "/underwater.png",
		path: "/unhealthyocean",
	},
];

const SceneSelector = () => {
	const navigate = useNavigate();
	const [hoveredScene, setHoveredScene] = useState(null);
  const goToNextPage = () => {
    navigate("/game")
  }
	const handleSceneClick = (path) => {
		navigate(path);
	};

	return (
		<div className="relative min-h-screen bg-gradient-to-tl from-blue-400 to-teal-600 text-white p-8">
			<div className="absolute inset-0 overflow-hidden">
				{[...Array(20)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute bg-green-500 rounded-full opacity-30"
						style={{
							width: Math.random() * 100 + 50,
							height: Math.random() * 100 + 50,
							top: `${Math.random() * 100}%`,
							left: `${Math.random() * 100}%`,
						}}
						animate={{
							y: [0, Math.random() * 100 - 50],
							x: [0, Math.random() * 100 - 50],
						}}
						transition={{
							duration: Math.random() * 10 + 10,
							repeat: Infinity,
							repeatType: "reverse",
						}}
					/>
				))}
			</div>
				<div className="max-w-7xl h-auto mx-auto flex flex-col justify-center items-center">
					<h1 className="text-5xl font-bold font-martino mb-12 text-center text-transparent bg-clip-text bg-gradient-to-tr from-teal-200 to-teal-500 inline-block drop-shadow-lg">
						Choose Your Adventure
					</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
						{scenes.map((scene) => (
							<motion.div
								key={scene.id}
								className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onHoverStart={() => setHoveredScene(scene.id)}
								onHoverEnd={() => setHoveredScene(null)}
								onClick={() => handleSceneClick(scene.path)}
							>
								<img
									src={scene.image}
									alt={scene.title}
									className="w-full h-64 object-cover"
								/>
								<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
									<h2 className="text-3xl font-bold text-center px-4 font-stylish text-transparent bg-clip-text bg-gradient-to-tr from-teal-200 to-teal-500 inline-block drop-shadow-lg">
										{scene.title}
									</h2>
								</div>
								{hoveredScene === scene.id && (
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										className="absolute inset-0 bg-yellow-400 bg-opacity-20 flex items-center justify-center"
									>
										<p className="text-xl font-semibold bg-purple-900 bg-opacity-75 px-4 py-2 rounded">
											Start Quest
										</p>
									</motion.div>
								)}
							</motion.div>
						))}
					</div>
				</div>
        <button 
        className="absolute bottom-14 right-10 bg-blue-600 text-white p-3 rounded-full shadow-lg"
        onClick={goToNextPage}
      >
        <ArrowForward />
      </button>
		</div>
	);
};

export default SceneSelector;
