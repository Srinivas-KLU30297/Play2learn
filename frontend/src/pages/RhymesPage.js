const rhymes = [
  {
    id: 'yCjJyiqpAuU',
    title: 'Twinkle Twinkle Little Star',
    emoji: '⭐',
    color: 'kid-yellow'
  },
  {
    id: '_6HzoUcx3eo',
    title: 'Old MacDonald Had a Farm',
    emoji: '🚜',
    color: 'kid-green'
  },
  {
    id: '71hqRT9U0wg',
    title: 'Baby Shark',
    emoji: '🦈',
    color: 'kid-blue'
  },
  {
    id: 'BwC_W46H7dM',
    title: 'Wheels on the Bus',
    emoji: '🚌',
    color: 'kid-orange'
  },
  {
    id: 'fPMjnlTESGM',
    title: 'Five Little Ducks',
    emoji: '🦆',
    color: 'kid-pink'
  },
  {
    id: 'eBVqcTEC3zQ',
    title: 'Humpty Dumpty',
    emoji: '🥚',
    color: 'kid-yellow'
  }
];

const RhymesPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-kid-pink mb-4" style={{ fontFamily: 'Fredoka, cursive' }} data-testid="rhymes-title">
          Sing Along! 🎵
        </h1>
        <p className="text-xl text-gray-600">Watch and sing your favorite nursery rhymes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {rhymes.map((rhyme) => (
          <div key={rhyme.id} className="bg-white rounded-3xl shadow-xl p-6" data-testid={`rhyme-card-${rhyme.id}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl">{rhyme.emoji}</span>
              <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Fredoka, cursive' }}>
                {rhyme.title}
              </h2>
            </div>
            <div className="video-container">
              <iframe
                src={`https://www.youtube.com/embed/${rhyme.id}`}
                title={rhyme.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                data-testid={`video-${rhyme.id}`}
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RhymesPage;