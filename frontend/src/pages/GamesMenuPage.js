import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MascotHelper from "@/components/MascotHelper";
import { playClickSound } from "@/utils/audioUtils";

const games = [
  {
    id: 'memory-match',
    title: 'Memory Match',
    emoji: '🧠',
    color: 'kid-orange',
    description: 'Find matching pairs!',
    path: '/games/memory-match'
  },
  {
    id: 'letter-catch',
    title: 'Letter Catch',
    emoji: '🔤',
    color: 'kid-blue',
    description: 'Catch falling letters!',
    path: '/games/letter-catch'
  },
  {
    id: 'count-objects',
    title: 'Count Objects',
    emoji: '🔢',
    color: 'kid-green',
    description: 'Count and learn!',
    path: '/games/count-objects'
  },
  {
    id: 'shape-match',
    title: 'Shape Match',
    emoji: '🔷',
    color: 'kid-pink',
    description: 'Match the shapes!',
    path: '/games/shape-match'
  }
];

const GamesMenuPage = () => {
  const navigate = useNavigate();
  const [showMascot, setShowMascot] = useState(true);

  const handleGameClick = (path) => {
    playClickSound();
    navigate(path);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-kid-orange mb-4" style={{ fontFamily: 'Fredoka, cursive' }} data-testid="games-menu-title">
          Choose a Game! 🎮
        </h1>
        <p className="text-xl text-gray-600">Pick your favorite game to play</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {games.map((game, index) => (
          <div
            key={game.id}
            onClick={() => handleGameClick(game.path)}
            className="bg-white rounded-3xl shadow-xl p-8 cursor-pointer transition-all hover:scale-105 hover:shadow-2xl"
            style={{ 
              animationDelay: `${index * 100}ms`,
              animation: 'bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
              opacity: 0
            }}
            data-testid={`game-card-${game.id}`}
          >
            <div className="text-center">
              <div className="text-8xl mb-4">{game.emoji}</div>
              <h2 
                className="text-3xl font-bold mb-2" 
                style={{ 
                  fontFamily: 'Fredoka, cursive',
                  color: `var(--${game.color})`
                }}
              >
                {game.title}
              </h2>
              <p className="text-gray-600 text-lg">{game.description}</p>
            </div>
          </div>
        ))}
      </div>

      <MascotHelper 
        message="Click a game to start playing and earn stars!"
        show={showMascot}
        onClose={() => setShowMascot(false)}
      />
    </div>
  );
};

export default GamesMenuPage;