import React, { useRef, useEffect, useState, useCallback } from 'react';
import ReactHowler from 'react-howler';

const OceanGuardian = () => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const savedHighScore = localStorage.getItem('highScore');
    return savedHighScore ? parseInt(savedHighScore, 10) : 0;
  });
  const [timer, setTimer] = useState(60);
  const [health, setHealth] = useState(100);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  
  const playerRef = useRef({
    x: 400,
    y: 300,
    speed: 5,
    direction: 'right',
    image: new Image(),
    moveUp: false,
    moveDown: false,
    moveLeft: false,
    moveRight: false
  });
  
  const itemsRef = useRef([]);
  const backgroundRef = useRef(new Image());
  const goodItemImagesRef = useRef([]);
  const badItemImagesRef = useRef([]);
  const effectsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    backgroundRef.current.src = '/1_game_background.png';
    playerRef.current.image.src = '/submarine.png';

    backgroundRef.current.onload = () => {
      if (gameState === 'idle') {
        ctx.drawImage(backgroundRef.current, 0, 0, canvas.width, canvas.height);
      }
    };

    const goodItemImages = ["/Barrel_1.png", "/chest.png"];
    const badItemImages = ["/Mast.png", "/Net.png"];
    
    goodItemImages.forEach(src => {
      const img = new Image();
      img.src = src;
      goodItemImagesRef.current.push(img);
    });

    badItemImages.forEach(src => {
      const img = new Image();
      img.src = src;
      badItemImagesRef.current.push(img);
    });

    const handleKeyDown = (e) => {
      if (gameState !== 'playing') return;
      
      const { key } = e;
      const player = playerRef.current;
      
      switch(key) {
        case 'w': player.moveUp = true; player.direction = 'up'; break;
        case 'a': player.moveLeft = true; player.direction = 'left'; break;
        case 's': player.moveDown = true; player.direction = 'down'; break;
        case 'd': player.moveRight = true; player.direction = 'right'; break;
        default: break;
      }
    };

    const handleKeyUp = (e) => {
      if (gameState !== 'playing') return;
      
      const { key } = e;
      const player = playerRef.current;
      
      switch(key) {
        case 'w': player.moveUp = false; break;
        case 'a': player.moveLeft = false; break;
        case 's': player.moveDown = false; break;
        case 'd': player.moveRight = false; break;
        default: break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  const isOverlapping = useCallback((newItem, existingItems) => {
    for (let item of existingItems) {
      if (
        newItem.x < item.x + 40 &&
        newItem.x + 40 > item.x &&
        newItem.y < item.y + 40 &&
        newItem.y + 40 > item.y
      ) {
        return true;
      }
    }
    return false;
  }, []);

  const addEffect = useCallback((x, y, text, color) => {
    effectsRef.current.push({ x, y, text, color, duration: 60 });
  }, []);

  const updateGame = useCallback(() => {
    const canvas = canvasRef.current;
    const player = playerRef.current;

    if (player.moveUp) player.y = Math.max(0, player.y - player.speed);
    if (player.moveDown) player.y = Math.min(canvas.height - 50, player.y + player.speed);
    if (player.moveLeft) player.x = Math.max(0, player.x - player.speed);
    if (player.moveRight) player.x = Math.min(canvas.width - 50, player.x + player.speed);

    if (Math.random() < 0.02 && itemsRef.current.length < 10) {
      const isGood = Math.random() < 0.7;
      const itemType = Math.floor(Math.random() * (isGood ? goodItemImagesRef.current.length : badItemImagesRef.current.length));
      let newItem;
      let attempts = 0;
      do {
        newItem = {
          x: Math.random() * (canvas.width - 40),
          y: Math.random() * (canvas.height - 40),
          type: itemType,
          isGood: isGood
        };
        attempts++;
      } while (isOverlapping(newItem, itemsRef.current) && attempts < 10);

      if (attempts < 10) {
        itemsRef.current.push(newItem);
      }
    }

    itemsRef.current = itemsRef.current.filter((item) => {
      if (
        player.x < item.x + 30 &&
        player.x + 50 > item.x &&
        player.y < item.y + 30 &&
        player.y + 50 > item.y
      ) {
        if (item.isGood) {
          setScore(prevScore => {
            const newScore = prevScore + 10;
            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem('highScore', newScore);
            }
            return newScore;
          });
          addEffect(item.x, item.y, '+10', 'green');
        } else {
          setHealth(prevHealth => {
            const newHealth = Math.max(0, prevHealth - 20);
            if (newHealth <= 0) {
              setGameState('gameOver');
            }
            return newHealth;
          });
          addEffect(item.x, item.y, '-20', 'red');
        }
        return false;
      }
      return true;
    });

    effectsRef.current = effectsRef.current.filter(effect => {
      effect.duration -= 1;
      effect.y -= 1;
      return effect.duration > 0;
    });
  }, [isOverlapping, addEffect, highScore]);

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundRef.current, 0, 0, canvas.width, canvas.height);

    const player = playerRef.current;
    ctx.save();
    ctx.translate(player.x + 25, player.y + 25);

    // Rotate based on direction
    switch (player.direction) {
      case 'up':
        ctx.rotate(-Math.PI / 2);
        break;
      case 'down':
        ctx.rotate(Math.PI / 2);
        break;
      case 'left':
        ctx.rotate(Math.PI);
        break;
      case 'right':
      default:
        break;
    }

    ctx.drawImage(player.image, -25, -25, 50, 50);
    ctx.restore();

    ctx.beginPath();
    ctx.arc(player.x + 25, player.y + 25, 30, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();

    itemsRef.current.forEach((item) => {
      const img = item.isGood ? goodItemImagesRef.current[item.type] : badItemImagesRef.current[item.type];
      ctx.drawImage(img, item.x, item.y, 30, 30);
    });

    effectsRef.current.forEach((effect) => {
      ctx.font = '20px Arial';
      ctx.fillStyle = effect.color;
      ctx.fillText(effect.text, effect.x, effect.y);
    });

    const maxHealth = 100;
    const barWidth = 200;
    const barHeight = 20;
    const healthPercentage = health / maxHealth;

    ctx.fillStyle = 'red';
    ctx.fillRect(10, 10, barWidth, barHeight);
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, barWidth * healthPercentage, barHeight);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(10, 10, barWidth, barHeight);

    ctx.fillStyle = 'white';
    ctx.font = '16px Arial';
    ctx.fillText('Move: W (up), S (down), A (left), D (right)', 10, canvas.height - 10);
    ctx.fillText('Collect good items (barrels, chests) and avoid bad items (masts, nets)', 10, canvas.height - 30);
  }, [health]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    let animationFrameId;
    let lastTime = 0;
    const fps = 60;
    const interval = 1000 / fps;

    const gameLoop = (currentTime) => {
      animationFrameId = requestAnimationFrame(gameLoop);

      const deltaTime = currentTime - lastTime;

      if (deltaTime >= interval) {
        updateGame();
        drawGame();
        lastTime = currentTime - (deltaTime % interval);
      }
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          setGameState('gameOver');
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(timerInterval);
    };
  }, [gameState, updateGame, drawGame]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimer(60);
    setHealth(100);
    setIsMusicPlaying(true);
    itemsRef.current = [];
    effectsRef.current = [];
  };

  const drawGameOverScreen = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 50);

    ctx.font = '24px Arial';
    ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 10);

    ctx.font = '18px Arial';
    ctx.fillText(`High Score: ${highScore}`, canvas.width / 2, canvas.height / 2 + 40);

    ctx.font = '18px Arial';
    ctx.fillText('Click "Restart Game" to play again', canvas.width / 2, canvas.height / 2 + 70);
  }, [score, highScore]);

  useEffect(() => {
    if (gameState === 'gameOver') {
      drawGameOverScreen();
      setIsMusicPlaying(false);
    }
  }, [gameState, drawGameOverScreen]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black bg-opacity-80">
      <ReactHowler
        src="/background.mp3"
        playing={isMusicPlaying}
        loop={true}
      />
      <h1 className="text-4xl font-bold mb-4 text-yellow-400">Ocean Guardian</h1>
      <div className="mb-4">
        <span className="mr-4 text-green-400">Score: {score}</span>
        <span className="mr-4 text-green-400">Time: {timer}s</span>
        <span className="mr-4 text-green-400">Health: {health}</span>
        <span className='text-green-400'>High Score: {highScore}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={1000}
        height={800}
        className="border-4 border-blue-500"
      />
      <div className="mt-4">
        {gameState === 'idle' && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={startGame}
          >
            Start Game
          </button>
        )}
        {gameState === 'gameOver' && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={startGame}
          >
            Restart Game
          </button>
        )}
      </div>
    </div>
  );
};

export default OceanGuardian;
