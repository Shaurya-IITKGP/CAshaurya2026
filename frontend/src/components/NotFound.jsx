import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/404.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Failed to load 404 animation", err));
  }, []);

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-12 overflow-hidden">
      <motion.div 
        className="w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {animationData ? (
          <Lottie animationData={animationData} loop={true} />
        ) : (
          <div className="h-64 flex items-center justify-center text-gray-500 font-bold text-4xl">404</div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6 flex flex-col items-center"
      >
        <h1 className="text-4xl sm:text-6xl font-black uppercase text-white font-['Barlow_Condensed',sans-serif]">
          <span className="text-yellow-400">404</span> - The Kleos Colosseum
        </h1>
        <p className="text-gray-300 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
          The Kleos Colosseum: Kleos is the ancient Greek concept of immortal glory earned through battle, perfectly matching the arena's gladiatorial stakes.
        </p>

        <Link
          to="/"
          className="inline-block mt-4 px-10 py-4 rounded font-extrabold text-sm uppercase tracking-wider text-black bg-yellow-400 hover:bg-yellow-300 transition-all shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] hover:-translate-y-1"
        >
          Return to Base
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
