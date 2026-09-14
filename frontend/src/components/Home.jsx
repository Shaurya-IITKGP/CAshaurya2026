import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import VideoPlayer from "./VideoPlayer";

const Home = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const heroRef = useRef(null);
  const videoRef = useRef(null);

  // Auto-pause video when scrolled out of view to eliminate scroll lag & save GPU/CPU cycles
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(() => { });
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.05 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const stats = [
    { value: "500+", label: "PARTICIPANTS REGISTERED" },
    { value: "30+", label: "EXCITING COMPETITIONS" },
    { value: "30K+", label: "COLLEGES & PARTICIPANTS" },
    { value: "75 YRS", label: "IIT KGP LEGACY" },
  ];

  const pageHighlights = [
    {
      title: "ABOUT US",
      subtitle: "Where Champions Ascend & Legends Collide",
      desc: "Explore IIT Kharagpur's grandest annual sports fest celebrating athletic excellence.",
      path: "/about",
      image: "/images/about_us.png",
    },
    {
      title: "WHY BECOME A CA?",
      subtitle: "Leadership, Merch & National Exposure",
      desc: "Develop management skills, network with student leaders, climb leaderboard tiers, and earn exclusive rewards.",
      path: "/whyca",
      image: "/images/C0062T01.JPG",
    },
    {
      title: "RESPONSIBILITIES",
      subtitle: "Campus Outreach & Contingents",
      desc: "Lead student contingents, manage social media publicity, and represent your college.",
      path: "/responsibilities",
      image: "/images/C0243T01.JPG",
    },
    {
      title: "FREQUENTLY ASKED QUESTIONS",
      subtitle: "Get Answers & Support",
      desc: "Find answers to application processes, timeline commitments, and certificate eligibility.",
      path: "/faqs",
      image: "/images/faqs.png",
    },
    {
      title: "APPLY NOW",
      subtitle: "Represent Your Institution",
      desc: "Fill out the official Campus Ambassador application form to secure your position.",
      path: "/register",
      image: "/images/apply_now.png",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="w-full flex flex-col text-left">
      {/* 🎬 100% FULL SCREEN WIDTH HERO & STATS SECTION WITH VIDEO BACKGROUND */}
      <div
        ref={heroRef}
        className="w-full relative min-h-[600px] lg:min-h-[85vh] -mt-16 pt-28 sm:pt-32 pb-8 flex flex-col justify-between overflow-hidden bg-black max-w-full"
      >
        {/* 🖼️ Dedicated Fallback Image Layer (Instantly visible, stable background) */}
        <img
          src="/images/fallback_poster.png"
          alt="Shaurya Sports Festival"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none"
          style={{ transform: "translateZ(0)" }}
        />

        {/* 🎬 Background Video (Preloads metadata, smoothly fades in when ready to play) */}
        {!videoError && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onCanPlay={() => setIsVideoLoaded(true)}
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none block transition-opacity duration-1000 ease-out ${isVideoLoaded ? "opacity-100" : "opacity-0"
              }`}
            style={{ transform: "translateZ(0)", willChange: "opacity" }}
          >
            <source src="/background_50mb.mp4" type="video/mp4" />
          </video>
        )}

        {/* Dark readability overlay */}
        <div className="absolute inset-0 bg-black/60 z-[1] pointer-events-none" />

        {/* Bottom fade to blend hero into next section — eliminates the black line gap */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#121216] via-[#121216]/70 to-transparent z-[2] pointer-events-none" />

        {/* Hero Content Grid - Centered vertically in available space */}
        <div className="flex-grow flex flex-col justify-center w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-4 sm:px-8"
          >
            {/* Left Column: Clear Text & Call-to-Action */}
            <div className="lg:col-span-7 space-y-6">
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none text-white font-['Barlow_Condensed',sans-serif]"
              >
                IGNITE THE ARENA
                <span className="block text-yellow-400 mt-2">SHAURYA CA PROGRAM</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-base sm:text-xl text-gray-100 font-medium leading-relaxed max-w-xl"
              >
                Be the official face of Shaurya on your campus. Lead student contingents, inspire young athletes, and represent IIT Kharagpur’s annual sports fest.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/register"
                  className="px-8 py-3.5 rounded font-extrabold text-sm uppercase text-black bg-yellow-400 hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/30"
                >
                  BE A PART OF SHAURYA CA
                </Link>
                <Link
                  to="/about"
                  className="px-8 py-3.5 rounded font-extrabold text-sm uppercase text-white border-2 border-yellow-400 hover:bg-yellow-400/20 transition-colors shadow-lg"
                >
                  EXPLORE PROGRAM
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* STATS BANNER - Pinned to the bottom of the hero section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 mt-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col items-center text-center p-4 border-yellow-500/30 ${
                  idx === stats.length - 1 ? "" : idx % 2 === 0 ? "border-r" : "md:border-r"
                }`}
              >
                <span className="text-3xl sm:text-4xl font-extrabold text-yellow-400 font-['Barlow_Condensed',sans-serif]">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold tracking-wider text-gray-200 mt-1 uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* REST OF HOME PAGE CONTENT */}
      <div className="w-full bg-[#121216] py-12 flex justify-center">
        <div className="w-full max-w-7xl px-4 sm:px-8 space-y-16 flex flex-col items-center">
          {/* PROGRAM PAGES & VERTICALS */}
          <div className="w-full space-y-8 pt-4 pb-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-2 text-center"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-yellow-400 font-['Barlow_Condensed',sans-serif]">
                PROGRAM & VERTICALS
              </h2>
              <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
                Click on any section below to navigate to its dedicated page view.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {pageHighlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                  }}
                >
                  <Link
                    to={item.path}
                    onClick={(e) => {
                      // Apply double-tap logic only if the primary input mechanism cannot hover (i.e. touchscreens)
                      if (window.matchMedia('(hover: none)').matches && activeCard !== idx) {
                        e.preventDefault();
                        setActiveCard(idx);
                      }
                    }}
                    className={`group relative rounded-2xl bg-black border text-left transition-all duration-300 hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(250,204,21,0.2)] block overflow-hidden h-[380px] ${
                      activeCard === idx ? 'border-yellow-400 shadow-[0_0_25px_rgba(250,204,21,0.2)]' : 'border-yellow-500/20'
                    }`}
                  >
                    {/* Image Background */}
                    <div className="absolute inset-0 w-full h-full bg-gray-900">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 ${
                          activeCard === idx ? 'scale-105' : ''
                        }`}
                      />
                    </div>

                    {/* Text Body Anchored to Bottom */}
                    <div className="absolute bottom-0 left-0 w-full px-6 pb-6 pt-4 bg-black z-10">
                      {/* Gradient Fade Above Text Body */}
                      <div className="absolute bottom-full left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />

                      <h3 className={`text-xl font-bold transition-colors leading-snug relative z-10 group-hover:text-yellow-400 ${
                        activeCard === idx ? 'text-yellow-400' : 'text-white'
                      }`}>
                        {item.title}
                      </h3>

                      <div className={`grid transition-[grid-template-rows,opacity] duration-500 relative z-10 group-hover:grid-rows-[1fr] group-hover:opacity-100 ${
                        activeCard === idx ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}>
                        <div className="overflow-hidden">
                          <div className="pt-3 flex flex-col space-y-4">
                            <p className="text-sm text-gray-300 leading-relaxed">
                              {item.desc}
                            </p>
                            <div className="flex items-center text-xs font-bold text-yellow-400 uppercase">
                              <span>Explore</span>
                              <svg className={`w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1 ${
                                activeCard === idx ? 'translate-x-1' : ''
                              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
