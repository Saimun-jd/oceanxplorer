import React, { useState } from "react";
import {
	Rocket,
	Globe,
	Radio,
	Shield,
	Wifi,
	Zap,
	BarChart,
	Compass,
	Bot,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// CSS for star animation
const starAnimationStyles = `
  @keyframes star-move {
    0% {
      transform: translateX(0) translateY(0);
    }
    100% {
      transform: translateX(-100vw) translateY(100vh);
    }
  }

  .animate-star-move {
    animation: star-move linear infinite;
  }
`;


const SpaceshipDisplay = ({ messages }) => {
	const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
	const [showNextPage, setShowNextPage] = useState(false);
	const navigate = useNavigate();

	const nextMessage = () => {
		setCurrentMessageIndex((prevIndex) => {
			if (prevIndex < messages.length - 1) {
				return prevIndex + 1;
			} else {
				setShowNextPage(true);
				return prevIndex;
			}
		});
	};

	const nextPage = () => {
		navigate("/paceguide");
	};

	const goToGlobePage = () => {
		navigate("/globe")
	}

	return (
		<>
			<style>{starAnimationStyles}</style>
			<div className="bg-gray-900 min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
				{/* Spaceship interior background */}
				<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxMDIwMzAiLz48Y2lyY2xlIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjQwJSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjA0MDYwIiBzdHJva2Utd2lkdGg9IjQiLz48Y2lyY2xlIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjMwJSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjA0MDYwIiBzdHJva2Utd2lkdGg9IjQiLz48L3N2Zz4=')]"></div>

				{/* Animated moving stars */}
				<div className="absolute inset-0 overflow-hidden">
					{[...Array(100)].map((_, i) => (
						<div
							key={i}
							className="absolute bg-white rounded-full opacity-70 animate-star-move"
							style={{
								width: Math.random() * 3 + 1 + "px",
								height: Math.random() * 3 + 1 + "px",
								top: Math.random() * 100 + "%",
								left: Math.random() * 100 + "%",
								animationDuration:
									Math.random() * 20 + 10 + "s",
								animationDelay: -Math.random() * 20 + "s",
								transform: `translateX(${
									Math.random() * 100
								}px)`,
							}}
						></div>
					))}
				</div>

				{/* Main display */}
				<div className="w-full max-w-6xl aspect-video bg-gray-800 bg-opacity-80 rounded-lg shadow-lg flex flex-col border-4 border-cyan-500 relative z-10">
					{/* Top bar */}
					<div className="h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-lg flex justify-between items-center px-4">
						<div className="flex space-x-2">
							{[Rocket, Globe, Radio].map((Icon, i) => (
								<Icon key={i} className="text-white w-5 h-5" />
							))}
						</div>
						<div className="text-white font-bold">
							USS ENTERPRISE NCC-1701
						</div>
						<div className="flex space-x-2">
							{[Shield, Wifi, Zap].map((Icon, i) => (
								<Icon key={i} className="text-white w-5 h-5" />
							))}
						</div>
					</div>

					{/* Main content area */}
					<div className="flex-1 flex p-4 gap-4">
						{/* Left panel */}
						<div className="w-1/6 flex flex-col justify-between">
							<div className="bg-gray-700 bg-opacity-80 rounded p-2 mb-4">
								<BarChart className="text-cyan-400 w-full h-24 mb-2" />
								<div className="bg-cyan-400 h-4 rounded w-3/4 mx-auto"></div>
							</div>
							<div className="bg-gray-700 bg-opacity-80 rounded p-2">
								<div className="grid grid-cols-3 gap-2">
									{[...Array(9)].map((_, i) => (
										<div
											key={i}
											className="bg-cyan-400 h-6 rounded animate-pulse"
										></div>
									))}
								</div>
							</div>
						</div>

						{/* Main screen */}
						<div className="flex-1">
							<div className="bg-black rounded-lg h-full flex items-center justify-center relative overflow-hidden border-2 border-cyan-400">
								<div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-purple-600 to-transparent rounded-t-lg"></div>
									<p className="text-cyan-300 text-sm md:text-2xl lg:text-4xl font-bold text-center z-10 px-4">
										{
											messages[
												currentMessageIndex
											]
										}
                    <span className="animate-pulse">|</span>
										{showNextPage &&
											"Launching the mission...."}
									</p>
								<div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwMDAwMDAiPjwvcmVjdD4KPHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI0ZGRkZGRjEwIj48L3JlY3Q+Cjwvc3ZnPg==')]"></div>
							</div>
						</div>

						{/* Right panel */}
						<div className="w-1/6 flex flex-col justify-between">
							<div className="bg-gray-700 bg-opacity-80 rounded p-2 mb-4 flex flex-col items-center justify-center">
								<Globe className="text-cyan-400 w-full h-24 mb-2" />
								<div className="py-2 px-2 button-primary text-white cursor-pointer rounded-lg max-w-[200px]" onClick={goToGlobePage}>Explore Globe</div>

							</div>
							<div className="bg-gray-700 bg-opacity-80 rounded p-2">
								<div className="grid grid-cols-2 gap-2">
									{[...Array(6)].map((_, i) => (
										<div
											key={i}
											className={`bg-${
												showNextPage
													? "green"
													: "yellow"
											}-400 h-6 rounded animate-pulse`}
										></div>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Bottom bar */}
					<div className="h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-b-lg flex items-center justify-between px-4">
						<div className="flex items-center space-x-2">
							{[...Array(3)].map((_, i) => (
								<div
									key={i}
									className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
								>
									<div
										className={`w-6 h-6 bg-${
											showNextPage ? "green" : "cyan"
										}-400 rounded-full animate-ping`}
									></div>
								</div>
							))}
						</div>
						<div className="flex items-center space-x-4">
							{!showNextPage && (
								<button
									onClick={nextMessage}
									className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center transition-colors duration-300"
								>
									Next{" "}
									<Bot className="ml-2 hover:scale-125" />
								</button>
							)}

							{showNextPage && (
								<button
									onClick={nextPage}
									className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg flex items-center transition-colors duration-300"
								>
									Explore
									<Rocket className="ml-2 hover:scale-125 animate-ping" />
								</button>
							)}
						</div>
						<div className="text-white font-bold bg-gray-800 px-3 py-1 rounded">
							Captain
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SpaceshipDisplay;
