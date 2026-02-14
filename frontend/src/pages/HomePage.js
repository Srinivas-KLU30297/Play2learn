import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

const categories = [
  {
    id: 'alphabets',
    title: 'Alphabets',
    emoji: '🔤',
    color: 'kid-blue',
    image: 'https://images.unsplash.com/photo-1722962495482-9c14485b3732?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA3MDR8MHwxfHNlYXJjaHwzfHxjdXRlJTIwY2FydG9vbiUyMGFscGhhYmV0JTIwbGVhcm5pbmclMjBpbGx1c3RyYXRpb258ZW58MHx8fHwxNzcxMDk3NTYxfDA&ixlib=rb-4.1.0&q=85',
    path: '/alphabets'
  },
  {
    id: 'rhymes',
    title: 'Rhymes',
    emoji: '🎵',
    color: 'kid-pink',
    image: 'https://images.unsplash.com/photo-1743964451700-c10e1d6e647d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2FydG9vbiUyMG51cnNlcnklMjByaHltZXMlMjBpbGx1c3RyYXRpb258ZW58MHx8fHwxNzcxMDk3NTYzfDA&ixlib=rb-4.1.0&q=85',
    path: '/rhymes'
  },
  {
    id: 'numbers',
    title: 'Numbers',
    emoji: '🔢',
    color: 'kid-green',
    image: 'https://images.unsplash.com/photo-1720293315632-37efe958d5ec?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHw0fHwzZCUyMHJlbmRlciUyMGNvbG9yZnVsJTIwbnVtYmVyJTIwMTIzJTIwZm9yJTIwa2lkc3xlbnwwfHx8fDE3NzEwOTc1OTZ8MA&ixlib=rb-4.1.0&q=85',
    path: '/numbers'
  },
  {
    id: 'quizzes',
    title: 'Quizzes',
    emoji: '❓',
    color: 'kid-yellow',
    image: 'https://images.unsplash.com/photo-1573691863165-14bf17020fd7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwyfHwzZCUyMHJlbmRlciUyMGNvbG9yZnVsJTIwcXVlc3Rpb24lMjBtYXJrJTIwZm9yJTIwa2lkc3xlbnwwfHx8fDE3NzEwOTc1OTd8MA&ixlib=rb-4.1.0&q=85',
    path: '/quiz'
  },
  {
    id: 'games',
    title: 'Games',
    emoji: '🎮',
    color: 'kid-orange',
    image: 'https://images.unsplash.com/photo-1569499559929-7a5b8b10899b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHw0fHxjb2xvcmZ1bCUyMHB1enpsZSUyMHBpZWNlcyUyMGNhcnRvb24lMjBpbGx1c3RyYXRpb258ZW58MHx8fHwxNzcxMDk3NTgzfDA&ixlib=rb-4.1.0&q=85',
    path: '/games'
  }
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen polka-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 animate-bounce-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-12 h-12 text-kid-yellow" />
            <h1 className="text-5xl md:text-7xl font-bold text-kid-orange" style={{ fontFamily: 'Fredoka, cursive' }} data-testid="home-title">
              Play2Learn
            </h1>
            <Sparkles className="w-12 h-12 text-kid-yellow" />
          </div>
          <p className="text-2xl md:text-3xl font-semibold text-kid-teal mt-4" style={{ fontFamily: 'Fredoka, cursive' }}>
            Let's Play & Learn! 🎉
          </p>
          <div className="mt-6">
            <img 
              src="https://images.unsplash.com/photo-1743964451762-9fbd78f1a2c3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzl8MHwxfHNlYXJjaHwxfHxjdXRlJTIwdmVjdG9yJTIwZWxlcGhhbnQlMjBpbGx1c3RyYXRpb24lMjBmbGF0JTIwZGVzaWdufGVufDB8fHx8MTc3MTA5NzU4NHww&ixlib=rb-4.1.0&q=85"
              alt="Mascot"
              className="w-64 h-64 mx-auto object-cover rounded-full shadow-2xl float-animation"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => navigate(category.path)}
              style={{ 
                animationDelay: `${index * 100}ms`,
                animation: 'bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
                opacity: 0
              }}
              data-testid={`category-card-${category.id}`}
            >
              <div className="relative w-full h-32 overflow-hidden rounded-xl mb-3">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-6xl mb-2">{category.emoji}</span>
              <h2 
                className="text-3xl md:text-4xl font-bold" 
                style={{ 
                  fontFamily: 'Fredoka, cursive',
                  color: `var(--${category.color}, #FF9F1C)`
                }}
              >
                {category.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;