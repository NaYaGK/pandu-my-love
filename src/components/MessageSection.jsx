import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const TypewriterText = ({ text }) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.3 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 10,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <motion.h3
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="font-cormorant text-2xl md:text-4xl text-pink-100 leading-relaxed text-center max-w-3xl mx-auto drop-shadow-md"
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: "inline-flex" }}>
          {word.split('').map((char, charIndex) => (
            <motion.span variants={child} key={charIndex}>
              {char}
            </motion.span>
          ))}
          {wordIndex !== words.length - 1 && (
            <motion.span variants={child} style={{ whiteSpace: "pre" }}>
              {" "}
            </motion.span>
          )}
        </span>
      ))}
    </motion.h3>
  );
};

export default function MessageSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Replace this URL with your custom voice note URL (e.g. .mp3, .m4a or .wav)
  const audioUrl = ""; 

  const toggleAudio = () => {
    if (audioRef.current && audioUrl) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div ref={ref} className="relative z-10 py-32 px-6 flex flex-col items-center justify-center min-h-screen">

      {/* Glowing background blob */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-full max-w-2xl aspect-square bg-pink-600/20 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-4xl bg-black/40 backdrop-blur-xl border border-pink-500/20 rounded-3xl p-8 md:p-16 shadow-2xl">
        <h2 className="font-dancing text-4xl md:text-6xl text-pink-400 text-center mb-12">
          Dearest Ammu,
        </h2>

        {isInView && (
          <div className="space-y-8">
            <TypewriterText text="From the moment our journey began, you've brought a light into my life that I never knew existed." />
            <TypewriterText text="Every smile, every laugh, every quiet moment with you is a treasure." />
            <TypewriterText text="This is just a small digital piece of my heart, made entirely for you." />
          </div>
        )}

        {audioUrl && (
          <div className="mt-16 flex justify-center">
            <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />
            <button
              onClick={toggleAudio}
              className="flex items-center gap-3 px-6 py-3 bg-pink-500/20 hover:bg-pink-500/40 border border-pink-500/50 rounded-full text-pink-100 transition-all hover:scale-105 active:scale-95 group"
            >
              <svg className="w-5 h-5 fill-current group-hover:animate-pulse" viewBox="0 0 24 24">
                {isPlaying ? (
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                ) : (
                  <path d="M8 5v14l11-7z" />
                )}
              </svg>
              <span className="font-montserrat text-sm tracking-wide">
                {isPlaying ? "Pause my voice" : "Listen to my voice"}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
