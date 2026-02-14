import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const MascotHelper = ({ message, show, onClose }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
  }, [show]);

  if (!visible) return null;

  return (
    <div 
      className="fixed bottom-8 right-8 z-50 animate-bounce-in"
      data-testid="mascot-helper"
    >
      <div className="relative">
        <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-xs">
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 bg-kid-pink rounded-full p-2 hover:scale-110 transition-transform"
            data-testid="close-mascot"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          
          <div className="flex items-start gap-4">
            <div className="text-6xl flex-shrink-0 animate-wiggle">🐘</div>
            <div>
              <p className="text-lg font-semibold text-gray-800" style={{ fontFamily: 'Fredoka, cursive' }}>
                {message}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-2 right-12 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-white"></div>
      </div>
    </div>
  );
};

export default MascotHelper;