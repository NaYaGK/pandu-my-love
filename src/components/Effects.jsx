import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Effects({ active }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (active) {
      // Generate some random particles
      const newParticles = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * window.innerWidth,
        y: (Math.random() - 0.5) * window.innerHeight,
        scale: Math.random() * 1.5 + 0.5,
        rotation: Math.random() * 360,
        delay: Math.random() * 0.5,
      }));
      setParticles(newParticles);
      
      // Cleanup after a few seconds
      const timer = setTimeout(() => {
        setParticles([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
            animate={{ 
              x: p.x, 
              y: p.y, 
              scale: p.scale, 
              opacity: 0, 
              rotate: p.rotation 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, delay: p.delay, ease: "easeOut" }}
            className="absolute text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,1)]"
          >
            {p.id % 2 === 0 ? '✨' : '💖'}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
