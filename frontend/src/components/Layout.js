import { Link, useLocation } from "react-router-dom";
import { Home, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect } from "react";

const Layout = ({ children }) => {
  const location = useLocation();
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [stars, setStars] = useState(() => {
    const saved = localStorage.getItem('stars');
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('stars', stars.toString());
  }, [stars]);

  useEffect(() => {
    const handleStarEarned = (e) => {
      setStars(prev => prev + (e.detail || 1));
    };
    window.addEventListener('starEarned', handleStarEarned);
    return () => window.removeEventListener('starEarned', handleStarEarned);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen">
      {!isHome && (
        <nav className="bg-white shadow-md sticky top-0 z-50" data-testid="main-nav">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform" data-testid="home-link">
                <Home className="w-8 h-8 text-kid-orange" />
                <span className="text-2xl font-bold text-kid-orange" style={{ fontFamily: 'Fredoka, cursive' }}>
                  Play2Learn
                </span>
              </Link>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-kid-yellow px-4 py-2 rounded-full" data-testid="star-counter">
                  <span className="text-2xl">⭐</span>
                  <span className="text-xl font-bold text-gray-800">{stars}</span>
                </div>
                
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-3 rounded-full bg-kid-teal hover:bg-kid-teal/80 transition-colors"
                  data-testid="sound-toggle"
                  aria-label="Toggle sound"
                >
                  {soundEnabled ? (
                    <Volume2 className="w-6 h-6 text-white" />
                  ) : (
                    <VolumeX className="w-6 h-6 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
      
      <main className="pb-8">
        {children}
      </main>

      {!isHome && (
        <footer className="bg-white mt-12 py-8 border-t-4 border-kid-yellow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg font-medium text-gray-600">
              Keep Learning, Keep Playing! 🎉
            </p>
            <Link to="/about" className="text-kid-orange hover:text-kid-orange/80 font-semibold mt-2 inline-block" data-testid="about-link">
              About Play2Learn
            </Link>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;