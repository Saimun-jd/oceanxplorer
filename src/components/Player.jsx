// src/Player.jsx
import React from 'react';

const Player = ({ position, direction }) => {
  // Determine the CSS class based on direction
  const getDirectionClass = () => {
    switch (direction) {
      case 'left':
        return 'transform -scale-x-100'; // Flip horizontally for left
      case 'right':
        return ''; // No transform needed for right
      case 'up':
        return 'transform -rotate-90'; // Rotate 90 degrees counter-clockwise for up
      case 'down':
        return 'transform rotate-90'; // Rotate 90 degrees clockwise for down
      default:
        return '';
    }
  };

  return (
    <img
      src="/seahorse.png"
      alt="Player Submarine"
      style={{ top: position.y, left: position.x }}
      className={`absolute w-10 h-10 transition-all duration-75 ${getDirectionClass()}`}
    />
  );
};

export default Player;
