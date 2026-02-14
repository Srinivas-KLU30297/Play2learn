import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Volume2, VolumeX, ArrowLeft, BookA, Music, Hash, HelpCircle, Gamepad2 } from "lucide-react";
import { useState, useEffect } from "react";

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
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

  const navItems = [
    { path: '/', icon: Home, label: 'Home', color: 'kid-orange' },
    { path: '/alphabets', icon: BookA, label: 'Alphabets', color: 'kid-blue' },
    { path: '/rhymes', icon: Music, label: 'Rhymes', color: 'kid-pink' },
    { path: '/numbers', icon: Hash, label: 'Numbers', color: 'kid-green' },
    { path: '/quiz', icon: HelpCircle, label: 'Quizzes', color: 'kid-yellow' },
    { path: '/games', icon: Gamepad2, label: 'Games', color: 'kid-orange' }
  ];

  return (
    <div className="min-h-screen">
      {!isHome && (
        <nav className="bg-white shadow-lg sticky top-0 z-50" data-testid="main-nav">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-all hover:scale-110"
                  data-testid="back-button"
                  aria-label="Go back"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-700" />
                </button>
                
                <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform" data-testid="home-link">
                  <span className="text-2xl font-bold text-kid-orange" style={{ fontFamily: 'Fredoka, cursive' }}>
                    Play2Learn
                  </span>
                </Link>
              </div>

              <div className="hidden md:flex items-center gap-2">
                {navItems.slice(1).map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all hover:scale-105 ${
                        isActive 
                          ? `bg-${item.color} text-white shadow-lg` 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      data-testid={`nav-${item.label.toLowerCase()}`}
                      style={isActive ? { backgroundColor: `var(--${item.color})` } : {}}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="hidden lg:inline">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-kid-yellow px-4 py-2 rounded-full shadow-md" data-testid="star-counter">
                  <span className="text-2xl">⭐</span>
                  <span className="text-xl font-bold text-gray-800">{stars}</span>
                </div>
                
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-3 rounded-full bg-kid-teal hover:bg-kid-teal/80 transition-all hover:scale-110 shadow-md"
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