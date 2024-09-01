import InteractiveImage from "./InterActiveImage";

const elements = [
	{
		id: 1,
		name: "Cloud",
		x: 20,
		y: 4,
		width: 15,
		height: 11,
		description:
			"Clouds play a crucial role in regulating Earth's temperature and water cycle.",
        sound: '/pick.mp3',
        quiz: {
            question: "How does cloud change ocean temperature?",
            options: ["increases", "decreases", "no effect", "small effect"],
            correctAnswer: "decreases"
        }
	},
	{
		id: 2,
		name: "O₂",
		x: 16.5,
		y: 43,
		width: 8,
		height: 8,
		description:
			"Oxygen is vital for life on Earth, produced by photosynthesis in marine organisms like phytoplankton.",
        sound: '/pick.mp3',
        quiz: {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
        }
	},
	{
		id: 3,
		name: "Phytoplankton",
		x: 62.2,
		y: 63.2,
		width: 10,
		height: 19,
		description:
			"Phytoplankton are microscopic marine algae that form the base of the ocean's food chain.",
        sound: '/pick.mp3',
        quiz: {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
        }
	},
	{
		id: 4,
		name: "Zooplankton",
		x: 41,
		y: 51,
		width: 10,
		height: 18,
		description:
			"Zooplankton are tiny organisms that drift in water and feed on phytoplankton.",
        sound: '/pick.mp3',
        quiz: {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
        }
	},
	{
		id: 5,
		name: "CO₂",
		x: 49,
		y: 77,
		width: 9,
		height: 10,
		description:
			"Carbon dioxide is a greenhouse gas that contributes to global warming and ocean acidification.",
        sound: '/pick.mp3',
        quiz: {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
        }
	},
	{
		id: 6,
		name: "Algal Bloom",
		x: 25.4,
		y: 54.6,
		width: 10,
		height: 18,
		description:
			"Algal blooms are rapid increases in algae populations, often harmful to marine ecosystems.",
        sound: '/pick.mp3',
        quiz: {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
        }
	},
	{
		id: 7,
		name: "Pollution",
		x: 8.5,
		y: 23.4,
		width: 8,
		height: 8,
		description:
			"Pollution in the oceans comes from various sources, including plastic waste, chemicals, and oil spills.",
        sound: '/pick.mp3',
        quiz: {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
        }
	},
	{
		id: 8,
		name: "Phytoplankton Bloom",
		x: 71,
		y: 40.5,
		width: 13,
		height: 24,
		description:
			"Phytoplankton blooms are large-scale growths of phytoplankton that can alter marine environments.",
        sound: '/pick.mp3',
        quiz: {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
        }
	},
	{
		id: 9,
		name: "Aerosol",
		x: 21.3,
		y: 19,
		width: 8,
		height: 14,
		description:
			"Aerosols are tiny particles or droplets in the atmosphere that can affect climate and air quality.",
        sound: '/pick.mp3',
        quiz: {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
        }
	},
	{
		id: 10,
		name: "Toxin",
		x: 13.2,
		y: 57.2,
		width: 6,
		height: 10,
		description:
			"Toxins in the ocean often come from harmful algal blooms or pollution, affecting marine life and humans.",
        sound: '/pick.mp3',
        quiz: {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
        }
	},
	{
		id: 11,
		name: "Cycle O2",
		x: 52.6,
		y: 43.7,
		width: 8,
		height: 12.5,
		description:
			"The oxygen cycle involves the production and consumption of oxygen in marine ecosystems.",
        sound: '/pick.mp3',
        quiz: {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
        }
	},
	{
		id: 12,
		name: "Increased CO2",
		x: 90,
		y: 35.5,
		width: 9,
		height: 10,
		description:
			"Increased CO2 levels in the atmosphere lead to global warming and affect oceanic carbon balance.",
        sound: '/pick.mp3',
        quiz: {
            question: "Which ocean is the largest?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: "Pacific Ocean"
        }
	},
];

const InteractiveOceanEcosystem = () => {
  return (
    <InteractiveImage elements={elements} image={"/pace2.png"}/>
  )
}

export default InteractiveOceanEcosystem