import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { RefreshCw, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { playSuccessSound, playErrorSound, speakFeedback, speakText } from "@/utils/audioUtils";

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#C7CEEA', '#89CFF0', '#DDA0DD', '#FFB6C1'];

const LetterCatchGame = () => {
  const navigate = useNavigate();
  const [targetLetter, setTargetLetter] = useState('');
  const [fallingLetters, setFallingLetters] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const interval = setInterval(() => {
        addFallingLetter();
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const interval = setInterval(() => {
        setFallingLetters(prev => {
          const updated = prev.map(letter => ({
            ...letter,
            top: letter.top + 2
          })).filter(letter => {
            if (letter.top > 90) {
              if (letter.letter === targetLetter) {
                setLives(l => {
                  const newLives = l - 1;
                  if (newLives <= 0) {
                    setGameOver(true);
                    playErrorSound();
                  }
                  return newLives;
                });
              }
              return false;
            }
            return true;
          });
          return updated;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameOver, targetLetter]);

  const addFallingLetter = () => {
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomLeft = Math.random() * 80 + 10;
    
    setFallingLetters(prev => [...prev, {
      id: Date.now(),
      letter: randomLetter,
      color: randomColor,
      left: randomLeft,
      top: 0
    }]);
  };

  const startGame = () => {
    const newTarget = alphabet[Math.floor(Math.random() * alphabet.length)];
    setTargetLetter(newTarget);
    speakText(`Catch the letter ${newTarget}`);
    setFallingLetters([]);
    setScore(0);
    setLives(3);
    setGameStarted(true);
    setGameOver(false);
  };

  const handleLetterClick = (letter, id) => {
    if (letter.letter === targetLetter) {
      playSuccessSound();
      speakFeedback(true);
      setScore(score + 10);
      window.dispatchEvent(new CustomEvent('starEarned', { detail: 5 }));
      
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x: letter.left / 100, y: letter.top / 100 }
      });
      
      setFallingLetters(prev => prev.filter(l => l.id !== id));
      
      const newTarget = alphabet[Math.floor(Math.random() * alphabet.length)];
      setTargetLetter(newTarget);
      speakText(newTarget);
    } else {
      playErrorSound();
      setLives(l => {
        const newLives = l - 1;
        if (newLives <= 0) {
          setGameOver(true);
        }
        return newLives;
      });
    }
  };

  if (!gameStarted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-kid-blue mb-8" style={{ fontFamily: 'Fredoka, cursive' }}>
            Letter Catch! 🔤
          </h1>
          
          <div className="bg-white rounded-3xl shadow-xl p-12 max-w-2xl mx-auto">
            <div className="text-8xl mb-6">🐘</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Fredoka, cursive' }}>
              How to Play:
            </h2>
            <div className="text-left text-lg text-gray-700 space-y-3 mb-8">
              <p>• Letters will fall from the top</p>
              <p>• Click on the correct letter shown above</p>
              <p>• Earn 10 points for each correct catch</p>
              <p>• You have 3 lives - don't miss the target letter!</p>
            </div>
            
            <button
              onClick={startGame}
              className="big-button text-2xl px-12 py-6"
              data-testid="start-letter-catch"
            >
              Start Game!
            </button>
            
            <button
              onClick={() => navigate('/games')}
              className="mt-4 flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform mx-auto"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12 max-w-2xl mx-auto" data-testid="game-over">
            <div className="text-8xl mb-6">{score >= 50 ? '🎉' : '💪'}</div>
            <h2 className="text-5xl font-bold text-kid-orange mb-4" style={{ fontFamily: 'Fredoka, cursive' }}>
              Game Over!
            </h2>
            <p className="text-3xl font-semibold text-gray-700 mb-8">
              Final Score: {score}
            </p>
            
            <div className="flex gap-4 justify-center">
              <button onClick={startGame} className="big-button" data-testid="play-again">
                Play Again
              </button>
              <button
                onClick={() => navigate('/games')}
                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform"
              >
                <ArrowLeft className="w-5 h-5" />
                Games Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-3xl shadow-xl p-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/games')}
            className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
            Exit
          </button>
          
          <div className="flex items-center gap-6">
            <div className="text-xl font-bold text-gray-700">
              Score: <span className="text-kid-blue">{score}</span>
            </div>
            <div className="text-xl font-bold text-gray-700">
              Lives: <span className="text-red-500">{'❤️'.repeat(lives)}</span>
            </div>
          </div>
          
          <button
            onClick={startGame}
            className="flex items-center gap-2 bg-kid-teal text-white px-4 py-2 rounded-full font-bold hover:scale-105 transition-transform"
          >
            <RefreshCw className="w-5 h-5" />
            Restart
          </button>
        </div>

        <div className="bg-kid-yellow rounded-2xl p-6 mb-6 text-center">
          <p className="text-xl font-semibold text-gray-700 mb-2">Catch this letter:</p>
          <div className="text-9xl font-black text-kid-blue" data-testid="target-letter">{targetLetter}</div>
        </div>

        <div className="relative bg-gradient-to-b from-blue-100 to-green-100 rounded-3xl h-[500px] overflow-hidden">
          {fallingLetters.map((letter) => (
            <div
              key={letter.id}
              onClick={() => handleLetterClick(letter, letter.id)}
              className="absolute text-6xl font-black cursor-pointer hover:scale-125 transition-transform"
              style={{
                left: `${letter.left}%`,
                top: `${letter.top}%`,
                color: letter.color,
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
              }}
              data-testid={`falling-letter-${letter.id}`}
            >
              {letter.letter}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LetterCatchGame;