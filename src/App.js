import React, { useState, useRef } from 'react';

export default function ValentineLetter() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handleEnvelopeClick = () => {
    setEnvelopeOpened(true);
    setTimeout(() => {
      setShowLetter(true);
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setMusicPlaying(true);
        }).catch(err => {
          console.log('Autoplay prevented');
        });
      }
    }, 1200);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
        setMusicPlaying(false);
      } else {
        audioRef.current.play();
        setMusicPlaying(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-pink-400 to-rose-500 overflow-x-hidden">
      {/* Video Container */}
      <div
        className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-opacity duration-500 ${
          videoEnded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <video
          className="max-w-full max-h-full"
          controls
          autoPlay
          onEnded={handleVideoEnd}
        >
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Envelope Container */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-40 transition-opacity duration-500 ${
          videoEnded && !envelopeOpened ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative">
          <div
            className="relative w-[450px] h-[300px] cursor-pointer group"
            onClick={handleEnvelopeClick}
          >
            {/* Envelope Back Flap (bottom layer) */}
            <div className="absolute bottom-0 left-0 w-[450px] h-[270px] bg-gradient-to-br from-gray-50 to-white shadow-2xl rounded-b-3xl z-10">
              {/* Top triangle flaps of back */}
              <div className="absolute top-0 left-0 w-0 h-0" style={{
                borderLeft: '225px solid transparent',
                borderRight: '225px solid transparent',
                borderBottom: '112.5px solid #f9fafb'
              }} />
            </div>

            {/* Letter Paper - Peeking out */}
            <div
              className="absolute top-8 left-[105px] w-[240px] h-[200px] bg-gradient-to-br from-white to-pink-50 z-15 rounded-t-xl shadow-2xl border-3 border-pink-100 transition-all duration-700"
              style={{
                transform: envelopeOpened ? 'translateY(-280px) scale(1.05)' : 'translateY(0)',
              }}
            >
              {/* Decorative lines on paper */}
              <div className="p-6 space-y-3 mt-4">
                <div className="h-2 bg-pink-200 rounded-full w-3/4"></div>
                <div className="h-2 bg-pink-100 rounded-full w-full"></div>
                <div className="h-2 bg-pink-100 rounded-full w-5/6"></div>
                <div className="h-2 bg-pink-50 rounded-full w-2/3"></div>
              </div>
            </div>

            {/* Envelope Front Flap - Opens upward */}
            <div
              className="absolute top-[30px] left-0 w-0 h-0 origin-top transition-all duration-700 z-30"
              style={{
                transform: envelopeOpened ? 'rotateX(180deg)' : 'rotateX(0deg)',
                borderLeft: '225px solid transparent',
                borderRight: '225px solid transparent',
                borderTop: '150px solid #ffffff',
                filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.15))',
              }}
            />

            {/* Pink Wax Seal */}
            {!envelopeOpened && (
              <div className="absolute top-[140px] left-1/2 transform -translate-x-1/2 z-40">
                <div className="relative w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="text-4xl">❤️</div>
                  {/* Wax drip effect */}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-pink-500 rounded-full opacity-60"></div>
                </div>
              </div>
            )}
          </div>
          
          {!envelopeOpened && (
            <div className="absolute -bottom-20 w-full text-center">
              <div className="text-white text-xl font-semibold animate-pulse drop-shadow-lg">
                Click to open ❤️
              </div>
              <div className="text-pink-100 text-base mt-2 drop-shadow">
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Letter Content */}
      <div
        className={`transition-opacity duration-500 ${
          showLetter ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="max-w-4xl mx-auto px-5 py-10">
          <div className="bg-white rounded-xl shadow-2xl p-20 relative overflow-visible border-4 border-pink-200">
            {/* Cat Stickers - Bigger and prettier */}
            <div className="absolute -top-14 -left-20 w-48 h-48 bg-pink-100 border-4 border-white rounded-2xl shadow-xl flex items-center justify-center transform -rotate-12 hover:scale-110 transition-transform">
              <img src="/cat1.jpg" alt="Cat 1" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="absolute -top-14 -right-20 w-48 h-48 bg-pink-100 border-4 border-white rounded-2xl shadow-xl flex items-center justify-center transform rotate-12 hover:scale-110 transition-transform">
              <img src="/cat2.jpg" alt="Cat 2" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="absolute -bottom-16 -left-20 w-48 h-48 bg-pink-100 border-4 border-white rounded-2xl shadow-xl flex items-center justify-center transform rotate-6 hover:scale-110 transition-transform">
              <img src="/cat3.jpg" alt="Cat 3" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="absolute -bottom-16 -right-20 w-48 h-48 bg-pink-100 border-4 border-white rounded-2xl shadow-xl flex items-center justify-center transform -rotate-12 hover:scale-110 transition-transform">
              <img src="/cat4.jpg" alt="Cat 4" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="absolute top-1/2 -left-36 w-48 h-48 bg-pink-100 border-4 border-white rounded-2xl shadow-xl flex items-center justify-center transform -translate-y-1/2 -rotate-6 hover:scale-110 transition-transform">
              <img src="/cat5.jpg" alt="Cat 5" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="absolute top-1/2 -right-36 w-48 h-48 bg-pink-100 border-4 border-white rounded-2xl shadow-xl flex items-center justify-center transform -translate-y-1/2 rotate-12 hover:scale-110 transition-transform">
              <img src="/cat6.jpg" alt="Cat 6" className="w-full h-full object-cover rounded-xl" />
            </div>

            {/* Letter Content */}
            <h1 className="text-5xl text-center text-pink-600 mb-10 font-serif italic">
              To My Dearest Love,
            </h1>

          <div className="space-y-6 text-lg leading-relaxed text-gray-800 font-serif text-justify">

              <p>
                I hope you read this at a quiet moment, when you can breathe a little. I wanted to write something for you today, something that is for you and about you. Not about us or what we could be, but about the person you are and the person I am slowly getting to know.
              </p>

              <p>
                You have this way of pushing through things even when they try to weigh you down. I notice it. I notice how strong you try to be, even when things feel too heavy. I notice how you show up for others, how you try to keep going even when you are tired or hurting. It is not easy to do that. It takes a kind of strength that not everyone has. You may not always feel strong, but I see it in you.
              </p>

              <p>
                I also want you to know that it is alright to feel tired. It is alright to slow down. It is alright to rest and let yourself breathe without feeling guilty. You deserve moments of calm. You deserve softness. You deserve care. You do not need to carry everything alone.
              </p>

              <p>
                There are days when I wish I could sit beside you and give you even a small bit of comfort. Not by fixing anything, but simply by being present. I wish I could let you forget the world for a while and just exist without pressure. Maybe one day that will happen. For now, I want you to know that even from far away, I am someone who wants the best for you. Someone who cares about your well-being, your peace, your small joys, and your quiet moments.
              </p>

              <p>
                When you share pieces of your day with me, even the simple ones, I feel grateful. It means a lot to be trusted with even a small part of your life. You do not have to be perfect with me. You do not have to pretend to be fine when you are not. You do not have to hide the hard parts of your days. You are allowed to be human with me.
              </p>

              <p>
                I am glad our paths crossed. I am glad I get to know you little by little. I like you, and I like the person you are becoming. I know you do your best, even when it feels like it is not enough. I know you carry more than you show. I know you keep moving forward even when your days are long and your nights are heavy. I hope you give yourself the same patience that you give to others.
              </p>

              <p> You deserve gentleness, not only from other people but also from yourself. </p>
              <p> You deserve rest.</p>
              <p> You deserve healing.</p>
              <p> You deserve days that feel light.</p>

              <p>
                I want this small corner of the world, this little letter, to be something that feels soft for you. Something that reminds you that it is alright to slow down. Something that tells you that someone out there cares about your peace and hopes you find comfort, even if just for a moment.
              </p>

              <p>
                Thank you for letting me be here in some part of your life.
              </p>

              <p>
                Thank you for being you.
              </p>

              <p>
                Happy Valentine's Day, Baby.
              </p>

              <div className="text-right italic mt-12">
                <p>Forever yours,</p>
                <p className="font-bold mt-2">Stelle</p>
                <p>
                  <br></br>
                  <br></br>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Music Control */}
      {showLetter && (
        <div
          className="fixed bottom-5 right-5 bg-white/90 px-6 py-4 rounded-full shadow-lg cursor-pointer hover:bg-white transition-colors z-50"
          onClick={toggleMusic}
        >
          🎵 Music: {musicPlaying ? 'Playing' : 'Paused'}
        </div>
      )}

      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mp3" />
      </audio>
    </div>
  );
}