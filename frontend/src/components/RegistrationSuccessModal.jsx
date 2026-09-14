import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function RegistrationSuccessModal() {
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent background scrolling across all browsers (including iOS quirks)
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    return () => {
      // Restore original scrolling behavior
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md px-4 touch-none overscroll-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-[#121216] rounded-2xl p-8 max-w-sm w-full text-center shadow-[0_0_15px_rgba(250,204,21,0.2)] border border-yellow-500/20 relative overflow-hidden"
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
      >
        <div className="flex justify-center mb-6">
          <motion.div
            className="w-24 h-24 rounded-full bg-[#22C55E] flex items-center justify-center relative shadow-[0_0_20px_rgba(34,197,94,0.4)]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5, delay: 0.3 }}
          >
            <motion.svg
              className="w-12 h-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.6, ease: "easeInOut" }}
              />
            </motion.svg>
          </motion.div>
        </div>

        <motion.h2
          className="text-2xl font-bold text-white mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          Registration Successful!
        </motion.h2>

        <motion.p
          className="text-gray-400 text-sm mb-8 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          You are now officially registered for Shaurya 2026. Get ready to showcase your spirit and compete at IIT Kharagpur.
        </motion.p>

        <motion.button
          onClick={() => navigate('/')}
          className="w-full py-3.5 rounded-xl font-extrabold text-sm tracking-wider uppercase text-black bg-yellow-400 hover:bg-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.4)] hover:shadow-[0_0_25px_rgba(250,204,21,0.6)] transition-all cursor-pointer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: "spring", bounce: 0.4 }}
        >
          OKAY, CONTINUE
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
