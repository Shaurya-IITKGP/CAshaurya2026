import React from 'react';
import { motion } from 'framer-motion';
import RegisterForm from './RegisterForm';

export default function Register() {
  return (
    <div className="w-full relative flex flex-col items-center py-6 text-left min-h-screen overflow-hidden">
      {/* 🎬 Fixed 100% Viewport Edge-to-Edge Background Image Layer */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none max-w-full" style={{ transform: "translateZ(0)" }}>
        <img
          src="/images/apply_now.png"
          alt="Register Background"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-25 filter blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#121216]/90 to-[#121216]" />
      </div>

      {/* Centered Content Container */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-8 space-y-12 flex flex-col items-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center w-full max-w-4xl mx-auto space-y-3 pt-6"
        >
          <span className="text-xs font-extrabold text-yellow-400 uppercase tracking-widest block">
            JOIN THE CHAMPIONS NETWORK
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight font-['Barlow_Condensed',sans-serif]">
            <span className="block text-white">APPLY TO REPRESENT</span>
            <span className="block text-yellow-400">SHAURYA</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Take the lead as the official Campus Ambassador for IIT Kharagpur’s annual sports fest. Fill out the application form below.
          </p>
        </motion.div>

        {/* Grid: Info + Form */}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
          {/* Left Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-8 rounded-2xl bg-black border border-yellow-500/20 hover:border-yellow-400 transition-all duration-300 space-y-6 shadow-xl">
              <h3 className="text-2xl font-black text-yellow-400 font-['Barlow_Condensed',sans-serif] uppercase">
                WHY REGISTER TODAY?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="text-yellow-400 text-lg font-bold">✦</span>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase">Official Certification</h4>
                    <p className="text-xs text-gray-300">Certificate signed by Technology Students' Gymkhana, IIT Kharagpur.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="text-yellow-400 text-lg font-bold">✦</span>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase">Free Accommodation & Passes</h4>
                    <p className="text-xs text-gray-300">Stay on IIT Kharagpur campus & get VIP passes to pro-nights.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <span className="text-yellow-400 text-lg font-bold">✦</span>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase">Cash Rewards & Hampers</h4>
                    <p className="text-xs text-gray-300">Win from ₹5 Lakh+ prize pool based on leaderboard ranking.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-yellow-500/20 hover:border-yellow-400/50 bg-black p-6 text-center space-y-3 transition-all duration-300">
              <img
                src="/logos/register.png"
                alt="Shaurya Graphic"
                className="w-48 h-auto mx-auto object-contain drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]"
              />
              <p className="text-xs text-gray-400 italic">
                "Lead your campus delegation to the pinnacle of athletic victory."
              </p>
            </div>
          </motion.div>

          {/* Right Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-black border border-yellow-500/20 hover:border-yellow-400 transition-all duration-300 shadow-2xl"
          >
            <RegisterForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}


