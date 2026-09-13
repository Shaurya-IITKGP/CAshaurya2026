import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import happyGift from "../assets/happyGift.json";
import cretificate from "../assets/cretificate.json";
import invitation from "../assets/invitation.json";
import connection from "../assets/connection.json";

const FlipCard = ({ animation, title, description }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-full h-64 relative cursor-pointer group"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className={`relative w-full h-full transition-transform duration-700 ${flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full rounded-2xl p-6 bg-black border border-yellow-500/20 group-hover:border-yellow-400 group-hover:shadow-[0_0_25px_rgba(250,204,21,0.2)] flex flex-col items-center justify-center text-center transition-all duration-300"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <Lottie animationData={animation} className="w-24 h-24 mb-2" loop />
          <h3 className="text-lg font-bold text-yellow-400 font-['Barlow_Condensed',sans-serif] uppercase">
            {title}
          </h3>
          <span className="text-xs text-gray-400 mt-2 font-semibold flex items-center space-x-1 uppercase tracking-wider">
            <span>Tap to flip details</span>
          </span>
        </div>

        {/* Back Side */}
        <div
          className="absolute w-full h-full rounded-2xl p-6 bg-black border border-yellow-400 flex flex-col items-center justify-center text-center shadow-2xl [transform:rotateY(180deg)]"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <h4 className="text-sm font-bold text-yellow-400 uppercase mb-2">
            {title}
          </h4>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const WhyCA = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const bgImages = ["/images/C0049T01.JPG", "/images/C0231T01.JPG.jpeg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 4500); // 2.5s transition + 2s static delay
    return () => clearInterval(interval);
  }, []);

  const benefits = [
    {
      num: "01",
      tag: "SKILL SET",
      title: "LEADERSHIP & TEAM MANAGEMENT",
      desc: "Drive teams, coordinate college contingents, and cultivate vital real-world leadership, event management, and team communication skills.",
    },
    {
      num: "02",
      tag: "NETWORK",
      title: "NATIONAL RECOGNITION & NETWORKING",
      desc: "Connect directly with student ambassadors and athletic directors across 500+ top Indian universities and IIT Kharagpur organizing bodies.",
    },
    {
      num: "03",
      tag: "REWARDS",
      title: "EXCLUSIVE SHAURYA MERCH & SWAG",
      desc: "Receive customized Shaurya merchandise, limited-edition hoodies, wristbands, and sponsored partner hampers based on your performance.",
    },
    {
      num: "04",
      tag: "PASSES",
      title: "FREE ENTRY & VIP HOSPITALITY",
      desc: "Enjoy complimentary accommodation, VIP access passes to star nights, concerts, and exclusive athlete lounges during the 3-day fest.",
    },
  ];

  return (
    <div className="w-full relative flex flex-col items-center py-6 text-left min-h-screen overflow-hidden">
      {/* 🎬 Fixed 100% Viewport Edge-to-Edge Looping Background Image Layer */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none bg-black max-w-full" style={{ transform: "translateZ(0)" }}>
        <AnimatePresence mode="popLayout">
          <motion.img
            key={bgIndex}
            initial={{ opacity: 0, scale: bgIndex % 2 === 0 ? 1 : 1.05 }}
            animate={{ opacity: 1, scale: 1.03 }}
            exit={{ opacity: 0, scale: bgIndex % 2 === 0 ? 1.05 : 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            src={bgImages[bgIndex]}
            alt="Why CA Background"
            decoding="async"
            className="absolute top-0 left-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Centered Content Container */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-8 space-y-16 flex flex-col items-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center w-full max-w-4xl mx-auto space-y-3 pt-6"
        >
          <span className="text-xs font-extrabold text-yellow-400 uppercase tracking-widest block">
            EMPOWER YOUR CAREER
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight font-['Barlow_Condensed',sans-serif]">
            <span className="block text-white">WHY STEP FORWARD AS A</span>
            <span className="block text-yellow-400">SHAURYA CA?</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Serve as the official face of IIT Kharagpur’s sports fest at your university. Gain nationwide exposure, hone management expertise, and unlock exclusive rewards.
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 pt-4"
        >
          {benefits.map((item, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
              }}
              className="group relative p-8 rounded-2xl bg-black border border-yellow-500/20 hover:border-yellow-400 transition-all duration-300 hover:shadow-[0_0_25px_rgba(250,204,21,0.2)] flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold tracking-widest text-yellow-400 uppercase">
                    FEATURE {item.num}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-yellow-400 transition-colors uppercase font-['Barlow_Condensed',sans-serif]">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {item.tag}
                </span>
                <Link
                  to="/register"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-yellow-400 hover:text-yellow-300 uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                >
                  <span>JOIN NOW</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* PROGRAM HIGHLIGHT REWARDS FLIPCARDS SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full space-y-8 pt-8 border-t border-white/10"
        >
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase text-yellow-400 font-['Barlow_Condensed',sans-serif]">
              PROGRAM HIGHLIGHT REWARDS
            </h2>
            <p className="text-sm text-gray-300">
              Interactive breakdown of perks awarded upon successful program completion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FlipCard
              animation={happyGift}
              title="Premium Hampers"
              description="Curated gift hampers, merchandise, and branded goodies presented upon fest conclusion."
            />
            <FlipCard
              animation={cretificate}
              title="Certificate of Merit"
              description="Official certificate issued by Technology Students' Gymkhana, IIT Kharagpur."
            />
            <FlipCard
              animation={invitation}
              title="VIP Access Privilege"
              description="VIP entry to star nights, concerts, opening ceremonies, and athlete arenas."
            />
            <FlipCard
              animation={connection}
              title="Networking Hub"
              description="Network with student ambassadors and top collegiate leaders across India."
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WhyCA;

