import { Heart, Target, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-kid-orange mb-4" style={{ fontFamily: 'Fredoka, cursive' }} data-testid="about-title">
            About Play2Learn 🎉
          </h1>
          <p className="text-xl text-gray-600">Making Learning Fun for Everyone!</p>
        </div>

        <div className="space-y-8">
          <div className="flex gap-6 items-start">
            <div className="bg-kid-pink p-4 rounded-2xl flex-shrink-0">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Fredoka, cursive' }}>
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Many children find traditional learning boring. Play2Learn transforms education into a fun, 
                playful experience where kids learn by tapping, watching, listening, and playing. We believe 
                that when learning is fun, children naturally become curious and engaged!
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="bg-kid-teal p-4 rounded-2xl flex-shrink-0">
              <Target className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Fredoka, cursive' }}>
                What We Offer
              </h2>
              <ul className="text-lg text-gray-600 leading-relaxed space-y-2">
                <li>• <strong>Alphabets:</strong> Learn A-Z with fun sounds and objects</li>
                <li>• <strong>Numbers:</strong> Count from 1 to 20 with interactive visuals</li>
                <li>• <strong>Rhymes:</strong> Sing along with favorite nursery rhymes</li>
                <li>• <strong>Quizzes:</strong> Test knowledge with kid-friendly questions</li>
                <li>• <strong>Games:</strong> Play matching games with rewards</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="bg-kid-yellow p-4 rounded-2xl flex-shrink-0">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Fredoka, cursive' }}>
                Future Scope
              </h2>
              <ul className="text-lg text-gray-600 leading-relaxed space-y-2">
                <li>• AI voice assistant for personalized learning</li>
                <li>• More interactive games and quizzes</li>
                <li>• Progress tracking for parents and teachers</li>
                <li>• Multi-language support</li>
                <li>• Custom learning paths</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link to="/" className="big-button inline-block" data-testid="start-learning">
            Start Learning Now!
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t-2 border-gray-200 text-center">
          <p className="text-gray-600 text-lg">
            Made with <span className="text-red-500">❤️</span> for curious young minds
          </p>
          <p className="text-gray-500 mt-2">Ages 3-7 | Safe | Fun | Educational</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;