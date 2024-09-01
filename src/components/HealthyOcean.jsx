
import InteractiveImage from "./InterActiveImage";

const elements = [
	{
		id: 1,
		name: "Sunlight",
		x: 51.9,
		y: 6.2,
		width: 11,
		height: 19,
		description: "Essential for photosynthesis, supporting phytoplankton and algae.Sunlight penetrates up to 200 meters in clear water.",
        sound: '/pick.mp3',
        quiz: {
            question: "How does cloud change ocean temperature?",
            options: ["increases", "decreases", "no effect", "small effect"],
            correctAnswer: "decreases"
        }
	},
    {
		id: 2,
		name: "Aerosol",
		x: 19,
		y: 5.9,
		width: 10,
		height: 18,
		description: "Aerosols are small particles suspended in the atmosphere. They are often not or barely visible to the human eye and influences nutrient cycling by depositing nutrients like iron.",
        sound: '/pick.mp3',
        quiz: {
            question: "How does cloud change ocean temperature?",
            options: ["increases", "decreases", "no effect", "small effect"],
            correctAnswer: "decreases"
        }
	},
    {
		id: 3,
		name: "CO2",
		x: 11,
		y: 34.5,
		width: 11,
		height: 20,
		description: "Needed for photosynthesis but excess leads to ocean acidification.",
        sound: '/pick.mp3',
        quiz: {
            question: "How does cloud change ocean temperature?",
            options: ["increases", "decreases", "no effect", "small effect"],
            correctAnswer: "decreases"
        }
	},
    {
		id: 4,
		name: "O2",
		x: 80,
		y: 13.5,
		width: 10,
		height: 18,
		description: "Essential for marine organisms.Optimal Levels: 6-8 mg/L; below 2 mg/L causes hypoxia and dead zones.",
        sound: '/pick.mp3',
        quiz: {
            question: "How does cloud change ocean temperature?",
            options: ["increases", "decreases", "no effect", "small effect"],
            correctAnswer: "decreases"
        }
	},
    {
		id: 5,
		name: "Phytoplankton",
		x: 23,
		y: 61,
		width: 7,
		height: 13,
		description: "Phytoplankton, also known as microalgae, are similar to terrestrial plants in that they contain chlorophyll and require sunlight in order to live and grow Base of the marine food web, crucial for oxygen production and carbon sequestration.Chlorophyll levels range from 0.1 to 30 mg/m³.",
        sound: '/pick.mp3',
        quiz: {
            question: "How does cloud change ocean temperature?",
            options: ["increases", "decreases", "no effect", "small effect"],
            correctAnswer: "decreases"
        }
	},
    {
		id: 6,
		name: "Algie",
		x: 49,
		y: 82,
		width: 7,
		height: 13,
		description: "Algae are a diverse group of aquatic organisms that have the ability to conduct photosynthesis. They provide habitat and food, aiding carbon cycling.",
        sound: '/pick.mp3',
        quiz: {
            question: "How does cloud change ocean temperature?",
            options: ["increases", "decreases", "no effect", "small effect"],
            correctAnswer: "decreases"
        }
	},
];

const HealthyOcean = () => {
  return (
    <InteractiveImage elements={elements} image={"/ocean-1.png"}/>
  )
}

export default HealthyOcean;