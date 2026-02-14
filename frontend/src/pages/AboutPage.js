import { Shield, BookOpen, Users, Zap, Globe, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-12">
          <div className="text-8xl mb-4">🐘</div>
          <h1 className="text-4xl md:text-6xl font-bold text-kid-orange mb-4" style={{ fontFamily: 'Fredoka, cursive' }} data-testid="about-title">
            About Play2Learn 🎉
          </h1>
          <p className="text-xl text-gray-600">Making Learning Fun for Everyone!</p>
          <div className="mt-4 inline-block bg-kid-yellow/20 px-6 py-2 rounded-full">
            <span className="font-semibold text-gray-700">Perfect for Ages 3-7</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-kid-pink/10 to-kid-orange/10 p-6 rounded-3xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-kid-orange p-3 rounded-2xl flex-shrink-0">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Fredoka, cursive' }}>
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Traditional learning can be boring. Play2Learn transforms education into an interactive, 
                  joyful experience where kids learn by playing, tapping, watching, and exploring!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-kid-blue/10 to-kid-teal/10 p-6 rounded-3xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-kid-teal p-3 rounded-2xl flex-shrink-0">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Fredoka, cursive' }}>
                  Who It's For
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Designed for preschool and kindergarten children (ages 3-7), parents, and educators 
                  who want to make learning engaging and effective.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center" style={{ fontFamily: 'Fredoka, cursive' }}>
            What Kids Learn 🎓
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-kid-blue/20 p-6 rounded-2xl text-center">
              <div className="text-5xl mb-3">🔤</div>
              <h3 className="font-bold text-xl mb-2" style={{ fontFamily: 'Fredoka, cursive' }}>Alphabets</h3>
              <p className="text-gray-600">A-Z with pronunciation, phonics, and object recognition</p>
            </div>
            <div className="bg-kid-green/20 p-6 rounded-2xl text-center">
              <div className="text-5xl mb-3">🔢</div>
              <h3 className="font-bold text-xl mb-2" style={{ fontFamily: 'Fredoka, cursive' }}>Numbers</h3>
              <p className="text-gray-600">Counting 1-20 with visual aids and interactive games</p>
            </div>
            <div className="bg-kid-pink/20 p-6 rounded-2xl text-center">
              <div className="text-5xl mb-3">🎮</div>
              <h3 className="font-bold text-xl mb-2" style={{ fontFamily: 'Fredoka, cursive' }}>Games</h3>
              <p className="text-gray-600">4 fun games: Memory Match, Letter Catch, Count Objects, Shape Match</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-kid-green/20 to-kid-yellow/20 p-8 rounded-3xl mb-12">
          <div className="flex items-start gap-4">
            <div className="bg-white p-3 rounded-2xl flex-shrink-0">
              <Shield className="w-8 h-8 text-kid-green" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Fredoka, cursive' }}>
                Parent & Teacher Friendly 👨‍👩‍👧
              </h2>
              <ul className="text-lg text-gray-700 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-kid-green">✓</span>
                  <strong>100% Safe:</strong> No ads, no login required, no data collection
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-kid-green">✓</span>
                  <strong>Screen-time friendly:</strong> Educational content that matters
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-kid-green">✓</span>
                  <strong>Offline capable:</strong> Works without constant internet
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-kid-green">✓</span>
                  <strong>Progress tracking:</strong> Star rewards system motivates kids
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-kid-orange/10 to-kid-pink/10 p-8 rounded-3xl mb-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Fredoka, cursive' }}>
              Future Scope 🚀
            </h2>
            <p className="text-gray-600">We're constantly improving Play2Learn with exciting new features!</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-kid-orange flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1">AI Voice Tutor</h3>
                <p className="text-gray-600">Personalized learning assistant to guide each child</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-kid-teal flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1">Progress Dashboard</h3>
                <p className="text-gray-600">Detailed analytics for parents and teachers</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Globe className="w-6 h-6 text-kid-pink flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1">Multi-language Support</h3>
                <p className="text-gray-600">Learn in your native language</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <BookOpen className="w-6 h-6 text-kid-blue flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1">More Content</h3>
                <p className="text-gray-600">Additional games, stories, and learning modules</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link to="/" className="big-button inline-block" data-testid="start-learning">
            Start Learning Now!
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t-2 border-gray-200 text-center">
          <p className="text-gray-600 text-lg">
            Made with <span className="text-red-500">❤️</span> for curious young minds
          </p>
          <p className="text-gray-500 mt-2 font-semibold">Ages 3-7 | Safe | Fun | Educational</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;