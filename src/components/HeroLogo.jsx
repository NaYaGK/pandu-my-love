import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroLogo({ onComplete }) {
  const containerRef = useRef(null);
  const heartRef = useRef(null);
  const [clickCount, setClickCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Small scattered glowing elements flying in
      const elements = document.querySelectorAll('.flying-brick');
      
      gsap.fromTo(elements, 
        { 
          x: () => (Math.random() - 0.5) * window.innerWidth * 2,
          y: () => (Math.random() - 0.5) * window.innerHeight * 2,
          opacity: 0,
          scale: 0,
          rotation: () => (Math.random() - 0.5) * 360
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 2.5,
          ease: "power4.out",
          stagger: {
            amount: 1.5,
            from: "random"
          },
          onComplete: () => {
            // Once bricks assemble, reveal the main glowing heart
            gsap.to(heartRef.current, {
              opacity: 1,
              scale: 1.1,
              filter: "drop-shadow(0px 0px 40px rgba(236,72,153,0.8))",
              duration: 1,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut"
            });
            setAnimationDone(true);
            if(onComplete) onComplete();
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const handleHeartClick = () => {
    if (!animationDone) return;
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 5) {
        setShowSecret(true);
      }
      return newCount;
    });
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-screen" ref={containerRef}>
      
      <div className="relative cursor-pointer group" onClick={handleHeartClick}>
        {/* Main Heart */}
        <div 
          ref={heartRef}
          className="relative opacity-0 scale-50 z-20 text-pink-500 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)] transition-transform group-hover:scale-125 group-active:scale-95"
        >
          <Heart size={120} fill="currentColor" strokeWidth={1} />
        </div>

        {animationDone && !showSecret && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute -bottom-12 w-full text-center text-pink-300 font-montserrat text-xs tracking-widest pointer-events-none"
          >
            {clickCount === 0 ? "psst... tap the heart 5 times" : `${5 - clickCount} more taps...`}
          </motion.p>
        )}

        {/* The flying bricks that assemble around the heart */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="flying-brick absolute w-3 h-3 bg-pink-400 rounded-full drop-shadow-[0_0_8px_rgba(236,72,153,1)]"
              style={{
                // Position them in a slight halo around the center
                transform: `rotate(${i * 18}deg) translateY(-80px)`
              }}
            />
          ))}
        </div>
      </div>

      {/* Secret Message Popup */}
      <AnimatePresence>
        {showSecret && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute top-2/3 mt-8 p-6 bg-black/60 backdrop-blur-md border border-pink-500/30 rounded-2xl shadow-2xl text-center max-w-sm"
          >
            <p className="font-dancing text-2xl text-pink-300 mb-2">
              My Sweet Ammu / Mama,
            </p>
            <p className="text-white/90 font-montserrat font-light text-sm">
              {/* PLACEHOLDER: The user will add the inside joke / secret message here later */}
              [Secret inside joke or highly specific memory goes here!]
            </p>
            <button 
              onClick={(e) => { e.stopPropagation(); setShowSecret(false); setClickCount(0); }}
              className="mt-4 px-4 py-1.5 bg-pink-500/20 hover:bg-pink-500/40 text-pink-200 text-xs rounded-full transition-colors"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
