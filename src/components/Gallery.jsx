import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function Gallery() {
  const imageBase = 'https://raw.githubusercontent.com/karthikganjikindle-code/pandu-pics/refs/heads/main/';
  
  const images = [
    { src: `${imageBase}pandu/%2010.JPG`, alt: 'A beautiful smile in a denim jacket' },
    { src: `${imageBase}pandu/%2011.JPG`, alt: 'Looking gorgeous in a bright pink saree' },
    { src: `${imageBase}pandu/%2012.JPG`, alt: 'Radiant under the palm trees in an orange dress' },
    { src: `${imageBase}pandu/%2014.JPG`, alt: 'A cute selfie with a black cap' },
    { src: `${imageBase}pandu/%2018.JPG`, alt: 'Smiling with a stylish bag' },
    { src: `${imageBase}pandu/%2020.JPG`, alt: 'Beautiful pose against a pink flower wall' },
    { src: `${imageBase}pandu/%201.jpg`, alt: 'A bright smile out in nature by a river' },
    { src: `${imageBase}pandu/%202.JPG`, alt: 'Golden hour glow on a beautiful evening' },
    { src: `${imageBase}pandu/%203.JPG`, alt: 'Happy and radiant against a green backdrop' },
    { src: `${imageBase}pandu/%204.JPG`, alt: 'Posing stylishly on a sunny afternoon' },
    { src: `${imageBase}pandu/%205.JPG`, alt: 'A fun pose outdoors among the plants' },
    { src: `${imageBase}pandu/%206.JPG`, alt: 'Standing gracefully on some steps amidst greenery' }
  ];

  const [rotation, setRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const isDragging = useRef(false);
  const isHovered = useRef(false);

  const angleStep = 360 / images.length;
  const radius = Math.round((180 / 2) / Math.tan(Math.PI / images.length)) + 60;

  // Auto-spin functionality
  useEffect(() => {
    let animationFrameId;
    
    const animate = () => {
      // Only auto-spin if we aren't dragging, not hovering, and the lightbox is closed
      if (!isDragging.current && !isHovered.current && selectedIndex === null) {
        setRotation(prev => prev - 0.15);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [selectedIndex]);

  const handlePanStart = () => {
    isDragging.current = true;
  };

  const handlePan = (event, info) => {
    // Delta x is the amount dragged since the last frame
    setRotation(prev => prev + info.delta.x * 0.4);
  };

  const handlePanEnd = (event, info) => {
    // Add momentum based on how fast they swiped!
    setRotation(prev => prev + info.velocity.x * 0.05);
    // Allow a tiny delay before clicks are valid again
    setTimeout(() => {
      isDragging.current = false;
    }, 50);
  };

  // Lightbox Navigation
  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative z-10 py-24 min-h-[90vh] flex flex-col items-center justify-center w-full">
      <h2 className="font-playfair text-4xl md:text-5xl text-pink-200 mb-16 drop-shadow-[0_0_15px_rgba(236,72,153,0.6)] text-center pointer-events-none">
        Our Memories
      </h2>
      
      {/* 
        Gallery Wheel Container 
        Using Framer Motion's robust onPan to handle all touch/mouse gestures flawlessly 
      */}
      <motion.div 
        className="relative w-full max-w-[100vw] h-[600px] flex justify-center items-center cursor-grab active:cursor-grabbing"
        style={{ perspective: '1200px', touchAction: 'pan-y' }}
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        onMouseEnter={() => { isHovered.current = true; }}
        onMouseLeave={() => { isHovered.current = false; }}
      >
        {/* Pivot layer (tilts the whole wheel exactly like index2.html) */}
        <div 
          className="absolute w-[180px] h-[240px] md:w-[220px] md:h-[280px]"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-12deg) rotateZ(8deg)'
          }}
        >
          {/* The Spinning Wheel */}
          <motion.div 
            className="w-full h-full absolute top-0 left-0"
            animate={{ rotateY: rotation }}
            transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {images.map((img, i) => {
              const angle = i * angleStep;
              return (
                <div 
                  key={i}
                  className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-pink-500/20 bg-transparent group"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    backfaceVisibility: 'visible' 
                  }}
                  onClick={(e) => {
                    // Ignore clicks if the user was dragging
                    if (isDragging.current) return;
                    e.stopPropagation();
                    setSelectedIndex(i);
                  }}
                >
                  <img 
                    src={img.src} 
                    alt={img.alt}
                    className="w-full h-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105" 
                    draggable={false}
                    loading="lazy"
                  />
                  {/* Hover magnifying glass effect */}
                  <div className="absolute inset-0 bg-pink-900/40 flex items-center justify-center text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    🔍
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </motion.div>

      <p className="mt-16 font-montserrat text-sm text-pink-200/60 uppercase tracking-widest animate-pulse pointer-events-none">
        Drag to spin
      </p>

      {/* Lightbox Modal with side scrolling (Next/Prev) */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1e000c]/95 backdrop-blur-xl p-4 md:p-6"
            onClick={() => setSelectedIndex(null)} 
          >
            <button 
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all hover:scale-110 z-50 backdrop-blur-md"
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
            >
              <X size={24} />
            </button>

            <button 
              className="absolute left-4 md:left-12 w-14 h-14 flex items-center justify-center rounded-full bg-black/40 hover:bg-pink-500/50 border border-white/10 text-white transition-all hover:scale-110 z-50 backdrop-blur-md shadow-xl"
              onClick={prevImage}
            >
              <ChevronLeft size={32} />
            </button>

            <button 
              className="absolute right-4 md:right-12 w-14 h-14 flex items-center justify-center rounded-full bg-black/40 hover:bg-pink-500/50 border border-white/10 text-white transition-all hover:scale-110 z-50 backdrop-blur-md shadow-xl"
              onClick={nextImage}
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.9, opacity: 0, x: -20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative flex flex-col items-center justify-center max-w-5xl w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={images[selectedIndex].src} 
                alt={images[selectedIndex].alt}
                className="max-w-full max-h-[80vh] rounded-2xl shadow-[0_30px_80px_rgba(236,72,153,0.3)] object-contain border border-pink-500/20" 
              />
              <div className="absolute bottom-10 bg-black/60 backdrop-blur-md px-8 py-3 rounded-full border border-pink-500/30">
                <p className="text-center text-pink-200 font-dancing text-2xl md:text-3xl drop-shadow-md">
                  {images[selectedIndex].alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
