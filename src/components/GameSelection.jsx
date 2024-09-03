import React, { useState } from 'react';
import { Waves, Fish, Shield } from 'lucide-react';

const GameCard = ({ title, description, icon, selected, onClick }) => (
  <div 
    className={`p-6 rounded-lg shadow-lg cursor-pointer transition-all duration-300 ${
      selected ? 'bg-blue-500 text-white scale-105' : 'bg-white hover:bg-blue-100'
    }`}
    onClick={onClick}
  >
    <div className="flex items-center mb-4">
      {icon}
      <h2 className="text-2xl font-bold ml-2">{title}</h2>
    </div>
    <p className="text-sm">{description}</p>
  </div>
);

const GameSelectionPage = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const games = [
    {
      id: 'marine-match',
      title: 'Marine Match',
      description: 'Match three marine elements to clean the ocean in this environmentally conscious puzzle game.',
      icon: <Waves className="w-8 h-8" />,
    },
    {
      id: 'plankton-defender',
      title: 'Plankton Defender',
      description: 'Protect plankton populations from pollution and climate change in this strategic defense game.',
      icon: <Shield className="w-8 h-8" />,
    },
  ];

  const handleGameSelect = (gameId) => {
    setSelectedGame(gameId);
  };

  const handlePlayGame = () => {
    if (selectedGame) {
      alert(`Starting ${selectedGame}!`);
      // Here you would typically navigate to the game page or start the game
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-400 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-900">Ocean Guardian Games</h1>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {games.map((game) => (
          <GameCard
            key={game.id}
            {...game}
            selected={selectedGame === game.id}
            onClick={() => handleGameSelect(game.id)}
          />
        ))}
      </div>
      <div className="mt-8 text-center">
        <button
          className={`px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 ${
            selectedGame
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={handlePlayGame}
          disabled={!selectedGame}
        >
          Play Selected Game
        </button>
      </div>
    </div>
  );
};

export default GameSelectionPage;