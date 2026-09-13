import React from "react";
import { motion } from "framer-motion";
import { FaMusic, FaTrophy, FaUsers, FaCalendarCheck } from "react-icons/fa";

const AboutUs = () => {
  const highlights = [
    {
      icon: FaMusic,
      title: "Music, Sports & Competitions",
      desc: "Immerse yourself in high-energy athletic tournaments and live cultural music events.",
    },
    {
      icon: FaTrophy,
      title: "Exciting prizes and giveaways!",
      desc: "Compete for lucrative cash rewards, trophies, limited-edition merch & sponsor hampers.",
    },
    {
      icon: FaUsers,
      title: "Join Hundreds of participants!",
      desc: "Connect with passionate athletes and student ambassadors across India's top colleges.",
    },
    {
      icon: FaCalendarCheck,
      title: "Don't miss the Sports fest of IIT Kharagpur!",
      desc: "Experience 3 unmissable days of fierce competition at Technology Students' Gymkhana.",
    },
  ];

  const stats = [
    { value: "500+", label: "Participants registered" },
    { value: "30+", label: "Exciting competitions" },
    { value: "30K+", label: "Colleges & participants" },
  ];

  return (
    <div className="w-full relative flex flex-col items-center py-6 text-left min-h-screen overflow-hidden">
      {/* 🎬 Fixed 100% Viewport Edge-to-Edge Background Image Layer */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none max-w-full" style={{ transform: "translateZ(0)" }}>
        <motion.img
          initial={{ scale: 1 }}
          animate={{ scale: 1.04 }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          src="/images/C0092T01.JPG"
          alt="About Us Background"
          decoding="async"
          className="w-full h-full object-cover object-center opacity-100"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Centered Content Container */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-8 space-y-16 flex flex-col items-center">
        {/* Heading & Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center w-full max-w-4xl mx-auto space-y-4 pt-6"
        >
          <span className="text-xs sm:text-sm font-extrabold text-yellow-400 uppercase tracking-widest block">
            ABOUT US
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight font-['Barlow_Condensed',sans-serif]">
            <span className="block text-white">SHAURYA IIT KHARAGPUR</span>
          </h1>

          {/* Official Quote */}
          <div className="py-2">
            <blockquote className="text-lg sm:text-2xl font-bold italic text-yellow-400 font-['Inter',sans-serif] tracking-wide">
              “Brave hearts write history with courage, not ink”
            </blockquote>
          </div>

          <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Shaurya, IIT Kharagpur’s premier sports festival, returns with greater pride as the institute celebrates its 75 years of excellence and legacy. Join us to be part of the battle of skill, spirit and camaraderie.
          </p>
        </motion.div>

        {/* 4 Feature Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {highlights.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 25 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="p-6 rounded-2xl bg-black border border-yellow-500/20 hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(250,204,21,0.2)] transition-all duration-300 flex items-start space-x-5 group"
              >
                <div className="p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-2xl group-hover:bg-yellow-400 group-hover:text-black transition-colors flex-shrink-0">
                  <IconComponent />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors uppercase font-['Inter',sans-serif]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 🏆 STATS BANNER ROW (500+, 30+, 30K+) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl bg-black border border-yellow-500/30 rounded-2xl p-8 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-yellow-500/20 text-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-2 pt-4 md:pt-0">
                <span className="text-4xl sm:text-5xl font-black text-yellow-400 font-['Barlow_Condensed',sans-serif]">
                  {stat.value}
                </span>
                <span className="text-sm font-bold text-gray-200 tracking-wide uppercase font-['Inter',sans-serif]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;


