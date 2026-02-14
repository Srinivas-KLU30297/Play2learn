import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Star, ChevronRight } from "lucide-react";

const quizData = [
  {
    category: 'Animals',
    questions: [
      {
        question: 'Which animal says "Meow"?',
        options: ['Dog 🐕', 'Cat 🐱', 'Cow 🐄'],
        correct: 1,
        emoji: '🐱'
      },
      {
        question: 'Which animal has a trunk?',
        options: ['Lion 🦁', 'Elephant 🐘', 'Monkey 🐒'],
        correct: 1,
        emoji: '🐘'
      },
      {
        question: 'Which animal lives in water?',
        options: ['Bird 🐦', 'Fish 🐠', 'Tiger 🐯'],
        correct: 1,
        emoji: '🐠'
      }
    ]
  },
  {
    category: 'Colors',
    questions: [
      {
        question: 'What color is the sky?',
        options: ['Green 🟢', 'Blue 🔵', 'Red 🔴'],
        correct: 1,
        emoji: '☁️'
      },
      {
        question: 'What color is a banana?',
        options: ['Yellow 🟡', 'Purple 🟣', 'Brown 🟤'],
        correct: 0,
        emoji: '🍌'
      },
      {
        question: 'What color is grass?',
        options: ['Orange 🟠', 'Green 🟢', 'Pink 💖'],
        correct: 1,
        emoji: '🌱'
      }
    ]
  },
  {
    category: 'Shapes',
    questions: [
      {
        question: 'Which shape is round?',
        options: ['Square □', 'Circle ◯', 'Triangle △'],
        correct: 1,
        emoji: '⭕'
      },
      {
        question: 'Which shape has 3 sides?',
        options: ['Triangle △', 'Rectangle ▭', 'Star ⭐'],
        correct: 0,
        emoji: '🔺'
      }
    ]
  }
];

const QuizPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQuiz = selectedCategory ? quizData.find(q => q.category === selectedCategory) : null;
  const question = currentQuiz?.questions[currentQuestion];

  const playSound = (isCorrect) => {
    const soundEnabled = JSON.parse(localStorage.getItem('soundEnabled') || 'true');
    if (!soundEnabled) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (isCorrect) {
      oscillator.frequency.value = 523.25;
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } else {
      oscillator.frequency.value = 200;
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    }
  };

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const isCorrect = index === question.correct;
    
    if (isCorrect) {
      setScore(score + 1);
      playSound(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      window.dispatchEvent(new CustomEvent('starEarned', { detail: 5 }));
    } else {
      playSound(false);
    }

    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < currentQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setSelectedCategory(null);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizComplete(false);
  };

  if (!selectedCategory) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-kid-yellow mb-4" style={{ fontFamily: 'Fredoka, cursive' }} data-testid="quiz-title">
            Fun Quizzes! ❓
          </h1>
          <p className="text-xl text-gray-600">Choose a quiz category to start</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {quizData.map((quiz) => (
            <button
              key={quiz.category}
              onClick={() => setSelectedCategory(quiz.category)}
              className="bg-white rounded-3xl shadow-xl p-8 hover:scale-105 transition-transform"
              data-testid={`quiz-category-${quiz.category.toLowerCase()}`}
            >
              <div className="text-6xl mb-4">
                {quiz.category === 'Animals' && '🐾'}
                {quiz.category === 'Colors' && '🎨'}
                {quiz.category === 'Shapes' && '🔷'}
              </div>
              <h2 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Fredoka, cursive' }}>
                {quiz.category}
              </h2>
              <p className="text-gray-600 mt-2">{quiz.questions.length} Questions</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const percentage = Math.round((score / currentQuiz.questions.length) * 100);
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center" data-testid="quiz-complete">
          <div className="text-8xl mb-6">
            {percentage >= 80 ? '🎉' : percentage >= 50 ? '😊' : '💪'}
          </div>
          <h2 className="text-5xl font-bold text-kid-orange mb-4" style={{ fontFamily: 'Fredoka, cursive' }}>
            {percentage >= 80 ? 'Amazing!' : percentage >= 50 ? 'Great Job!' : 'Keep Trying!'}
          </h2>
          <p className="text-3xl font-semibold text-gray-700 mb-8">
            You scored {score} out of {currentQuiz.questions.length}!
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={resetQuiz} className="big-button" data-testid="back-to-categories">
              Try Another Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Fredoka, cursive' }}>
            {selectedCategory} Quiz
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold text-gray-600">
              Question {currentQuestion + 1} / {currentQuiz.questions.length}
            </span>
            <div className="flex items-center gap-2 bg-kid-yellow px-4 py-2 rounded-full">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-bold">{score}</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">{question.emoji}</div>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8" style={{ fontFamily: 'Fredoka, cursive' }} data-testid="quiz-question">
              {question.question}
            </h3>
          </div>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`quiz-option w-full ${
                  selectedAnswer === index
                    ? index === question.correct
                      ? 'correct'
                      : 'incorrect'
                    : ''
                }`}
                data-testid={`quiz-option-${index}`}
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
              color: selectedAnswer === question.correct ? '#A7C957' : '#EF476F'
            }}>
              {selectedAnswer === question.correct ? 'Correct! ⭐' : 'Try Again! 😊'}
            </p>
            <button onClick={nextQuestion} className="big-button flex items-center gap-2 mx-auto" data-testid="next-question">
              {currentQuestion < currentQuiz.questions.length - 1 ? 'Next Question' : 'See Results'}
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;