import { useState } from "react";
import confetti from "canvas-confetti";
import { RefreshCw, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { playSuccessSound, playErrorSound, speakFeedback, speakText } from "@/utils/audioUtils";

const shapes = [
  { id: 1, name: 'Circle', emoji: '⭕', color: '#FF6B6B' },
  { id: 2, name: 'Square', emoji: '🟪', color: '#4ECDC4' },
  { id: 3, name: 'Triangle', emoji: '🔺', color: '#FFE66D' },
  { id: 4, name: 'Star', emoji: '⭐', color: '#95E1D3' },
  { id: 5, name: 'Heart', emoji: '❤️', color: '#FF99C8' },
  { id: 6, name: 'Diamond', emoji: '🔸', color: '#A9DEF9' }
];

const ShapeMatchGame = () => {
  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);
  const [currentShape, setCurrentShape] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [selectedShape, setSelectedShape] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const totalRounds = 8;

  const generateRound = () => {
    const target = shapes[Math.floor(Math.random() * shapes.length)];
    const otherShapes = shapes.filter(s => s.id !== target.id);
    const shuffled = [target, ...otherShapes.sort(() => Math.random() - 0.5).slice(0, 2)]
      .sort(() => Math.random() - 0.5);
    
    setCurrentShape(target);
    setOptions(shuffled);
    setSelectedShape(null);
    setShowResult(false);
    
    speakText(`Find the ${target.name}`);
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setRound(1);
    setGameComplete(false);
    generateRound();
  };

  const handleShapeClick = (shape) => {
    if (selectedShape) return;
    
    setSelectedShape(shape);
    const isCorrect = shape.id === currentShape.id;
    
    if (isCorrect) {
      playSuccessSound();
      speakFeedback(true);
      setScore(score + 1);
      window.dispatchEvent(new CustomEvent('starEarned', { detail: 5 }));
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      playErrorSound();
      speakFeedback(false);
    }
    
    setShowResult(true);
  };

  const nextRound = () => {
    if (round < totalRounds) {
      setRound(round + 1);
      generateRound();
    } else {
      setGameComplete(true);
    }
  };

  if (!gameStarted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-kid-pink mb-8" style={{ fontFamily: 'Fredoka, cursive' }}>
            Shape Match! 🔷
          </h1>
          
          <div className="bg-white rounded-3xl shadow-xl p-12 max-w-2xl mx-auto">
            <div className="text-8xl mb-6">🐘</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Fredoka, cursive' }}>
              How to Play:
            </h2>
            <div className="text-left text-lg text-gray-700 space-y-3 mb-8">
              <p>• A shape name will be shown at the top</p>
              <p>• Tap the matching shape from the options below</p>
              <p>• Complete 8 rounds to finish the game</p>
              <p>• Earn stars for each correct match!</p>
            </div>
            
            <button
              onClick={startGame}
              className="big-button text-2xl px-12 py-6"
              data-testid="start-shape-game"
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

  if (gameComplete) {
    const percentage = Math.round((score / totalRounds) * 100);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12 max-w-2xl mx-auto" data-testid="shape-game-complete">
            <div className="text-8xl mb-6">
              {percentage >= 80 ? '🎉' : percentage >= 60 ? '😊' : '💪'}
            </div>
            <h2 className="text-5xl font-bold text-kid-pink mb-4" style={{ fontFamily: 'Fredoka, cursive' }}>
              {percentage >= 80 ? 'Amazing!' : percentage >= 60 ? 'Great Job!' : 'Keep Practicing!'}
            </h2>
            <p className="text-3xl font-semibold text-gray-700 mb-8">
              You matched {score} out of {totalRounds} shapes!
            </p>
            
            <div className="flex gap-4 justify-center">
              <button onClick={startGame} className="big-button" data-testid="play-again-shape">
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
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/games')}
            className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
            Exit
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold text-gray-600">
              Round {round} / {totalRounds}
            </span>
            <div className="flex items-center gap-2 bg-kid-yellow px-4 py-2 rounded-full">
              <span className="text-xl">⭐</span>
              <span className="font-bold">{score}</span>
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

        <div className="text-center">
          <div className="bg-kid-pink/20 rounded-3xl p-8 mb-8">
            <p className="text-2xl font-semibold text-gray-700 mb-4">Find the:</p>
            <h3 className="text-6xl font-black mb-4" style={{ fontFamily: 'Fredoka, cursive', color: currentShape?.color }}>
              {currentShape?.name}
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            {options.map((shape) => (
              <button
                key={shape.id}
                onClick={() => handleShapeClick(shape)}
                disabled={selectedShape !== null}
                className={`aspect-square rounded-3xl flex items-center justify-center text-9xl transition-all hover:scale-110 ${
                  selectedShape?.id === shape.id
                    ? shape.id === currentShape.id
                      ? 'bg-kid-green shadow-2xl'
                      : 'bg-red-500 shadow-2xl'
                    : 'bg-white border-4 border-gray-200 hover:border-kid-pink hover:shadow-xl'
                }`}
                data-testid={`shape-option-${shape.name.toLowerCase()}`}
              >
                {shape.emoji}
              </button>
            ))}
          </div>

          {showResult && (
            <div className="animate-bounce-in">
              <p className="text-3xl font-bold mb-6" style={{ 
                fontFamily: 'Fredoka, cursive',
                color: selectedShape.id === currentShape.id ? '#A7C957' : '#EF476F'
              }}>
                {selectedShape.id === currentShape.id ? 'Correct! ⭐' : 'Try Again! 😊'}
              </p>
              <button 
                onClick={nextRound} 
                className="big-button"
                data-testid="next-shape-round"
              >
                {round < totalRounds ? 'Next Shape' : 'See Results'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShapeMatchGame;