import { useState } from "react";
import confetti from "canvas-confetti";
import { Volume2 } from "lucide-react";
import MascotHelper from "@/components/MascotHelper";
import { playClickSound, playSuccessSound, speakText } from "@/utils/audioUtils";

const alphabetData = [
  { letter: 'A', object: 'Apple', emoji: '🍎', color: '#FF6B6B' },
  { letter: 'B', object: 'Ball', emoji: '⚽', color: '#4ECDC4' },
  { letter: 'C', object: 'Cat', emoji: '🐱', color: '#FFE66D' },
  { letter: 'D', object: 'Dog', emoji: '🐕', color: '#95E1D3' },
  { letter: 'E', object: 'Elephant', emoji: '🐘', color: '#C7CEEA' },
  { letter: 'F', object: 'Fish', emoji: '🐠', color: '#89CFF0' },
  { letter: 'G', object: 'Grapes', emoji: '🍇', color: '#DDA0DD' },
  { letter: 'H', object: 'House', emoji: '🏠', color: '#FFB6C1' },
  { letter: 'I', object: 'Ice Cream', emoji: '🍦', color: '#FFDAB9' },
  { letter: 'J', object: 'Juice', emoji: '🧃', color: '#FFA07A' },
  { letter: 'K', object: 'Kite', emoji: '🪁', color: '#98D8C8' },
  { letter: 'L', object: 'Lion', emoji: '🦁', color: '#F7DC6F' },
  { letter: 'M', object: 'Moon', emoji: '🌙', color: '#E6E6FA' },
  { letter: 'N', object: 'Nose', emoji: '👃', color: '#FFD1DC' },
  { letter: 'O', object: 'Orange', emoji: '🍊', color: '#FFB347' },
  { letter: 'P', object: 'Pencil', emoji: '✏️', color: '#B4E7CE' },
  { letter: 'Q', object: 'Queen', emoji: '👸', color: '#F2B8D3' },
  { letter: 'R', object: 'Rainbow', emoji: '🌈', color: '#AEC6CF' },
  { letter: 'S', object: 'Sun', emoji: '☀️', color: '#FDFD96' },
  { letter: 'T', object: 'Tiger', emoji: '🐯', color: '#FFB347' },
  { letter: 'U', object: 'Umbrella', emoji: '☔', color: '#89CFF0' },
  { letter: 'V', object: 'Van', emoji: '🚐', color: '#C9A0DC' },
  { letter: 'W', object: 'Watch', emoji: '⌚', color: '#B0E0E6' },
  { letter: 'X', object: 'Xylophone', emoji: '🎹', color: '#FFB6D9' },
  { letter: 'Y', object: 'Yak', emoji: '🐃', color: '#C4A57B' },
  { letter: 'Z', object: 'Zebra', emoji: '🦓', color: '#E0E0E0' }
];

const AlphabetsPage = () => {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [showMascot, setShowMascot] = useState(true);

  const handleLetterClick = (item) => {
    playClickSound();
    setSelectedLetter(item);
    speakText(`${item.letter} for ${item.object}`);
    
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    window.dispatchEvent(new CustomEvent('starEarned', { detail: 1 }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-kid-blue mb-4" style={{ fontFamily: 'Fredoka, cursive' }} data-testid="alphabets-title">
          Learn Your ABCs! 🔤
        </h1>
        <p className="text-xl text-gray-600">Tap on any letter to hear its sound</p>
      </div>

      {selectedLetter && (
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12 text-center animate-bounce-in" data-testid="letter-detail">
          <div className="text-9xl mb-4" style={{ color: selectedLetter.color }}>
            {selectedLetter.letter}
          </div>
          <div className="text-8xl mb-4">{selectedLetter.emoji}</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Fredoka, cursive' }}>
            {selectedLetter.letter} for {selectedLetter.object}
          </h2>
          <button
            onClick={() => speak(`${selectedLetter.letter} for ${selectedLetter.object}`)}
            className="big-button flex items-center gap-2 mx-auto"
            data-testid="speak-button"
          >
            <Volume2 className="w-6 h-6" />
            Say it again!
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {alphabetData.map((item) => (
          <div
            key={item.letter}
            className="alphabet-card"
            style={{ 
              borderBottomColor: item.color,
              color: item.color
            }}
            onClick={() => handleLetterClick(item)}
            data-testid={`letter-card-${item.letter}`}
          >
            {item.letter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlphabetsPage;