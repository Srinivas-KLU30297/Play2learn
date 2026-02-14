import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { RefreshCw, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { playSuccessSound, playErrorSound, speakFeedback } from "@/utils/audioUtils";

const gameItems = [
  { id: 1, emoji: '🍎', name: 'Apple' },
  { id: 2, emoji: '🐱', name: 'Cat' },
  { id: 3, emoji: '⭐', name: 'Star' },
  { id: 4, emoji: '🌈', name: 'Rainbow' },
  { id: 5, emoji: '🌸', name: 'Flower' },
  { id: 6, emoji: '🐠', name: 'Fish' },
];

const MemoryMatchGame = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffled = [...gameItems, ...gameItems]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({ ...item, uniqueId: index }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameComplete(false);
  };

  const handleCardClick = (uniqueId) => {
    if (flipped.length === 2 || flipped.includes(uniqueId) || matched.includes(cards.find(c => c.uniqueId === uniqueId).id)) {
      return;
    }

    const newFlipped = [...flipped, uniqueId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      const firstCard = cards.find(c => c.uniqueId === first);
      const secondCard = cards.find(c => c.uniqueId === second);

      if (firstCard.id === secondCard.id) {
        playSuccessSound();
        speakFeedback(true);
        setMatched([...matched, firstCard.id]);
        setFlipped([]);
        
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        window.dispatchEvent(new CustomEvent('starEarned', { detail: 10 }));

        if (matched.length + 1 === gameItems.length) {
          setTimeout(() => {
            setGameComplete(true);
            confetti({
              particleCount: 200,
              spread: 100,
              origin: { y: 0.5 }
            });
          }, 500);
        }
      } else {
        playErrorSound();
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  const isFlipped = (uniqueId) => flipped.includes(uniqueId);
  const isMatched = (id) => matched.includes(id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-kid-orange mb-4" style={{ fontFamily: 'Fredoka, cursive' }} data-testid="memory-game-title">
          Memory Match! 🧠
        </h1>
        <p className="text-xl text-gray-600">Find all the matching pairs</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/games')}
            className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
            data-testid="exit-to-menu"
          >
            <ArrowLeft className="w-5 h-5" />
            Games Menu
          </button>
          
          <div className="text-xl font-bold text-gray-700">
            Moves: <span className="text-kid-orange">{moves}</span>
          </div>
          
          <button
            onClick={initializeGame}
            className="flex items-center gap-2 bg-kid-teal text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform shadow-md"
            data-testid="restart-game"
          >
            <RefreshCw className="w-5 h-5" />
            Restart
          </button>
        </div>

        {gameComplete && (
          <div className="text-center mb-8 animate-bounce-in" data-testid="game-complete">
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="text-4xl font-bold text-kid-orange mb-2" style={{ fontFamily: 'Fredoka, cursive' }}>
              Awesome!
            </h2>
            <p className="text-2xl text-gray-700">You completed it in {moves} moves!</p>
          </div>
        )}

        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {cards.map((card) => (
            <div
              key={card.uniqueId}
              onClick={() => handleCardClick(card.uniqueId)}
              className={`game-card ${
                isFlipped(card.uniqueId) || isMatched(card.id) ? '' : 'bg-kid-blue'
              } ${
                isMatched(card.id) ? 'matched' : ''
              }`}
              data-testid={`game-card-${card.uniqueId}`}
            >
              {isFlipped(card.uniqueId) || isMatched(card.id) ? (
                <span className="text-6xl">{card.emoji}</span>
              ) : (
                <span className="text-6xl">❓</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryMatchGame;