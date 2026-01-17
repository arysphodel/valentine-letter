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
            <div className="absolute -top-10 -left-10 md:-top-14 md:-left-20
 w-28 h-28 md:w-48 md:h-48
 bg-pink-100 border-4 border-white rounded-2xl shadow-xl flex items-center justify-center transform -rotate-12 hover:scale-110 transition-transform">
              <img src="/cat1.jpg" alt="Cat 1" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="absolute -top-10 -right-10 md:-top-14 md:-right-20
 w-28 h-28 md:w-48 md:h-48
 bg-pink-100 border-4 border-white rounded-2xl shadow-xl flex items-center justify-center transform rotate-12 hover:scale-110 transition-transform">
              <img src="/cat2.jpg" alt="Cat 2" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="absolute -bottom-10 -left-10 md:-bottom-16 md:-left-20
 w-28 h-28 md:w-48 md:h-48
 bg-pink-100 border-4 border-white rounded-2xl shadow-xl flex items-center justify-center transform rotate-6 hover:scale-110 transition-transform">
              <img src="/cat3.jpg" alt="Cat 3" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="absolute -bottom-10 -right-10 md:-bottom-16 md:-right-20
 w-28 h-28 md:w-48 md:h-48
 bg-pink-100 border-4 border-white rounded-2xl shadow-xl flex items-center justify-center transform -rotate-12 hover:scale-110 transition-transform">
              <img src="/cat4.jpg" alt="Cat 4" className="w-full h-full object-cover rounded-xl" />
            </div>

            {/* Letter Content */}
            <h1 className="text-5xl text-center text-pink-600 mb-10 font-serif italic">
              To My Love,
            </h1>

          <div className="space-y-6 text-lg leading-relaxed text-gray-800 font-serif text-justify">

              <p>
                I hope this reaches you at a moment when your mind is calm and your heart has a little space to rest. I was thinking of you again, and I felt the need to put my thoughts into words. You have a way of slipping into my day so easily. Even the smallest thought of you makes everything feel warmer.
              </p>

              <p>
                I like knowing you. I like learning the small things about you, the things you do not always say out loud. You have this quiet charm that pulls me in, and every day I find something new about you that I want to hold close. You have no idea how often I smile because of you.
              </p>

              <p>
                I know life gets heavy for you at times. I know some days feel long and tiring. When you tell me even a bit of what you go through, I feel honored that you trust me with it. You do not have to be strong all the time. You do not have to hide the parts of yourself that feel worn out. I want to be someone who can listen, someone who can make your days softer, even just a little.
              </p>

              <p>
                If I could sit beside you right now, I would. I would hold you for a moment and let you rest your mind. I would trace my fingers along your arm, slow and gentle, until you feel the world ease up. I would let you lean into me and forget the noise around you. One day I hope I get to do that for real. Until then, I am here in the ways I can be.
              </p>

              <p>
                I love it when you share pieces of your day with me. It makes me feel connected to your world. It makes me feel like I am not far from you at all. You do not have to pretend with me. I want you real. I want you as you are, with your tired moments, your unfiltered thoughts, your soft parts, and your quiet hopes.
              </p>

              <p>
                You are someone I am truly glad to have met. You are someone who makes my days brighter without even trying. And the more I get to know you, the more I want to be close to you, in every sense of the word.
              </p>

              <p> 
                You deserve care. You deserve peace. You deserve to be held with warmth and patience. I hope you let yourself feel those things, from me and from the world around you.
              </p>

              <p>
                Thank you for being part of my days. Thank you for letting me into your life in the way you do.
              </p>

              <p>
                Every quiet moment I have, it is you I end up thinking about.
              </p>

              <p>
                Happy Valentine's Day, Baby.
              </p>

              <div className="text-right italic mt-12">
                <p>Yours,</p>
                <p className="font-bold mt-2">Stelle</p>
              </div>
              <p>
                <br></br>
              </p>

              <p>
                P.S. You make it very hard to behave. And I am not sure I want to behave around you anyway.
              </p>

              <p>
                P.P.S. I hope you sleep well tonight, but if your mind wanders to me, let it. Mine is already wandering to you.
              </p>

              <p>
                <br></br>
                <br></br>
              </p>
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