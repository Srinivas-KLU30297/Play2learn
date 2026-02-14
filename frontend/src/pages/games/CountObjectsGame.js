import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { RefreshCw, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { playSuccessSound, playErrorSound, speakFeedback, speakText } from "@/utils/audioUtils";

const objectEmojis = ['🍎', '⚽', '🌸', '🍪', '⭐', '🌈', '🐝'];
const objectNames = ['apples', 'balls', 'flowers', 'cookies', 'stars', 'rainbows', 'bees'];

const CountObjectsGame = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const totalQuestions = 5;

  const generateQuestion = () => {
    const correctCount = Math.floor(Math.random() * 8) + 3;
    const emojiIndex = Math.floor(Math.random() * objectEmojis.length);
    const emoji = objectEmojis[emojiIndex];
    const name = objectNames[emojiIndex];
    
    const wrongAnswer1 = correctCount + (Math.random() > 0.5 ? 1 : -1);
    const wrongAnswer2 = correctCount + (Math.random() > 0.5 ? 2 : -2);
    
    const options = [correctCount, wrongAnswer1, wrongAnswer2]
      .filter(n => n > 0)
      .sort(() => Math.random() - 0.5);
    
    while (options.length < 3) {
      const newOption = Math.floor(Math.random() * 10) + 1;
      if (!options.includes(newOption)) {
        options.push(newOption);
      }
    }
    
    return {
      count: correctCount,
      emoji,
      name,
      options: options.slice(0, 3),
      correctAnswer: correctCount
    };
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setQuestionNumber(1);
    setGameComplete(false);
    setCurrentQuestion(generateQuestion());
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answer);
    const isCorrect = answer === currentQuestion.correctAnswer;
    
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

  const nextQuestion = () => {
    if (questionNumber < totalQuestions) {
      setQuestionNumber(questionNumber + 1);
      setCurrentQuestion(generateQuestion());
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameComplete(true);
    }
  };

  if (!gameStarted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-kid-green mb-8" style={{ fontFamily: 'Fredoka, cursive' }}>
            Count the Objects! 🔢
          </h1>
          
          <div className="bg-white rounded-3xl shadow-xl p-12 max-w-2xl mx-auto">
            <div className="text-8xl mb-6">🐘</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Fredoka, cursive' }}>
              How to Play:
            </h2>
            <div className="text-left text-lg text-gray-700 space-y-3 mb-8">
              <p>• Count the objects shown on screen</p>
              <p>• Choose the correct number from 3 options</p>
              <p>• Answer 5 questions correctly</p>
              <p>• Earn stars for each correct answer!</p>
            </div>
            
            <button
              onClick={startGame}
              className="big-button text-2xl px-12 py-6"
              data-testid="start-count-game"
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
    const percentage = Math.round((score / totalQuestions) * 100);
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12 max-w-2xl mx-auto" data-testid="count-game-complete">
            <div className="text-8xl mb-6">
              {percentage >= 80 ? '🎉' : percentage >= 60 ? '😊' : '💪'}
            </div>
            <h2 className="text-5xl font-bold text-kid-green mb-4" style={{ fontFamily: 'Fredoka, cursive' }}>
              {percentage >= 80 ? 'Amazing!' : percentage >= 60 ? 'Great Job!' : 'Keep Practicing!'}
            </h2>
            <p className="text-3xl font-semibold text-gray-700 mb-8">
              You got {score} out of {totalQuestions} correct!
            </p>
            
            <div className="flex gap-4 justify-center">
              <button onClick={startGame} className="big-button" data-testid="play-again-count">
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
              Question {questionNumber} / {totalQuestions}
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

        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-8" style={{ fontFamily: 'Fredoka, cursive' }} data-testid="count-question">
            How many {currentQuestion?.name}?
          </h3>
          
          <div className="bg-gradient-to-br from-kid-green/20 to-kid-blue/20 rounded-3xl p-8 mb-8 min-h-[200px] flex items-center justify-center flex-wrap gap-3">
            {Array.from({ length: currentQuestion?.count || 0 }, (_, i) => (
              <span 
                key={i} 
                className="text-6xl animate-bounce-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {currentQuestion?.emoji}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {currentQuestion?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
                className={`text-4xl font-black py-8 rounded-2xl transition-all hover:scale-105 ${
                  selectedAnswer === option
                    ? option === currentQuestion.correctAnswer
                      ? 'bg-kid-green text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-white border-4 border-gray-200 hover:border-kid-green'
                }`}
                data-testid={`count-option-${option}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {showResult && (
          <div className="text-center animate-bounce-in">
            <p className="text-3xl font-bold mb-6" style={{ 
              fontFamily: 'Fredoka, cursive',
              color: selectedAnswer === currentQuestion.correctAnswer ? '#A7C957' : '#EF476F'
            }}>
              {selectedAnswer === currentQuestion.correctAnswer ? 'Correct! ⭐' : 'Try Again! 😊'}
            </p>
            <button 
              onClick={nextQuestion} 
              className="big-button"
              data-testid="next-count-question"
            >
              {questionNumber < totalQuestions ? 'Next Question' : 'See Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountObjectsGame;