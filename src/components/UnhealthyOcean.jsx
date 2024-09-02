import InteractiveImage from "./InteractiveImage";

const elements = [
	{
		id: 1,
		name: "Pollution",
		x: 52,
		y: 57,
		width: 18,
		height: 18,
		description:
			"Ocean pollution is a growing environmental crisis that affects marine life, human health, and the planet's overall ecosystem. It includes the contamination of the ocean with harmful substances like plastics, chemicals, and untreated waste.",
        sound: '/pick.mp3',
        quiz: {
            question: "How does cloud change ocean temperature?",
            options: ["increases", "decreases", "no effect", "small effect"],
            correctAnswer: "decreases"
        }
	},
    {
		id: 2,
		name: "Phytoplankton",
		x: 87,
		y: 38.5,
		width: 8,
		height: 12,
		description:
			"Overgrowth of phytoplankton in the ocean, also known as a phytoplankton bloom, can have significant effects on marine ecosystems. While they are essential for oxygen production and serve as a primary food source for many marine organisms, an overabundance of phytoplankton can lead to harmful consequences.",
        sound: '/pick.mp3',
        quiz: {
            question: "How does cloud change ocean temperature?",
            options: ["increases", "decreases", "no effect", "small effect"],
            correctAnswer: "decreases"
        }
	},
    {
		id: 3,
		name: "Zooplankton",
		x: 91,
		y: 24,
		width: 7,
		height: 11,
		description:
			"Zooplankton are tiny, drifting animals found in oceans, seas, and freshwater bodies. They play a crucial role in marine ecosystems, serving as a primary food source for many larger marine animals. Some zooplankton can contribute to harmful algal blooms (HABs) when their populations explode due to nutrient pollution, disrupting ecosystems.",
        sound: '/pick.mp3',
        quiz: {
            question: "How does cloud change ocean temperature?",
            options: ["increases", "decreases", "no effect", "small effect"],
            correctAnswer: "decreases"
        }
	},
    {
		id: 4,
		name: "Dead Fish",
		x: 34,
		y: 48,
		width: 7,
		height: 11,
		description:
			"Excessive algal blooms, often referred to as harmful algal blooms(HABs), can have severe and detrimental effects on fish populations and overall marine health. These blooms occur when algae, particularly phytoplankton, grow rapidly in water bodies due to an overabundance of nutrients, such as nitrogen and phosphorus, from sources like agricultural runoff, sewage, and industrial waste.",
        sound: '/pick.mp3',
        quiz: {
            question: "How does cloud change ocean temperature?",
            options: ["increases", "decreases", "no effect", "small effect"],
            correctAnswer: "decreases"
        }
	},
    {
		id: 5,
		name: "Algie",
		x: 13,
		y: 51,
		width: 8,
		height: 13,
		description:
			"Algae are essential for aquatic ecosystems, producing oxygen and serving as a base for the food chain, while also playing a role in nutrient cycling and carbon sequestration. However, when algae grow excessively due to nutrient pollution, they can cause harmful algal blooms that produce toxins, deplete oxygen, and disrupt marine habitats, threatening both aquatic life and human health.",
        sound: '/pick.mp3',
        quiz: {
            question: "How does cloud change ocean temperature?",
            options: ["increases", "decreases", "no effect", "small effect"],
            correctAnswer: "decreases"
        }
	}
];

const UnhealthyOcean = () => {
  return (
    <InteractiveImage elements={elements} image={"/underwater.png"} title="unhealthy ocean condition"/>
  )
}

export default UnhealthyOcean