import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "HOME", path: "/" },
    { name: "ABOUT US", path: "/about" },
    { name: "WHY CA", path: "/whyca" },
    { name: "RESPONSIBILITIES", path: "/responsibilities" },
    { name: "FAQ", path: "/faqs" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-yellow-500/30 w-full max-w-full overflow-x-hidden">
      {/* 🖤 Header Nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo & Title */}
        <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center space-x-3 group shrink-0">
          <img src="/logos/Shaurya_Logo.png" alt="Shaurya Logo" className="w-10 h-auto group-hover:scale-105 transition-transform" />
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-wider text-white">
              SHAURYA
            </span>
            <span className="text-[9px] text-yellow-400 tracking-widest uppercase font-semibold">
              TECHNOLOGY STUDENTS' GYMKHANA
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-4 xl:space-x-8 text-xs font-bold tracking-wider">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-1 transition-colors duration-200 ${
                  isActive ? "text-yellow-400" : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-yellow-400 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: CTA Button */}
        <div className="hidden sm:flex items-center space-x-4">
          <Link
            to="/register"
            className="px-4 py-1.5 rounded font-extrabold text-xs tracking-wider uppercase text-black bg-yellow-400 hover:bg-yellow-300 transition-all duration-200"
          >
            BECOME A CA
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex lg:hidden items-center space-x-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-gray-300 hover:text-white focus:outline-none"
          >
            {menuOpen ? (
              <svg className="w-6 h-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-black border-b border-yellow-500/30 px-6 py-4 space-y-3 overflow-hidden"
          >
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block text-base font-semibold tracking-wider py-1.5 border-b border-white/10 ${
                    isActive ? "text-yellow-400 pl-2" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;


