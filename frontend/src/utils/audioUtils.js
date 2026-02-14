export const playClickSound = () => {
  const soundEnabled = JSON.parse(localStorage.getItem('soundEnabled') || 'true');
  if (!soundEnabled) return;

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 800;
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
};

export const playSuccessSound = () => {
  const soundEnabled = JSON.parse(localStorage.getItem('soundEnabled') || 'true');
  if (!soundEnabled) return;

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 523.25;
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.2);
};

export const playErrorSound = () => {
  const soundEnabled = JSON.parse(localStorage.getItem('soundEnabled') || 'true');
  if (!soundEnabled) return;

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = 200;
  gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
};

export const speakText = (text) => {
  const soundEnabled = JSON.parse(localStorage.getItem('soundEnabled') || 'true');
  if (!soundEnabled) return;

  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.speak(utterance);
  }
};

export const speakFeedback = (isCorrect) => {
  const messages = isCorrect 
    ? ['Great Job!', 'Awesome!', 'Well Done!', 'Amazing!', 'Fantastic!']
    : ['Try Again!', 'Almost There!', 'You Can Do It!', 'Keep Trying!'];
  
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  speakText(randomMessage);
};