import React from 'react';
import { motion } from 'framer-motion';

export default function HeroBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      <motion.div
        initial={{ scale: 1.1, filter: 'blur(20px)', opacity: 0 }}
        animate={{ scale: 1, filter: 'blur(8px)', opacity: 0.6 }}
        transition={{ duration: 4, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          // PLACEHOLDER: The user will replace this with the real hero background photo of Ammu/Mama
          backgroundImage: 'url("https://raw.githubusercontent.com/karthikganjikindle-code/pandu-pics/refs/heads/main/pandu/%2015.JPG")'
        }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
    </div>
  );
}
