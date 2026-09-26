import React, { useState } from 'react';
import HeroBackground from './components/HeroBackground';
import HeroLogo from './components/HeroLogo';
import Effects from './components/Effects';
import LiveTimer from './components/LiveTimer';
import MessageSection from './components/MessageSection';
import Gallery from './components/Gallery';
import PhotoPuzzle from './components/PhotoPuzzle';
import Cylinders3D from './components/Cylinders3D';
import MusicPlayer from './components/MusicPlayer';
import VideoPlayer from './components/VideoPlayer';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [logoAnimationDone, setLogoAnimationDone] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <div className="relative min-h-screen bg-black text-white font-montserrat overflow-x-hidden selection:bg-pink-500/30">
      
      {/* Universal Background Layer */}
      <HeroBackground />
      
      {/* 3D Atmosphere Layer (Optional: can be placed absolutely over everything or specific sections) */}
      <Cylinders3D />

      {/* Main Content Journey */}
      <main className="relative z-10 w-full flex flex-col items-center">
        
        {/* Intro Section: GSAP Bricks -> Heart */}
        <AnimatePresence>
          {!unlocked && (
            <motion.section 
              initial={{ opacity: 1, height: "100vh" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="relative w-full flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-50">
                <HeroLogo onComplete={() => setLogoAnimationDone(true)} />
                {logoAnimationDone && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 px-8 py-3 bg-pink-600 hover:bg-pink-500 text-white rounded-full font-medium tracking-wider shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all"
                    onClick={() => setUnlocked(true)}
                  >
                    Enter Our Journey
                  </motion.button>
                )}
                <Effects active={logoAnimationDone} />
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* The rest of the journey reveals after unlocking */}
        {unlocked && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full flex flex-col items-center pb-32"
          >
            {/* The Time We've Shared */}
            <LiveTimer />

            {/* The Letter */}
            <MessageSection />

            {/* The Visuals */}
            <Gallery />

            {/* The Puzzle */}
            <PhotoPuzzle />

            {/* The Video */}
            <VideoPlayer onPlayStateChange={setIsVideoPlaying} />

            {/* Placeholder for Future Footer */}
            <div className="w-full h-64 mt-24 flex items-center justify-center border-t border-pink-500/20 text-pink-500/40 font-montserrat tracking-[0.2em] text-sm">
              FOOTER SPACE
            </div>
          </motion.div>
        )}
      </main>

      {/* Persistent Audio Player */}
      <MusicPlayer isVideoPlaying={isVideoPlaying} />
    </div>
  );
}
