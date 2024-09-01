import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const scenes = [
  { id: 1, title: 'scene 1', image: '/pace2.png', path: '/exploreocean' },
  { id: 2, title: 'scene 2', image: '/ocean-1.png', path: '/healthyocean' },
];

const SceneSelector = () => {
  const navigate = useNavigate();
  const [hoveredScene, setHoveredScene] = useState(null);

  const handleSceneClick = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-600 to-blue-300 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-center text-yellow-300 drop-shadow-lg">
          Choose Your Adventure
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <img src={scene.image} alt={scene.title} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h2 className="text-3xl font-bold text-center px-4">
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
    </div>
  );
};

export default SceneSelector;