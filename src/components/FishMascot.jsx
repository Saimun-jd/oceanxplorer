// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import HtmlTooltip from './CustomTooltip';
import { Link } from 'react-router-dom';

const FishMascot = () => {
  const [tooltipContent, setTooltipContent] = useState("Hi! I'm Sharky. Click me to learn about the ocean!");
  const [factIdx, setFactIdx] = useState(0);

  const oceanFacts = [
    "Oceans cover 71% of the Earth's surface.",
    "The Pacific Ocean is the largest and deepest ocean.",
    "The Great Barrier Reef is the world's largest coral reef system.",
    "The ocean contains 97% of Earth's water.",
    "There are more historic artifacts under the sea than in all of the world's museums."
  ];

  const fishes = [
    {
      "emoji": "🐠",
      "name": "Tropical Fish",
      "wiki_link": "https://en.wikipedia.org/wiki/Marine_fish"
    },
    {
      "emoji": "🐙",
      "name": "Octopus",
      "wiki_link": "https://en.wikipedia.org/wiki/Octopus"
    },
    {
      "emoji": "🐳",
      "name": "Whale",
      "wiki_link": "https://en.wikipedia.org/wiki/Whale"
    },
    {
      "emoji": "🦈",
      "name": "Shark",
      "wiki_link": "https://en.wikipedia.org/wiki/Shark"
    },
    {
      "emoji": "🐡",
      "name": "Blowfish",
      "wiki_link": "https://en.wikipedia.org/wiki/Blowfish"
    },
    {
      "emoji": "🦀",
      "name": "Crab",
      "wiki_link": "https://en.wikipedia.org/wiki/Crab"
    },
    {
      "emoji": "🐬",
      "name": "Dolphin",
      "wiki_link": "https://en.wikipedia.org/wiki/Dolphin"
    },
    {
      "emoji": "🦑",
      "name": "Squid",
      "wiki_link": "https://en.wikipedia.org/wiki/Squid"
    },
    {
      "emoji": "🦞",
      "name": "Lobster",
      "wiki_link": "https://en.wikipedia.org/wiki/Lobster"
    },
    {
      "emoji": "🐚",
      "name": "Shell",
      "wiki_link": "https://en.wikipedia.org/wiki/Sea_shell"
    },
    {
      "emoji": "🐟",
      "name": "Fish",
      "wiki_link": "https://en.wikipedia.org/wiki/Fish"
    },
    {
      "emoji": "🐡",
      "name": "Pufferfish",
      "wiki_link": "https://en.wikipedia.org/wiki/Pufferfish"
    }
  ];

  const handleClick = (idx) => {
    const randomFact = oceanFacts[idx];
    setFactIdx((idx + 1) % oceanFacts.length);
    setTooltipContent(randomFact);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-blue-600 p-8">
      <h1 className="text-4xl font-bold text-white text-center mb-8">Ocean Explorer</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Ocean Zones</h2>
            <ul className="flex flex-col text-left list-disc list-inside">
              <li>Sunlight Zone (0-200m)</li>
              <li>Twilight Zone (200-1000m)</li>
              <li>Midnight Zone (1000-4000m)</li>
              <li>Abyssal Zone (4000-6000m)</li>
              <li>Hadal Zone (6000m+)</li>
            </ul>
          </div>
        </div>

        {/* Middle Column - Shark Mascot */}
        <div className="md:col-span-1 flex flex-col items-center justify-center">
          <div className="relative mb-4">
            <HtmlTooltip title={tooltipContent} placement="right" open={true}>
              <img
                src="/mascot.png"
                alt="Shark Mascot"
                className="w-64 h-auto cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
                onClick={() => handleClick(factIdx)}
                style={{ touchAction: 'manipulation' }} // Prevent zoom on mobile
              />
            </HtmlTooltip>
          </div>
          <button
            onClick={() => handleClick(factIdx)}
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-bold py-2 px-4 rounded-full transition duration-300 mt-4"
          >
            Ask Sharky a Fact!
          </button>
        </div>

        {/* Right Column */}
        <div className="md:col-span-1">
          {/* You can add content for the right column here if needed */}
        </div>
      </div>

      {/* Marine Life Section */}
      <div className="bg-white rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Marine Life</h2>
        <div className="grid grid-cols-6 gap-4">
          {fishes.map((fish, index) => (
            <div key={index} className="text-4xl text-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110">
              <Link to={fish.wiki_link} style={{ touchAction: 'manipulation' }}>{fish.emoji}</Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-white mt-8">
        <p>Created with ❤️ for young ocean explorers</p>
      </footer>
    </div>
  );
};

export default FishMascot;

