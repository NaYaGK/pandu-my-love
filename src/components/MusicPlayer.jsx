import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MusicPlayer({ isVideoPlaying }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const audioUrl = 'https://raw.githubusercontent.com/karthikganjikindle-code/pandu-pics/main/Music/Vaalu%20Kanuladaanaa%20-%20SenSongsMp3.Co.mp3';

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isVideoPlaying) {
        audioRef.current.pause();
      } else if (isPlaying) {
        audioRef.current.play().catch(err => console.error("Playback failed:", err));
      }
    }
  }, [isVideoPlaying, isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        // Simple fade out
        let vol = audioRef.current.volume;
        const fadeOut = setInterval(() => {
          if (vol > 0.05) {
            vol -= 0.05;
            audioRef.current.volume = Math.max(0, Math.min(1, vol));
          } else {
            clearInterval(fadeOut);
            audioRef.current.pause();
            audioRef.current.volume = 0.5;
            setIsPlaying(false);
          }
        }, 50);
      } else {
        audioRef.current.volume = 0;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          // Simple fade in
          let vol = 0;
          const fadeIn = setInterval(() => {
            if (vol < 0.45) {
              vol += 0.05;
              audioRef.current.volume = Math.max(0, Math.min(1, vol));
            } else {
              clearInterval(fadeIn);
            }
          }, 50);
        }).catch(err => console.error("Playback failed:", err));
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="bg-black/60 backdrop-blur-xl border border-pink-500/30 rounded-full p-2 pr-4 flex items-center gap-3 shadow-2xl shadow-pink-900/40">
        
        {/* Play/Pause Button */}
        <button 
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center bg-pink-500 text-white rounded-full hover:bg-pink-400 hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(236,72,153,0.5)]"
        >
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
        </button>

        {/* Track Info */}
        <div className="flex flex-col mr-2">
          <span className="text-white text-xs font-montserrat font-medium flex items-center gap-1.5">
            <Music size={12} className="text-pink-300" />
            Our Song
          </span>
          <span className="text-white/50 text-[10px] font-montserrat">
            {isPlaying ? 'Playing...' : 'Paused'}
          </span>
        </div>

        {/* Mute Button */}
        <button 
          onClick={toggleMute}
          className="text-white/70 hover:text-white transition-colors"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        <audio ref={audioRef} src={audioUrl} loop />
      </div>
    </motion.div>
  );
}
