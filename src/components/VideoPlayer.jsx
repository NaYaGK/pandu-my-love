import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Settings } from 'lucide-react';

export default function VideoPlayer({ onPlayStateChange }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [resolution, setResolution] = useState('720p');
  const [showSettings, setShowSettings] = useState(false);
  const videoRef = useRef(null);
  
  const videoSources = {
    '480p': "https://raw.githubusercontent.com/karthikganjikindle-code/pandu-pics/main/pandu/ammu.MOV",
    '720p': "https://raw.githubusercontent.com/karthikganjikindle-code/pandu-pics/main/pandu/ammu.MOV",
    '1080p': "https://raw.githubusercontent.com/karthikganjikindle-code/pandu-pics/main/pandu/ammu.MOV"
  };

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
      if (onPlayStateChange) onPlayStateChange(true);
    }
  };

  const changeResolution = (res) => {
    if (resolution === res) return;
    
    const video = videoRef.current;
    const wasPlaying = !video.paused;
    const currentTime = video.currentTime;
    
    setResolution(res);
    setShowSettings(false);
    
    // We need to wait for the next render for the src to update
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = currentTime;
        if (wasPlaying) {
          videoRef.current.play();
        }
      }
    }, 50);
  };

  return (
    <section className="w-full flex flex-col items-center mt-12 mb-48 relative z-20 px-4">
      <div className="relative w-full max-w-md aspect-[9/16] bg-gray-900 rounded-2xl overflow-visible shadow-[0_0_40px_rgba(236,72,153,0.3)] border border-pink-500/30 group">
        
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10 rounded-2xl">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayClick}
              className="flex items-center gap-3 px-8 py-4 bg-pink-600/90 hover:bg-pink-500 text-white rounded-full font-medium tracking-wider shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all backdrop-blur-md border border-pink-400/30"
            >
              <Play fill="currentColor" size={24} />
              <span>Watch Our Special Moment</span>
            </motion.button>
          </div>
        )}

        {/* Resolution Settings Button (Visible on hover when playing) */}
        {isPlaying && (
          <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="relative">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 bg-black/60 hover:bg-pink-600/80 text-white rounded-full backdrop-blur-md transition-colors"
              >
                <Settings size={20} />
              </button>
              
              {/* Settings Dropdown */}
              {showSettings && (
                <div className="absolute top-full right-0 mt-2 bg-black/90 border border-pink-500/30 rounded-lg overflow-hidden flex flex-col min-w-[100px] backdrop-blur-md">
                  <div className="px-3 py-2 text-xs text-pink-300 border-b border-pink-500/20 font-montserrat">
                    Quality
                  </div>
                  {Object.keys(videoSources).map((res) => (
                    <button
                      key={res}
                      onClick={() => changeResolution(res)}
                      className={`px-4 py-2 text-sm text-left transition-colors font-montserrat ${
                        resolution === res 
                          ? 'bg-pink-600/50 text-white' 
                          : 'text-gray-300 hover:bg-pink-900/40'
                      }`}
                    >
                      {res}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <video 
          ref={videoRef}
          src={videoSources[resolution]}
          controls={isPlaying}
          onPlay={() => { setIsPlaying(true); if (onPlayStateChange) onPlayStateChange(true); }}
          onPause={() => { setIsPlaying(false); if (onPlayStateChange) onPlayStateChange(false); }}
          className="w-full h-full object-contain bg-black rounded-2xl"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
