import { useState } from "react";
import confetti from "canvas-confetti";
import { Volume2 } from "lucide-react";
import MascotHelper from "@/components/MascotHelper";
import { playClickSound, playSuccessSound, speakText } from "@/utils/audioUtils";

const numberData = Array.from({ length: 20 }, (_, i) => {
  const number = i + 1;
  const emojis = ['🍎', '⭐', '🎈', '🌸', '🍪', '🎨', '🎁', '🌈', '🧸', '🎵'];
  return {
    number,
    emoji: emojis[i % emojis.length],
    color: `hsl(${(number * 18) % 360}, 70%, 65%)`
  };
});

const NumbersPage = () => {
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [showMascot, setShowMascot] = useState(true);

  const handleNumberClick = (item) => {
    playClickSound();
    setSelectedNumber(item);
    speakText(`Number ${item.number}`);
    
    confetti({
      particleCount: item.number * 5,
      spread: 70,
      origin: { y: 0.6 }
    });

    window.dispatchEvent(new CustomEvent('starEarned', { detail: 1 }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-kid-green mb-4" style={{ fontFamily: 'Fredoka, cursive' }} data-testid="numbers-title">
          Count with Us! 🔢
        </h1>
        <p className="text-xl text-gray-600">Tap on any number to count</p>
      </div>

      {selectedNumber && (
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12 text-center animate-bounce-in" data-testid="number-detail">
          <div className="text-9xl mb-4 font-black" style={{ color: selectedNumber.color }}>
            {selectedNumber.number}
          </div>
          <div className="flex justify-center gap-2 mb-6 flex-wrap">
            {Array.from({ length: selectedNumber.number }, (_, i) => (
              <span key={i} className="text-5xl animate-bounce-in" style={{ animationDelay: `${i * 50}ms` }}>
                {selectedNumber.emoji}
              </span>
            ))}
          </div>
          <button
            onClick={() => speakText(`Number ${selectedNumber.number}`)}
            className="big-button flex items-center gap-2 mx-auto"
            data-testid="speak-number-button"
          >
            <Volume2 className="w-6 h-6" />
            Say it again!
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-6">
        {numberData.map((item) => (
          <div
            key={item.number}
            className="alphabet-card"
            style={{ 
              borderBottomColor: item.color,
              color: item.color
            }}
            onClick={() => handleNumberClick(item)}
            data-testid={`number-card-${item.number}`}
          >
            {item.number}
          </div>
        ))}
      </div>

      <MascotHelper 
        message="Count with me! Tap any number to learn!"
        show={showMascot && !selectedNumber}
        onClose={() => setShowMascot(false)}
      />
    </div>
  );
};

export default NumbersPage;